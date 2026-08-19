import fs from 'fs';
import path from 'path';
import fm from 'front-matter';

const BASE_URL = 'https://edulogia.it';

interface FeedItem {
  title: string;
  description: string;
  date: Date;
  url: string;
  lang: string;
}

function getItemsFromDirectory(dir: string, type: 'blog' | 'resources'): FeedItem[] {
  const items: FeedItem[] = [];
  if (!fs.existsSync(dir)) return items;

  const files = fs.readdirSync(dir);

  for (const file of files) {
    if (!file.endsWith('.md')) continue;

    const match = file.match(/^(.+)\.([a-z]{2})\.md$/);
    if (!match) continue;
    
    const [, fileId, lang] = match;

    const filePath = path.join(dir, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    try {
      const parsed = fm<any>(content);
      
      // Skip unpublished or draft posts
      if (parsed.attributes.published === false || parsed.attributes.draft === true) {
        continue;
      }

      const slug = parsed.attributes.slug || fileId;
      const title = parsed.attributes.title || '';
      const description = parsed.attributes.excerpt || parsed.attributes.description || '';
      const dateStr = parsed.attributes.date;
      const date = dateStr ? new Date(dateStr) : new Date();

      items.push({
        title,
        description,
        date,
        url: `${BASE_URL}/${type}/${slug}`,
        lang
      });
    } catch (e) {
      console.error(`Error parsing frontmatter for ${file}`, e);
    }
  }

  return items;
}

function generateRssFeed(items: FeedItem[], lang: string, filename: string, title: string, description: string) {
  const sortedItems = items
    .filter(item => item.lang === lang)
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  const lastBuildDate = sortedItems.length > 0 ? sortedItems[0].date.toUTCString() : new Date().toUTCString();

  const feedContent = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${title}</title>
    <link>${BASE_URL}</link>
    <description>${description}</description>
    <language>${lang}</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${BASE_URL}/${filename}" rel="self" type="application/rss+xml" />
${sortedItems.map(item => `    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${item.url}</link>
      <guid isPermaLink="true">${item.url}</guid>
      <pubDate>${item.date.toUTCString()}</pubDate>
      <description><![CDATA[${item.description}]]></description>
    </item>`).join('\n')}
  </channel>
</rss>`;

  const feedPath = path.resolve(`public/${filename}`);
  fs.writeFileSync(feedPath, feedContent, 'utf-8');
  console.log(`RSS feed (${lang}) generated successfully at ${feedPath} with ${sortedItems.length} items.`);
}

function generateAllFeeds() {
  const blogDir = path.resolve('src/content/blog');
  const resourcesDir = path.resolve('src/content/resources');

  const blogItems = getItemsFromDirectory(blogDir, 'blog');
  const resourceItems = getItemsFromDirectory(resourcesDir, 'resources');

  const allItems = [...blogItems, ...resourceItems];

  // Generate Italian RSS
  generateRssFeed(
    allItems, 
    'it', 
    'rss-it.xml', 
    'Edulogia', 
    'Guide, suggerimenti e supporto per costruire sane abitudini digitali.'
  );

  // Generate English RSS
  generateRssFeed(
    allItems, 
    'en', 
    'rss-en.xml', 
    'Edulogia', 
    'Guides, suggestions, and support to build healthy digital habits.'
  );
}

generateAllFeeds();
