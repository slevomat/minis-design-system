# Docs kit reference

File: `mfiAVMWkxiBRGnegjqLMNW` (MiniS DS). Everything here is internal and hidden from
publishing. IDs were verified on 2026-11-12. If one fails to resolve, look the item up by name
and update this file.

## Template and helpers (page `.helpers`, `160:1259`)

| Node | ID | Notes |
|---|---|---|
| `Docs card — template` | `6119:153` | **Clone this stack.** An auto-layout wrapper, no fill, gap `gap-stack`. Children: card `main` (`6113:142`, sections `header`, `overview`, `usage`, `construction`, `examples`, `status`) and cards `changelog`, `roadmap`, `dev-notes`, each wrapping one `content` frame |
| `.link` | `3403:2913` | Storybook pill. Its label font is SF Mono, which the scripting runtime **can't load**, so you can't change the label by script. Always use the template's pill (`6113:150`, says `Storybook`). The URL is the label text's `hyperlink`; set it every time (see SKILL.md → "Storybook link") |
| `.badge` | `169:5318` | `type` = `info · warning · black`. WIP = warning |
| `.message` | `160:2967` | Callout box. `type` = `info · warning`, `Size` = `large · small` |

## Variables (collection `.Helpers`, `VariableCollectionId:166:8213`, modes `default` / `inverted`)

| Variable | ID | Value | Use |
|---|---|---|---|
| `docs/colors/surface` | `VariableID:166:8214` | #FBF8F3 | Card fill |
| `docs/colors/background` | `VariableID:166:8215` | #EAEAEA | Canvas behind cards, table header rows |
| `docs/colors/text` | `VariableID:169:1245` | #000 | Body text, icons |
| `docs/colors/heading` | `VariableID:379:5815` | #172B4D | Section labels, titles, column titles |
| `docs/colors/faded` | `VariableID:266:191` | → text | Secondary text |
| `docs/colors/divider` | `VariableID:6111:142` | #D9CDB9 | Section divider strokes |
| `docs/colors/info` | `VariableID:6111:143` | #D2F1FF | Info badge/message |
| `docs/colors/warning` | `VariableID:6111:144` | #EFF69D | WIP badge, warning message |
| `docs/colors/link-surface` | `VariableID:6111:145` | #FFF | `.link` pill |
| `docs/dimensioning/border-radius` | `VariableID:166:8219` | 24 | Card corners (every card in the stack) |
| `docs/dimensioning/gap-stack` | `VariableID:6119:142` | 8 | Gap between stacked cards. 0 = cards touch |
| `docs/dimensioning/padding-y` | `VariableID:6111:146` | 34 | Card top/bottom padding |
| `docs/dimensioning/padding-x` | `VariableID:6111:147` | 21 | Card left/right padding |
| `docs/dimensioning/gap-section` | `VariableID:6111:148` | 36 | Between card sections |
| `docs/dimensioning/gap-block` | `VariableID:6111:149` | 18 | Inside a section; between columns |
| `docs/dimensioning/gap-list` | `VariableID:6111:150` | 7 | Column title → its list |
| `docs/dimensioning/gap-row` | `VariableID:6111:151` | 32 | Changelog date → entry |
| `docs/dimensioning/card-width` | `VariableID:6111:152` | 1104 | Standard card width (specimens and reports may be wider) |
| `docs/dimensioning/divider-width` | `VariableID:6111:153` | 1 | Divider stroke |

Text styles don't carry colour, so **bind the fill on every text node**: heading colour for labels
and titles, text colour for everything else.

## Text styles

