import { Home, Store, LayoutGrid, Info, UserPlus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../utils/cn";
import { useLanguage } from "../contexts/LanguageContext";
import { motion } from "motion/react";
import { useState, useEffect } from "react";

const NAV_ITEMS = [
  { id: "home", labelKey: "nav.home", icon: Home, path: "/" },
  { id: "store", labelKey: "nav.store", icon: Store, path: "/store" },
  { id: "products", labelKey: "nav.products", icon: LayoutGrid, path: "/products" },
  { id: "about", labelKey: "nav.about", icon: Info, path: "/about" },
  { id: "join", labelKey: "nav.join", icon: UserPlus, path: "/join" },
];

export function BottomNav() {
  const location = useLocation();
  const { t } = useLanguage();
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        setIsKeyboardOpen(true);
      }
    };
    
    const handleFocusOut = () => {
      setIsKeyboardOpen(false);
    };

    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);

    return () => {
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  return (
    <div 
      className={cn(
        "fixed bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4 pb-safe transition-all duration-300 ease-in-out",
        isKeyboardOpen ? "translate-y-32 opacity-0" : "translate-y-0 opacity-100"
      )}
    >
      <nav className="w-full max-w-[24rem] bg-[#fcfcfc]/90 backdrop-blur-2xl border border-white/60 p-1.5 rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.08)] pointer-events-auto flex items-center justify-between relative">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              to={item.path}
              className={cn(
                "relative flex flex-col items-center justify-center flex-1 h-[3.5rem] rounded-[1.5rem] transition-all duration-300 z-10",
                isActive ? "text-[#0a0f0d]" : "text-slate-400 hover:text-slate-600"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-indicator-elegant"
                  className="absolute inset-0 bg-white shadow-sm border border-slate-100/50 rounded-[1.5rem]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <motion.div
                animate={{ 
                  y: isActive ? -6 : 0,
                  scale: isActive ? 1.05 : 1
                }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="relative z-10"
              >
                <Icon 
                  size={20} 
                  strokeWidth={isActive ? 2 : 1.5} 
                  fill="none"
                />
              </motion.div>
              <motion.span 
                animate={{ 
                  opacity: isActive ? 1 : 0,
                  y: isActive ? 0 : 10,
                  scale: isActive ? 1 : 0.8
                }}
                transition={{ duration: 0.2 }}
                className="text-[9px] font-bold uppercase tracking-widest absolute bottom-2 whitespace-nowrap z-10 text-[#c2a67a]"
              >
                {t(item.labelKey)}
              </motion.span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
