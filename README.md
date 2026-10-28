# Sharlian Tseng portfolio

Standalone Vite/React portfolio migrated from the authenticated Cargo editor on 2026-10-27. It contains 39 projects, three category views, local display media, and verified contact links.

## Run locally

```sh
npm install
npm run dev
```

The development server prints the local preview URL. This URL is not a public deployment.

## Verify and build

```sh
npm test -- --run
npm run build
npm run preview
```

The production output is `dist/`. The app uses client-side routes, so the host must send unknown paths to `index.html`. Netlify (`public/_redirects`) and Vercel (`vercel.json`) fallbacks are included.

## Content and media

- `src/data/portfolio-content.json`: generated runtime content with local media paths only.
- `content/cargo-export.json`: authenticated Cargo source archive, including original source URLs.
- `content/inventory.md`: 39-project migration inventory.
- `content/missing-assets.json`: the three Cargo assets that were unavailable.
- `public/media/display/`: 777 AVIF display images.
- `public/media/video/`: 39 H.264 display videos.
- `archive/cargo-originals/`: 816 recovered original assets. This 2.9 GB local archive is intentionally ignored by Git and excluded from the production build.

To rebuild the generated content after changing manifests, run `npm run content:generate`. Asset download and optimization scripts are also recorded in `package.json`; downloading again requires access to the original Cargo URLs.

## Deployment note

The deployable media is stored in the repository and does not depend on Cargo. Because the current production media totals roughly 250 MB, confirm the chosen host's repository/deployment size allowance before publishing. If needed later, the same local paths can be moved to independently managed object storage without changing the content model.
