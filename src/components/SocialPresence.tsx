import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection, FadeIn } from "./AnimatedSection";
import { profileData } from "@/data/profileData";
import profilePhoto from "@/assets/profile-photo.jpg";
import linkedinBg from "@/assets/linkedinbg.jpg";
import { Building2, ExternalLink, Linkedin, MapPin } from "lucide-react";

const SocialPresence = () => {
  return (
    <AnimatedSection className="py-12 md:py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              LinkedIn <span className="gradient-text">Presence</span>
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              A profile-style preview of my LinkedIn presence, linked directly to the public profile.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <Card className="overflow-hidden border-primary/10 bg-card/70 backdrop-blur-sm shadow-xl">
            <div
              className="relative h-44 bg-cover bg-center"
              style={{ backgroundImage: `url(${linkedinBg})` }}
            >
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(148,163,184,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.18)_1px,transparent_1px)] [background-size:24px_24px]" />
              <div className="absolute bottom-0 left-6 translate-y-1/2">
                <div className="h-32 w-32 rounded-full border-4 border-card shadow-2xl overflow-hidden bg-muted">
                  <img src={profilePhoto} alt="Bijay Jena" className="h-full w-full object-cover" />
                </div>
              </div>
            </div>

            <div className="pt-20 px-6 pb-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-3xl font-bold">Bijay Jena</h3>
                    <Linkedin className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-base text-foreground/90">
                    Associate Team Lead | Full Stack Engineer | AI Systems Builder
                  </p>
                  <p className="text-base text-muted-foreground mt-1">
                    Healthcare + Fintech | React, React Native, Node.js, NestJS
                  </p>
                </div>
                <Badge variant="secondary" className="shrink-0">
                  LinkedIn
                </Badge>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{profileData.personalInfo.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-primary" />
                  <span>Squbix Digital</span>
                </div>
              </div>

              <div className="rounded-xl border border-border/60 bg-background/40 p-4 mb-6">
                <p className="text-sm text-muted-foreground">
                  LinkedIn does not provide a full native profile embed for personal profiles, so this section uses a polished on-site preview linked to the public profile.
                </p>
              </div>

              <Button asChild className="w-full sm:w-auto">
                <a
                  href={profileData.personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <Linkedin className="w-4 h-4" />
                  View LinkedIn Profile
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </Card>
        </FadeIn>
      </div>
    </AnimatedSection>
  );
};

export default SocialPresence;
