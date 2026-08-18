"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type MagneticProps = {
    children: React.ReactNode;
    className?: string;
    /** How far the element chases the cursor, 0–1 */
    strength?: number;
};

/**
 * Spring-based magnetic pull. Unlike a raw transform assignment this settles
 * with real physics, so the release feels weighted instead of snapping back.
 */
export default function Magnetic({
    children,
    className,
    strength = 0.35,
}: MagneticProps) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springX = useSpring(x, { stiffness: 190, damping: 15, mass: 0.35 });
    const springY = useSpring(y, { stiffness: 190, damping: 15, mass: 0.35 });

    const handleMove = (e: React.MouseEvent) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
        y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
    };

    const handleLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            style={{ x: springX, y: springY }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
