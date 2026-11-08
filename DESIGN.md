---
name: Dani Guerrero
description: One colcha de retazos sewn from Negros to Blancos. Fashion-editorial Bodoni on Carnaval negro and talco, Nariño patchwork as section fabric, and Dani's carmín collage voice on top.
colors:
  negro: "#0D0C0E"
  talco: "#F3F4F6"
  crema: "#E9E4D1"
  papel: "#EDE7D3"
  frame-ground: "#1A181C"
  lila: "#BBA7E6"
  cebada: "#CFDD4C"
  verde: "#1F4A30"
  tierra: "#6B321E"
  trigo: "#E3A93A"
  cobalto: "#2D4BD8"
  naranja: "#F36B21"
  cta: "#B3121F"
  cta-hondo: "#8F0E19"
  carmin: "#C8102E"
  carmin-luz: "#F23A44"
  halftone: "#E5242F"
  ink-2-negro: "#CFC8D6"
  ink-2-crema: "#4A4033"
  ink-2-talco: "#463B52"
  ink-2-verde: "#CFE3C9"
  ink-2-cebada: "#3D4410"
  ink-2-tierra: "#F0D2C2"
typography:
  display:
    fontFamily: "Bodoni Moda, Bodoni 72, Didot, serif"
    fontSize: "clamp(3.25rem, 1.6rem + 5.6vw, 6rem)"
    fontWeight: 500
    lineHeight: 0.9
    letterSpacing: "-0.02em"
    fontVariation: "'opsz' 80"
  headline:
    fontFamily: "Bodoni Moda, Bodoni 72, Didot, serif"
    fontSize: "clamp(2.25rem, 1.35rem + 3.1vw, 4rem)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.015em"
    fontVariation: "'opsz' 40"
  hook:
    fontFamily: "Bodoni Moda, Bodoni 72, Didot, serif"
    fontSize: "clamp(1.625rem, 1.15rem + 1.5vw, 2.375rem)"
    fontWeight: 400
    lineHeight: 1.16
    letterSpacing: "-0.01em"
    fontVariation: "'opsz' 32"
  title:
    fontFamily: "Bodoni Moda, Bodoni 72, Didot, serif"
    fontSize: "clamp(1.625rem, 1.3rem + 1.1vw, 2.25rem)"
    fontWeight: 500
    lineHeight: 1.15
    fontVariation: "'opsz' 24"
  card-title:
    fontFamily: "Bodoni Moda, Bodoni 72, Didot, serif"
    fontSize: "clamp(1.4rem, 1.15rem + 0.8vw, 1.875rem)"
    fontWeight: 560
    lineHeight: 1.1
    fontVariation: "'opsz' 24"
  script:
    fontFamily: "Yellowtail, Brush Script MT, cursive"
    fontSize: "1.12em"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0"
  body:
    fontFamily: "Figtree, Segoe UI, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  intro:
    fontFamily: "Figtree, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.3vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.55
  small:
    fontFamily: "Figtree, Segoe UI, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
  label:
    fontFamily: "Figtree, Segoe UI, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "0.12em"
rounded:
  none: "0"
  pill: "999px"
  oval: "50%"
  bubble: "18px 18px 18px 4px"
spacing:
  stitch: "1.5px"
  gutter-phone: "16px"
  gutter-tablet: "32px"
  gutter-desktop: "64px"
  max: "1312px"
  section-top: "clamp(72px, 9vw, 136px)"
  section-bottom: "clamp(72px, 9vw, 128px)"
  tile-gap: "14px"
