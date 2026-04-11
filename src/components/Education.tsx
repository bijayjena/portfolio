import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedSection, FadeIn, StaggerContainer, StaggerItem } from "./AnimatedSection";
import { profileData } from "@/data/profileData";

const education = [
  {
    degree: profileData.education[0].degree,
    field: "Computer Science & Engineering",
    institution: profileData.education[0].institution,
    period: profileData.education[0].year,
  },
  {
    degree: profileData.education[1].details,
    field: "CBSE",
    institution: profileData.education[1].institution,
    period: profileData.education[1].years,
  },
];

const training = [
  {
    title: profileData.trainingInternships[0].program,
    description: profileData.trainingInternships[0].focus.join(", "),
    organization: profileData.trainingInternships[0].organization,
    period: profileData.trainingInternships[0].duration,
  },
];

const Education = () => {
  return (
    <AnimatedSection className="py-12 md:py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <FadeIn>
          <h2 className="text-4xl font-bold mb-12 text-center">
            Education & <span className="gradient-text">Credentials</span>
          </h2>
        </FadeIn>

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
                <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <h4 className="text-lg font-bold">{edu.degree}</h4>
                        <p className="text-primary">{edu.field}</p>
                        <p className="text-sm text-muted-foreground">{edu.institution}</p>
                      </div>
                      <Badge variant="secondary" className="w-fit">
                        {edu.period}
                      </Badge>
                    </div>
                  </Card>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        <div className="mb-12">
          <FadeIn delay={0.2}>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Award className="w-6 h-6 text-primary" />
              Certifications
            </h3>
          </FadeIn>
          <StaggerContainer className="grid md:grid-cols-2 gap-4">
            {profileData.certifications.map((cert, index) => (
              <StaggerItem key={index}>
                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <Card className="p-5 hover:shadow-lg transition-shadow h-full">
                    <h4 className="font-bold mb-1">{cert.title}</h4>
                    <p className="text-sm text-primary">{cert.issuer}</p>
                    <p className="text-sm text-muted-foreground mt-1">{cert.period}</p>
                  </Card>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        <div>
          <FadeIn delay={0.3}>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Award className="w-6 h-6 text-primary" />
              Training
            </h3>
          </FadeIn>
          <StaggerContainer className="space-y-4">
            {training.map((item, index) => (
              <StaggerItem key={index}>
                <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                      <div>
                        <h4 className="text-lg font-bold">{item.title}</h4>
                        <p className="text-muted-foreground">{item.description}</p>
                        <p className="text-sm text-primary mt-1">{item.organization}</p>
                      </div>
                      <Badge variant="outline" className="w-fit">
                        {item.period}
                      </Badge>
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
