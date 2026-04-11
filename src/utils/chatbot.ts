import { chatbotProfileContext, profileData } from "@/data/profileData";

export const PROFILE_CONTEXT = chatbotProfileContext;

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export const normalizeChatMessage = (message: string) =>
  message.toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, " ").trim();

export const PRESET_ANSWERS: Record<string, string> = {
  [normalizeChatMessage("What is Bijay's experience?")]:
    `Bijay has ${profileData.experience.length} roles of professional experience at Squbix Digital, progressing from Software Engineering Intern to Associate Team Lead & Manager. His work spans healthcare SaaS, fintech, React and React Native delivery, NestJS and Node.js backend systems, AI integrations, and engineering leadership.`,
  [normalizeChatMessage("Tell me about his projects")]:
    `Bijay's key projects include SquMed HMIS, an AI-powered clinic management system; Vigilend, a fintech AML compliance platform; Augastam HMIS, an enterprise hospital system; rn-bluetooth-connect for offline Bluetooth communication; Asset Record, a deployed asset-management web app; and Pet Care AI, an AI-focused mobile application.`,
  [normalizeChatMessage("What technologies does he use?")]:
    `Bijay primarily works with React.js, React Native, Node.js, NestJS, TypeScript, Redux Toolkit, RTK Query, TanStack Query, PostgreSQL, MongoDB, Firebase, Dapr, Docker, Nginx, and micro-frontend architecture. He also works across AI-assisted engineering tools, cloud platforms, and frontend performance optimization.`,
  [normalizeChatMessage("What is his current role?")]:
    `Bijay is currently an Associate Team Lead & Manager at Squbix Digital Pvt. Ltd. In this role, he leads a cross-functional team of 8 and works on healthcare SaaS and fintech platforms, including architecture design, AI feature delivery, and full-stack engineering.`,
  [normalizeChatMessage("What are his AI skills?")]:
    `Bijay's AI work includes LLM integration, Whisper-based speech-to-text, NLP chatbots, OCR with Tesseract.js, document intelligence, conversational EMR, DDI checks, dosage recommendation systems, and AI-assisted development using tools like Cursor, Claude, Amazon Q, OpenAI Codex, and GitHub Copilot.`,
};

export const getPresetAnswer = (message: string) => PRESET_ANSWERS[normalizeChatMessage(message)];

export const generateSystemPrompt = () => {
  return `${PROFILE_CONTEXT}

Remember: ONLY discuss Bijay Jena's professional profile. Redirect any off-topic questions back to his experience, skills, or projects.`;
};
