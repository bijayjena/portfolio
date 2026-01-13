import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedSection, FadeIn, StaggerContainer, StaggerItem } from "./AnimatedSection";

const education = [
  {
    degree: "Bachelor of Technology",
    field: "Computer Science",
    institution: "Silicon Institute of Technology (SIT), Bhubaneswar",
    period: "Aug 2019 - May 2023",
  },
  {
    degree: "12th Standard (I.Sc. +2 Science)",
    field: "Computer Science, Mathematics, Physics, Chemistry",
    institution: "Kendriya Vidyalaya No.1, Bhubaneswar (1st Shift)",
    period: "2015 - 2019",
  },
];

const certifications = [
  {
    title: "Oracle Cloud Infrastructure 2025 Certified Foundations Associate",
    issuer: "Oracle",
  },
  {
    title: "Scaler Edge Course",
    issuer: "Scaler",
  },
  {
    title: "Introduction to Programming Using Python",
    issuer: "Microsoft",
  },
  {
    title: "Problem Solving (Basic) Certificate",
    issuer: "HackerRank",
  },
  {
    title: "Python (Basic)",
    issuer: "HackerRank",
  },
];

const training = [
  {
    title: "AI-Powered Data Specialization",
    description: "Data Analysis, Data Engineering, Visualization, and Science",
    organization: "Futurense Technologies",
    period: "May–Sept 2023",
  },
];

const Education = () => {
  return (
    <AnimatedSection className="py-12 md:py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <FadeIn>
          <h2 className="text-4xl font-bold mb-12 text-center">
            Education & <span className="gradient-text">Certifications</span>
          </h2>
        </FadeIn>
        
        {/* Education */}
        <div className="mb-12">
          <FadeIn delay={0.1}>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-primary" />
              Education
            </h3>
          </FadeIn>
          <StaggerContainer className="space-y-4">
            {education.map((edu, index) => (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <h4 className="text-lg font-bold">{edu.degree}</h4>
                        <p className="text-primary">{edu.field}</p>
                        <p className="text-sm text-muted-foreground">{edu.institution}</p>
                      </div>
                      <Badge variant="secondary" className="w-fit">{edu.period}</Badge>
                    </div>
                  </Card>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
        
        {/* Certifications */}
        <div className="mb-12">
          <FadeIn delay={0.2}>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Award className="w-6 h-6 text-primary" />
              Certifications
            </h3>
          </FadeIn>
          <StaggerContainer className="grid md:grid-cols-2 gap-4">
            {certifications.map((cert, index) => (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="p-4 hover:shadow-lg hover:border-primary/30 transition-all h-full">
                    <h4 className="font-semibold text-sm mb-1">{cert.title}</h4>
                    <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                  </Card>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
        
        {/* Training */}
        <div>
          <FadeIn delay={0.3}>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary" />
              Training
            </h3>
          </FadeIn>
          <StaggerContainer className="space-y-4">
            {training.map((item, index) => (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                      <div>
                        <h4 className="text-lg font-bold">{item.title}</h4>
                        <p className="text-muted-foreground">{item.description}</p>
                        <p className="text-sm text-primary mt-1">{item.organization}</p>
                      </div>
                      <Badge variant="outline" className="w-fit">{item.period}</Badge>
                    </div>
                  </Card>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Education;
