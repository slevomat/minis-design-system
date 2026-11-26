---
description: Rebuild a live slevomat.cz page in the Mini*S Figma file (MiniS DS) from Mini*S library instances and bound variables, and document beside it what Mini*S is missing and where it conflicts with production. Use when someone wants a production page "in Figma", a page rebuilt from Mini*S components, "how far is this page from Mini*S", a production audit drawn on the canvas, or the page to design on. Argument - the page URL or path, optionally followed by `skip-audit` to rebuild without findings. Read-only on production; Figma file MiniS DS only.
argument-hint: <url-or-path> [skip-audit]
---

# Production page → Figma

> **Beta.** This skill works and has been tested, but its steps and options may still change between plugin releases. Tell the design-system team when something goes wrong.

Rebuilds one public slevomat.cz page in Figma, built from Mini*S components and variables. Next
to the rebuild it adds findings cards that list what Mini*S lacks and where the page and Mini*S
disagree.

- `/minis:page-to-figma /` — full run: rebuild + findings (default)
- `/minis:page-to-figma /cestovani skip-audit` — rebuild only ("quiet"): no findings cards, no markers, no
  findings list

The rebuild frame is **portable**: designers copy it into their own files to work on it, so it
uses only published library components and published variables. Nothing in it points at the
findings, which live beside it as separate docs-kit frames.

## Hard rules

- **Production is read-only.** Never log in, never click, submit or type on the site, never set
  a cookie. The capture runs inside a hidden iframe of the user's open tab. Never write to the
  production repo (`../slevomat`) if it is around: read it for class names and partial paths only.
- **Real content stays out of the repo.** Page texts, prices and images go into Figma only. The
  content JSON lives in `~/.cache/minis/page-to-figma/<run>/`. Files committed to the repo hold
  classes, measured values and counts, never copied texts.
- **Only library instances and bound variables** in the rebuild. Every fill, stroke, padding,
  gap, radius and max-width is bound to a variable. Every text node has a Mini*S text style. No
  hex values, no raw px, no docs kit. When no variable fits, bind the closest one and record
  `no token`; never type the value in.
- **Never guess a name.** Components, variables and styles come from the Figma file (looked up
  by name in the script, which throws if one is missing), and token names come from `tokens.css`.
  Production partial paths come from grepping the production code.
- **Never invent content.** If the capture didn't get a text, leave it empty and hidden, or use
  `…`. A component's sample copy ("Luxusní apartmány…") must not survive on the canvas.
- **Figma: MiniS DS only** (`mfiAVMWkxiBRGnegjqLMNW`), page **Production rebuilds**. Don't touch
  other pages.

## Before you start

1. **Tools.** Claude in Chrome (the extension must be connected; the in-app browser loops on
   slevomat.cz's Cloudflare check) and the Figma MCP (`use_figma`, `get_screenshot`). Load the
   `figma:figma-use` and `figma:figma-generate-design` skills before the first `use_figma` call. For
   the findings cards (full run only), also load `minis-figma-docs` (`/minis:figma-docs`).
2. **The page.** One page per run, public, logged out. Pages behind login are out of scope.
3. **Run folder.** If the working directory is the Mini*S repo (it has `packages/tokens`), the
   run's repo files go to `audits/page-to-figma/<YYYY-MM-DD>-<page>/`. Otherwise, write them to
   `./page-to-figma/<YYYY-MM-DD>-<page>/` and tell the user. Either way, the content cache goes to
   `~/.cache/minis/page-to-figma/<YYYY-MM-DD>-<page>/`.

## Pass 1 — capture (Chrome)

1. Open the page in a new tab (`tabs_create_mcp` + `navigate`). Paste the whole
   `${CLAUDE_SKILL_DIR}/scripts/capture.js` into `javascript_tool` once. It defines
   `window.__p2f` and changes nothing on the page. Navigating the tab wipes it.
2. One call per width, in this order: `await __p2f.capture('<path>', 1280)`, then `375`, then
   `768`. Each one takes ~15 s: it scrolls an invisible on-screen iframe through the page so lazy
   blocks load, then measures in **light mode** (it removes production's `dark-mode` body class
   inside its own iframe). Check that `loggedIn` is `false`.
3. Read it in pieces. The tool cuts results at ~1,000 characters and **blocks results that look
   like cookies or URLs with parameters**, so use the digest readers, not raw JSON:
   - `__p2f.blocks('1280', 3)` → the page's bands with outline ids
   - `__p2f._s = __p2f.dig('1280', <id>, 4); __p2f.chunk(__p2f._s, 0)` → one block's subtree
   - for one element type, query the iframe directly:
     `document.getElementById('__p2f_1280').contentDocument.querySelector(…)`
4. Collect the content the rebuild needs (headings, tags, card names, places, prices) with a
   short query per block and keep it on `window`. Then write it to the cache folder as
   `content.json`. The PAGE BODY script defines its shape; for the homepage, see `C` in
   `build.homepage.js`.

## Pass 2 — map

Follow [references/mapping.md](references/mapping.md): blocks → components (role first),
values → variables, width → Layout mode, coverage counts. Write the run's
`mapping.md` (header table, coverage, block table with production classes and **verified**
partial paths, per-width table, capture notes). The homepage pilot is the worked example:
`audits/page-to-figma/2026-11-26-homepage/mapping.md` in the Mini*S repo.

Check the layout decisions first. Plan 030's "Decided" table in the Mini*S repo, when present,
gives the container widths and paddings. Don't bind a block width to a token that isn't a layout
decision.

## Pass 3 — build (Figma)

1. Make sure the page **Production rebuilds** exists (create it if not).
2. Fill the build script for the widest width and run it:
   `python3 ${CLAUDE_SKILL_DIR}/scripts/fill-template.py ${CLAUDE_SKILL_DIR}/scripts/build.<page-type>.js <cache>/content.json "<Page>" 1280 xl <x>`.
   Paste the output into `use_figma`. A re-run replaces the frame of the same page and width.
   - **No body for this page type yet?** Copy the HELPERS part of `build.homepage.js` and write a
     new PAGE BODY from your mapping table: the same helpers, in the page's block order. Once it
     works, save it as `build.<page-type>.js`: in the Mini*S repo at
     `plugins/minis/skills/page-to-figma/scripts/` (commit it, so the next plugin release carries
     it); anywhere else in the run folder, and tell the user to send it to the DS team. Never write
     into `${CLAUDE_SKILL_DIR}` when it isn't the repo: an installed plugin is a cache that the next
     update replaces. Then pass that file to `fill-template.py` instead of the bundled one.
3. Check the result's `skipped` list (texts in a font the plugin can't load), then screenshot the
   frame (`get_screenshot`, `maxDimension` ~1600). Fix wrong text slots, sample copy left behind
   and anything clipped.
