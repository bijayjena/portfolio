import { Trophy, Briefcase, Cpu, Rocket, Gamepad2, LucideIcon } from "lucide-react";
import { profileData } from "@/data/profileData";
import syllogistekCertificate from "@/assets/syllogistek-certificate.png";
import squbixLogo from "@/assets/squbix_logo.jpg";
import squbixInternCertificate from "@/assets/squbix-intern-certificate.png";
import sqbDiwali22 from "@/assets/sqbdiwali22.jpeg";
import augastamImage from "@/assets/augastam.png";
import squmedImage from "@/assets/squmed.jpg";

export interface Experience {
    title: string;
    company: string;
    location: string;
    period: string;
    startDate: string;
    endDate?: string;
    level: number;
    description: string;
    achievements: string[];
    color: string;
    icon: LucideIcon;
    customImage?: string;
    certificateImage?: string;
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
        color: "from-green-500 to-emerald-500",
        icon: Gamepad2,
        customImage:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbXuXVi-jpQ9ErAEwhoXOdszcd0oYlwA74uVgFBEF74tkCd-K9S4NCxvHnM-w&s&ec=121516174",
        certificateImage: syllogistekCertificate,
    },
    {
        title: profileData.experience[0].role,
        company: profileData.experience[0].company,
        location: profileData.experience[0].location,
        period: profileData.experience[0].duration,
        startDate: profileData.experience[0].startDate,
        endDate: profileData.experience[0].endDate,
        level: 1,
        description: profileData.experience[0].summary,
        achievements: profileData.experience[0].responsibilities,
        color: "from-sky-500 to-blue-500",
        icon: Rocket,
        customImage: squbixLogo,
        certificateImage: squbixInternCertificate,
    },
    {
        title: profileData.experience[1].role,
        company: profileData.experience[1].company,
        location: profileData.experience[1].location,
        period: profileData.experience[1].duration,
        startDate: profileData.experience[1].startDate,
        endDate: profileData.experience[1].endDate,
        level: 2,
        description: profileData.experience[1].summary,
        achievements: profileData.experience[1].responsibilities,
        color: "from-orange-500 to-amber-500",
        icon: Briefcase,
        customImage: squbixLogo,
        certificateImage: sqbDiwali22,
    },
    {
        title: profileData.experience[2].role,
        company: profileData.experience[2].company,
        location: profileData.experience[2].location,
        period: profileData.experience[2].duration,
        startDate: profileData.experience[2].startDate,
        endDate: profileData.experience[2].endDate,
        level: 3,
        description: profileData.experience[2].summary,
        achievements: profileData.experience[2].responsibilities,
        color: "from-cyan-500 to-blue-500",
        icon: Cpu,
        customImage: squbixLogo,
        certificateImage: augastamImage,
    },
    {
        title: profileData.experience[3].role,
        company: profileData.experience[3].company,
        location: profileData.experience[3].location,
        period: profileData.experience[3].duration,
        startDate: profileData.experience[3].startDate,
        endDate: undefined,
        level: 4,
        highlight: true,
        description: profileData.experience[3].summary,
        achievements: profileData.experience[3].responsibilities,
        color: "from-emerald-500 to-teal-500",
        icon: Trophy,
        customImage: squbixLogo,
        certificateImage: squmedImage,
    },
];

export const calculateTotalExperience = (): number => {
    const now = new Date();
    let totalMonths = 0;

    experiences.forEach((exp) => {
        const start = new Date(exp.startDate);
        const end = exp.endDate ? new Date(exp.endDate) : now;
        const months =
            (end.getFullYear() - start.getFullYear()) * 12 +
            (end.getMonth() - start.getMonth());
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
        const months =
            (end.getFullYear() - start.getFullYear()) * 12 +
            (end.getMonth() - start.getMonth());
        totalMonths += Math.max(0, months + 1);
    });

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    if (months === 0) {
        return `${years} Years`;
    }

    return `${years} Years and ${months} Month${months > 1 ? "s" : ""}`;
};
