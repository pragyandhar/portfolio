"use client";

import Link from "next/link";
import { FiArrowUpRight, FiMapPin } from "react-icons/fi";

import Reveal from "@/components/ui/Reveal";
import Sticker from "@/components/ui/Sticker";
import Odometer from "@/components/ui/Odometer";
import LocalTime from "@/components/ui/LocalTime";
import SpotlightCard from "@/components/ui/SpotlightCard";
import Marquee from "@/components/ui/Marquee";

import {
    CERTIFICATIONS_DATA,
    EDUCATION_DATA,
    MARQUEE_ITEMS,
    PROJECTS_DATA,
    SITE_CONFIG,
} from "@/lib/constants";

/**
 * Asymmetric bento. Every figure here is read from the data layer, so the
 * tiles can never drift out of sync with the rest of the site.
 */
export default function Bento() {
    const featured = PROJECTS_DATA.find((p) => p.featured) ?? PROJECTS_DATA[0];
    const cpi = EDUCATION_DATA[0].score.replace(/[^\d.]/g, "");

    return (
        <section className="relative shell py-24 md:py-32">
            <Reveal className="mb-12">
                <div className="mb-6 flex items-center gap-3">
                    <span className="font-mono text-[11px] text-gold">02</span>
                    <span className="h-px w-8 bg-gold/40" />
                    <span className="eyebrow">At a glance</span>
                </div>
                <h2 className="font-display text-section text-fg">
                    The <span className="serif-accent text-iridescent">receipts</span>
                </h2>
            </Reveal>

            {/* Single column below md: the live clock and CPI need the full
                width to breathe. The bento only assembles once there's room. */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
                {/* Featured build — the anchor tile */}
                <Reveal className="md:col-span-4 md:row-span-2">
                    <Link
                        href="/projects"
                        className="block h-full"
                        data-cursor-label="View case study"
                    >
                        <SpotlightCard
                            tilt={2}
                            className="tile edge-iris group flex h-full flex-col justify-between p-7 md:p-10"
                        >
                            <div>
                                <div className="mb-7 flex flex-wrap items-center gap-2.5">
                                    <Sticker variant="gold">Flagship</Sticker>
                                    <Sticker variant="ink" rotate={2}>
                                        {featured.category}
                                    </Sticker>
                                </div>

                                <h3 className="font-display text-3xl leading-[1.05] tracking-tight text-fg md:text-5xl">
                                    {featured.shortTitle}
                                </h3>
                                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-fg-muted">
                                    {featured.tagline}
                                </p>
                            </div>

                            <div className="mt-10">
                                <div className="flex flex-wrap gap-x-9 gap-y-5">
                                    {featured.metrics.map((m) => (
                                        <div key={m.label}>
                                            <p className="font-display text-2xl leading-none text-gold md:text-3xl">
                                                {m.value}
                                            </p>
                                            <p className="mt-1.5 text-[11px] text-fg-dim">
                                                {m.label}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <span className="mt-8 inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors duration-500 group-hover:text-gold">
                                    Read the breakdown
                                    <FiArrowUpRight
                                        size={14}
                                        className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                    />
                                </span>
                            </div>
                        </SpotlightCard>
                    </Link>
                </Reveal>

                {/* CPI */}
                <Reveal delay={70} className="md:col-span-2">
                    <SpotlightCard className="tile flex h-full flex-col justify-between p-7">
                        <span className="eyebrow">Academic</span>
                        <div className="mt-8">
                            {/* Solid gold, not .text-gilded — see Odometer's note
                                on background-clip and clipping contexts. */}
                            <p className="font-display text-6xl leading-none tracking-tighter text-gold md:text-7xl">
                                <Odometer value={cpi} />
                            </p>
                            <p className="mt-3 text-[13px] text-fg-muted">
                                CPI · {EDUCATION_DATA[0].institute}
                            </p>
                        </div>
                    </SpotlightCard>
                </Reveal>

                {/* Location + live clock */}
                <Reveal delay={140} className="md:col-span-2">
                    <SpotlightCard className="tile flex h-full flex-col justify-between p-7">
                        <div className="flex items-center gap-2.5">
                            <span className="status-dot" />
                            <span className="text-[13px] text-fg">Available 2026</span>
                        </div>

                        <div className="mt-8">
                            <p className="flex items-baseline gap-2 whitespace-nowrap font-display leading-none text-fg">
                                <LocalTime
                                    withSeconds
                                    showZone={false}
                                    className="text-4xl tracking-tight md:text-5xl"
                                />
                                <span className="text-sm text-fg-dim">IST</span>
                            </p>
                            <p className="mt-3 flex items-center gap-1.5 text-[13px] text-fg-muted">
                                <FiMapPin size={12} className="text-gold" />
                                {SITE_CONFIG.location}
                            </p>
                        </div>
                    </SpotlightCard>
                </Reveal>

                {/* Stack ticker */}
                <Reveal delay={70} className="md:col-span-3">
                    <SpotlightCard className="tile flex h-full flex-col justify-between overflow-hidden py-7">
                        <span className="eyebrow px-7">The stack</span>
                        <div className="mt-7">
                            <Marquee
                                items={MARQUEE_ITEMS}
                                speed={38}
                                separator="·"
                                textClassName="font-display text-lg tracking-tight text-fg-muted/75"
                                gapClassName="gap-3.5 px-3.5"
                                fade={28}
                            />
                        </div>
                        <Link
                            href="/skills"
                            className="link-wipe mt-7 inline-flex items-center gap-1.5 px-7 text-sm text-fg-muted transition-colors hover:text-gold"
                        >
                            Full breakdown <FiArrowUpRight size={13} />
                        </Link>
                    </SpotlightCard>
                </Reveal>

                {/* Recognition */}
                <Reveal delay={140} className="md:col-span-3">
                    <Link
                        href="/certifications"
                        className="block h-full"
                        data-cursor-label="Browse"
                    >
                        <SpotlightCard className="tile group flex h-full flex-col justify-between p-7">
                            <span className="eyebrow">Recognition</span>

                            <div className="mt-8 flex items-end justify-between gap-5">
                                <div>
                                    <p className="font-display text-6xl leading-none tracking-tighter text-fg md:text-7xl">
                                        <Odometer value={String(CERTIFICATIONS_DATA.length)} />
                                    </p>
                                    <p className="mt-3 text-[13px] text-fg-muted">
                                        Certifications &amp; achievements
                                    </p>
                                </div>
                                <Sticker variant="iris" rotate={3}>
                                    Top 2% NPTEL
                                </Sticker>
                            </div>
                        </SpotlightCard>
                    </Link>
                </Reveal>
            </div>
        </section>
    );
}
