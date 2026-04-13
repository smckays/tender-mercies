# A Life of Tender Mercies

A static memoir website for *A Life of Tender Mercies* by Dee Stevens.

## Structure

```
tender-mercies/
├── index.html          Home / cover page
├── contents.html       Table of contents
├── chapter-1.html      The Summer That Changed Everything
├── chapter-2.html      The Night the Rain Stopped
├── chapter-3.html      The Call I Prayed For
├── chapter-4.html      Learning to Love Someone You Don't Like
├── chapter-5.html      The Gift of a Photographic Memory
├── css/
│   └── styles.css      Full design system and component library
├── js/
│   └── nav.js          Sticky header, scroll arrow, subscribe form
├── netlify.toml        Netlify publish config and headers
└── README.md           This file
```

## Hosting

Deployed via [Netlify](https://netlify.com). The publish directory is the repo root (`.`). To deploy:

1. Push this repository to GitHub (or GitLab / Bitbucket).
2. In the Netlify dashboard, connect the repository.
3. Build command: *(leave blank — no build step)*
4. Publish directory: `.`

Netlify will also pick up `netlify.toml` automatically.

## Design System

CSS custom properties are defined in `css/styles.css`:

| Variable | Value | Use |
|---|---|---|
| `--ink` | `#1a1612` | Darkest text |
| `--ink-soft` | `#3d3530` | Body text |
| `--ink-muted` | `#7a6e68` | Labels, captions |
| `--paper` | `#faf7f2` | Page background |
| `--paper-warm` | `#f5f0e8` | Block backgrounds |
| `--accent` | `#8b3a2a` | Primary accent (rust red) |
| `--accent-soft` | `#c4785f` | Secondary accent |
| `--rule` | `#d9d0c4` | Borders and dividers |
| `--night` | `#111820` | Dark backgrounds |

**Fonts** (loaded via Google Fonts):
- Playfair Display — titles, pull quotes
- Source Serif 4 — body text
- Crimson Pro — labels, notes, captions

## Components

All reusable components are CSS classes in `styles.css`:

- `.scene-break` — centered `· · ·` divider
- `.pull-quote` — left-bordered italic quotation
- `.dark-block` — full-bleed dark background block
- `.inset-block` — warm background aside with label
- `.chapter-note` — "A Note for the Grandkids" box
- `.prayer-list` — bordered list with bold small-caps labels
- `.envelope-block` — styled letter/document block
- `.floor-moment` — centered bordered set-piece text
- `.data-grid` — 2×2 fact grid
- `.sneak-list` — checklist with accent checkmarks

## Adding New Chapters

1. Copy any existing `chapter-N.html` as a template.
2. Update the `<title>`, `<meta name="description">`, `.series-label`, `.chapter-number`, `h1.chapter-title`, `.chapter-byline`, and body content.
3. Update the Prev/Next nav links at the bottom.
4. Add the chapter entry to `contents.html` (remove the `chapter-entry--coming` class and update the badge text to "Available").

## No build step

Pure HTML, CSS, and vanilla JS. No frameworks, no bundler, no dependencies.
