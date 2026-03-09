import { motion } from "motion/react";
import { ArrowRight, Sparkles, ShieldCheck, Heart, Zap, Star, ChevronRight } from "lucide-react";
import { AnimatedPage } from "../components/AnimatedPage";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useProducts } from "../hooks/useProducts";

export function Home() {
  const { t, language, dir } = useLanguage();
  const { products, isLoading } = useProducts();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <AnimatedPage className="space-y-10 pb-24">
      {/* Hero Section - Editorial Style */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-[#0a0f0d] text-white shadow-2xl min-h-[400px] flex flex-col justify-end p-8">
        <div className="absolute inset-0">
          <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] bg-[#c2a67a]/30 rounded-full blur-[40px] mix-blend-screen"></div>
          <div className="absolute bottom-[-10%] left-[-20%] w-[60%] h-[60%] bg-[#2c4c3b]/60 rounded-full blur-[30px] mix-blend-screen"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0d] via-[#0a0f0d]/40 to-transparent"></div>
        </div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="relative z-10"
        >
          <motion.span variants={itemVariants} className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-6 text-[#e8dec8]">
            {t('home.hero.badge')}
          </motion.span>
          <motion.h1 variants={itemVariants} className="text-[2.75rem] font-serif leading-[1.1] mb-4 tracking-tight">
            {t('home.hero.title1')} <br />
            <span className="text-[#c2a67a] font-light italic">{t('home.hero.title2')}</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-slate-300 text-sm mb-8 max-w-[280px] leading-relaxed font-light">
            {t('home.hero.desc')}
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link
              to="/join"
              className="group inline-flex items-center gap-3 bg-white text-[#0a0f0d] px-7 py-4 rounded-full font-medium shadow-[0_0_40px_rgba(194,166,122,0.3)] hover:scale-105 transition-all duration-300"
            >
              {t('home.hero.cta')} 
              <span className="bg-[#f2efe9] p-1.5 rounded-full group-hover:bg-[#c2a67a] group-hover:text-white transition-colors">
                <ArrowRight size={16} className={dir === 'rtl' ? 'rotate-180' : ''} />
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Philosophy Section - Minimal Utility */}
      <section>
        <div className="flex items-end justify-between mb-6 px-2">
          <h2 className="text-3xl font-serif text-slate-900 tracking-tight">{t('home.philosophy.title')}</h2>
          <Link to="/about" className="text-sm text-slate-500 font-medium flex items-center gap-1 hover:text-[#c2a67a] transition-colors pb-1">
            {t('home.philosophy.more')} <ChevronRight size={16} className={dir === 'rtl' ? 'rotate-180' : ''} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: Sparkles, title: t('home.philosophy.cleansing'), desc: t('home.philosophy.cleansing.desc') },
            { icon: Zap, title: t('home.philosophy.replenishing'), desc: t('home.philosophy.replenishing.desc') },
            { icon: ShieldCheck, title: t('home.philosophy.strengthening'), desc: t('home.philosophy.strengthening.desc') },
            { icon: Heart, title: t('home.philosophy.beauty'), desc: t('home.philosophy.beauty.desc') }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (i * 0.1) }}
              whileHover={{ y: -4, boxShadow: "0 10px 40px -10px rgba(0,0,0,0.08)" }}
              className="bg-white p-5 rounded-[1.5rem] shadow-sm border border-slate-100 flex flex-col gap-3 transition-all duration-300"
            >
              <div className="w-10 h-10 bg-[#f8f6f0] text-[#c2a67a] rounded-2xl flex items-center justify-center">
                <item.icon size={20} strokeWidth={2} />
              </div>
              <div>
                <h3 className="font-serif text-lg text-slate-900 mb-1">{item.title}</h3>
                <p className="text-[11px] text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Top Products - Horizontal Scroll */}
      <section className="relative">
        <div className="flex items-end justify-between mb-6 px-2">
          <h2 className="text-3xl font-serif text-slate-900 tracking-tight">{t('home.products.title')}</h2>
          <Link to="/products" className="text-sm text-slate-500 font-medium flex items-center gap-1 hover:text-[#c2a67a] transition-colors pb-1">
            {t('home.products.all')} <ChevronRight size={16} className={dir === 'rtl' ? 'rotate-180' : ''} />
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-6 snap-x hide-scrollbar -mx-4 px-4">
          {products.slice(0, 4).map((product, i) => (
            <motion.div 
              key={product.id} 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + (i * 0.1) }}
              className="snap-start shrink-0 w-[200px] group cursor-pointer"
            >
              <div className="w-full h-[240px] bg-[#f8f6f0] rounded-[2rem] overflow-hidden relative mb-4">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-out" 
                  referrerPolicy="no-referrer" 
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 text-[10px] font-bold text-[#2c4c3b] shadow-sm">
                  <Star size={10} fill="currentColor" className="text-[#c2a67a]" /> 4.9
                </div>
              </div>
              <div className="px-2">
                <p className="text-[10px] text-[#c2a67a] font-bold uppercase tracking-widest mb-1">{product.category}</p>
                <h3 className="font-serif text-lg text-slate-900 leading-tight mb-2 line-clamp-1">{product.name}</h3>
                <div className="font-medium text-slate-900">
                  {product.currency}{product.price.toLocaleString()}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Opportunity - Glassmorphism */}
      <section className="bg-[#2c4c3b] rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#8eb897]/30 rounded-full blur-[60px]"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#1a2e24]/80 rounded-full blur-[60px]"></div>
        
        <div className="relative z-10">
          <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold tracking-widest uppercase mb-4 text-[#8eb897]">
            Business
          </span>
          <h2 className="text-3xl font-serif mb-3 leading-tight">{t('home.opportunity.title')}</h2>
          <p className="text-[#8eb897] text-sm mb-8 leading-relaxed max-w-[90%] font-light">
            {t('home.opportunity.desc')}
          </p>
          
          <div className="flex gap-3 overflow-x-auto pb-2 snap-x hide-scrollbar">
            {['Bronze', 'Silver', 'Gold', 'Platinum'].map((tier, i) => (
              <div key={tier} className="snap-center shrink-0 w-[140px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-[1.5rem] p-6 flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors">
                <div className="text-4xl font-serif text-white mb-3 font-light">{i + 1}</div>
                <div className="text-sm font-medium tracking-wide text-[#e8dec8]">{tier}</div>
                <div className="text-[9px] text-white/50 uppercase tracking-[0.2em] mt-2">{t('home.opportunity.package')}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AnimatedPage>
  );
}
