# page-to-figma

Rebuild a live slevomat.cz page in the Mini*S Figma file from Mini*S components and variables,
with cards beside it listing what Mini*S is missing and where it conflicts with production.

```text
/minis:page-to-figma /                 full run: rebuild + findings
/minis:page-to-figma /cestovani skip-audit   rebuild only, to design on
```

**What you get**

- On the **Production rebuilds** page in MiniS DS: one frame per width (1280, 768, 375). Each is
  built from library instances, with every value bound to a Mini*S variable and the Layout mode
  set per width. Copy a frame into your own file to work on it.
- Full run only:
  - a findings stack beside the frames (Summary, Missing in Mini*S, Conflicts);
  - numbered markers next to the blocks they describe;
  - `findings.md` in the run folder.
- In the run folder (`audits/page-to-figma/<date>-<page>/` in the Mini*S repo): `mapping.md`, with
  the coverage counts and the block → component table.

**What you need:** Claude in Chrome connected (the in-app browser can't open slevomat.cz) and the
Figma MCP signed in with edit access to MiniS DS.

**Limits:**
- Images are placeholders.
- Kensington text can't be set by script, so a designer applies `Brand/*` styles by hand where the
  layer says so.
- Public pages only.
- One page type has a ready build body so far: the homepage. The skill writes a new body for other page types.

The method and its decisions are in plan 031 (`todo-plans/031-production-page-to-figma.md`).
