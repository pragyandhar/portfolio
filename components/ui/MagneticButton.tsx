"use client";

import Link from "next/link";
import clsx from "clsx";
import Magnetic from "@/components/ui/Magnetic";

type MagneticButtonProps = {
    children: React.ReactNode;
    href?: string;
    target?: string;
    variant?: "primary" | "secondary";
    className?: string;
    onClick?: () => void;
};

export default function MagneticButton({
    children,
    href,
    target,
    variant = "primary",
    className,
    onClick,
}: MagneticButtonProps) {
    const classes = clsx(
        "btn",
        variant === "primary" ? "btn-primary" : "btn-ghost",
        className
    );

    const inner = <span className="relative z-10 flex items-center gap-2">{children}</span>;

    let element: React.ReactNode;

    if (!href) {
        element = (
            <button type="button" onClick={onClick} className={classes}>
                {inner}
            </button>
        );
    } else if (href.startsWith("http") || href.startsWith("mailto")) {
        element = (
            <a
                href={href}
                target={target}
                rel={target === "_blank" ? "noopener noreferrer" : undefined}
                className={classes}
            >
                {inner}
            </a>
        );
    } else {
        element = (
            <Link href={href} target={target} className={classes}>
                {inner}
            </Link>
        );
    }

    return (
        <Magnetic strength={0.3} className="inline-block">
            {element}
        </Magnetic>
    );
}
