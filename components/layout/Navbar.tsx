"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_CONFIG, SOCIAL_LINKS } from "@/lib/constants";
import { FiGithub, FiLinkedin, FiArrowUpRight } from "react-icons/fi";
import Magnetic from "@/components/ui/Magnetic";

const NAV_LINKS = [
    { label: "About", href: "/about" },
    { label: "Skills", href: "/skills" },
    { label: "Work", href: "/projects" },
    { label: "Education", href: "/education" },
    { label: "Awards", href: "/certifications" },
    { label: "Contact", href: "/contact" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 24);
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // The takeover menu closes from its own link handlers, so no route effect
    // is needed here.

    // Lock body scroll while the takeover menu is open.
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    return (
        <>
            <motion.header
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="fixed inset-x-0 top-0 z-[80]"
            >
                <div className="px-4 py-3 md:px-8 md:py-5">
                    <div
                        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-3 py-2 transition-all duration-700 md:px-4 ${scrolled
                                ? "border border-white/[0.09] bg-ink/70 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.95)] backdrop-blur-2xl"
                                : "border border-transparent bg-transparent"
                            }`}
                    >
                        {/* Wordmark */}
                        <Link
                            href="/"
                            className="group flex items-center gap-2.5 rounded-full py-1 pl-2 pr-3"
                            aria-label="Home"
                        >
                            <span className="relative flex h-7 w-7 items-center justify-center">
                                <span className="absolute inset-0 rounded-full bg-gradient-to-br from-gold-soft to-gold-deep opacity-90 transition-transform duration-700 group-hover:rotate-180" />
                                <span className="relative font-display text-[13px] text-ink">
                                    P
                                </span>
                            </span>
                            <span className="font-display text-[15px] tracking-tight text-fg">
                                {SITE_CONFIG.shortName}
                                <span className="text-gold">.</span>
                            </span>
                        </Link>

                        {/* Desktop nav */}
                        <nav className="hidden items-center lg:flex">
                            {NAV_LINKS.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`relative rounded-full px-4 py-2 text-[13px] transition-colors duration-300 ${isActive
                                                ? "text-ink"
                                                : "text-fg-muted hover:text-fg"
                                            }`}
                                    >
                                        {isActive && (
                                            <motion.span
                                                layoutId="nav-pill"
                                                className="absolute inset-0 rounded-full bg-gradient-to-b from-gold-soft to-gold"
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 340,
                                                    damping: 32,
                                                }}
                                            />
                                        )}
                                        <span className="relative z-10 font-medium">
                                            {link.label}
                                        </span>
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Right cluster */}
                        <div className="flex items-center gap-1.5">
                            <a
                                href={SOCIAL_LINKS.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hidden h-9 w-9 items-center justify-center rounded-full text-fg-muted transition-all duration-300 hover:bg-white/[0.07] hover:text-gold sm:flex"
                                aria-label="GitHub"
                            >
                                <FiGithub size={15} />
                            </a>
                            <a
                                href={SOCIAL_LINKS.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hidden h-9 w-9 items-center justify-center rounded-full text-fg-muted transition-all duration-300 hover:bg-white/[0.07] hover:text-gold sm:flex"
                                aria-label="LinkedIn"
                            >
                                <FiLinkedin size={15} />
                            </a>

                            <Magnetic strength={0.28} className="hidden sm:block">
                                <a
                                    href={SITE_CONFIG.resumeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary ml-1 px-5 py-2 text-[13px]"
                                >
                                    Résumé
                                    <FiArrowUpRight size={14} />
                                </a>
                            </Magnetic>

                            {/* Menu toggle */}
                            <button
                                onClick={() => setOpen((s) => !s)}
                                className="relative ml-1 flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.09] bg-white/[0.03] transition-colors hover:bg-white/[0.08] lg:hidden"
                                aria-label={open ? "Close menu" : "Open menu"}
                                aria-expanded={open}
                            >
                                <span className="relative block h-3 w-4">
                                    <motion.span
                                        animate={
                                            open
                                                ? { rotate: 45, y: 5 }
                                                : { rotate: 0, y: 0 }
                                        }
                                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                        className="absolute left-0 top-0 block h-px w-4 bg-fg"
                                    />
                                    <motion.span
                                        animate={
                                            open
                                                ? { rotate: -45, y: -5 }
                                                : { rotate: 0, y: 0 }
                                        }
                                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                        className="absolute bottom-0 left-0 block h-px w-4 bg-fg"
                                    />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Full-screen takeover */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
                        animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                        exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
                        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed inset-0 z-[75] bg-ink lg:hidden"
                    >
                        <div className="aurora opacity-60" />

                        <div className="relative flex h-full flex-col justify-center px-7 pb-16 pt-28">
                            <p className="eyebrow mb-8">Navigation</p>

                            <nav className="flex flex-col">
                                {NAV_LINKS.map((link, i) => {
                                    const isActive = pathname === link.href;
                                    return (
                                        <div
                                            key={link.href}
                                            className="overflow-hidden border-b border-white/[0.06]"
                                        >
                                            <motion.div
                                                initial={{ y: "100%", opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{
                                                    duration: 0.7,
                                                    delay: 0.18 + i * 0.06,
                                                    ease: [0.16, 1, 0.3, 1],
                                                }}
                                            >
                                                <Link
                                                    href={link.href}
                                                    onClick={() => setOpen(false)}
                                                    className="flex items-baseline gap-4 py-4"
                                                >
                                                    <span className="font-mono text-[11px] text-fg-dim">
                                                        0{i + 1}
                                                    </span>
                                                    <span
                                                        className={`font-display text-4xl tracking-tight transition-colors sm:text-5xl ${isActive ? "text-gold" : "text-fg"
                                                            }`}
                                                    >
                                                        {link.label}
                                                    </span>
                                                </Link>
                                            </motion.div>
                                        </div>
                                    );
                                })}
                            </nav>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.6 }}
                                className="mt-10 flex flex-wrap items-center gap-3"
                            >
                                <a
                                    href={SITE_CONFIG.resumeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary"
                                >
                                    Download Résumé <FiArrowUpRight size={15} />
                                </a>
                                <a
                                    href={SOCIAL_LINKS.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-ghost"
                                    aria-label="GitHub"
                                >
                                    <FiGithub size={16} />
                                </a>
                                <a
                                    href={SOCIAL_LINKS.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-ghost"
                                    aria-label="LinkedIn"
                                >
                                    <FiLinkedin size={16} />
                                </a>
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.75 }}
                                className="mt-8 font-mono text-xs text-fg-dim"
                            >
                                {SITE_CONFIG.email}
                            </motion.p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
