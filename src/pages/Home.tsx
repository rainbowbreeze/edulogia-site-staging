import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Download, Shield, Sparkles } from 'lucide-react';
import { getBlogPosts } from '../lib/blog';
import { getResources } from '../lib/resources';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t, i18n } = useTranslation();
  
  const currentLang = i18n.resolvedLanguage || 'it';
  const resources = getResources().filter(r => r.language === currentLang);
  const featuredResource = resources.find(r => r.featured) || resources[0];
  
  const blogs = getBlogPosts().filter(b => b.language === currentLang);
  const featuredBlog = blogs[0];

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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Featured Blog */}
          <div className="flex flex-col group">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-display font-bold text-slate-900 flex items-center gap-3">
                <div className="bg-brand-blue p-2 rounded-xl border-2 border-slate-900">
                  <BookOpen className="text-slate-900 w-6 h-6" />
                </div>
                {t('home.featured_article')}
              </h2>
              <Link to="/blog" className="text-sm font-bold font-display text-slate-900 hover:text-brand-pink flex items-center gap-1">
                {t('home.view_all')} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <Link to={featuredBlog ? `/blog/${featuredBlog.id}` : "/blog"} className="rounded-3xl bg-white chunky-box chunky-hover overflow-hidden flex flex-col h-full">
              {featuredBlog && (
                <>
                  <div className="border-b-[3px] border-slate-900">
                    <img 
                      src={featuredBlog.imageUrl} 
                      alt={featuredBlog.title}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-xs font-bold text-slate-800 font-display mb-4 uppercase tracking-wider">
                      <span className="bg-brand-yellow border-2 border-slate-900 px-3 py-1 rounded-full">{featuredBlog.category}</span>
                    </div>
                    <h3 className="text-2xl font-bold font-display text-slate-900 mb-4 group-hover:text-brand-pink transition-colors">
                      {featuredBlog.title}
                    </h3>
                    <p className="text-slate-700 font-medium mb-8 leading-relaxed flex-grow">
                      {featuredBlog.excerpt}
                    </p>
                    <span className="text-slate-900 font-bold font-display inline-flex items-center gap-2 px-6 py-3 border-2 border-slate-900 rounded-xl bg-brand-blue w-fit">
                      {t('home.read_article')} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </>
              )}
            </Link>
          </div>

          {/* Featured Resource */}
          {featuredResource && (
          <div className="flex flex-col group">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-display font-bold text-slate-900 flex items-center gap-3">
                <div className="bg-brand-pink p-2 rounded-xl border-2 border-slate-900">
                  <Shield className="text-slate-900 w-6 h-6" />
                </div>
                {t('home.featured_resource')}
              </h2>
              <Link to="/resources" className="text-sm font-bold font-display text-slate-900 hover:text-brand-pink flex items-center gap-1">
                {t('home.view_all')} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="rounded-3xl bg-brand-yellow chunky-box p-8 h-full flex flex-col justify-center">
              <div className="bg-white w-20 h-20 rounded-2xl flex items-center justify-center border-[3px] border-slate-900 shadow-[4px_4px_0_0_#0f172a] mb-8 rotate-3">
                <Download className="w-10 h-10 text-slate-900" />
              </div>
              <h3 className="text-4xl font-display font-bold text-slate-900 mb-6">
                {featuredResource.title}
              </h3>
              <p className="text-xl text-slate-900 font-medium mb-10 leading-relaxed">
                {featuredResource.description}
              </p>
              
              <div className="mt-auto pt-4 flex gap-4">
                <Link to="/resources" className="bg-white text-slate-900 px-8 py-4 chunky-btn text-lg gap-2">
                  {t('home.get_it_now')} <Download className="w-5 h-5" />
                </Link>
                {featuredResource.resource_url && (
                  <a href={featuredResource.resource_url} target="_blank" rel="noopener noreferrer" className="bg-brand-blue text-slate-900 px-8 py-4 chunky-btn text-lg gap-2 inline-flex items-center justify-center">
                    Download <Download className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
          )}
        </div>
      </section>
    </div>
  );
}
