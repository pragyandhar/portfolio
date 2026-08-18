"use client";

import { useState } from "react";
import {
    FiCopy,
    FiCheck,
    FiMail,
    FiLinkedin,
    FiGithub,
    FiFileText,
    FiArrowUpRight,
    FiMapPin,
} from "react-icons/fi";

import { SITE_CONFIG, SOCIAL_LINKS } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Magnetic from "@/components/ui/Magnetic";
import SpotlightCard from "@/components/ui/SpotlightCard";
import LocalTime from "@/components/ui/LocalTime";

const CHANNELS = [
    {
        label: "Email",
        value: SITE_CONFIG.email,
        href: SOCIAL_LINKS.email,
        icon: FiMail,
        note: "Fastest route — replies within 24 hours",
    },
    {
        label: "LinkedIn",
        value: "/in/pragyan-dhar",
        href: SOCIAL_LINKS.linkedin,
        icon: FiLinkedin,
        note: "Professional network & updates",
    },
    {
        label: "GitHub",
        value: "@pragyandhar",
        href: SOCIAL_LINKS.github,
        icon: FiGithub,
        note: "Code, experiments, and works in progress",
    },
];

const LOOKING_FOR = [
    "AI / ML Engineering roles",
    "Agentic systems & RAG internships",
    "Collaboration on production AI",
];

export default function ContactPage() {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(SITE_CONFIG.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2200);
        } catch {
            /* clipboard unavailable — the mailto link still works */
        }
    };

    return (
        <div className="relative overflow-hidden pt-32 md:pt-40">
            <div className="aurora opacity-45" />

            <section className="relative shell pb-20">
                <SectionHeading
                    index="06"
                    eyebrow="Contact"
                    title="Let's build something"
                    accent="worth shipping"
                    subtitle="Open to AI engineering roles, internships, and collaboration on production-grade intelligent systems."
                />

                <div className="grid gap-8 lg:grid-cols-12">
                    {/* Email panel */}
                    <div className="lg:col-span-7">
                        <Reveal className="h-full">
                            <SpotlightCard
                                tilt={2}
                                className="surface lit-edge h-full rounded-3xl p-8 md:p-12"
                            >
                                <p className="eyebrow mb-6">Direct line</p>

                                <a
                                    href={SOCIAL_LINKS.email}
                                    className="group block break-all font-display text-2xl leading-tight tracking-tight text-fg transition-colors duration-500 hover:text-gold md:text-4xl"
                                >
                                    {SITE_CONFIG.email}
                                    <FiArrowUpRight
                                        className="ml-2 inline-block align-middle text-gold opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100"
                                        size={24}
                                    />
                                </a>

                                <div className="mt-9 flex flex-wrap gap-3">
                                    <Magnetic strength={0.3}>
                                        <a
                                            href={SOCIAL_LINKS.email}
                                            className="btn btn-primary"
                                        >
                                            <FiMail size={15} /> Write to me
                                        </a>
                                    </Magnetic>

                                    <Magnetic strength={0.3}>
                                        <button onClick={handleCopy} className="btn btn-ghost">
                                            {copied ? (
                                                <>
                                                    <FiCheck size={15} className="text-mint" />
                                                    Copied
                                                </>
                                            ) : (
                                                <>
                                                    <FiCopy size={15} /> Copy address
                                                </>
                                            )}
                                        </button>
                                    </Magnetic>

                                    <Magnetic strength={0.3}>
                                        <a
                                            href={SITE_CONFIG.resumeUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-ghost"
                                        >
                                            <FiFileText size={15} /> Résumé
                                        </a>
                                    </Magnetic>
                                </div>

                                <div className="mt-10 border-t border-white/[0.07] pt-6">
                                    <p className="eyebrow mb-3">Secondary</p>
                                    <a
                                        href={`mailto:${SITE_CONFIG.secondaryEmail}`}
                                        className="link-wipe font-mono text-[13px] text-fg-muted transition-colors hover:text-gold"
                                    >
                                        {SITE_CONFIG.secondaryEmail}
                                    </a>
                                </div>
                            </SpotlightCard>
                        </Reveal>
                    </div>

                    {/* Status panel */}
                    <div className="lg:col-span-5">
                        <Reveal delay={90} className="h-full">
                            <SpotlightCard className="surface lit-edge h-full rounded-3xl p-8 md:p-10">
                                <div className="flex items-center gap-2.5">
                                    <span className="status-dot" />
                                    <span className="text-sm text-fg">
                                        Available for 2026 roles
                                    </span>
                                </div>

                                <dl className="mt-8 space-y-5">
                                    <div className="flex items-center justify-between gap-4 border-b border-white/[0.06] pb-5">
                                        <dt className="eyebrow">Local time</dt>
                                        <dd className="text-sm text-fg">
                                            <LocalTime />
                                        </dd>
                                    </div>
                                    <div className="flex items-center justify-between gap-4 border-b border-white/[0.06] pb-5">
                                        <dt className="eyebrow">Based in</dt>
                                        <dd className="flex items-center gap-1.5 text-sm text-fg">
                                            <FiMapPin size={13} className="text-gold" />
                                            {SITE_CONFIG.location}
                                        </dd>
                                    </div>
                                    <div className="flex items-center justify-between gap-4 border-b border-white/[0.06] pb-5">
                                        <dt className="eyebrow">Response</dt>
                                        <dd className="text-sm text-fg">Within 24 hours</dd>
                                    </div>
                                    <div className="flex items-center justify-between gap-4">
                                        <dt className="eyebrow">Preferred</dt>
                                        <dd className="text-sm text-fg">AI / ML Engineer</dd>
                                    </div>
                                </dl>

                                <div className="mt-9">
                                    <p className="eyebrow mb-4">Looking for</p>
                                    <ul className="space-y-2.5">
                                        {LOOKING_FOR.map((item) => (
                                            <li
                                                key={item}
                                                className="flex items-start gap-2.5 text-sm text-fg-muted"
                                            >
                                                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-gold" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </SpotlightCard>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Channels */}
            <section className="relative shell pb-32">
                <Reveal className="mb-8">
                    <div className="flex items-center gap-3">
                        <span className="font-mono text-[11px] text-gold">07</span>
                        <span className="h-px w-8 bg-gold/40" />
                        <span className="eyebrow">Every channel</span>
                    </div>
                </Reveal>

                <div className="grid gap-px overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.05] md:grid-cols-3">
                    {CHANNELS.map((c, i) => (
                        <Reveal key={c.label} delay={i * 80}>
                            <a
                                href={c.href}
                                target={c.href.startsWith("http") ? "_blank" : undefined}
                                rel={
                                    c.href.startsWith("http")
                                        ? "noopener noreferrer"
                                        : undefined
                                }
                                className="group block h-full bg-ink p-8 transition-colors duration-500 hover:bg-white/[0.02]"
                            >
                                <div className="flex items-start justify-between">
                                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.09] bg-white/[0.03] text-fg-muted transition-all duration-500 group-hover:border-gold/45 group-hover:bg-gold/10 group-hover:text-gold">
                                        <c.icon size={17} />
                                    </span>
                                    <FiArrowUpRight
                                        size={17}
                                        className="text-fg-dim transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-gold"
                                    />
                                </div>

                                <p className="eyebrow mt-7">{c.label}</p>
                                <p className="mt-2 break-all font-display text-lg tracking-tight text-fg">
                                    {c.value}
                                </p>
                                <p className="mt-3 text-[13px] leading-relaxed text-fg-muted">
                                    {c.note}
                                </p>
                            </a>
                        </Reveal>
                    ))}
                </div>
            </section>
        </div>
    );
}
