import { ReactNode, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "./Header";
import { BottomNav } from "./BottomNav";

export function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <div className="h-[100dvh] bg-[#fcfcfc] flex flex-col font-sans text-slate-900 overflow-hidden max-w-md mx-auto relative shadow-2xl border-x border-slate-200/50">
      <Header />
      <main ref={mainRef} className="flex-1 overflow-y-auto pb-32 pt-4 px-4 scroll-smooth hide-scrollbar relative">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
