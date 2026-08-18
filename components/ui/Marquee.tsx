"use client";

import clsx from "clsx";

type MarqueeProps = {
    items: string[];
    /** Seconds for one full loop */
    speed?: number;
    reverse?: boolean;
    className?: string;
    separator?: string;
    /** Type scale for the items — override when embedding in a small tile */
    textClassName?: string;
    /** Horizontal space between items */
    gapClassName?: string;
    /**
     * Percentage of the width used to fade each edge. Narrow containers need a
     * bigger value or words get cut mid-glyph instead of dissolving.
     */
    fade?: number;
};

/**
 * Infinite ticker. The track holds two identical copies and translates -50%,
 * so the seam lands exactly where the second copy starts.
 */
export default function Marquee({
    items,
    speed = 42,
    reverse = false,
    className,
    separator = "✦",
    textClassName = "font-display text-2xl tracking-tight text-fg-muted/70 md:text-4xl",
    gapClassName = "gap-6 px-6",
    fade = 14,
}: MarqueeProps) {
    const track = [...items, ...items];

    // Set inline so the fade width stays configurable per instance.
    const maskImage = `linear-gradient(90deg, transparent 0%, #000 ${fade}%, #000 ${100 - fade
        }%, transparent 100%)`;

    return (
        <div
            className={clsx("relative overflow-hidden", className)}
            style={{ maskImage, WebkitMaskImage: maskImage }}
        >
            <div
                className="flex w-max items-center"
                style={{
                    animation: `marquee ${speed}s linear infinite${reverse ? " reverse" : ""
                        }`,
                }}
            >
                {track.map((item, i) => (
                    <span
                        key={`${item}-${i}`}
                        className={clsx("flex shrink-0 items-center", gapClassName)}
                    >
                        <span className={textClassName}>{item}</span>
                        <span className="text-sm text-gold/50">{separator}</span>
                    </span>
                ))}
            </div>
        </div>
    );
}
