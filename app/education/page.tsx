"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

import { EDUCATION_DATA, CERTIFICATIONS_DATA } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import SpotlightCard from "@/components/ui/SpotlightCard";

export default function EducationPage() {
    const timelineRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ["start 0.75", "end 0.6"],
    });

    // The spine fills as you read down the timeline.
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 28,
        restDelta: 0.001,
    });

    return (
        <div className="relative overflow-hidden pt-32 md:pt-40">
            <div className="aurora opacity-35" />

            <section className="relative shell pb-24">
                <SectionHeading
                    index="04"
                    eyebrow="Education"
                    title="Where the groundwork"
                    accent="was laid"
                    subtitle="A steady line from school through an engineering degree — with the numbers to back it."
                />

                <div ref={timelineRef} className="relative">
                    {/* Spine */}
                    <div className="absolute left-[9px] top-2 bottom-2 w-px bg-white/[0.08] md:left-[calc(8rem+9px)]">
                        <motion.div
                            style={{ scaleY, transformOrigin: "top" }}
                            className="h-full w-full bg-gradient-to-b from-gold via-iris to-cyan"
                        />
                    </div>

                    <ol className="space-y-10">
                        {EDUCATION_DATA.map((edu, i) => (
                            <li key={edu.degree} className="relative">
                                <Reveal delay={i * 90}>
                                    <div className="flex gap-6 md:gap-0">
                                        {/* Year rail */}
                                        <div className="hidden w-32 shrink-0 pr-8 pt-6 text-right md:block">
                                            <p className="font-mono text-xs text-gold">
                                                {edu.year}
                                            </p>
                                        </div>

                                        {/* Node */}
                                        <div className="relative z-10 shrink-0 pt-7">
                                            <span className="block h-[19px] w-[19px] rounded-full border border-gold/50 bg-ink p-[5px]">
                                                <span className="block h-full w-full rounded-full bg-gold" />
                                            </span>
                                        </div>

                                        {/* Card */}
                                        <div className="flex-1 md:pl-8">
                                            <SpotlightCard
                                                tilt={2}
                                                className="surface lit-edge edge-glow rounded-3xl p-7 md:p-9"
                                            >
                                                <div className="flex flex-wrap items-start justify-between gap-4">
                                                    <div>
                                                        <span className="font-mono text-[11px] text-fg-dim md:hidden">
                                                            {edu.year}
                                                        </span>
                                                        <h2 className="font-display mt-1 text-xl leading-tight tracking-tight text-fg md:mt-0 md:text-3xl">
                                                            {edu.degree}
                                                        </h2>
                                                        <p className="mt-2.5 text-sm text-fg-muted">
                                                            {edu.institute}
                                                        </p>
                                                    </div>

                                                    <div className="text-right">
                                                        <p className="font-display text-3xl leading-none tracking-tight text-gilded md:text-5xl">
                                                            {edu.score.replace("CPI: ", "")}
                                                        </p>
                                                        <p className="eyebrow mt-2">
                                                            {edu.score.startsWith("CPI")
                                                                ? "CPI"
                                                                : "Aggregate"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </SpotlightCard>
                                        </div>
                                    </div>
                                </Reveal>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* Recognition teaser */}
            <section className="relative shell pb-32">
                <div className="rule mb-16" />

                <Reveal>
                    <div className="surface lit-edge flex flex-wrap items-center justify-between gap-8 rounded-3xl p-9 md:p-12">
                        <div className="max-w-md">
                            <p className="eyebrow mb-4">Alongside the degree</p>
                            <h2 className="font-display text-2xl leading-tight tracking-tight text-fg md:text-4xl">
                                {CERTIFICATIONS_DATA.length} certifications{" "}
                                <span className="serif-accent text-gilded">
                                    &amp; awards
                                </span>
                            </h2>
                            <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">
                                Hackathon podium finishes, an NPTEL Elite + Silver
                                certificate in the top 2%, and coursework across data
                                analytics and communication.
                            </p>
                        </div>

                        <Link href="/certifications" className="btn btn-primary">
                            View all <FiArrowUpRight size={15} />
                        </Link>
                    </div>
                </Reveal>
            </section>
        </div>
    );
}
