// =============================
// CORE IDENTITY
// =============================

export const SITE_CONFIG = {
    name: "Pragyan Chandra Dhar",
    shortName: "Pragyan",
    title: "AI Engineer • Agentic Systems Builder",
    email: "pragyandhar@gmail.com",
    secondaryEmail: "pragyanchandradhar7@gmail.com",
    location: "Mathura, India",
    resumeUrl: "/resume.pdf",
};

// =============================
// ROLE ROTATOR (Hero Section)
// =============================

export const HERO_ROLES = [
    "AI Engineer",
    "Agentic Systems Builder",
    "ML Engineer",
    "RAG Systems Developer",
    "LangGraph Specialist",
];

// =============================
// SOCIAL LINKS
// =============================

export const SOCIAL_LINKS = {
    linkedin: "https://www.linkedin.com/in/pragyan-dhar/",
    github: "https://github.com/pragyandhar", // change if different
    email: "mailto:pragyandhar@gmail.com",
};

// =============================
// ABOUT BLURB
// =============================

export const ABOUT_DATA = {
    headline:
        "I build secure, production-grade AI agents that solve real problems.",

    description: `
Third-year Computer Science Engineering student at GLA University focused on 
agentic AI systems, retrieval pipelines, and production machine learning.

My work centers on building enterprise-ready AI with strong emphasis on 
security, multi-tenant isolation, and intelligent memory systems.
  `,
};

// =============================
// SKILLS
// =============================

export const SKILLS_DATA = {
    coreAI: [
        "LangGraph",
        "LangChain",
        "OpenAI API",
        "RAG Pipelines",
        "Context Engineering",
        "Intelligent Memory Systems",
    ],

    ml: [
        "CatBoost",
        "XGBoost",
        "Random Forest",
        "Scikit-learn",
        "Feature Engineering",
        "Hyperparameter Optimization",
    ],

    backend: [
        "Flask REST APIs",
        "Modular Microservices",
        "Structured Logging",
        "Custom Exception Handling",
    ],

    infra: [
        "Multi-tenant Architecture",
        "RBAC",
        "PII Masking",
        "Human-in-the-Loop (HITL)",
        "Semantic Safety Validation",
    ],

    languages: [
        "Python",
        "SQL (Advanced Window Functions)",
        "Java",
        "Scala",
        "Streamlit",
        "HTML/CSS",
        "PyAutoGUI",
    ],
};

// =============================
// PROJECTS
// =============================

export const PROJECTS_DATA = [
    {
        id: "shinrai",
        title: "Shinrai: AI-Powered Code Validation & Auto-Repair System",
        shortTitle: "Shinrai",
        tagline:
            "Full-stack code reliability layer combining GPT-4o generation with 12 parallel validation checks and automatic repair.",

        category: "LLM · Code Quality · DevOps",
        accent: "rose" as const,
        github: "https://github.com/pragyandhar/Shinrai---AI-Code-Reliability-Layer",

        metrics: [
            { value: "71%", label: "Detection accuracy" },
            { value: "12", label: "Parallel checks" },
            { value: "3", label: "Repair attempts" },
        ],

        tech: [
            "Python",
            "FastAPI",
            "Celery",
            "Redis",
            "SQLite",
            "GPT-4o",
            "SQLAlchemy",
        ],

        highlights: [
            "5 reliability checks (linting, type checking, hallucination detection, sandbox testing, control flow)",
            "4 security checks (SAST, CVE scanning, secret detection, pattern analysis)",
            "Weakest-link confidence aggregation with auto-repair loop",
            "482ms average security scan time with graceful degradation",
            "~10,000 lines of production Python with structured JSON logging",
            "Unified diff generation and auto-generated markdown documentation",
        ],

        featured: true,
    },

    {
        id: "sentinel-nexus",
        title: "SentinelNexus: Multi-Tenant Enterprise AI Agent",
        shortTitle: "SentinelNexus",
        tagline:
            "Production-grade AI agent with defense-in-depth security architecture.",

        category: "Agentic AI · Security",
        accent: "gold" as const,
        github: undefined as string | undefined,

        // Figures below are pulled straight from the highlights — nothing new.
        metrics: [
            { value: "5", label: "Security layers" },
            { value: "RBAC", label: "Access control" },
            { value: "HITL", label: "Approval gate" },
        ],

        tech: [
            "Python",
            "LangChain",
            "LangGraph",
            "OpenAI",
            "Streamlit",
        ],

        highlights: [
            "5-layer middleware with PII masking and RBAC",
            "Dynamic prompt generation based on clearance levels",
            "Intelligent memory with auto summarization",
            "Human-in-the-Loop approval for high-risk actions",
            "Tenant-level isolation preventing data leakage",
        ],

        featured: true,
    },

    {
        id: "student-performance",
        title: "Student Performance Prediction System",
        shortTitle: "Student Performance",
        tagline:
            "Automated ML pipeline with ensemble models and Flask deployment.",

        category: "Machine Learning · MLOps",
        accent: "cyan" as const,
        github: undefined as string | undefined,

        metrics: [
            { value: "7", label: "Ensemble models" },
            { value: "Auto", label: "Model selection" },
            { value: "REST", label: "Flask API" },
        ],

        tech: [
            "Python",
            "Scikit-learn",
            "CatBoost",
            "XGBoost",
            "Flask",
            "Pandas",
            "NumPy",
        ],

        highlights: [
            "7-model ensemble trainer",
            "Automated model selection",
            "Full preprocessing pipeline",
            "Flask REST prediction API",
            "Structured logging for debugging",
        ],

        featured: false,
    },
];

