# Mini*S Design System - AI Prompt Library

Complete guide for using Mini*S with AI code generation tools (Cursor, Claude Code, etc.).

## Quick Navigation

### 📦 Components
Individual UI elements with props and variants.

- [Alert](./components/alert.md) - Contextual feedback: notice, success, error, warning
- [Button](./components/button.md) - Primary actions, variants, sizes, icon support, counter pill
- [Pill Counter](./components/pill-counter.md) - Numeric badge used in buttons and standalone

[→ All Components](./components/README.md)

### 🧩 Patterns
Composable UI patterns combining multiple components.

- [Card with Action](./patterns/card-with-action.md) - Card + Button pattern

[→ All Patterns](./patterns/README.md)

### 📄 Templates
Full page layouts and structures.

- [Landing Page](./templates/landing-page.md) - Marketing landing page

[→ All Templates](./templates/README.md)

## How to Use with AI

### For Cursor
```
Include the relevant .md file in your Cursor chat context, then:

"Create a login page using the Auth Page template from Mini*S"
```

### For Claude Code
```
Attach the .md file and prompt:

"Build a hero section following the Hero Section pattern, 
use the primary button for CTA, include heading and description"
```

## Design Token Usage

All components/patterns/templates use Mini*S tokens:

```html
<!-- Load tokens first -->
<link rel="stylesheet" href="node_modules/@minis/tokens/dist/index.css">

<!-- Or for dark mode -->
<link rel="stylesheet" href="node_modules/@minis/tokens/dist/foundation/dark.css">

<!-- Then use components -->
<script type="module">
  import '@minis/components';
</script>
```

## Development Workflow

1. **Select** component/pattern/template from this index
2. **Open** the relevant .md file
3. **Copy** the AI prompt or code example
4. **Paste** into your AI tool
5. **Customize** the generated code as needed

---

**Last updated:** 2026-02-27
