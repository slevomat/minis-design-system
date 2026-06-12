# Alert Component — AI Prompt Reference

## Component Overview

**Tag:** `<minis-alert>`
**Description:** Contextual feedback component. Communicates status to users inline — mostly used for form field validation.

---

## API

### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `variant` | `notice \| success \| error \| warning` | `notice` | Visual style — communicates the nature of the message |
| `no-icon` | boolean | `false` | Hide the variant icon (shown by default) |

### Slots

| Slot | Description |
|------|-------------|
| `(default)` | Alert message text |

---

## Design Tokens Used

| Token | Description |
|-------|-------------|
| `--alert-color-border` | Notice variant border |
| `--alert-color-surface` | Notice variant background |
| `--alert-sucess-color-border` | Success variant border *(note: typo in token name)* |
| `--alert-sucess-color-surface` | Success variant background |
| `--alert-error-color-border` | Error variant border |
| `--alert-error-color-surface` | Error variant background |
| `--alert-warning-color-border` | Warning variant border |
| `--alert-warning-color-surface` | Warning variant background |
| `--alert-padding-x` | Horizontal padding |
| `--alert-padding-y` | Vertical padding |
| `--alert-gap` | Gap between icon and text |
| `--border-radius-md` | Corner radius |
| `--color-text-primary` | Message text colour |

---

## Usage Examples

### Basic

```html
<minis-alert variant="notice">Your session will expire in 5 minutes.</minis-alert>
<minis-alert variant="success">Profile updated successfully.</minis-alert>
<minis-alert variant="error">Please fix the errors below.</minis-alert>
<minis-alert variant="warning">This action cannot be undone.</minis-alert>
```

### Without icon

```html
<minis-alert variant="error" no-icon>Required field.</minis-alert>
```

### In a form (typical use case)

```html
<label>Email</label>
<input type="email" />
<minis-alert variant="error">Please enter a valid email address.</minis-alert>
```

---

## AI Copy-Paste Prompt

```
Create a form with Mini*S alert components for validation feedback.
Use <minis-alert> with:
- variant="error" for invalid fields
- variant="success" for valid fields
- variant="notice" for informational hints
- variant="warning" for destructive actions
Icon is shown by default; add the `no-icon` attribute to hide it.
Load tokens: <link rel="stylesheet" href="node_modules/@minis/tokens/dist/tokens.css">
Import component: import '@minis/components';
```

---

## Accessibility

- `notice` and `success` render with `role="status"` (polite announcement)
- `error` and `warning` render with `role="alert"` (assertive announcement)
- Icon SVGs are `aria-hidden="true"` — text content conveys the message
- Always provide meaningful text in the default slot

---

## Do's and Don'ts

**Do:**
- Use `error` for form validation failures
- Use `notice` for neutral hints and help text
- Use `success` to confirm a completed action
- Use `warning` before destructive or irreversible actions

**Don't:**
- Don't use `warning` for errors — use `error`
- Don't rely only on the icon colour to convey meaning — always include text
- Don't hide the icon on `error` alerts in critical validation flows

---

**Last updated:** 2026-02-27
