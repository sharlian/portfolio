# Sharlian Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a responsive, trilingual product-and-furniture design portfolio whose interactive Material Atlas homepage leads into accessible case studies and collection pages.

**Architecture:** Use a Vite React TypeScript single-page app with typed project data and separate Traditional Chinese, Simplified Chinese, and English dictionaries. Routing resolves collection and project slugs, while a language context persists the selected locale and maps every route to its localized content. CSS owns layout and motion; React owns interaction state and accessible navigation.

**Tech Stack:** Vite, React, TypeScript, React Router, Vitest, Testing Library, CSS custom properties.

## Global Constraints

- Use only real project photography, renders, process images, and videos supplied by Sharlian; no generated or placeholder work imagery.
- Provide `繁 / 简 / EN` as a persistent, keyboard-operable whole-site language control; persist the choice in `localStorage`.
- Keep the five featured projects and all four collection routes specified in the design document.
- Do not make hover the only way to reveal card information or navigate a project.
- Implement `prefers-reduced-motion`, visible focus states, WCAG AA body contrast, image dimensions, and lazy loading for non-critical media.
- Test desktop and mobile interaction behavior at 375px, 768px, 1024px, and 1440px before release.

---

## File Structure

- `package.json` — scripts and production/test dependencies.
- `src/main.tsx` — application bootstrap.
- `src/App.tsx` — route tree and shared page shell.
- `src/styles/global.css` — tokens, responsive layout, focus, and reduced-motion policy.
- `src/i18n/locales.ts` — `Locale` type, language labels, and translated shared UI strings.
- `src/i18n/LanguageProvider.tsx` — locale persistence and language switching API.
- `src/data/projects.ts` — typed portfolio records, translations, collection mapping, and feature order.
- `src/components/LanguageSwitch.tsx` — accessible fixed language control.
- `src/components/SiteNav.tsx` — collection and contact navigation.
- `src/components/MaterialAtlas.tsx` — desktop proximity cards and mobile disclosure rail.
- `src/components/ProjectCard.tsx` — image card, metadata, keyboard behavior, and navigation link.
- `src/pages/HomePage.tsx` — hero, atlas, availability, and contact.
- `src/pages/CollectionPage.tsx` — filtered work listing for a collection.
- `src/pages/ProjectPage.tsx` — complete case-study template and related work links.
- `src/pages/AboutPage.tsx` — profile, experience, availability, and contact.
- `src/pages/NotFoundPage.tsx` — localised route fallback.
- `src/test/setup.ts` — Testing Library matchers and `matchMedia` stub.
- `src/**/*.test.tsx` — component and routing behavior tests.

### Task 1: Scaffold the typed frontend and test runner

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/test/setup.ts`

**Interfaces:**
- Produces: `npm run dev`, `npm run build`, and `npm run test` used by all subsequent tasks.

- [ ] **Step 1: Write the failing bootstrap test**

```tsx
// src/App.test.tsx
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the portfolio shell', () => {
  render(<App />);
  expect(screen.getByRole('main')).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test -- --run src/App.test.tsx`

Expected: FAIL because the application and test runner do not exist.

- [ ] **Step 3: Create the Vite React TypeScript setup**

```json
{
  "scripts": { "dev": "vite", "build": "tsc -b && vite build", "test": "vitest" },
  "dependencies": { "@vitejs/plugin-react": "latest", "react": "latest", "react-dom": "latest", "react-router-dom": "latest", "vite": "latest" },
  "devDependencies": { "@testing-library/jest-dom": "latest", "@testing-library/react": "latest", "@testing-library/user-event": "latest", "jsdom": "latest", "typescript": "latest", "vitest": "latest" }
}
```

Configure `vite.config.ts` with the React plugin and `test.environment: 'jsdom'`; import `@testing-library/jest-dom/vitest` in `src/test/setup.ts`. Bootstrap `<App />` into `#root` in `src/main.tsx`.

- [ ] **Step 4: Run the test and production build**

Run: `npm install && npm run test -- --run src/App.test.tsx && npm run build`

