import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Download, Shield, Sparkles, ArrowRightCircle, Calendar, FileText, Gamepad2, Camera } from 'lucide-react';
import { getBlogPosts } from '../lib/blog';
import { getResources } from '../lib/resources';
import { formatDate } from '../lib/utils';
import { useTranslation } from 'react-i18next';

const iconMap: Record<string, React.ElementType> = {
  Download,
  FileText,
  Shield,
  Gamepad2,
  Camera,
};

export default function Home() {
  const { t, i18n } = useTranslation();
  
  const currentLang = i18n.resolvedLanguage || 'it';
  const allResources = getResources().filter(r => r.language === currentLang);
  const resources = allResources.filter(r => r.featured).slice(0, 2);
  
  // If not enough featured, fallback to recent
  if (resources.length < 2) {
    const additional = allResources.filter(r => !r.featured).slice(0, 2 - resources.length);
    resources.push(...additional);
  }
  
  const blogs = getBlogPosts().filter(b => b.language === currentLang).slice(0, 2);

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden bg-brand-blue/20 border-b-[3px] border-slate-900">
        {/* Playful Background Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-brand-yellow rounded-full -z-10 border-3 border-slate-900 shadow-[4px_4px_0_0_#0f172a] opacity-50" />
        <div className="absolute bottom-10 right-20 w-32 h-32 bg-brand-pink rounded-3xl rotate-12 -z-10 border-3 border-slate-900 shadow-[4px_4px_0_0_#0f172a] opacity-50" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-display font-bold text-slate-900 mb-6 tracking-tight max-w-4xl mx-auto leading-tight">
            {t('home.hero.title_balance')}<span className="text-brand-pink">{t('home.hero.title_tech')}</span>{t('home.hero.title_with')}
          </h1>
          <p 
            className="text-xl md:text-2xl text-slate-700 font-medium max-w-2xl mx-auto mb-10 leading-relaxed font-sans"
            dangerouslySetInnerHTML={{ __html: t('home.hero.description') }}
          />
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link 
              to="/resources" 
              className="bg-brand-yellow text-slate-900 px-8 py-4 chunky-btn text-lg w-full sm:w-auto"
            >
              {t('home.hero.explore')}
            </Link>
            <Link 
              to="/blog" 
              className="bg-white text-slate-900 px-8 py-4 chunky-btn text-lg w-full sm:w-auto"
            >
              {t('home.hero.read_blog')}
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col gap-20">
        
        {/* Latest Articles */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-3xl font-display font-bold text-slate-900 flex items-center gap-3">
              <div className="bg-brand-blue p-2 rounded-xl border-2 border-slate-900">
                <BookOpen className="text-slate-900 w-6 h-6" />
              </div>
              {t('home.latest_articles')}
            </h2>
            <Link to="/blog" className="text-sm font-bold font-display text-slate-900 hover:text-brand-pink flex items-center gap-1">
              {t('home.view_all')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {blogs.map(blog => (
              <Link key={blog.id} to={`/blog/${blog.id}`} className="rounded-3xl bg-white chunky-box chunky-hover overflow-hidden flex flex-col h-full group cursor-pointer">
                <div className="border-b-[3px] border-slate-900 shrink-0">
                  <img 
                    src={blog.imageUrl} 
                    alt={blog.title}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold font-display text-slate-900 mb-4 group-hover:text-brand-pink transition-colors">
                    {blog.title}
                  </h3>
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-800 font-display mb-4 uppercase tracking-wider">
                    <span className="flex items-center gap-1 bg-slate-100 border-2 border-slate-900 px-3 py-1 rounded-full"><Calendar className="w-3 h-3" /> {formatDate(blog.date, currentLang)}</span>
                  </div>
                  <p className="text-slate-700 font-medium mb-8 leading-relaxed flex-grow">
                    {blog.excerpt}
                  </p>
                  <div className="flex flex-col gap-4 mt-auto">
                    <div className="flex items-center flex-wrap gap-2">
                      {blog.tags && blog.tags.length > 0 && blog.tags.map((tag: string) => (
                        <span key={tag} className="text-xs font-bold text-slate-600 uppercase tracking-wider font-display">#{tag}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-6 border-t-[3px] border-slate-100">
                      <span className="font-display font-bold text-slate-900 uppercase tracking-wider text-sm group-hover:text-brand-pink transition-colors inline-flex items-center gap-2">
                        {t('home.read_article')} <ArrowRightCircle className="w-5 h-5" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Resources */}
        {resources.length > 0 && (
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-3xl font-display font-bold text-slate-900 flex items-center gap-3">
                <div className="bg-brand-pink p-2 rounded-xl border-2 border-slate-900">
                  <Shield className="text-slate-900 w-6 h-6" />
                </div>
                {t('home.featured_resources')}
              </h2>
              <Link to="/resources" className="text-sm font-bold font-display text-slate-900 hover:text-brand-pink flex items-center gap-1">
                {t('home.view_all')} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              {resources.map(resource => {
                const IconComponent = iconMap[resource.icon] || Download;
                return (
                <div key={resource.id} className="rounded-3xl bg-brand-yellow chunky-box chunky-hover p-8 flex flex-col h-full group cursor-pointer" onClick={() => window.location.href = `/resources/${resource.id}`}>
                  <div className="flex items-start mb-6 shrink-0">
                    <div className="bg-white w-20 h-20 rounded-2xl flex items-center justify-center border-[3px] border-slate-900 shadow-[4px_4px_0_0_#0f172a] rotate-3">
                      <IconComponent className="w-10 h-10 text-slate-900" />
                    </div>
                  </div>
                  
                  <h3 className="text-3xl font-display font-bold text-slate-900 mb-4 group-hover:text-brand-pink transition-colors">
                    {resource.title}
                  </h3>
                  
                  <div className="flex items-center gap-3 text-xs font-bold font-display uppercase tracking-wider text-slate-800 mb-6">
                    <span className="flex items-center gap-1 bg-white border-2 border-slate-900 px-3 py-1 rounded-full"><Calendar className="w-3 h-3" /> {formatDate(resource.date, currentLang)}</span>
                  </div>

                  <p className="text-slate-900 font-medium mb-8 flex-grow text-lg">
                    {resource.description}
                  </p>
                  
                  <div className="flex flex-col gap-4 mt-auto">
                    <div className="flex items-center gap-2">
                      {resource.tags && resource.tags.map((tag: string) => (
                        <span key={tag} className="text-xs font-bold text-slate-900 uppercase tracking-wider font-display">#{tag}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-6 border-t-[3px] border-slate-900/10">
                      <span className="font-display font-bold text-slate-900 uppercase tracking-wider text-sm group-hover:text-brand-pink transition-colors inline-flex items-center gap-2">
                        {t('resources.read_all', 'Read all')} <ArrowRightCircle className="w-5 h-5" />
                      </span>
                      {resource.resource_url && (
                        <a 
                          href={resource.resource_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-center p-3 rounded-xl border-2 border-slate-900 bg-brand-blue text-slate-900 hover:bg-brand-pink transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Download className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )})}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
