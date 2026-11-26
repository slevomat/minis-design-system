// ==== per-run constants ====
const WIDTH = __WIDTH__;           // 375 | 768 | 1280
const MODE = '__MODE__';           // Layout mode name: 2xs | md | xl
const X = __X__;                   // canvas x of the rebuild frame
// ==== content (real page content: Figma only, never the repo) ====
const C = __CONTENT__;

const page = figma.root.children.find(p => p.name === 'Production rebuilds');
if (!page) throw new Error('page "Production rebuilds" missing');
await figma.setCurrentPageAsync(page);
// Re-runs replace the frame of the same width.
for (const n of page.children.filter(n => n.name.startsWith(`Homepage — ${WIDTH} `))) n.remove();

const V = {};
for (const v of await figma.variables.getLocalVariablesAsync()) V[v.name] = v;
const need = n => { if (!V[n]) throw new Error('variable missing: ' + n); return V[n]; };
const S = {};
for (const s of await figma.getLocalTextStylesAsync()) S[s.name] = s;
for (const s of Object.values(S)) if (/^(Heading|Body|Caption)\//.test(s.name)) { try { await figma.loadFontAsync(s.fontName); } catch (e) {} }
const cols = await figma.variables.getLocalVariableCollectionsAsync();
const layoutCol = cols.find(c => c.name === 'Layout');
const foundCol = cols.find(c => c.name === 'Foundation');
const modeId = layoutCol.modes.find(m => m.name === MODE).modeId;
const lightId = foundCol.modes.find(m => /light/.test(m.name)).modeId;

const fill = (node, name) => { node.fills = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }, 'color', need(name))]; };
const noFill = n => { n.fills = []; };
const stroke = (node, name, sides) => {
  node.strokes = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', need(name))];
  node.strokeAlign = 'INSIDE';
  const w = need('border/width/thin');
  if (!sides) node.setBoundVariable('strokeWeight', w);
  else for (const k of ['Top', 'Right', 'Bottom', 'Left']) { if (sides.includes(k[0])) node.setBoundVariable('stroke' + k + 'Weight', w); else node['stroke' + k + 'Weight'] = 0; }
};
const radius = (n, name) => { const v = need(name); for (const k of ['topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius']) n.setBoundVariable(k, v); };
const pad = (n, t, r, b, l) => { const m = { paddingTop: t, paddingRight: r ?? t, paddingBottom: b ?? t, paddingLeft: l ?? r ?? t }; for (const [k, v] of Object.entries(m)) if (v) n.setBoundVariable(k, need(v)); };
const gap = (n, name, cross) => { if (name) n.setBoundVariable('itemSpacing', need(name)); if (cross) n.setBoundVariable('counterAxisSpacing', need(cross)); };

function box(name, dir = 'VERTICAL', parent) {
  const f = figma.createAutoLayout(dir);
  f.name = name; noFill(f);
  if (parent) { parent.appendChild(f); f.layoutSizingHorizontal = 'FILL'; }
  f.layoutSizingVertical = 'HUG';
  return f;
}
async function text(parent, chars, style, color = 'Color/Text/primary', name) {
  const t = figma.createText();
  await t.setTextStyleIdAsync(S[style].id);
  t.characters = chars;
  t.name = name || chars.slice(0, 30);
  fill(t, color);
  parent.appendChild(t);
  return t;
}
function wrapText(t) { t.layoutSizingHorizontal = 'FILL'; t.textAutoResize = 'HEIGHT'; }
// Text overrides inside instances. A text in a font the plugin can't load (Kensington in MiniS DS)
// is skipped and reported in `skipped`, never typed over in another font.
const skipped = [];
async function setTexts(inst, values) {
  const ts = inst.findAll(n => n.type === 'TEXT');
  for (const [i, v] of Object.entries(values)) {
    const t = ts[+i]; if (!t || v == null) continue;
    try {
      for (const seg of t.getStyledTextSegments(['fontName'])) await figma.loadFontAsync(seg.fontName);
      t.characters = v;
    } catch (e) { skipped.push(inst.name.slice(0, 30) + ' › ' + t.name.slice(0, 30)); }
  }
}
const sets = {};
async function variant(setId, crit) {
  sets[setId] = sets[setId] || await figma.getNodeByIdAsync(setId);
  const v = sets[setId].children.find(c => Object.entries(crit).every(([k, x]) => c.variantProperties[k] === x));
  if (!v) throw new Error('no variant ' + JSON.stringify(crit) + ' in ' + setId);
  return v.createInstance();
}
function placeholder(parent, name, h, rad = 'border/radius/md') {
  const f = figma.createFrame(); f.name = name; parent.appendChild(f);
  f.layoutSizingHorizontal = 'FILL'; f.resize(f.width, h); f.layoutSizingVertical = 'FIXED';
  fill(f, 'Color/Surface/faded'); radius(f, rad);
  return f;
}

