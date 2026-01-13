import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { AnimatedSection, FadeIn, StaggerContainer, StaggerItem } from "./AnimatedSection";

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React.js", level: 95 },
      { name: "React Native", level: 85 },
      { name: "Redux Toolkit", level: 90 },
      { name: "Expo", level: 80 },
      { name: "Material UI", level: 85 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express", level: 80 },
      { name: "Firebase", level: 90 },
      { name: "MongoDB", level: 75 },
      { name: "REST APIs", level: 90 },
    ],
  },
  {
    title: "AI & LLMs",
    skills: [
      { name: "Generative AI", level: 85 },
      { name: "LLMs", level: 80 },
      { name: "Prompt Engineering", level: 90 },
      { name: "Speech Transcription", level: 75 },
      { name: "NLP Chatbots", level: 80 },
      { name: "OpenAI APIs", level: 85 },
    ],
  },
  {
    title: "DevOps & Tools",
    skills: [
      { name: "Git", level: 90 },
      { name: "Postman", level: 85 },
      { name: "VS Code", level: 95 },
      { name: "Figma", level: 70 },
    ],
  },
  {
    title: "Architecture",
    skills: [
      { name: "HLD/LLD", level: 80 },
      { name: "Monorepo/Multi-repo", level: 85 },
      { name: "Module Federation", level: 80 },
      { name: "Micro-frontend", level: 85 },
    ],
  },
  {
    title: "Data & Analytics",
    skills: [
      { name: "Python", level: 75 },
      { name: "SQL", level: 80 },
      { name: "Power BI", level: 70 },
      { name: "Excel", level: 85 },
      { name: "Spark", level: 65 },
      { name: "Hadoop", level: 60 },
      { name: "Snowflake", level: 65 },
      { name: "Hive", level: 60 },
    ],
  },
];

const Skills = () => {
  const [animatedSkills, setAnimatedSkills] = useState<{ [key: string]: number }>({});
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          // Animate all skills progressively
          skillCategories.forEach((category, catIndex) => {
            category.skills.forEach((skill, skillIndex) => {
              const key = `${category.title}-${skill.name}`;
              const delay = catIndex * 100 + skillIndex * 50;
              setTimeout(() => {
                setAnimatedSkills((prev) => ({ ...prev, [key]: skill.level }));
              }, delay);
            });
          });
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <AnimatedSection className="py-12 md:py-20 px-4">
      <div className="container mx-auto max-w-6xl" ref={sectionRef as any}>
        <FadeIn>
          <h2 className="text-4xl font-bold mb-12 text-center">
            Technical <span className="gradient-text">Skills</span>
          </h2>
        </FadeIn>
        
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <StaggerItem key={index}>
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="p-6 hover:shadow-lg transition-all duration-300 h-full">
                  <h3 className="text-xl font-bold mb-4 text-primary">{category.title}</h3>
                  <div className="space-y-4">
                    {category.skills.map((skill, i) => {
                      const key = `${category.title}-${skill.name}`;
                      const animatedValue = animatedSkills[key] || 0;
                      
                      return (
                        <div key={i} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <Badge variant="secondary" className="text-xs">
                              {skill.name}
                            </Badge>
                            <span className="text-xs text-muted-foreground font-medium">
                              {animatedValue}%
                            </span>
                          </div>
                          <Progress 
                            value={animatedValue} 
                            className="h-2 transition-all duration-700"
                          />
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </AnimatedSection>
  );
};

export default Skills;
