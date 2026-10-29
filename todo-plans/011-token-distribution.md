---
id: 011
title: Distribute tokens as a versioned package with a Style Dictionary source
status: draft
created: 2026-10-29
updated: 2026-10-29
owner: Lexislav
---

# 011 — Distribute tokens as a versioned package with a Style Dictionary source

> **Blocked on open question 1 (canonical names).** Phase 1 can run before it is answered and
> should inform it; nothing from Phase 2 on can start until it is.

## Context

Mini*S is being redefined as shared rules rather than a UI kit, and those rules have to live
where UI is actually built: the production Nette/Latte repo. Tokens are the first rule that has
to arrive there intact. The Nette team has said they want to use Style Dictionary. The exporter
plugin (`Figma plugins/minis-designtokens-exporter`) can already export Style Dictionary JSON,
including light/dark modes, but this repo doesn't use it: `packages/tokens/scripts/build.js`
copies the Figma-exported `tokens.css` and generates `tokens.rgb.css` from `tokens.rgb.json`.
The redefinition is still in ideation, so this plan is a draft.

## The problem

- **No versioned release.** `@minis/tokens` is `0.1.0` and published nowhere. Nette and the
  mobile app got their token values by copying, so nobody can tell which version they have, and
  every update is manual.
- **Copies drift.** Nothing flags a copy that has fallen behind or been edited locally.
- **Nothing in Nette to measure or lint against.** Plan 010's unknown-property check and any
  adoption count need a single token list that Nette actually installs.

## Constraints

- **Figma variables are the source of truth.** Every token change starts there; nobody edits
  tokens in a built output.
- **The exporter settings shape every name.** "Remove collection name" and "Omit default" are off
  by default and stored per machine (CLAUDE.md → "Exporter settings"). A Style Dictionary export
  from a fresh install has different names from today's.
- **`tokens.json` names drift from `tokens.css`** (`--typography-heading-large-*` →
  `-heading-lg-*`, `mega-poster` → `heading-2xl`, `poster` → `heading-xl`). The same alias table
  already lives in `apps/storybook/.storybook/tier-tokens.ts`.
- **Some tokens exist only in `tokens.css`:** the font families, the brand composites
  `--typography-brand-*`, `--container-bleeding-edge-padding` and the FONTS comment block. Only
  the FONTS block carries the `HAND-MAINTAINED` marker; the others are known only from CLAUDE.md.
  A Style Dictionary build from the export alone loses all of them.
- **Heritage colours keep working unchanged** until production fully adopts Mini*S (plan 001).
- **Dark mode is `<html data-mode="dark">`**; `data-theme` is the colour-schema hook
  (`[data-theme="gift"]`). The exporter's own docs show `[data-theme="dark"]`, which would
  clash with that.
- **`tokens.css` has more than `:root`:** responsive tiers in `@media` blocks (the Layout
  collection's per-breakpoint modes) and the gift schema. Style Dictionary's stock CSS formats
  emit none of that.
- **`100000px` in `tokens.json` means `100%`.** Every output needs that transform.
- **The web components and Storybook keep working throughout.** They consume `tokens.css`, and
  Storybook's Tier toolbar reads `tokens.json`.

## Approach

**Recommended: (c) move this repo's build onto Style Dictionary**, so Mini*S and Nette run one
pipeline from one source, gated on an exact parity check (Phase 2). The package then carries the
source JSON, the config and its custom transforms, and the built CSS. Nette either uses the
built CSS or runs the same config with extra platforms. Names match because the same code
produces them, not because two teams follow the same convention. Mobile gets its outputs from
the same source later.

**Rejected:**

- **(a) Publish the built CSS only.** It fixes versioning but not the rest: Nette has asked for
  Style Dictionary, CSS can't feed SCSS, PHP or mobile outputs, and those teams would go back
  to copying or re-deriving values.
- **(b) Publish the JSON plus a reference config and let consumers build** — rejected as the end
  state, kept as the fallback. Mini*S would keep `build.js` while Nette ran Style Dictionary, so
  two pipelines would produce the names and drift would move from the copied values into the
  build step. If Phase 2 stalls, ship (b) with the built CSS alongside, so the release isn't held
  up.

## Phases

- [ ] **Phase 0 — Settle canonical names.** Answer open question 1 and record the decision here.
      Document the transform from the export path to the CSS name: drop the collection, the
      mode and `default` segments, apply path dedup and the drift table. The JSON already carries
      a `cssName` per token, so a name transform might only need to read it (check in Phase 1).
- [ ] **Phase 1 — Compare a Style Dictionary export with today's `tokens.css`.** Run in a scratch
      directory with the repo untouched. List the tokens that are missing, extra or renamed,
      including the hand-maintained ones. Check how the modes come out: light/dark, the gift
      schema and the Layout breakpoint tiers.
- [ ] **Phase 2 — Parity config.**
  - [ ] Write a Style Dictionary config, with custom transforms and formats, that reproduces
        today's `tokens.css` and `tokens.rgb.css` exactly: `:root`, `[data-mode="dark"]`, the
        gift schema, the `@media` tiers, `100000px` → `100%`, and the hand-maintained tokens
        (open question 5).
  - [ ] Add a diff check that has to report 0 differences on two consecutive Figma re-exports.
  - [ ] Only then: switch `build.js` to it (option c), and keep Storybook's Tier toolbar working.
- [ ] **Phase 3 — Versioned releases.**
  - [ ] Semver policy: a removed or renamed token is a major release, a new token is minor, and
        a re-valued token is minor with a changelog entry. Plan 001's ramp changes are major.
        Go to `1.0.0` once names are canonical.
  - [ ] Where it's published: npm, GitHub Packages or a release artifact (open question 3).
  - [ ] What goes in the package: the source JSON, the built CSS (`tokens.css`, `tokens.rgb.css`,
        the Kensington overlay but never the font binary), the config with its transforms, and
        `NOTICE`. Add the missing `repository` field.
  - [ ] Releases follow the CLAUDE.md changelog rules: every added, renamed, removed or
        re-valued token in `CHANGELOG.md` and in the Storybook Changelog, with the version
        number in the release's heading.
- [ ] **Phase 4 — Using it in the Nette repo**, agreed with the Nette team.
  - [ ] Which outputs they need: CSS, SCSS, PHP constants?
  - [ ] Who owns their config (open question 4) and how updates arrive: a pinned version and
        an upgrade PR per release.
  - [ ] Replace the copied values; plan 010's linter then measures against the installed list.
- [ ] **Phase 5 — Later: the mobile app.** iOS and Android outputs from the same source and
      config, with their own platforms added.

## Open questions

1. **Canonical token names (blocking).** The Style Dictionary export keeps the collection in the
   path (`color.foundation.surface.primary`), while the CSS uses `--color-surface-primary`.
   `tokens.json` drifts too. Which name set is canonical? Nette must end up with the same names
   as Mini*S. Plan 010's question 2 is the same question, so answer it once for both.
2. **Does the Nette build have Node?** If not, option (c) still ships built CSS, but the Nette
   team can't run Style Dictionary themselves, and the PHP/SCSS outputs would have to be built
   here.
3. **Private or public registry, and who has access?** Public npm needs the `@minis` scope and
   the Phase 3 metadata gaps (`repository`, `NOTICE`) closed. GitHub Packages needs a token in Nette's CI. A release
   artifact needs no registry but has no version resolution.
4. **Who owns the Style Dictionary config on each side?** Who reviews a transform change that
   renames tokens for every consumer?
5. **Where do the hand-maintained tokens move?** Into Figma (so they get exported), or into a
   hand-written source JSON that is merged in at build time?
