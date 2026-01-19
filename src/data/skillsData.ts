
export interface Skill {
  name: string;
  icon: string;
  category: "Frontend" | "Backend" | "AI & LLMs" | "DevOps & Tools" | "Architecture" | "Data & Analytics";
  analysis: string;
  relatedProjects: string[];
}

export const skillsData: Skill[] = [
  // Frontend
  {
    name: "React.js",
    icon: "https://cdn.simpleicons.org/react",
    category: "Frontend",
    analysis: "Used extensively in the HIS Billing Module to build a complex, interactive UI. Leveraged for state management and component reusability across the portfolio and dashboard applications.",
    relatedProjects: ["Hospital Information System", "Portfolio", "Sqwallet"]
  },
  {
    name: "React Native",
    icon: "https://cdn.simpleicons.org/react",
    category: "Frontend",
    analysis: "Core framework for developing Sqwallet, Chasi, and MediClub mobile applications. Implemented cross-platform logic and native module bridging for the Offline Messaging System.",
    relatedProjects: ["Sqwallet", "Chasi & MediClub Apps", "Offline Messaging System"]
  },
  {
    name: "Redux Toolkit",
    icon: "https://cdn.simpleicons.org/redux",
    category: "Frontend",
    analysis: "Implemented in HIS for predictable state management of large-scale billing data, ensuring data consistency and optimized re-renders.",
    relatedProjects: ["Hospital Information System"]
  },
  {
    name: "Expo",
    icon: "https://cdn.simpleicons.org/expo",
    category: "Frontend",
    analysis: "Streamlined the development and deployment process for Chasi and MediClub, enabling rapid iteration and over-the-air updates.",
    relatedProjects: ["Chasi & MediClub Apps"]
  },
  {
    name: "Material UI",
    icon: "https://cdn.simpleicons.org/mui",
    category: "Frontend",
    analysis: " utilized for quick UI prototyping and consistent design systems in internal tools and dashboard interfaces.",
    relatedProjects: ["Hospital Information System"]
  },
  {
    name: "TypeScript",
    icon: "https://cdn.simpleicons.org/typescript",
    category: "Frontend",
    analysis: "Adopted for type safety and better developer experience across recent React and Node.js projects, reducing runtime errors.",
    relatedProjects: ["Portfolio", "Hospital Information System"]
  },
  {
    name: "Tailwind CSS",
    icon: "https://cdn.simpleicons.org/tailwindcss",
    category: "Frontend",
    analysis: "Used for rapid styling and responsive design in the Portfolio website, enabling a custom and modern aesthetic.",
    relatedProjects: ["Portfolio"]
  },

  // Backend
  {
    name: "Node.js",
    icon: "https://cdn.simpleicons.org/nodedotjs",
    category: "Backend",
    analysis: "Powered the backend of the Patient-Doctor Application, handling API requests, authentication, and business logic efficiently.",
    relatedProjects: ["Patient-Doctor Application", "Medbot"]
  },
  {
    name: "Express.js",
    icon: "https://cdn.simpleicons.org/express",
    category: "Backend",
    analysis: "Framework of choice for building RESTful APIs in the Patient-Doctor system, middleware management, and routing.",
    relatedProjects: ["Patient-Doctor Application"]
  },
  {
    name: "Firebase",
    icon: "https://cdn.simpleicons.org/firebase",
    category: "Backend",
    analysis: "Utilized for real-time databases and authentication in Chasi, MediClub, and the Patient-Doctor App, ensuring instant data sync.",
    relatedProjects: ["Patient-Doctor Application", "Chasi & MediClub Apps"]
  },
  {
    name: "MongoDB",
    icon: "https://cdn.simpleicons.org/mongodb",
    category: "Backend",
    analysis: "NoSQL database used for storing flexible and scalable data for the Patient-Doctor logs and records.",
    relatedProjects: ["Patient-Doctor Application"]
  },
  
  // AI & LLMs
  {
    name: "OpenAI API",
    icon: "https://cdn.simpleicons.org/openai",
    category: "AI & LLMs",
    analysis: "Integrated into Medbot for natural language understanding and generating medical responses.",
    relatedProjects: ["Medbot - AI Medical Assistant"]
  },
   {
    name: "Python",
    icon: "https://cdn.simpleicons.org/python",
    category: "Data & Analytics", // Moving Python to Data/AI context
    analysis: "Used for scripting data analysis tasks and implementing AI model logic for Medbot backend services.",
    relatedProjects: ["Medbot - AI Medical Assistant", "Data Analytics Scripts"]
  },

  // DevOps & Tools
  {
    name: "Git",
    icon: "https://cdn.simpleicons.org/git",
    category: "DevOps & Tools",
    analysis: "Essential for version control across all projects, managing branches, and collaboration.",
    relatedProjects: ["All Projects"]
  },
  {
    name: "Postman",
    icon: "https://cdn.simpleicons.org/postman",
    category: "DevOps & Tools",
    analysis: "Used for testing and documenting REST APIs for the HIS and Patient-Doctor applications.",
    relatedProjects: ["Patient-Doctor Application", "HIS"]
  },
  {
    name: "Figma",
    icon: "https://cdn.simpleicons.org/figma",
    category: "DevOps & Tools",
    analysis: "Designed UI/UX mockups for the Portfolio and Mobile Apps before implementation.",
    relatedProjects: ["Portfolio", "Sqwallet"]
  },

  // Architecture
  {
    name: "Micro-frontend",
    icon: "https://cdn.simpleicons.org/webpack", // using webpack icon for federation/micro-frontend
    category: "Architecture",
    analysis: "Architectural pattern explored for scaling large web applications like the HIS system.",
    relatedProjects: ["Hospital Information System"]
  },
  
  // Data
  {
    name: "SQL",
    icon: "https://cdn.simpleicons.org/mysql",
    category: "Data & Analytics",
    analysis: "Querying relational data for meaningful insights and reporting in various backend modules.",
    relatedProjects: ["Hospital Information System"]
  }
];
