---
id: 032
title: Logged-in page layouts — check that the layout rules hold behind login
status: draft
created: 2026-11-27
updated: 2026-11-27
owner: Lexislav
---

# 032 — Logged-in page layouts: check that the layout rules hold behind login

> **Nice to have.** Not scheduled, and nothing waits for it. The owner chose on 2026-11-27 not to
> measure pages behind login now; this plan keeps the idea and the method so it can be picked up
> later. Split out of plan 030 (its phase 2 and question 4).

## Problem

The Mini*S layout rules (plan 030: three width levels, one main + sidebar rule, stacking below
1008px) were derived from **logged-out** pages only: homepage, a category listing, a deal detail,
the magazine, login and the cart. The measured facts are in
[`docs/ai-prompts/layouts/production-reference.md`](../docs/ai-prompts/layouts/production-reference.md).

Pages behind login were never looked at: the user account (orders, vouchers, settings), the
checkout steps after the cart, and partner pages. One sign that they may be built differently:
production's third container system, `layout-wrapper` (96 uses in the Latte templates, 53 plain +
43 `--wide`), didn't render on any measured page, so it most likely lives there. If those pages
follow other widths or another sidebar pattern, the guides say nothing about part of the site.

## Constraints

- **Production is read-only.** `../slevomat` and slevomat.cz are never written to.
- **Claude never enters credentials.** Any live measurement needs the owner signed in, in Chrome
  (the in-app browser loops on Cloudflare for slevomat.cz).
- **No customer data in the repo.** Measurements record widths, classes and component names, never
  order contents, names, addresses, or screenshots that show personal data.
- **Facts and proposals stay apart** in `production-reference.md`, as in plan 030.

## Approach

Start from the code, which needs no sign-in, and measure live only if the code leaves a real
question:

1. **Code first.** Find which presenters and templates use `layout-wrapper` and the account and
   checkout layouts, and read their Stylus: widths, padding, column classes. That alone may show
   whether these pages fit the three width levels.
2. **Live only for what the code can't settle**, with the method from plan 017
   ("Layout — 2026-11-13": fixed-width iframes at 375 / 768 / 1280 / 1500px,
   `getBoundingClientRect()` plus computed styles), with the owner signed in.
3. **Compare** with the plan 030 rules. A match is one line in the reference; a difference becomes
   an open question in plan 030 or a new plan, never a silent change to the guides.

Rejected: measuring every logged-in page. The goal is to confirm or break three rules, not to
catalogue the account section.

## Phases

### Phase 1 — Code-only mapping (no sign-in)

- [ ] List the templates under `../slevomat/app/ui` that use `layout-wrapper` /
      `layout-wrapper--wide`, grouped by section (account, checkout steps, partner, other)
- [ ] For each section: container widths, padding and column split from the Stylus, mapped to the
      Mini*S levels (wide 1240 / medium 1008 / narrow 752) and the main + sidebar rule
- [ ] Note what the code can't settle (dynamic classes, A/B variants) as candidates for phase 2

### Phase 2 — Live measurement (optional, needs the owner's sign-in)

- [ ] Only the pages phase 1 flagged, at 375 / 768 / 1280 / 1500px, no personal data recorded

### Phase 3 — Record

- [ ] Results in `production-reference.md` (section 1 for facts, section 3 for any new question)
- [ ] Close the question moved from plan 030, or open a follow-up there if a rule doesn't hold

## Open questions

1. **Which logged-in sections matter most** if only some get looked at: the account, the checkout
   steps after the cart, or partner pages?
2. **Is `layout-wrapper` still current** in production, or legacy that production would rather
   remove? A production developer's answer may make phase 1 unnecessary.

## Related

- **030** Layout guides — the rules this plan checks (its former phase 2 and question 4)
- **017** Production reference audit — the measuring method ("Layout — 2026-11-13")
- **031** Production page → Figma — rebuilds pages; a logged-in page would hit the same sign-in constraint
