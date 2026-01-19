import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { AnimatedSection, FadeIn, StaggerContainer, StaggerItem } from "./AnimatedSection";
import ScrollingTechIcons from "./ScrollingTechIcons";
import { skillsData } from "@/data/skillsData";

const Skills = () => {
  // Group skills by category
  const categories = Array.from(new Set(skillsData.map((s) => s.category)));

  return (
    <AnimatedSection className="py-12 md:py-24 px-4 bg-background/50">
      <div className="container mx-auto max-w-7xl">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Technical <span className="gradient-text">Excellence</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A comprehensive toolset leveraged to build scalable, high-performance applications.
            </p>
          </div>
        </FadeIn>

        {/* Scrolling Icons Section */}
        <FadeIn>
          <div className="mb-20">
            <ScrollingTechIcons />
          </div>
        </FadeIn>

        {/* Detailed Analysis Section */}
        <div className="space-y-12">
          <FadeIn>
            <h3 className="text-2xl font-bold mb-8 text-center md:text-left border-l-4 border-primary pl-4">
              Skill Application & Project Analysis
            </h3>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            {categories.map((category, index) => {
              const categorySkills = skillsData.filter((s) => s.category === category);

              return (
                <StaggerItem key={category} className="h-full">
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    <Card className="p-6 h-full transition-all duration-300 border-t-4 border-t-primary/20 relative overflow-hidden group hover:shadow-2xl before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/10 before:via-secondary/5 before:to-transparent before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-300">
                      <div className="absolute -inset-px bg-gradient-to-r from-primary/0 via-primary/10 to-secondary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                      <div className="relative z-10">
                      <h4 className="text-xl font-bold mb-6 text-primary flex items-center gap-2 bg-clip-text">
                        {category}
                      </h4>

                      <div className="space-y-6">
                        {categorySkills.map((skill, i) => (
                          <div key={i} className="relative pl-4 border-l-2 border-border hover:border-primary transition-all duration-300 rounded-lg hover:bg-card/50 p-3 -ml-3">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-secondary" />
                              <h5 className="font-semibold text-foreground group-hover:text-primary transition-colors">{skill.name}</h5>
                            </div>

                            <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                              {skill.analysis}
                            </p>

                            <div className="flex flex-wrap gap-2">
                              {skill.relatedProjects.map((project, idx) => (
                                <Badge
                                  key={idx}
                                  variant="secondary"
                                  className="text-[10px] px-2 py-0.5 hover:scale-105 transition-transform"
                                >
                                  {project}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      </div>
                    </Card>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Skills;

