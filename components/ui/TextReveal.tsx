"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

type TextRevealProps = {
    text: string;
    className?: string;
    /** Delay before the first word, in seconds */
    delay?: number;
    /** Per-word stagger, in seconds */
    stagger?: number;
    once?: boolean;
};

/**
 * Masked per-word rise. Each word sits in an overflow-hidden box and slides up
 * from below the mask, which reads far more deliberate than a plain fade.
 */
export default function TextReveal({
    text,
    className,
    delay = 0,
    stagger = 0.045,
    once = true,
}: TextRevealProps) {
    const words = text.split(" ");

    return (
        <span className={clsx("inline", className)}>
            {words.map((word, i) => (
                <span
                    key={`${word}-${i}`}
                    className="inline-block overflow-hidden align-bottom"
                    style={{ paddingBottom: "0.12em", marginBottom: "-0.12em" }}
                >
                    <motion.span
                        className="inline-block"
                        initial={{ y: "110%" }}
                        whileInView={{ y: 0 }}
                        viewport={{ once, amount: 0.4 }}
                        transition={{
                            duration: 0.9,
                            delay: delay + i * stagger,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                    >
                        {word}
                        {i < words.length - 1 ? " " : ""}
                    </motion.span>
                </span>
            ))}
        </span>
    );
}
