# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Changed

- **Alert**: updated typography to use design tokens — `--typography-font-family-sans` (Inter), `--typography-weight-regular`, `--typography-line-height-percentage-133%` (1.33)
- **Alert**: icon and text use `align-items: flex-start`; when icon is visible, content gets `margin-top/bottom: var(--pixel-px-3)` (3px) for optical alignment with the icon
- **Alert (Storybook)**: added Figma link (`node-id=2513-8007`) to the component docs page, consistent with Button and Pill Counter

## 2026-03-07

### Button

- **Accessibility fix**: ARIA attributes (`aria-label`, `aria-labelledby`, `aria-describedby`) set on `<minis-button>` are now forwarded to the inner `<button>` element. Screen readers will correctly announce icon-only buttons with `aria-label`.
- **Accessibility fix**: In `icon-only` mode the label `<slot>` is now visually hidden (`.visually-hidden` pattern) instead of removed from the DOM, so any slotted text is preserved in the accessibility tree and contributes to the button's accessible name.
- Host element gets `role="none"` to avoid a redundant button role announcement from the custom element wrapper.
