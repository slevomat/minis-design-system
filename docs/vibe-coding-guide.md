# Vibe Coding Guide

Build fully functional page prototypes using Mini*S components and an AI coding assistant — **no coding experience required**. You describe what you want in natural language, and the AI writes the HTML and CSS for you.

> **What is vibe coding?** You use an AI tool (Claude Code, Cursor) to generate code by describing the design you want. The AI knows all Mini*S components, tokens, and layout patterns — you just tell it what to build.

---

## Quick Start (5 minutes)

> **Using Claude Code? The easiest way to start is the `minis-app` skill.** Open Claude Code in the design system repo and just say what you want — for example *"Build me an app for handling refund requests"* or *"Make a landing page for the summer campaign"*. The skill asks what you're building, sets up the project, picks the right topbar, builds your screens from the component docs, and checks the result in a browser (desktop, mobile and dark mode) before telling you it's done. You can also call it by name: `/minis-app`.
>
> The skill lives in the design system repo at `.claude/skills/minis-app/`. To use it from any other folder, copy it once (and again whenever the design system changes):
>
> ```bash
> cp -r <design-system-repo>/.claude/skills/minis-app ~/.claude/skills/
> ```

Prefer to do it by hand, or using Cursor? Get a working prototype running in three steps.

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

This creates a complete project folder with all Mini*S components, tokens, icons, and AI documentation pre-loaded. Pick a folder that doesn't exist yet — the command never overwrites an existing one.

### Step 3 — Start coding

```bash
cd ~/prototypy/my-deal-page
pnpm install
pnpm dev
```

Open `http://localhost:5173` in your browser — you should see a sample Slevomat deal page with the topbar, the main navigation, a photo gallery, tabs, and a few buttons. Now open the same folder in your AI tool and start describing what you want to build.

