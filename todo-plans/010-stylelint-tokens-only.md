---
id: 010
title: Enforce "tokens only" with Stylelint
status: draft
created: 2026-10-29
updated: 2026-10-29
owner: Lexislav
---

# 010 — Enforce "tokens only" with Stylelint

> **Blocked on two decisions: open questions 1 and 2.** Phase 0 can run before they are answered
> and should inform them; nothing from Phase 1 on can start until they are.

## Context

Mini*S is being redefined from "a UI kit people import" to "shared rules and decisions anyone,
human or AI, builds with". Rule 2, **tokens only**: no hardcoded hex, px or font values — every
value comes from a Mini*S token. Where possible, rules are enforced automatically in CI. That
matters most in the production Nette/Latte repo, where designers now vibe-code with AI; this repo
is where the config is built, tested and dogfooded first. Ideation only; nothing is decided.

## The problem

- **No CSS linter anywhere.** `pnpm lint` is ESLint on TS/JS only; CI runs build, typecheck, lint.
- **Literals hide inside fallbacks.** Component styles (`*.styles.ts`) carry 75 hex and 212 px
  literal fallbacks inside `var(--x, …)`, plus about 76 raw px declarations (mostly 1–2px
  outlines and borders, and a few fixed sizes). Counted with grep on 2026-10-29.
- **AI tools invent token names** that don't exist (e.g. `--color-border-default`, see CLAUDE.md →
  "Figma `default` has no CSS suffix"). Invalid names fail silently: the fallback or nothing wins.

## Constraints

- **Three CSS sources:** Lit `css` template literals (need `postcss-lit` as the custom syntax),
  plain CSS in `packages/tokens/src`, and inline styles in `docs/examples` and the
  `packages/create-minis` template.
- **`@media` / `@container` conditions can't use custom properties**, so breakpoint literals there
  are legitimate (CLAUDE.md → "Two responsive mechanisms").
- **Heritage colours must keep working unchanged** (plan 001). The linter flags usage, it never
  rewrites token values.
- **Nothing may block Nette developers on day one.** Every rollout starts in warning mode.
- `tokens.css` defines the tokens, so the definition files are exempt from the strict-value rules.

## Approach

A shared Stylelint config published as a package, built and dogfooded here, then consumed by the
Nette repo. It combines strict-value rules (only `var(--…)` and an allow-list of keywords for
colour, spacing, radius, typography and shadow properties) with an unknown-custom-property check
whose list of valid names is read from the built tokens — so new tokens need no config change.

**Rejected:**

- **Custom grep script in CI** — no understanding of CSS structure (can't tell a fallback from a
  breakpoint), no editor integration, no per-line disable, and every exception is a regex.
- **ESLint rules on the Lit templates** — only sees CSS as template strings; doesn't cover plain CSS,
  inline styles or the Nette repo's stylesheets. Stylelint plus `postcss-lit` covers all of them.
- **Only AI skills or PR review** — skills (plans 003–005) reduce violations but can't guarantee
  them; reviewers miss a mistyped token name. Useful alongside the linter, not instead of it.

## Phases

- [ ] **Phase 0 — Trial run, repo untouched.** Run Stylelint from a scratch directory against this
      repo; measure violations under both fallback policies (question 1); list unknown custom
      properties and false positives; propose a starting config.
- [ ] **Phase 1 — Shared config package** (working name `@minis/stylelint-config`).
  - [ ] Strict-value rules for colour, spacing, radius, typography and shadow properties.
  - [ ] Unknown-custom-property check fed from the built token list.
  - [ ] Documented exceptions: `0`, `100%`, `currentColor`, `transparent`, `inherit`,
        media/container-query breakpoints, plus anything Phase 0 finds.
- [ ] **Phase 2 — Adopt in this repo.**
  - [ ] Add the lint script and a CI step in warning mode.
  - [ ] Clear violations component by component; a cleanup that changes output follows the
        changelog rules in CLAUDE.md.
  - [ ] Switch the CI step to blocking.
- [ ] **Phase 3 — Roll out to the Nette repo.**
  - [ ] Agree with the Nette team how the package gets there (cf. plan 009).
  - [ ] Start in warning mode; switch to blocking after about a month.
  - [ ] Measure the share of token-based values — also feeds the planned adoption analysis.
- [ ] **Phase 4 — Keep in sync.** Confirm new tokens flow in from the build with no config change;
      document how to request an exception.

## Open questions

1. **Fallback policy (blocking).** Are literal fallbacks `var(--x, #hex)` allowed, or only token
   fallbacks `var(--x, var(--y))`? Decides whether 287 fallbacks are violations.
2. **Canonical token names (blocking).** `tokens.css` or `tokens.json`? They drift (CLAUDE.md →
   "Figma-export naming drift"), and the unknown-property check needs exactly one list.
3. **Who owns exceptions** — who approves a new allow-list entry or a `stylelint-disable`?
4. **Are `docs/examples` and the `create-minis` template linted?** Both are copied by AI tools, but
   inline styles in HTML need a different custom syntax.
5. **Does the Nette repo use CSS, SCSS or both?** SCSS needs `postcss-scss` and has its own
   variables, which the config has to treat as literals or as tokens.