components:
  button-primary:
    backgroundColor: "{colors.cta}"
    textColor: "{colors.talco}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "0 26px 0 22px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.cta-hondo}"
    textColor: "{colors.talco}"
  button-primary-small:
    backgroundColor: "{colors.cta}"
    textColor: "{colors.talco}"
    rounded: "{rounded.pill}"
    padding: "0 20px 0 16px"
    height: "46px"
  button-primary-big:
    backgroundColor: "{colors.cta}"
    textColor: "{colors.talco}"
    rounded: "{rounded.pill}"
    padding: "0 30px 0 26px"
    height: "60px"
  header-whatsapp:
    backgroundColor: "{colors.negro}"
    textColor: "{colors.talco}"
    rounded: "{rounded.pill}"
    padding: "0 16px 0 13px"
    height: "42px"
  chip:
    textColor: "{colors.negro}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "42px"
  chip-selected:
    backgroundColor: "{colors.negro}"
    textColor: "{colors.talco}"
  service-tile:
    backgroundColor: "{colors.negro}"
    textColor: "{colors.talco}"
    rounded: "{rounded.none}"
    padding: "24px 24px 26px"
  quilt-tile:
    backgroundColor: "{colors.talco}"
    rounded: "{rounded.none}"
  next-patch:
    backgroundColor: "{colors.cta}"
    textColor: "{colors.talco}"
    typography: "{typography.script}"
    rounded: "{rounded.none}"
  ugc-tile:
    textColor: "{colors.negro}"
    rounded: "{rounded.none}"
    padding: "18px 18px 34px"
  ugc-tile-hover:
    backgroundColor: "{colors.negro}"
    textColor: "{colors.talco}"
  hang-tag:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.negro}"
    rounded: "{rounded.none}"
    padding: "50px 22px 22px"
  brief-card:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.negro}"
    rounded: "{rounded.none}"
    padding: "26px 24px 24px"
  chat-preview:
    textColor: "{colors.negro}"
    rounded: "{rounded.bubble}"
    padding: "14px 18px 15px"
  sticker-bubble:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.cta}"
    rounded: "{rounded.oval}"
  cinta:
    backgroundColor: "{colors.cta}"
    textColor: "{colors.talco}"
    padding: "13px 0"
---

# Design System: Dani Guerrero

## Overview

**Creative North Star: "La colcha de Negros a Blancos"**

The page is one quilt. Every section is a retazo of a different fabric, sewn to the next with a dashed seam, and the fabric order runs from the black of Día de Negros to the talco white of Día de Blancos. Three materials are treated as one: the patchwork fields of Nariño, the comparsa vest and a fashion designer's cloth. The finish is fashion-editorial. Bodoni Moda sits large and quiet on deep negro, and the photography (studio portraits, comparsa, Srta. Nariño Bambuco 2025, production BTS) carries the content.

Dani's own collage is the voice on top. It shows up as carmín Yellowtail script for her phrases, red halftone stickers (star, lips, headphones) on die-cut papel, and dotted oval speech bubbles. Patches stay square and stitched, and only the pill actions, the oval cameo and the bubbles are round. Motion is the Carnaval in the air: talco and confeti particles, a portrait that breaks into fabric patches between looks, stickers that bob and can be dragged, hang tags that swing. All of it stops under one pause control and is gone under reduced motion.

The system rejects the influencer canon (white page, serif name over a full-bleed portrait, a grey logo row) and the generic fiesta collage of a Carnaval site.

**Key Characteristics:**
- Whole sections are fabrics. Each one sets its own ink, secondary ink, thread and script ink.
- Dashed 1.5px stitches stand in for borders: section seams, inset tile frames, the active-link underline.
- Corners are square for patches and tiles. Round is kept for pills, ovals and bubbles.
- Bodoni Moda with optical size tuned per role, Figtree for text, Yellowtail only for Dani's voice.
- Carmín is the single action and voice color. Retazo colors are fabric and patches.
- Shadows are soft and negro-tinted with negative spread. Paper and stickers lift; nothing is hard-offset.

## Colors

Two Carnaval grounds and two collage papers, five retazo fabrics, two patch-only accents and a carmín family that belongs to Dani's voice and the call to action.

