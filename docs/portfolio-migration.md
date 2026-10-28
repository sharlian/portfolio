# Cargo portfolio migration

## Delivered scope

The authenticated Cargo editor was captured before expiration and converted into a standalone Vite/React portfolio. The source contains 39 projects in Cargo's All Works order, with 9 Emotion & Meaning works, 16 Form & Culture works, 10 Function & Reality works, and 4 works that appear only in All Works.

The active site intentionally omits the previous desk scene, day/night mode, music, 3D, and complex animation. It uses the routes `/`, `/works`, `/works/emotion`, `/works/form`, `/works/function`, and `/projects/:slug`.

## Content decisions

- Text remains in the language and wording rendered by Cargo.
- Project text, images, videos, dividers, and unavailable-asset markers retain their source order.
- The Cargo page for `PET_HUMAN | Eat together !` begins with a copied `MATERIAL APPLICATION | Acrylic` heading. The verified page title is used and the remaining source body is preserved.
- Cargo returned transparent placeholders for two Company images and one Tie image. The new site keeps explicit markers in their original positions instead of inventing replacements.
- Only Cargo-confirmed contact destinations are shown: email, Behance, and LinkedIn.

## Asset strategy

All 816 recoverable unique Cargo assets were downloaded: 777 images and 39 videos. Originals are stored under `archive/cargo-originals/` and excluded from Vite builds. Runtime images are 2400 px maximum AVIF derivatives; runtime videos are locally encoded H.264 derivatives. The application bundle contains no Cargo media or content URL dependency.

## Visual and technical approach

The active site uses a warm neutral background, system fonts, visible focus styles, semantic landmarks, intrinsic image ratios, responsive one/two/three-column grids, and no hover-only information. React Router provides the page structure, while host rewrite files support direct loading of nested routes.

## Verification target

- All 39 project cards reach a shared project detail route.
- All 777 recoverable project media positions render local files; three missing positions render explicit markers.
- Tests, TypeScript, and production build pass.
- The final browser review covers desktop and mobile home, listing, category, project, and missing-asset states before public deployment.
