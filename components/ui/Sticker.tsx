"use client";

import clsx from "clsx";

type StickerProps = {
    children: React.ReactNode;
    variant?: "gold" | "ink" | "iris";
    /** Rotation in degrees; overrides the default -2.5deg lean */
    rotate?: number;
    className?: string;
};

/** Small rotated pill — the playful counterweight to the editorial type. */
export default function Sticker({
    children,
    variant = "gold",
    rotate,
    className,
}: StickerProps) {
    return (
        <span
            className={clsx(
                "sticker",
                variant === "gold" && "sticker-gold",
                variant === "ink" && "sticker-ink",
                variant === "iris" && "sticker-iris",
                className
            )}
            style={rotate !== undefined ? { rotate: `${rotate}deg` } : undefined}
        >
            {children}
        </span>
    );
}
