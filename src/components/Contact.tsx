import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Linkedin, Github } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedSection, FadeIn, StaggerContainer, StaggerItem } from "./AnimatedSection";

const contactLinks = [
  {
    href: "mailto:bijayjenaofficial@gmail.com",
    icon: Mail,
    label: "Email",
    value: "bijayjenaofficial@gmail.com",
  },
  {
    href: "tel:+916371303113",
    icon: Phone,
    label: "Phone",
    value: "+91-6371303113",
  },
  {
    href: "https://linkedin.com/in/bijayjena",
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/bijayjena",
    external: true,
  },
  {
    href: "https://github.com/bijayjena",
    icon: Github,
    label: "GitHub",
    value: "github.com/bijayjena",
    external: true,
  },
];

const Contact = () => {
  return (
    <AnimatedSection className="py-12 md:py-20 px-4 bg-gradient-subtle">
      <div className="container mx-auto max-w-4xl">
        <FadeIn>
          <h2 className="text-4xl font-bold mb-8 text-center">
            Get in <span className="gradient-text">Touch</span>
          </h2>
        </FadeIn>
        
        <FadeIn delay={0.1}>
          <Card className="p-8">
            <p className="text-center text-lg text-muted-foreground mb-8">
              I'm always open to discussing new opportunities, collaborations, or just having a chat about technology and innovation.
            </p>
            
            <StaggerContainer className="grid md:grid-cols-2 gap-6">
              {contactLinks.map((contact, index) => (
                <StaggerItem key={index}>
                  <motion.a
                    href={contact.href}
                    target={contact.external ? "_blank" : undefined}
                    rel={contact.external ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-3 p-4 rounded-lg bg-card hover:bg-primary/10 transition-colors border border-border"
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <contact.icon className="w-6 h-6 text-primary" />
                    <div>
                      <p className="font-semibold">{contact.label}</p>
                      <p className="text-sm text-muted-foreground">{contact.value}</p>
                    </div>
                  </motion.a>
                </StaggerItem>
              ))}
            </StaggerContainer>
            
            <motion.div 
              className="mt-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Button variant="hero" size="lg" asChild>
                <a href="mailto:bijayjenaofficial@gmail.com">Send Message</a>
              </Button>
            </motion.div>
          </Card>
        </FadeIn>
      </div>
    </AnimatedSection>
  );
};

export default Contact;