| Style | ID | Spec | Use |
|---|---|---|---|
| `.docs/heading-1` | `S:78dcfdc152d432dfb34fc5c90f4f7ed38b9bd197,` | Inter Medium 80/88 | Card title |
| `.docs/heading-2` | `S:1594b9cb04ac5fd398b02afb55758e4062ec9aa3,` | Inter Medium 50/64 | Report title |
| `.docs/heading-3` | `S:ab956247a779047d8f131ffc46b9d99cbbb2d16f,` | Inter Bold 28/42 | Specimen group heading |
| `.docs/description` | `S:fdf5339166966b1297958dd42b5353d765524b8b,` | Inter Medium 20/28 | Description, body, changelog dates and entries |
| `.docs/section-label` | `S:3985ea5c34109601ea941e608b0f76c6fa907eb3,` | Inter Bold 18/24, +10 %, UPPER | Fixed sections |
| `.docs/section-title` | `S:dce7fd013f58bf405f43f3aa9b6d6f1927b5500c,` | Inter Bold 18/24 | Content sections |
| `.docs/column-title` | `S:ac2e410ade5168b77baa10ccbdd0453b6f8fbbc7,` | Inter Bold 15/22 | Overview column heads |
| `.docs/small` | `S:729639c8277d1449bc2dc0357227f63a987938a2,` | Inter Medium 15/22 | Column lists, footnotes, "for <Topic>" |
| `.docs/annotation` | `S:0ade1f191cd335d040dfcd979a98ca8b6de277bd,` | PT Mono 14/16 | Captions under instances |

## Clone recipe

Text node names inside the template, by section:

| Section | Text nodes |
|---|---|
| `header` | `title`, `description` (+ `.link` instance) |
| `overview` | `label`, `columns` › `column` › `column-title` + `column-items`, `footnote` |
| `usage`, `construction`, `examples` | `title`, `body` (not in examples), `specimens` › `specimen` › `annotation` + `instance goes here` |
| `status` | `.badge` instance, `body` |
| card `changelog` › `content` | `label`, `entry` › `date` + `changes` |
| cards `roadmap`, `dev-notes` › `content` | `label`, `items` |

The first six sections are children of the `main` card. The last three are separate cards, children of the stack.

```js
const tpl = await figma.getNodeByIdAsync('6119:153'); // the whole stack
const page = await figma.getNodeByIdAsync('<TARGET_PAGE_ID>');
await figma.setCurrentPageAsync(page);
for (const f of [['Inter','Bold'],['Inter','Medium'],['PT Mono','Regular']]) await figma.loadFontAsync({family:f[0], style:f[1]});
const card = tpl.clone();
page.appendChild(card);
card.name = '<Component> docs';
card.x = /* left of the component, 120 px gap */; card.y = /* aligned to the page's top content */;
const main = card.children.find(c => c.name === 'main');
// header…status live in `main`; changelog/roadmap/dev-notes are sibling cards, each holding `content`
const sec = name => main.children.find(c => c.name === name) || card.children.find(c => c.name === name)?.children.find(c => c.name === 'content');
const text = (root, name) => root.findOne(n => n.type === 'TEXT' && n.name === name);
// Always reset list options after replacing characters: the old bullets don't follow the new text.
const setT = (t, chars, bullets) => { t.characters = chars; t.setRangeListOptions(0, chars.length, {type: bullets ? 'UNORDERED' : 'NONE'}); };
setT(text(sec('header'), 'title'), 'ActionRow');
setT(text(sec('header'), 'description'), 'One sentence.');
// Storybook link — the clone still carries the template's REPLACE-ME URL:
sec('header').findOne(n => n.type === 'INSTANCE' && n.name === '.link').findOne(n => n.type === 'TEXT')
  .hyperlink = {type:'URL', value:'https://slevomat.github.io/minis-design-system/?path=/docs/<story-id>--docs'};
// Remove unused sections: sec('status').remove(); a whole follow-up card: card.children.find(c => c.name === 'roadmap').remove()
return { cardId: card.id };
```

- **Changelog rows:** duplicate the `entry` frame (`clone()` + `insertChild`). Set `date` and
  `changes` in each row. Use bullets only when a date has more than one change.
