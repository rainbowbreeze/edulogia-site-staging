import { useParams, Navigate, Link } from 'react-router-dom';
import Markdown from 'react-markdown';
import { getResources } from '../lib/resources';
import { formatDate } from '../lib/utils';
import { Calendar, ArrowLeft, Download, FileText, Shield, Gamepad2, Camera } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const iconMap = {
  Download,
  FileText,
  Shield,
  Gamepad2,
  Camera
};

export default function ResourcePost() {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  
  const currentLang = i18n.resolvedLanguage || 'it';
  const resources = getResources();
  const resource = resources.find(r => r.id === id && r.language === currentLang);

  if (!resource) {
    return <Navigate to="/resources" replace />;
  }

  const IconComponent = iconMap[resource.icon as keyof typeof iconMap] || FileText;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link to="/resources" className="inline-flex items-center gap-2 text-slate-700 font-bold font-display uppercase tracking-wider mb-8 hover:text-brand-pink transition-colors">
        <ArrowLeft className="w-5 h-5" /> {t('resources.title', 'Resource Library')}
      </Link>

      <article className="bg-white rounded-3xl chunky-box p-8 md:p-12 mb-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-brand-blue border-3 border-slate-900 rounded-2xl flex items-center justify-center shadow-[4px_4px_0_0_#0f172a] shrink-0">
            <IconComponent className="w-8 h-8 text-slate-900" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 leading-tight">
            {resource.title}
          </h1>
        </div>

        <div className="flex items-center gap-3 text-sm font-bold font-display uppercase tracking-wider text-slate-800 mb-8 flex-wrap">
          <span className="flex items-center gap-1 bg-slate-100 border-2 border-slate-900 px-3 py-1 rounded-full">
            <Calendar className="w-4 h-4" /> {formatDate(resource.date, currentLang)}
          </span>
        </div>
        <p className="text-xl text-slate-600 mb-8 font-sans leading-relaxed">
          {resource.description}
        </p>

        {resource.resource_url && (
          <div className="mb-12">
            <a 
              href={resource.resource_url}
              target="_blank"
              rel="noopener noreferrer"
              className="chunky-btn bg-brand-yellow flex justify-center items-center gap-2 text-lg w-full"
            >
              <Download className="w-5 h-5" />
              {t('home.get_it_now', 'Get it Now')}
            </a>
          </div>
        )}

        <div className="markdown-body font-sans text-lg text-slate-800 leading-relaxed [&>h1]:text-4xl [&>h1]:font-display [&>h1]:font-bold [&>h1]:mb-6 [&>h1]:mt-10 [&>h2]:text-3xl [&>h2]:font-display [&>h2]:font-bold [&>h2]:mb-4 [&>h2]:mt-8 [&>p]:mb-6 [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:mb-6 [&>ul>li]:mb-2 [&>a]:text-brand-blue [&>a]:font-bold [&>a]:underline">
          <Markdown>{resource.body}</Markdown>
        </div>

        {resource.tags && resource.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t-[3px] border-slate-100 flex items-center flex-wrap gap-2">
            {resource.tags.map(tag => (
              <span key={tag} className="text-xs font-bold text-slate-600 uppercase tracking-wider font-display">#{tag}</span>
            ))}
          </div>
        )}
      </article>
    </div>
  );
}
