import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Rocket, Brain, Users, Target } from "lucide-react";
import { AnimatedSection, FadeIn, StaggerContainer, StaggerItem } from "./AnimatedSection";

const highlights = [
  { icon: Users, label: "Team of 8", desc: "Backend, Frontend, App, UI/UX, AI" },
  { icon: Rocket, label: "2+ Years", desc: "At Squbix Digital" },
  { icon: Brain, label: "AI Integration", desc: "Healthcare & Products" },
  { icon: Target, label: "Full-Stack", desc: "Web, Mobile & Backend" },
];

const About = () => {
  return (
    <AnimatedSection className="py-12 md:py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <FadeIn>
          <h2 className="text-4xl font-bold mb-8 text-center">
            About <span className="gradient-text">Me</span>
          </h2>
        </FadeIn>
        
        {/* Highlight cards */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {highlights.map((item, i) => (
            <StaggerItem key={i}>
              <Card className="p-4 text-center hover:border-primary/50 transition-colors h-full">
                <item.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                <p className="font-bold text-sm">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
        
        <FadeIn delay={0.2}>
          <Card className="p-8">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              As a <span className="text-foreground font-semibold">Software Developer at Squbix Digital</span>, I'm deeply immersed in the world of technology and software development. My journey began with web and React Native development during an enriching internship, leading me to my current role as <span className="text-foreground font-semibold">Associate Team Lead & Manager</span> where I thrive on creating innovative solutions and pushing boundaries.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              From building foundational products like <Badge variant="outline" className="mx-1">Sqwallet</Badge> <Badge variant="outline" className="mx-1">Chasi</Badge> <Badge variant="outline" className="mx-1">MediClub</Badge> <Badge variant="outline" className="mx-1">Medbot</Badge> to leading the development of <span className="text-foreground font-semibold">Augastam</span> – a next-gen Hospital Information System for major healthcare chains like Care Hospitals, Kalinga Hospitals, and EYE7 – I've grown from an intern to leading a team of 8 engineers.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              My multidisciplinary background in <span className="text-foreground font-semibold">Python, SQL, PowerBI, and Big Data</span> allows me to bring a unique perspective. My insatiable curiosity drives me to continually explore new tools and technologies, working towards my dream of becoming a versatile freelancer and successful business owner.
            </p>
            
            <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-border">
              <Badge>Generative AI</Badge>
              <Badge>LLMs</Badge>
              <Badge>Prompt Engineering</Badge>
              <Badge variant="secondary">Japanese (Elementary)</Badge>
            </div>
          </Card>
        </FadeIn>
      </div>
    </AnimatedSection>
  );
};

export default About;
