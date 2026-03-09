import { motion } from "motion/react";
import { ReactNode } from "react";
import { cn } from "../utils/cn";

export function AnimatedPage({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ 
        duration: 0.4, 
        ease: [0.23, 1, 0.32, 1]
      }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}
