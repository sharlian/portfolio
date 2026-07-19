# Sharlian Portfolio — Design Specification

## Intent

Create a bilingual/trilingual portfolio that helps hiring teams and prospective collaborators understand Sharlian as a product and furniture designer. The experience leads with a tactile, image-led point of view, then makes project thinking, role, process, and outcomes easy to find.

## Audience and voice

Primary: product-design hiring teams. Secondary: collaborators and commission clients.

Voice: tactile, curious, composed. The site should feel like moving around a collection of material studies, not browsing a template gallery or an editorial magazine.

## Information architecture

- Home: Material Atlas interaction, category links, concise introduction, availability/contact.
- Collections: Emotion & Meaning, Form & Culture, Function & Reality, and All works.
- Case study: one reusable content model for all works.
- About / Contact: background, selected experience, role/commission availability, direct contact and social links.

## Home: Material Atlas

The first viewport centres `Sharlian` and `industrial design | product design | furniture design`. Five selected works — LIGHTING | Backbone, PET_HUMAN | Together.II, LOUNGE CHAIR | Axiom.N, SOFA | The Marshal's Crest, and TEA CEREMONY DESIGN | Zzzing — orbit the title as positioned image-detail cards.

On desktop, pointer proximity brings an individual card forward: its crop expands, title and collection appear, and the card receives a clear focus state. Clicking navigates to that work. The cards retain useful labels without hover, are reachable by keyboard, and use a non-motion focus treatment for reduced-motion users. On touch screens, the orbit becomes a vertically ordered, swipeable rail: one tap reveals metadata and a visible button; the second activation or button opens the case study.

Four persistent collection controls link to Emotion & Meaning, Form & Culture, Function & Reality, and All works. They are meaningful navigation, not decorative tags.

## Case study template

Each project has: hero image/video, project statement, category, year, role, collaborators, brief, research/context, concept development, process artefacts, final outcome, and related works. The visual rhythm can change per project, but the information model stays predictable for recruiters.

## Language system

A fixed corner language control offers `繁 / 简 / EN`. Its choice persists in local storage and switches the current page in place; a route fallback returns to the corresponding collection or home page if a translation is unavailable. Chinese variants are separate strings, never automatic script conversion. Project metadata, calls to action, navigation, and case-study body all change together. The language control has an accessible label and keyboard support.

## Visual and motion rules

Use the project’s real photography, renders, process images, and video rather than fabricated visual assets. Typography will retain the direct, restrained utility of the current site while avoiding a generic portfolio treatment. Motion is spatial and purposeful: proximity, scale, crop, and a short route transition; no autoplaying spectacle or hover-only affordances. All motion respects `prefers-reduced-motion`.

## Technical boundaries

Build as a responsive static-first frontend with structured project content and language dictionaries. Image dimensions are reserved to prevent layout shift; galleries lazy-load non-critical media. Missing image or translation data falls back to a textual project label and the primary-language content, never a broken card. External links open safely and contact links are direct.

## Acceptance checks

- The five featured cards are keyboard-operable and work at 375px, 768px, 1024px, and 1440px.
- All four collection links navigate correctly.
- Switching 繁 / 简 / EN changes the complete interface and persists after refresh.
- The current route and selected project survive a language change where a translation exists.
- Body contrast meets WCAG AA and focus indicators remain visible.
- Reduced-motion mode removes orbit and expansion motion without hiding content.
