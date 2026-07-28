# Portfolio Desk Homepage Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Material Atlas homepage with an accessible, responsive working-desk structure whose canonical local routes expose All Works and three design categories.

**Architecture:** Keep the existing Vite/React application, language provider, project data, and project pages. Add a data-driven desk feature with one shared DOM composition for Day and Night, integrate it through a persistent site shell, and fix the collection page so `/works` renders every local project. New scoped styles avoid overwriting the existing uncommitted homepage experiments.

**Tech Stack:** Vite 8, React 19, TypeScript, React Router, Vitest, Testing Library, CSS custom properties.

## Global Constraints

- The new React site owns all content and navigation; do not add Cargo legacy URL redirects.
- Do not delete or stage existing uncommitted changes in `LanguageSwitch.tsx`, `MaterialAtlas.tsx`, `MaterialAtlas.test.tsx`, `ProjectCard.tsx`, `SiteNav.tsx`, `SiteNav.test.tsx`, or `global.css`.
- Do not add GSAP, Canvas, WebGL, image assets, audio files, autoplay, or Focus Mode in Phase 1.
- Use canonical routes `/works`, `/works/emotion`, `/works/form`, and `/works/function`.
- Keep text navigation functional without imagery and preserve visible keyboard focus.
- Day is 07:00–17:30 inclusive; Night is 17:31–06:59.
- Mobile renders All Works first, followed by Emotion & Meaning, Form & Culture, and Function & Reality.
- Use only verified contact URLs for Email, Behance, and LinkedIn.

---

## File Structure

- `src/data/desk.ts` — typed categories, canonical routes, and verified contacts.
- `src/utils/deskMode.ts` — pure local-time-to-mode resolver.
- `src/utils/deskMode.test.ts` — boundary tests for Day and Night.
- `src/components/CategoryHotspot.tsx` — reusable semantic category destination.
- `src/components/AllWorksHotspot.tsx` — primary All Works destination.
- `src/components/DeskScene.tsx` — one shared day/night scene and stable destination order.
- `src/components/PortfolioDesk.tsx` — initial local-time mode selection.
- `src/components/PortfolioDesk.test.tsx` — navigation, order, and mode behavior.
- `src/components/SiteHeader.tsx` — persistent brand, role, All Works, and language UI.
- `src/components/SiteFooter.tsx` — persistent verified contacts.
- `src/components/SiteShell.test.tsx` — shell navigation and contact behavior.
- `src/styles/desk.css` — scoped desk scene and responsive styles.
- `src/styles/shell.css` — scoped fixed header/footer styles.
- `src/pages/HomePage.tsx` — render `PortfolioDesk`.
- `src/pages/CollectionPage.tsx` — render all projects when no collection slug is present.
- `src/pages/CollectionPage.test.tsx` — category filtering plus All Works coverage.
- `src/App.tsx` — persistent shell and canonical routes.
- `src/App.test.tsx` — application-level homepage route assertions.

### Task 1: Define desk navigation and local-time mode

**Files:**
- Create: `src/data/desk.ts`
- Create: `src/utils/deskMode.ts`
- Create: `src/utils/deskMode.test.ts`

**Interfaces:**
- Produces: `DeskCategory`, `deskCategories`, `deskContacts`, `DeskMode`, and `getDeskMode(date)`.
- Consumes: no application state or browser APIs beyond a supplied `Date`.

- [ ] **Step 1: Write the failing boundary test**

```ts
import { describe, expect, test } from 'vitest';
import { getDeskMode } from './deskMode';

describe('getDeskMode', () => {
  test.each([
    [new Date(2026, 6, 29, 7, 0), 'day'],
    [new Date(2026, 6, 29, 17, 30), 'day'],
    [new Date(2026, 6, 29, 6, 59), 'night'],
    [new Date(2026, 6, 29, 17, 31), 'night'],
  ] as const)('maps local time %s to %s', (date, expected) => {
    expect(getDeskMode(date)).toBe(expected);
  });
});
```

- [ ] **Step 2: Run the test and confirm the missing-module failure**

Run: `npm run test -- --run src/utils/deskMode.test.ts`

Expected: FAIL because `deskMode.ts` does not exist.

- [ ] **Step 3: Implement the pure resolver and navigation data**

```ts
export type DeskMode = 'day' | 'night';

export function getDeskMode(date: Date): DeskMode {
  const minutes = date.getHours() * 60 + date.getMinutes();
  return minutes >= 7 * 60 && minutes <= 17 * 60 + 30 ? 'day' : 'night';
}
```

`desk.ts` exports the three exact category titles, descriptions, and canonical paths from the specification, plus the three verified contact links.

- [ ] **Step 4: Run the focused test**

Run: `npm run test -- --run src/utils/deskMode.test.ts`

Expected: four PASS cases.

- [ ] **Step 5: Commit only the new data and utility files**

