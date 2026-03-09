import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User, Phone, MapPin, ChevronDown, ArrowLeft, Loader2 } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { cn } from "../utils/cn";

interface CheckoutFormProps {
  onSubmit: (data: { name: string; phone: string; location: string }) => Promise<void>;
  onBack: () => void;
  isSubmitting: boolean;
}

const SUDAN_REGIONS = [
  "Khartoum (الخرطوم)",
  "Omdurman (أم درمان)",
  "Bahri (بحري)",
  "Port Sudan (بورتسودان)",
  "Atbara (عطبرة)",
  "Kassala (كسلا)",
  "Wad Madani (ود مدني)",
  "El Obeid (الأبيض)",
  "Other (منطقة أخرى)"
];

export function CheckoutForm({ onSubmit, onBack, isSubmitting }: CheckoutFormProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [isLocationOpen, setIsLocationOpen] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.location) newErrors.location = "Please select a location";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  // Rope ladder animation variants
  const ladderVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.3
      }
    },
    exit: { 
      opacity: 0,
      transition: { 
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const rungVariants = {
    hidden: (i: number) => ({ 
      opacity: 0, 
      y: -(i * 54 + 20), // Stack them all at the top (54px is approx height + margin)
      rotateX: -90,
      rotateZ: -10,
      scale: 0.9,
      zIndex: 100 - i // Stacking order
    }),
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      rotateZ: 0,
      scale: 1,
      transition: { 
        type: "spring", 
        damping: 10, 
        stiffness: 120,
        mass: 1
      }
    },
    exit: (i: number) => ({ 
      opacity: 0, 
      y: -(i * 54 + 20), 
      rotateX: -60,
      scale: 0.9,
      transition: { duration: 0.3 }
    })
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col h-full"
    >
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
        >
          <ArrowLeft size={20} />
        </button>
        <h3 className="text-xl font-serif text-slate-900">{t('checkout.title')}</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 flex-1 pb-10">
        {/* Full Name */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
            {t('checkout.name')}
          </label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={cn(
                "w-full bg-slate-50 border-2 border-transparent focus:border-[#c2a67a]/30 focus:bg-white rounded-2xl py-4 pl-12 pr-4 outline-none transition-all",
                errors.name && "border-red-100 bg-red-50/30"
              )}
              placeholder="e.g. Li Jinyuan"
            />
          </div>
          {errors.name && <p className="text-red-500 text-[10px] mt-1 ml-1 animate-in fade-in slide-in-from-top-1">Name is required</p>}
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
            {t('checkout.phone')}
          </label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={cn(
                "w-full bg-slate-50 border-2 border-transparent focus:border-[#c2a67a]/30 focus:bg-white rounded-2xl py-4 pl-12 pr-4 outline-none transition-all",
                errors.phone && "border-red-100 bg-red-50/30"
              )}
              placeholder="+249..."
            />
          </div>
          {errors.phone && <p className="text-red-500 text-[10px] mt-1 ml-1 animate-in fade-in slide-in-from-top-1">Phone is required</p>}
        </div>

        {/* Location Custom Dropdown (Rope Ladder) */}
        <div className="space-y-2 relative z-50">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
            {t('checkout.location')}
          </label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c2a67a]" size={18} />
            <button
              type="button"
              onClick={() => setIsLocationOpen(!isLocationOpen)}
              className={cn(
                "w-full bg-slate-50 border-2 border-transparent text-left rounded-2xl py-4 pl-12 pr-10 outline-none transition-all flex items-center justify-between",
                isLocationOpen && "border-[#c2a67a]/30 bg-white shadow-sm",
                errors.location && "border-red-100 bg-red-50/30",
                !formData.location && "text-slate-400"
              )}
            >
              <span className="truncate">{formData.location || t('checkout.location.placeholder')}</span>
              <motion.div
                animate={{ rotate: isLocationOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={18} />
              </motion.div>
            </button>

            <AnimatePresence>
              {isLocationOpen && (
                <motion.div
                  variants={ladderVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute top-[110%] left-0 right-0 bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden pt-4 pb-2"
                >
                  {/* Decorative Ropes */}
                  <div className="absolute left-6 top-0 bottom-0 w-[1.5px] bg-[#c2a67a]/20 z-0">
                    <div className="absolute top-0 -left-[2px] w-1.5 h-1.5 rounded-full bg-[#c2a67a]/40" />
                  </div>
                  <div className="absolute right-6 top-0 bottom-0 w-[1.5px] bg-[#c2a67a]/20 z-0">
                    <div className="absolute top-0 -left-[2px] w-1.5 h-1.5 rounded-full bg-[#c2a67a]/40" />
                  </div>

                  <div className="max-h-[250px] overflow-y-auto px-4 hide-scrollbar">
                    {SUDAN_REGIONS.map((region, idx) => (
                      <motion.button
                        key={region}
                        custom={idx}
                        variants={rungVariants}
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, location: region });
                          setIsLocationOpen(false);
                        }}
                        className={cn(
                          "w-full text-left py-3.5 px-6 rounded-xl mb-2 transition-all relative z-10 flex items-center gap-3 active:scale-[0.97]",
                          formData.location === region 
                            ? "bg-[#2c4c3b] text-white shadow-md shadow-[#2c4c3b]/20" 
                            : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                        )}
                      >
                        <div className={cn(
                          "w-1.5 h-1.5 rounded-full shrink-0",
                          formData.location === region ? "bg-[#c2a67a]" : "bg-slate-300"
                        )} />
                        {region}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {errors.location && <p className="text-red-500 text-[10px] mt-1 ml-1 animate-in fade-in slide-in-from-top-1">Please select a location</p>}
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting || isLocationOpen}
            className="w-full bg-[#0a0f0d] text-white py-4 rounded-2xl font-medium shadow-xl hover:bg-[#2c4c3b] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              t('checkout.submit')
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