const narrow = WIDTH < 600, desk = WIDTH >= 1008;
const created = [];

// ---- page frame ----
const root = figma.createAutoLayout('VERTICAL');
root.name = `Homepage — ${WIDTH} (Layout ${MODE}) — rebuild`;
root.resize(WIDTH, 100); root.layoutSizingVertical = 'HUG';
root.counterAxisAlignItems = 'CENTER';
root.x = X; root.y = 0;
page.appendChild(root);
root.setExplicitVariableModeForCollection(layoutCol, modeId);
root.setExplicitVariableModeForCollection(foundCol, lightId);
fill(root, 'Color/background');
created.push(root.id);

// 1 TopBar, 2 Navigation (mandatory chrome)
const top = await variant('5156:9287', { 'Property 1': 'web' }); root.appendChild(top); top.layoutSizingHorizontal = 'FILL';
const nav = await variant('5226:5557', { Variant: 'main nav' }); root.appendChild(nav); nav.layoutSizingHorizontal = 'FILL';
try { await setTexts(nav, Object.fromEntries(C.nav.map((t, i) => [i, t]))); } catch (e) {}

// container
const main = box('container (container/width, container/padding)', 'VERTICAL', root);
main.setBoundVariable('maxWidth', need('container/width'));
pad(main, 'spacing/layout/md', 'container/padding', 'spacing/layout/xl', 'container/padding');
gap(main, 'spacing/layout/lg');

// locality row
const loc = box('locality row', 'HORIZONTAL', main); loc.primaryAxisAlignItems = 'SPACE_BETWEEN'; loc.counterAxisAlignItems = 'CENTER';
const picker = box('not Mini*S — locality picker', 'HORIZONTAL'); loc.appendChild(picker);
pad(picker, 'linear/sp-linear-2', 'linear/sp-linear-3'); stroke(picker, 'Color/Border/default'); radius(picker, 'border/radius/md'); fill(picker, 'Color/Surface/primary');
await text(picker, 'Praha', 'Body/md');
if (!narrow) {
  const cd = box('not Mini*S — countdown', 'HORIZONTAL'); loc.appendChild(cd);
  pad(cd, 'linear/sp-linear-3', 'linear/sp-linear-3'); radius(cd, 'border/radius/lg'); fill(cd, 'Color/Interaction/primary/default/surface');
  await text(cd, 'Vánoce', 'Body/sm', 'Color/Interaction/primary/default/accent');
}

// municipality note = Message (closest) + actions (missing in Message)
async function note(title, body, actions, closable) {
  const w = box('municipality note — Message + actions', 'VERTICAL', main);
  gap(w, 'linear/sp-linear-3'); pad(w, 'linear/sp-linear-6'); fill(w, 'Color/Surface/primary'); radius(w, 'border/radius/lg');
  const m = await variant('2517:9568', { Layout: narrow ? 'vertical' : 'horizontal' }); w.appendChild(m); m.layoutSizingHorizontal = 'FILL';
  try { m.setProperties({ 'closable#2517:0': closable, 'Visual#2517:3': false }); } catch (e) {}
  await setTexts(m, { 0: title, 1: body });
  const row = box('actions', 'HORIZONTAL', w); gap(row, 'linear/sp-linear-2');
  for (const [type, label] of actions) {
    const b = await variant('284:5283', { Type: type, Variant: 'Label', Size: 'small', 'Show counter': 'False', Hover: 'false' });
    row.appendChild(b); try { b.setProperties({ 'Text#2344:20': label }); } catch (e) {}
  }
}
await note(C.note, C.noteP, [['Primary', 'Jsem odjinud'], ['Secondary', 'Jsem z Prahy']], true);

// branding banner (gap, image-led)
placeholder(main, 'not Mini*S — branding banner (image)', narrow ? 120 : 230, 'border/radius/lg');

