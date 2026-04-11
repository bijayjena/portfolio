import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Landmark, Smartphone, Stethoscope, Users, Workflow } from "lucide-react";
import { profileData } from "@/data/profileData";
import squmedHmis from "@/assets/squmed_hmis.jpg";
import vigilend from "@/assets/vigilend.jpg";
import augastamLogo from "@/assets/augastam_logo.png";

const caseStudies = [
  {
    title: "SquMed HMIS",
    summary:
      "Led delivery of an AI-powered clinic management system with advanced clinical workflows, full-stack architecture, and cross-functional execution.",
    impact: [
      "Delivered with a team of 8 in 5 months",
      "Built voice-to-EMR transcription with Whisper-style workflows",
      "Added OCR, DDI checks, and patient-specific dosage recommendations",
      "Used React.js, React Native, Node.js, Firebase, RBAC, and micro-frontends",
    ],
    icon: Stethoscope,
    image: squmedHmis,
    accent: "from-emerald-500 to-teal-500",
    badges: ["Healthcare SaaS", "AI", "React.js", "React Native", "Node.js"],
  },
  {
    title: "Vigilend",
    summary:
      "Worked as a Full Stack Engineer on a fintech AML compliance platform serving Australian regulatory workflows.",
    impact: [
      "Built for AUSTRAC Tranche 2 compliance use cases",
      "Used React.js, NestJS, PostgreSQL, Drizzle ORM, Dapr, Refine, and TanStack Query",
      "Contributed to secure risk-screening and compliance workflows",
      "Supported scalable backend services for transaction and screening data",
    ],
    icon: Landmark,
    image: vigilend,
    accent: "from-orange-500 to-amber-500",
    badges: ["Fintech", "NestJS", "PostgreSQL", "Dapr", "Compliance"],
  },
  {
    title: "Augastam HMIS",
    summary:
      "Improved performance and expanded clinical and billing capabilities across an enterprise HMIS platform.",
    impact: [
      "Reduced EMR load time by 53%, from 1.5s to 0.7s",
      "Led billing module development across tariff and payer workflows",
      "Built configurable print engine and split-view EMR layouts",
      "Architected unified Billing and OPD deployment using Nginx reverse proxy",
    ],
    icon: Brain,
    image: augastamLogo,
    accent: "from-cyan-500 to-blue-500",
    badges: ["EMR", "Billing", "Performance", "Nginx", "Healthcare"],
  },
  {
    title: "rn-bluetooth-connect",
    summary:
      "Built and published React Native Bluetooth tooling for offline fintech-style communication and payment flows.",
    impact: [
      "Published a reusable native module for peer-to-peer Bluetooth communication",
      "Improved UX by replacing QR-driven flow with direct pairing",
      "Worked across React Native, Android native, and AWS Lambda",
      "Applied in offline payments and connectivity-first use cases",
    ],
    icon: Smartphone,
    accent: "from-sky-500 to-blue-500",
    badges: ["React Native", "Bluetooth", "Android Native", "AWS Lambda"],
  },
];

const capabilityCards = [
  {
    title: "Leadership",
    description: "Leading a cross-functional team of 8 across frontend, backend, mobile, QA, design, and AI delivery.",
    icon: Users,
  },
  {
    title: "Architecture",
    description: "Working across HLD, LLD, micro-frontends, microservices, Dapr, and scalable frontend architecture.",
    icon: Workflow,
  },
  {
    title: "AI Delivery",
    description: "Applying AI in production through transcription, conversational EMR, OCR, document intelligence, and clinical decision support.",
    icon: Brain,
  },
];

const CaseStudiesSection = () => {
  return (
    <section className="py-12 md:py-20 px-4 bg-gradient-subtle">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-1">
            Selected Work
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Product <span className="gradient-text">Case Studies</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A snapshot of healthcare SaaS, fintech, AI integration, and performance-focused engineering work across the updated Squbix journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {caseStudies.map((study) => (
            <Card key={study.title} className="p-6 h-full bg-card/60 backdrop-blur-sm border-primary/10">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${study.accent} flex items-center justify-center mb-4 overflow-hidden`}>
                {study.image ? (
                  <img src={study.image} alt={`${study.title} logo`} className="w-full h-full object-cover" />
                ) : (
                  <study.icon className="w-6 h-6 text-white" />
                )}
              </div>
              <h3 className="text-xl font-bold mb-3">{study.title}</h3>
              <p className="text-muted-foreground mb-4">{study.summary}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {study.badges.map((badge) => (
                  <Badge key={badge} variant="outline">
                    {badge}
                  </Badge>
                ))}
              </div>
              <div className="space-y-2">
                {study.impact.map((item) => (
                  <div key={item} className="text-sm text-muted-foreground">
                    {item}
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {capabilityCards.map((item) => (
            <Card key={item.title} className="p-6 bg-card/50 backdrop-blur-sm border-primary/10">
              <item.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground">
            Focus areas: {profileData.personalInfo.tagline}
          </p>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
