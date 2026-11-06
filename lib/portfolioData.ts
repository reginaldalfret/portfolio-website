export interface Project {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  award: {
    title: string;
    context: string;
  };
  technologies: string[];
  points: string[];
  theme: {
    accent: string;
    borderGlow: string;
    gradient: string;
    textColor: string;
    badgeBg: string;
  };
  github?: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  current: boolean;
  points: string[];
  technologies: string[];
}

export interface Achievement {
  title: string;
  event: string;
  award: string;
  year?: string;
  highlight?: boolean;
  projectRelation?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  platform: string;
}

export interface SkillCategory {
  category: string;
  skills: { name: string; tag?: string }[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Reginald Alfret V",
    titles: [
      "Open-Source Contributor",
      "AI Engineer",
      "Software Engineer",
      "Full-Stack Developer",
    ],
    headline: "Building intelligent systems and contributing focused fixes, tests, documentation, and infrastructure improvements to major open-source ecosystems.",
    summary:
      "Open-Source Contributor, AI & Data Science Engineer and Software Developer (final-year B.Tech AI & DS) building AI/ML systems, full-stack applications and scalable products. Currently building an ERP platform at DailyGurus. Built 70+ projects, including three 1st-place hackathon winners (HackIndia 2026, TN Police Hackathon 2025, Blaze a Trail 2.0). Author of 30 merged open-source pull requests at Apple, Google, Microsoft, AWS, Meta, NVIDIA, NASA, Netflix, Stripe and more.",
    location: "Chennai, India",
    email: "reginaldalfret@gmail.com",
    phone: "+91 81220 87088",
    github: "https://github.com/reginaldalfret",
    linkedin: "https://www.linkedin.com/in/reginaldalfret",
    resumeUrl: "/Reginald_Alfret_Resume.pdf",
    languages: ["English", "Tamil", "Malayalam"],
    interests: ["Technology", "Product Development", "Open Source"],
    softSkills: [
      "Problem Solving",
      "Team Collaboration",
      "Engineering Leadership",
      "Technical Communication",
    ],
  },

  stats: [
    { value: "30", label: "Merged Pull Requests", caption: "Across leading engineering organisations" },
    { value: "70+", label: "Built Projects", caption: "AI systems, full-stack & automation" },
    { value: "3×", label: "1st Place Hackathons", caption: "HackIndia 2026, TN Police & Blaze a Trail" },
    { value: "301", label: "Specialised AI Agents", caption: "Orchestrated in sovereign local platform" },
  ],

  projects: [
    {
      id: "project-301",
      number: "01",
      title: "301 Super AI Agents",
      tagline: "Sovereign Multi-Agent AI Platform",
      description:
        "A local-first multi-agent AI platform orchestrating 301 specialised agents for real-world automated tasks, featuring offline model selection, OCR document parsing, and real-time streaming.",
      award: {
        title: "1st Place — HackIndia 2026",
        context: "Selected 1st out of 500+ competing engineering teams nationwide",
      },
      technologies: [
        "Python",
        "LLMs (Ollama)",
        "Agent Orchestration",
        "FastAPI",
        "React.js",
        "OCR",
        "Workflow Automation",
      ],
      points: [
        "Designed and developed a multi-agent AI platform with 301 specialised agents coordinated by a central Agent 301.",
        "Implemented local model selection, OCR-based document processing, real-time streaming responses, and workflow automation.",
        "Built a user-friendly interface for interacting with agents, supporting offline and on-device inference for privacy-sensitive use cases.",
        "Won 1st place at HackIndia 2026, competing against 500+ teams nationwide.",
      ],
      theme: {
        accent: "#00F2FE",
        borderGlow: "rgba(0, 242, 254, 0.4)",
        gradient: "from-cyan-500/20 via-blue-600/10 to-transparent",
        textColor: "text-cyan-400",
        badgeBg: "bg-cyan-500/10 border-cyan-500/30 text-cyan-300",
      },
      github: "https://github.com/reginaldalfret",
    },
    {
      id: "project-tor",
      number: "02",
      title: "TOR-UNVEIL",
      tagline: "Dark Web AI Cybercriminal Tracker",
      description:
        "Full-stack AI platform built for operational-level dark web identification and monitoring, featuring suspect network graph profiling and ML-powered threat classification.",
      award: {
        title: "1st Place — TN Police Hackathon 2025",
        context: "Delivered for live operational deployment by Tamil Nadu Police",
      },
      technologies: [
        "Python",
        "React.js",
        "Node.js",
        "REST APIs",
        "Tailwind CSS",
        "Machine Learning",
        "Data Analytics",
      ],
      points: [
        "Built a full-stack platform for real-time cybercriminal identification and monitoring on the TOR dark web.",
        "Developed advanced search, suspect profile cards, and network graph visualisation for high-volume intelligence data.",
        "Designed role-based interfaces for multiple law enforcement stakeholders and integrated ML classification models for threat detection.",
        "Won 1st place at TN Police Hackathon 2025 and delivered the solution for live operational use by Tamil Nadu Police.",
      ],
      theme: {
        accent: "#FF2A54",
        borderGlow: "rgba(255, 42, 84, 0.4)",
        gradient: "from-rose-500/20 via-purple-600/10 to-transparent",
        textColor: "text-rose-400",
        badgeBg: "bg-rose-500/10 border-rose-500/30 text-rose-300",
      },
      github: "https://github.com/reginaldalfret",
    },
    {
      id: "project-crop",
      number: "03",
      title: "AI Crop Recommendation",
      tagline: "Agri-Intelligence Engine",
      description:
        "Machine learning recommendation engine using soil, weather, and GIS spatial datasets to provide actionable precision farming insights with transparent Explainable AI.",
      award: {
        title: "1st Place — Blaze a Trail 2.0",
        context: "Honored for agricultural decision intelligence and transparent predictions",
      },
      technologies: [
        "Python",
        "Machine Learning",
        "React.js",
        "REST APIs",
        "GIS Data",
        "Explainable AI",
      ],
      points: [
        "Developed an ML recommendation engine using soil, weather, and GIS datasets to provide actionable farming insights.",
        "Integrated a REST API backend with a React.js dashboard for real-time data visualisation.",
        "Applied Explainable AI techniques to make model predictions transparent, interpretable, and accessible to non-technical users.",
      ],
      theme: {
        accent: "#10B981",
        borderGlow: "rgba(16, 185, 129, 0.4)",
        gradient: "from-emerald-500/20 via-teal-600/10 to-transparent",
        textColor: "text-emerald-400",
        badgeBg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
      },
      github: "https://github.com/reginaldalfret",
    },
  ] as Project[],

