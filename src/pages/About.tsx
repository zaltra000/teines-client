import { motion } from "motion/react";
import { Globe, Users, Building2, Leaf } from "lucide-react";
import { AnimatedPage } from "../components/AnimatedPage";
import { useLanguage } from "../contexts/LanguageContext";

export function About() {
  const { t } = useLanguage();

  return (
    <AnimatedPage className="space-y-10 pb-24">
      <div className="flex flex-col gap-3 px-2">
        <h1 className="text-[2.5rem] font-serif text-slate-900 tracking-tight leading-none">{t('about.title')}</h1>
        <p className="text-slate-500 text-sm leading-relaxed max-w-[90%] font-light">{t('about.desc')}</p>
      </div>

      <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 bg-white">
        <div className="h-[300px] bg-slate-200 relative">
          <img
            src="https://picsum.photos/seed/headquarters/800/400"
            alt="Tiens Headquarters"
            className="w-full h-full object-cover mix-blend-multiply"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0d] via-[#0a0f0d]/40 to-transparent"></div>
          <div className="absolute bottom-6 left-6 text-white">
            <h2 className="text-3xl font-serif mb-2">{t('about.founded')}</h2>
            <p className="text-sm font-light tracking-widest uppercase text-[#c2a67a]">{t('about.location')}</p>
          </div>
        </div>
        <div className="p-8">
          <p className="text-sm text-slate-600 leading-relaxed mb-8 font-light">
            {t('about.intro')}
          </p>
          <div className="grid grid-cols-2 gap-y-8 gap-x-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 text-[#2c4c3b] font-serif text-2xl">
                <Globe size={24} strokeWidth={1.5} className="text-[#c2a67a]" />
                <span>224</span>
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('about.stats.countries')}</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 text-[#2c4c3b] font-serif text-2xl">
                <Users size={24} strokeWidth={1.5} className="text-[#c2a67a]" />
                <span>40M+</span>
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('about.stats.families')}</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 text-[#2c4c3b] font-serif text-2xl">
                <Building2 size={24} strokeWidth={1.5} className="text-[#c2a67a]" />
                <span>110+</span>
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('about.stats.branches')}</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 text-[#2c4c3b] font-serif text-2xl">
                <Leaf size={24} strokeWidth={1.5} className="text-[#c2a67a]" />
                <span>5</span>
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('about.stats.elements')}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6 px-2">
        <h2 className="text-3xl font-serif text-slate-900 tracking-tight">{t('about.sudan.title')}</h2>
        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 space-y-8">
          <div className="flex items-start gap-5">
            <div className="w-12 h-12 rounded-2xl bg-[#f8f6f0] text-[#c2a67a] flex items-center justify-center shrink-0">
              <Building2 size={24} strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="font-serif text-xl text-slate-900 mb-2">{t('about.sudan.main')}</h4>
              <p className="text-sm text-slate-500 leading-relaxed font-light">{t('about.sudan.main.desc')}</p>
            </div>
          </div>
          <div className="flex items-start gap-5">
            <div className="w-12 h-12 rounded-2xl bg-[#f8f6f0] text-[#c2a67a] flex items-center justify-center shrink-0">
              <Building2 size={24} strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="font-serif text-xl text-slate-900 mb-2">{t('about.sudan.branch')}</h4>
              <p className="text-sm text-slate-500 leading-relaxed font-light">{t('about.sudan.branch.desc')}</p>
            </div>
          </div>
          <div className="flex items-start gap-5">
            <div className="w-12 h-12 rounded-2xl bg-[#f8f6f0] text-[#c2a67a] flex items-center justify-center shrink-0">
              <Building2 size={24} strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="font-serif text-xl text-slate-900 mb-2">{t('about.sudan.hubs')}</h4>
              <p className="text-sm text-slate-500 leading-relaxed font-light">{t('about.sudan.hubs.desc')}</p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}
