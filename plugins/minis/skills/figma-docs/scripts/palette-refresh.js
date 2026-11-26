// palette-refresh.js — migrate or refresh one colour swatch overview in place.
// Paste into use_figma with CONFIG filled in. One overview frame per call.
// Safe to re-run: it rebinds, restyles and refreshes; it never creates a second pill or row.
//
// What it does (see SKILL.md → "Palette / swatch pages"):
//   1. Chrome → docs kit: shell fill/radius, dividers, legend chips, header (pill + badge row,
//      title, description), every text node gets a `.docs/*` style and a `docs/*` fill.
//   2. Swatches stay product tokens: an unbound swatch is bound to the variable whose path matches
//      its name and its ancestors' names (ties broken by colour). Unmatched ones are reported.
//   3. Printed values (hex / rgba / oklch / → alias) are recomputed from the variable whenever the
//      printed hex differs. Figma text can't bind to a colour value, so this is the only refresh.
//   4. Labels on a dark swatch use the `.Helpers` `inverted` mode instead of a hard-coded white.

// ── CONFIG ─────────────────────────────────────────────────────────────────────────────
const PAGE_ID = '<page id>';
const TOP_ID = '<overview frame id>';
const COLLECTION = 'Foundation';            // collection the swatches show
const STORYBOOK = 'https://slevomat.github.io/minis-design-system/?path=/story/design-tokens--colors';
const TITLE = 'Foundation colors';
const PARAS = ['One or two sentences.'];   // header paragraphs, replace the old ones
const BADGE_SOURCE = null;                  // id of a `.badge` instance to clone over a hand-made "Badge" frame

// ── KIT (kit.md) ───────────────────────────────────────────────────────────────────────
const V = { surface: 'VariableID:166:8214', background: 'VariableID:166:8215', text: 'VariableID:169:1245',
  heading: 'VariableID:379:5815', faded: 'VariableID:266:191', divider: 'VariableID:6111:142', dw: 'VariableID:6111:153',
  info: 'VariableID:6111:143', radius: 'VariableID:166:8219', gapBlock: 'VariableID:6111:149' };
const S = { h1: 'S:78dcfdc152d432dfb34fc5c90f4f7ed38b9bd197,', h3: 'S:ab956247a779047d8f131ffc46b9d99cbbb2d16f,',
  desc: 'S:fdf5339166966b1297958dd42b5353d765524b8b,', secTitle: 'S:dce7fd013f58bf405f43f3aa9b6d6f1927b5500c,',
  col: 'S:ac2e410ade5168b77baa10ccbdd0453b6f8fbbc7,', small: 'S:729639c8277d1449bc2dc0357227f63a987938a2,',
  ann: 'S:0ade1f191cd335d040dfcd979a98ca8b6de277bd,' };
const HELPERS = 'VariableCollectionId:166:8213', INVERTED = '263:0', DEFAULT = '166:2', PILL = '6113:150';

// ── setup ──────────────────────────────────────────────────────────────────────────────
const page = await figma.getNodeByIdAsync(PAGE_ID); await figma.setCurrentPageAsync(page);
const top = await figma.getNodeByIdAsync(TOP_ID);
const kv = {}; for (const k in V) kv[k] = await figma.variables.getVariableByIdAsync(V[k]);
const helpers = await figma.variables.getVariableCollectionByIdAsync(HELPERS);
const cols = await figma.variables.getLocalVariableCollectionsAsync();
const colById = Object.fromEntries(cols.map(c => [c.id, c]));
const target = cols.find(c => c.name === COLLECTION);
const vcache = {}; const getV = async id => vcache[id] || (vcache[id] = await figma.variables.getVariableByIdAsync(id));
const targetVars = []; for (const id of target.variableIds) { const v = await getV(id); if (v.resolvedType === 'COLOR') targetVars.push(v); }
const rawVal = v => v.valuesByMode[colById[v.variableCollectionId].defaultModeId];
const resolve = async v => { const x = rawVal(v); return x && x.type === 'VARIABLE_ALIAS' ? resolve(await getV(x.id)) : x; };
const fonts = new Set(['Inter|Medium']); // + each kit style's own font (mono = Google Sans Code), never hard-coded
for (const id of Object.values(S)) { const f = (await figma.getStyleByIdAsync(id)).fontName; fonts.add(f.family + '|' + f.style); }
for (const t of top.findAllWithCriteria({ types: ['TEXT'] })) for (const s of t.getStyledTextSegments(['fontName'])) fonts.add(s.fontName.family + '|' + s.fontName.style);
for (const f of fonts) { const [family, style] = f.split('|'); try { await figma.loadFontAsync({ family, style }); } catch (e) {} }