> **Not building a Slevomat web page?** The sample is a page of the Slevomat website, so it starts with the website topbar and the main navigation. For any other app, tell the AI so in your first prompt — see [Choosing the topbar](#choosing-the-topbar).

---

## Comprehensive Tutorial

### What you get in the project

The scaffolded project contains:

| File / Folder | Purpose |
|--------------|---------|
| `index.html` | Your page — edit this file to build your prototype |
| `CLAUDE.md` | AI context file — automatically read by Claude Code and Cursor. Contains the page rules, a component overview, token reference, and page structure patterns. |
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

#### Starting an app that isn't the Slevomat website

```
"This is an internal tool called Refund Console, not a Slevomat web page.
Switch the topbar to vibe-apps with that app name and remove the main navigation.
Then show a list of refund requests, each row with a checkbox."
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

"Make the navigation item 'Cestování' active instead of 'Extra slevy'."

"Add a yellow page header under the navigation with the title 'Letní slevy'."

"Remove the description section and replace it with a tab switcher
that has three tabs: Overview, Reviews, Location."
```

---

### Available Components

These are all the building blocks you can use. The AI knows them all — just describe what you need and reference component names if you want to be specific:

| Component | What it looks like | Key variants |
|-----------|-------------------|-------------|
| **Topbar** | The bar at the very top of every page. On the website: logo, optional search and action buttons (favourites, cart). In an app: logo and the app's name. | `web` (Slevomat website), `vibe-apps` + `app-name` (any other app) — see [Choosing the topbar](#choosing-the-topbar) |
| **Navigation** | Category menu or tab switcher. Scrolls sideways on narrow screens; on wide ones the main nav folds extra items into a "Další" menu. | `main-nav` (the site menu, under the topbar), `tabs` (in-page tab switcher). `horizontal` is an old name for `main-nav` — it still works, but don't use it. |
| **Page Header** | Big coloured hero banner with a heading, optional photo, badge seal, search box or category tags | Layouts: `inspirations` (with search), `content-left` (no search or filters), `centric` (no photo, category tags). Themes: `brand`, `blue`, `yellow`, `pink`, `green`, `summer` |
| **Container** | Centered content wrapper with responsive padding | `default` (wide), `narrow` (checkout-width) |
| **Button** | Clickable button with optional icon and counter badge | `primary`, `secondary`, `tertiary`, `danger`, `cta-buy` (green), `transparent` · sizes `sm`, `md` (default), `lg`, `xl` |
| **Tag** | Compact pill label | `static`, `clickable`, `toggle` (like/favourite), `dismissible` |
| **Alert** | Colored banner with icon for feedback messages | `notice` (blue), `success` (green), `error` (red), `warning` (yellow) |
| **Message** | Notification card with image, title, description (design still a draft) | `vertical`, `horizontal` layout |
| **Accordion** | FAQ-style list of rows that open and close: bold heading, blue chevron | Sizes `default`, `compact` (no side padding) · `single` = only one row open at a time |
| **Action Row** | Clickable row for vertical menus and filter lists, with an optional counter | `none`, `icon`, `checkbox` · `desktop` or `xs` (mobile) row |
| **Checkbox** | Tick box with a label | Unchecked, checked, or indeterminate (a dash) |
| **Menu** | A labelled button that opens a small dropdown panel | Panel opens from the `start` or `end` edge. No Figma design yet. |
| **Tile** | Vertical tile with a big icon and a label — for shortcuts, usually in a grid | No variants; optional link and counter |
| **Badge** | Decorative scalloped seal with a white checkmark | Colours `brand`, `yellow`, `summer`, `pink` (default), `green`, `blue` · sizes `sm`, `md`, `xl` (default) |
| **Card Grid** | Responsive grid for cards | `navigation` (featured), `navigation-small`, `photogallery` |
| **Pill Counter** | Small numeric badge (usually inside buttons) | Sizes: `xs`, `sm`, `md` (default), `lg` |
| **Icon** | SVG icon from the icon library | Set `name` (e.g. "heart-fill", "cart-fill", "star") and optional `size` in pixels (default 24) |

> **Sizes are always short codes** — `sm`, `md`, `lg` and so on, never `small` or `large`. A full word is silently ignored and the component falls back to its default size. The one exception is the accordion, which uses `default` and `compact`.

Browse the **Components** section in [Storybook](https://slevomat.github.io/minis-design-system/) to see live interactive examples of each component.

---

### Page structure

Every Mini*S page follows a consistent structure. The AI already knows this, but it helps to understand the building blocks. A Slevomat web page looks like this:

```
┌─────────────────────────────────────────────┐
│  TOPBAR — Slevomat logo + Favorites + Cart  │  every page
├─────────────────────────────────────────────┤
│  NAVIGATION — Extra slevy | Cestování | ... │  Slevomat web pages only,
│                                             │  exactly once
├─────────────────────────────────────────────┤
│  PAGE HEADER — coloured hero banner         │  one per page, full width,
│                                             │  outside the container
├─────────────────────────────────────────────┤
│                                             │
│  CONTAINER — Your page content goes here    │
│                                             │
│    Headings, text, buttons, alerts,         │
│    grids, cards, tabs...                    │
│                                             │
└─────────────────────────────────────────────┘
  The whole page sits on var(--color-background)
```

#### Choosing the topbar

Every page starts with a topbar — never a home-made header, and never no header at all. Which one depends on a single question: **is this a page of the Slevomat website?**

| You are building… | Topbar | Main navigation |
|---|---|---|
| A page of the **Slevomat website** — category, campaign, deal, checkout… | `variant="web"` | Required, directly under the topbar |
| **Any other app** — internal tool, dashboard, admin, client-facing app, one-off prototype | `variant="vibe-apps"` with `app-name="Your app name"` | Optional — only if the app really has top-level sections |

If you're not sure, it's almost certainly the second row: most things you build that have a name of their own are apps, not website pages.

#### The main navigation appears once, at the top

On a Slevomat web page, the main navigation (`variant="main-nav"`) goes directly under the topbar — **exactly once per page**, never lower down. Switching between sections *inside* a page (product tabs, filters) uses the tab switcher (`variant="tabs"`) instead, which can appear as many times as you need.

#### The page background is a token, never a colour

The page background is always `var(--color-background)` — never white, and never a colour code. That token is what makes dark mode and the colour themes work; a fixed colour quietly switches them off. Cards and panels sitting *on top of* the page use `var(--color-surface-primary)`. If you want "a white page", ask the AI for the background token instead.

#### The page header goes outside the container

The page header (the big coloured hero) is the first thing under the topbar and navigation. A page has only one, and it sits **outside** the content container — it runs the full width of the screen and handles its own padding.

---

### Tips for effective prompting

| Do | Don't |
|----|-------|
| Say **what you're building** — a Slevomat web page or another app — so the AI picks the right topbar | Ask for a white page or a colour code for the background — ask for the background token |
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
| Console error saying `minis-icon` "has already been defined" | The page loads the icons twice. The components script already includes every icon — remove the extra `<script>` tag for `/vendor/icons/index.js`. |
| `pnpm dev` fails | Run `pnpm install` first. If that fails, check that Node.js and pnpm are installed. |
| `create-prototype` says "Missing built packages" | Run `pnpm build` in the design system repo first — the CLI copies built files. |
| `create-prototype` says "Directory already exists" | Choose a new folder name. The command never overwrites an existing folder. |
| Colors or fonts look wrong | Make sure the `<link>` tags for tokens CSS and Google Fonts are in the `<head>`. The template includes them by default. |
| In dark mode, part of the page stays light | Something uses a fixed colour instead of a token. Ask the AI to replace it — the page background must be `var(--color-background)`. |
| A size you asked for has no effect | Sizes are short codes (`sm`, `md`, `lg`…). A full word like `small` or `large` is ignored and the default size is used. |
| Banner headlines aren't in the Slevomat brand font | Expected: Kensington is proprietary and not shipped, so headlines fall back to Bebas Neue. To get the real face, install Kensington on your machine or drop the woff2 into the design system's `packages/tokens/src/fonts/` and re-run `pnpm build` before scaffolding — see `packages/tokens/src/fonts/README.md`. |
| The AI doesn't know a component | Point it to the docs: *"Read docs/ai-prompts/components/button.md for the button API"* |

---

### Example workflow

Here's a typical 15-minute session building a deal detail page:

1. **Scaffold:** in the design system repo, `pnpm build` (first time only), then `pnpm create-prototype ~/prototypy/hotel-deal`
2. **Start:** `cd ~/prototypy/hotel-deal && pnpm install && pnpm dev`
3. **Open AI tool** in the project folder
4. **Prompt:** *"Replace the sample content with a hotel deal page. Show a big photo at the top, the hotel name, price with a green buy button, and a description."*
5. **Review** in browser at localhost:5173
6. **Refine:** *"Add a tab switcher below the photo with tabs: Overview, Reviews, Map. Show the overview tab content by default."*
7. **Refine:** *"Add a success alert at the top saying 'Last 3 vouchers available!'"*
8. **Refine:** *"Make it look more like the Slevomat deal page — add a sidebar with the price card on the right."*
9. **Done!** Share the HTML file or keep iterating.

In Claude Code you can skip steps 1–3: ask the `minis-app` skill for *"a hotel deal page on the Slevomat website"* and continue from step 5.

---

**Need help?** Ask the design system team or Head of Design: Michal — michal.strnadel@slevomat.cz

[Live Storybook](https://slevomat.github.io/minis-design-system/) · [GitHub](https://github.com/slevomat/minis-design-system)