### Primary
- **Carmín de Acción** (cta): every primary action, including the pompón pill, the sticky WhatsApp bar, the cinta, and the "next retazo" patches in the quilt and UGC wall. Talco text on it reaches 6.3:1.
- **Carmín Hondo** (cta-hondo): hover and pressed state of every carmín surface.
- **Carmín de Collage** (carmin): script ink on light grounds (crema, talco, papel), and the dotted outline and caps of the sticker bubbles.
- **Carmín Luz** (carmin-luz): script ink on negro, the liked heart, and the square that stitches in on a selected chip.
- **Tinta Halftone** (halftone): print color of the halftone star, lips and headphones stickers, and one of the confeti colors. It lives in raster/SVG art, not UI.

### Secondary
- **Lila Papa en Flor** (lila): fabric of the first service tab and hang tag, the scrollbar thumb, the first look swatch and patch in the colcha backing.
- **Cebada** (cebada): fabric of the UGC section; the "Ideal para" label on service fichas; a hang tag.
- **Verde Papa** (verde): fabric of the client quilt section.
- **Tierra Arada** (tierra): fabric of Formación and the hang-tag grommet.
- **Trigo** (trigo): striped patches, the cinta's star separators, a look swatch and service tab.

### Tertiary
- **Cobalto** (cobalto) and **Naranja** (naranja): patch-only accents. They appear as bullet squares, a service tab, the fourth step number and confeti, and never as a section fabric.

### Neutral
- **Negro de Día de Negros** (negro): page ground, hero, En escena, header, sheet, service tiles, selected chips, UGC hover.
- **Talco** (talco): text on dark, and the fabric of Servicios, Contacto and the footer; logo tile ground.
- **Crema de Collage** (crema): the Sobre mí fabric only.
- **Papel** (papel): sticker paper, speech bubbles, the hang-tag rail, the "Arma tu mensaje" card.
- **Fondo de Marco** (frame-ground): placeholder ground behind photos while they load.
- **Secondary inks** (ink-2-*): one per fabric, used for intros, captions, proof lines and status text. Each is tuned to its own fabric; never move one to a different ground.

### Named Rules
**The Fabric Variables Rule.** A section declares `--fabric`, `--ink`, `--ink-2`, `--thread` and, on dark grounds, `--script-ink`. Components read those variables and never hard-code text color, so any component can sit on any retazo.

**The Carmín Means Action Rule.** Carmín is reserved for the call to action, Dani's script, her stickers and the cinta. It is never a section fabric and never decoration on its own.

**The Patch-Only Rule.** Cobalto and naranja appear only at patch scale (bullets, tabs, step numbers, confeti). A whole surface in either breaks the colcha's palette.

## Typography

**Display Font:** Bodoni Moda (with Bodoni 72, Didot, serif)
**Body Font:** Figtree (with Segoe UI, system-ui, sans-serif)
**Script Font:** Yellowtail (with Brush Script MT, cursive)

**Character:** A high-contrast fashion Didone set at medium weight, with optical size lowered as the size drops so hairlines stay legible. Beside it, a warm geometric sans for reading and a red brush script that sounds like Dani writing in the margin. All three are self-hosted variable or single-weight woff2 files and are preloaded.

### Hierarchy
- **Display**: the hero name only. Split into two words with the second indented .5em; its letters rise in on load.
- **Headline**: section titles (h2), balanced, max 20ch. Contacto steps up to clamp(2.5rem, 1.45rem + 3.8vw, 5rem) at max 16ch.
- **Hook**: the hero question line, max 21ch, closing on a script phrase.
- **Title**: spread titles and the "¿Cómo empezamos?" heading.
- **Card title**: service tiles, hang tags (1.375rem) and the brief card title (1.5rem), all at weight 560 and opsz 24. The lead service tile goes to 2.5rem on desktop.
- **Body**: running text at 1.0625rem/1.6. Copy columns cap at 46–58ch.
- **Intro**: the paragraph under a section title, in the fabric's ink-2.
- **Small**: captions, proof lines, tags and status (0.875rem/1.4, weight 500).
- **Label**: tracked uppercase (0.12–0.16em) at 0.6875–0.8125rem, weight 600. Used only for sticker bubble caps, the "Ideal para" ficha label, the chat-preview label and the cinta.

