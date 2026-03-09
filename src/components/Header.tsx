import { Bell, User, Globe, ChevronDown } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { TiensLogo } from "./TiensLogo";

export function Header() {
  const { toggleLanguage, language } = useLanguage();

  return (
    <header className="sticky top-0 z-50 bg-[#fcfcfc]/80 backdrop-blur-2xl px-4 py-4 flex items-center justify-between border-b border-slate-100/50">
      <div className="flex items-center gap-2">
        <TiensLogo className="h-8 w-auto" />
        <span className="font-serif text-2xl tracking-tight text-slate-900 mt-1">Tiens</span>
      </div>
      <div className="flex items-center gap-3">
        <button 
          onClick={toggleLanguage}
          className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200/60 bg-white rounded-full text-[#0a0f0d] hover:bg-slate-50 transition-colors text-xs font-bold shadow-sm"
        >
          <Globe size={14} className="text-[#c2a67a]" />
          <span className="font-serif tracking-wide mt-0.5">{language === 'en' ? 'AR' : 'EN'}</span>
          <ChevronDown size={14} className="text-[#c2a67a]" />
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-200/60 text-slate-600 hover:bg-slate-50 transition-colors relative shadow-sm">
          <Bell size={18} strokeWidth={1.5} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-200/60 text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
          <User size={18} strokeWidth={1.5} />
        </button>
      </div>
    </header>
  );
}