// promo grids
async function promoGrid(name, titles, heading) {
  const sec = box(name, 'VERTICAL', main); gap(sec, 'linear/sp-linear-4');
  if (heading) await headRow(sec, heading);
  const g = box('grid', 'HORIZONTAL', sec); g.layoutWrap = 'WRAP'; gap(g, 'linear/sp-linear-2', 'linear/sp-linear-2');
  const content = Math.min(WIDTH, 1240) - (WIDTH >= 1008 ? 64 : WIDTH >= 408 ? 32 : 16);
  const n = narrow ? 2 : 4; const w = Math.floor((content - (n - 1) * 8) / n);
  for (const t of titles) {
    const p = await variant('5495:409', { Breakpoint: narrow ? 'Mobile' : 'Desktop' }); g.appendChild(p);
    p.resize(w, p.height);
    // Title (text 0) is Kensington: the captured title goes in the subtitle, the sample body is cleared.
    await setTexts(p, { 1: t, 2: '' });
  }
}
async function headRow(parent, h, all) {
  const r = box('block heading', 'HORIZONTAL', parent); r.primaryAxisAlignItems = 'SPACE_BETWEEN'; r.counterAxisAlignItems = 'BASELINE';
  await text(r, h, 'Heading/lg');
  if (all) await text(r, all, 'Body/sm', 'Color/Text/secondary');
  return r;
}
async function tagsRow(parent, tags) {
  const r = box('tags', 'HORIZONTAL', parent); r.clipsContent = true; gap(r, 'linear/sp-linear-2');
  for (const t of tags) { const i = await variant('2523:339', { Variant: 'Clickable', State: 'Default' }); r.appendChild(i); await setTexts(i, { 0: t }); }
}
async function carousel(parent, cards) {
  const r = box('carousel', 'HORIZONTAL', parent); r.clipsContent = true; gap(r, 'linear/sp-linear-2');
  // Deal Card texts in an instance: 0 name, 1 rating, 2 rating count, 3 price, 4 label, 5 place,
  // 6 region. What the capture doesn't give is emptied and hidden, never left as sample copy.
  for (const [name, info, price] of cards) {
    const d = await variant('5495:768', { Content: 'Carousel HP', Type: 'Default', 'Card usage': 'carousel' }); r.appendChild(d);
    await setTexts(d, { 0: name, 1: '', 2: '', 3: price || '…', 4: '', 5: info, 6: '' });
    for (const t of d.findAll(n => n.type === 'TEXT')) if (t.characters === '') t.visible = false;
  }
}
await promoGrid('homepage grid (Promo Cards)', C.grid1);

for (const b of C.blocks) {
  if (b.kind === 'gifts') {
    const band = box('gifts band — brand theme (no token: surface)', 'VERTICAL', main);
    pad(band, 'linear/sp-linear-8'); gap(band, 'linear/sp-linear-4'); fill(band, 'Color/Surface/faded'); radius(band, 'border/radius/lg');
    // Kensington can't be loaded by plugin scripts in MiniS DS: Heading/xl stands in, the layer
    // name says which style a designer should apply by hand.
    const t = await text(band, b.h, 'Heading/xl', 'Color/Text/primary', 'title — apply Brand/Heading/xl by hand'); // no textCase override: it detaches the style
    await tagsRow(band, b.tags); await carousel(band, b.cards);
    await text(band, b.all, 'Body/sm', 'Color/Text/secondary');
  } else {
    const sec = box('content block — ' + b.h, 'VERTICAL', main); gap(sec, 'linear/sp-linear-4');
    await headRow(sec, b.h, b.all);
    if (b.tags && b.tags.length) await tagsRow(sec, b.tags);
    await carousel(sec, b.cards);
  }
}

// nearest
await note(C.note, C.noteP, [['Primary', 'Nastavit']], false);

// magazine (gap)
{
  const sec = box('content block — magazine', 'VERTICAL', main); gap(sec, 'linear/sp-linear-4');
  await headRow(sec, C.magH);
  const r = box('posts', 'HORIZONTAL', sec); gap(r, 'linear/sp-linear-4'); r.clipsContent = true;
  for (const p of C.posts.slice(0, narrow ? 2 : 2)) {
    const c = box('not Mini*S — magazine post', 'VERTICAL'); r.appendChild(c);
    if (narrow) { c.layoutSizingHorizontal = 'FIXED'; c.resize(294, c.height); } else c.layoutSizingHorizontal = 'FILL';
    fill(c, 'Color/Surface/primary'); stroke(c, 'Color/Border/subtle'); radius(c, 'border/radius/md'); gap(c, 'linear/sp-linear-3');
    c.paddingBottom = 0; c.setBoundVariable('paddingBottom', need('linear/sp-linear-4'));
    placeholder(c, 'image', narrow ? 160 : 320);
    const tw = box('texts', 'VERTICAL', c); pad(tw, null, 'linear/sp-linear-4', null, 'linear/sp-linear-4');
    wrapText(await text(tw, p, 'Body/md'));
  }
}
await promoGrid('homepage grid 2 (Promo Cards)', C.grid2, C.grid2H);

