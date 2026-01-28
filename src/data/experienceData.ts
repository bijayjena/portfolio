import { Briefcase, Trophy, Star, Gamepad2, Rocket, Code } from "lucide-react";

export interface Experience {
    title: string;
    company: string;
    location: string;
    period: string; // Display string
    startDate: string; // YYYY-MM-DD
    endDate?: string; // YYYY-MM-DD, undefined for Present
    level: number;
    description: string;
    achievements: string[];
    color: string;
    icon: any; // Lucide icon component
    highlight?: boolean;
}

export const experiences: Experience[] = [
    {
        title: "Intern",
        company: "Syllogistek Systems Private Ltd.",
        location: "Bhubaneswar",
        period: "Jun 2020 - Jul 2020",
        startDate: "2020-06-01",
        endDate: "2020-07-31",
        level: 1,
        description: "First exposure to professional software development.",
        achievements: [
            "Gained foundational experience in software development practices",
        ],
        color: "from-rose-500 to-pink-500",
        icon: Gamepad2,
    },
    {
        title: "Mobile Application Developer (Intern)",
        company: "Squbix Digital",
        location: "Bhubaneswar",
        period: "Jun 2022 - Jan 2023",
        startDate: "2022-06-01",
        endDate: "2023-01-31",
        level: 2,
        description: "Started my journey in web and React Native development.",
        achievements: [
            "Created the initial co2network.green static site using React",
            "Built React Native modules for offline messaging via Bluetooth and Wi-Fi",
            "Leveraged Android native APIs for innovative connectivity solutions",
        ],
        color: "from-sky-500 to-blue-500",
        icon: Code,
    },
    {
        title: "Software Developer",
        company: "Squbix Digital Private Limited",
        location: "Bhubaneswar",
        period: "Oct 2023 - Mar 2024",
        startDate: "2023-10-01",
        endDate: "2024-03-31",
        level: 3,
        description: "Transitioned to React Native development, building key products.",
        achievements: [
            "Built Sqwallet - a digital wallet app deployed in just 10 days",
            "Developed Chasi and MediClub - cross-platform apps using Expo and Firebase",
            "Created Medbot - an AI chatbot for doctors with NLP integration",
        ],
        color: "from-amber-500 to-orange-500",
        icon: Rocket,
    },
    {
        title: "Senior Software Engineer",
        company: "Squbix Digital Private Limited",
        location: "Bhubaneswar",
        period: "Apr 2024 - Mar 2025",
        startDate: "2024-04-01",
        endDate: "2025-03-31",
        level: 4,
        description: "Took over critical HIS development for Akhil Systems Pvt Ltd.",
        achievements: [
            "Led development of 'Augastam' - a next-generation Hospital Information System",
            "Built Form Builder, Webpart Builder, and highly scalable component architecture",
            "Recognized by PM Abdul Kalam to lead a 5-member team",
        ],
        color: "from-emerald-500 to-teal-500",
        icon: Star,
    },
    {
        title: "Associate Team Lead & Manager",
        company: "Squbix Digital Private Limited",
        location: "Bhubaneswar",
        period: "Apr 2025 - Present",
        startDate: "2025-04-01",
        endDate: undefined,
        level: 5,
        highlight: true,
        description: "Leading a team of 8 across backend, frontend, app dev, UI/UX, and AI engineering.",
        achievements: [
            "Overseeing and building flagship products with hands-on AI integration",
            "Managing web app development including admin tools, RBAC, dashboards",
            "Driving product innovation with strategic AI implementation",
        ],
        color: "from-violet-500 to-purple-500",
        icon: Trophy,
    },
];

export const calculateTotalExperience = (): number => {
    const now = new Date();
    let totalMonths = 0;

    experiences.forEach((exp) => {
        const start = new Date(exp.startDate);
        const end = exp.endDate ? new Date(exp.endDate) : now;

        const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
        totalMonths += Math.max(0, months + 1);
    });

    return Number((totalMonths / 12).toFixed(1));
};

export const getExperienceDurationString = (): string => {
    const now = new Date();
    let totalMonths = 0;

    experiences.forEach((exp) => {
        const start = new Date(exp.startDate);
        const end = exp.endDate ? new Date(exp.endDate) : now;

        const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
        totalMonths += Math.max(0, months + 1);
    });

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    if (months === 0) {
        return `${years} Years`;
    }

    return `${years} Years and ${months} Month${months > 1 ? 's' : ''}`;
};
