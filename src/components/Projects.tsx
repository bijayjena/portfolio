import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AnimatedSection, FadeIn, StaggerContainer, StaggerItem } from "./AnimatedSection";

interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  fullDescription: string;
}

const projects: Project[] = [
  {
    title: "Hospital Information System (HIS)",
    description: "Led development of a comprehensive billing module for HIS using React.js with focus on scalable architecture. Achieved 70-80% performance improvement through optimization.",
    tags: ["React.js", "Redux Toolkit", "Performance Optimization"],
    link: "https://his-dev.squbix.com",
    fullDescription: "Led the development of a comprehensive Hospital Information System (HIS) billing module using React.js. The project focused on creating a scalable architecture that could handle high volumes of patient data and transactions. Through careful optimization of rendering patterns and state management with Redux Toolkit, achieved a remarkable 70-80% performance improvement. The system streamlines hospital billing workflows, reduces manual errors, and provides real-time insights into financial operations.",
  },
  {
    title: "Patient-Doctor Application",
    description: "Full-stack application with CRUD operations, secure authentication, role-based access, and real-time medical records tracking using Node.js and Firebase.",
    tags: ["Node.js", "Firebase", "Authentication", "REST APIs"],
    fullDescription: "A comprehensive full-stack application designed to streamline the interaction between patients and healthcare providers. Features include complete CRUD operations for medical records, secure JWT-based authentication, and role-based access control ensuring data privacy. Built with Node.js backend and Firebase for real-time data synchronization, enabling instant updates to medical records across all connected devices.",
  },
  {
    title: "Medbot - AI Medical Assistant",
    description: "Intelligent AI chatbot for doctors enabling medical query handling through NLP integration, enhancing diagnostic capabilities.",
    tags: ["NLP", "AI Integration", "Healthcare"],
    link: "https://play.google.com/store/apps/details?id=com.squbix.medbot",
    fullDescription: "Medbot is an intelligent AI-powered chatbot designed specifically for healthcare professionals. It leverages advanced Natural Language Processing (NLP) to understand and respond to complex medical queries. The application assists doctors in their diagnostic process by providing quick access to medical knowledge, drug interactions, and symptom analysis. Built with a focus on accuracy and reliability in the healthcare domain.",
  },
  {
    title: "Sqwallet - Digital Wallet",
    description: "Rapid development and deployment of a digital wallet application within 10 days. Contributed to offline payment white paper implementation.",
    tags: ["React Native", "Payment Systems", "Rapid Development"],
    link: "https://play.google.com/store/apps/details?id=com.sqwallet",
    fullDescription: "Sqwallet is a feature-rich digital wallet application developed and deployed within an impressive 10-day timeline. The app supports various payment methods and includes innovative offline payment capabilities based on a proprietary white paper implementation. Built with React Native for cross-platform compatibility, ensuring a seamless user experience on both iOS and Android devices.",
  },
  {
    title: "Chasi & MediClub Apps",
    description: "Cross-platform mobile applications using Expo React Native and Firebase with real-time sync and responsive design.",
    tags: ["React Native", "Expo", "Firebase", "Real-time"],
    link: "https://play.google.com/store/apps/details?id=com.squbix.chasi",
    fullDescription: "Two complementary cross-platform mobile applications built with Expo React Native and Firebase. Chasi focuses on healthcare scheduling and coordination, while MediClub serves as a community platform for medical professionals. Both apps feature real-time data synchronization, push notifications, and responsive design that adapts seamlessly to various screen sizes. The apps demonstrate expertise in building production-ready mobile applications with modern technologies.\n\nMediClub: https://play.google.com/store/apps/details?id=com.squbix.mediclub\nChasi: https://play.google.com/store/apps/details?id=com.squbix.chasi",
  },
  {
    title: "Offline Messaging System",
    description: "Implemented offline messaging using Bluetooth and Wi-Fi modules in React Native with native API access for seamless communication.",
    tags: ["React Native", "Bluetooth", "Wi-Fi", "Native APIs"],
    link: "https://www.npmjs.com/package/react-native-bluetooth-message",
    fullDescription: "A groundbreaking offline messaging system implemented as a React Native package. This solution enables device-to-device communication using Bluetooth and Wi-Fi Direct protocols, allowing users to send messages without internet connectivity. The package provides native API access for both iOS and Android platforms, making it ideal for scenarios where traditional network connectivity is unavailable. Published on npm for the developer community to use and contribute.",
  },
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <AnimatedSection className="py-12 md:py-20 px-4 bg-gradient-subtle">
      <div className="container mx-auto max-w-6xl">
        <FadeIn>
          <h2 className="text-4xl font-bold mb-12 text-center">
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </FadeIn>
        
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <StaggerItem key={index}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Card 
                  className="p-6 hover:shadow-xl transition-all group cursor-pointer h-full"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    {project.link && (
                      <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    )}
                  </div>
                  
                  <p className="text-muted-foreground mb-4 text-sm">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  {selectedProject.title}
                </DialogTitle>
                <div className="flex flex-wrap gap-2 pt-2">
                  {selectedProject.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </DialogHeader>
              <DialogDescription className="text-base leading-relaxed whitespace-pre-line">
                {selectedProject.fullDescription}
              </DialogDescription>
              {selectedProject.link && (
                <div className="pt-4">
                  <Button asChild className="w-full sm:w-auto">
                    <a 
                      href={selectedProject.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Project
                    </a>
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </AnimatedSection>
  );
};

export default Projects;