// =============================
// EDUCATION
// =============================

export const EDUCATION_DATA = [
    {
        degree: "B.Tech — Computer Science Engineering",
        institute: "GLA University, Mathura",
        score: "CPI: 8.4",
        year: "2023 – Present",
    },
    {
        degree: "CBSE XII",
        institute: "St. Mary's Sr. Sec. School, Dwarka",
        score: "85%",
        year: "2023",
    },
    {
        degree: "CBSE X",
        institute: "St. Mary's Sr. Sec. School, Dwarka",
        score: "94.4%",
        year: "2021",
    },
];

// =============================
// CERTIFICATIONS & ACHIEVEMENTS
// =============================

export const CERTIFICATIONS_DATA: {
    text: string;
    image?: string;
    /** Explicit grouping — safer than inferring from the text */
    type: "achievement" | "certification";
}[] = [
        // Achievements
        { type: "achievement", text: "3rd Prize — ML-Manthan Hackathon (GLA University)" },
        { type: "achievement", text: "NPTEL Elite + Silver Certificate (Top 2%) — Environmental Engineering & Sustainability (May 2025)", image: "/certificates/NPTEL.png" },
        { type: "achievement", text: "Participant — Hack & Viz Hackathon (GLA University)" },
        { type: "achievement", text: "Participant — ML Hackathon (IIT Kanpur)" },
        { type: "achievement", text: "Rockschool Grade-5 — Electric Guitar" },

        // Certifications
        { type: "certification", text: "Guest Lecture on Data Visualization & Dashboard using Excel and Power BI — GLA University (Jan 2025)", image: "/certificates/GLA_Data_Visualisation.png" },
        { type: "certification", text: "Get Job Ready: Power BI Data Analytics for All Levels 3.0 — Codebasics (Mar 2025)", image: "/certificates/Power_BI.png" },
        { type: "certification", text: "SQL Beginner to Advanced For Data Professionals — Codebasics (Jan 2025)", image: "/certificates/SQL.png" },
        { type: "certification", text: "Excel: Mother of Business Intelligence — Codebasics (Sep 2024)", image: "/certificates/Excel.png" },
        { type: "certification", text: "Microsoft Excel 365: Addressing Payment Issues — skillcred (Jul 2024)", image: "/certificates/Skillcred_Data_Analyst_Micro_Experience.png" },
        { type: "certification", text: "Critical Thinking, Decision Analysis and Problem Solving — Udemy (Jul 2024)", image: "/certificates/Critical_Thinking.png" },
        { type: "certification", text: "Persuasion: Give Persuasive Presentations — Udemy (Jul 2024)", image: "/certificates/Persuasive_Presentation.png" },
        { type: "certification", text: "Read for Success and Memory — Unstoppable Wisdom Academy (Sep 2024)", image: "/certificates/Read_for_success.png" },
    ];

// =============================
// EXTRA ACTIVITIES
// =============================

export const EXTRA_DATA = [
    "Volunteered as teacher at NGO Udaaan Asma Tak (1 year)",
    "Conducted Children's Day activities at GLA Campus",
    "Taught students from classes 1-12",
];

// =============================
// PRESENTATION-ONLY DATA
// (derived from the sections above — no new claims)
// =============================

/** Headline figures for the hero. */
export const HERO_STATS = [
    { value: "8.4", label: "CPI", sub: "GLA University" },
    { value: "3", label: "Flagship builds", sub: "AI · ML · Automation" },
    { value: "13", label: "Certifications", sub: "& achievements" },
];

/** The four pillars the work is organised around. */
export const CAPABILITIES = [
    {
        id: "agents",
        title: "Agentic Systems",
        body: "LangGraph orchestration, tool routing, and stateful agents that hold context across long-running tasks.",
        items: ["LangGraph", "LangChain", "Context Engineering"],
    },
    {
        id: "retrieval",
        title: "Retrieval & Memory",
        body: "RAG pipelines with intelligent memory, auto-summarisation, and grounded responses over private corpora.",
        items: ["RAG Pipelines", "Intelligent Memory", "OpenAI API"],
    },
    {
        id: "security",
        title: "Security & Isolation",
        body: "Defense-in-depth for enterprise AI: multi-tenant boundaries, RBAC, PII masking, and human approval gates.",
        items: ["Multi-tenant", "RBAC", "PII Masking", "HITL"],
    },
    {
        id: "ml",
        title: "Production ML",
        body: "Ensemble training, automated model selection, and Flask services with structured logging built in.",
        items: ["CatBoost", "XGBoost", "Flask REST APIs"],
    },
];

