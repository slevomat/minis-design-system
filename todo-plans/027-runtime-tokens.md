---
id: 027
title: Runtime tokens in production — CSS custom properties for themes and dark mode
status: draft
created: 2026-11-13
updated: 2026-11-13
owner: Lexislav
---

# 027 — Runtime tokens in production: CSS custom properties for themes and dark mode

> **Gap G8 in plan 003, turned into a plan** (2026-11-13). Rollout phase 5 ("Expansion", from
> March 2027). Serves the goal "easy changes": rebrand, themes and dark mode through tokens.

## Context

**In Mini*S** every token is a CSS custom property in `tokens.css`; dark mode is
`<html data-mode="dark">` and colour schemas (Classic, Gift) are `data-theme`. Changing a theme
changes values at runtime, with no rebuild.

**In production** (plan 017, commit `bb1847f86e4`) tokens are Stylus variables compiled to literal
CSS, but runtime switching already exists in two places:

- **Dark mode:** the 66 paired semantic aliases in `settings/color-semantic.styl` compile to CSS
  `light-dark()`, switched by `color-scheme` (the `.force-dark-mode` class, or
  `prefers-color-scheme` with `.dark-mode`). Explicit `$color-dark-*` overrides are still common
  (679 uses).
- **Brand themes:** `utilities/_brand-theme.styl` maps `.brand-theme--{theme}` to CSS custom
  properties; the theme list lives in `BrandColorScheme.php` (`doc/ai/skills/brand-themes.md`).

So production has runtime theming, just not through Mini*S names or the Mini*S theme model.

## The problem

- **A rebrand or new theme means a rebuild and code changes** wherever a colour is a compiled
  literal or an explicit `$color-dark-*`.
- **Two theme models:** Mini*S `data-theme` schemas (Classic, Gift) vs production's
  `.brand-theme--*` classes (campaign colours). They overlap in purpose, not in names.
- **No one has decided whether product wants Gift or more dark mode in production** (plan 003,
  G8 note). Without that, runtime tokens are a solution without a requirement.

## Constraints

- **Product decides first.** No engineering until the requirement (themes, dark mode, rebrand)
  is confirmed.
- **Stylus colour functions can't take `var()`** (`stylus.md`: paired aliases can't go into
  `rgba()` / `darken()`). Only the semantic layer can become runtime; primitives and computed
  values stay compiled.
- **Heritage values stay unchanged** (plan 001).
- **Production conventions win** and production merges (plan 020).

## Approach

1. **Requirement first:** which themes production needs at runtime (Gift? brand campaigns? dark
   mode for all users?), and for which surfaces.
2. **Emit the semantic layer as custom properties** from the same Style Dictionary build (012):
   `--color-surface-primary` etc., with mode and theme blocks like `tokens.css`; Stylus semantic
   aliases point to them (`$color-surface-primary = var(--color-surface-primary)`).
3. **Map the two theme models:** each `BrandColorScheme` becomes a Mini*S schema (or stays a
   production-only campaign layer on top), decided case by case with design.
4. **Migrate gradually:** files using paired aliases switch for free; explicit `$color-dark-*`
   overrides are replaced as files are touched, guided by Stylelint (011).

**Rejected:**

- **All tokens at runtime.** Stylus functions and primitives can't, and nobody needs to switch a
  primitive.
- **A second theme system next to `.brand-theme--*`.** Map, don't duplicate.

## Phases

- [ ] **Phase 0 — Requirement** from product: themes and dark mode needed in production, and
      where.
- [ ] **Phase 1 — Inventory** (with 017): paired-alias coverage, explicit `$color-dark-*` uses,
      brand themes vs Mini*S schemas.
- [ ] **Phase 2 — Custom-property output** for the semantic layer in the shared build (012).
- [ ] **Phase 3 — Pilot one surface** (e.g. product cards) switching theme at runtime.
- [ ] **Phase 4 — Gradual migration** with Stylelint guidance.

## Dependencies

- **012** — the shared Style Dictionary build; **003 decision 3** — canonical names.
- **011** — lint guidance for the migration; **017** — the inventory numbers.
- **001** — heritage steps stay fixed. **020** — production agreement.

## Open questions

1. **Does product want Gift (or other schemas) in production at all?** And dark mode for all users,
   or as an option?
2. **Are brand campaign themes Mini*S schemas** or a production layer on top?
3. **Performance:** is a few hundred custom properties on `:root` acceptable on production pages?
   (Likely yes; to measure in phase 3.)
4. **E-mails** can't use custom properties reliably; do they stay compiled (`email.styl`)?
