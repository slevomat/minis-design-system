---
id: 021
title: Monthly registry review — proposals, approval and how decisions are recorded
status: draft
created: 2026-11-13
updated: 2026-11-13
owner: Lexislav
---

# 021 — Monthly registry review: proposals, approval and how decisions are recorded

> **Gap G7 in plan 003, turned into a plan** (2026-11-13). Rollout phase 4 ("first monthly
> review", February 2027). Core rules 5 and 6 depend on it, so do the contribution skill (005) and
> the registry's `status` and `decision` fields (013). Needs the approval group named in plan 020.

## Context

In the redefinition anyone may build a **Local** item without asking. What should become part of
the design system goes through a proposal and a decision (brief, "Návrhy a schvalování"):

1. **Proposal.** Anyone proposes a new pattern or the promotion of an existing one. A proposal is
   a registry item with status `proposed` and a link to an issue or PR. The contribution skill
   creates it when an AI session finds a gap.
2. **Assessment.** At the monthly registry review the DS owner and the approval group (lead
   developer, design representative, product as needed) go through the proposals.
3. **Decision.** Approve (promote to Recipe or Core), merge with an existing item, return for
   changes, or reject. The decision and the reason go into the registry (`meta.status`,
   `meta.decision`).
4. **Adoption.** An approved item gets an AI description and an implementation status per
   platform, and becomes part of the foundation.

Core rule 6 says promotion needs **evidence (3+ uses) and approval**. The count is a signal for
the review, not a decision (plan 005).

## The problem

- **The review is assumed everywhere and defined nowhere.** 005 says "the review decides", 013
  says "the registry never promotes", 006 registers Local items, and none of them says when the
  review meets, what is on its agenda or how a decision is written down.
- **Inputs come from several places.** Proposals from the contribution skill, harvested production
  components (005 "The production path", 017), Local items from `minis-app` (006), and the success
  metrics (017 measure 5).
- **The registry doesn't exist yet**, but the first review is planned for February. The process
  has to work before `registry.json` does.

## Constraints

- **Nobody guards the gate.** Building Local never waits for the review; the review only decides
  promotion, merging, retirement.
- **Every decision is traceable:** date, outcome, reason, who decided. "Approved in the meeting"
  without a record doesn't count.
- **The review is short.** One hour a month; if the agenda doesn't fit, items wait a month rather
  than the meeting growing.
- **Production conventions win on behaviour** (core rule 7): approving a production pattern means
  Mini*S takes over its decisions (tokens, Figma, description), not that production rewrites it.

## Approach

**Cadence.** Monthly, same week every month. The week before, the plan 017 script runs: harvest,
usage counts, the three success metrics.

**Agenda, in this order:**

1. **Metrics** (5 min): token share, new items without a registry entry, items promoted. Trend
   since last month.
2. **Proposals** (`status: proposed`), oldest first. Each one is presented with its evidence:
   uses (3+ for promotion), where it is used, which tokens it uses, near matches in the registry.
3. **Harvest from production**: new components since last month, flagged as candidates. Most
   just get registered as they are (decision 7); a few become proposals.
4. **Retirements and merges**: items with no use, or duplicates found by the harvest.
5. **Open exceptions**: rule breaks recorded "openly in the registry" (plan 020) since the last
   review.

**Outcomes** (`meta.decision.outcome`, plan 013): `approved` (with the new tier), `merged` (into
which item), `returned` (what has to change), `rejected` (why), `retired`. `meta.status` follows
the outcome.

**Before the registry exists:** each review writes a dated Markdown record
(`docs/reviews/YYYY-MM.md`: attendees, metrics, each item with outcome and reason). When
`registry.json` lands, the records are copied into `meta.decision` and the files stay as history.

**After an approval:** Mini*S adds or extends tokens, creates or updates the Figma component and
its docs card (`minis-figma-docs`), writes the registry description, sets the implementation
status per platform and logs the change in every changelog (plan 018).

**Rejected:**

- **Automatic promotion at 3 uses.** The count says "look at this", not "this is good".
- **Approval by chat or issue comment between reviews.** No shared record and no group decision.
  An urgent case can be decided by the DS owner and the lead developer, then confirmed at the next
  review.
- **A review per component as it appears.** Too many meetings; patterns only show after a month
  of use anyway.

## Phases

- [ ] **Phase 0 — Agree the process** in plan 020's walkthrough: cadence, agenda, outcomes,
      tie-break, who prepares the agenda.
- [ ] **Phase 1 — Record format.** The `docs/reviews/` template, and the `status` and `decision`
      fields in plan 013's schema.
- [ ] **Phase 2 — First review (pilot)**, February 2027 per the brief, with the Markdown record.
      Adjust the agenda by what the group actually needed.
- [ ] **Phase 3 — Move to the registry** once `registry.json` exists: decisions written to
      `meta.decision`, the contribution skill writes `proposed`, CI checks the fields (013
      phase 2).
- [ ] **Phase 4 — After three reviews**, check the time budget and whether proposals wait too long.

## Dependencies

- **020** — the approval group and the tie-break rule.
- **013** — `meta.status` and `meta.decision` (added 2026-11-13).
- **005** — proposals and harvested production items are the review's input; the skill never
  promotes.
- **006** — Local items registered from `minis-app`.
- **017** — the harvest and the success metrics (measure 5) run before each review.
- **018** — changelog entries after an approval.

## Open questions

1. **Who prepares the agenda**: the DS owner alone, or does the script's output go straight to
   the group?
2. **Tie-break** (shared with plan 020 question 2).
3. **Is a quorum needed?** Can the review decide without the lead developer when an item touches
   production?
4. **Where are proposals discussed between reviews**: a GitHub issue per proposal (ties to plan
   008), or only at the review?
5. **Do retirements need a deprecation period** in production, and does it go through the
   Stylelint rename map (plan 011, 017 open question 8)?
