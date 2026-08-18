"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Hairline reading-progress bar pinned to the top of the viewport. */
export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 220,
        damping: 34,
        restDelta: 0.001,
    });

    return (
        <motion.div
            style={{ scaleX }}
            className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-gold via-iris to-cyan"
            aria-hidden
        />
    );
}