  experience: [
    {
      company: "DailyGurus",
      role: "Software Developer",
      period: "Jul 2026 – Present",
      location: "Chennai, India",
      type: "Full-Time / Core Team",
      current: true,
      points: [
        "Contribute to ERPNext module customizations, business workflows, application development, and operational process improvements.",
        "Developing a full ERP software platform from scratch across frontend, backend, database, and business logic layers.",
        "Building and maintaining production web applications using React.js, Node.js, Express.js, and TypeScript.",
        "Developing and optimizing scalable REST APIs and database integrations for high-reliability systems.",
        "Collaborating with cross-functional engineering teams to design, implement, test, and deploy features following industry standards.",
      ],
      technologies: ["React.js", "Node.js", "Express.js", "TypeScript", "REST APIs", "ERPNext", "Databases"],
    },
    {
      company: "Data Patterns",
      role: "Data Science Intern",
      period: "May 2025 – Jun 2025",
      location: "Chennai, India",
      type: "Internship",
      current: false,
      points: [
        "Developed Python-based web scraping tools to systematically collect aerospace research papers and technical data from IEEE sources.",
        "Cleaned, structured, and curated extracted datasets for model training and downstream domain analytics.",
        "Fine-tuned a Large Language Model using LoRA (Low-Rank Adaptation) on the curated domain-specific dataset.",
        "Evaluated model outputs and iteratively optimized prompt design and fine-tuning workflows to enhance aerospace domain accuracy.",
      ],
      technologies: ["Python", "LLMs", "LoRA", "Web Scraping", "IEEE Data", "Prompt Engineering", "Data Curation"],
    },
  ] as Experience[],

  achievements: [
    {
      title: "1st Place Champion",
      event: "HackIndia 2026",
      award: "National Hackathon Winner",
      year: "2026",
      highlight: true,
      projectRelation: "301 Super AI Agents (500+ Teams Nationwide)",
    },
    {
      title: "1st Place Winner",
      event: "TN Police Hackathon 2025",
      award: "Law Enforcement AI Challenge Winner",
      year: "2025",
      highlight: true,
      projectRelation: "TOR-UNVEIL (Adopted for live operational police use)",
    },
    {
      title: "1st Place Winner",
      event: "Blaze a Trail 2.0",
      award: "Precision Agriculture AI Challenge",
      year: "2025",
      highlight: true,
      projectRelation: "AI Crop Recommendation Engine",
    },
    {
      title: "Finalist",
      event: "TN Police Hackathon 2024",
      award: "State Police Innovation Finalist",
      year: "2024",
      highlight: false,
      projectRelation: "Cybersecurity & Law Enforcement Track",
    },
    {
      title: "6× Champion",
      event: "National-Level Technical Symposiums",
      award: "First Place in 6 National Competitions",
      highlight: true,
      projectRelation: "Algorithmic & Full-Stack Challenges",
    },
    {
      title: "Active Contender",
      event: "70+ Technical Symposia",
      award: "Competitive Technology Track Record",
      highlight: false,
      projectRelation: "Continuous Competitive Problem Solving",
    },
  ] as Achievement[],

