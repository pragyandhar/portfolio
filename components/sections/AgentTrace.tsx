"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiCheck, FiPause, FiShield, FiPlay } from "react-icons/fi";

import Reveal from "@/components/ui/Reveal";
import { AGENT_PIPELINE } from "@/lib/constants";

/** Illustrative trace lines — one per middleware layer. */
const TRACE_LINES = [
    { call: "tenant.resolve()", out: "scope=acme-corp", status: "ok" },
    { call: "rbac.resolve(role=analyst)", out: "12 tools permitted", status: "ok" },
    { call: "pii.mask(payload)", out: "3 fields redacted", status: "ok" },
    { call: "prompt.assemble(clearance=L2)", out: "memory: 4 summaries", status: "ok" },
    { call: "hitl.evaluate(export_report)", out: "APPROVAL REQUIRED", status: "hold" },
] as const;

const STEP_MS = 1500;

export default function AgentTrace() {
    const [step, setStep] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (paused) return;

        const id = setInterval(() => {
            // Hold on the final approval frame briefly, then loop.
            setStep((prev) => (prev + 1) % (AGENT_PIPELINE.length + 1));
        }, STEP_MS);

        return () => clearInterval(id);
    }, [paused]);

    const active = Math.min(step, AGENT_PIPELINE.length - 1);
    const finished = step >= AGENT_PIPELINE.length;
    const current = AGENT_PIPELINE[active];

    return (
        <section className="relative overflow-hidden py-24 md:py-32">
            <div className="aurora opacity-30" />

            <div className="relative shell">
                <Reveal className="mb-14">
                    <div className="mb-6 flex items-center gap-3">
                        <span className="font-mono text-[11px] text-gold">04</span>
                        <span className="h-px w-8 bg-gold/40" />
                        <span className="eyebrow">How the agent thinks</span>
                    </div>
                    <h2 className="font-display max-w-3xl text-section text-fg">
                        Every request runs a{" "}
                        <span className="serif-accent text-iridescent">gauntlet</span>
                    </h2>
                    <p className="mt-6 max-w-xl text-pretty text-[15px] leading-relaxed text-fg-muted">
                        The interesting part of an agent isn&apos;t the model call — it&apos;s
                        everything wrapped around it. This is the path a single request
                        takes through SentinelNexus before the model is allowed to act.
                    </p>
                </Reveal>

                <div className="grid gap-5 lg:grid-cols-12">
                    {/* Pipeline stepper */}
                    <Reveal className="lg:col-span-5">
                        <div
                            className="tile h-full p-5 md:p-7"
                            onMouseEnter={() => setPaused(true)}
                            onMouseLeave={() => setPaused(false)}
                        >
                            <div className="mb-5 flex items-center justify-between px-1">
                                <span className="eyebrow">Middleware chain</span>
                                <span className="flex items-center gap-1.5 font-mono text-[10px] text-fg-dim">
                                    {paused ? <FiPlay size={9} /> : <FiPause size={9} />}
                                    {paused ? "paused" : "live"}
                                </span>
                            </div>

                            <ol className="relative">
                                {/* Spine track, with the progress fill measured
                                    against it so 100% lands on the last node. */}
                                <span className="absolute bottom-4 left-[19px] top-4 w-px bg-white/[0.08]">
                                    {/* Animate height, not scaleY — scaling would squash
                                        the whole gradient into the filled portion. */}
                                    <motion.span
                                        className="absolute inset-x-0 top-0 block bg-gradient-to-b from-gold via-gold to-iris"
                                        initial={false}
                                        animate={{
                                            height: `${(finished
                                                ? 1
                                                : (active + 1) / AGENT_PIPELINE.length) * 100
                                                }%`,
                                        }}
                                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                    />
                                </span>

                                {AGENT_PIPELINE.map((layer, i) => {
                                    const isActive = !finished && i === active;
                                    const isDone = finished || i < active;

                                    return (
                                        <li key={layer.id}>
                                            <button
                                                onClick={() => {
                                                    setStep(i);
                                                    setPaused(true);
                                                }}
                                                className="group flex w-full items-start gap-4 rounded-2xl p-3 text-left transition-colors duration-300 hover:bg-white/[0.03]"
                                                aria-current={isActive}
                                            >
                                                {/* Node */}
                                                <span
                                                    className={`relative z-10 mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-mono text-[10px] transition-all duration-500 ${isActive
                                                            ? "border-gold bg-gold text-ink shadow-[0_0_0_5px_rgba(233,185,73,0.14)]"
                                                            : isDone
                                                                ? "border-mint/45 bg-mint/10 text-mint"
                                                                : "border-white/[0.12] bg-ink text-fg-dim"
                                                        }`}
                                                >
                                                    {isDone ? <FiCheck size={13} /> : layer.layer}
                                                </span>

                                                <span className="min-w-0 flex-1">
                                                    <span
                                                        className={`block font-display text-[15px] tracking-tight transition-colors duration-500 md:text-base ${isActive ? "text-fg" : "text-fg-muted"
                                                            }`}
                                                    >
                                                        {layer.name}
                                                    </span>
                                                    <span className="mt-0.5 block text-[12px] leading-snug text-fg-dim">
                                                        {layer.role}
                                                    </span>
                                                </span>
                                            </button>
                                        </li>
                                    );
                                })}
                            </ol>
                        </div>
                    </Reveal>

                    {/* Trace console + detail */}
                    <Reveal delay={90} className="lg:col-span-7">
                        <div className="flex h-full flex-col gap-5">
                            {/* Console */}
                            <div className="tile overflow-hidden">
                                <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-3">
                                    <div className="flex items-center gap-1.5">
                                        <span className="h-2.5 w-2.5 rounded-full bg-rose/60" />
                                        <span className="h-2.5 w-2.5 rounded-full bg-gold/60" />
                                        <span className="h-2.5 w-2.5 rounded-full bg-mint/60" />
                                        <span className="ml-3 font-mono text-[11px] text-fg-dim">
                                            agent.trace
                                        </span>
                                    </div>
                                    <span className="font-mono text-[10px] text-fg-dim">
                                        illustrative
                                    </span>
                                </div>

                                <div className="min-h-[248px] space-y-2 p-5 font-mono text-[12px] leading-relaxed md:text-[13px]">
                                    <p className="text-fg-dim">
                                        <span className="text-mint">›</span> agent.invoke(
                                        <span className="text-gold">
                                            &quot;export the Q3 summary&quot;
                                        </span>
                                        )
                                    </p>

                                    {TRACE_LINES.map((line, i) => {
                                        const shown = finished || i <= active;
                                        if (!shown) return null;

                                        const isHold = line.status === "hold";

                                        return (
                                            <motion.p
                                                key={line.call}
                                                initial={{ opacity: 0, x: -8 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.35 }}
                                                className="flex flex-wrap items-center gap-x-2 text-fg-muted"
                                            >
                                                <span className="text-fg-dim">
                                                    {String(i + 1).padStart(2, "0")}
                                                </span>
                                                <span className="text-iris">{line.call}</span>
                                                <span className="text-fg-dim">→</span>
                                                <span className={isHold ? "text-gold" : "text-mint"}>
                                                    {line.out}
                                                </span>
                                            </motion.p>
                                        );
                                    })}

                                    {finished && (
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="flex items-center gap-2 pt-2 text-gold"
                                        >
                                            <FiShield size={13} />
                                            execution paused — awaiting human approval
                                            <span className="animate-blink">▊</span>
                                        </motion.p>
                                    )}
                                </div>
                            </div>

                            {/* Active layer detail */}
                            <div className="tile p-6 md:p-7">
                                <AnimatePresence mode="wait">
                                    {/* Exit is near-instant so the panel isn't blank
                                        for a third of every auto-advance cycle. */}
                                    <motion.div
                                        key={finished ? "done" : current.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            transition: { duration: 0.3 },
                                        }}
                                        exit={{
                                            opacity: 0,
                                            y: -6,
                                            transition: { duration: 0.12 },
                                        }}
                                    >
                                        <div className="mb-3 flex flex-wrap items-center gap-2.5">
                                            <span className="font-mono text-[10px] text-gold">
                                                {finished ? "OUTCOME" : current.layer}
                                            </span>
                                            <span className="h-px w-6 bg-gold/40" />
                                            <span className="eyebrow">
                                                {finished ? "Human decides" : current.name}
                                            </span>
                                        </div>

                                        <p className="text-[15px] leading-relaxed text-fg-muted">
                                            {finished
                                                ? "The agent stops short of the irreversible step and hands the decision back to a person. Autonomy is granted per action, not all at once."
                                                : current.detail}
                                        </p>

                                        {!finished && (
                                            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-rose/25 bg-rose/[0.07] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-rose">
                                                mitigates · {current.risk}
                                            </p>
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
