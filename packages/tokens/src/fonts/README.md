# Brand font — not distributed

This folder is where the **Kensington Compressed Bold** brand typeface goes. It is
intentionally empty in the repository.

Kensington is Slevomat-proprietary. It is not open-licensed, so it is **not
committed and not published** — font binaries here are git-ignored (see the root
`.gitignore`). Everything else in this design system is MIT.

Without Kensington, `--typography-font-family-brand` falls back to
[Bebas Neue](https://fonts.google.com/specimen/Bebas+Neue) from Google Fonts — a
condensed all-caps display face with similar proportions. Brand headlines stay
readable and correctly styled; they just are not the real Slevomat face.

## Getting the real font (Slevomat internal)

Two ways, both zero-config — pick either.

### 1. Install it on your machine

Install Kensington Compressed Bold via Font Book (macOS) or your OS font
manager. The generated `dist/fonts/kensington.css` resolves it with
`local('Kensington Compressed Bold')`, so nothing needs to be copied anywhere and
no network request is made.

### 2. Drop the woff2 in here

Copy the file into this folder under exactly this name:

```
packages/tokens/src/fonts/kensington-compressed-bold.woff2
```

then rebuild:

```bash
pnpm --filter tokens build
```

The build copies it to `dist/fonts/` and self-hosts it from
`dist/fonts/kensington.css`. Storybook and every `create-minis` prototype pick it
up automatically, because both copy the whole token `dist` as static assets.

Internal source: `Pracovní prostor/Slevomat/Písma/`.

## How the overlay works

`packages/tokens/scripts/build.js` always writes `dist/fonts/kensington.css`,
whether or not a font file is present, so consumers can link it unconditionally
without ever hitting a 404:

| woff2 present | generated `src`                                  |
| ------------- | ------------------------------------------------ |
| no            | `local(…)` only — no network request at all      |
| yes           | `local(…)`, then `url('./kensington-…woff2')`     |

The `@font-face` declares `font-weight: 400 700` so the single Bold face satisfies
any requested weight. Brand headings request `--typography-brand-weight: 400`,
which keeps Kensington intact while avoiding synthetic bolding on the
single-weight Bebas Neue fallback.

> **Do not commit font binaries to this folder.** If you have to add another
> licensed face, extend the ignore rules in the root `.gitignore` first.
