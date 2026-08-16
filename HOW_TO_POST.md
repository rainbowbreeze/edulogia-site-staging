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

Blog posts are Markdown files located in the `src/content/blog/` directory. They are automatically parsed and displayed on the website unless marked as a draft.

### How to Create a New Draft Blog Post
1. Determine the current date and the post's slug.
2. Use an appropriate file creation tool to generate a new Markdown file using the format: `src/content/blog/YYYYMMDD-slug.[lang].md` (e.g., `.en.md` or `.it.md`). The `YYYYMMDD` prefix is mandatory to keep files organized, and the language suffix is mandatory for localization.
3. Add the required YAML frontmatter at the top of the file. **Crucially, include `draft: true`** so it does not appear on the live site.

**Template:**
```yaml
---
title: "Your Draft Title | Titolo della Bozza"
excerpt: "A brief summary of the post. Breve riassunto del post."
date: "August 15, 2026"
category: "Guides"
imageUrl: "https://images.unsplash.com/..."
draft: true
---

# Introduction
Draft content goes here...
```
*(Note: Edulogia serves an international audience, so providing bilingual English/Italian titles and excerpts is encouraged when requested).*

### How to Publish an Existing Draft Blog Post
1. Locate the draft Markdown file in `src/content/blog/`.
2. Read the file's contents to inspect its current frontmatter.
3. Edit the file to modify the frontmatter: change `draft: true` to `draft: false` (or remove the `draft` line entirely).
4. Rename or move the file so the `YYYYMMDD` prefix matches the actual publication date. This ensures accurate chronological sorting across paginated views.

---

## 2. Resources

Resources are Markdown files located in the `src/content/resources/` directory. They function similarly to blog posts and are displayed in a paginated grid.

### How to Create a New Draft Resource
1. Determine the current date and the resource's slug.
2. Use an appropriate file creation tool to generate a new Markdown file using the format: `src/content/resources/YYYYMMDD-slug.[lang].md` (e.g., `.en.md` or `.it.md`).
3. Add the required YAML frontmatter at the top of the file. **Crucially, include `draft: true`** so it does not appear on the live site.

**Template:**
```yaml
---
title: "Draft Resource Title"
description: "Draft description..."
date: "August 15, 2026"
tags: ["Education", "Safety"]
icon: "FileText"
resource_url: "https://example.com/download"
featured: false
draft: true
---

# Resource Details
Draft content goes here...
```
* **`resource_url`**: If this field is populated with a URL, a prominent "Download" button will automatically render on the resource's card and preview.
* **`featured`**: Setting this to `true` will pin the resource to the top "Featured Resources" section on the `/resources` page and make it eligible to appear on the Homepage.
* **`icon`**: Must be one of the mapped Lucide React components (typically `FileText`, `Shield`, `Gamepad2`, or `Download`).

### How to Publish an Existing Draft Resource
1. Locate the draft Markdown file in `src/content/resources/`.
2. Read the file's contents to inspect its current frontmatter.
3. Edit the file to modify the frontmatter: change `draft: true` to `draft: false` (or remove the `draft` line).
4. If necessary, rename or move the file so the `YYYYMMDD` prefix matches the actual publication date.
