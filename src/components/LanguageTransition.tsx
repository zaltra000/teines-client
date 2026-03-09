import { motion, AnimatePresence } from 'motion/react';

const layer1Variants = {
  initial: { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' },
  animate: { 
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
  },
  exit: { 
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
  }
};

const layer2Variants = {
  initial: { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' },
  animate: { 
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.1 }
  },
  exit: { 
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.1 }
  }
};

const layer3Variants = {
  initial: { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' },
  animate: { 
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
  },
  exit: { 
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
  }
};

const textVariants = {
  initial: { opacity: 0, y: 20, filter: 'blur(10px)' },
  animate: { 
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }
  },
  exit: { 
    opacity: 0, y: -20, filter: 'blur(10px)',
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
  }
};

export function LanguageTransition({ isVisible, nextLang }: { isVisible: boolean, nextLang: string }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center overflow-hidden">
          <motion.div
            variants={layer1Variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 bg-[#c2a67a]"
          />
          <motion.div
            variants={layer2Variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 bg-[#1a2e24]"
          />
          <motion.div
            variants={layer3Variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 bg-[#2c4c3b] flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#c2a67a]/10 via-transparent to-transparent opacity-50"></div>
            <motion.div
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-[#e8dec8] text-4xl font-serif tracking-widest flex flex-col items-center gap-6 relative z-10"
            >
              <span>
                {nextLang === 'ar' ? 'العربية' : 'ENGLISH'}
              </span>
              <div className="flex gap-3">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1, transition: { delay: 0.5 + i * 0.1, duration: 0.3, ease: "backOut" } }}
                    exit={{ scale: 0, opacity: 0, transition: { duration: 0.2 } }}
                    className="w-1.5 h-1.5 rounded-full bg-[#c2a67a]"
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
