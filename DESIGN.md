---
name: Nikhil Singh — Survey Sheet
description: A portfolio drawn as a survey sheet; work plotted as parcels, outcomes drawn as dimension lines.
colors:
  drafting-ground: "#10120f"
  ground-raised: "#151813"
  grid-line: "#1d2119"
  rule: "#2c3127"
  parchment-ink: "#ece6d6"
  ink-secondary: "#c9c2b0"
  ink-dim: "#948f80"
  survey-orange: "#ff5a1f"
  survey-orange-ink: "#1a0b04"
typography:
  display:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "clamp(64px, min(12.2vw, 22svh), 200px)"
    fontWeight: 800
    lineHeight: 0.86
    letterSpacing: "-0.005em"
  section-head:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "clamp(48px, 7vw, 112px)"
    fontWeight: 800
    lineHeight: 0.86
  parcel-title:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "22px"
    fontWeight: 700
    lineHeight: 1.1
  body:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 400
    letterSpacing: "0.06em"
rounded:
  none: "0px"
spacing:
  edge: "16px"
  gutter: "28px"
  pad: "clamp(16px, 2.2vw, 32px)"
  row: "clamp(100px, calc((100svh - 60px) / 7), 132px)"
components:
  button-primary:
    backgroundColor: "{colors.parchment-ink}"
    textColor: "{colors.drafting-ground}"
    rounded: "{rounded.none}"
    padding: "12px 18px"
  button-primary-hover:
    backgroundColor: "{colors.survey-orange}"
    textColor: "{colors.survey-orange-ink}"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.parchment-ink}"
    rounded: "{rounded.none}"
    padding: "8px 12px"
---

# Design System: Nikhil Singh — Survey Sheet

## Overview

The whole page is one survey sheet. A lettered column axis runs along the top, a numbered row gutter runs down the left for the full length of the page, and faint column lines carry through every section. Work is plotted on the sheet as parcels; outcomes are drawn as dimension lines with tick ends, never as stat tiles. The type is the image: Archivo at 62% width and heavy weight sets the name, section words and the closing email at poster scale on a green-black drafting ground.

The sheet is also an instrument. On fine pointers the cursor becomes a surveyor's crosshair with a live grid reference, and a click drops a datum that measures the distance to the pointer. That measuring tool is the signature interaction; nothing else on the page competes with it.

Mode: Experience. Ambition shows as commitment to the drawing conventions (title blocks, legends, parcels, dimensions), not as effects.

## Colors

### Primary
- **Survey orange** `#ff5a1f`: reserved for what is live (the current job) and for measurements (dimension lines, the datum, focus rings, selection). Never decorative, never a fill for large areas.

### Neutral
- **Drafting ground** `#10120f`: the sheet. Green-black, not slate.
- **Ground raised** `#151813`: hover fill on parcels and nav links.
- **Grid line** `#1d2119` and **Rule** `#2c3127`: column grid, hero row grid, frame and table rules.
- **Parchment ink** `#ece6d6`: type and solid parcel outlines.
- **Ink secondary** `#c9c2b0` for prose, **Ink dim** `#948f80` for metadata and labels.

### Named Rules
- **One signal.** Orange appears only where something is live or measured. If an element is neither, it is ink.

## Typography

One family, Archivo Variable (self-hosted via @fontsource-variable/archivo, wdth axis), used at two widths: 62% for display, 75% for parcel titles and key terms, 100% for prose. Tabular figures everywhere.

### Hierarchy
- Display (name, contact email): 62% width, 800, line-height 0.86, uppercase for the name.
- Section heads: 62% width, 800, clamp(48px, 7vw, 112px), uppercase.
- Entry and project names: 62% width, 800, 34–54px (entries), 56–136px (projects).
- Parcel titles and key terms: 75% width, 700, uppercase.
- Body: 100% width, 16–17px, line-height 1.55, max ~72ch.
- Labels (title blocks, axes): 10–12px, uppercase, tracked 0.06–0.12em.

### Named Rules
- **No eyebrows.** Headings stand alone; sheet metadata lives in title blocks and axes, never as a label above a heading.

## Layout

A 12-column grid (4 on phones) sits inside a framed sheet with a 28px row gutter and a 28px column axis. The row unit `--row` derives from viewport height so the 7-row hero sheet always fits the first viewport; a `.row-probe` element exposes its resolved pixel value to scripts. Content indents 0.4 column from the sheet edge. Hero parcels are placed by column/row coordinates (`--x`, `--y`, `--w`). Sections are separated by full-width rules; entries are two-zone (identity in columns 1–4, body in 5–12).

## Elevation & Depth

None. The sheet is flat line-work: depth comes from outline weight (1.5px parcels, 1px rules) and from solid vs dashed strokes. No shadows, blurs or gradients.

## Shapes

All corners square. Strokes: 1.5px for parcels and arrows, 1–1.25px for rules and dimension lines.

## Components

### Buttons
- Primary: parchment fill, ground text, square, 12×18 padding; hover turns survey orange.
- Quiet (copy address): transparent with a rule border; confirms in orange.

### Cards / Containers
- **Parcel**: outlined box drawn in SVG. Solid = shipped at work; dashed (4 3) = built on my own; orange = live. Solid parcels draw their outline once on load (stroke-dashoffset, 1100ms ease-out, staggered).
- **Title block**: ruled grid of label/value cells, used in the hero (sheet details, email) and as the page's closing footer.

### Navigation
- Fixed, ruled box of four text links top-right (bottom-centre on phones); current section shows in orange.

### Dimension line
- Horizontal bracket with tick ends, value in orange bold, label in secondary ink. One oblique dimension in the hero runs between plotted items with SVG tick markers.

### Measuring tool
- Fine pointers ≥761px only. Orange crosshair hairlines, fixed readout with grid reference (column letter + row number), click to set a datum, Esc to clear. Ignores clicks on links and buttons.

## Do's and Don'ts

### Do:
- Express every metric as a dimension line or a plotted label.
- Keep orange for live and measured things only.
- Draw icons as inline SVG at 1.5 stroke (see `Arrow.jsx`).
- Theme browser surfaces: selection, focus ring and scrollbar come from the palette.

### Don't:
- Don't add cards with shadows, chips, icon tiles, gradients or glow.
- Don't put labels or numbers above headings.
- Don't use Unicode glyphs as icons.
- Don't animate entries on scroll; the load-time outline draw is the page's single motion moment.
