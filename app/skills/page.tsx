"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { SKILLS_DATA, MARQUEE_ITEMS } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Marquee from "@/components/ui/Marquee";

const GROUPS = [
    {
        id: "coreAI",
        title: "Core AI & Agents",
        blurb:
            "Orchestrating multi-step agents that plan, call tools, and keep state across a conversation.",
        items: SKILLS_DATA.coreAI,
    },
    {
        id: "ml",
        title: "Machine Learning",
        blurb:
            "Gradient boosting and ensemble methods, with the feature work and tuning that actually moves the metric.",
        items: SKILLS_DATA.ml,
    },
    {
        id: "backend",
        title: "Backend & Architecture",
        blurb:
            "Service boundaries, REST surfaces, and the logging and error handling that make failures debuggable.",
        items: SKILLS_DATA.backend,
    },
    {
        id: "infra",
        title: "Infra & Security",
        blurb:
            "Tenant isolation, role-based access, data masking, and approval gates for high-risk agent actions.",
        items: SKILLS_DATA.infra,
    },
    {
        id: "languages",
        title: "Languages & Tools",
        blurb:
            "The everyday toolkit — from advanced SQL window functions to desktop automation.",
        items: SKILLS_DATA.languages,
    },
];

export default function SkillsPage() {
    const [active, setActive] = useState(0);
    const current = GROUPS[active];

    return (
        <div className="relative overflow-hidden pt-32 md:pt-40">
            <div className="aurora opacity-35" />

            <section className="relative shell pb-24">
                <SectionHeading
                    index="02"
                    eyebrow="Capabilities"
                    title="The stack, and what"
                    accent="I do with it"
                    subtitle="Hover or tap a discipline to see the tools behind it."
                />

                <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                    {/* Index */}
                    <div className="lg:col-span-6">
                        <ul className="border-t border-white/[0.07]">
                            {GROUPS.map((group, i) => {
                                const isActive = i === active;
                                return (
                                    <li key={group.id}>
                                        <button
                                            onMouseEnter={() => setActive(i)}
                                            onFocus={() => setActive(i)}
                                            onClick={() => setActive(i)}
                                            className="group flex w-full items-center gap-5 border-b border-white/[0.07] py-6 text-left md:gap-8"
                                            aria-pressed={isActive}
                                        >
                                            <span
                                                className={`font-mono text-[11px] transition-colors duration-500 ${isActive ? "text-gold" : "text-fg-dim"
                                                    }`}
                                            >
                                                0{i + 1}
                                            </span>

                                            <span
                                                className={`font-display flex-1 text-2xl tracking-tight transition-all duration-500 md:text-4xl ${isActive
                                                        ? "translate-x-1 text-fg"
                                                        : "text-fg-muted/60"
                                                    }`}
                                            >
                                                {group.title}
                                            </span>

                                            <span
                                                className={`h-px transition-all duration-700 ${isActive
                                                        ? "w-10 bg-gold"
                                                        : "w-4 bg-white/15"
                                                    }`}
                                            />

                                            <span className="font-mono text-[11px] text-fg-dim">
                                                {group.items.length}
                                            </span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Detail panel */}
                    <div className="lg:col-span-6">
                        <div className="surface lit-edge sticky top-32 min-h-[420px] rounded-3xl p-8 md:p-10">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={current.id}
                                    initial={{ opacity: 0, y: 18 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -12 }}
                                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <p className="eyebrow mb-5">
                                        0{active + 1} — {current.items.length} tools
                                    </p>

                                    <h2 className="font-display text-3xl tracking-tight text-fg md:text-4xl">
                                        {current.title}
                                    </h2>

                                    <p className="mt-5 max-w-md text-[15px] leading-relaxed text-fg-muted">
                                        {current.blurb}
                                    </p>

                                    <div className="mt-9 flex flex-wrap gap-2.5">
                                        {current.items.map((item, i) => (
                                            <motion.span
                                                key={item}
                                                initial={{ opacity: 0, y: 12 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{
                                                    duration: 0.45,
                                                    delay: 0.06 + i * 0.045,
                                                    ease: [0.16, 1, 0.3, 1],
                                                }}
                                                className="chip text-[13px]"
                                            >
                                                {item}
                                            </motion.span>
                                        ))}
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Progress rail */}
                            <div className="mt-10 flex gap-1.5">
                                {GROUPS.map((g, i) => (
                                    <span
                                        key={g.id}
                                        className={`h-0.5 flex-1 rounded-full transition-all duration-500 ${i === active ? "bg-gold" : "bg-white/10"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Full inventory */}
            <section className="relative shell pb-24">
                <Reveal className="mb-10">
                    <div className="mb-5 flex items-center gap-3">
                        <span className="font-mono text-[11px] text-gold">03</span>
                        <span className="h-px w-8 bg-gold/40" />
                        <span className="eyebrow">Full inventory</span>
                    </div>
                </Reveal>

                <div className="grid gap-px overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.05] md:grid-cols-2 lg:grid-cols-3">
                    {GROUPS.map((group, i) => {
                        const isLast = i === GROUPS.length - 1;
                        // Stretch the final card across any leftover columns so
                        // the hairline grid never shows a hollow cell.
                        const fill = [
                            isLast && GROUPS.length % 2 === 1 ? "md:col-span-2" : "",
                            isLast && GROUPS.length % 3 === 2 ? "lg:col-span-2" : "",
                            isLast && GROUPS.length % 3 === 1 ? "lg:col-span-3" : "",
                        ]
                            .filter(Boolean)
                            .join(" ");

                        return (
                            <Reveal key={group.id} delay={i * 60} className={fill}>
                                <div className="h-full bg-ink p-7">
                                <div className="mb-5 flex items-center justify-between">
                                    <h3 className="font-display text-base tracking-tight text-fg">
                                        {group.title}
                                    </h3>
                                    <span className="font-mono text-[10px] text-fg-dim">
                                        0{i + 1}
                                    </span>
                                </div>
                                <ul className="space-y-2.5">
                                    {group.items.map((item) => (
                                        <li
                                            key={item}
                                            className="flex items-start gap-2.5 text-sm text-fg-muted"
                                        >
                                            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-gold/60" />
                                            {item}
                                        </li>
                                    ))}
                                    </ul>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </section>

            <div className="border-y border-white/[0.06] py-8">
                <Marquee items={MARQUEE_ITEMS} speed={52} reverse />
            </div>
        </div>
    );
}
