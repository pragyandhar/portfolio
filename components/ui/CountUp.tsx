"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type CountUpProps = {
    /** e.g. "8.4", "40+", "13" — the numeric head animates, the rest is kept */
    value: string;
    duration?: number;
    className?: string;
};

export default function CountUp({
    value,
    duration = 1600,
    className,
}: CountUpProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.6 });
    const [display, setDisplay] = useState("0");

    useEffect(() => {
        if (!inView) return;

        const match = value.match(/^([\d.]+)(.*)$/);
        const reduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        // Non-numeric values and reduced-motion users jump straight to the
        // final string — deferred a frame so we never setState inline here.
        if (!match || reduced) {
            const id = requestAnimationFrame(() => setDisplay(value));
            return () => cancelAnimationFrame(id);
        }

        const target = parseFloat(match[1]);
        const suffix = match[2] ?? "";
        const decimals = (match[1].split(".")[1] ?? "").length;

        const start = performance.now();
        let raf = 0;

        const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 4);
            setDisplay(`${(target * eased).toFixed(decimals)}${suffix}`);
            if (t < 1) raf = requestAnimationFrame(tick);
        };

        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [inView, value, duration]);

    return (
        <span ref={ref} className={className}>
            {display}
        </span>
    );
}
