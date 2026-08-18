"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

type SectionHeadingProps = {
    title: string;
    subtitle?: string;
    /** Italic serif tail rendered in gold, e.g. "& Achievements" */
    accent?: string;
    /** Small monospace index, e.g. "02" */
    index?: string;
    /** Label shown beside the index */
    eyebrow?: string;
    className?: string;
};

export default function SectionHeading({
    title,
    subtitle,
    accent,
    index,
    eyebrow,
    className,
}: SectionHeadingProps) {
    return (
        <header className={clsx("mb-14 md:mb-20", className)}>
            {(index || eyebrow) && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="mb-5 flex items-center gap-3"
                >
                    {index && (
                        <span className="font-mono text-[11px] text-gold">{index}</span>
                    )}
                    <span className="h-px w-8 bg-gold/40" />
                    {eyebrow && <span className="eyebrow">{eyebrow}</span>}
                </motion.div>
            )}

            <div className="overflow-hidden">
                <motion.h1
                    initial={{ y: "108%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display text-section text-fg"
                >
                    {title}
                    {accent && (
                        <>
                            {" "}
                            <span className="serif-accent text-gilded">{accent}</span>
                        </>
                    )}
                </motion.h1>
            </div>

            {subtitle && (
                <motion.p
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.25 }}
                    className="mt-6 max-w-xl text-pretty text-[15px] leading-relaxed text-fg-muted md:text-base"
                >
                    {subtitle}
                </motion.p>
            )}

            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="mt-10 h-px origin-left bg-gradient-to-r from-white/20 via-white/10 to-transparent"
            />
        </header>
    );
}
