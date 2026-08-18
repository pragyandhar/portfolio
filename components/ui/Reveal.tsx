"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

type RevealProps = {
    children: React.ReactNode;
    className?: string;
    /** Stagger delay in ms */
    delay?: number;
    /** Slide distance in px */
    y?: number;
    as?: "div" | "section" | "li" | "article" | "span";
};

/**
 * IntersectionObserver-driven reveal. Cheaper than a motion component per node
 * and it degrades to "always visible" under prefers-reduced-motion via CSS.
 */
export default function Reveal({
    children,
    className,
    delay = 0,
    y = 28,
    as: Tag = "div",
}: RevealProps) {
    const ref = useRef<HTMLElement>(null);
    const [shown, setShown] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Already in view on mount (above the fold) — show without waiting.
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setShown(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <Tag
            ref={ref as React.Ref<never>}
            className={clsx("reveal", shown && "is-in", className)}
            style={
                {
                    transitionDelay: `${delay}ms`,
                    "--reveal-y": `${y}px`,
                    transform: shown ? undefined : `translateY(${y}px)`,
                } as React.CSSProperties
            }
        >
            {children}
        </Tag>
    );
}
