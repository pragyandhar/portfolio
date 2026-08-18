"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import { CERTIFICATIONS_DATA } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { FiAward, FiMaximize2, FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

/**
 * Entries are stored as one display string. Pull the issuer and date out of it
 * so the card can lay them out properly, falling back to the raw text.
 */
function parseEntry(text: string) {
    const dateMatch = text.match(/\(([^)]*\d{4})\)\s*$/);
    const date = dateMatch?.[1] ?? null;

    const withoutDate = dateMatch
        ? text.slice(0, dateMatch.index).trim()
        : text.trim();

    const parts = withoutDate.split(" — ");
    const title = parts[0]?.trim() || withoutDate;
    const issuer = parts.length > 1 ? parts.slice(1).join(" — ").trim() : null;

    return { title, issuer, date };
}

export default function CertificationsPage() {
    const withImages = useMemo(
        () => CERTIFICATIONS_DATA.filter((c) => c.image),
        []
    );

    const achievements = useMemo(
        () => CERTIFICATIONS_DATA.filter((c) => c.type === "achievement"),
        []
    );
    const certifications = useMemo(
        () => CERTIFICATIONS_DATA.filter((c) => c.type === "certification"),
        []
    );

    // Lightbox indexes into `withImages` so prev/next skip image-less entries.
    const [lightbox, setLightbox] = useState<number | null>(null);

    const close = useCallback(() => setLightbox(null), []);

    const step = useCallback(
        (dir: 1 | -1) => {
            setLightbox((current) => {
                if (current === null) return current;
                return (current + dir + withImages.length) % withImages.length;
            });
        },
        [withImages.length]
    );

    const openByEntry = useCallback(
        (image?: string) => {
            if (!image) return;
            const idx = withImages.findIndex((c) => c.image === image);
            if (idx >= 0) setLightbox(idx);
        },
        [withImages]
    );

    useEffect(() => {
        if (lightbox === null) return;

        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") close();
            if (e.key === "ArrowRight") step(1);
            if (e.key === "ArrowLeft") step(-1);
        };

        document.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [lightbox, close, step]);

    const active = lightbox !== null ? withImages[lightbox] : null;

    return (
        <>
            <div className="relative overflow-hidden pt-32 md:pt-40">
                <div className="aurora opacity-35" />

                <section className="relative shell pb-16">
                    <SectionHeading
                        index="05"
                        eyebrow="Recognition"
                        title="Certifications"
                        accent="& achievements"
                        subtitle={`${CERTIFICATIONS_DATA.length} milestones — hackathon finishes, an NPTEL top-2% result, and coursework across analytics and communication. Click any certificate to view it full size.`}
                    />

                    {/* Achievements */}
                    <Reveal className="mb-6">
                        <div className="flex items-center gap-3">
                            <span className="font-mono text-[11px] text-gold">A</span>
                            <span className="h-px w-8 bg-gold/40" />
                            <span className="eyebrow">
                                Achievements · {achievements.length}
                            </span>
                        </div>
                    </Reveal>

                    <ul className="border-t border-white/[0.07]">
                        {achievements.map((item, i) => {
                            const { title, issuer, date } = parseEntry(item.text);
                            const clickable = Boolean(item.image);

                            return (
                                <Reveal as="li" key={item.text} delay={i * 60}>
                                    <div
                                        role={clickable ? "button" : undefined}
                                        tabIndex={clickable ? 0 : undefined}
                                        onClick={
                                            clickable ? () => openByEntry(item.image) : undefined
                                        }
                                        onKeyDown={
                                            clickable
                                                ? (e) => {
                                                    if (e.key === "Enter" || e.key === " ") {
                                                        e.preventDefault();
                                                        openByEntry(item.image);
                                                    }
                                                }
                                                : undefined
                                        }
                                        className={`group flex items-center gap-5 border-b border-white/[0.07] py-6 transition-colors duration-500 hover:bg-white/[0.02] md:gap-8 ${clickable ? "cursor-pointer" : ""
                                            }`}
                                    >
                                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/25 bg-gold/[0.07] text-gold">
                                            <FiAward size={15} />
                                        </span>

                                        <div className="min-w-0 flex-1">
                                            <p className="font-display text-base leading-snug tracking-tight text-fg transition-colors duration-500 group-hover:text-gold md:text-xl">
                                                {title}
                                            </p>
                                            {(issuer || date) && (
                                                <p className="mt-1.5 text-[13px] text-fg-muted">
                                                    {issuer}
                                                    {issuer && date ? " · " : ""}
                                                    {date}
                                                </p>
                                            )}
                                        </div>

                                        {clickable && (
                                            <span className="hidden shrink-0 items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-fg-dim transition-colors group-hover:text-gold sm:flex">
                                                <FiMaximize2 size={11} /> View
                                            </span>
                                        )}
                                    </div>
                                </Reveal>
                            );
                        })}
                    </ul>
                </section>

                {/* Certificate gallery */}
                <section className="relative shell pb-32">
                    <Reveal className="mb-8">
                        <div className="flex items-center gap-3">
                            <span className="font-mono text-[11px] text-gold">B</span>
                            <span className="h-px w-8 bg-gold/40" />
                            <span className="eyebrow">
                                Certifications · {certifications.length}
                            </span>
                        </div>
                    </Reveal>

                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {certifications.map((item, i) => {
                            const { title, issuer, date } = parseEntry(item.text);

                            return (
                                <Reveal key={item.text} delay={(i % 3) * 80}>
                                    <SpotlightCard
                                        tilt={4}
                                        className="surface lit-edge edge-glow group h-full cursor-pointer rounded-3xl p-3 hover:-translate-y-1.5"
                                    >
                                        <button
                                            onClick={() => openByEntry(item.image)}
                                            className="w-full text-left"
                                            aria-label={`View certificate: ${title}`}
                                        >
                                            {/* Thumbnail */}
                                            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/[0.07] bg-ink-200">
                                                {item.image && (
                                                    <Image
                                                        src={item.image}
                                                        alt={title}
                                                        fill
                                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                        className="object-cover object-top transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                                                    />
                                                )}

                                                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />

                                                <span className="absolute bottom-3 right-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full border border-white/15 bg-ink/80 text-fg opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                                                    <FiMaximize2 size={14} />
                                                </span>
                                            </div>

                                            {/* Meta — the title reserves two lines
                                                so the issuer row aligns across cards. */}
                                            <div className="flex flex-col px-4 pb-3 pt-5">
                                                <p className="font-display line-clamp-2 min-h-[2.6em] text-[15px] leading-snug tracking-tight text-fg">
                                                    {title}
                                                </p>
                                                <div className="mt-3 flex items-center justify-between gap-3">
                                                    <span className="truncate text-[12px] text-fg-muted">
                                                        {issuer}
                                                    </span>
                                                    {date && (
                                                        <span className="shrink-0 font-mono text-[10px] text-fg-dim">
                                                            {date}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </button>
                                    </SpotlightCard>
                                </Reveal>
                            );
                        })}
                    </div>
                </section>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {active && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.28 }}
                        className="fixed inset-0 z-[9998] flex items-center justify-center p-4 md:p-10"
                        onClick={close}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Certificate viewer"
                    >
                        <div className="absolute inset-0 bg-ink/92 backdrop-blur-xl" />

                        {/* Chrome */}
                        <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 py-5 md:px-10">
                            <span className="font-mono text-[11px] text-fg-muted">
                                {String((lightbox ?? 0) + 1).padStart(2, "0")} /{" "}
                                {String(withImages.length).padStart(2, "0")}
                            </span>
                            <button
                                onClick={close}
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] text-fg transition-colors hover:bg-white/[0.14]"
                                aria-label="Close viewer"
                            >
                                <FiX size={19} />
                            </button>
                        </div>

                        {/* Prev / next */}
                        {withImages.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        step(-1);
                                    }}
                                    className="absolute left-3 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] text-fg transition-colors hover:bg-white/[0.14] md:left-8"
                                    aria-label="Previous certificate"
                                >
                                    <FiChevronLeft size={22} />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        step(1);
                                    }}
                                    className="absolute right-3 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] text-fg transition-colors hover:bg-white/[0.14] md:right-8"
                                    aria-label="Next certificate"
                                >
                                    <FiChevronRight size={22} />
                                </button>
                            </>
                        )}

                        {/* Image */}
                        <motion.figure
                            key={active.image}
                            initial={{ opacity: 0, scale: 0.94, y: 12 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="relative z-10 flex max-h-[86vh] w-full max-w-4xl flex-col items-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={active.image!}
                                alt={parseEntry(active.text).title}
                                width={1400}
                                height={990}
                                className="h-auto w-auto max-h-[72vh] rounded-2xl border border-white/10 object-contain shadow-2xl"
                                priority
                            />
                            <figcaption className="mt-5 max-w-2xl text-center">
                                <p className="font-display text-base tracking-tight text-fg md:text-lg">
                                    {parseEntry(active.text).title}
                                </p>
                                <p className="mt-1.5 text-[13px] text-fg-muted">
                                    {parseEntry(active.text).issuer}
                                    {parseEntry(active.text).date
                                        ? ` · ${parseEntry(active.text).date}`
                                        : ""}
                                </p>
                            </figcaption>
                        </motion.figure>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
