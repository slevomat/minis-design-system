---
id: 001
title: Move the colour ramps onto a curve
status: draft
created: 2026-08-11
updated: 2026-08-11
owner: unassigned
---

# 001 — Move the colour ramps onto a curve

> ## ⚠️ Must be reviewed by a production developer before this plan goes `ready`
>
> **Everything in this plan is scoped from what is visible inside this repo. That is not the whole
> picture.** Heritage palette usage on production may differ — colours may be consumed under
> different names, through the legacy stylesheet, hardcoded at call sites, or in places these
> tokens never reach. The measured constraint set below (24 tokens) is therefore a **lower bound,
> not the answer**.
>
> A production developer must confirm what is actually in use before any phase past 0 starts. If
> production usage turns out broader than assumed, the phasing changes — and quite possibly the
> approach does too. **Do not treat the numbers in this plan as the constraint set until someone
> who knows production has signed off on them.**

## The problem

The `--color-{hue}-{step}` ramps were never generated. They are legacy Slevomat brand colours —
the scheme MiniS started from — slotted into whichever step number they landed nearest. The
`/* Heritage reference: … */` comments in `packages/tokens/src/tokens.css` mark them.

Two consequences we keep paying for:

1. **The step number is a position in the ramp, not a lightness.** `blue-25` is L 0.34;
   `gold-25` is L 0.56. You cannot reason about `-35` meaning the same thing across two hues, so
   every cross-hue decision is done by eye.
2. **There is no rule to extend.** Adding a step means extrapolating from whichever legacy colours
   happen to sit next to it. When adding the `-10` steps (2026-08-11) this produced `red-10` only
   0.03 L from `red-15` — visually the same colour — because `red-15 → red-25` is the flattest
   interval in that ramp. For gold, *both* steps feeding the extrapolation were heritage anchors,
   so the "slope" being continued was an accident of two unrelated brand colours.

## Measured state (2026-08-11)

| Metric | Count |
|---|---|
| Ramp primitives (`--color-{hue}-{step}`) | 94 |
| Heritage-anchored | 40 |
| Referenced by semantic / component / schema tokens | 37 |
| **Heritage AND referenced — the real constraint set** | **24** |
| Heritage with no in-repo reference | 16 |

Regenerate these with the inventory script from Phase 0 rather than trusting the numbers above.
**These counts describe this repo only — they say nothing about how production consumes the
heritage palette. Unverified until a production developer confirms them.**

**Three hues have no higher-layer references at all: `gold`, `orange`, `purple`.** They are the
natural pilot.

## Constraints

**Non-negotiable — heritage values must keep working.** The heritage colours are the original
Slevomat scheme and production still runs on them. They must stay available and unchanged until
production has fully adopted MiniS and its tokens. This plan must never require production to
change in lockstep; the whole design below follows from that single constraint.

Derived constraints:

- Any curve must not silently move a value that production resolves today.
- "Fix the palette, then fix the fallout" is not available to us. Value changes cannot land first.
- Heritage colours need a home that is *stable by contract*, not stable by accident of nobody
  having touched them.

## Approach

**Decouple identity from position.** Today one token is doing two jobs: naming a specific legacy
brand colour, and marking a position on a lightness ramp. Those jobs have incompatible stability
requirements — the first must never change, the second must be free to move. Split them.

1. **Freeze heritage into its own namespace.** The 40 heritage colours get explicit, permanent
   names (`--color-heritage-*`, mirroring the `.Heritage/…` paths already in the comments) whose
   values are contractually fixed. Nothing about them is derived, and no future palette work may
   touch them.
2. **Generate the ramps from a curve.** `--color-{hue}-{step}` becomes computed output: a defined
   lightness curve per step number, shared across hues, with a per-hue chroma envelope clamped to
   sRGB and a hue-angle path. Step number then means the same thing everywhere.
3. **Fit the curve to the values we already ship.** Rather than designing the curve in the abstract
   and repairing the damage afterwards, choose its parameters to *minimise the deviation at the 24
   load-bearing steps*. If the curve can pass within ΔE ≈ 1–2 of every consumed colour, then
   repointing semantic tokens onto it is visually a non-event, and production sees nothing.
4. **Semantic tokens are the switch.** `--color-feedback-*`, `--color-interaction-*`,
   `--color-border-*` etc. are the only things that should ever move from a heritage value to a
   curve value, one hue at a time, behind a visual diff.

### Why not the alternatives

- **Regenerate the ramps in place and accept the shift** — violates the constraint outright.
  Production resolves these values today.
- **Keep two parallel palettes forever** (`--color-*` legacy and `--color-v2-*` new) — this is
  Phase 3 as a permanent state. It works, but every consumer then has to know which palette it is
  on, and the ambiguity outlives the migration. Acceptable as a transition, not as a destination.
- **Keep extrapolating locally per ramp, as done for `-10`** — cheapest, and correct as far as it
  goes, but each new step inherits the arbitrariness of its neighbours. It does not converge on a
  system; it just adds to one that isn't one.

## Phases

Each phase is independently landable. Phases 0–3 change no rendered colour anywhere.

### Phase 0 — Instrumentation (no token changes)

- [ ] Script: inventory every ramp primitive → step, L/C/H, heritage flag, list of referencing
      tokens. Output a table + JSON. This replaces the hand-counting above.
- [ ] Script: plot L, C, H against step number per hue, marking heritage anchors, so the
      irregularity is visible rather than argued about.