// =============================
// AGENT ARCHITECTURE
// The SentinelNexus request path, expanded from the project's own
// highlights. This is the spine of the animated trace on the home page.
// =============================

export const AGENT_PIPELINE = [
    {
        id: "tenant",
        layer: "L1",
        name: "Tenant Isolation",
        role: "Resolve tenant, scope every downstream call",
        detail:
            "Every request is bound to a tenant before anything else runs. Nothing downstream can reach across that boundary.",
        risk: "Cross-tenant data leakage",
    },
    {
        id: "rbac",
        layer: "L2",
        name: "RBAC & Clearance",
        role: "Resolve role, derive permission set",
        detail:
            "The caller's clearance level decides which tools, data and actions exist for this request at all.",
        risk: "Privilege escalation",
    },
    {
        id: "pii",
        layer: "L3",
        name: "PII Masking",
        role: "Redact before the model ever sees it",
        detail:
            "Sensitive fields are masked on the way in, so the provider never receives raw personal data.",
        risk: "PII exposure to third-party models",
    },
    {
        id: "prompt",
        layer: "L4",
        name: "Prompt Assembly",
        role: "Build the system prompt from clearance + memory",
        detail:
            "Prompts are generated per clearance level and hydrated with summarised long-term memory rather than raw history.",
        risk: "Context bloat and prompt injection",
    },
    {
        id: "hitl",
        layer: "L5",
        name: "Human-in-the-Loop",
        role: "Pause high-risk actions for approval",
        detail:
            "Low-risk actions execute. High-risk ones stop and wait for a human decision before the agent proceeds.",
        risk: "Irreversible autonomous action",
    },
];

// =============================
// DECISION LOG
// Reasoning narratives written around the real project highlights.
// REVIEW AND EDIT THESE so they match how you'd actually tell the story —
// a recruiter will ask you to walk through one.
// =============================

export const DECISION_LOG = [
    {
        id: "hitl",
        title: "Gating autonomy instead of maximising it",
        context:
            "The agent could technically execute every action it was capable of planning.",
        constraint:
            "Enterprise users will not adopt a system that can take irreversible actions unsupervised.",
        decision:
            "Classify actions by risk and route the high-risk ones through a human approval gate.",
        tradeoff:
            "Gives up some end-to-end automation in exchange for the trust required to deploy at all.",
    },
    {
        id: "memory",
        title: "Summarised memory over full history",
        context:
            "Long agent conversations kept growing the context window with mostly redundant turns.",
        constraint:
            "Cost and latency scale with context, and relevant detail gets buried in noise.",
        decision:
            "Auto-summarise older turns into durable memory and retrieve selectively instead of replaying everything.",
        tradeoff:
            "Accepts some lossy compression of history to keep responses fast, cheap and on-topic.",
    },
    {
        id: "masking",
        title: "Masking at the boundary, not in the prompt",
        context:
            "Sensitive fields were reaching the model provider inside otherwise ordinary requests.",
        constraint:
            "You cannot un-send data to a third party, and prompt-level instructions are not a control.",
        decision:
            "Mask PII in middleware before the request is assembled, so redaction is structural rather than instructional.",
        tradeoff:
            "The model sees less raw detail, which required designing prompts that work on masked inputs.",
    },
    {
        id: "tenancy",
        title: "Isolation as layer one, not a later feature",
        context:
            "Multi-tenancy is usually retrofitted once a second customer appears.",
        constraint:
            "Retrofitted isolation leaves gaps in exactly the paths nobody thought to check.",
        decision:
            "Bind tenant scope at the first middleware layer so every downstream call inherits it by default.",
        tradeoff:
            "More upfront architecture before any feature work, in exchange for a boundary that holds by construction.",
    },
];

// =============================
// ONE SYSTEM, THREE AUDIENCES
// Same project, retold for whoever is in the room.
// =============================

export const AUDIENCE_EXPLAINERS = [
    {
        id: "engineer",
        audience: "To an engineer",
        role: "Tech lead / senior engineer",
        body: "Five middleware layers wrap the agent loop. Tenant scope binds first, then RBAC resolves the permitted tool set, then PII is masked pre-assembly. The system prompt is generated per clearance level and hydrated from summarised memory. High-risk tool calls return an approval interrupt instead of executing.",
    },
    {
        id: "product",
        audience: "To a product manager",
        role: "PM / product owner",
        body: "Each customer's data stays in its own lane, and what the assistant can see or do depends on who is asking. Anything risky stops and asks a person first. That means we can ship it to a regulated customer without a six-month security review blocking the launch.",
    },
    {
        id: "exec",
        audience: "To an executive",
        role: "CTO / buyer",
        body: "It is an AI assistant you can actually put in front of enterprise customers. Their data cannot leak into another account, staff only see what their role allows, and it cannot take a costly action on its own. The controls are built into the architecture, not bolted on afterwards.",
    },
];

/** Ticker strip content. */
export const MARQUEE_ITEMS = [
    "LangGraph",
    "RAG Pipelines",
    "Multi-Tenant AI",
    "Python",
    "XGBoost",
    "Flask",
    "RBAC",
    "Intelligent Memory",
    "CatBoost",
    "SQL",
];