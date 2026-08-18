import fm from 'front-matter';

export type BlogPostFrontmatter = {
  title: string;
  excerpt: string;
  date: string;
  tags?: string[];
  imageUrl: string;
  published?: boolean;
  draft?: boolean;
  slug?: string;
};

export type BlogPost = BlogPostFrontmatter & {
  id: string;
  language: string;
  body: string;
};

export function getBlogPosts(): BlogPost[] {
  // Vite specific feature to import multiple files
  const files = import.meta.glob('../content/blog/*.md', { query: '?raw', eager: true });
  
  const posts: BlogPost[] = [];
  
  for (const path in files) {
    // files[path] resolves to { default: string } when using ?raw with eager: true in Vite 5+
    // wait, actually in Vite 4/5, query: '?raw' with eager: true returns { default: 'file content' }
    const rawContent = (files[path] as any).default as string;
    // Match the slug and language from the filename (e.g., 20260505-coding.en.md)
    const match = path.match(/\/([^\/]+)\.([a-z]{2})\.md$/);
    
    // If it doesn't match the new pattern, you can gracefully fallback or skip
    const fileId = match ? match[1] : path.replace(/^.*[\\\/]/, '').replace(/\.md$/, '');
    const language = match ? match[2] : 'en'; // default to english if no suffix
    
    try {
      const parsed = fm<BlogPostFrontmatter>(rawContent);
      
      // Filter out drafts or unpublished posts
      if (parsed.attributes.published !== false && parsed.attributes.draft !== true) { 
         posts.push({
           id: parsed.attributes.slug || fileId,
           language,
           body: parsed.body,
           ...parsed.attributes,
         });
      }
    } catch (e) {
      console.error('Error parsing frontmatter for', path, e);
    }
  }
  
  // Sort by date descending
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
