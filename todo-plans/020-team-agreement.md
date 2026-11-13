---
id: 020
title: Team agreement — the commitment, the approval group and where Mini*S lives in the Nette repo
status: draft
created: 2026-11-13
updated: 2026-11-13
owner: Lexislav
---

# 020 — Team agreement: the commitment, the approval group and where Mini*S lives in the Nette repo

> **Gap G1 in plan 003, turned into a plan** (2026-11-13). Rollout phase 0 ("Agreement",
> November 2026). It gates plans 011–014 and the review process (021), so it comes first.

## Context

The brief's section "Společná odpovědnost" says the redefinition doesn't work without a
commitment from everyone who builds Slevomat UI: designers, developers and product. In exchange
for building without approval, the team commits to:

- keep the core rules even in a hurry, and handle exceptions openly in the registry, not quietly
  in code;
- search the registry first and report gaps, not work around them;
- register everything new, even if it serves one feature;
- take part in the monthly registry review;
- treat a failed CI check as a bug to fix, not an obstacle to get around.

Mini*S commits in return to making the rules the easiest path: tokens, recipes, skills and the
registry kept current and at hand.

**What exists already** (plan 003, "Agreement so far"): on 2026-11-02 the Nette lead developer
accepted the redefinition, the updated colours are on Nette master, and Nette's Stylelint already
guides AI in migrating variables. So this plan isn't about getting a first yes. It's about
writing the agreement down, naming people, and closing the decisions everything else waits for.
Without it, Mini*S falls back to "documentation nobody reads".

## The problem

- **Nothing is written down.** The acceptance of 2026-11-02 lives in a chat handoff, not in a
  document either side can point to.
- **No approval group is named.** The brief says "DS owner + lead developer + a design
  representative + product as needed", and that who exactly, and how a tie is broken, "zbývá
  potvrdit". Plans 005, 013 and 021 all assume this group exists.
- **No place in the Nette repo.** Plans 010, 011, 012 and 014 each need to know where Mini*S files
  go in production (`doc/ai/skills/`? a folder of its own? a package?) and who merges them.
- **Eight decisions are open** (plan 003, "Decisions waiting to be closed"). Decisions 1–3 block
  most of the rest: heritage as a legacy layer (1), token-only fallbacks (2), `tokens.css` names
  as canonical (3).
- **The owner is an external contractor.** The agreement has to say what Mini*S delivers and what
  production pulls in, so that delivery and integration are clearly separated.

## Constraints

- **Production conventions win** on how things land in the Nette repo (plans 004, 017).
- **The agreement is short.** One page people can actually sign up to; detail stays in the plans.
- **Decisions are recorded where they unblock work:** in plan 003's decision table **and** in the
  plan each one unblocks (CLAUDE.md, "Answers to a plan's open questions go back into the plan").
- **Nothing is assumed agreed** because it's in the brief. The brief is the proposal.

## Approach

1. **A one-page agreement** in Czech, in this repo (proposal: `docs/agreement.md`, linked from the
   brief and from plan 003). It holds the team commitment above, Mini*S's commitment back, the
   approval group by name, the review cadence (plan 021), and the split between what Mini*S
   delivers and what production integrates.
2. **A decision sheet** for the meeting: decisions 1–3 (then 4, 5, 8) with the options, a
   recommendation and what each one unblocks, taken from plan 003.
3. **One walkthrough meeting** with the lead developer, a design representative and product.
   Inputs: the brief, plan 003, the production path (plan 005) and its five questions for the
   production developer.
4. **Record the outcome** in the agreement, in plan 003's decision table, and in each unblocked
   plan. Then turn the next gaps into plans in plan 003's order.

**Rejected:**

- **Treating 2026-11-02 as enough.** It's an acceptance of direction, not of names, cadence or
  where files go.
- **Deciding everything in one meeting.** Decisions 4, 5 and 8 can wait; 1–3 can't.
- **A long contract-style document.** Nobody rereads it; the plans carry the detail.

## Phases

- [ ] **Phase 0 — Prepare.** Draft the one-page agreement and the decision sheet; collect the
      production developer's answers to the five questions in plan 003 ("Production → Mini*S").
- [ ] **Phase 1 — Walkthrough.** Agree the commitment, name the approval group and its tie-break
      rule, agree where Mini*S lives in the Nette repo, close decisions 1–3.
- [ ] **Phase 2 — Record.** Update the agreement, plan 003 and every unblocked plan (001, 011,
      012, 013, 014, 010) in one plans-only commit.
- [ ] **Phase 3 — First review on the calendar** (plan 021), with the named group.
- [ ] **Phase 4 — Revisit after three reviews.** Is the commitment kept? What needs to change?

## Dependencies

- **003** — decision table and gap order; this plan closes G1.
- **021** — the review process the agreement names; can't run without the group named here.
- **005** — the production path and its questions are inputs to phase 0.
- **010, 011, 012, 013, 014** — each waits for "where Mini*S lives" or for decisions 1–3.
- **001** — decision 1 (heritage as a legacy layer) vs 001's phase 5.

## Open questions

1. **Who signs off the agreement** on Slevomat's side? Nothing in the repo says (plan 003
   question 1).
2. **Who is in the approval group**, and how is a tie broken: the DS owner decides, majority, or
   the lead developer has a veto on production matters?
3. **Where does Mini*S live in the Nette repo**, and who merges Mini*S-made files there?
4. **Which language** for the agreement: Czech only, or Czech with an English copy for this repo?
5. **What does Mini*S owe if a rule breaks production work?** The brief's answer is "exceptions
   openly in the registry". Is that enough, or does it need an escalation path?
