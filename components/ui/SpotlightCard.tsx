"use client";

import { useRef } from "react";
import clsx from "clsx";

type SpotlightCardProps = {
    children: React.ReactNode;
    className?: string;
    /** Max tilt in degrees. 0 disables the 3D effect. */
    tilt?: number;
    as?: "div" | "article" | "li";
};

/**
 * Card that tracks the cursor two ways: a radial spotlight (via --mx/--my,
 * consumed by the .spotlight class) and an optional perspective tilt.
 * Both are written straight to style to avoid re-rendering on every mousemove.
 */
export default function SpotlightCard({
    children,
    className,
    tilt = 0,
    as: Tag = "div",
}: SpotlightCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    const handleMove = (e: React.MouseEvent) => {
        const el = ref.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;

        el.style.setProperty("--mx", `${px * 100}%`);
        el.style.setProperty("--my", `${py * 100}%`);

        if (tilt > 0) {
            const rx = (0.5 - py) * tilt * 2;
            const ry = (px - 0.5) * tilt * 2;
            el.style.transform = `perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
        }
    };

    const handleLeave = () => {
        const el = ref.current;
        if (!el) return;
        if (tilt > 0) {
            el.style.transform =
                "perspective(1100px) rotateX(0deg) rotateY(0deg) translateZ(0)";
        }
    };

    return (
        <Tag
            ref={ref as React.Ref<never>}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            className={clsx("spotlight relative overflow-hidden", className)}
            style={{
                transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
                transformStyle: tilt > 0 ? "preserve-3d" : undefined,
            }}
        >
            {children}
        </Tag>
    );
}
