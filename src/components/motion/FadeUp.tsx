"use client";
import { motion } from "framer-motion";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
  as?: keyof typeof motion;
}

export function FadeUp({ children, delay = 0, duration = 0.6, className, style }: FadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration, ease: EASE, delay }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
