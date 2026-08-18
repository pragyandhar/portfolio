"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function PageTransition({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // Land at the top on every route change — otherwise Lenis keeps the offset.
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
    }, [pathname]);

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
