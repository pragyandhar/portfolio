"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { FiArrowDown, FiArrowUpRight, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

// WebGL is browser-only: keeping three.js out of the server bundle avoids
// evaluating it during prerender and trims the initial payload.
const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
});
import Reveal from "@/components/ui/Reveal";
import Magnetic from "@/components/ui/Magnetic";
import Odometer from "@/components/ui/Odometer";
import Sticker from "@/components/ui/Sticker";
import SpotlightCard from "@/components/ui/SpotlightCard";
import ScrollHighlightText from "@/components/ui/ScrollHighlightText";
import ScrollVelocityMarquee from "@/components/ui/ScrollVelocityMarquee";
import Bento from "@/components/sections/Bento";
import AgentTrace from "@/components/sections/AgentTrace";
import DecisionLog from "@/components/sections/DecisionLog";
import AudienceSwitch from "@/components/sections/AudienceSwitch";

import {
  CAPABILITIES,
  HERO_ROLES,
  HERO_STATS,
  MARQUEE_ITEMS,
  PROJECTS_DATA,
  SITE_CONFIG,
  SOCIAL_LINKS,
} from "@/lib/constants";

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

function useRoleRotator(roles: string[], interval = 2600) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setIndex((prev) => (prev + 1) % roles.length),
      interval
    );
    return () => clearInterval(id);
  }, [roles.length, interval]);
  return { role: roles[index], index };
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { role } = useRoleRotator(HERO_ROLES);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // The hero recedes as you scroll past it rather than just scrolling away.
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  const [first, ...rest] = SITE_CONFIG.name.split(" ");

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-24 pt-32"
    >
      <HeroScene />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />

      {/* Legibility scrim — guarantees text contrast independent of the
          shader, and blends the hero into the section below. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,9,12,0.72) 0%, rgba(8,9,12,0.30) 26%, rgba(8,9,12,0.45) 62%, rgba(8,9,12,0.97) 100%)",
        }}
      />

      {/* Side rails */}
      <div className="pointer-events-none absolute inset-y-0 left-4 hidden items-center xl:flex">
        <span className="eyebrow [writing-mode:vertical-rl] rotate-180">
          {SITE_CONFIG.location}
        </span>
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-4 hidden items-center xl:flex">
        <span className="eyebrow [writing-mode:vertical-rl]">
          Scroll to explore
        </span>
      </div>

      <motion.div style={{ y, opacity, scale }} className="shell relative z-10">
        {/* Availability */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 flex flex-wrap items-center gap-3"
        >
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.09] bg-white/[0.03] px-4 py-2 backdrop-blur-md">
            <span className="status-dot" />
            <span className="text-[13px] text-fg-muted">
              Open to AI engineering roles
            </span>
          </span>
          <Sticker variant="iris" rotate={-4}>
            Agentic AI
          </Sticker>
        </motion.div>

        {/* Name */}
        <h1 className="font-display text-display text-fg">
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: "108%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="block"
            >
              {first}
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: "108%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="serif-accent block text-gilded"
            >
              {rest.join(" ")}
            </motion.span>
          </span>
        </h1>

        {/* Role + blurb */}
        <div className="mt-10 grid gap-10 md:grid-cols-12 md:items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="md:col-span-5"
          >
            <div className="flex h-7 items-center gap-2 font-mono text-sm text-gold">
              <span className="text-fg-dim">$</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={role}
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -14, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block"
                >
                  {role}
                </motion.span>
              </AnimatePresence>
              <span className="animate-blink text-gold">▊</span>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Magnetic strength={0.3}>
                <Link href="/projects" className="btn btn-primary">
                  View selected work
                  <FiArrowUpRight size={15} />
                </Link>
              </Magnetic>
              <Magnetic strength={0.3}>
                <a
                  href={SITE_CONFIG.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                >
                  Résumé
                </a>
              </Magnetic>
            </div>

            <div className="mt-7 flex gap-2.5">
              {[
                { icon: FiGithub, href: SOCIAL_LINKS.github, label: "GitHub" },
                { icon: FiLinkedin, href: SOCIAL_LINKS.linkedin, label: "LinkedIn" },
                { icon: FiMail, href: SOCIAL_LINKS.email, label: "Email" },
              ].map((s) => (
                <Magnetic key={s.label} strength={0.45}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.09] bg-white/[0.02] text-fg-muted transition-all duration-500 hover:border-gold/50 hover:bg-gold/10 hover:text-gold"
                    aria-label={s.label}
                  >
                    <s.icon size={16} />
                  </a>
                </Magnetic>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.72 }}
            className="md:col-span-6 md:col-start-7"
          >
            <p className="max-w-md text-pretty text-[15px] leading-relaxed text-fg-muted md:text-lg">
              I build <span className="text-fg">agentic AI systems</span> that
              enterprises can actually deploy — LangGraph orchestration wrapped
              in tenant isolation, RBAC, PII masking and human approval gates.
              The model is the easy part.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/[0.07] pt-6">
              {HERO_STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-3xl tracking-tight text-fg md:text-4xl">
                    <Odometer value={stat.value} />
                  </p>
                  <p className="mt-1.5 text-[11px] leading-tight text-fg-muted">
                    {stat.label}
                  </p>
                  <p className="text-[10px] leading-tight text-fg-dim">
                    {stat.sub}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        style={{ opacity }}
        className="absolute inset-x-0 bottom-8 z-10 flex justify-center"
      >
        <motion.div
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-fg-dim"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.25em]">
            Scroll
          </span>
          <FiArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Manifesto                                                           */
/* ------------------------------------------------------------------ */

function Manifesto() {
  return (
    <section className="relative shell py-28 md:py-40">
      <Reveal>
        <div className="mb-12 flex items-center gap-3">
          <span className="font-mono text-[11px] text-gold">01</span>
          <span className="h-px w-8 bg-gold/40" />
          <span className="eyebrow">The approach</span>
        </div>
      </Reveal>

      <ScrollHighlightText
        className="font-display max-w-4xl text-[clamp(1.75rem,4.4vw,3.4rem)] leading-[1.15] tracking-tight text-fg"
        accentWords={["secure", "real", "production"]}
        text="Most AI demos break the moment they meet real users. I build the other kind — agents with security boundaries, memory that persists, and pipelines that survive production."
      />

      <Reveal delay={120}>
        <div className="mt-16 grid gap-8 border-t border-white/[0.07] pt-10 md:grid-cols-3">
          {[
            {
              k: "Currently",
              v: "Third-year CSE at GLA University, Mathura",
            },
            {
              k: "Focused on",
              v: "Agentic AI, retrieval pipelines, production ML",
            },
            {
              k: "Principle",
              v: "Name the trade-off, or you haven't made a decision yet",
            },
          ].map((row) => (
            <div key={row.k}>
              <p className="eyebrow mb-2.5">{row.k}</p>
              <p className="text-[15px] leading-relaxed text-fg-muted">{row.v}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Capabilities                                                        */
/* ------------------------------------------------------------------ */

function Capabilities() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="aurora opacity-40" />

      <div className="relative shell">
        <Reveal className="mb-14">
          <div className="mb-6 flex items-center gap-3">
            <span className="font-mono text-[11px] text-gold">03</span>
            <span className="h-px w-8 bg-gold/40" />
            <span className="eyebrow">What I build</span>
          </div>
          <h2 className="font-display max-w-2xl text-section text-fg">
            Four things I do{" "}
            <span className="serif-accent text-gilded">properly</span>
          </h2>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2">
          {CAPABILITIES.map((cap, i) => (
            <Reveal key={cap.id} delay={i * 90}>
              <SpotlightCard
                tilt={3}
                className="tile edge-iris group h-full p-8 md:p-10"
              >
                <div className="mb-7 flex items-start justify-between gap-6">
                  <h3 className="font-display text-2xl tracking-tight text-fg md:text-3xl">
                    {cap.title}
                  </h3>
                  <span className="font-mono text-[11px] text-fg-dim">
                    0{i + 1}
                  </span>
                </div>

                <p className="max-w-sm text-[15px] leading-relaxed text-fg-muted">
                  {cap.body}
                </p>

                <div className="mt-8 flex flex-wrap gap-2">
                  {cap.items.map((item) => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Selected work                                                       */
/* ------------------------------------------------------------------ */

const accentMap = {
  gold: { text: "text-gold", ring: "hover:shadow-gold", bar: "from-gold-soft to-gold" },
  violet: { text: "text-iris", ring: "hover:shadow-violet", bar: "from-iris to-violet" },
  cyan: { text: "text-cyan", ring: "hover:shadow-neon", bar: "from-cyan to-violet" },
} as const;

function SelectedWork() {
  return (
    <section className="relative shell py-24 md:py-32">
      <Reveal className="mb-14">
        <div className="mb-6 flex items-center gap-3">
          <span className="font-mono text-[11px] text-gold">07</span>
          <span className="h-px w-8 bg-gold/40" />
          <span className="eyebrow">Selected work</span>
        </div>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-section text-fg">
            Things I&apos;ve{" "}
            <span className="serif-accent text-gilded">shipped</span>
          </h2>
          <Link
            href="/projects"
            className="link-wipe inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-gold"
          >
            All projects <FiArrowUpRight size={14} />
          </Link>
        </div>
      </Reveal>

      <div className="flex flex-col gap-5">
        {PROJECTS_DATA.map((project, i) => {
          const accent = accentMap[project.accent];

          return (
            <Reveal key={project.id} delay={i * 80}>
              <Link
                href="/projects"
                className="block"
                data-cursor-label="View case study"
              >
                <SpotlightCard
                  className={`tile edge-iris group p-8 transition-transform duration-700 hover:-translate-y-1.5 md:p-12 ${accent.ring}`}
                >
                  <div className="grid gap-8 md:grid-cols-12 md:items-start">
                    {/* Index + category */}
                    <div className="md:col-span-3">
                      <div
                        className={`h-px w-12 bg-gradient-to-r ${accent.bar} mb-5`}
                      />
                      <p className="font-display text-5xl leading-none text-white/[0.08] transition-colors duration-700 group-hover:text-white/[0.16] md:text-7xl">
                        0{i + 1}
                      </p>
                      <p className={`mt-4 font-mono text-[11px] ${accent.text}`}>
                        {project.category}
                      </p>
                    </div>

                    {/* Body */}
                    <div className="md:col-span-6">
                      {project.featured && (
                        <Sticker variant="gold" className="mb-4">
                          Flagship build
                        </Sticker>
                      )}
                      <h3 className="font-display text-2xl leading-tight tracking-tight text-fg md:text-4xl">
                        {project.shortTitle}
                      </h3>
                      <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-fg-muted">
                        {project.tagline}
                      </p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {project.tech.slice(0, 5).map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-white/[0.08] px-3 py-1 font-mono text-[11px] text-fg-dim"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="md:col-span-3">
                      <div className="flex gap-6 md:flex-col md:gap-5">
                        {project.metrics.map((m) => (
                          <div key={m.label}>
                            <p
                              className={`font-display text-2xl leading-none ${accent.text}`}
                            >
                              {m.value}
                            </p>
                            <p className="mt-1 text-[11px] text-fg-dim">
                              {m.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function HomePage() {
  return (
    <>
      <Hero />

      <div className="border-y border-white/[0.06] py-9">
        <ScrollVelocityMarquee items={MARQUEE_ITEMS} baseVelocity={2.2} />
      </div>

      {/* Narrative arc: the approach → the proof → what I build →
          how it works → why I chose it → how I explain it → what shipped. */}
      <Manifesto />
      <Bento />
      <Capabilities />
      <AgentTrace />
      <DecisionLog index="05" />
      <AudienceSwitch />
      <SelectedWork />
    </>
  );
}
