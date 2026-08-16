import { useTranslation } from 'react-i18next';
import { Heart, Sparkles, BookOpen } from 'lucide-react';

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      {/* Header Profile */}
      <div className="bg-brand-yellow rounded-3xl p-8 md:p-16 mb-16 relative overflow-hidden chunky-box">
        <div className="absolute top-0 right-0 p-12 opacity-20">
          <Heart className="w-64 h-64 text-slate-900 -rotate-12" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-display font-bold text-slate-900 mb-8">
              {t('about.title', 'About Us')} 
            </h1>
            <p className="text-2xl text-slate-900 font-medium leading-relaxed font-sans">
              {t('about.intro', "I'm a passionate educator and technologist working to bridge the gap between digital tools and healthy child development. More story coming soon...")}
            </p>
          </div>
          <div className="w-full md:w-[400px] flex-shrink-0">
            <div className="aspect-square bg-brand-pink rounded-3xl border-[3px] border-slate-900 shadow-[8px_8px_0_0_#0f172a] overflow-hidden rotate-3 hover:rotate-0 transition-transform duration-300">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800&h=800" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mt-16">
        <div className="bg-white p-8 rounded-3xl chunky-box flex flex-col justify-center relative overflow-hidden">
             {/* Decorative element */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow rounded-full -translate-y-1/2 translate-x-1/2 opacity-20" />
            <h2 className="text-3xl font-display font-bold text-slate-900 mb-6 relative z-10">
                {t('about.mission_title', 'Our Mission')}
            </h2>
            <p className="text-lg text-slate-700 font-medium leading-relaxed mb-6 font-sans relative z-10">
               {t('about.mission_description', 'To empower parents with the knowledge and tools they need to guide their children in a rapidly evolving digital landscape. We believe technology should serve education and connection, not distraction.')}
            </p>
        </div>

        <div className="bg-brand-pink p-8 rounded-3xl chunky-box flex flex-col justify-center relative shadow-[6px_6px_0_0_#0f172a]">
             {/* Decorative element */}
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-brand-blue rounded-xl translate-y-1/2 -rotate-12 -translate-x-1/2 opacity-30" />
            
            <BookOpen className="w-12 h-12 text-slate-900 mb-6 relative z-10" />
            <h2 className="text-3xl font-display font-bold text-slate-900 mb-6 relative z-10">
                 {t('about.vision_title', 'Our Vision')}
            </h2>
            <p className="text-lg text-slate-900 font-medium leading-relaxed font-sans relative z-10">
                 {t('about.vision_description', 'A world where families talk openly about technology, create healthy boundaries together, and use digital tools to expand their horizons and spark creativity.')}
            </p>
        </div>
      </div>

    </div>
  );
}
