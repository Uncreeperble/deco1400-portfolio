# Ben Evans — Portfolio Website

**DECO1400 — Introduction to Web Design**  
University of Queensland  
Student: Ben Evans · Student No. 48828514

---

## Overview

A personal portfolio website built with plain HTML, CSS and JavaScript — no frameworks or build tools required. The site showcases (fictional) software engineering projects, education history, employment experience, and contact information.

> **⚠️ Disclaimer — Demo Content**  
> All personal details, projects, employment history, academic results, and other information shown on this site are **entirely fictional and made up for demonstration purposes only**. They do not represent real facts about Ben Evans.

---

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero section + quick-navigation cards |
| Projects | `projects.html` | Filterable project grid with modal detail view |
| Education | `education.html` | University banner, GPA stats, course cards |
| Employment | `employment.html` | Timeline of internships & work experience |
| About | `about.html` | Personal story, image gallery, interests |
| Contact | `contact.html` | Contact methods, map embed, enquiry form |

---

## Tech Stack

- **HTML5** — semantic markup
- **CSS3** — custom design tokens, Flexbox, Grid, CSS animations
- **Vanilla JavaScript** — sidebar toggle, project filter, modal, form validation
- **Bootstrap Icons 1.11** — icon library (self-hosted, no CDN)
- **Inter** — typeface (self-hosted `.woff2`, no Google Fonts CDN)

All fonts and icons are bundled locally — the site works **fully offline** with no internet connection required.

---

## Project Structure

```
.
├── index.html           # Home
├── projects.html        # Projects
├── education.html       # Education
├── employment.html      # Employment
├── about.html           # About
├── contact.html         # Contact
│
├── css/
│   ├── style.css        # All styles (design tokens → mobile responsive)
│   └── fonts.css        # @font-face declarations for Inter
│
├── js/
│   ├── script.js        # Shared: sidebar toggle, contact form, hero fade
│   └── projects.js      # Projects page: filter tabs, modal, search
│
├── fonts/
│   ├── inter/           # Inter woff2 font file
│   └── bootstrap-icons/ # Bootstrap Icons CSS + woff2/woff font files
│
├── images/
│   ├── profile_image.png
│   ├── hero.png
│   └── ...              # Project / company images
│
└── files/
    └── resume.md        # Placeholder resume file
```

---

## Features

- **Responsive design** — fully mobile-friendly with a slide-in sidebar drawer on screens ≤ 768 px
- **Sidebar navigation** — fixed on desktop; opens/closes via hamburger button on mobile
- **Project filter** — filter by category (All / Web / AI / Mobile) with smooth card transitions
- **Project modal** — click any project card for a detailed overlay popup
- **Page fade animations** — subtle entrance animations on content load
- **Offline-capable** — no external CDN dependencies

---

## Running Locally

No build step needed — just open any HTML file in a browser:

```bash
open index.html
```

Or serve with any static file server, e.g.:

```bash
npx serve .
# → http://localhost:3000
```

---

## AI Assistance Disclosure

This project was developed with the assistance of **[Cline](https://github.com/cline/cline)**, an AI coding assistant integrated into VS Code. Cline was used to:

- Scaffold and refine HTML page structure
- Write and iterate on CSS (design tokens, layout, animations, media queries)
- Implement JavaScript functionality (sidebar toggle, project filter, modal)
- Debug mobile responsiveness issues
- Bundle fonts and icons for offline use
- Generate this README

All code was reviewed, directed and approved by the student throughout development.

---

## Licence

Created for academic assessment purposes. Not for commercial use.
