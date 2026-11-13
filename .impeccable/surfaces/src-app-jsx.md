---
version: 1
slug: "src-app-jsx"
primary_target: "src/App.jsx"
related_targets: []
---

# Portfolio home (single page)

Scope: the whole one-page portfolio (src/App.jsx and its sections). Visitor mode: Experience.
Audience: engineering managers, staff engineers, CTOs judging a senior/staff frontend IC in one to two minutes. Job: believe he builds hard real-time, geospatial frontends to measurable outcomes; reach out by email.
References given by the user as craft bar: bepatrickdavid.com, seyi.dev (oversized condensed display on near-black, type as image), rauno.me (interaction precision). Code-led build (no image generation).

## Direction contract

THESIS: The portfolio is a survey sheet: a measured coordinate grid on which his work is plotted as parcels and his outcomes are drawn as dimension lines. It refuses the category default of hero + about + card grid + skills chips.

OWN-WORLD: Green-black drafting ground (#10120f) with a faint 12-column lettered grid and numbered row gutter; parchment ink (#ece6d6) for type and solid parcel outlines; survey orange (#ff5a1f) reserved for what is live and for measurements; dashed outlines for personal work. Archivo variable: 62% width heavy for display, 100% width for prose; tabular figures for every number. Title blocks, legends and dimension lines are the components. No cards with shadows, no icons tiles, no gradients.

STORY: First viewport: who (name), what (real-time + geospatial frontend), proof (Scout and DXP parcels with metric dimensions). Scroll: work schedule with outcomes, own-built projects, toolkit as a legend, close on a title block with email.

FIRST VIEWPORT: Full-height sheet. Lettered column axis top, numbered rows left. Name at ~12vw condensed heavy, rows 1-3 left; one-line role below. Right half: Scout parcel (orange, live) with a "$30K+ in 3 months" dimension line, DXP parcel, Fixproof and Tayyari dashed parcels. Legend bottom-left; title block bottom-right carrying email (the primary action). Nav top-right.

FORM: Survey sheet, position 1 on the ordered list (Impeccable's pick, chosen by the user over the assigned departure board). seed:2c5cbe2cbe60324a. Signature interaction: the cursor is a surveyor's measuring tool: crosshair with live grid reference, click to drop a datum and a dimension line reads distance to the pointer. Motion grammar: grid and parcel outlines draw in once on load (stroke draw), nothing else animates on entry; reduced motion shows final state.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

Unresolved: none.
