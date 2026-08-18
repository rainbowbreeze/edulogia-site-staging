import { useParams, Navigate, Link } from 'react-router-dom';
import Markdown from 'react-markdown';
import { getBlogPosts } from '../lib/blog';
import { formatDate } from '../lib/utils';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  
  const currentLang = i18n.resolvedLanguage || 'it';
  const posts = getBlogPosts();
  const post = posts.find(p => p.id === id && p.language === currentLang);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link to="/blog" className="inline-flex items-center gap-2 text-slate-700 font-bold font-display uppercase tracking-wider mb-8 hover:text-brand-pink transition-colors">
        <ArrowLeft className="w-5 h-5" /> {t('blog.back', 'Back to Blog')}
      </Link>

      <article className="bg-white rounded-3xl chunky-box p-8 md:p-12 mb-16">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6 leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-3 text-sm font-bold font-display uppercase tracking-wider text-slate-800 mb-8 flex-wrap">
          <span className="flex items-center gap-1 bg-slate-100 border-2 border-slate-900 px-3 py-1 rounded-full">
            <Calendar className="w-4 h-4" /> {formatDate(post.date, currentLang)}
          </span>
        </div>

        <div className="mb-12 border-4 border-slate-900 rounded-3xl overflow-hidden aspect-video relative">
          <img 
            src={post.imageUrl} 
            alt={post.title}
            className="w-full h-full object-cover absolute inset-0"
          />
        </div>

        {/* Use explicit typography classes rather than prose to stick to the brutalist/playful style */}
        <div className="markdown-body font-sans text-lg text-slate-800 leading-relaxed [&>h1]:text-4xl [&>h1]:font-display [&>h1]:font-bold [&>h1]:mb-6 [&>h1]:mt-10 [&>h2]:text-3xl [&>h2]:font-display [&>h2]:font-bold [&>h2]:mb-4 [&>h2]:mt-8 [&>p]:mb-6 [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:mb-6 [&>ul>li]:mb-2">
          <Markdown>{post.body}</Markdown>
        </div>

        <div className="mt-12 pt-8 border-t-[3px] border-slate-100 flex items-center flex-wrap gap-2">
          {post.tags && post.tags.length > 0 && post.tags.map(tag => (
            <span key={tag} className="text-xs font-bold text-slate-600 uppercase tracking-wider font-display">#{tag}</span>
          ))}
        </div>
      </article>
    </div>
  );
}
