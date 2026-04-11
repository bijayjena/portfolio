import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Rocket, Brain, Users, Target } from "lucide-react";
import { AnimatedSection, FadeIn, StaggerContainer, StaggerItem } from "./AnimatedSection";
import { getExperienceDurationString } from "@/data/experienceData";
import { profileData } from "@/data/profileData";

const About = () => {
  const experienceString = getExperienceDurationString();

  const highlights = [
    { icon: Users, label: "Team of 8", desc: "Cross-functional leadership" },
    { icon: Rocket, label: experienceString, desc: "End-to-end product delivery" },
    { icon: Brain, label: "AI in Production", desc: "Healthcare & fintech systems" },
    { icon: Target, label: "Senior Scope", desc: "Architecture to execution" },
  ];

  return (
    <AnimatedSection className="py-12 md:py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <FadeIn>
          <h2 className="text-4xl font-bold mb-8 text-center">
            About <span className="gradient-text">Me</span>
          </h2>
        </FadeIn>

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
              {profileData.objective}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              {profileData.professionalSummary[0]} {profileData.professionalSummary[1]}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              In my current role as <span className="text-foreground font-semibold">{profileData.experience[3].role}</span> at{" "}
              <span className="text-foreground font-semibold">{profileData.experience[3].company}</span>, I work across React,
              React Native, Node.js, NestJS, architecture design, and applied AI to deliver production systems in healthcare SaaS
              and fintech. My recent work includes SquMed HMIS, Vigilend, Augastam HMIS, and Bluetooth-based offline fintech tooling.
            </p>

            <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-border">
              <Badge>React.js</Badge>
              <Badge>React Native</Badge>
              <Badge>NestJS</Badge>
              <Badge>Node.js</Badge>
              <Badge>Micro-frontends</Badge>
              <Badge>Whisper</Badge>
              <Badge variant="secondary">System Design</Badge>
            </div>
          </Card>
        </FadeIn>
      </div>
    </AnimatedSection>
  );
};

export default About;