- **Specimens:** put every instance on a **specimen surface**, not straight onto the cream card.
  Light or alpha components (separators, ghost buttons, faded surfaces) vanish on cream. Use an
  auto-layout frame named `specimen-surface` with fill bound to `Color/Surface/primary`
  (`VariableID:264:1777`) and side padding bound to `linear/sp-linear-4`. For a dark-mode
  specimen, call `setExplicitVariableModeForCollection` with the Foundation collection's `dark mode`
  on that frame. These are product tokens, which is allowed: inside a specimen, they are the
  content.
- Overview columns: duplicate or delete `column` frames in `overview/columns`.
- Specimens: replace each `instance goes here` frame with a real instance of the component and
  set its `annotation` text.
- Every frame you add inside the card needs `clipsContent = false`, or the dividers (0 px tall
  lines) get clipped and disappear.
- **Replacing text inherits the first character's overrides.** If an old text started with a bold
  word, the whole new text turns bold. Re-applying the same style does **not** clear it. Reset
  the font first (`setRangeFontName(0, len, {family:'Inter', style:'Medium'})`), then set the style
  again.

## Migrating an old card (built before the kit)

Older cards are one frame with hand-styled text, a detached `.button` pill, and sections named
`colors/blue` / `colors/neutral`. Migrate them in place, keeping the card's node ID as the
stack's `main`:

1. **Bind the card shell:** padding to `padding-y` / `padding-x`, gap to `gap-section`, corners
   to `border-radius`.
2. **Bind inner spacing:** gaps of 18/16 → `gap-block`, 7 → `gap-list`, horizontal 32 →
   `gap-row`. Set `clipsContent = false` on every frame.
3. **Map unstyled text by font:**
   - Inter Bold 18 → `section-label` for fixed sections, `section-title` for the rest
   - Inter Bold 15 → `column-title`
   - Inter 15 → `small`
   - PT Mono → `annotation`

   Then bind every text fill (#172B4D → `heading`, everything else → `text`) and divider strokes.
4. **Swap the pill:** replace the `.button` frame (or an old `.link`) with a clone of the
   template pill, then set its link.
5. **Split the stack:** wrap the card in a stack. Move each direct child whose first text is
   Changelog / Roadmap / Dev notes into its own card, and delete that section's divider line.
6. **Keep the column clear:** the stack grows by the gaps. Move nodes below it in the same column
   down by the difference.
7. **Then proofread** (see SKILL.md → Voice). Fill empty Dev notes from the repo, and delete an
   empty Roadmap card.

## Audit snippet (run before reporting done)

```js
const card = await figma.getNodeByIdAsync('<STACK_ID>'); // the wrapper, so all four cards are checked
const inInstance = n => { for (let p = n.parent; p && p !== card; p = p.parent) if (p.type === 'INSTANCE') return true; return false; };
const issues = [];
for (const n of card.findAll(() => true)) {
  if (inInstance(n) || n.type === 'INSTANCE') continue;
  if (n.type === 'TEXT' && !n.textStyleId) issues.push('unstyled text: ' + n.characters.slice(0, 30));
  for (const prop of ['fills', 'strokes']) if (Array.isArray(n[prop])) for (const p of n[prop])
    if (p.type === 'SOLID' && !(p.boundVariables && p.boundVariables.color)) issues.push(`unbound ${prop}: ${n.name}`);
  if (n.type === 'TEXT' && /instance goes here|ComponentName|One or two sentences|Footnote for a constraint|Next thing planned/.test(n.characters)) issues.push('placeholder copy: ' + n.name);
  if (n.name === 'instance goes here') issues.push('placeholder box left');
}
const pillText = card.findOne(n => n.type === 'INSTANCE' && n.name === '.link')?.findOne(n => n.type === 'TEXT');
const url = pillText && pillText.hyperlink && pillText.hyperlink.value;
if (!pillText) issues.push('no Storybook pill');
else if (pillText.characters !== 'Storybook') issues.push('pill label is not Storybook');
else if (!url || url.includes('REPLACE-ME')) issues.push('Storybook link not set');
else issues.push('CHECK by hand that this link is for THIS card: ' + url);
return issues;
```

Specimen bodies are the exception: there, product tokens and styles are the content and are
expected.
