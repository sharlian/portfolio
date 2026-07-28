# Portfolio Desk Homepage — Phase 1 Design Specification

## Intent

Replace the current Material Atlas homepage with the structural foundation for a designer's working desk. The homepage should make Sharlian's product and furniture design practice understandable within seconds while leaving room for later photographic desk assets, restrained interaction, and Focus Mode.

Phase 1 is deliberately structural. It establishes navigation, content hierarchy, day/night scene states, responsive behavior, and accessibility with lightweight placeholders. It does not add final object photography, elaborate animation, music, or Focus Mode controls.

## Product direction

The homepage is a near-full-screen desk scene governed by the statement:

> Every object on this desk represents a part of how I think as a designer.

Objects provide the narrative and visible text provides the navigation. The scene should feel calm, warm, lived-in, and recognizably connected to physical design work. It must not resemble a game interface, a futuristic dashboard, or the reference site's visual system.

The first implementation uses simple, clearly labelled placeholder zones rather than fabricated object illustrations. Real desk-object imagery will replace those zones in Phase 2 without changing routes, clickable areas, or information architecture.

## Canonical information architecture

The new React site owns all content and navigation. Cargo is a migration source only; the new site will not preserve or redirect legacy Cargo page URLs.

- `/` — Portfolio Desk homepage
- `/works` — All Works
- `/works/emotion` — Emotion & Meaning
- `/works/form` — Form & Culture
- `/works/function` — Function & Reality
- `/works/:projectSlug` — Individual project page

All Works must render every project rather than returning an empty collection page. Category routes filter the same local project data. Cargo project copy and media can be migrated into this data model in later content passes without altering the homepage contracts.

## Persistent interface

The header is fixed above the scene and appears on every route.

- Top left: `SHARLIAN TSENG`, linked to `/`.
- Below the name: `Product & Furniture Designer`.
- Top right: persistent `ALL WORKS`, linked to `/works`.
- Existing language controls remain available but visually secondary.
- No separate `Home` label is shown.

The footer is quiet and compact. Phase 1 uses only verified existing contact destinations:

- Email: `mailto:juby9988@gmail.com`
- Behance: `https://www.behance.net/Sharlian`
- LinkedIn: `https://www.linkedin.com/in/sharlian/`

Instagram is omitted until a verified account URL is provided.

## Desk navigation model

Navigation data has one source of truth and is not duplicated between scenes or breakpoints.

```ts
type DeskCategory = {
  id: 'emotion' | 'form' | 'function';
  title: string;
  description: string;
  href: `/works/${string}`;
};
```

The three categories are:

- Emotion & Meaning — “Objects shaped by memory, emotion and human connection.”
- Form & Culture — “Forms translated from culture, architecture and visual memory.”
- Function & Reality — “Design resolved through function, ergonomics and production.”

All Works is a separate primary destination at `/works`.

## Desktop composition

The first viewport contains one shared desk composition:

- All Works occupies the centre and is the strongest visual and navigational entry.
- Emotion & Meaning occupies the left side.
- Form & Culture occupies the upper-right side.
- Function & Reality occupies the lower-right side.
- A future Focus Mode headphone position is reserved in the lower-left composition but is not rendered as an inactive control in Phase 1.

Every hotspot is a semantic link with a visible title, short description, generous hit target, `aria-label`, and visible keyboard focus. Placeholder labels remain visible in Phase 1 so visitors never have to infer navigation from unfinished assets.

## Day and night architecture

Day and Night use the same `DeskScene` component, DOM order, routes, hotspot geometry, and navigation data. The scene exposes a `DeskMode` value and `data-mode` attribute so Phase 2 can swap visual layers without duplicating markup.

Phase 1 includes the local-time resolver:

- Day: 07:00 through 17:30 inclusive.
- Night: 17:31 through 06:59.

The resolver is a pure tested function. The homepage initializes from local time. Manual switching, persistence in `localStorage`, and animated transitions remain Phase 3 work.

