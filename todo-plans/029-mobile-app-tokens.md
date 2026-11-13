---
id: 029
title: Mobile app — Mini*S token names and structure as the third porting target
status: draft
created: 2026-11-13
updated: 2026-11-13
owner: Lexislav
---

# 029 — Mobile app: Mini*S token names and structure as the third porting target

> **Gap G11 in plan 003, turned into a plan** (2026-11-13). Rollout phase 5 ("Expansion", from
> March 2027). Carries **decision 6 (accepted)**: the mobile app is a third token-porting target.
> Takes over plan 012's phase 5 ("Later: the mobile app").

## Context

From the brief: the mobile app is released and **has already taken over Mini*S token values**; the
plan is to take over their **names and structure** too. Whether it also takes the web components
is open.

From production (plan 017): the same Style Dictionary build that writes production's Stylus
variables also writes **`doc/tokens/kotlin/Tokens.kt`** (Compose object, package
`cz.slevomat.tokens`), from the Mini*S export of 2026-08-12. That's an **Android** output only;
there is no iOS (Swift) output. The mobile team's repository, platforms and how they consume
`Tokens.kt` aren't known from either repo.

## The problem

- **The app copied values**, so it can't tell which token version it has, and a renamed or
  re-valued token in Figma never reaches it (plan 012's problem, third time).
- **Names differ by platform build.** `Tokens.kt` names come from production's transforms
  (`-primitives|-foundation…` stripped as substrings), not from a canonical list.
- **Nobody on the mobile side is named** in the plans, so no one can say what they need.

## Constraints

- **Canonical names** (decision 3) apply to mobile too: one name, transformed per platform.
- **One source and one build** (plan 012): no separate mobile export.
- **The mobile team decides** how their app consumes tokens; Mini*S delivers outputs.
- **Responsive and mode tokens** need a mobile meaning: viewport tiers don't map to phones the way
  they do on web; dark mode does.

## Approach

1. **Meet the mobile team:** platforms (Android, iOS, cross-platform?), how `Tokens.kt` is used
   today, what they copy by hand, what they'd need.
2. **Add the mobile outputs to the shared build** (012): Compose for Android (as today), Swift for
   iOS if needed, both from canonical names, versioned with the token release.
3. **Decide what doesn't port:** web-only tokens (breakpoints, container widths) are left out or
   mapped; typography and spacing get platform units.
4. **Registry:** the `mobile` key in each item's `implementations` (013) records what the app has.

**Rejected:**

- **Keeping the copy.** It's why the app can't tell its version.
- **A mobile-only export from Figma.** Two builds drift.

## Phases

- [ ] **Phase 0 — Mobile team contact** and their current token use.
- [ ] **Phase 1 — Name mapping** from canonical names to Kotlin (and Swift) identifiers; what's
      web-only.
- [ ] **Phase 2 — Outputs in the shared build** (012), versioned.
- [ ] **Phase 3 — First adoption** by the app; record in the registry.
- [ ] **Phase 4 — Web components in the app?** Decide the brief's open question with the mobile
      team.

## Dependencies

- **012** — the shared build and versioning (this plan replaces its phase 5).
- **003 decision 3** — canonical names; **024** — automatic export feeding every output.
- **013** — `implementations.mobile`.

## Open questions

1. **Who is the mobile team's contact**, and which platforms do they ship?
2. **How is `Tokens.kt` consumed today** — copied from production's `doc/tokens/`, or not at all?
3. **iOS:** native Swift, or a cross-platform framework that takes one output?
4. **Will the app take the Mini*S web components** (e.g. in web views)? The brief keeps this open;
   the answer changes how much to invest in them.
