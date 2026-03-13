# Changelog

All notable changes to this project will be documented in this file.

## 2026-03-13

### Tag

- **New component** `<minis-tag>` — compact pill-shaped label with four variants:
  - `static` — read-only label (default), rendered as a `<div>`
  - `clickable` — lightweight action (open modal/tooltip), rendered as a `<button>`; returns to default state after click, no persistent state
  - `toggle` — toggle/checkbox-style button, rendered as `<button aria-pressed>`; persists pressed state, fires `toggle` event with `{ pressed: boolean }` detail; icon typically switches outline ↔ filled (e.g. `heart` ↔ `heart-fill`)
  - `dismissible` — applied filter with built-in ✕ button; fires `dismiss` event
- Fixed height `32px`; typography fully inherited from context
- Icon slot sizes: `20×20px` for static/clickable/dismissible, `24×24px` for toggle
- Padding: `4px` vertical, `6px` horizontal; gap `4px`
- `pressed` boolean attribute for pre-selected toggle state (`toggle` variant only)
- `disabled` boolean attribute (`clickable` and `toggle` variants)
- All colours via `--color-interaction-secondary-*` tokens — light/dark mode automatic
- AI prompt doc: `docs/ai-prompts/components/tag.md`

### Tokens

- **Tag component tokens** added to `packages/tokens/src/tokens.css`: `--tag-height`, `--tag-padding-x`, `--tag-padding-y`, `--tag-gap-elements`, `--tag-icon-size`, `--tag-toggle-icon-size`

### Storybook

- **Story source panel**: added `docs.source.excludeDecorators: true` globally in `preview.ts` — decorator wrapper div no longer appears in the "Show code" examples, so users see only the component markup when copying code snippets.

## [Unreleased]

### Changed

- **Alert**: updated typography to use design tokens — `--typography-font-family-sans` (Inter), `--typography-weight-regular`, `--typography-line-height-percentage-133%` (1.33)
- **Alert**: icon and text use `align-items: flex-start`; when icon is visible, content gets `margin-top/bottom: var(--pixel-px-3)` (3px) for optical alignment with the icon
- **Alert (Storybook)**: added Figma link (`node-id=2513-8007`) to the component docs page, consistent with Button and Pill Counter

## 2026-03-12

### Button

- **`size` fallback**: `size` property now normalises invalid or missing values to `'medium'` via a setter. Attribute is reflected so CSS selectors always match a valid value.

### Message

- **Vertical layout redesign**: replaced column-flex + absolute-positioned close button with a proper flex-row structure: visual left, body column right (`.body` = column: `.header` row with title + close button, then description below).
- **Close button alignment**: `.header` uses `align-items: flex-start` so the close button aligns with the top of the title text.
- **Bug fix**: close button was using invalid `size="md"` — corrected to `size="medium"`.
- **AI prompt doc**: added `docs/ai-prompts/components/message.md`.

## 2026-03-07

### Button

- **Accessibility fix**: ARIA attributes (`aria-label`, `aria-labelledby`, `aria-describedby`) set on `<minis-button>` are now forwarded to the inner `<button>` element. Screen readers will correctly announce icon-only buttons with `aria-label`.
- **Accessibility fix**: In `icon-only` mode the label `<slot>` is now visually hidden (`.visually-hidden` pattern) instead of removed from the DOM, so any slotted text is preserved in the accessibility tree and contributes to the button's accessible name.
- Host element gets `role="none"` to avoid a redundant button role announcement from the custom element wrapper.
