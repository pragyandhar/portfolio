"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import clsx from "clsx";

type Props = {
    text: string;
    className?: string;
    /** Words rendered in gold serif italic */
    accentWords?: string[];
};

function Word({
    children,
    range,
    progress,
    accent,
}: {
    children: string;
    range: [number, number];
    progress: MotionValue<number>;
    accent: boolean;
}) {
    const opacity = useTransform(progress, range, [0.14, 1]);

    return (
        <span className="relative mr-[0.26em] inline-block">
            <motion.span
                style={{ opacity }}
                className={clsx(
                    "inline-block",
                    accent && "serif-accent text-gold"
                )}
            >
                {children}
            </motion.span>
        </span>
    );
}

/**
 * Manifesto type that illuminates word by word as it scrolls through the
 * viewport — the reader's eye and the animation move at the same pace.
 */
export default function ScrollHighlightText({
    text,
    className,
    accentWords = [],
}: Props) {
    const ref = useRef<HTMLParagraphElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 0.82", "end 0.55"],
    });

    const words = text.split(" ");
    const accentSet = new Set(accentWords.map((w) => w.toLowerCase()));

    return (
        <p ref={ref} className={clsx("flex flex-wrap", className)}>
            {words.map((word, i) => {
                const start = i / words.length;
                const end = start + 1 / words.length;
                const clean = word.replace(/[.,—]/g, "").toLowerCase();

                return (
                    <Word
                        key={`${word}-${i}`}
                        range={[start, end]}
                        progress={scrollYProgress}
                        accent={accentSet.has(clean)}
                    >
                        {word}
                    </Word>
                );
            })}
        </p>
    );
}
