"use client";

import { useEffect } from "react";

/**
 * Lenis smooth scrolling. Skipped for reduced-motion users. Lenis is imported
 * lazily inside the effect so it never lands in the server bundle.
 */
export default function SmoothScroll() {
    useEffect(() => {
        const reduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        if (reduced) return;

        let rafId = 0;
        let destroy: (() => void) | undefined;
        let cancelled = false;

        import("@studio-freight/lenis").then(({ default: Lenis }) => {
            if (cancelled) return;

            const lenis = new Lenis({
                duration: 1.15,
                smoothWheel: true,
                wheelMultiplier: 1,
                touchMultiplier: 1.6,
                lerp: 0.09,
                easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });

            const raf = (time: number) => {
                lenis.raf(time);
                rafId = requestAnimationFrame(raf);
            };

            rafId = requestAnimationFrame(raf);
            destroy = () => lenis.destroy();
        });

        return () => {
            cancelled = true;
            cancelAnimationFrame(rafId);
            destroy?.();
        };
    }, []);

    return null;
}
