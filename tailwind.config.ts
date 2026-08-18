import type { Config } from "tailwindcss";

/**
 * NOTE: This project runs Tailwind v4, where the design tokens live in the
 * `@theme` block of `app/globals.css` — that file is the source of truth.
 * This config is kept only for editor tooling and content globbing; values
 * here mirror the CSS tokens so the two never disagree.
 */
const config: Config = {
    darkMode: "class",

    content: [
        "./app/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./lib/**/*.{ts,tsx}",
    ],

    theme: {
        extend: {
            colors: {
                ink: {
                    DEFAULT: "#08090c",
                    100: "#0b0d12",
                    200: "#10131a",
                    300: "#171b24",
                    400: "#222733",
                },

                gold: {
                    DEFAULT: "#e9b949",
                    soft: "#f7d488",
                    deep: "#b8892a",
                },

                violet: "#7c5cff",
                iris: "#a78bfa",
                cyan: "#56ccf2",
                rose: "#ff7a9c",
                mint: "#5ee9b5",

                fg: {
                    DEFAULT: "#ece9e4",
                    muted: "#979189",
                    dim: "#6a655e",
                },
            },

            fontFamily: {
                sans: ["var(--font-inter)"],
                heading: ["var(--font-space)"],
                serif: ["var(--font-instrument)"],
                mono: ["var(--font-jetbrains)"],
            },
        },
    },

    plugins: [],
};

export default config;