### Named Rules
**The Her Voice Rule.** Yellowtail is set only on Dani's own phrases ("Yo te ayudo.", "pero dime Dani.", "barbie marketera", "¿Indecis@?", the next-patch invitations). It is rotated -3 to -5deg, it writes itself in with a clip reveal on entry, and it is always fully visible under reduced motion. It never sets navigation, body or buttons.

**The Optical Size Rule.** Bodoni's `opsz` follows the role: 80 for the name, 40 for h2, 32–36 for the hook and the menu sheet, 24–28 for card titles and the wordmark. Never let a small Bodoni render at display optical size.

**The Caps Live In Lockups Rule.** Tracked caps appear only inside stickers, labels and the cinta. They never sit above a title as a kicker or eyebrow.

## Layout

Content sits in a centered column of 1312px max with a responsive gutter (16px, then 32px at 700px, then 64px at 1024px). Sections are full-bleed fabrics with generous vertical padding. Breakpoints are 700px (two-column fichas, six-column quilt), 900px (four-column UGC wall and the hang-tag rail laid flat) and 1024px (desktop header, hero grid, bento, mini-colcha).

- **Hero:** stacked on phones in a fixed order (name, role, framed portrait capped at 42svh, hook, CTA, support, proof) so it all fits in 844px. On desktop it becomes a 1.12fr / .88fr grid at min(100svh − 88px, 860px), and the frame is capped at min(72svh, 690px). The tilted carmín cinta runs across the foot, bleeding 24px past the edges.
- **En escena:** horizontal scroll-snap rails on phones (an 84vw lead, 76vw follow-ups). On desktop, editorial spreads with a 1.4fr lead photo spanning two rows; alternate spreads flip the lead to the right.
- **Servicios:** one column, then two at 700px with the strategy tile full width, then a 12-column bento with rows of 360/360/430px where the strategy tile spans 7 columns and two rows.
- **Quilt:** 3 columns, then 6 at 700px. Square tiles with gaps of 10px, then 14px.
- **Formación:** a horizontal snap rail of 74vw hang tags on phones; 4 columns at 900px.
- **Contacto:** 7fr / 5fr copy and photo on desktop.
- **Chrome:** a sticky header, a mini-colcha section nav fixed at the right edge on desktop, a sticky WhatsApp bar on phones between the hero CTA and Contacto. `--top-h` (measured from the header) positions the menu sheet and every section's scroll margin.

## Elevation & Depth

Depth is mostly tonal: one flat fabric meets the next at a seam. Shadows only describe physical things lifting off the cloth, such as paper tags, stickers, tiles and the pill. Every shadow is a soft blur with negative spread, tinted negro or black. Tiles, the pill and UGC tiles also rise 2–4px on hover.

### Shadow Vocabulary
- **Pompón rest** (`box-shadow: 0 12px 24px -14px rgba(13, 12, 14, .6)`): primary pill at rest.
- **Pompón lift** (`box-shadow: 0 18px 28px -14px rgba(13, 12, 14, .7)`): primary pill on hover, with translateY(-2px).
- **Header scrolled** (`box-shadow: 0 1px 0 rgba(243, 244, 246, .1), 0 14px 26px -20px rgba(0, 0, 0, .9)`): once the page has scrolled.
- **Tile** (`box-shadow: 0 18px 30px -24px rgba(13, 12, 14, .7)`): service tiles at rest; also UGC tiles on hover (`0 18px 26px -18px`).
- **Paper card** (`box-shadow: 0 20px 34px -26px rgba(13, 12, 14, .5)`): the brief card.
- **Chat bubble** (`box-shadow: 0 10px 22px -16px rgba(13, 12, 14, .55)`): the message preview.
- **Sticker** (`filter: drop-shadow(0 10px 12px rgba(0, 0, 0, .45))`): die-cut stickers; it deepens to `0 20px 22px` while dragging.
- **Hang tag** (`filter: drop-shadow(0 14px 14px rgba(0, 0, 0, .35))`): clipped tag silhouettes.

