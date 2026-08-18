"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_CONFIG } from "@/lib/constants";

const LOAD_DURATION = 1500; // ms — deliberately short; this is a curtain, not a wait

export default function Loader() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    // Repeat visits in the same tab dismiss the curtain without the reveal.
    const [instant, setInstant] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem("intro-seen")) {
            // Deferred a frame so state is never set inline in the effect body.
            const id = requestAnimationFrame(() => {
                setInstant(true);
                setIsLoading(false);
            });
            return () => cancelAnimationFrame(id);
        }

        document.body.style.overflow = "hidden";
        const start = Date.now();
        let raf = 0;

        const tick = () => {
            const elapsed = Date.now() - start;
            // Ease-out so the counter decelerates into 100 instead of running flat.
            const linear = Math.min(elapsed / LOAD_DURATION, 1);
            const eased = 1 - Math.pow(1 - linear, 3);
            setProgress(eased * 100);
            if (linear < 1) raf = requestAnimationFrame(tick);
        };

        raf = requestAnimationFrame(tick);

        const timer = setTimeout(() => {
            setIsLoading(false);
            sessionStorage.setItem("intro-seen", "1");
            document.body.style.overflow = "";
        }, LOAD_DURATION);

        return () => {
            cancelAnimationFrame(raf);
            clearTimeout(timer);
            document.body.style.overflow = "";
        };
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    key="loader"
                    exit={{
                        clipPath: "inset(0% 0% 100% 0%)",
                        transition: {
                            duration: instant ? 0 : 0.9,
                            ease: [0.76, 0, 0.24, 1],
                        },
                    }}
                    className="fixed inset-0 z-[9999] flex flex-col justify-between bg-ink px-7 py-10 md:px-14 md:py-14"
                >
                    <div className="aurora opacity-40" />

                    {/* Top rule */}
                    <div className="relative flex items-center justify-between">
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.15 }}
                            className="eyebrow"
                        >
                            Portfolio · MMXXVI
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.25 }}
                            className="eyebrow"
                        >
                            {SITE_CONFIG.location}
                        </motion.span>
                    </div>

                    {/* Center wordmark */}
                    <div className="relative flex flex-1 flex-col items-center justify-center">
                        <div className="overflow-hidden">
                            <motion.h1
                                initial={{ y: "110%" }}
                                animate={{ y: 0 }}
                                transition={{
                                    duration: 1,
                                    ease: [0.16, 1, 0.3, 1],
                                    delay: 0.1,
                                }}
                                className="font-display text-center text-[13vw] leading-[0.85] tracking-tighter text-fg md:text-[9vw]"
                            >
                                {SITE_CONFIG.name.split(" ")[0]}{" "}
                                <span className="serif-accent text-gilded">
                                    {SITE_CONFIG.name.split(" ").slice(-1)}
                                </span>
                            </motion.h1>
                        </div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.55, duration: 0.6 }}
                            className="mt-5 font-mono text-[11px] uppercase tracking-[0.3em] text-fg-dim"
                        >
                            AI Engineer
                        </motion.p>
                    </div>

                    {/* Bottom progress */}
                    <div className="relative">
                        <div className="h-px w-full bg-white/[0.08]">
                            <motion.div
                                className="h-full origin-left bg-gradient-to-r from-gold-soft via-gold to-iris"
                                style={{ scaleX: progress / 100 }}
                            />
                        </div>
                        <div className="mt-4 flex items-end justify-between">
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="eyebrow"
                            >
                                Loading experience
                            </motion.span>
                            <span className="font-display text-4xl tabular-nums leading-none text-fg md:text-6xl">
                                {String(Math.floor(progress)).padStart(3, "0")}
                            </span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