4. Derive the narrower widths by **cloning** the wide frame in one `use_figma` call: rename it,
   resize it, set the Layout mode, set the Promo Card `Breakpoint`, the Message `Layout` and grid
   column widths, and give mobile scroll rows fixed card widths. This is cheaper and more
   consistent than re-running the build. Screenshot the 375 frame.
5. Frames sit side by side at y = 0, 120 px apart: 1280 at x 0, 768 at 1400, 375 at 2268.

Widths and modes: 375 → `2xs`, 768 → `md`, 1008 → `lg`, 1280 → `xl`, 1500 → `2xl` (the largest
Breakpoints value ≤ the width). The script sets the Layout mode and Foundation `light mode` on the
frame.

**Known limits** (say them in the report):
- **Images are placeholders** bound to `Color/Surface/faded`. Figma's page capture can't run on
  slevomat.cz, whose CSP blocks the capture script, unless a Playwright MCP is available. Never
  put a whole-page screenshot inside the rebuild.
- **Kensington can't be loaded by plugin scripts.** Promo Card titles and `Brand/*` styles can't
  be set. The homepage body puts a tile's title in the card's subtitle, and sets brand headlines
  in `Heading/xl` with the layer named `title — apply Brand/Heading/xl by hand`. Never use a
  `textCase` override, because it detaches the style.

## Pass 4 — findings (full run only; skipped by `skip-audit`)

1. **Findings list** in the run folder, `findings.md`, with two tables:
   - **Missing in Mini*S:** id, what production has, classes / partial, closest Mini*S item, proposed fix, which plan it feeds.
   - **Conflicts:** id, property, Mini*S value, production value, kind, which plan it feeds.
   - **Ids:** `<page>-<width>-<nn>`. A finding that shows at every width takes the widest width's id.
   - Values and classes only.
2. **Cards** (with `minis-figma-docs`, Report type). Clone `Docs card — template`, then:
   - `main` holds the title (`.docs/heading-2`), a description and a **Summary** section with columns for Blocks, Values, Run and Feeds, plus a footnote for the limits.
   - The `roadmap` card, cloned twice, becomes **Missing in Mini*S** and **Conflicts**: one bullet per finding, starting with its number.
   - Delete the pill and the other sections. Put the stack 120 px right of the narrowest frame.
3. **Markers:** numbered docs-kit boxes in a `markers — <page>-<width>` frame placed in the gap
   left of each rebuild frame, level with the block they point at. Never inside the rebuild.
4. **Audit** the stack and the rebuild frames:
   - zero unbound colours, zero unstyled text outside instances;
   - no `docs/*` variables or `.docs/*` styles inside a rebuild.
5. Tell the user which plans the findings feed. In the Mini*S repo, add a dated line to plan 003
   under the plans concerned (021 review, 023 recipes, 027, 030, G12/G13). Commit it separately,
   touching only `todo-plans/`.

## `skip-audit`

Passes 1–3 only, with no findings cards, no markers and no `findings.md`. The mapping still
decides every block, because the build needs it, but the run folder only gets `mapping.md` when
the user asks for it. Gap blocks look like the rest, but their layers are still named
`not Mini*S — <what it is>`. The build rules don't change: instances and bound variables only.

## Report

Give the user:
- the frame ids and a link (`https://www.figma.com/design/mfiAVMWkxiBRGnegjqLMNW/MiniS-DS?node-id=<id>`)
- the coverage line
- the findings count (full run)
- the known limits
- what was committed

Don't push.

## Files

- `scripts/capture.js` — pass 1, pasted into Chrome
- `scripts/build.homepage.js` — pass 3 for the homepage: HELPERS + PAGE BODY, filled by `fill-template.py`
- `scripts/fill-template.py` — fills a build script with one run's values (stdout only)
- `references/mapping.md` — pass 2 rules, Figma component ids, Layout mode table
- `README.md` — what the skill is for, for people browsing the plugin
