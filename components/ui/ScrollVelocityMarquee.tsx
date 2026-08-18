"use client";

import { useRef } from "react";
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useVelocity,
    useAnimationFrame,
    useMotionValue,
} from "framer-motion";
import clsx from "clsx";

type Props = {
    items: string[];
    /** Base drift in px/sec when the page is still */
    baseVelocity?: number;
    className?: string;
    separator?: string;
};

const wrap = (min: number, max: number, v: number) => {
    const range = max - min;
    return ((((v - min) % range) + range) % range) + min;
};

/**
 * Ticker whose speed, direction and skew all respond to scroll velocity —
 * it drifts when the page is still, races and leans when you scroll.
 */
export default function ScrollVelocityMarquee({
    items,
    baseVelocity = 2.5,
    className,
    separator = "✦",
}: Props) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);

    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 380,
    });

    // Scroll speed maps onto a multiplier; the clamp keeps it from going wild.
    const velocityFactor = useTransform(smoothVelocity, [0, 1200], [0, 4], {
        clamp: false,
    });

    const skew = useTransform(smoothVelocity, [-1800, 0, 1800], [6, 0, -6], {
        clamp: true,
    });
    const smoothSkew = useSpring(skew, { damping: 40, stiffness: 220 });

    const directionRef = useRef(1);

    useAnimationFrame((_, delta) => {
        let moveBy = directionRef.current * baseVelocity * (delta / 1000);

        const v = velocityFactor.get();
        // Scrolling backwards flips the ticker direction.
        if (v < 0) directionRef.current = -1;
        else if (v > 0) directionRef.current = 1;

        moveBy += directionRef.current * moveBy * v;
        baseX.set(baseX.get() + moveBy);
    });

    // Four copies so the -25% wrap always has content on both sides.
    const track = [...items, ...items, ...items, ...items];
    const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

    const maskImage =
        "linear-gradient(90deg, transparent 0%, #000 10%, #000 90%, transparent 100%)";

    return (
        <div
            className={clsx("relative overflow-hidden", className)}
            style={{ maskImage, WebkitMaskImage: maskImage }}
        >
            <motion.div style={{ skewX: smoothSkew }}>
                <motion.div className="flex w-max items-center" style={{ x }}>
                    {track.map((item, i) => (
                        <span
                            key={`${item}-${i}`}
                            className="flex shrink-0 items-center gap-7 px-7"
                        >
                            <span className="font-display text-3xl tracking-tight text-fg-muted/60 transition-colors duration-500 hover:text-gold md:text-5xl">
                                {item}
                            </span>
                            <span className="text-base text-gold/45">{separator}</span>
                        </span>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
}
