# 🚀 Mini*S Design System - Quick Start

Projekt byl úspěšně vytvořen! Všechny soubory jsou připraveny.

## 📦 Co bylo vytvořeno

✅ **Packages:**
- `packages/tokens/` - Design tokeny (Foundation light/dark, Layout, Breakpoints, Themes)
- `packages/components/` - Lit Web Components (Button komponenta jako příklad)

✅ **Apps:**
- `apps/storybook/` - Storybook pro dokumentaci a prototypování

✅ **Docs:**
- `docs/ai-prompts/` - AI-friendly dokumentace pro Cursor/Claude Code
- `docs/examples/` - Fungující příklady (simple-landing.html)

✅ **Config:**
- Root package.json, pnpm-workspace.yaml
- TypeScript, ESLint, Prettier konfigurace
- Build scripty

## 🎯 Instalace v tvém projektu

### 1. Extrahuj archiv

```bash
# Ve tvé složce
cd "/Users/lexislav/Projekty/Slevomat/"
tar -xzf minis-design-system.tar.gz
cd minis-design-system
```

### 2. Nainstaluj závislosti

```bash
pnpm install
```

### 3. Build tokeny

```bash
cd packages/tokens
pnpm build
cd ../..
```

### 4. Spusť Storybook

```bash
pnpm storybook
```

Otevře se na `http://localhost:6006`

## 🎨 Aktualizace tokenů z Figmy

### Export z Figmy
1. V Figma použij Design Tokens plugin
2. Exportuj CSS
3. Nahraj do správných složek:
   - Light mode → `packages/tokens/src/foundation/light/`
   - Dark mode → `packages/tokens/src/foundation/dark/`

### Rebuild
```bash
cd packages/tokens
pnpm build
```

Komponenty se aktualizují automaticky! ✨

## 🧩 Vývoj komponent

### Přidání nové komponenty

1. Vytvoř složku v `packages/components/src/components/[název]/`
2. Vytvoř soubory:
   - `[název].ts` - Lit komponenta
   - `[název].styles.ts` - Styly s tokeny
   - `[název].stories.ts` - Storybook stories

3. Exportuj v `packages/components/src/index.ts`

### Příklad nové komponenty

```typescript
// packages/components/src/components/input/input.ts
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('minis-input')
export class MinisInput extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    
    input {
      padding: var(--spacing-inset-sm);
      border: 1px solid var(--color-border);
      border-radius: var(--border-radius-md);
    }
  `;

  @property() value = '';
  @property() placeholder = '';

  render() {
    return html`
      <input 
        .value=${this.value}
        placeholder=${this.placeholder}
      />
    `;
  }
}
```

## 🤖 AI Prototyping

### Pro Cursor

1. Otevři `docs/ai-prompts/index.md`
2. Vyber komponentu/pattern/template
3. Zkopíruj AI prompt
4. Vlož do Cursoru

### Pro Claude Code

```bash
# V terminálu
claude-code docs/ai-prompts/components/button.md

# Prompt
"Vytvoř login stránku s button komponentou podle této dokumentace"
```

## 📚 Struktura projektu

```
minis-design-system/
├── packages/
│   ├── tokens/              ← Design tokeny (CSS)
│   │   ├── src/
│   │   │   ├── foundation/
│   │   │   │   ├── light/   ← Light mode barvy
│   │   │   │   └── dark/    ← Dark mode barvy
│   │   │   ├── layout/      ← Spacing, Border, Elevation
│   │   │   ├── breakpoints/ ← Responzivní body
│   │   │   └── themes/      ← Themes (default, gift)
│   │   └── dist/            ← Build output
│   │
│   └── components/          ← Web Components (Lit)
│       ├── src/
│       │   └── components/
│       │       └── button/  ← Příklad komponenty
│       └── dist/            ← Build output
│
├── apps/
│   └── storybook/           ← Dokumentace a prototypy
│
├── docs/
│   ├── ai-prompts/          ← AI dokumentace
│   │   ├── components/      ← Komponenty pro AI
│   │   ├── patterns/        ← Patterns pro AI
│   │   └── templates/       ← Templates pro AI
│   └── examples/            ← Hotové příklady
│
└── README.md                ← Tento soubor
```

## 🎨 Token Collections

### Foundation (Light/Dark modes)
- **Border** - `--color-border`, `--color-border-focus`, `--color-border-invalid`
- **Feedback** - `--color-feedback-error`, `--color-feedback-success`
- **Interaction** - `--color-interaction-primary-surface`, `--color-interaction-primary-hover-surface`
- **Surface** - `--color-surface-primary`, `--color-surface-faded`
- **Text** - `--color-text-primary`, `--color-text-secondary`
- **Background** - `--color-background`

### Layout (Responzivní)
- **Spacing** - `--spacing-xs` až `--spacing-3xl`, `--spacing-inset-*`, `--spacing-stack-*`
- **Border** - `--border-radius-*`, `--border-width-*`
- **Elevation** - `--elevation-xs` až `--elevation-xl`

### Breakpoints
- `--breakpoint-xs` (320px) až `--breakpoint-2xl` (1536px)

## 🔄 Workflow

### 1. Design v Figmě
Uprav barvy, spacing, typography

### 2. Export tokenů
Export CSS z Figmy → Nahraj do `src/`

### 3. Build
```bash
cd packages/tokens && pnpm build
```

### 4. Komponenty se updatují
Automaticky používají nové tokeny! ✨

### 5. Testuj ve Storybook
```bash
pnpm storybook
```

## 🎯 Příští kroky

1. ✅ Projekt je připraven
2. ⬜ Nahraj do svého repozitáře
3. ⬜ Přidej další komponenty (Input, Card, Modal...)
4. ⬜ Vytvoř patterns (Form Group, Hero Section...)
5. ⬜ Vytvoř templates (Dashboard, Auth Page...)
6. ⬜ Rozšiř AI dokumentaci

## 📝 Poznámky

- **Tokeny jsou aktuální** - Obsahují všechny hodnoty z Figma JSON
- **Button je plně funkční** - Všechny varianty (primary, secondary, tertiary, danger, cta-buy)
- **Storybook ready** - Přepínání light/dark mode v toolbaru
- **AI dokumentace připravena** - Použitelná v Cursor, Claude Code
- **Příklad landing page** - V `docs/examples/simple-landing.html`

## 🚀 Hotovo!

Projekt **Mini*S Design System** je kompletně připraven!

**Ke stažení:** `minis-design-system.tar.gz`
