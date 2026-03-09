import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { translations } from '../i18n/translations';
import { LanguageTransition } from '../components/LanguageTransition';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextLang, setNextLang] = useState<Language>('en');

  const toggleLanguage = useCallback(() => {
    if (isTransitioning) return;
    
    const targetLang = language === 'en' ? 'ar' : 'en';
    setNextLang(targetLang);
    setIsTransitioning(true);
    
    // Halfway through the animation, swap the language
    setTimeout(() => {
      setLanguage(targetLang);
      document.documentElement.dir = targetLang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = targetLang;
    }, 600);
    
    // End transition
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1200);
  }, [language, isTransitioning]);

  const t = useCallback((key: string) => {
    return (translations[language] as any)[key] || key;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, dir: language === 'ar' ? 'rtl' : 'ltr' }}>
      {children}
      <LanguageTransition isVisible={isTransitioning} nextLang={nextLang} />
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