### Named Rules
**The Soft Lift Rule.** A shadow means a physical object above the fabric, so it is always blurred and spread inward. Hard offset shadows are not part of this world.

## Shapes

The form language is textile. Patches, tiles, photos, cards and tags are square-cornered (0). Edges are drawn with dashed stitches: 1.5px seams between sections (a 12px dash with an 8px gap in the section's thread color), and 1–1.5px dashed outlines inset 5–8px inside tiles, the pill, the cinta, the brief card and photo frames. The round forms are deliberate and few. Pills (999px) are for actions and chips. Ovals (50%) are for the Sobre mí cameo, which sits inside a dotted carmín ring, for the sticker speech bubbles with dotted carmín outlines, and for the round icon controls. The chat preview is the single asymmetric bubble (18/18/18/4). Hang tags are cut with a clip-path with chamfered top corners, a tierra grommet and a string. Small stitched squares (14–18px) in solid, stripe, dot or check prints serve as bullets, tabs, swatches and step numbers.

## Components

### Buttons
Carmín pills that read as a pompón stitched onto the cloth.
- **Shape:** full pill (999px), with a 1.5px dashed talco stitch inset 6px.
- **Primary:** carmín de acción with talco text, Figtree 600 at 1rem, a 20px WhatsApp icon and a 10px gap. Small (46px) and big (60px) variants for inline and closing use. On phones the hero, menu, sticky-bar and brief buttons go full width.
- **Hover / Focus:** carmín hondo and a 2px lift with a deeper shadow; it settles on press. Focus is a 2px dashed outline in the fabric's ink, offset 4px.
- **Ghost (header WhatsApp):** a 42px pill with a 1px talco border at 38% opacity. Hover brings the border to full talco on a faint 8% talco wash.
- **Text link ("stitch link"):** no underline at rest. A 1.5px dashed underline sews in from the left on hover or focus (.55s ease-out). Quiet links and footer links show it permanently at weight 600.

### Chips
- **Style:** 42px pills with a 1.5px border in negro at 35%, Figtree 500 at .9375rem. A real checkbox or radio sits invisibly over each one.
- **State:** hover darkens the border and lifts 1px. Selected fills negro with talco text and stitches in a 10px carmín luz square before the label. Focus is a 2px dashed negro outline.

### Cards / Containers
- **Service tile:** square negro tile with a 1px dashed talco frame inset 8px. Every tile always shows its ficha: title with a retazo square, what it includes, and an "Ideal para" line under a cebada label. On phones and tablets the photo (16:10) sits above the text with a 6px band in the tile's retazo color. On desktop the photo fills the tile under a negro scrim (8% to 60% to 94%), the text sits at the foot, and the photo zooms 1.05 on hover.
- **Quilt tile:** square talco tile holding the brand's own logo in full color, with a 1.5px dashed talco stitch inset 5px. Portrait logos are contained on their own brand color. A final carmín patch invites the next brand in script.
- **UGC tile:** a 3:2 tile on cebada lightened toward white (78%), with the brand mark in negro, a dashed negro stitch inset 7px and a small "… de muestra" tag with an external-link icon. On hover or focus it inverts to negro with the mark inverted to white, the tag turns cebada, and the tile lifts 4px. A carmín tile closes the wall.
- **Hang tag:** clipped paper tag (papel, lila, cebada or talco) with a grommet, a dashed inner border inset 8px, a talco string from the papel rail, and a resting tilt of -4 to 4deg. Hover or tap swings it (1.7s). The credential kind and institution share the dashed foot line.
- **Brief card ("Arma tu mensaje"):** papel card with a dashed carmín stitch inset 8px and the paper-card shadow. It holds two chip fieldsets, a white chat-bubble preview whose text writes in on change, a full-width big pompón that is a real wa.me link updated live, and a polite status line.

### Navigation
- **Header:** sticky negro bar with the wordmark ("Dani" in carmín luz script, "Guerrero" in Bodoni), section links in Figtree 500 at .9375rem, and the ghost WhatsApp pill. The header hides on scroll down past 480px, returns on scroll up, and stays put while focus is inside. The current section's link wears the full dashed stitch.
- **Phone sheet:** a full sheet below the header, sized by `--top-h`, with a dashed top seam. Links are set in Bodoni 500 at 2rem with dashed dividers, and the WhatsApp pill and socials sit at the foot. While open, the page behind is inert. Escape or widening to desktop closes it and returns focus to the toggle.
- **Mini-colcha:** desktop-only fixed stack of 12px fabric squares, one per section in that section's fabric. The current square scales up 1.35 with a dashed outline, and hover reveals a negro label.
- **Footer:** a talco contentinfo band between two dashed seams, holding the wordmark, all seven section links as stitch links, a small pompón, then the legal line and "Volver arriba".

### Collage Stickers (signature)
Halftone SVG stickers (star, lips, headphones) printed in halftone red on papel die-cut, plus oval papel speech bubbles with a dotted carmín outline that pair tracked carmín caps with a script phrase. In the hero they sit around the portrait frame, bob on 4.5–6.5s alternating loops and can be dragged; release throws talco. In Servicios the headphones carry the "barbie marketera" bubble beside the title.

### Look Frame (signature)
A 4:5 portrait frame sewn onto a backing of five retazo patches (lila, dotted cebada, striped trigo, checked verde, tierra) that peek 12px (28px on desktop) past its top and right edges. Below it, a caption row with stitched look swatches, a round like button and a round pause control. With WebGL the image breaks into a stitched patchwork that flips in a diagonal sweep (1.9s) into the next look. A tap advances the look, and a double tap pops a carmín heart that bursts into confeti.

### Cinta (signature)
A carmín ribbon tilted -1.6deg with a dashed inset stitch. It holds a 46s linear marquee of services in tracked talco caps, separated by trigo stars and closing on the script "con alma". Hover pauses it.

## Do's and Don'ts

### Do:
- **Do** give every new section a fabric from the palette and set its `--ink`, `--ink-2`, `--thread` (and `--script-ink` on negro) together, then seam it to its neighbor with the 1.5px dashed stitch.
- **Do** frame tiles, cards and photos with a dashed stitch inset 5–8px, and keep their corners square.
- **Do** use the carmín pompón pill (52px, 999px, inset dashed stitch) for every WhatsApp action, with carmín hondo on hover.
- **Do** lower Bodoni's optical size as size drops (80, 40, 32, 24).
- **Do** use the shared ease-out `cubic-bezier(.16, 1, .3, 1)` for reveals, lifts and sheets. Route all hero motion through the single pause control, and drop particles, autoplay, bob and marquee under reduced motion or Save-Data.
- **Do** keep each section's ink-2 on its own fabric. These inks were tuned per ground.

### Don't:
- **Don't** set Yellowtail on anything that isn't Dani's own phrase: no nav, buttons, body or labels.
- **Don't** place tracked caps above a title as a kicker or eyebrow. Caps live inside stickers, labels and the cinta.
- **Don't** use cobalto or naranja as a section fabric or large surface.
- **Don't** use carmín as a fabric or as decoration away from an action, script or sticker.
- **Don't** run logos as a grey strip. Client logos keep their own colors on their own stitched talco tiles, and UGC marks are negro on stitched cebada tiles.
- **Don't** use hard offset shadows. Lift is always a soft, inward-spread blur.
- **Don't** round tiles, cards or patches. Round is only for pills, ovals, icon controls and the single chat bubble.