```bash
git add src/data/desk.ts src/utils/deskMode.ts src/utils/deskMode.test.ts
git commit -m "feat: define portfolio desk navigation"
```

### Task 2: Build the accessible shared desk scene

**Files:**
- Create: `src/components/CategoryHotspot.tsx`
- Create: `src/components/AllWorksHotspot.tsx`
- Create: `src/components/DeskScene.tsx`
- Create: `src/components/PortfolioDesk.tsx`
- Create: `src/components/PortfolioDesk.test.tsx`
- Create: `src/styles/desk.css`

**Interfaces:**
- Consumes: `deskCategories`, `DeskMode`, and `getDeskMode(date)`.
- Produces: `<PortfolioDesk now?: Date />` and `<DeskScene mode: DeskMode />`.

- [ ] **Step 1: Write failing navigation and mode tests**

```tsx
test('renders the four canonical desk destinations in reading order', () => {
  render(<MemoryRouter><PortfolioDesk now={new Date(2026, 6, 29, 12, 0)} /></MemoryRouter>);
  expect(screen.getAllByRole('link').map((link) => link.getAttribute('href'))).toEqual([
    '/works', '/works/emotion', '/works/form', '/works/function',
  ]);
});

test('uses one navigation structure in night mode', () => {
  const { container } = render(<MemoryRouter><PortfolioDesk now={new Date(2026, 6, 29, 22, 0)} /></MemoryRouter>);
  expect(container.querySelector('[data-mode="night"]')).toBeInTheDocument();
  expect(screen.getAllByRole('link')).toHaveLength(4);
});
```

- [ ] **Step 2: Run the focused test and confirm the missing-component failure**

Run: `npm run test -- --run src/components/PortfolioDesk.test.tsx`

Expected: FAIL because `PortfolioDesk.tsx` does not exist.

- [ ] **Step 3: Implement semantic components**

```tsx
export function CategoryHotspot({ category }: { category: DeskCategory }) {
  return (
    <Link aria-label={`${category.title}. ${category.description}`} className={`desk-hotspot desk-hotspot--${category.id}`} to={category.href}>
      <span className="desk-hotspot__title">{category.title}</span>
      <span className="desk-hotspot__description">{category.description}</span>
    </Link>
  );
}
```

`DeskScene` renders All Works first and maps `deskCategories` once. It sets `data-mode={mode}` and decorative placeholder elements use `aria-hidden="true"`. `PortfolioDesk` accepts an optional `now` only to make time behavior deterministic in tests and otherwise uses `new Date()`.

- [ ] **Step 4: Add scoped responsive styles**

Create a composed desktop surface with centre, left, upper-right, and lower-right hotspot positions. Below 700px, switch to normal-flow vertical ordering. Keep links readable by default, use transform/opacity only, and disable nonessential transitions under `prefers-reduced-motion`.

- [ ] **Step 5: Run the focused tests**

Run: `npm run test -- --run src/components/PortfolioDesk.test.tsx`

Expected: both tests PASS.

- [ ] **Step 6: Commit only the new desk feature files**

```bash
git add src/components/CategoryHotspot.tsx src/components/AllWorksHotspot.tsx src/components/DeskScene.tsx src/components/PortfolioDesk.tsx src/components/PortfolioDesk.test.tsx src/styles/desk.css
git commit -m "feat: build accessible portfolio desk scene"
```

### Task 3: Add the persistent brand and contact shell

**Files:**
- Create: `src/components/SiteHeader.tsx`
- Create: `src/components/SiteFooter.tsx`
- Create: `src/components/SiteShell.test.tsx`
- Create: `src/styles/shell.css`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `LanguageSwitch` and `deskContacts`.
- Produces: persistent brand-to-home link, role, All Works link, language controls, and verified footer contacts.

- [ ] **Step 1: Write failing shell tests**

```tsx
test('uses the designer name as the only home link', () => {
  render(<MemoryRouter><LanguageProvider><SiteHeader /></LanguageProvider></MemoryRouter>);
  expect(screen.getByRole('link', { name: 'SHARLIAN TSENG — Back to desk' })).toHaveAttribute('href', '/');
  expect(screen.queryByText('Home')).not.toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'ALL WORKS' })).toHaveAttribute('href', '/works');
});

test('renders only verified contact destinations', () => {
  render(<MemoryRouter><SiteFooter /></MemoryRouter>);
  expect(screen.getAllByRole('link').map((link) => link.textContent)).toEqual(['Email', 'Behance', 'LinkedIn']);
});
```

- [ ] **Step 2: Run and confirm the missing-component failure**

Run: `npm run test -- --run src/components/SiteShell.test.tsx`

Expected: FAIL because the shell components do not exist.

- [ ] **Step 3: Implement the shell and integrate it into `App.tsx`**