const paint = v => figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', v);
const bindFill = (n, v) => { n.fills = [paint(v)]; };
const isBound = n => Array.isArray(n.fills) && n.fills[0] && n.fills[0].boundVariables && n.fills[0].boundVariables.color;
const inInstance = n => { for (let p = n.parent; p && p !== top; p = p.parent) if (p.type === 'INSTANCE') return true; return false; };
const style = async (t, sid, v) => { const len = t.characters.length; if (len) t.setRangeFontName(0, len, { family: 'Inter', style: 'Medium' }); await t.setTextStyleIdAsync(sid); bindFill(t, v); };
const hex = c => '#' + [c.r, c.g, c.b].map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join('').toUpperCase();
// printed hex: 8 digits (with alpha) when the colour isn't opaque, so a transparent swatch never reads #FFFFFF
const hexA = c => hex(c) + (c.a !== undefined && c.a < 1 ? Math.round(c.a * 255).toString(16).padStart(2, '0').toUpperCase() : '');
// hard-to-see swatch: not opaque, or so close to the cream card (OKLab distance < 0.025: white, grey-95/98,
// blue-99, pale -95 tints) that its edge vanishes. It gets a dashed kit outline; the fill stays the real token.
const okl = ([r, g, b]) => { [r, g, b] = [r, g, b].map(lin); const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b), m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b), s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s, 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s]; };
const CREAM = [0.984, 0.973, 0.953];
const faint = c => { const a = c.a === undefined ? 1 : c.a; if (a < 1) return true; const p = okl([c.r, c.g, c.b]), q = okl(CREAM); return Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]) < 0.025; };
const outline = (sw, c) => { if (faint(c)) { sw.strokes = [paint(kv.divider)]; sw.setBoundVariable('strokeWeight', kv.dw); sw.strokeAlign = 'INSIDE'; sw.dashPattern = [6, 4]; } else { sw.strokes = []; sw.dashPattern = []; } };
const lin = c => c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
const oklch = c => { const r = lin(c.r), g = lin(c.g), b = lin(c.b);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b), m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b), s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s, A = 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s, B = 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s;
  const C = Math.sqrt(A * A + B * B); let H = Math.atan2(B, A) * 180 / Math.PI; if (H < 0) H += 360;
  return `oklch(${Math.round(L * 100)}% ${C.toFixed(3)} ${C < 0.0005 ? 0 : Math.round(H)}${c.a < 1 ? ' / ' + +c.a.toFixed(2) : ''})`; };
