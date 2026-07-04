"use client";
import { motion } from "framer-motion";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

export function ScaleReveal({
  children,
  delay = 0,
  className,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.04 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, ease: EASE, delay }}
      className={className}
      style={{ overflow: "hidden", ...style }}
    >
      {children}
    </motion.div>
  );
}
