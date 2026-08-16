import fm from 'front-matter';

export type ResourceFrontmatter = {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  icon: string;
  resource_url?: string;
  featured?: boolean;
  draft?: boolean;
};

export type Resource = ResourceFrontmatter & {
  id: string;
  language: string;
  body: string;
};

export function getResources(): Resource[] {
  const files = import.meta.glob('../content/resources/*.md', { query: '?raw', eager: true });
  
  const resources: Resource[] = [];
  
  for (const path in files) {
    const rawContent = (files[path] as any).default as string;
    const match = path.match(/\/([^\/]+)\.([a-z]{2})\.md$/);
    
    const id = match ? match[1] : path.replace(/^.*[\\\/]/, '').replace(/\.md$/, '');
    const language = match ? match[2] : 'en';
    
    try {
      const parsed = fm<ResourceFrontmatter>(rawContent);
      
      // Filter out drafts
      if (parsed.attributes.draft !== true) {
         resources.push({
           id,
           language,
           body: parsed.body,
           ...parsed.attributes,
         });
      }
    } catch (e) {
      console.error('Error parsing frontmatter for resource', path, e);
    }
  }
  
  // Sort by date descending
  return resources.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
