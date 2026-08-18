"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import clsx from "clsx";

type OdometerProps = {
    /** e.g. "8.4", "40+", "13" — digits roll, everything else is static */
    value: string;
    className?: string;
};

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

/**
 * Slot-machine number roll. Each digit is a column of 0–9 that slides to its
 * target, staggered left-to-right so the number settles rather than snaps.
 *
 * NOTE: do not wrap this in a `background-clip: text` gradient (.text-gilded,
 * .text-iridescent). The digit columns use `overflow: hidden`, which creates a
 * clipping context the clipped background will not paint into — the glyphs
 * come out transparent. Use a solid colour instead.
 */
export default function Odometer({ value, className }: OdometerProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.6 });
    const [rolled, setRolled] = useState(false);

    useEffect(() => {
        if (!inView) return;
        const id = requestAnimationFrame(() => setRolled(true));
        return () => cancelAnimationFrame(id);
    }, [inView]);

    const chars = value.split("");

    return (
        <span
            ref={ref}
            className={clsx("odometer tabular-nums", className)}
            aria-label={value}
        >
            {chars.map((char, i) => {
                const digit = DIGITS.indexOf(char);

                // Non-digits (".", "+", "%") render statically.
                if (digit === -1) {
                    return (
                        <span key={i} aria-hidden>
                            {char}
                        </span>
                    );
                }

                return (
                    <span key={i} className="odometer-col" aria-hidden>
                        <span
                            className="odometer-track"
                            style={{
                                transform: `translateY(-${rolled ? digit : 0}em)`,
                                transitionDelay: `${i * 90}ms`,
                            }}
                        >
                            {DIGITS.map((d) => (
                                <span key={d} className="block h-[1em] leading-none">
                                    {d}
                                </span>
                            ))}
                        </span>
                    </span>
                );
            })}
        </span>
    );
}