- [ ] Script: ΔE (OKLab euclidean, or CIEDE2000) between any two candidate palettes, reported
      per token and as a max/mean.
- [ ] Storybook visual baseline of every component in light and dark, to diff against later.

### Phase 1 — Establish the true constraint set

- [ ] **Production developer review — gates every later phase.** Walk the plan and the measured
      constraint set with someone who knows the production codebase. Heritage usage there may not
      match what this repo shows.
- [ ] Determine what production actually consumes and how (see Open questions). The in-repo count
      of 24 is a *lower* bound — production may consume heritage colours directly, outside these
      tokens entirely.
- [ ] Confirm whether the 16 heritage steps with no in-repo reference matter to production. If they
      don't, they are free immediately and the constraint set shrinks.
- [ ] Write the answers back into this file and move `status` to `ready`.

### Phase 2 — Design and fit the curve

- [ ] Define the step→lightness curve. Decide whether step number *is* L×100 (readable, but
      renumbers every token) or maps to L through a documented easing (keeps names, less obvious).
- [ ] Per-hue chroma envelope: peak chroma, falloff toward both ends, sRGB gamut clamp.
- [ ] Hue-angle path per ramp (some ramps already drift — `blue` runs 239°→217°; decide whether
      that is intentional warmth or noise to remove).
- [ ] Fit against the constraint set; publish the ΔE table. **Gate: if any consumed step lands
      beyond agreed ΔE, the curve is wrong, not the token.**

### Phase 3 — Land the curve alongside (additive, zero risk)

- [ ] Ship curve values under a parallel name. Nothing references them.
- [ ] Storybook page showing curve vs current, per hue, with ΔE per step.
- [ ] **Pilot on `gold`, `orange`, `purple`** — no higher-layer references, so these three can be
      switched outright and reviewed as a real example before touching anything load-bearing.

### Phase 4 — Repoint semantic tokens, hue by hue

- [ ] One hue per PR. Visual diff against the Phase 0 baseline attached to each.
- [ ] Order by risk: `pink` (1 reference) → `yellow` → `red` → `green` → `blue` → `grey` last
      (18 references, and it carries text and border colours).

### Phase 5 — Freeze heritage

- [ ] Introduce `--color-heritage-*` with the exact current values, documented as contractually
      fixed.
- [ ] Repoint anything still needing a legacy colour at the heritage name.
- [ ] Figma: heritage becomes its own collection, separate from the generated ramps.
- [ ] Document the split in `CLAUDE.md` and `docs/ai-prompts/getting-started.md`.

### Phase 6 — Retire (blocked on production)

- [ ] Once production has fully adopted MiniS tokens, delete the heritage layer.
- [ ] Straighten the leftovers held for backward compatibility: `purple-20`, `purple-25`, and the
      irregular in-between steps (`green-48`, `red-40`, `blue-90`, `purple-80`, `pink-90`).
- [ ] Revisit `red-10`, left at L 0.28 and visually indistinguishable from `red-15`.

## Open questions

These block moving to `ready`. Answers belong in this file. **Question 1 needs a production
developer — nobody working only from this repo can answer it.**

1. **Where does production consume heritage colours today** — through these CSS custom properties,
   through its own legacy stylesheet/Sass variables, through the Figma `.Heritage` collection,
   hardcoded at call sites, or some combination? Is there an existing inventory? Usage may vary
   across the production codebase in ways this repo gives no visibility into, so this has to be
   answered by someone who works there rather than inferred.
2. **Must heritage values stay byte-exact, or is a small perceptual tolerance acceptable?** This
   decides whether Phase 4 can nudge a value at all, and therefore how tightly Phase 2 must fit.
   Assume byte-exact until told otherwise.
3. **Do the 16 heritage steps with no in-repo reference still matter to production?** Cheapest
   possible win if not.
4. **Is there a milestone or estimate for "production has fully adopted MiniS"?** Holding the
   heritage layer for two more quarters and holding it for three more years are different plans.
5. **Does step number become L×100?** Renumbering is the honest fix and makes the system
   self-describing, but it renames every token and breaks every consumer — possibly worth doing in
   the same breath as Phase 6, and definitely not before.
6. **Who owns the Figma side** of the heritage/generated split, and does the export pipeline need
   to change to emit two collections?

## Appendix — the constraint set

**Heritage AND referenced (24) — cannot move without a visual review:**

`blue-35` `blue-45` `blue-65` `blue-95` · `green-35` `green-45` `green-65` `green-95` ·
`grey-10` `grey-20` `grey-25` `grey-35` `grey-40` `grey-50` `grey-60` `grey-80` `grey-90` `grey-95` ·
`pink-45` · `red-35` `red-45` `red-95` · `yellow-65` `yellow-95`

**Heritage, no in-repo reference (16) — free unless production says otherwise:**

`blue-85` `blue-90` · `gold-25` `gold-35` `gold-45` · `green-48` ·
`orange-45` `orange-55` `orange-65` `orange-75` · `pink-65` ·
`purple-20` `purple-25` `purple-45` · `red-40` · `yellow-55`

**Referenced but not heritage (13) — free to move to the curve, subject to visual review:**

`blue-75` `blue-99` · `green-55` `green-75` · `red-15` `red-55` `red-65` `red-75` `red-85` ·
`yellow-25` `yellow-35` `yellow-45` `yellow-75`
