import { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2, Award, TrendingUp, DollarSign, Star } from "lucide-react";
import { AnimatedPage } from "../components/AnimatedPage";
import { getPackages, getRanks, getHonoraryRanks } from "../data/tiens";
import { cn } from "../utils/cn";
import { useLanguage } from "../contexts/LanguageContext";

export function Join() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<"packages" | "ranks">("packages");
  
  const packages = getPackages(language);
  const ranks = getRanks(language);
  const honoraryRanks = getHonoraryRanks(language);

  return (
    <AnimatedPage className="space-y-10 pb-24">
      <div className="flex flex-col gap-3 px-2">
        <h1 className="text-[2.5rem] font-serif text-slate-900 tracking-tight leading-none">{t('join.title')}</h1>
        <p className="text-slate-500 text-sm leading-relaxed max-w-[90%] font-light">{t('join.desc')}</p>
      </div>

      <div className="bg-gradient-to-br from-[#0a0f0d] to-[#1a2e24] rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden mx-2">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#c2a67a]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#2c4c3b]/20 rounded-full blur-2xl"></div>
        
        <h2 className="text-3xl font-serif mb-8 relative z-10">{t('join.why')}</h2>
        <ul className="space-y-5 relative z-10">
          {[
            { icon: DollarSign, text: t('join.benefit1') },
            { icon: TrendingUp, text: t('join.benefit2') },
            { icon: Award, text: t('join.benefit3') },
            { icon: CheckCircle2, text: t('join.benefit4') },
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center shrink-0 text-[#c2a67a]">
                <item.icon size={24} strokeWidth={1.5} />
              </div>
              <span className="text-sm font-light text-slate-200 leading-relaxed">{item.text}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="px-2">
        <div className="flex gap-2 bg-[#f8f6f0] p-1.5 rounded-full border border-slate-200/50">
          <button
            onClick={() => setActiveTab("packages")}
            className={cn(
              "flex-1 py-3 rounded-full text-sm font-medium transition-all duration-300",
              activeTab === "packages" ? "bg-white text-[#0a0f0d] shadow-sm" : "text-slate-500 hover:text-slate-900"
            )}
          >
            {t('join.tab.packages')}
          </button>
          <button
            onClick={() => setActiveTab("ranks")}
            className={cn(
              "flex-1 py-3 rounded-full text-sm font-medium transition-all duration-300",
              activeTab === "ranks" ? "bg-white text-[#0a0f0d] shadow-sm" : "text-slate-500 hover:text-slate-900"
            )}
          >
            {t('join.tab.ranks')}
          </button>
        </div>
      </div>

      <div className="px-2">
        {activeTab === "packages" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 gap-4"
          >
            {packages.map((pkg, i) => (
              <div key={i} className={cn("rounded-[2rem] p-6 text-white shadow-lg flex flex-col justify-between h-[260px] relative overflow-hidden", pkg.color)}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-serif mb-2">{pkg.name}</h3>
                  <p className="text-[10px] uppercase tracking-widest opacity-80 font-bold">{pkg.bv} {t('join.packages.req')}</p>
                </div>
                <div className="relative z-10 space-y-4">
                  <div>
                    <div className="text-[9px] uppercase tracking-widest opacity-70 mb-1">{t('join.packages.sponsor')}</div>
                    <div className="text-2xl font-serif">{pkg.bonus}</div>
                  </div>
                  <div>
                    <div className="text-[9px] uppercase tracking-widest opacity-70 mb-1">{t('join.packages.cap')}</div>
                    <div className="text-sm font-medium">{pkg.weeklyCap}</div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === "ranks" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-10"
          >
            <div>
              <h3 className="text-3xl font-serif text-slate-900 mb-6">{t('join.ranks.star')}</h3>
              <div className="space-y-4">
                {ranks.map((rank, i) => (
                  <div key={i} className="bg-white p-5 rounded-[1.5rem] shadow-sm border border-slate-100 flex items-center justify-between group hover:border-[#c2a67a]/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#f8f6f0] rounded-2xl flex items-center justify-center group-hover:bg-[#c2a67a]/10 transition-colors">
                        <Star size={24} className="text-[#c2a67a] fill-[#c2a67a]" />
                      </div>
                      <span className="font-serif text-xl text-slate-900">{rank.stars} Star</span>
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 bg-slate-50 px-4 py-2 rounded-full border border-slate-100 uppercase tracking-wider">{rank.requirement}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-serif text-slate-900 mb-6">{t('join.ranks.honorary')}</h3>
              <div className="space-y-4">
                {honoraryRanks.map((rank, i) => (
                  <div key={i} className="bg-[#0a0f0d] p-6 rounded-[2rem] shadow-xl flex flex-col gap-3 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-[#c2a67a]/10 rounded-full blur-3xl"></div>
                    <span className="font-serif text-2xl text-[#c2a67a] relative z-10">{rank.name}</span>
                    <span className="text-sm text-slate-400 font-light relative z-10 leading-relaxed">{rank.requirement}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="pt-6 pb-8 px-2">
        <button className="w-full bg-[#0a0f0d] text-white py-4 rounded-2xl font-medium text-lg shadow-xl hover:bg-[#2c4c3b] transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2">
          <span>{t('join.cta')}</span>
        </button>
        <p className="text-center text-xs text-slate-400 mt-6 leading-relaxed px-6 font-light">
          {t('join.note')}
        </p>
      </div>
    </AnimatedPage>
  );
}
