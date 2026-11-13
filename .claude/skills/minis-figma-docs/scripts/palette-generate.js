// palette-generate.js — build a swatch overview for one colour collection, from the docs kit only.
// Paste into use_figma with CONFIG filled in. Creates ONE new card; to update it later run
// palette-refresh.js on it (same structure the refresh script expects: hex label inside the swatch).
//
// Shape (SKILL.md → "Palette / swatch pages"): Specimen card = cream shell + header (Storybook pill,
// title, description) + one section per variable group (divider, `.docs/heading-3`), and inside each
// section one row per mode (`.docs/section-title` with the mode name) of fixed-size swatches.
// Swatch fills are bound to the product variable; the row's explicit mode picks which value shows.

// ── CONFIG ─────────────────────────────────────────────────────────────────────────────
const PAGE_ID = '<page id>';
const COLLECTION = 'Theme';
const TITLE = 'Theme colors';
const PARAS = ['One or two sentences.'];
const STORYBOOK = 'https://slevomat.github.io/minis-design-system/?path=/story/design-tokens--colors';
const GROUP_DEPTH = 2;            // path segments that name a section: Theme/Interaction/primary → "Theme/Interaction"
const X = 0, Y = 0;               // canvas position (left of the page's other cards, 120 px gap)

// ── KIT (kit.md) ───────────────────────────────────────────────────────────────────────
const V = { surface: 'VariableID:166:8214', background: 'VariableID:166:8215', text: 'VariableID:169:1245',
  heading: 'VariableID:379:5815', faded: 'VariableID:266:191', divider: 'VariableID:6111:142', dw: 'VariableID:6111:153',
  radius: 'VariableID:166:8219', padY: 'VariableID:6111:146', padX: 'VariableID:6111:147', gapSection: 'VariableID:6111:148',
  gapBlock: 'VariableID:6111:149', gapList: 'VariableID:6111:150', width: 'VariableID:6111:152' };
const S = { h1: 'S:78dcfdc152d432dfb34fc5c90f4f7ed38b9bd197,', h3: 'S:ab956247a779047d8f131ffc46b9d99cbbb2d16f,',
  desc: 'S:fdf5339166966b1297958dd42b5353d765524b8b,', secTitle: 'S:dce7fd013f58bf405f43f3aa9b6d6f1927b5500c,',
  ann: 'S:0ade1f191cd335d040dfcd979a98ca8b6de277bd,' };
const HELPERS = 'VariableCollectionId:166:8213', INVERTED = '263:0', DEFAULT = '166:2', PILL = '6113:150';
const SWATCH_W = 342, SWATCH_H = 210; // 3 per row in a 1104 card: (1104 − 2·21 − 2·18) / 3

// ── setup ──────────────────────────────────────────────────────────────────────────────
const page = await figma.getNodeByIdAsync(PAGE_ID); await figma.setCurrentPageAsync(page);
// load each kit style's own font (the mono one is Google Sans Code; never hard-code it)
for (const id of Object.values(S)) await figma.loadFontAsync((await figma.getStyleByIdAsync(id)).fontName);
const kv = {}; for (const k in V) kv[k] = await figma.variables.getVariableByIdAsync(V[k]);
const helpers = await figma.variables.getVariableCollectionByIdAsync(HELPERS);
const cols = await figma.variables.getLocalVariableCollectionsAsync(); const colById = Object.fromEntries(cols.map(c => [c.id, c]));
const coll = cols.find(c => c.name === COLLECTION);
const getV = id => figma.variables.getVariableByIdAsync(id);
const valIn = (v, modeId) => v.valuesByMode[v.variableCollectionId === coll.id ? modeId : colById[v.variableCollectionId].defaultModeId];
const resolve = async (v, modeId) => { const x = valIn(v, modeId); return x && x.type === 'VARIABLE_ALIAS' ? resolve(await getV(x.id), modeId) : x; };
const endVar = async (v, modeId) => { let e = v; while (valIn(e, modeId) && valIn(e, modeId).type === 'VARIABLE_ALIAS') e = await getV(valIn(e, modeId).id); return e === v ? null : e; };
const paint = v => figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', v);
const hex = c => '#' + [c.r, c.g, c.b].map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join('').toUpperCase();
const lin = c => c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
const oklch = c => { const r = lin(c.r), g = lin(c.g), b = lin(c.b);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b), m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b), s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s, A = 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s, B = 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s;
  const C = Math.sqrt(A * A + B * B); let H = Math.atan2(B, A) * 180 / Math.PI; if (H < 0) H += 360;
  return `oklch(${Math.round(L * 100)}% ${C.toFixed(3)} ${C < 0.0005 ? 0 : Math.round(H)}${c.a < 1 ? ' / ' + +c.a.toFixed(2) : ''})`; };
