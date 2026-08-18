"use client";

import clsx from "clsx";
import SpotlightCard from "@/components/ui/SpotlightCard";

type GlassCardProps = {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    /** Retained for API compatibility; accent now tints the hover glow */
    glow?: "blue" | "purple" | "pink" | "gold" | "none";
    tilt?: number;
};

const glowRing = {
    blue: "hover:shadow-neon",
    purple: "hover:shadow-violet",
    pink: "hover:shadow-[0_18px_60px_-22px_rgba(255,122,156,0.5)]",
    gold: "hover:shadow-gold",
    none: "",
};

export default function GlassCard({
    children,
    className,
    hover = true,
    glow = "none",
    tilt = 0,
}: GlassCardProps) {
    return (
        <SpotlightCard
            tilt={tilt}
            className={clsx(
                "surface lit-edge rounded-2xl",
                hover && "hover:-translate-y-1",
                glowRing[glow],
                className
            )}
        >
            {children}
        </SpotlightCard>
    );
}
