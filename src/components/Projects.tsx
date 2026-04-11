import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
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
import { profileData } from "@/data/profileData";

interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  repo?: string;
  fullDescription: string;
}

const projects: Project[] = profileData.projects.map((project) => ({
  title: project.name,
  description: project.description,
  tags: project.tags,
  link: project.link,
  repo: project.repo,
  fullDescription: project.fullDescription,
}));

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
                    <div className="flex items-center gap-2">
                      {project.repo && (
                        <Github className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      )}
                      {project.link && (
                        <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      )}
                    </div>
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
              {(selectedProject.link || selectedProject.repo) && (
                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  {selectedProject.link && (
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
                  )}
                  {selectedProject.repo && (
                    <Button asChild variant="outline" className="w-full sm:w-auto">
                      <a 
                        href={selectedProject.repo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Github className="w-4 h-4" />
                        View Code
                      </a>
                    </Button>
                  )}
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