// labels flip to the inverted (cream) mode below 0.18 luminance: where black and cream text give equal contrast
const lum = c => { const a = c.a === undefined ? 1 : c.a, cream = [0.984, 0.973, 0.953]; const [r, g, b] = [c.r, c.g, c.b].map((x, i) => lin(x * a + cream[i] * (1 - a))); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const VALUE = /^(#[0-9A-Fa-f]{6}|rgba?\(|oklch\(|→|🔗|Heritage reference)/;
const report = { restyled: 0, bound: [], unmatched: [], refreshed: [], inverted: 0 };

// ── 1. shell ───────────────────────────────────────────────────────────────────────────
bindFill(top, kv.surface);
for (const k of ['topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius']) top.setBoundVariable(k, kv.radius);

// ── 2. header ──────────────────────────────────────────────────────────────────────────
const header = top.children.find(c => c.name === 'Header');
const htexts = header.findAll(n => n.type === 'TEXT' && !inInstance(n) && !(n.parent && n.parent.name === 'Badge'));
const title = htexts.find(t => t.fontSize === 80);
title.characters = TITLE; await style(title, S.h1, kv.heading);
let paras = htexts.filter(t => t !== title);
while (paras.length < PARAS.length) { const c = paras[paras.length - 1].clone(); paras[paras.length - 1].parent.appendChild(c); paras.push(c); }
for (let i = 0; i < paras.length; i++) { if (i >= PARAS.length) { paras[i].remove(); continue; }
  paras[i].characters = PARAS[i]; paras[i].setRangeListOptions(0, PARAS[i].length, { type: 'NONE' }); await style(paras[i], S.desc, kv.text); }
const handBadge = header.findOne(n => n.type === 'FRAME' && n.name === 'Badge');
if (handBadge && BADGE_SOURCE) { const src = await figma.getNodeByIdAsync(BADGE_SOURCE); const b = src.clone(); handBadge.parent.insertChild(handBadge.parent.children.indexOf(handBadge), b); handBadge.remove(); }
let pill = header.findOne(n => n.type === 'INSTANCE' && n.name === '.link');
if (!pill) {
  const badge = header.findOne(n => n.type === 'INSTANCE' && n.name === '.badge');
  const row = figma.createAutoLayout('HORIZONTAL', { name: 'pills', fills: [], clipsContent: false, counterAxisAlignItems: 'CENTER' });
  row.setBoundVariable('itemSpacing', kv.gapBlock);
  const host = badge ? badge.parent : header; host.insertChild(badge ? host.children.indexOf(badge) : 0, row);
  pill = (await figma.getNodeByIdAsync(PILL)).clone(); row.appendChild(pill); if (badge) row.appendChild(badge);
}
pill.findOne(n => n.type === 'TEXT').hyperlink = { type: 'URL', value: STORYBOOK };

// ── 3. swatches: find, bind, refresh ───────────────────────────────────────────────────
const swatchFrames = new Set();
for (const t of top.findAll(n => n.type === 'TEXT' && /^#[0-9A-Fa-f]{6}/.test(n.characters) && !inInstance(n))) {
  const box = t.parent; const rect = box.children.find(c => c.type === 'RECTANGLE');
  const sw = rect || box; if (!rect) swatchFrames.add(box);
  const texts = box.children.filter(c => c.type === 'TEXT');
  const name = (texts.find(x => !VALUE.test(x.characters)) || {}).characters;
  let v = isBound(sw) ? await getV(sw.fills[0].boundVariables.color.id) : null;
  if (!v && name) {
    const segs = []; for (let p = box.parent; p && p !== top; p = p.parent) segs.push(...p.name.toLowerCase().split('/'));
    const cands = targetVars.filter(x => x.name.split('/').pop().toLowerCase() === name.toLowerCase());
    // matched segments win; each extra segment (e.g. Color/Schemas/classic/… duplicates) costs a little
    const score = x => { const p = x.name.toLowerCase().split('/').slice(0, -1); const hit = p.filter(s => segs.includes(s)).length; return hit * 10 - (p.length - hit); };
    const best = Math.max(-Infinity, ...cands.map(score)); let pick = cands.filter(x => score(x) === best);
    if (pick.length > 1 && sw.fills[0]) { const want = hex(sw.fills[0].color); const byCol = []; for (const x of pick) if (hex(await resolve(x)) === want) byCol.push(x); if (byCol.length) pick = byCol; }
    if (pick.length === 1) { v = pick[0]; sw.fills = [paint(v)]; report.bound.push(v.name); } else report.unmatched.push(sw.id + ' ' + name + ' (' + pick.length + ')');
  }
  if (!v) continue;
  const c = await resolve(v); if (!c || c.r === undefined) continue;
  if (t.characters.toUpperCase() !== hexA(c)) {
    t.characters = hexA(c);
    for (const x of texts) { if (/^rgba?\(/.test(x.characters)) x.characters = x.characters.endsWith('%)') ? `rgba(${[c.r, c.g, c.b].map(y => Math.round(y * 255)).join(', ')}, ${Math.round(c.a * 100)}%)` : `rgba(${[c.r, c.g, c.b].map(y => Math.round(y * 255)).join(', ')}, ${+c.a.toFixed(2)})`;
      if (/^oklch\(/.test(x.characters)) x.characters = oklch(c); }
    report.refreshed.push(v.name);
  }
  // the reference names the primitive at the END of the alias chain (Foundation → Theme → Primitive)
  const raw = rawVal(v); const ref = box.findOne(n => n.type === 'TEXT' && /^(→|🔗)/.test(n.characters));
  let end = v; while (rawVal(end) && rawVal(end).type === 'VARIABLE_ALIAS') end = await getV(rawVal(end).id);
  if (ref && raw && raw.type === 'VARIABLE_ALIAS') ref.characters = '→ ' + end.name;
  else if (ref) ref.characters = ref.characters.replace(/^🔗\s*/, '→ ');
  outline(sw, c); // swatch frame, or the colour bar in row layouts
  if (!rect) { const dark = lum(c) < 0.18; box.setExplicitVariableModeForCollection(helpers, dark ? INVERTED : DEFAULT); if (dark) report.inverted++; }
}
const onSwatch = n => { for (let p = n.parent; p && p !== top; p = p.parent) if (swatchFrames.has(p)) return true; return false; };

// ── 4. chrome: dividers, chips, reference pills ────────────────────────────────────────
for (const n of top.findAll(n => !inInstance(n) && n.type !== 'INSTANCE' && n.type !== 'TEXT')) {
  if (swatchFrames.has(n) || n.type === 'RECTANGLE' && n.parent && n.parent.children.some(x => x.type === 'TEXT' && /^#[0-9A-Fa-f]{6}/.test(x.characters))) continue; // colour bar = sibling of a hex label
  const f = Array.isArray(n.fills) && n.fills[0]; if (!f || f.type !== 'SOLID' || isBound(n)) continue;
  if (n.height <= 1.5 || n.width <= 1.5) bindFill(n, kv.divider);
  else if (n.name === 'Reference Badge') { bindFill(n, kv.background); n.setExplicitVariableModeForCollection(helpers, DEFAULT); }
  else if (n.cornerRadius >= 99) bindFill(n, kv.info);
  else bindFill(n, kv.surface);
}

// ── 5. text ────────────────────────────────────────────────────────────────────────────
for (const t of top.findAll(n => n.type === 'TEXT' && !inInstance(n))) {
  if (header.findOne(n => n === t)) continue;
  const st = t.fontName === figma.mixed ? 'Regular' : t.fontName.style, fs = t.fontSize === figma.mixed ? 14 : t.fontSize;
  const val = VALUE.test(t.characters), chip = t.parent && t.parent.cornerRadius >= 99, refPill = t.parent && t.parent.name === 'Reference Badge';
  if (refPill) await style(t, S.ann, kv.text);
  else if (onSwatch(t)) await style(t, val ? S.ann : S.desc, kv.text);
  else if (val) await style(t, S.ann, kv.faded);
  else if (chip) await style(t, S.small, kv.text);
  else if (fs >= 24) await style(t, S.h3, kv.heading);
  else if (fs >= 16) await style(t, S.secTitle, kv.heading);
  else if (/Semi|Bold/.test(st)) await style(t, S.col, kv.heading);
  else await style(t, S.small, kv.text);
  report.restyled++;
}
return { top: top.id, ...report, bound: report.bound.length, refreshed: report.refreshed };
