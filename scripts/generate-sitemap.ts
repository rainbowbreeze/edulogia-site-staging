import fs from 'fs';
import path from 'path';
import fm from 'front-matter';

const BASE_URL = 'https://edulogia.it';

function getSlugsFromDirectory(dir: string): string[] {
  const slugs = new Set<string>();
  const files = fs.readdirSync(dir);

  for (const file of files) {
    if (!file.endsWith('.md')) continue;

    const filePath = path.join(dir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    try {
      const parsed = fm<any>(content);
      
      // Skip unpublished or draft posts
      if (parsed.attributes.published === false || parsed.attributes.draft === true) {
        continue;
      }

      const match = file.match(/^([^\/]+)\.([a-z]{2})\.md$/);
      let fileId = file.replace(/\.md$/, '');
      if (match) {
        fileId = match[1];
      }

      const slug = parsed.attributes.slug || fileId;
      slugs.add(slug);
    } catch (e) {
      console.error(`Error parsing frontmatter for ${file}`, e);
    }
  }

  return Array.from(slugs);
}

function generateSitemap() {
  const blogDir = path.resolve('src/content/blog');
  const resourcesDir = path.resolve('src/content/resources');

  const blogSlugs = getSlugsFromDirectory(blogDir);
  const resourceSlugs = getSlugsFromDirectory(resourcesDir);

  const urls = [
    `${BASE_URL}/`,
    `${BASE_URL}/about`,
    `${BASE_URL}/blog`,
    `${BASE_URL}/resources`,
    ...blogSlugs.map(slug => `${BASE_URL}/blog/${slug}`),
    ...resourceSlugs.map(slug => `${BASE_URL}/resources/${slug}`),
  ];

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
  </url>`).join('\n')}
</urlset>`;

  const sitemapPath = path.resolve('public/sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemapContent, 'utf-8');
  console.log(`Sitemap generated successfully at ${sitemapPath} with ${urls.length} URLs.`);
}

generateSitemap();
