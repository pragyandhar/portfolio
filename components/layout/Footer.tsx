"use client";

import Link from "next/link";
import { SITE_CONFIG, SOCIAL_LINKS } from "@/lib/constants";
import { FiGithub, FiLinkedin, FiMail, FiArrowUpRight, FiArrowUp } from "react-icons/fi";
import Reveal from "@/components/ui/Reveal";
import Magnetic from "@/components/ui/Magnetic";

const navLinks = [
    { label: "About", href: "/about" },
    { label: "Skills", href: "/skills" },
    { label: "Work", href: "/projects" },
    { label: "Education", href: "/education" },
    { label: "Awards", href: "/certifications" },
    { label: "Contact", href: "/contact" },
];

const socials = [
    { icon: FiGithub, href: SOCIAL_LINKS.github, label: "GitHub" },
    { icon: FiLinkedin, href: SOCIAL_LINKS.linkedin, label: "LinkedIn" },
    { icon: FiMail, href: SOCIAL_LINKS.email, label: "Email" },
];

export default function Footer() {
    return (
        <footer className="relative overflow-hidden border-t border-white/[0.06]">
            <div className="aurora opacity-30" />

            <div className="relative shell py-20 md:py-28">
                {/* Oversized CTA */}
                <Reveal>
                    <p className="eyebrow mb-6">Open to opportunities</p>
                    <Link href="/contact" className="group inline-block">
                        <h2 className="font-display text-[clamp(2.5rem,9vw,7rem)] leading-[0.9] tracking-tighter text-fg">
                            Let&apos;s build
                            <br />
                            <span className="serif-accent text-iridescent">
                                something real
                            </span>
                            <FiArrowUpRight
                                className="ml-3 inline-block align-middle text-gold transition-transform duration-500 group-hover:translate-x-3 group-hover:-translate-y-2"
                                size={48}
                            />
                        </h2>
                    </Link>
                </Reveal>

                <Reveal delay={100}>
                    <a
                        href={SOCIAL_LINKS.email}
                        className="link-wipe mt-8 inline-block font-mono text-sm text-fg-muted transition-colors hover:text-gold md:text-base"
                    >
                        {SITE_CONFIG.email}
                    </a>
                </Reveal>

                <div className="rule my-14" />

                {/* Columns */}
                <div className="grid gap-12 md:grid-cols-12">
                    <div className="md:col-span-5">
                        <Link href="/" className="font-display text-xl tracking-tight">
                            {SITE_CONFIG.shortName}
                            <span className="text-gold">.</span>
                        </Link>
                        <p className="mt-4 max-w-xs text-sm leading-relaxed text-fg-muted">
                            {SITE_CONFIG.title}
                        </p>
                        <div className="mt-5 flex items-center gap-2.5 text-sm text-fg-muted">
                            <span className="status-dot" />
                            <span>Available for 2026 roles</span>
                        </div>
                    </div>

                    <div className="md:col-span-4">
                        <h3 className="eyebrow">Index</h3>
                        <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3">
                            {navLinks.map((link, i) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="group flex items-baseline gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
                                    >
                                        <span className="font-mono text-[10px] text-fg-dim">
                                            0{i + 1}
                                        </span>
                                        <span className="link-wipe">{link.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-3">
                        <h3 className="eyebrow">Elsewhere</h3>
                        <div className="mt-5 flex gap-2.5">
                            {socials.map((s) => (
                                <Magnetic key={s.label} strength={0.4}>
                                    <a
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.09] bg-white/[0.02] text-fg-muted transition-all duration-500 hover:border-gold/45 hover:bg-gold/10 hover:text-gold"
                                        aria-label={s.label}
                                    >
                                        <s.icon size={17} />
                                    </a>
                                </Magnetic>
                            ))}
                        </div>
                        <a
                            href={SITE_CONFIG.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link-wipe mt-6 inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-gold"
                        >
                            Résumé <FiArrowUpRight size={13} />
                        </a>
                    </div>
                </div>

                {/* Baseline */}
                <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/[0.06] pt-8 text-xs text-fg-dim md:flex-row md:items-center">
                    <p>
                        © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights
                        reserved.
                    </p>
                    <div className="flex items-center gap-5">
                        <p className="font-mono">
                            Next.js · Three.js · Framer Motion
                        </p>
                        <button
                            onClick={() =>
                                window.scrollTo({ top: 0, behavior: "smooth" })
                            }
                            className="flex items-center gap-1.5 transition-colors hover:text-gold"
                            aria-label="Back to top"
                        >
                            Top <FiArrowUp size={12} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Giant watermark */}
            <div
                aria-hidden
                className="pointer-events-none select-none overflow-hidden"
            >
                <p className="font-display translate-y-[22%] whitespace-nowrap text-center text-[22vw] leading-none tracking-tighter text-white/[0.022]">
                    PRAGYAN
                </p>
            </div>
        </footer>
    );
}
