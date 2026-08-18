# Agent Instructions: Content Management

This document outlines the standard operating procedures for an AI agent to manage, draft, and publish content (Blog Posts and Resources) for the Edulogia project.

Both the Blog and Resources sections feature chronological sorting and pagination (displaying 9 items per page).

## 0. Repository Setup & Synchronization

Before managing any content, ensure you are working with the correct and most up-to-date repository:
1. Check the `EDULOGIA_SITE_PATH` environment variable. If the directory it points to does not exist, download or clone the Edulogia repository into that folder first.
2. Ensure you modify files under the directory pointed to by `EDULOGIA_SITE_PATH`. *(Note: All file paths mentioned below are relative to this repository root).*
3. **Always pull the repository locally** before creating or editing any blog posts or resources to ensure your local copy is fully synced with the remote version.
4. When finished, if explicitly instructed by the user, commit your changes and publish/push them to the remote repository.

## 1. Blog Posts

Blog posts are Markdown files located in the `src/content/blog/` directory. They are automatically parsed and displayed on the website based on two frontmatter fields: `draft` and `published`. A post is hidden from the live site if `draft: true` OR `published: false`.

### How to Create a New Draft Blog Post
1. Determine the current date and the post's slug.
2. Use an appropriate file creation tool to generate a new Markdown file using the format: `src/content/blog/YYYYMMDD-slug.[lang].md` (e.g., `.en.md` or `.it.md`). The `YYYYMMDD` prefix is mandatory to keep files organized, and the language suffix is mandatory for localization.
3. Add the required YAML frontmatter at the top of the file. **Crucially, include `draft: true` and/or `published: false`** so it does not appear on the live site.

**Template:**
```yaml
---
title: "Your Draft Title | Titolo della Bozza"
excerpt: "A brief summary of the post. Breve riassunto del post."
date: "2026-08-15"
slug: "my-custom-url-slug"
tags: ["Guides"]
imageUrl: "https://images.unsplash.com/..."
draft: true
published: false
---

# Introduction
Draft content goes here...
```
*(Note: Edulogia serves an international audience, so providing bilingual English/Italian titles and excerpts is encouraged when requested).*

* **`slug`**: (Optional) A custom string used as the URL path (e.g. `my-custom-url-slug`). If omitted, the URL will be generated automatically based on the filename (e.g., `20260815-slug`).

### How to Publish an Existing Draft Blog Post
1. Locate the draft Markdown file in `src/content/blog/`.
2. Read the file's contents to inspect its current frontmatter.
3. Edit the file to modify the frontmatter: change `draft: true` to `draft: false` (or remove the `draft` line entirely), and ensure `published` is set to `true` (or remove the `published` line entirely). Both conditions must be met for the post to be visible.
4. Rename or move the file so the `YYYYMMDD` prefix matches the actual publication date. This ensures accurate chronological sorting across paginated views.

---

## 2. Resources

Resources are Markdown files located in the `src/content/resources/` directory. They function similarly to blog posts and are displayed in a paginated grid. A resource is hidden from the live site if `draft: true` OR `published: false`.

### How to Create a New Draft Resource
1. Determine the current date and the resource's slug.
2. Use an appropriate file creation tool to generate a new Markdown file using the format: `src/content/resources/YYYYMMDD-slug.[lang].md` (e.g., `.en.md` or `.it.md`).
3. Add the required YAML frontmatter at the top of the file. **Crucially, include `draft: true` and/or `published: false`** so it does not appear on the live site.

**Template:**
```yaml
---
title: "Draft Resource Title"
description: "Draft description..."
date: "2026-08-15"
slug: "my-custom-url-slug"
tags: ["Education", "Safety"]
icon: "FileText"
resource_url: "https://example.com/download"
featured: false
draft: true
published: false
---

# Resource Details
Draft content goes here...
```
* **`resource_url`**: If this field is populated with a URL, a prominent "Download" button will automatically render on the resource's card and preview.
* **`featured`**: Setting this to `true` will pin the resource to the top "Featured Resources" section on the `/resources` page and make it eligible to appear on the Homepage.
* **`icon`**: Must be one of the mapped Lucide React components (typically `FileText`, `Shield`, `Gamepad2`, `Download`, or `Camera`). More icons can be used asking the agent to add the specific icon name, using the reference at https://lucide.dev/icons/.

### How to Publish an Existing Draft Resource
1. Locate the draft Markdown file in `src/content/resources/`.
2. Read the file's contents to inspect its current frontmatter.
3. Edit the file to modify the frontmatter: change `draft: true` to `draft: false` (or remove the `draft` line entirely), and ensure `published` is set to `true` (or remove the `published` line entirely). Both conditions must be met for the resource to be visible.
4. If necessary, rename or move the file so the `YYYYMMDD` prefix matches the actual publication date.

---

## 3. Images & Media

When creating or editing content that includes embedded images:
- **Blog Posts**: Place any images intended to be embedded within the blog post text inside the `public/blog/` directory.
- **Resources**: Place any images intended to be embedded within the resource text inside the `public/resource/` directory.

**Image Naming Convention:**
All images must follow the format `YYYYMMDD-image-slug.ext` (e.g., `.jpg`, `.png`), using the exact same `YYYYMMDD` date prefix as their associated blog post or resource file.

*Example:* If a blog post is named `20260816-digital-safety.en.md`, its embedded images should be placed at `public/blog/20260816-screen-time-chart.png` and referenced in the markdown as `![Screen Time Chart](/blog/20260816-screen-time-chart.png)`.
