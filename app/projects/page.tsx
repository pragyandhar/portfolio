"use client";

import { PROJECTS_DATA } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { FiZap, FiGithub, FiArrowUpRight } from "react-icons/fi";

type Project = (typeof PROJECTS_DATA)[number];

const ACCENTS = {
    gold: {
        text: "text-gold",
        border: "border-gold/25",
        soft: "bg-gold/[0.07]",
        bar: "from-gold-soft via-gold to-gold-deep",
        dot: "bg-gold",
    },
    violet: {
        text: "text-iris",
        border: "border-violet/25",
        soft: "bg-violet/[0.07]",
        bar: "from-iris via-violet to-violet",
        dot: "bg-iris",
    },
    cyan: {
        text: "text-cyan",
        border: "border-cyan/25",
        soft: "bg-cyan/[0.07]",
        bar: "from-cyan via-cyan to-violet",
        dot: "bg-cyan",
    },
    rose: {
        text: "text-rose",
        border: "border-rose/25",
        soft: "bg-rose/[0.07]",
        bar: "from-rose via-rose to-gold",
        dot: "bg-rose",
    },
} as const;

function CaseStudy({ project, index }: { project: Project; index: number }) {
    const a = ACCENTS[project.accent];

    return (
        <article className="relative border-t border-white/[0.07] py-16 md:py-24">
            <div className="grid gap-10 md:grid-cols-12 md:gap-8">
                {/* Sticky rail */}
                <div className="md:col-span-3">
                    <div className="md:sticky md:top-32">
                        <Reveal>
                            <div className={`mb-6 h-px w-14 bg-gradient-to-r ${a.bar}`} />

                            <p className="font-display text-6xl leading-none tracking-tighter text-white/[0.09] md:text-8xl">
                                0{index + 1}
                            </p>

                            <p className={`mt-5 font-mono text-[11px] ${a.text}`}>
                                {project.category}
                            </p>

                            {project.featured && (
                                <span
                                    className={`mt-5 inline-flex items-center gap-2 rounded-full border ${a.border} ${a.soft} px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] ${a.text}`}
                                >
                                    <FiZap size={11} />
                                    Featured
                                </span>
                            )}
                        </Reveal>
                    </div>
                </div>

                {/* Body */}
                <div className="md:col-span-9">
                    <Reveal>
                        <h2 className="font-display text-3xl leading-[1.05] tracking-tight text-fg md:text-5xl">
                            {project.shortTitle}
                        </h2>
                        <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-fg-muted md:text-lg">
                            {project.tagline}
                        </p>
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="link-wipe mt-5 inline-flex items-center gap-2 font-mono text-[13px] text-fg-muted transition-colors hover:text-gold"
                            >
                                <FiGithub size={14} />
                                View source on GitHub
                                <FiArrowUpRight size={13} />
                            </a>
                        )}
                    </Reveal>

                    {/* Metrics */}
                    <Reveal delay={90}>
                        <div className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.05]">
                            {project.metrics.map((m) => (
                                <div key={m.label} className="bg-ink px-5 py-6 text-center">
                                    <p
                                        className={`font-display text-2xl leading-none tracking-tight md:text-4xl ${a.text}`}
                                    >
                                        {m.value}
                                    </p>
                                    <p className="mt-2 text-[11px] leading-tight text-fg-dim">
                                        {m.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </Reveal>

                    {/* Highlights */}
                    <Reveal delay={140}>
                        <div className="mt-12">
                            <p className="eyebrow mb-6">What it does</p>
                            <ul className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.05] md:grid-cols-2">
                                {project.highlights.map((point, i) => (
                                    <li
                                        key={point}
                                        // An odd final item spans both columns so the
                                        // grid never shows a hollow cell.
                                        className={
                                            i === project.highlights.length - 1 &&
                                                project.highlights.length % 2 === 1
                                                ? "md:col-span-2"
                                                : undefined
                                        }
                                    >
                                        <SpotlightCard className="flex h-full items-start gap-4 bg-ink px-6 py-5">
                                            <span className="mt-1 font-mono text-[10px] text-fg-dim">
                                                {String(i + 1).padStart(2, "0")}
                                            </span>
                                            <span className="text-[15px] leading-relaxed text-fg-muted">
                                                {point}
                                            </span>
                                        </SpotlightCard>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Reveal>

                    {/* Stack */}
                    <Reveal delay={180}>
                        <div className="mt-10">
                            <p className="eyebrow mb-4">Built with</p>
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map((t) => (
                                    <span key={t} className="chip font-mono text-[12px]">
                                        <span
                                            className={`h-1 w-1 rounded-full ${a.dot}`}
                                            aria-hidden
                                        />
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </article>
    );
}

export default function ProjectsPage() {
    // Featured first, then the rest in declaration order.
    const ordered = [
        ...PROJECTS_DATA.filter((p) => p.featured),
        ...PROJECTS_DATA.filter((p) => !p.featured),
    ];

    return (
        <div className="relative overflow-hidden pt-32 md:pt-40">
            <div className="aurora opacity-35" />

            <section className="relative shell pb-10">
                <SectionHeading
                    index="03"
                    eyebrow="Selected work"
                    title="Systems built to"
                    accent="survive production"
                    subtitle="Four builds that cover the range — an AI code-repair pipeline, a secured multi-tenant agent, a voice automation framework, and an end-to-end ML pipeline."
                />

                {/* Contents */}
                <Reveal>
                    <div className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.05] sm:grid-cols-2 lg:grid-cols-4">
                        {ordered.map((p, i) => (
                            <div key={p.id} className="bg-ink px-6 py-5">
                                <span className="font-mono text-[10px] text-fg-dim">
                                    0{i + 1}
                                </span>
                                <p className="font-display mt-2 text-lg tracking-tight text-fg">
                                    {p.shortTitle}
                                </p>
                                <p
                                    className={`mt-1 font-mono text-[10px] ${ACCENTS[p.accent].text}`}
                                >
                                    {p.category}
                                </p>
                            </div>
                        ))}
                    </div>
                </Reveal>
            </section>

            <section className="relative shell pb-24">
                {ordered.map((project, i) => (
                    <CaseStudy key={project.id} project={project} index={i} />
                ))}
            </section>
        </div>
    );
}