`SiteHeader` renders the exact brand and role copy, the persistent `/works` link, and the existing `LanguageSwitch`. `SiteFooter` maps `deskContacts`; external HTTPS links use `target="_blank"` and `rel="noreferrer"`, while email remains a direct mail link. Replace the old `SiteNav` header in `App.tsx`, place the footer after routes, and keep the skip link.

- [ ] **Step 4: Add scoped shell styles**

Use unique `.portfolio-header`, `.portfolio-brand`, `.portfolio-all-works`, and `.portfolio-footer` classes so existing dirty `.site-*` rules remain untouched. Keep a semantic z-index order and compact mobile spacing.

- [ ] **Step 5: Run shell tests and the application smoke test**

Run: `npm run test -- --run src/components/SiteShell.test.tsx src/App.test.tsx`

Expected: all focused tests PASS.

- [ ] **Step 6: Commit clean shell files only**

```bash
git add src/components/SiteHeader.tsx src/components/SiteFooter.tsx src/components/SiteShell.test.tsx src/styles/shell.css src/App.tsx
git commit -m "feat: add persistent portfolio shell"
```

### Task 4: Integrate the homepage and repair All Works

**Files:**
- Modify: `src/pages/HomePage.tsx`
- Modify: `src/pages/CollectionPage.tsx`
- Modify: `src/pages/CollectionPage.test.tsx`
- Modify: `src/App.test.tsx`

**Interfaces:**
- Consumes: `PortfolioDesk`, `projects`, `collections`, and the existing language provider.
- Produces: functional `/`, `/works`, and filtered category routes.

- [ ] **Step 1: Add a failing All Works test**

```tsx
test('renders every project on the All Works route', () => {
  render(<MemoryRouter initialEntries={['/works']}><LanguageProvider><Routes><Route element={<CollectionPage />} path="/works" /></Routes></LanguageProvider></MemoryRouter>);
  expect(screen.getByRole('heading', { name: '所有作品' })).toBeInTheDocument();
  expect(screen.getAllByRole('link')).toHaveLength(projects.length);
});
```

- [ ] **Step 2: Run and confirm the existing blank-page failure**

Run: `npm run test -- --run src/pages/CollectionPage.test.tsx`

Expected: FAIL because `CollectionPage` currently returns `null` without a slug.

- [ ] **Step 3: Implement All Works and homepage integration**

When `slug` is absent, `CollectionPage` uses every project and `labels.allWorks`; when present, it uses the matching collection and filtered projects. `HomePage` becomes a thin wrapper around `PortfolioDesk`.

- [ ] **Step 4: Strengthen the App smoke test**

Assert that rendering `/` exposes the main landmark, brand link, All Works link, and all three category links. Use accessible names and hrefs rather than implementation classes.

- [ ] **Step 5: Run the focused tests**

Run: `npm run test -- --run src/pages/CollectionPage.test.tsx src/App.test.tsx`

Expected: all focused tests PASS.

- [ ] **Step 6: Commit integration changes**

```bash
git add src/pages/HomePage.tsx src/pages/CollectionPage.tsx src/pages/CollectionPage.test.tsx src/App.test.tsx
git commit -m "feat: connect desk homepage and all works"
```

### Task 5: Full verification and visual checks

**Files:**
- Modify only if verification reveals a Phase 1 defect in files created or intentionally changed by this plan.

**Interfaces:**
- Consumes: the completed Phase 1 implementation.
- Produces: test, type, build, accessibility, responsive, and console evidence.

- [ ] **Step 1: Run the entire automated suite**

Run: `npm run test -- --run`

Expected: every test file and test passes with no failures.

- [ ] **Step 2: Run TypeScript and production build**

Run: `npx tsc -b --pretty false --noEmit`

Expected: exit code 0 with no diagnostics.

Run: `npm run build`

Expected: exit code 0 and generated Vite assets.

- [ ] **Step 3: Record lint availability accurately**

Run: `npm pkg get scripts.lint`

Expected: `{}` because the current project has no lint script. Do not add a lint dependency in Phase 1 solely to create a passing claim.

- [ ] **Step 4: Start the local site and verify it in a browser**

Run: `npm run dev -- --host 127.0.0.1`

At 1440×900 and 375×812 verify:

- The header brand and All Works remain easy to locate.
- All four desk destinations are visible and navigable.
- Mobile order is All Works, Emotion, Form, Function.
- There is no horizontal overflow.
- Keyboard Tab reaches all primary links with a visible focus indicator.
- `/works` displays every local project.
- Browser console contains no errors.

- [ ] **Step 5: Inspect the final diff and requirement coverage**

Run: `git diff --check` and `git status --short`.

Expected: no whitespace errors; the pre-existing seven dirty files remain present and unstaged, while plan files are committed.

- [ ] **Step 6: Do not commit verification-only build output**

Confirm `dist/` remains ignored and no generated artifact is staged.
