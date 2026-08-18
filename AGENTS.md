# Edulogia Project Guidelines

Welcome to the Edulogia codebase! This document provides persistent instructions for any AI agents (or developers) working on this project.

## Project Architecture
- **Framework:** React 18+ with Vite (TypeScript).
- **Styling:** Tailwind CSS with a custom "brutalist/playful" design system.
- **Routing:** React Router (`react-router-dom`).
- **Internationalization (i18n):** `react-i18next` with translation files located in `src/locales/`.

## Design System & UI Conventions
- **Colors:** Primary brand colors are defined in `tailwind.config.js`: `brand-pink`, `brand-yellow`, `brand-blue`.
- **Custom Classes:** Use `.chunky-box` (for card/container borders and dropping shadows) and `.chunky-btn` (for buttons) to maintain the bold, friendly visual style.
- **Typography:** Display fonts for headers (`font-display`), Sans for body text (`font-sans`).
- **Icons:** Use `lucide-react`.

## Content Management (Blog & Resources)
- **Blog Posts:** Markdown files located in `src/content/blog/`. Contains YAML frontmatter (`title`, `excerpt`, `date`, `tags`, `imageUrl`, `draft`, `slug`).
- **Resources:** Markdown files located in `src/content/resources/`. Contains YAML frontmatter (`title`, `description`, `date`, `tags`, `icon`, `resource_url`, `featured`, `draft`, `slug`).
- **Media / Images:** Place local image assets in `public/images/` and reference them using absolute paths (e.g., `/images/my-image.png`).
- **Pagination & Sorting:** Both Blog and Resources sections feature chronological sorting and pagination (displaying 9 items per page).
- **Internationalization (i18n):** For static UI text, use the `t()` function and update `src/locales/en.json` and `src/locales/it.json`. For content titles and excerpts, bilingual formats (e.g., `English Title | Titolo Italiano`) are encouraged.
- **Agent SOPs:** See `HOW_TO_POST.md` for detailed instructions on drafting, publishing, and synchronizing the repository via `EDULOGIA_SITE_PATH`.

## Deployment & Hosting
- **GitHub Pages SPA Routing:** The application is hosted on GitHub Pages. To support direct links (deep linking) with React Router, the build script automatically copies `dist/index.html` to `dist/404.html`. This ensures GitHub Pages falls back to the React app for unrecognized paths, allowing the client-side router to take over.

## Guidelines for Making Changes
1. **Adding Content:** Create a new `.md` file in the respective `src/content/` directory using the language-suffixed naming convention: `YYYYMMDD-slug.en.md` (or `.it.md`). Set `draft: true` while working on it. Consult `HOW_TO_POST.md` for full frontmatter templates.
2. **Styling Components:** Do not use default or generic soft styles. Stick to the distinct high-contrast, thick border (`border-3 border-slate-900`) and solid shadow patterns seen across the app.
3. **Agent Updates:** Always ensure this `AGENTS.md` file reflects the current design constraints, page structure (e.g., preserving the layout of the Home, Blog, Resources, and About pages), and roadmap features.
