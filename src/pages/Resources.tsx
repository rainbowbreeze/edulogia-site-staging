import { useState } from 'react';
import { getResources } from '../lib/resources';
import { formatDate } from '../lib/utils';
import { Download, FileText, Shield, Gamepad2, Search, ArrowLeft, ArrowRight, ArrowRightCircle, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSearchParams, useNavigate } from 'react-router-dom';

const icons: Record<string, React.ElementType> = {
  FileText,
  Shield,
  Gamepad2,
};

export default function Resources() {
  const { t, i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const currentLang = i18n.resolvedLanguage || 'it';
  const allResources = getResources().filter(r => r.language === currentLang);

  const filteredResources = allResources.filter(r => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      r.title?.toLowerCase().includes(query) ||
      r.description?.toLowerCase().includes(query) ||
      r.tags?.some((tag: string) => tag.toLowerCase().includes(query))
    );
  });

  const featuredResources = filteredResources.filter(r => r.featured);
  const regularResources = filteredResources.filter(r => !r.featured);

  const pageParam = searchParams.get('page');
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;
  const postsPerPage = 9;

  const totalPages = Math.ceil(regularResources.length / postsPerPage);
  const validPage = Math.max(1, Math.min(currentPage, totalPages || 1));

  const startIndex = (validPage - 1) * postsPerPage;
  const currentResources = regularResources.slice(startIndex, startIndex + postsPerPage);

  const handlePrevious = () => {
    if (validPage > 1) {
      setSearchParams({ page: (validPage - 1).toString() });
      window.scrollTo(0, 0);
    }
  };

  const handleNext = () => {
    if (validPage < totalPages) {
      setSearchParams({ page: (validPage + 1).toString() });
      window.scrollTo(0, 0);
    }
  };

  const renderResourceCard = (resource: any) => {
    const IconComponent = icons[resource.icon] || FileText;
    return (
      <div onClick={() => navigate(`/resources/${resource.id}`)} key={resource.id} className="bg-white rounded-3xl chunky-box chunky-hover p-8 flex flex-col group cursor-pointer">
        <div className="flex items-start mb-6">
          <div className="bg-brand-yellow p-4 rounded-2xl border-2 border-slate-900 shadow-[2px_2px_0_0_#0f172a]">
            <IconComponent className="w-8 h-8 text-slate-900" />
          </div>
        </div>
        
        <h3 className="text-2xl font-display font-bold text-slate-900 mb-4 group-hover:text-brand-pink transition-colors">{resource.title}</h3>
        
        <div className="flex items-center gap-3 text-xs font-bold font-display uppercase tracking-wider text-slate-800 mb-4">
          <span className="flex items-center gap-1 bg-slate-100 border-2 border-slate-900 px-3 py-1 rounded-full"><Calendar className="w-3 h-3" /> {formatDate(resource.date, currentLang)}</span>
        </div>

        <p className="text-slate-700 font-medium mb-8 flex-grow text-lg">{resource.description}</p>
        
        <div className="flex flex-col gap-4 mt-auto">
          <div className="flex items-center gap-2">
            {resource.tags && resource.tags.map((tag: string) => (
              <span key={tag} className="text-xs font-bold text-slate-600 uppercase tracking-wider font-display">#{tag}</span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-6 border-t-[3px] border-slate-100">
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
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      {/* Header Profile */}
      <div className="bg-brand-blue rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden chunky-box">
        <div className="absolute top-0 right-0 p-12 opacity-20">
          <Download className="w-64 h-64 text-slate-900 rotate-12" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-slate-900 mb-6">{t('resources.title')}</h1>
          <p className="text-xl text-slate-900 font-medium mb-10">
            {t('resources.description')}
          </p>
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 w-6 h-6" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSearchParams({ page: '1' }); // Reset pagination on search
              }}
              placeholder={t('resources.search_placeholder')} 
              className="w-full bg-white border-3 border-slate-900 text-slate-900 rounded-2xl py-4 pl-14 pr-4 focus:outline-none focus:border-brand-pink focus:ring-4 focus:ring-brand-pink/20 transition-all font-medium text-lg"
            />
          </div>
        </div>
      </div>

      {/* Featured Resources List */}
      {featuredResources.length > 0 && validPage === 1 && (
        <div className="mb-16">
          <h2 className="text-3xl font-display font-bold text-slate-900 mb-8 border-b-4 border-slate-900 inline-block pb-2">{t('resources.featured', 'Featured Resources')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredResources.map(renderResourceCard)}
          </div>
        </div>
      )}

      {/* Regular Resources List */}
      <div>
        {featuredResources.length > 0 && validPage === 1 && (
          <h2 className="text-3xl font-display font-bold text-slate-900 mb-8 border-b-4 border-slate-900 inline-block pb-2">{t('resources.all', 'All Resources')}</h2>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentResources.map(renderResourceCard)}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-16 flex justify-between items-center border-t-4 border-slate-900 pt-8">
          <button
            onClick={handlePrevious}
            disabled={validPage === 1}
            className={`font-display font-bold inline-flex items-center gap-2 border-2 border-slate-900 py-3 px-6 rounded-xl transition-colors ${
              validPage === 1 
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-50' 
                : 'bg-brand-pink text-slate-900 chunky-btn hover:bg-pink-400'
            }`}
          >
            <ArrowLeft className="w-5 h-5" /> {t('blog.newer')}
          </button>
          
          <div className="font-display font-bold text-slate-900 text-lg hidden sm:block">
            {validPage} / {totalPages}
          </div>

          <button
            onClick={handleNext}
            disabled={validPage === totalPages}
            className={`font-display font-bold inline-flex items-center gap-2 border-2 border-slate-900 py-3 px-6 rounded-xl transition-colors ${
              validPage === totalPages 
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-50' 
                : 'bg-brand-blue text-slate-900 chunky-btn hover:bg-blue-400'
            }`}
          >
            {t('blog.older')} <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
