// minis-page-to-figma — pass 1, capture.
//
// Paste the whole file into Claude in Chrome's javascript_tool on ANY www.slevomat.cz tab
// (logged out). It defines helpers on window.__p2f and changes nothing on the page.
// Navigating the tab wipes window.__p2f — paste the file again after any navigation.
//
// Then, one call each (results stay on window, the tool returns ~1,000 chars at most):
//   await __p2f.capture('/', 1280)        → short summary; full result in __p2f.runs['1280']
//     options: { mode: 'light' | 'dark' | 'as-is', height } — default light (see frame())
//   __p2f.blocks('1280', 4)               → the block tree (bands and sections); read it first
//   __p2f._s = __p2f.dig('1280', 88)     → digest of node 88's subtree; then __p2f.chunk(__p2f._s, i)
//   __p2f.chunk(str, i)                   → piece i of any long string you kept on window
//   __p2f.size('1280')                    → { outline: N chunks, stats: N chunks, vars: N chunks }
//   __p2f.read('1280', 'outline', 0)      → chunk 0 of the outline (≈950 chars), then 1, 2, …
//   __p2f.read('1280', 'stats', 0)        → value statistics (colours, radii, type, spacing)
//   __p2f.read('1280', 'vars', 0)         → production custom properties, value → names
//
// Why an iframe: Chrome windows can't shrink to phone widths, and resizing the window would
// change the user's browser. A hidden same-origin iframe of fixed width renders the page at
// exactly that viewport width. Its classic scrollbar takes ~11px, so 375 reads as ~364.
//
// Read-only: nothing here clicks, submits, logs in or writes to the site.

