# Vibe Coding Guide

Build fully functional page prototypes using Mini*S components and an AI coding assistant — **no coding experience required**. You describe what you want in natural language, and the AI writes the HTML and CSS for you.

> **What is vibe coding?** You use an AI tool (Claude Code, Cursor) to generate code by describing the design you want. The AI knows all Mini*S components, tokens, and layout patterns — you just tell it what to build.

---

## Quick Start (5 minutes)

Get a working prototype running in three steps.

### Step 1 — Prerequisites

You need two things installed on your machine:

| Tool | What it does | Install |
|------|-------------|---------|
| **Node.js** | Runs the dev server | [nodejs.org](https://nodejs.org) (LTS version) |
| **pnpm** | Installs dependencies | `npm install -g pnpm` (run in Terminal after installing Node.js) |

You also need an AI coding tool — pick one:

| Tool | Best for | Link |
|------|---------|------|
| **Claude Code** | Terminal-based, runs in your project directory, reads CLAUDE.md automatically | [docs.anthropic.com](https://docs.anthropic.com/en/docs/claude-code) |
| **Cursor** | Visual editor with AI chat sidebar, good for seeing code + preview side by side | [cursor.com](https://cursor.com) |

### Step 2 — Scaffold the project

Open Terminal, navigate to the design system repo, and run:

```bash
# Make sure packages are built first (one-time)
pnpm build

# Create your prototype project
pnpm create-prototype ~/prototypy/my-deal-page
```

This creates a complete project folder with all Mini*S components, tokens, icons, and AI documentation pre-loaded.

### Step 3 — Start coding

```bash
cd ~/prototypy/my-deal-page
pnpm install
pnpm dev
```

Open `http://localhost:5173` in your browser — you should see a page with the Slevomat topbar, navigation, and sample components. Now open the same folder in your AI tool and start describing what you want to build.

---

## Comprehensive Tutorial

### What you get in the project

The scaffolded project contains:

| File / Folder | Purpose |
|--------------|---------|
| `index.html` | Your page — edit this file to build your prototype |
| `CLAUDE.md` | AI context file — automatically read by Claude Code and Cursor. Contains component list, token reference, and page structure patterns. |
| `public/vendor/` | Pre-built design system files (tokens CSS, components JS, icons JS). Don't edit these. |
| `docs/ai-prompts/` | Detailed API docs for every component — the AI reads these to know exactly how each component works. |

---

### How to talk to the AI

The AI understands natural language. You don't need to know HTML, CSS, or any code syntax. Here are examples of effective prompts:

#### Starting a page

```
"Replace the sample content with a deal detail page. It should have:
- Photo gallery at the top (use placeholder images)
- Deal title and price
- A green CTA Buy button
- Description section with bullet points
- An info alert saying 'Limited time offer'"
```

#### Modifying a section

```
"Add a sidebar to the right of the main content.
Put a secondary button 'Add to favorites' with a heart icon,
and below it show 3 message cards with deal highlights."
```

#### Styling and layout

```
"Make the content area a two-column layout:
60% main content on the left, 40% sidebar on the right.
Add some spacing between sections.
Use the light grey background for the sidebar."
```

#### Iterating quickly

```
"The buttons are too close together — add more space between them."

"Change the alert from notice to success and update the text."

"Make the navigation item 'Cestovani' active instead of 'Extra slevy'."

"Remove the description section and replace it with a tab switcher
that has three tabs: Overview, Reviews, Location."
```

---

### Available Components

These are all the building blocks you can use. The AI knows them all — just describe what you need and reference component names if you want to be specific:

| Component | What it looks like | Key variants |
|-----------|-------------------|-------------|
| **Topbar** | Top blue logo bar with action buttons (favorites, cart) | Slots: logo, actions |
| **Navigation** | Horizontal scrollable category nav or tab switcher | `horizontal` (categories), `tabs` (tab switcher) |
| **Container** | Centered content wrapper with responsive padding | `default` (wide), `narrow` (checkout-width) |
| **Button** | Clickable button with optional icon and counter badge | `primary`, `secondary`, `tertiary`, `danger`, `cta-buy` (green) |
| **Tag** | Compact pill label/badge | `static`, `clickable`, `toggle` (like/favourite), `dismissible` |
| **Alert** | Colored banner with icon for feedback messages | `notice` (blue), `success` (green), `error` (red), `warning` (yellow) |
| **Message** | Notification card with image, title, description | `vertical`, `horizontal` layout |
| **Icon** | SVG icon from the icon library | Set `name` (e.g. "heart-fill", "cart-fill", "star") and optional `size` |
| **Card Grid** | Responsive grid for cards | `navigation` (featured), `navigation-small`, `photogallery` |
| **Pill Counter** | Small numeric badge (usually inside buttons) | Sizes: `xs`, `sm`, `md` |

Browse the **Components** section in [Storybook](https://slevomat.github.io/minis-design-system/) to see live interactive examples of each component.

---

### Page structure

Every Slevomat page follows a consistent structure. The AI already knows this, but it helps to understand the building blocks:

```
┌─────────────────────────────────────────────┐
│  TOPBAR — Slevomat logo + Favorites + Cart  │
├─────────────────────────────────────────────┤
│  NAVIGATION — Extra slevy | Cestovani | ... │
├─────────────────────────────────────────────┤
│                                             │
│  CONTAINER — Your page content goes here    │
│                                             │
│    Headings, text, buttons, alerts,         │
│    grids, cards...                          │
│                                             │
└─────────────────────────────────────────────┘
```

---

### Tips for effective prompting

| Do | Don't |
|----|-------|
| Describe the **layout** you want: "two columns, sidebar on the right" | Write HTML or CSS yourself — let the AI do it |
| Reference **component names** when you know them: "add a cta-buy button" | Worry about exact code syntax — the AI handles that |
| Iterate in **small steps**: change one section at a time | Try to describe an entire complex page in one prompt |
| Ask the AI to **"check the Storybook"** for visual reference | Edit files in `public/vendor/` — those are the design system source |
| Say **"undo that"** or **"go back"** if something looks wrong | Be afraid to experiment — nothing can break permanently |

---

### Adding more pages

Your prototype can have multiple pages. Ask the AI:

```
"Create a new page called checkout.html with the same header and navigation,
but use a narrow container and add tabs for Step 1, Step 2, Step 3."
```

The AI will create a new HTML file, copy the shared header structure, and update navigation links between pages.

---

### Working with Figma

If you have a Figma design you want to replicate:

1. Share the Figma frame URL with the AI
2. Ask: *"Build this design using Mini*S components. Use the Figma MCP to read the design."*
3. The AI will read the Figma frame and translate it into Mini*S components

> **Note:** This requires Figma MCP to be configured in your AI tool. Ask the design system team for setup help if needed.

---

### Troubleshooting

| Problem | Solution |
|---------|----------|
| Components show as empty/unstyled boxes | Check browser console for errors. The import map in `index.html` must be present. Ask the AI to fix it. |
| `pnpm dev` fails | Run `pnpm install` first. If that fails, check that Node.js and pnpm are installed. |
| `create-prototype` says "Missing built packages" | Run `pnpm build` in the design system repo first — the CLI copies built files. |
| Colors or fonts look wrong | Make sure the `<link>` tags for tokens CSS and Google Fonts are in the `<head>`. The template includes them by default. |
| Banner headlines aren't in the Slevomat brand font | Expected: Kensington is proprietary and not shipped, so headlines fall back to Bebas Neue. To get the real face, install Kensington on your machine or drop the woff2 into the design system's `packages/tokens/src/fonts/` and re-run `pnpm build` before scaffolding — see `packages/tokens/src/fonts/README.md`. |
| The AI doesn't know a component | Point it to the docs: *"Read docs/ai-prompts/components/button.md for the button API"* |

---

### Example workflow

Here's a typical 15-minute session building a deal detail page:

1. **Scaffold:** `pnpm create-prototype ~/prototypy/hotel-deal`
2. **Start:** `cd ~/prototypy/hotel-deal && pnpm install && pnpm dev`
3. **Open AI tool** in the project folder
4. **Prompt:** *"Replace the sample content with a hotel deal page. Show a big photo at the top, the hotel name, price with a green buy button, and a description."*
5. **Review** in browser at localhost:5173
6. **Refine:** *"Add a tab switcher below the photo with tabs: Overview, Reviews, Map. Show the overview tab content by default."*
7. **Refine:** *"Add a success alert at the top saying 'Last 3 vouchers available!'"*
8. **Refine:** *"Make it look more like the Slevomat deal page — add a sidebar with the price card on the right."*
9. **Done!** Share the HTML file or keep iterating.

---

**Need help?** Ask the design system team or Head of Design: Michal — michal.strnadel@slevomat.cz

[Live Storybook](https://slevomat.github.io/minis-design-system/) · [GitHub](https://github.com/slevomat/minis-design-system)