// POIs (gap)
{
  const sec = box('content block — points of interest', 'VERTICAL', main); gap(sec, 'linear/sp-linear-4');
  await headRow(sec, C.poiH);
  const r = box('pois', 'HORIZONTAL', sec); gap(r, 'linear/sp-linear-4'); r.clipsContent = true;
  for (const p of C.pois) {
    const c = box('not Mini*S — point of interest card', 'HORIZONTAL'); r.appendChild(c);
    if (narrow) { c.layoutSizingHorizontal = 'FIXED'; c.resize(294, c.height); } else c.layoutSizingHorizontal = 'FILL';
    fill(c, 'Color/Surface/primary'); radius(c, 'border/radius/lg');
    const img = figma.createFrame(); img.name = 'image'; c.appendChild(img); img.resize(134, 134); fill(img, 'Color/Surface/faded'); radius(img, 'border/radius/md');
    const tw = box('texts', 'VERTICAL', c); pad(tw, 'linear/sp-linear-4'); gap(tw, 'linear/sp-linear-1');
    wrapText(await text(tw, p, 'Heading/sm'));
    await text(tw, 'Město', 'Body/sm', 'Color/Text/secondary');
  }
}

// USPs (gap)
{
  const u = box('not Mini*S — USP strip', 'VERTICAL', main);
  fill(u, 'Color/Surface/primary'); stroke(u, 'Color/Border/subtle'); radius(u, 'border/radius/lg');
  pad(u, 'linear/sp-linear-6', narrow ? 'linear/sp-linear-4' : 'spacing/layout/xl'); gap(u, 'linear/sp-linear-6'); u.counterAxisAlignItems = 'CENTER';
  const h = await text(u, C.uspH.trim(), 'Heading/xl'); h.textAlignHorizontal = 'CENTER';
  const r = box('items', 'HORIZONTAL', u); r.layoutWrap = 'WRAP'; gap(r, 'linear/sp-linear-4', 'linear/sp-linear-4'); r.primaryAxisAlignItems = 'CENTER';
  for (const t of C.usps) {
    const it = box('usp item', 'VERTICAL'); r.appendChild(it); it.counterAxisAlignItems = 'CENTER'; gap(it, 'linear/sp-linear-2');
    it.layoutSizingHorizontal = 'FIXED'; it.resize(narrow ? 150 : 160, it.height);
    const ic = figma.createFrame(); ic.name = 'icon'; it.appendChild(ic); ic.resize(48, 48); fill(ic, 'Color/Surface/faded'); radius(ic, 'border/radius/full');
    const tt = await text(it, t, 'Body/sm'); tt.textAlignHorizontal = 'CENTER'; wrapText(tt);
  }
}

// footer (gap), full width, divided from the page by a separator
const sep = (await figma.getNodeByIdAsync('4987:147')).createInstance(); root.appendChild(sep); sep.layoutSizingHorizontal = 'FILL';
const foot = box('not Mini*S — site footer', 'VERTICAL', root); fill(foot, 'Color/Surface/primary');
foot.setBoundVariable('maxWidth', need('container/width'));
pad(foot, 'spacing/layout/xl', 'container/padding', 'spacing/layout/xl', 'container/padding'); gap(foot, 'linear/sp-linear-8');
const fc = box('columns', 'HORIZONTAL', foot); fc.layoutWrap = 'WRAP'; gap(fc, 'linear/sp-linear-6', 'linear/sp-linear-6');
for (const t of C.foot) {
  const col = box('column', 'VERTICAL'); fc.appendChild(col); gap(col, 'linear/sp-linear-2');
  col.layoutSizingHorizontal = 'FIXED'; col.resize(narrow ? 150 : desk ? 144 : 160, col.height);
  await text(col, t, 'Heading/sm');
}
const legal = await text(foot, C.legal, 'Caption/xs', 'Color/Text/secondary'); wrapText(legal); legal.textAlignHorizontal = 'CENTER';

return { root: root.id, h: Math.round(root.height), children: root.children.length, skipped: [...new Set(skipped)] };
