"use client";

import { useEffect, useRef } from "react";

/**
 * Custom cursor: a hard dot tracking 1:1, a ring lagging behind with spring
 * damping, and a contextual label that appears over elements declaring
 * `data-cursor-label` (e.g. "View case study").
 * Disabled entirely on coarse pointers and for reduced-motion users.
 */
export default function Cursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fine = window.matchMedia("(pointer: fine)").matches;
        const reduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;
        if (!fine || reduced) return;

        const dot = dotRef.current;
        const ring = ringRef.current;
        const label = labelRef.current;
        if (!dot || !ring || !label) return;

        document.documentElement.classList.add("has-custom-cursor");

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let ringX = mouseX;
        let ringY = mouseY;
        let labelX = mouseX;
        let labelY = mouseY;
        let raf = 0;
        let visible = false;
        let currentLabel = "";

        const INTERACTIVE =
            'a, button, [role="button"], input, textarea, select, summary, [data-cursor="hover"]';

        const onMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            if (!visible) {
                visible = true;
                dot.style.opacity = "1";
                ring.style.opacity = "1";
                // Snap on first appearance so nothing flies in from the corner.
                ringX = labelX = mouseX;
                ringY = labelY = mouseY;
            }

            dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

            const target = e.target as Element | null;
            const labelled = target?.closest?.("[data-cursor-label]");
            const nextLabel =
                labelled?.getAttribute("data-cursor-label")?.trim() || "";

            if (nextLabel !== currentLabel) {
                currentLabel = nextLabel;
                if (nextLabel) {
                    label.textContent = nextLabel;
                    label.dataset.show = "true";
                } else {
                    label.dataset.show = "false";
                }
            }

            // The ring gives way to the label so they never stack.
            const active = !!target?.closest?.(INTERACTIVE);
            ring.dataset.active = active && !nextLabel ? "true" : "false";
            ring.style.opacity = nextLabel ? "0" : "1";
            dot.style.opacity = nextLabel ? "0" : "1";
        };

        const onLeave = () => {
            visible = false;
            dot.style.opacity = "0";
            ring.style.opacity = "0";
            label.dataset.show = "false";
        };

        const tick = () => {
            ringX += (mouseX - ringX) * 0.16;
            ringY += (mouseY - ringY) * 0.16;
            ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

            // Label trails slightly further behind for a sense of weight.
            labelX += (mouseX - labelX) * 0.2;
            labelY += (mouseY - labelY) * 0.2;
            label.style.transform = `translate3d(${labelX}px, ${labelY}px, 0) translate(-50%, -160%)`;

            raf = requestAnimationFrame(tick);
        };

        window.addEventListener("mousemove", onMove, { passive: true });
        document.addEventListener("mouseleave", onLeave);
        raf = requestAnimationFrame(tick);

        return () => {
            window.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseleave", onLeave);
            cancelAnimationFrame(raf);
            document.documentElement.classList.remove("has-custom-cursor");
        };
    }, []);

    return (
        <>
            <div
                ref={ringRef}
                className="cursor-ring"
                style={{ opacity: 0, margin: 0 }}
                aria-hidden
            />
            <div
                ref={dotRef}
                className="cursor-dot"
                style={{ opacity: 0 }}
                aria-hidden
            />
            <div ref={labelRef} className="cursor-label" data-show="false" aria-hidden />
        </>
    );
}
