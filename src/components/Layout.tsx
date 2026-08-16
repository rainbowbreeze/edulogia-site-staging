import { Link, Outlet, useLocation } from 'react-router-dom';
import { MonitorPlay, Heart, FileText, Menu, X, Globe, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import EdulogiaLogo from './EdulogiaLogo';

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const navLinks = [
    { name: t('layout.nav.home'), path: '/', icon: Heart },
    { name: t('layout.nav.blog'), path: '/blog', icon: FileText },
    { name: t('layout.nav.resources'), path: '/resources', icon: MonitorPlay },
    { name: t('layout.nav.about'), path: '/about', icon: Sparkles },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-brand-yellow p-1 rounded-2xl chunky-box chunky-hover transition-transform flex items-center justify-center">
                <EdulogiaLogo size={36} />
              </div>
              <span className="font-display font-bold text-2xl text-slate-900 tracking-tight ml-2">
                Edu<span className="text-brand-pink">logia</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                      active ? 'text-brand-blue-dark' : 'text-slate-600 hover:text-brand-blue-dark'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${active ? 'text-brand-blue-dark' : 'text-slate-400'}`} />
                    {link.name}
                  </Link>
                );
              })}
              <div className="flex items-center gap-2 border-l border-slate-200 pl-4 ml-2">
                <Globe className="w-4 h-4 text-slate-400" />
                <select
                  value={i18n.resolvedLanguage}
                  onChange={(e) => i18n.changeLanguage(e.target.value)}
                  className="bg-transparent text-sm font-medium text-slate-600 focus:outline-none cursor-pointer"
                >
                  <option value="en">EN</option>
                  <option value="it">IT</option>
                </select>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-slate-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b-3 border-slate-900 py-4 px-4 shadow-[0_4px_0_0_#0f172a] absolute w-full left-0">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 text-slate-700 font-display font-medium border-2 border-transparent hover:border-slate-900 transition-all"
                  >
                    <Icon className="w-5 h-5 text-brand-pink" />
                    {link.name}
                  </Link>
                );
              })}
              <div className="flex items-center justify-between p-3 border-t-2 border-slate-100 mt-2">
                <div className="flex items-center gap-2 text-slate-600">
                  <Globe className="w-5 h-5 text-brand-pink" />
                  <span className="font-display font-medium">Language</span>
                </div>
                <select
                  value={i18n.resolvedLanguage}
                  onChange={(e) => i18n.changeLanguage(e.target.value)}
                  className="bg-slate-50 border-2 border-slate-200 text-sm font-medium text-slate-700 rounded-lg px-3 py-1 focus:outline-none focus:border-slate-900"
                >
                  <option value="en">English</option>
                  <option value="it">Italiano</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-slate-900 text-slate-300 py-16 mt-auto border-t-[6px] border-brand-yellow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-brand-yellow p-2 rounded-2xl chunky-box">
                  <MonitorPlay className="w-6 h-6 text-slate-900" />
                </div>
                <span className="font-display font-bold text-2xl text-white ml-2">Edu<span className="text-brand-pink">logia</span></span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                {t('layout.footer.description')}
              </p>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">{t('layout.footer.quick_links')}</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/blog" className="hover:text-brand-yellow transition-colors">{t('layout.footer.blog')}</Link></li>
                <li><Link to="/resources" className="hover:text-brand-yellow transition-colors">{t('layout.footer.guides')}</Link></li>
                <li><Link to="/resources" className="hover:text-brand-yellow transition-colors">{t('layout.footer.tutorials')}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">{t('layout.footer.connect')}</h3>
              <p className="text-sm text-slate-400 mb-4">
                {t('layout.footer.connect_desc')}
              </p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder={t('layout.footer.email_placeholder')} 
                  className="bg-white border-3 border-slate-700 text-slate-900 rounded-2xl px-4 py-2 text-sm w-full focus:outline-none focus:border-brand-pink font-medium"
                />
                <button className="bg-brand-pink text-slate-900 px-6 py-2 chunky-btn text-sm">
                  {t('layout.footer.join')}
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-sm text-center text-slate-500">
            {t('layout.footer.copyright', { year: new Date().getFullYear() })}
          </div>
        </div>
      </footer>
    </div>
  );
}
