"use client";

import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

import { ABOUT_DATA, EXTRA_DATA, EDUCATION_DATA, SITE_CONFIG } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import SpotlightCard from "@/components/ui/SpotlightCard";
import ScrollHighlightText from "@/components/ui/ScrollHighlightText";

const META = [
    { k: "Based in", v: SITE_CONFIG.location },
    { k: "Studying", v: "B.Tech CSE · GLA University" },
    { k: "Focus", v: "Agentic AI & Production ML" },
    { k: "Status", v: "Open to opportunities" },
];

const PRINCIPLES = [
    {
        n: "01",
        title: "Security is architecture",
        body: "Multi-tenant isolation, RBAC, and PII masking belong in the first design pass — not in a hardening sprint after launch.",
    },
    {
        n: "02",
        title: "Memory over context stuffing",
        body: "Agents should summarise, retain, and retrieve. Dumping everything into the prompt is not a memory system.",
    },
    {
        n: "03",
        title: "Humans stay in the loop",
        body: "High-risk actions get an approval gate. Autonomy is earned per action, not granted wholesale.",
    },
    {
        n: "04",
        title: "It ships or it doesn't count",
        body: "Structured logging, custom exceptions, REST surfaces. A model in a notebook is a hypothesis, not a system.",
    },
];

export default function AboutPage() {
    return (
        <div className="relative overflow-hidden pt-32 md:pt-40">
            <div className="aurora opacity-40" />

            <section className="relative shell pb-20">
                <SectionHeading
                    index="01"
                    eyebrow="About"
                    title="The person behind"
                    accent="the systems"
                    subtitle={ABOUT_DATA.headline}
                />

                <div className="grid gap-14 md:grid-cols-12">
                    {/* Narrative */}
                    <div className="md:col-span-7">
                        <Reveal>
                            {/* The source string is hard-wrapped, so collapse
                                whitespace and split on blank lines instead of
                                preserving every newline. */}
                            {ABOUT_DATA.description
                                .trim()
                                .split(/\n\s*\n/)
                                .map((para, i) => (
                                    <p
                                        key={i}
                                        className={`text-pretty text-[16px] leading-[1.85] text-fg-muted md:text-[17px] ${i > 0 ? "mt-6" : ""
                                            }`}
                                    >
                                        {para.replace(/\s+/g, " ").trim()}
                                    </p>
                                ))}
                        </Reveal>

                        <Reveal delay={120}>
                            <div className="mt-10 flex flex-wrap gap-3">
                                <Link href="/projects" className="btn btn-primary">
                                    See the work <FiArrowUpRight size={15} />
                                </Link>
                                <a
                                    href={SITE_CONFIG.resumeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-ghost"
                                >
                                    Résumé
                                </a>
                            </div>
                        </Reveal>
                    </div>

                    {/* Monogram + meta */}
                    <div className="md:col-span-5">
                        <Reveal delay={80}>
                            <SpotlightCard
                                tilt={5}
                                className="surface lit-edge relative rounded-3xl p-8"
                            >
                                <div className="relative mb-8 flex h-40 items-center justify-center overflow-hidden rounded-2xl border border-white/[0.07]">
                                    <div className="aurora opacity-80" />
                                    <span className="font-display relative text-7xl tracking-tighter text-gilded">
                                        PD
                                    </span>
                                </div>

                                <dl className="space-y-4">
                                    {META.map((row) => (
                                        <div
                                            key={row.k}
                                            className="flex items-baseline justify-between gap-4 border-b border-white/[0.06] pb-4 last:border-0 last:pb-0"
                                        >
                                            <dt className="eyebrow shrink-0">{row.k}</dt>
                                            <dd className="text-right text-sm text-fg">
                                                {row.v}
                                            </dd>
                                        </div>
                                    ))}
                                </dl>
                            </SpotlightCard>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Manifesto line */}
            <section className="relative shell pb-20 pt-4 md:pb-28 md:pt-8">
                <div className="rule mb-16" />
                <ScrollHighlightText
                    className="font-display max-w-4xl text-[clamp(1.5rem,3.8vw,2.9rem)] leading-[1.2] tracking-tight text-fg"
                    accentWords={["enterprise-ready", "trust"]}
                    text="Anyone can wire an LLM to an API. The hard part is making it enterprise-ready — isolated, auditable, and safe enough to earn trust."
                />
            </section>

            {/* Principles */}
            <section className="relative shell pb-24">
                <Reveal className="mb-12">
                    <div className="mb-5 flex items-center gap-3">
                        <span className="font-mono text-[11px] text-gold">02</span>
                        <span className="h-px w-8 bg-gold/40" />
                        <span className="eyebrow">How I work</span>
                    </div>
                    <h2 className="font-display text-section text-fg">
                        Four <span className="serif-accent text-gilded">principles</span>
                    </h2>
                </Reveal>

                <div className="grid gap-px overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.05] md:grid-cols-2">
                    {PRINCIPLES.map((p, i) => (
                        <Reveal key={p.n} delay={i * 70}>
                            <SpotlightCard className="h-full bg-ink p-8 md:p-10">
                                <span className="font-mono text-[11px] text-gold">{p.n}</span>
                                <h3 className="font-display mt-4 text-xl tracking-tight text-fg md:text-2xl">
                                    {p.title}
                                </h3>
                                <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">
                                    {p.body}
                                </p>
                            </SpotlightCard>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* Beyond code */}
            <section className="relative shell pb-32">
                <Reveal className="mb-12">
                    <div className="mb-5 flex items-center gap-3">
                        <span className="font-mono text-[11px] text-gold">03</span>
                        <span className="h-px w-8 bg-gold/40" />
                        <span className="eyebrow">Beyond code</span>
                    </div>
                    <h2 className="font-display text-section text-fg">
                        Away from the{" "}
                        <span className="serif-accent text-gilded">terminal</span>
                    </h2>
                </Reveal>

                <ul className="border-t border-white/[0.07]">
                    {EXTRA_DATA.map((item, i) => (
                        <Reveal as="li" key={item} delay={i * 70}>
                            <div className="group flex items-baseline gap-5 border-b border-white/[0.07] py-7 transition-colors duration-500 hover:bg-white/[0.02] md:gap-10">
                                <span className="font-mono text-[11px] text-fg-dim">
                                    0{i + 1}
                                </span>
                                <p className="font-display text-lg tracking-tight text-fg transition-colors duration-500 group-hover:text-gold md:text-2xl">
                                    {item}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </ul>

                {/* Education teaser */}
                <Reveal delay={140}>
                    <div className="surface lit-edge mt-14 flex flex-wrap items-center justify-between gap-6 rounded-3xl p-8">
                        <div>
                            <p className="eyebrow mb-2">Currently</p>
                            <p className="font-display text-xl tracking-tight text-fg md:text-2xl">
                                {EDUCATION_DATA[0].degree}
                            </p>
                            <p className="mt-1 text-sm text-fg-muted">
                                {EDUCATION_DATA[0].institute} · {EDUCATION_DATA[0].score}
                            </p>
                        </div>
                        <Link href="/education" className="btn btn-ghost">
                            Full timeline <FiArrowUpRight size={15} />
                        </Link>
                    </div>
                </Reveal>
            </section>
        </div>
    );
}