Day uses a light, gently warm workshop surface with warm brown text. Night uses a darker, warm-lit surface with warm off-white text. Both themes must meet WCAG AA contrast for functional text.

## Responsive behavior

### Desktop and tablet

The scene remains a single composed surface. Tablet retains direct, one-tap navigation; it does not require a two-step disclosure because every category name is already visible.

### Mobile

At the mobile breakpoint the desk becomes a vertical sequence rather than a scaled-down desktop scene:

1. All Works
2. Emotion & Meaning
3. Form & Culture
4. Function & Reality

Every destination displays its title and description without hover. The fixed header becomes compact, and contacts appear in a simple footer row. The page must not horizontally scroll at 320px or wider.

## Component and file boundaries

- `src/data/desk.ts` — desk category copy, routes, and verified contact links.
- `src/utils/deskMode.ts` — `DeskMode` and the pure local-time resolver.
- `src/components/PortfolioDesk.tsx` — homepage orchestrator and initial mode selection.
- `src/components/DeskScene.tsx` — shared day/night scene composition.
- `src/components/CategoryHotspot.tsx` — accessible reusable category link.
- `src/components/AllWorksHotspot.tsx` — primary centre link.
- `src/components/SiteHeader.tsx` — brand-home link, role, All Works, and secondary language control.
- `src/components/SiteFooter.tsx` — verified contact links.
- `src/pages/HomePage.tsx` — route-level wrapper only.
- `src/pages/CollectionPage.tsx` — render either all projects or a category subset.
- `src/App.tsx` — canonical route tree and persistent shell.
- `src/styles/global.css` — retain existing project styles and add scoped desk tokens, layout, responsive, focus, and reduced-motion rules.

The existing `MaterialAtlas` and `ProjectCard` files are not deleted in Phase 1 because they contain uncommitted work. They become unused by the homepage and can be removed in a later cleanup after those changes are resolved.

## Accessibility

- Use semantic header, navigation, main, section, footer, and anchor elements.
- Keep the skip link and ensure its target remains focusable.
- Every desk destination is reachable by keyboard and has a visible `:focus-visible` treatment.
- Do not rely on color or imagery to identify a destination.
- Decorative placeholder layers are hidden from assistive technology.
- The header brand link has an accessible home label without displaying the word Home.
- External contact links identify that they open in a new tab and use `rel="noreferrer"`.
- Reduced-motion mode removes nonessential transforms and retains simple state changes.

## Performance and failure behavior

- Phase 1 adds no runtime animation dependency and no media dependency.
- Navigation renders immediately without waiting for images.
- Later desk assets must reserve dimensions and may fail independently; text links remain usable.
- GSAP is not added for Phase 1. CSS transform and opacity are sufficient for later basic interaction, and GSAP should be reconsidered only if Phase 3 choreography cannot be expressed cleanly in CSS.
- Audio is not created or loaded in Phase 1.

## Testing and acceptance checks

- The local-time resolver returns Day at 07:00 and 17:30, and Night at 06:59 and 17:31.
- The homepage exposes All Works and all three category links with canonical hrefs.
- The brand name links to `/`; there is no duplicate visible Home navigation label.
- `/works` renders all available projects.
- Each category route renders only its category projects.
- Verified contact links render in the footer.
- Keyboard focus remains visible for every primary destination.
- Day and Night render identical navigation links and DOM ordering.
- At mobile width the four destinations are vertically ordered and visibly labelled.
- The full Vitest suite, TypeScript check, and production build pass.
- No lint result is claimed until a lint script is added; Phase 1 reports the existing absence explicitly.

## Deferred work

Phase 2 adds final desk and object imagery. Phase 3 adds restrained hover/focus motion, manual Day/Night preview, and persistence. Phase 4 adds Focus Mode and user-initiated audio controls. Phase 5 adds asset compression, Lighthouse review, broader browser checks, and final content migration quality assurance.