// labels flip to the inverted (cream) mode below 0.18 luminance: where black and cream text give equal contrast
const lum = c => { const a = c.a === undefined ? 1 : c.a, cream = [0.984, 0.973, 0.953]; const [r, g, b] = [c.r, c.g, c.b].map((x, i) => lin(x * a + cream[i] * (1 - a))); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const frame = (dir, name, gap) => { const f = figma.createAutoLayout(dir, { name, fills: [], clipsContent: false }); if (gap) f.setBoundVariable('itemSpacing', kv[gap]); return f; };
const text = async (parent, chars, sid, v, name) => { const t = figma.createText(); parent.appendChild(t); t.characters = chars; await t.setTextStyleIdAsync(sid); t.fills = [paint(kv[v])]; if (name) t.name = name; return t; };
const fill = t => { t.layoutSizingHorizontal = 'FILL'; t.textAutoResize = 'HEIGHT'; };

// ── shell + header ─────────────────────────────────────────────────────────────────────
const card = frame('VERTICAL', TITLE, 'gapSection'); page.appendChild(card); card.x = X; card.y = Y;
card.fills = [paint(kv.surface)];
for (const k of ['topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius']) card.setBoundVariable(k, kv.radius);
for (const [k, v] of [['paddingTop', 'padY'], ['paddingBottom', 'padY'], ['paddingLeft', 'padX'], ['paddingRight', 'padX']]) card.setBoundVariable(k, kv[v]);
card.resize(1104, 100); card.setBoundVariable('width', kv.width); card.primaryAxisSizingMode = 'AUTO';
const header = frame('VERTICAL', 'header', 'gapBlock'); card.appendChild(header); header.layoutSizingHorizontal = 'FILL';
const pill = (await figma.getNodeByIdAsync(PILL)).clone(); header.appendChild(pill);
pill.findOne(n => n.type === 'TEXT').hyperlink = { type: 'URL', value: STORYBOOK };
fill(await text(header, TITLE, S.h1, 'heading', 'title'));
for (const p of PARAS) fill(await text(header, p, S.desc, 'text', 'description'));

// ── sections ───────────────────────────────────────────────────────────────────────────
const vars = []; for (const id of coll.variableIds) { const v = await getV(id); if (v.resolvedType === 'COLOR' && !v.hiddenFromPublishing) vars.push(v); }
const groups = new Map(); for (const v of vars) { const g = v.name.split('/').slice(0, GROUP_DEPTH).join('/'); if (!groups.has(g)) groups.set(g, []); groups.get(g).push(v); }
let count = 0;
for (const [g, list] of groups) {
  const sec = frame('VERTICAL', g, 'gapBlock'); card.appendChild(sec); sec.layoutSizingHorizontal = 'FILL';
  const line = figma.createLine(); sec.appendChild(line); line.name = 'divider'; line.layoutSizingHorizontal = 'FILL';
  line.strokes = [paint(kv.divider)]; line.setBoundVariable('strokeWeight', kv.dw);
  await text(sec, g, S.h3, 'heading', 'title');
  for (const mode of coll.modes) {
    if (coll.modes.length > 1) await text(sec, mode.name, S.secTitle, 'heading', 'mode');
    const grid = frame('HORIZONTAL', 'swatches · ' + mode.name, 'gapBlock'); sec.appendChild(grid);
    grid.layoutWrap = 'WRAP'; grid.setBoundVariable('counterAxisSpacing', kv.gapBlock); grid.layoutSizingHorizontal = 'FILL';
    grid.setExplicitVariableModeForCollection(coll, mode.modeId);
    for (const v of list) {
      const c = await resolve(v, mode.modeId); if (!c || c.r === undefined) continue;
      const sw = frame('VERTICAL', v.name.slice(g.length + 1) || v.name.split('/').pop(), 'gapList'); grid.appendChild(sw);
      sw.resize(SWATCH_W, SWATCH_H); sw.layoutSizingHorizontal = 'FIXED'; sw.layoutSizingVertical = 'FIXED';
      sw.fills = [paint(v)]; sw.paddingTop = sw.paddingBottom = sw.paddingLeft = sw.paddingRight = 24; // swatch padding is specimen geometry
      sw.cornerRadius = 16;
      sw.setExplicitVariableModeForCollection(helpers, lum(c) < 0.18 ? INVERTED : DEFAULT);
      await text(sw, v.name.slice(g.length + 1) || v.name.split('/').pop(), S.desc, 'text', 'name');
      const e = await endVar(v, mode.modeId);
      if (e) { const ref = frame('HORIZONTAL', 'Reference Badge'); sw.appendChild(ref); ref.fills = [paint(kv.background)];
        ref.setExplicitVariableModeForCollection(helpers, DEFAULT); ref.paddingLeft = ref.paddingRight = 10; ref.paddingTop = ref.paddingBottom = 6; ref.cornerRadius = 6;
        await text(ref, '→ ' + e.name, S.ann, 'text'); }
      const spacer = frame('VERTICAL', 'spacer'); sw.appendChild(spacer); spacer.layoutSizingVertical = 'FILL';
      await text(sw, hex(c), S.ann, 'text', 'hex');
      await text(sw, `rgba(${[c.r, c.g, c.b].map(y => Math.round(y * 255)).join(', ')}, ${+c.a.toFixed(2)})`, S.ann, 'text', 'rgba');
      await text(sw, oklch(c), S.ann, 'text', 'oklch');
      count++;
    }
  }
}
return { card: card.id, sections: groups.size, swatches: count };
