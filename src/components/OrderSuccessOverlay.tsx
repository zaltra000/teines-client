import { motion } from "motion/react";
import { CheckCircle2, ShoppingBag } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { cn } from "../utils/cn";

interface OrderSuccessOverlayProps {
  onClose: () => void;
}

export function OrderSuccessOverlay({ onClose }: OrderSuccessOverlayProps) {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#0a0f0d]/90 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="w-full max-w-sm bg-white rounded-[2.5rem] p-8 text-center shadow-2xl relative overflow-hidden"
      >
        {/* Celebration Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 180],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute -top-24 -right-24 w-48 h-48 bg-[#c2a67a] rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, -90, -180],
              opacity: [0.1, 0.15, 0.1]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#2c4c3b] rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 15,
              delay: 0.2 
            }}
            className="w-20 h-20 bg-[#2c4c3b] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#2c4c3b]/20"
          >
            <CheckCircle2 size={40} className="text-[#c2a67a]" strokeWidth={1.5} />
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-serif text-slate-900 mb-2"
          >
            {t('checkout.success.title')}
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-slate-500 font-light mb-8 leading-relaxed"
          >
            {t('checkout.success.desc')}
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="w-full bg-[#0a0f0d] text-white py-4 rounded-2xl font-medium shadow-xl hover:bg-[#2c4c3b] transition-all duration-300 flex items-center justify-center gap-2"
          >
            <ShoppingBag size={18} />
            {t('checkout.success.button')}
          </motion.button>
        </div>

        {/* Confetti-like small elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: 0, 
              y: 0, 
              scale: 0,
              rotate: 0 
            }}
            animate={{ 
              x: (i % 2 === 0 ? 1 : -1) * (Math.random() * 100 + 50),
              y: -Math.random() * 150 - 50,
              scale: [0, 1, 0],
              rotate: Math.random() * 360
            }}
            transition={{ 
              duration: 2, 
              delay: 0.2 + (i * 0.1),
              repeat: Infinity,
              repeatDelay: 1
            }}
            className={cn(
              "absolute top-1/2 left-1/2 w-2 h-2 rounded-sm",
              i % 3 === 0 ? "bg-[#c2a67a]" : i % 3 === 1 ? "bg-[#2c4c3b]" : "bg-slate-300"
            )}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
