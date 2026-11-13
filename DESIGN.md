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
  ui:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  caption:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 400
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

The whole page is one survey sheet: a framed drafting ground with faint column lines carried through every section. Outcomes are drawn as dimension lines with tick ends, never as stat tiles. The type is the image: Archivo at 62% width and heavy weight sets the name, section words and the closing email at poster scale.

The first viewport is a measured plot of the career. A timeline runs 2020 to now along the bottom: x is time, one lane for jobs and one for work built on my own, each item sized to how long it ran. Hovering the timeline shows a date hairline; hovering or focusing an item outlines it in orange, draws its length beneath it, and fills the one readout panel beside the name with that item's role, period and metrics. Information appears in that fixed place, never scattered across the page.

Mode: Experience. Ambition shows as commitment to the drawing conventions (title blocks, legends, parcels, dimensions), not as effects.

## Colors

### Primary
- **Survey orange** `#ff5a1f`: reserved for the selected item, the current job's "now", and measurements (dimension lines, length brackets, the date guide, focus rings, text selection). The one large orange field is the transient plotter band of the section transition; it never rests on screen.

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

A 12-column grid (4 on phones) sits inside a framed sheet. The hero fills the first viewport: name and readout in the top band (columns 1–7 and 8–12), the timeline along the bottom. Content indents 0.4 column from the sheet edge. `--row` (112px) is the vertical rhythm unit for section padding. Sections are separated by full-width rules; entries are two-zone (identity in columns 1–4, body in 5–12).

## Elevation & Depth

None. The sheet is flat line-work: depth comes from outline weight (1.5px parcels, 1px rules) and from solid vs dashed strokes. No shadows, blurs or gradients.

## Shapes

All corners square. Strokes: 1.5px for parcels and arrows, 1–1.25px for rules and dimension lines.

## Components

### Buttons
- Primary: parchment fill, ground text, square, 12×18 padding; hover turns survey orange.
- Quiet (copy address): transparent with a rule border; confirms in orange.

### Cards / Containers
- **Parcel**: outlined box drawn in SVG, used for the project blocks. Dashed (4 3) = built on my own.
- **Title block**: ruled grid of label/value cells, used in the hero (sheet details, email) and as the page's closing footer.

### Navigation
- Fixed, ruled box of four text links top-right (bottom-centre on phones); current section shows in orange.

### Dimension line
- Horizontal bracket with tick ends, value in orange bold, label in secondary ink. One oblique dimension in the hero runs between plotted items with SVG tick markers.

### Timeline and readout
- Timeline: Jan 2020 to Dec 2026, one unit per month (`src/timeline.js`). Items are buttons positioned by `--l`/`--w`. Work items solid, own items dashed and stacked in the 2026 column. Hover (mouse) or focus selects; tap selects on touch.
- Date guide: mouse only, a 60% orange hairline with an orange month label.
- Selected item: orange outline and label, with a length bracket under it that scales in from the left.
- Readout: ruled panel right of the name (below the timeline on phones), aria-live; title, role/period/length facts, one-line summary, up to two dimension lines, link to the details section. Content fades up 6px on change.
- Own lane: a dashed thread runs from the first build (2020) to now; earlier public builds are 14px dashed marks at their first-commit month (hover/focus to read them, link to the repo); flagship projects are dashed boxes from their start month to now, staircased in rows with the label set to their left.
- Phones: the timeline becomes a list of rows, each with a proportional bar on a 2020–2026 track.

### Section transition
- Scroll-linked (`src/useScrollPlot.js` writes `--p` 0→1 per section as its top travels from the viewport bottom to 40% from the top). Stage one: a solid survey-orange band wipes across the section head from the left. Stage two: the band pulls away to the right, revealing the heading outlined and at 125% width, which compresses to 62% and fills solid; the intro wipes in behind it. The contact email follows the same squeeze. Disabled under reduced motion.

## Do's and Don'ts

### Do:
- Express every metric as a dimension line or a plotted label.
- Keep orange for the selected, the current and the measured.
- Draw icons as inline SVG at 1.5 stroke (see `Arrow.jsx`).
- Theme browser surfaces: selection, focus ring and scrollbar come from the palette.

### Don't:
- Don't add cards with shadows, chips, icon tiles, gradients or glow.
- Don't put labels or numbers above headings.
- Don't use Unicode glyphs as icons.
- Don't scatter information across the page; selection detail lives in the readout.
- Don't add other scroll effects; the section plot transition, the timeline reveal on load and the readout change are the page's motion.