(() => {
  const P = (window.__p2f = window.__p2f || { runs: {} });
  P.version = '1.4.0';

  const SKIP_CLASS = /^(js-|u-|typo-|grid$|grid__item$|desktop--|tablet--|mobile--|mobile-only|desktop-only|tablet-only|hidden|visuallyhidden|lazy|loaded|is-|has-)/;
  const LANDMARK = new Set(['HEADER', 'NAV', 'MAIN', 'FOOTER', 'SECTION', 'ASIDE', 'ARTICLE', 'FORM']);
  const LEAF_TAG = new Set(['A', 'BUTTON', 'IMG', 'PICTURE', 'SVG', 'INPUT', 'SELECT', 'TEXTAREA', 'LABEL', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'SPAN', 'STRONG', 'LI']);
  const MAX_NODES = 1500;
  const MAX_DEPTH = 18; // carousels nest deep: body → … → slider → mask → track → card ≈ 14

  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const px = v => (v && v !== 'normal' && v !== 'auto' ? Math.round(parseFloat(v) * 10) / 10 : 0);
  const transparent = c => !c || c === 'transparent' || /rgba\([^)]*,\s*0\)$/.test(c);

  // One iframe per width, reused across calls.
  // mode: 'light' (default) removes production's `dark-mode` body class inside the iframe, so
  // values compare with Mini*S Foundation `light`; 'dark' adds it; 'as-is' keeps what the
  // user's cookie / system preference chose. Only the hidden iframe's DOM changes.
  async function frame(url, width, height, mode) {
    const id = '__p2f_' + width;
    let f = document.getElementById(id);
    if (f) f.remove();
    f = document.createElement('iframe');
    f.id = id;
    // On screen but invisible while it loads and scrolls: lazy blocks (carousels, magazine) load on
    // IntersectionObserver, which measures against the top-level viewport, so an off-screen
    // iframe would leave them as skeletons. opacity 0 + pointer-events none: the user sees nothing
    // and can't click into it.
    f.style.cssText = `position:fixed;left:0;top:0;width:${width}px;height:${height}px;border:0;opacity:0;pointer-events:none;z-index:-1`;
    const loaded = new Promise(r => f.addEventListener('load', r, { once: true }));
    f.src = url;
    document.body.appendChild(f);
    await loaded;
    await sleep(2500);
    const doc = f.contentDocument, win = f.contentWindow;
    if (mode === 'light') doc.body.classList.remove('dark-mode');
    if (mode === 'dark') doc.body.classList.add('dark-mode');
    // Scroll through the page so every lazy block loads, then back to the top.
    for (let y = 0; y < doc.documentElement.scrollHeight; y += Math.round(height * 0.7)) {
      win.scrollTo(0, y);
      await sleep(450);
    }
    win.scrollTo(0, 0);
    await sleep(1500);
    // Then as tall as the page and off screen, so the measured rects are page coordinates.
    const full = Math.min(doc.documentElement.scrollHeight, 30000);
    f.style.cssText = `position:absolute;left:-99999px;top:0;width:${width}px;height:${full}px;border:0;visibility:hidden`;
    await sleep(1500);
    return f;
  }
  function rootClass(el) {
    const list = [...el.classList].filter(c => !SKIP_CLASS.test(c));
    return list.join('.');
  }

  function directText(el) {
    let t = '';
    for (const n of el.childNodes) if (n.nodeType === 3) t += n.textContent;
    return t.replace(/\s+/g, ' ').trim();
  }

  function visible(el, cs, r) {
    return r.width > 0 && r.height > 0 && cs.display !== 'none' && cs.visibility !== 'hidden' && cs.opacity !== '0';
  }

  // Compact style record: only what differs from "nothing".
  function styleOf(el, cs, hasText) {
    const s = {};
    if (!transparent(cs.backgroundColor)) s.bg = cs.backgroundColor;
    if (cs.backgroundImage && cs.backgroundImage !== 'none') s.bgi = cs.backgroundImage.startsWith('url') ? 'url' : 'gradient';
    const rad = [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius].map(px);
    if (rad.some(Boolean)) s.rad = rad.every(v => v === rad[0]) ? rad[0] : rad.join(' ');
    const bw = px(cs.borderTopWidth) || px(cs.borderBottomWidth) || px(cs.borderLeftWidth);
    if (bw && cs.borderStyle !== 'none') {
      const on = ['Top', 'Right', 'Bottom', 'Left'].filter(k => px(cs['border' + k + 'Width']) && cs['border' + k + 'Style'] !== 'none');
      // Colour of the first side that is actually drawn (a 0-width side still reports currentColor).
      const col = on.length ? cs['border' + on[0] + 'Color'] : '';
      if (on.length && !transparent(col)) s.bd = `${px(cs['border' + on[0] + 'Width'])} ${on.map(k => k[0]).join('')} ${col}`;
    }
    const pad = [cs.paddingTop, cs.paddingRight, cs.paddingBottom, cs.paddingLeft].map(px);
    if (pad.some(Boolean)) s.pad = pad.join(' ');
    if (cs.display.includes('flex') || cs.display.includes('grid')) {
      s.disp = cs.display.includes('grid') ? 'grid' : cs.flexDirection === 'column' ? 'col' : 'row';
      const g = px(cs.rowGap), cg = px(cs.columnGap);
      if (g || cg) s.gap = g === cg ? g : `${g} ${cg}`;
      if (s.disp === 'grid') s.cols = cs.gridTemplateColumns.split(' ').filter(Boolean).length;
      if (cs.justifyContent !== 'normal' && cs.justifyContent !== 'flex-start') s.jc = cs.justifyContent;
      if (cs.alignItems !== 'normal' && cs.alignItems !== 'stretch') s.ai = cs.alignItems;
    }
    if (cs.boxShadow && cs.boxShadow !== 'none') s.sh = 1;
    if (hasText) {
      s.c = cs.color;
      s.ff = cs.fontFamily.split(',')[0].replace(/["']/g, '').trim();
      s.fs = px(cs.fontSize);
      s.fw = cs.fontWeight;
      s.lh = cs.lineHeight === 'normal' ? 'n' : px(cs.lineHeight);
      if (px(cs.letterSpacing)) s.ls = cs.letterSpacing;
      if (cs.textTransform !== 'none') s.tt = cs.textTransform;
    }
    if (el.tagName === 'IMG' || el.tagName === 'PICTURE') s.img = 1;
    if (el.tagName === 'svg' || el.tagName === 'SVG') s.svg = 1;
    return s;
  }

  function outline(doc, win) {
    const nodes = [];
    const offY = 0;
    // Same-signature siblings beyond the first two are collapsed into a repeat count. The size is
    // part of the signature: bands that share a wrapper class (`grid-wrap--wide`) but differ in
    // height are different blocks and must all be kept; list items of one size are repeats.
    function sig(el) {
      const r = el.getBoundingClientRect();
      return el.tagName + '.' + rootClass(el) + '@' + Math.round(r.width / 4) + 'x' + Math.round(r.height / 4);
    }

    function walk(el, parentIdx, depth) {
      if (nodes.length >= MAX_NODES || depth > MAX_DEPTH) return;
      const cs = win.getComputedStyle(el);
      const r = el.getBoundingClientRect();
      if (!visible(el, cs, r)) return;
      const cls = rootClass(el);
      const text = directText(el);
      const typo = [...el.classList].filter(c => c.startsWith('typo-') || c.startsWith('u-text') || c.startsWith('u-bg')).join(' ');
      const tag = el.tagName.toUpperCase();
      const keep = (cls && r.height >= 8) || LANDMARK.has(tag) || (text && LEAF_TAG.has(tag)) || tag === 'IMG' || tag === 'SVG';
      let idx = parentIdx;
      if (keep) {
        idx = nodes.length;
        nodes.push({
          i: idx, p: parentIdx, tag: tag.toLowerCase(), cls, typo,
          r: [Math.round(r.left), Math.round(r.top + offY), Math.round(r.width), Math.round(r.height)],
          s: styleOf(el, cs, !!text),
          t: text ? text.slice(0, 60) : undefined,
          // Path only: the Chrome tool blocks results that carry query strings.
          src: tag === 'IMG' ? (el.currentSrc || el.src || '').split(/[?#]/)[0].slice(0, 160) : undefined,
        });
      }
      if (tag === 'SVG') return;
      const kids = [...el.children];
      const seen = {};
      for (const k of kids) {
        const key = sig(k);
        seen[key] = (seen[key] || 0) + 1;
        if (seen[key] > 2 && rootClass(k)) {
          if (keep) nodes[idx].rep = Math.max(nodes[idx].rep || 0, seen[key]);
          continue;
        }
        walk(k, idx, keep ? depth + 1 : depth);
      }
    }
    walk(doc.body, -1, 0);
    return nodes;
  }

  // Every rendered value, counted — the raw material for the value → variable map.
  function stats(doc, win) {
    const st = { color: {}, bg: {}, border: {}, radius: {}, font: {}, gap: {}, pad: {} };
    const add = (m, k) => { if (k !== undefined && k !== '' && k !== '0') m[k] = (m[k] || 0) + 1; };
    for (const el of doc.body.querySelectorAll('*')) {
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) continue;
      const cs = win.getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden') continue;
      if (directText(el)) {
        add(st.color, cs.color);
        add(st.font, `${cs.fontFamily.split(',')[0].replace(/["']/g, '').trim()} ${px(cs.fontSize)}/${cs.lineHeight === 'normal' ? 'n' : px(cs.lineHeight)} ${cs.fontWeight}${px(cs.letterSpacing) ? ' ls' + cs.letterSpacing : ''}`);
      }
      if (!transparent(cs.backgroundColor)) add(st.bg, cs.backgroundColor);
      if (px(cs.borderTopWidth) && cs.borderTopStyle !== 'none') add(st.border, `${px(cs.borderTopWidth)} ${cs.borderTopColor}`);
      else if (px(cs.borderBottomWidth) && cs.borderBottomStyle !== 'none') add(st.border, `${px(cs.borderBottomWidth)} ${cs.borderBottomColor}`);
      add(st.radius, String(px(cs.borderTopLeftRadius)));
      if (cs.display.includes('flex') || cs.display.includes('grid')) { add(st.gap, String(px(cs.rowGap))); add(st.gap, String(px(cs.columnGap))); }
      for (const k of ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft']) add(st.pad, String(px(cs[k])));
    }
    const sort = m => Object.entries(m).sort((a, b) => b[1] - a[1]);
    const out = {};
    for (const k in st) out[k] = sort(st[k]);
    return out;
  }

  // Production's own custom properties (it consumes part of the Mini*S export), value → names.
  function vars(doc, win) {
    const names = new Set();
    const scan = rules => { for (const r of rules) {
      if (r.cssRules) scan(r.cssRules);
      if (r.style) for (const p of r.style) if (p.startsWith('--')) names.add(p);
    } };
    for (const sh of doc.styleSheets) { try { scan(sh.cssRules); } catch (e) { /* cross-origin sheet */ } }
    const cs = win.getComputedStyle(doc.documentElement);
    const byValue = {};
    for (const n of names) {
      const v = cs.getPropertyValue(n).trim();
      if (!v) continue;
      (byValue[v] = byValue[v] || []).push(n);
    }
    return { count: names.size, byValue };
  }

  P.capture = async (path, width, { height = 1200, mode = 'light' } = {}) => {
    const url = new URL(path, location.origin).href;
    const f = await frame(url, width, height, mode);
    const doc = f.contentDocument, win = f.contentWindow;
    const run = {
      meta: {
        url, width, mode, path: win.location.pathname, title: doc.title,
        date: new Date().toISOString().slice(0, 10),
        docHeight: doc.documentElement.scrollHeight,
        scrollbar: width - doc.documentElement.clientWidth,
        loggedIn: !!doc.querySelector('[href*="odhlasit"], .user-navigation--logged, .js-logged-user'),
      },
      nodes: outline(doc, win),
      stats: stats(doc, win),
      vars: vars(doc, win),
    };
    P.runs[String(width)] = run;
    P._text = {};
    return { ...run.meta, nodes: run.nodes.length, vars: run.vars.count, note: 'read with __p2f.read(width, part, i)' };
  };

  // Outline as compact lines: i | parent | tag.class | typo | x,y,w,h | style | text | xrep | src
  function lines(run) {
    return run.nodes.map(n => {
      return [n.i, n.p, `${n.tag}${n.cls ? '.' + n.cls : ''}`, n.typo || '', n.r.join(','), fmt(n.s), safe((n.t || '').slice(0, 30)), n.rep ? 'x' + n.rep : '', n.src || ''].join(' | ');
    }).join('\n');
  }

  function text(width, part) {
    P._text = P._text || {};
    const key = width + ':' + part;
    if (P._text[key]) return P._text[key];
    const run = P.runs[String(width)];
    if (!run) throw new Error('no capture for ' + width + ' — run __p2f.capture first');
    const t = part === 'outline' ? lines(run)
      : part === 'stats' ? JSON.stringify(run.stats)
      : part === 'vars' ? JSON.stringify(run.vars.byValue)
      : part === 'meta' ? JSON.stringify(run.meta)
      : JSON.stringify(run[part]);
    return (P._text[key] = t);
  }

  // Block tree only: nodes up to `maxDepth` below <body>, ≥ 20px tall, no images or text. Read
  // this first to see the page's bands, then read the outline only for the blocks you map.
  P.blocks = (width, maxDepth = 4, from = -1) => {
    const run = P.runs[String(width)];
    const d = {};
    const keep = new Set();
    for (const n of run.nodes) {
      d[n.i] = n.p < 0 ? 0 : d[n.p] + 1;
      if (from >= 0 && (n.i === from || keep.has(n.p))) keep.add(n.i);
    }
    const base = from >= 0 ? d[from] : 0;
    return run.nodes
      .filter(n => (from < 0 || keep.has(n.i)) && d[n.i] - base <= maxDepth && n.tag !== 'img' && n.r[3] >= 20)
      .map(n => `${n.i}<${n.p} ${n.tag}.${n.cls.slice(0, 48)} ${n.r.join(',')}${n.rep ? ' ×' + n.rep : ''}${n.s.bg ? ' bg' : ''}`)
      .join('\n');
  };
  // One subtree as an indented digest, the format to read blocks in. Colours as hex, no
  // `k=v;` pairs and no query strings: the Chrome tool blocks results that look like cookies
  // or URLs with parameters. Text is cut to 18 chars (enough to recognise, too little to copy).
  const hex = c => c.replace(/rgba?\(([^)]*)\)/g, (m, a) => {
    const p = a.split(',').map(Number);
    if (p.length > 3 && p[3] === 0) return 'none';
    return '#' + p.slice(0, 3).map(x => x.toString(16).padStart(2, '0')).join('') + (p.length > 3 ? '/' + p[3].toFixed(2) : '');
  });
  const fmt = s => Object.entries(s).map(([k, v]) => `${k}:${hex(String(v))}`).join(' ')
    .replace(/ff:Slevomat Inter /, '').replace(/disp:/, '');
  const safe = t => t.replace(/[=&?;]/g, ' ');
  P.dig = (width, from, maxDepth = 9) => {
    const run = P.runs[String(width)];
    const d = { [from]: 0 };
    const out = [];
    for (const n of run.nodes) {
      if (n.i !== from && d[n.p] === undefined) continue;
      if (n.i !== from) d[n.i] = d[n.p] + 1;
      if (d[n.i] > maxDepth) continue;
      const c = n.cls.replace(/^(\w[\w-]*)(__)/, '$2').replace(/content__block/g, 'cb').slice(0, 38);
      out.push(`${n.i}${'.'.repeat(d[n.i])}${n.tag === 'div' ? '' : n.tag}${c ? '.' + c : ''}${n.typo ? ' [' + n.typo + ']' : ''} ` +
        `${n.r[2]}x${n.r[3]}@${n.r[0]},${n.r[1]} ${fmt(n.s)}${n.t ? ' "' + safe(n.t.slice(0, 18)) + '"' : ''}${n.rep ? ' x' + n.rep : ''}`);
    }
    return out.join('\n');
  };
  // Long strings out in pieces: __p2f.chunk(str, i).
  P.chunk = (str, i) => str.slice(i * P.CHUNK, (i + 1) * P.CHUNK);

  P.CHUNK = 950;
  P.size = width => Object.fromEntries(['outline', 'stats', 'vars'].map(k => [k, Math.ceil(text(width, k).length / P.CHUNK)]));
  P.read = (width, part, i) => text(width, part).slice(i * P.CHUNK, (i + 1) * P.CHUNK);
  // Read several chunks at once when the tool allows longer output.
  P.readN = (width, part, i, n) => text(width, part).slice(i * P.CHUNK, (i + n) * P.CHUNK);

  return 'p2f ' + P.version + ' ready';
})();
