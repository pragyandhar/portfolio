"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiCode, FiLayers, FiBriefcase } from "react-icons/fi";

import Reveal from "@/components/ui/Reveal";
import { AUDIENCE_EXPLAINERS, PROJECTS_DATA } from "@/lib/constants";

const ICONS = [FiCode, FiLayers, FiBriefcase];

/**
 * The same system explained to three different rooms. Shows the reader that
 * the pitch changes with the audience — rather than asserting it does.
 */
export default function AudienceSwitch() {
    const [active, setActive] = useState(0);
    const featured = PROJECTS_DATA.find((p) => p.featured) ?? PROJECTS_DATA[0];
    const current = AUDIENCE_EXPLAINERS[active];

    return (
        <section className="relative shell py-24 md:py-32">
            <Reveal className="mb-12">
                <div className="mb-6 flex items-center gap-3">
                    <span className="font-mono text-[11px] text-gold">06</span>
                    <span className="h-px w-8 bg-gold/40" />
                    <span className="eyebrow">Same system, different room</span>
                </div>
                <h2 className="font-display max-w-3xl text-section text-fg">
                    I can explain it to{" "}
                    <span className="serif-accent text-gilded">whoever is asking</span>
                </h2>
                <p className="mt-6 max-w-xl text-pretty text-[15px] leading-relaxed text-fg-muted">
                    {featured.shortTitle}, described three ways. The system never
                    changes — the altitude does.
                </p>
            </Reveal>

            <Reveal delay={80}>
                <div className="tile overflow-hidden">
                    {/* Audience tabs */}
                    <div
                        className="flex flex-col border-b border-white/[0.07] sm:flex-row"
                        role="tablist"
                        aria-label="Choose an audience"
                    >
                        {AUDIENCE_EXPLAINERS.map((item, i) => {
                            const Icon = ICONS[i];
                            const isActive = i === active;

                            return (
                                <button
                                    key={item.id}
                                    role="tab"
                                    aria-selected={isActive}
                                    onClick={() => setActive(i)}
                                    className={`relative flex flex-1 items-center gap-3 px-6 py-5 text-left transition-colors duration-300 ${isActive ? "text-fg" : "text-fg-muted hover:text-fg"
                                        }`}
                                >
                                    {isActive && (
                                        <motion.span
                                            layoutId="audience-underline"
                                            className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-gold via-iris to-transparent"
                                            transition={{ type: "spring", stiffness: 340, damping: 32 }}
                                        />
                                    )}

                                    <span
                                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${isActive
                                                ? "border-gold/45 bg-gold/10 text-gold"
                                                : "border-white/[0.1] bg-white/[0.02] text-fg-dim"
                                            }`}
                                    >
                                        <Icon size={15} />
                                    </span>

                                    <span className="min-w-0">
                                        <span className="block font-display text-[15px] tracking-tight">
                                            {item.audience}
                                        </span>
                                        <span className="mt-0.5 block truncate font-mono text-[10px] uppercase tracking-[0.14em] text-fg-dim">
                                            {item.role}
                                        </span>
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Explanation */}
                    <div className="min-h-[210px] p-7 md:p-10">
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={current.id}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                className="max-w-3xl text-pretty text-lg leading-[1.7] text-fg-muted md:text-xl"
                            >
                                {current.body}
                            </motion.p>
                        </AnimatePresence>
                    </div>
                </div>
            </Reveal>
        </section>
    );
}