Expected: one PASS and a successful Vite production build.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json vite.config.ts tsconfig.json index.html src
git commit -m "chore: scaffold portfolio frontend"
```

### Task 2: Define locale state and typed portfolio content

**Files:**
- Create: `src/i18n/locales.ts`
- Create: `src/i18n/LanguageProvider.tsx`
- Create: `src/data/projects.ts`
- Test: `src/i18n/LanguageProvider.test.tsx`
- Test: `src/data/projects.test.ts`

**Interfaces:**
- Produces: `type Locale = 'zh-Hant' | 'zh-Hans' | 'en'`, `useLanguage()`, and `getProject(slug)`.
- Consumes: React context from Task 1.

- [ ] **Step 1: Write locale and data tests**

```tsx
test('stores the selected locale and restores it', async () => {
  localStorage.setItem('sharlian-locale', 'en');
  render(<LanguageProvider><Probe /></LanguageProvider>);
  expect(screen.getByText('en')).toBeInTheDocument();
  await userEvent.click(screen.getByRole('button', { name: '繁體中文' }));
  expect(localStorage.getItem('sharlian-locale')).toBe('zh-Hant');
});

test('every featured project has all three translations', () => {
  featuredProjects.forEach((project) => {
    expect(Object.keys(project.copy)).toEqual(['zh-Hant', 'zh-Hans', 'en']);
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm run test -- --run src/i18n/LanguageProvider.test.tsx src/data/projects.test.ts`

Expected: FAIL because the provider and project records are absent.

- [ ] **Step 3: Implement the typed model and locale provider**

```ts
export type Locale = 'zh-Hant' | 'zh-Hans' | 'en';
export type Project = {
  slug: string; collection: 'emotion' | 'form' | 'function'; featured: boolean;
  media: { src: string; alt: Record<Locale, string>; width: number; height: number }[];
  copy: Record<Locale, { title: string; kicker: string; statement: string; sections: { title: string; body: string }[] }>;
};
```

`LanguageProvider` must read only valid stored values, default to `zh-Hant`, update `document.documentElement.lang`, and expose `locale`, `setLocale`, and `labels`. Seed the five selected works with real source image paths only; leave non-supplied image arrays empty rather than inventing assets.

- [ ] **Step 4: Run the tests**

Run: `npm run test -- --run src/i18n/LanguageProvider.test.tsx src/data/projects.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/i18n src/data
git commit -m "feat: add localized portfolio content model"
```

### Task 3: Build the accessible shell, navigation, and language switch

**Files:**
- Create: `src/App.tsx`
- Create: `src/components/LanguageSwitch.tsx`
- Create: `src/components/SiteNav.tsx`
- Create: `src/styles/global.css`
- Test: `src/components/LanguageSwitch.test.tsx`
- Test: `src/components/SiteNav.test.tsx`

**Interfaces:**
- Consumes: `useLanguage()`, translated navigation labels, and React Router.
- Produces: shared `<header>`, `<main>`, collection links, and keyboard-accessible language controls.

- [ ] **Step 1: Write interaction tests**

```tsx
test('switches every language button with an accessible pressed state', async () => {
  render(<LanguageSwitch />);
  await userEvent.click(screen.getByRole('button', { name: 'English' }));
  expect(screen.getByRole('button', { name: 'English' })).toHaveAttribute('aria-pressed', 'true');
});

test('offers all four collection routes', () => {
  render(<MemoryRouter><SiteNav /></MemoryRouter>);
  expect(screen.getAllByRole('link')).toHaveLength(4);
});
```

- [ ] **Step 2: Run tests to verify failure**

Run: `npm run test -- --run src/components/LanguageSwitch.test.tsx src/components/SiteNav.test.tsx`

Expected: FAIL because the components do not exist.

- [ ] **Step 3: Implement shell components and CSS tokens**

```tsx
<nav aria-label={labels.primaryNavigation}>
  {collections.map((collection) => <NavLink key={collection.slug} to={`/works/${collection.slug}`}>{collection.label[locale]}</NavLink>)}
  <NavLink to="/works">{labels.allWorks}</NavLink>
</nav>
```

Use semantic header/nav/main/footer landmarks. Make `.language-switch` fixed in the corner, use `button` elements labelled `繁體中文`, `简体中文`, and `English`, and add `:focus-visible` outlines. Define no arbitrary z-index values; declare tokens such as `--z-nav`, `--z-menu`, and `--z-modal`.

- [ ] **Step 4: Run tests and build**

Run: `npm run test -- --run src/components/LanguageSwitch.test.tsx src/components/SiteNav.test.tsx && npm run build`

Expected: PASS and successful build.

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx src/components src/styles
git commit -m "feat: add accessible portfolio shell"
```

### Task 4: Implement the Material Atlas homepage

**Files:**
- Create: `src/components/ProjectCard.tsx`
- Create: `src/components/MaterialAtlas.tsx`
- Create: `src/pages/HomePage.tsx`
- Modify: `src/styles/global.css`
- Test: `src/components/MaterialAtlas.test.tsx`

**Interfaces:**
- Consumes: `featuredProjects`, `Project`, `Locale`, and route `'/works/:slug'`.
- Produces: focusable desktop atlas and touch-friendly mobile project rail.

- [ ] **Step 1: Write desktop and touch behavior tests**

```tsx
test('reveals metadata when a featured card receives keyboard focus', async () => {
  render(<MemoryRouter><MaterialAtlas projects={featuredProjects} /></MemoryRouter>);
  await userEvent.tab();
  expect(screen.getByText(featuredProjects[0].copy['zh-Hant'].title)).toBeVisible();
});

test('shows a visible project link after mobile disclosure', async () => {
  window.matchMedia = () => ({ matches: true }) as MediaQueryList;
  render(<MemoryRouter><MaterialAtlas projects={featuredProjects} /></MemoryRouter>);
  await userEvent.click(screen.getAllByRole('button', { name: /顯示作品資訊/i })[0]);
  expect(screen.getAllByRole('link', { name: /閱讀案例/i })[0]).toBeVisible();
});
```

- [ ] **Step 2: Run tests to verify failure**

Run: `npm run test -- --run src/components/MaterialAtlas.test.tsx`

Expected: FAIL because the atlas is absent.

- [ ] **Step 3: Implement progressive interaction**

```tsx
<article className={`atlas-card atlas-card--${index}`}>
  <Link to={`/works/${project.slug}`} aria-label={`${project.copy[locale].title} — ${labels.openCaseStudy}`}>
    <img src={project.media[0].src} width={project.media[0].width} height={project.media[0].height} alt={project.media[0].alt[locale]} />
    <span className="atlas-card__meta">{project.copy[locale].title}</span>
  </Link>
</article>
```

Use CSS custom properties for each card position; do not animate layout properties. Desktop uses `:hover` and `:focus-within` for scale/crop, while the mobile media query removes absolute positioning and renders a scrollable ordered rail. `@media (prefers-reduced-motion: reduce)` must retain card metadata without transforms.

- [ ] **Step 4: Run tests and responsive manual checks**

Run: `npm run test -- --run src/components/MaterialAtlas.test.tsx && npm run dev`

Expected: PASS. Verify 375px, 768px, 1024px, and 1440px with browser DevTools: no horizontal scroll, all five cards operable, and visible title/metadata without hover.

- [ ] **Step 5: Commit**

```bash
git add src/components/ProjectCard.tsx src/components/MaterialAtlas.tsx src/pages/HomePage.tsx src/styles/global.css src/components/MaterialAtlas.test.tsx
git commit -m "feat: build material atlas homepage"
```

### Task 5: Add collection and case-study routes

**Files:**
- Create: `src/pages/CollectionPage.tsx`
- Create: `src/pages/ProjectPage.tsx`
- Create: `src/pages/NotFoundPage.tsx`
- Modify: `src/App.tsx`
- Test: `src/pages/CollectionPage.test.tsx`
- Test: `src/pages/ProjectPage.test.tsx`

**Interfaces:**
- Consumes: `getProject(slug)`, collection records, `useLanguage()`, and router params.
- Produces: `/works`, `/works/:collection`, `/works/:slug`, and localised 404 routes.

- [ ] **Step 1: Write routing tests**

```tsx
test('filters the collection page to one design theme', () => {
  renderAt('/works/emotion');
  expect(screen.getByRole('heading', { name: /Emotion & Meaning/i })).toBeInTheDocument();
  expect(screen.getByText(/Together/i)).toBeInTheDocument();
});

test('renders the case-study sections and related work', () => {
  renderAt('/works/lighting-backbone');
  expect(screen.getByRole('heading', { name: /Backbone/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Related/i })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run tests to verify failure**

Run: `npm run test -- --run src/pages/CollectionPage.test.tsx src/pages/ProjectPage.test.tsx`

Expected: FAIL because routes and pages are absent.

- [ ] **Step 3: Implement data-driven routes**

```tsx
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/works" element={<CollectionPage />} />
  <Route path="/works/:slug" element={<ProjectOrCollectionRoute />} />
  <Route path="/about" element={<AboutPage />} />
  <Route path="*" element={<NotFoundPage />} />
</Routes>
```

Resolve a collection slug before a project slug. Render hero media with width/height attributes, `loading="lazy"` for below-fold work, semantic section headings for the case-study sequence, and a meaningful related-work list. When a project lacks translated body text, render its primary-language body with `lang` set to the source locale and show no empty section.

- [ ] **Step 4: Run tests and build**

Run: `npm run test -- --run src/pages/CollectionPage.test.tsx src/pages/ProjectPage.test.tsx && npm run build`

Expected: PASS and successful build.

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx src/pages
git commit -m "feat: add collection and case study routes"
```

### Task 6: Complete About, contact, and release verification

**Files:**
- Create: `src/pages/AboutPage.tsx`
- Modify: `src/App.tsx`
- Modify: `src/styles/global.css`
- Test: `src/pages/AboutPage.test.tsx`
- Test: `src/App.test.tsx`

**Interfaces:**
- Consumes: `useLanguage()` and shared shell.
- Produces: localised profile, availability, social links, and route-level language persistence.

- [ ] **Step 1: Write final acceptance tests**

```tsx
test('preserves the current project route when language changes', async () => {
  renderAt('/works/lighting-backbone');
  await userEvent.click(screen.getByRole('button', { name: 'English' }));
  expect(window.location.pathname).toBe('/works/lighting-backbone');
  expect(screen.getByRole('heading', { name: /Backbone/i })).toBeInTheDocument();
});

test('offers a direct email contact link and safe external profile links', () => {
  renderAt('/about');
  expect(screen.getByRole('link', { name: /email/i })).toHaveAttribute('href', 'mailto:juby9988@gmail.com');
});
```

- [ ] **Step 2: Run tests to verify failure**

Run: `npm run test -- --run src/pages/AboutPage.test.tsx src/App.test.tsx`

Expected: FAIL because the final page and route persistence checks are incomplete.

- [ ] **Step 3: Implement About and link safety**

Render Sharlian’s role, selected experience, availability for full-time and freelance work, Behance, LinkedIn, and email links from translated data. Give each external link `target="_blank" rel="noreferrer"`; keep email in the same tab. Add a skip link and ensure the route change moves focus to `<main tabIndex={-1}>`.

- [ ] **Step 4: Run full quality verification**

Run: `npm run test -- --run && npm run build`

Expected: all tests PASS and a successful production build. Manually verify language switching at every route, keyboard-only navigation, reduced-motion behavior, and the four target viewport widths.

- [ ] **Step 5: Commit**

```bash
git add src/pages/AboutPage.tsx src/App.tsx src/styles/global.css src/pages/AboutPage.test.tsx src/App.test.tsx
git commit -m "feat: finish portfolio contact and accessibility"
```

## Plan self-review

- Spec coverage: Tasks 2–3 cover the three whole-site languages and persistent navigation; Task 4 covers the Material Atlas and mobile/reduced-motion behavior; Task 5 covers collections and reusable case studies; Task 6 covers About, Contact, accessibility, and final verification.
- Placeholder scan: no deferred implementation markers or undefined interfaces remain.
- Type consistency: all downstream project consumers use the `Project`, `Locale`, `useLanguage`, and `getProject` interfaces defined in Task 2.
