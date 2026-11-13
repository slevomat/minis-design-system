---
name: minis-figma-docs
description: FIGMA ONLY — write or update a documentation card inside the Mini*S Figma file (MiniS DS, mfiAVMWkxiBRGnegjqLMNW) — the cream "docs" cards that sit next to a component, foundation or token page (title, description, functionality overview, usage, examples, changelog, roadmap, dev notes). Use when the user asks to document a component or foundation in Figma, add a changelog entry or roadmap item to a Figma card, create a docs card for a new component, or tidy an existing card. NOT for code-side docs — Storybook stories/MDX, docs/ai-prompts/*.md, CHANGELOG.md, READMEs — and not for other Figma files. Builds only from the internal docs kit (`docs/*` variables, `.docs/*` text styles, `.helpers` components), which is never published.
---

> **Scope: Figma documentation inside the Mini*S Figma file, and nothing else.**
> - **Not** for Storybook, `docs/ai-prompts/`, `CHANGELOG.md`, READMEs or any other docs in the repo.
>   Those have their own rules in `CLAUDE.md`. This skill may *read* them as sources, never write
>   them.
> - **Not** for other Figma files (Slevomat Icons, product design files…). If the user asks for one,
>   say this skill doesn't cover it and ask how they want to proceed.
> - If a request just says "document X" and doesn't say where, ask whether they mean the Figma card
>   or the code docs.

# Mini*S documentation cards in Figma

Every component and foundation page in the Mini*S Figma file (`mfiAVMWkxiBRGnegjqLMNW`) carries a
**docs card**: a cream, rounded frame that says what the thing is, what it can do, how it changed
and what's next. This skill writes those cards in one visual language and one voice.

Load `figma:figma-use` before any `use_figma` call (and `figma:figma-generate-design` before the
first one that changes the canvas). All IDs live in [kit.md](kit.md).

## The one rule: build only from the docs kit

The cards use their own internal kit, separate from the product tokens:

- **Colours, spacing, radius** → `docs/*` variables in the `.Helpers` collection
- **Text** → `.docs/*` text styles
- **Pills and callouts** → `.link`, `.badge` and `.message` on the `.helpers` page

The whole kit is **hidden from publishing**. It's for the design-system file only, and consumers
of the library never see it. So:

- Never put a hardcoded colour, size or font on a card. If you need something the kit lacks, add
  it to the kit first (a `docs/*` variable with real scopes and `hiddenFromPublishing = true`, or a
  `.docs/*` style), then use it.
- Never use product tokens (`Color/…`, `typography/…`) for card chrome. They belong only *inside*
  specimens, where the point is to show them.
- Never publish the kit, and never move it to a published collection.
- The kit exists only in the Mini*S file, and hidden assets can't be used across files. That's
  one more reason this skill stops at the Mini*S file's edge.

## Card types

| Type | Use for | Shape |
|---|---|---|
| **Component card** | A component or component set | The full template, see "Anatomy" |
| **Foundation card** | Typography, colour, spacing, breakpoints… | The template without Construction/Examples. Content sections are named after the topic ("Families", "How text styles work") |
| **Changelog card** | A foundation whose history outgrew its intro card | Header (`.docs/heading-1` "Changelog" + "for <Topic>" in `.docs/small`) + CHANGELOG + ROADMAP |
| **Specimen / diagram** | Type specimens, breakpoint bars, colour ramps | Card shell + header only. The body shows real styles and tokens; it's the one place product tokens appear |
| **Report** | One-off analyses ("why X doesn't work in Figma") | Card shell, `.docs/heading-2` title. Free layout. Use the skill for the shell only |

## Palette / swatch pages

Colour pages (Foundation, Theme, Primitives, Heritage, .Components) carry two kinds of card: a
**swatch overview** (a wide Specimen card) and a **changelog card** next to it. Page and frame IDs
are in [kit.md](kit.md) → "Palette pages".

- **Chrome is kit, swatches are product.** Shell, header, section titles, dividers, legend chips and
  every label use `docs/*` + `.docs/*`. Each swatch's fill is **bound to the variable it shows**;
  a flat hex swatch is a bug, because it silently goes stale.
- **Labels on a swatch** bind to `docs/colors/text` and the swatch frame sets the `.Helpers` mode:
  `inverted` (cream text) when the swatch's luminance is below 0.18, `default` (black) otherwise.
  Never hard-code white text.
- **Hard-to-see swatches get a dashed outline.** A swatch is hard to see when it isn't opaque
  (transparent, `*-a` alphas) or when it's nearly the cream card colour: OKLab distance below
  0.025 (white, grey-95/98, blue-99, the palest `-95` tints, the Foundation background and
  surfaces). Draw a dashed `docs/colors/divider` stroke (`divider-width`, inside, dash 6/4) and
  keep the fill bound to the real token. Never fake visibility with a different fill, a shadow or a
  darker card. The scripts decide this (`faint()`), so don't outline by eye.
- **Non-opaque values print their alpha:** 8-digit hex (`#FFFFFF00`), never a bare `#FFFFFF`, and
  rgba / oklch with the alpha (`rgba(0, 0, 0, 0.05)`, `oklch(0% 0.000 0 / 0.05)`).
- The same problem on component cards is solved by the specimen surface (kit.md → "Specimens"):
  put light or alpha instances on it instead of straight onto the cream card.
- **Header:** a `pills` row (Storybook pill, then the layer `.badge`), title in `.docs/heading-1`,
  one or two `.docs/description` paragraphs. Storybook: Foundation and Theme →
  `design-tokens--colors`, Primitives and Heritage → `design-tokens--palette`.
- **Printed values** (hex, rgba, oklch, `→ primitive`) are plain text: Figma can't bind text to a
  colour value. The `→` reference names the primitive at the **end** of the alias chain.
- **Never edit swatches by hand.** Use the scripts in `scripts/` (paste into `use_figma`, fill
  CONFIG):
  - `palette-refresh.js` — migrates or refreshes one existing overview in place: rebinds unbound
    swatches by name, rewrites stale values, restyles chrome. Run it on every overview of a
    collection **after every token re-export**. Safe to re-run.
  - `palette-generate.js` — builds a new overview card for a collection from the kit (one section
    per group, one row per mode). Then use the refresh script to keep it current.
- **Changelog card** = header + Changelog + Roadmap (the "Changelog card" type above). Follow
  "Changelog" below: a swatch rebound to its variable or a corrected value is a visible change and
  gets an entry; moving the card to the kit does not.
- **Log on every page the change touches.** There is no Mini*S-wide changelog in Figma: each page
  keeps its own. A token change goes on the changelog card of the page that owns the token's
  collection (Foundation, Theme, .Components, Primitives, Heritage), **and** on the card of every
  component whose look or tokens it changes. Example: re-aliasing `Accordion/default/surface` to a
  new Foundation token = three entries: Foundation (token added), .Components (alias changed),
  Accordion (surface now uses it). Before reporting done, list the cards you logged on.

The old **Mini*S Color docs generator** plugin (separate plugins repo) produced the existing
overviews. Don't run it on these pages: it makes a new page each run, hard-codes the chrome and
ignores the kit.

## Anatomy (component card)

A component's docs are a **stack of cards**, separated by an 8 px gap (`docs/dimensioning/gap-stack`):

- **`main`**: the reference (what it is, what it can do, how to use it). Sections 1–6 below.
- **`changelog`**, **`roadmap`**, **`dev-notes`**: one small card each (sections 7–9). History and
  plans stay separate from the reference, so people scanning for recent changes find them at once.

Start from **`Docs card — template`** on the `.helpers` page: clone the whole stack, then delete
the sections and cards you don't need. Never rebuild the shell by hand. Inside `main`, sections
are split by divider lines. The follow-up cards have no divider, because the card edge does that
job. Order is fixed:

1. **header**: `.link` pill, **always labelled `Storybook`** and hyperlinked to the closest
   Storybook page (see "Storybook link" below). Then the title in `.docs/heading-1` and the
   description in `.docs/description`.
2. **overview**: label FUNCTIONALITY OVERVIEW. 2–4 columns, each a `.docs/column-title` + a
   bulleted `.docs/small` list (Variants, Size, States, Breakpoint, Other). Use the Figma property
   names and values exactly (`sm | md | lg`, not "small"). If one component set has sub-parts,
   repeat the section: "Functionality overview - Navigation item".
3. **usage**: `.docs/section-title` "Usage", one or two `.docs/description` sentences, then real
   component **instances** (never detached copies) with `.docs/annotation` captions. Put every
   instance on a specimen surface (see kit.md), never straight on the cream card.
4. **construction**: anatomy and states as instances with annotations.
5. **examples**: common combinations as instances. Add "Mobile examples" when the mobile layout
   differs.
6. **status**: only while the work is unfinished. A `.badge` (warning, "Work in progress") + one line
   on what's missing. Delete it when done.
7. **changelog** (own card): label CHANGELOG. One row per date, newest first.
8. **roadmap** (own card): label ROADMAP, bullets. If it's empty, delete the card.
9. **dev-notes** (own card): label DEV NOTES, bullets: Storybook path, code path, docs file, gotchas.

### Storybook link

The pill's URL is a **hyperlink on the pill's text node**. It is not a property, and it isn't on
the instance. Cloning a pill copies its old URL, so **always set it**. Leaving a copied link is the
easiest mistake to make here.

- **Find the story ID** in the deployed index, `https://slevomat.github.io/minis-design-system/index.json`
  (`entries` keys). It is derived from the story `title` (`Components/Navigations/Action Row` →
  `components-navigations-action-row`), plus `--docs` or `--<export>`.
- **URL format:**
  - components: `https://slevomat.github.io/minis-design-system/?path=/docs/<id>--docs`
  - foundations without a docs page: `…/?path=/story/design-tokens--<export>`
- **No story yet** (a Figma-only component): link the closest page, e.g. the token story that
  covers it, and add "add a Storybook story" to the roadmap. Never leave the template's
  `REPLACE-ME` link.
- **Set the link** with `textNode.hyperlink = {type:'URL', value:url}`. This works without
  loading the pill's font.
- **The label text can't be changed by script:** SF Mono isn't available to the scripting tool.
  The template's pill already says `Storybook`, so keep it. If a card has an old `Docs` pill,
  replace it with a clone of the template's pill.

Labels vs. titles: **fixed** sections (Functionality overview, Changelog, Roadmap, Dev notes)
use `.docs/section-label`, which uppercases on its own, so type them in sentence case. **Content**
sections (Usage, Construction, Examples, Banners…) use `.docs/section-title`. Don't type uppercase
by hand, and don't override a style's text case: a case override detaches the style.

## Voice

Light, brief and factual: a colleague's note, not a manual.

- **Description:** one or two sentences, saying what it is and when to reach for it. No "This
  component is used to…" preamble.
- **Bullets:** fragments, sentence case, no trailing full stop. One idea each.
- **Changelog:** past tense, what changed for the *user of the component* ("Added flag variant",
  "Fixed disabled state on surfaces"). Group related changes under one date. Explain a breaking
  change in a single extra sentence ("Not compatible with the previous version").
- **Roadmap:** imperative or noun phrase ("add disabled state", "responsive component").
- **Dates:** `DD Mon YYYY`, e.g. `06 Nov 2026`.
- **Language:** English only. Spell-check everything, including copy you carry over.
- **Names:** the component's Figma name in prose (ActionRow), `code font` only in dev notes, and
  the tag name only there (`<minis-action-row>`).
- No marketing words, no emoji, no exclamation marks. If a sentence doesn't help someone
  build or use the thing, cut it.

## Workflow

1. **Find what exists.** Read the target page (`get_metadata`) and screenshot any existing card.
   When updating a card, change it in place and keep its node ID, because people link to it.
   Loose notes on the page (a bare title or description text next to the component) are
   superseded by the card. Check them against the repo. Carry over anything still true, then
   remove them and tell the user what you removed. Stale notes are worse than none.
2. **Gather facts from the repo, not memory:**
   - API and variants: `docs/ai-prompts/components/<name>.md` and the component set's properties
   - History: `CHANGELOG.md` entries for that component. **Merge**, don't replace: the Figma
     changelog also holds Figma-only changes the repo never saw.
   - Storybook link: the story ID from `index.json` (see "Storybook link")
3. **Build.** Clone the template next to the component (see [kit.md](kit.md) → "Clone recipe"),
   fill the text and swap the placeholder boxes for real instances. Delete unused sections and any
   leftover "instance goes here" frame.
4. **Check.** Screenshot the card. Confirm there's no clipped text, no placeholder copy left, and
   no fills or text without a binding. Run the audit snippet in kit.md: it must report zero
   unbound colours and zero unstyled text outside instances.
5. **Report** the card's node ID and link to the user. If the card's changelog gained an entry that
   reflects a code change, remind them it belongs in `CHANGELOG.md` and the Storybook Changelog
   too (CLAUDE.md → Changelog rules). This skill doesn't write those.

## READ-ME page and the skills list

The READ-ME page (`1:2`, frame `Docs grid`) uses its own card layout: an eyebrow, a title,
then a Line + Body pair per section, with `.docs/heading-4` section titles. Keep that layout
there; don't turn READ-ME cards into component stacks.

The **AI prototyping toolkit** card (`2507:6944`) has a **Skills** section listing every
Mini*S skill: name, who it's for, one line on what it does, and what to say. It mirrors the
Skills table in Storybook (Vibe Coding Guide → Skills), `README.md` and
`docs/ai-prompts/index.md`. When a skill is added, renamed or removed, update the Figma list
here, and tell the user the three code-side lists need the same change. This skill doesn't
write those.

## Don'ts

- Don't document what the component doesn't do yet as if it did. Put it on the roadmap.
- Don't paste API tables into Figma. The card says *what* exists, and dev notes point to the code
  docs for the *how*.
- Don't touch report pages beyond what was asked; they're deliberately free-form.
- Don't change a card's `status` badge or delete a roadmap item unless the user says that work is
  done.
