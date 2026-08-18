"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type ParallaxWrapperProps = {
  children: React.ReactNode;
  speed?: number;
  className?: string;
};

export default function ParallaxWrapper({
  children,
  speed = 0.5,
  className,
}: ParallaxWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