  education: {
    degree: "B.Tech — Artificial Intelligence and Data Science",
    institution: "St. Joseph's Institute of Technology",
    location: "Chennai, India",
    period: "2023 – 2027",
    cgpa: "8.2 / 10",
    arrears: "No Arrears",
    highlights: [
      "Rigorous foundations in Machine Learning, Deep Learning, Probability, and Algorithms",
      "Hands-on architectural focus on Large Language Models, Multi-Agent Systems, and Full-Stack Engineering",
      "Consistent academic record with 8.2 CGPA and zero academic backlogs",
    ],
  },

  certifications: [
    {
      name: "Meta Front-End Developer",
      issuer: "Meta",
      platform: "Coursera",
    },
    {
      name: "React: The Complete Guide",
      issuer: "Academind",
      platform: "Udemy",
    },
    {
      name: "Google Cybersecurity Certificate",
      issuer: "Google",
      platform: "Coursera",
    },
    {
      name: "Figma UI/UX Design Essentials",
      issuer: "Daniel Walter Scott",
      platform: "Udemy",
    },
  ] as Certification[],

  skillCategories: [
    {
      category: "AI & Data Science",
      skills: [
        { name: "Machine Learning", tag: "Core" },
        { name: "Deep Learning", tag: "Core" },
        { name: "Large Language Models (LLMs)", tag: "Specialised" },
        { name: "Multi-Agent Systems", tag: "Architecture" },
        { name: "Agent Orchestration", tag: "Architecture" },
        { name: "Fine-Tuning (LoRA)", tag: "Applied" },
        { name: "Scikit-Learn", tag: "ML" },
        { name: "Pandas & NumPy", tag: "Data" },
        { name: "Data Preprocessing", tag: "Data" },
        { name: "Feature Engineering", tag: "Data" },
        { name: "OCR", tag: "Vision" },
        { name: "Model Evaluation", tag: "Analysis" },
      ],
    },
    {
      category: "Languages",
      skills: [
        { name: "Python", tag: "Primary" },
        { name: "JavaScript", tag: "Core" },
        { name: "TypeScript", tag: "Core" },
        { name: "Go", tag: "Systems" },
        { name: "Swift", tag: "Native" },
        { name: "C++", tag: "Systems" },
        { name: "SQL", tag: "Data" },
        { name: "HTML5 & CSS3", tag: "Web" },
      ],
    },
    {
      category: "Open Source",
      skills: [
        { name: "Git & GitHub", tag: "Core" },
        { name: "Pull Requests", tag: "Showcase" },
        { name: "Upstream Contributions", tag: "Verified" },
        { name: "Code Review", tag: "Practice" },
        { name: "Bug Fixing", tag: "Engineering" },
        { name: "Regression Testing", tag: "QA" },
        { name: "Documentation", tag: "Docs" },
        { name: "Cross-Platform Compatibility", tag: "Systems" },
        { name: "CI/CD Workflows", tag: "DevOps" },
        { name: "CVE Fixes", tag: "Security" },
      ],
    },
    {
      category: "Software Development",
      skills: [
        { name: "React.js", tag: "Frontend" },
        { name: "Next.js", tag: "Full-Stack" },
        { name: "Node.js", tag: "Backend" },
        { name: "Express.js", tag: "Backend" },
        { name: "FastAPI", tag: "APIs" },
        { name: "REST APIs", tag: "Architecture" },
        { name: "Tailwind CSS", tag: "Styling" },
        { name: "Responsive Design", tag: "UI/UX" },
        { name: "State Management", tag: "Frontend" },
        { name: "ERP Development", tag: "Enterprise" },
        { name: "Web Scraping", tag: "Automation" },
      ],
    },
    {
      category: "Databases",
      skills: [
        { name: "PostgreSQL", tag: "Relational" },
        { name: "MySQL", tag: "Relational" },
        { name: "SQLite", tag: "Embedded" },
        { name: "MongoDB", tag: "NoSQL" },
      ],
    },
    {
      category: "Tools & Platforms",
      skills: [
        { name: "VS Code", tag: "IDE" },
        { name: "Postman", tag: "API Testing" },
        { name: "Docker", tag: "Containers" },
        { name: "Linux", tag: "OS" },
        { name: "Vercel", tag: "Cloud" },
        { name: "Figma", tag: "UI/UX" },
        { name: "Git CLI", tag: "CLI" },
        { name: "GitHub Actions", tag: "CI/CD" },
        { name: "AWS", tag: "Cloud" },
      ],
    },

  ] as SkillCategory[],
};
