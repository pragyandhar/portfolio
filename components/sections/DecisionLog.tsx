"use client";

import Reveal from "@/components/ui/Reveal";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { DECISION_LOG } from "@/lib/constants";

const ROWS = [
    { key: "context", label: "Context" },
    { key: "constraint", label: "Constraint" },
    { key: "decision", label: "Decision" },
    { key: "tradeoff", label: "Trade-off" },
] as const;

/**
 * Engineering decisions in Context → Constraint → Decision → Trade-off form.
 * Naming the trade-off is the point: it's the part that separates a considered
 * decision from a default.
 */
export default function DecisionLog({
    index = "04",
    className,
}: {
    index?: string;
    className?: string;
}) {
    return (
        <section className={`relative shell py-24 md:py-32 ${className ?? ""}`}>
            <Reveal className="mb-12">
                <div className="mb-6 flex items-center gap-3">
                    <span className="font-mono text-[11px] text-gold">{index}</span>
                    <span className="h-px w-8 bg-gold/40" />
                    <span className="eyebrow">Decision log</span>
                </div>
                <h2 className="font-display max-w-3xl text-section text-fg">
                    Four calls, and what each one{" "}
                    <span className="serif-accent text-gilded">cost</span>
                </h2>
                <p className="mt-6 max-w-xl text-pretty text-[15px] leading-relaxed text-fg-muted">
                    Every decision buys something and gives something up. If I can&apos;t
                    name what it gave up, I hadn&apos;t finished thinking about it.
                </p>
            </Reveal>

            <div className="grid gap-5 lg:grid-cols-2">
                {DECISION_LOG.map((entry, i) => (
                    <Reveal key={entry.id} delay={(i % 2) * 80}>
                        <SpotlightCard className="tile edge-iris group h-full p-7 md:p-9">
                            <div className="mb-6 flex items-start justify-between gap-5">
                                <h3 className="font-display max-w-sm text-xl leading-tight tracking-tight text-fg md:text-2xl">
                                    {entry.title}
                                </h3>
                                <span className="font-mono text-[11px] text-fg-dim">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                            </div>

                            <dl className="space-y-0">
                                {ROWS.map((row) => {
                                    const isTradeoff = row.key === "tradeoff";

                                    return (
                                        <div
                                            key={row.key}
                                            className="grid grid-cols-[84px_1fr] gap-4 border-t border-white/[0.06] py-3.5 first:border-t-0 first:pt-0"
                                        >
                                            <dt
                                                className={`font-mono text-[10px] uppercase tracking-[0.14em] ${isTradeoff ? "text-gold" : "text-fg-dim"
                                                    }`}
                                            >
                                                {row.label}
                                            </dt>
                                            <dd
                                                className={`text-[14px] leading-relaxed ${isTradeoff ? "text-fg" : "text-fg-muted"
                                                    }`}
                                            >
                                                {entry[row.key]}
                                            </dd>
                                        </div>
                                    );
                                })}
                            </dl>
                        </SpotlightCard>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}
