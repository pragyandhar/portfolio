"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";

/**
 * Live clock in IST. Renders a placeholder until mounted so the server and
 * client markup always agree.
 */
export default function LocalTime({
    className,
    withSeconds = false,
    showZone = true,
}: {
    className?: string;
    withSeconds?: boolean;
    /** Append " IST" — turn off when the zone is labelled separately */
    showZone?: boolean;
}) {
    const [time, setTime] = useState<string | null>(null);

    useEffect(() => {
        const update = () =>
            setTime(
                new Intl.DateTimeFormat("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                    ...(withSeconds ? { second: "2-digit" as const } : {}),
                    hour12: false,
                    timeZone: "Asia/Kolkata",
                }).format(new Date())
            );

        update();
        const id = setInterval(update, withSeconds ? 1000 : 30000);
        return () => clearInterval(id);
    }, [withSeconds]);

    return (
        <span className={clsx("font-mono tabular-nums", className)}>
            {time ?? (withSeconds ? "--:--:--" : "--:--")}
            {showZone ? " IST" : ""}
        </span>
    );
}
