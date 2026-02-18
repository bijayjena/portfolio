import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { MapPin, Briefcase } from "lucide-react";
import { experiences } from "@/data/experienceData";

// Experiences are now imported from centralized data source


const CareerJourney = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative py-20 overflow-hidden" ref={containerRef}>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/20 blur-[120px] rounded-full -z-10 opacity-20" />

      {/* Header */}
      <div className="container px-4 mx-auto text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="mb-4 px-4 py-1 border-primary/50 text-primary">
            XP Progression
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            My <span className="gradient-text">Career Quest</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From humble beginnings as an Intern to leading teams and architectural decisions.
            Follow the path of my professional evolution.
          </p>
        </motion.div>
      </div>

      {/* Timeline Container */}
      <div className="container max-w-4xl mx-auto px-4 relative">
        {/* Central Progress Line */}
        <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-1 bg-muted -translate-x-1/2 hidden md:block" />
        <motion.div
          style={{ height: lineHeight }}
          className="absolute left-4 md:left-1/2 top-4 w-1 bg-gradient-to-b from-primary via-purple-500 to-blue-500 -translate-x-1/2 hidden md:block origin-top"
        />

        {/* Mobile Line */}
        <div className="absolute left-8 top-4 bottom-4 w-0.5 bg-muted md:hidden" />

        {/* Experience Nodes */}
        <div className="space-y-12 md:space-y-24 relative">
          {experiences.map((exp, index) => (
            <TimelineNode key={index} experience={exp} index={index} />
          ))}
        </div>

        {/* Victory/Current Marker */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mt-12"
        >
          <div className="bg-gradient-to-br from-primary to-purple-600 p-1 rounded-full animate-pulse ring-4 ring-primary/20">
            <Badge className="px-6 py-2 bg-background/50 backdrop-blur-md text-foreground border-none text-lg">
              Current Level: {experiences[experiences.length - 1].title}
            </Badge>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const TimelineNode = ({ experience, index }: { experience: any; index: number }) => {
  const isEven = index % 2 === 0;
  const Icon = experience.icon;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >
      {/* Mobile Layout */}
      <div className="md:hidden flex gap-4">
        {/* Timeline Point/Icon */}
        <div className="flex flex-col items-center flex-shrink-0">
          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${experience.color} p-0.5 shadow-lg shadow-primary/20 transform rotate-3 transition-transform hover:rotate-0`}>
            <div className="w-full h-full bg-background rounded-2xl flex items-center justify-center border border-white/10 overflow-hidden">
              {experience.customImage ? (
                <img 
                  src={experience.customImage} 
                  alt={`${experience.title} icon`}
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <Icon className={`w-6 h-6 text-transparent bg-clip-text bg-gradient-to-br ${experience.color} fill-current`} />
              )}
            </div>
          </div>
          <div className="mt-2 bg-background/80 backdrop-blur px-2 py-0.5 rounded text-[10px] font-bold border border-primary/20 uppercase tracking-wider text-muted-foreground whitespace-nowrap">
            Lvl {experience.level}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <Card className={`p-6 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors border-primary/10 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10
            ${experience.highlight ? 'border-primary shadow-lg shadow-primary/20' : ''}
          `}>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className={`text-xs font-bold px-2 py-1 rounded bg-gradient-to-r ${experience.color} text-white`}>
                  {experience.period}
                </span>
                {experience.highlight && (
                  <span className="text-[10px] animate-pulse font-bold text-primary border border-primary rounded px-1">ACTIVE</span>
                )}
              </div>

              <h3 className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${experience.color}`}>
                {experience.title}
              </h3>

              <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
                <Briefcase className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{experience.company}</span>
              </div>

              <div className="flex items-center gap-1 text-xs text-muted-foreground/80">
                <MapPin className="w-3 h-3 flex-shrink-0" />
                {experience.location}
              </div>

              <p className="text-sm text-foreground/80 mt-3 border-l-2 border-primary/50 pl-3">
                {experience.description}
              </p>

              {/* Achievements */}
              <div className="mt-4 flex flex-wrap gap-2">
                {(isExpanded ? experience.achievements : experience.achievements.slice(0, 2)).map((ach: string, i: number) => (
                  <Badge key={i} variant="secondary" className="text-[10px] font-normal leading-tight h-auto py-1">
                    {ach}
                  </Badge>
                ))}
                {experience.achievements.length > 2 && (
                  <Badge 
                    variant="outline" 
                    className="text-[10px] cursor-pointer hover:bg-primary hover:text-primary-foreground transform transition-all active:scale-95"
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    {isExpanded ? 'Show less' : `+${experience.achievements.length - 2} more quests`}
                  </Badge>
                )}
              </div>
            </div>
          </Card>

          {/* Certificate Image (Mobile) */}
          {experience.certificateImage && (
            <div className="mt-4">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-muted/30 border border-white/10 cursor-pointer group/cert">
                    <img 
                      src={experience.certificateImage} 
                      alt={`${experience.company} certificate`}
                      className="w-full h-full object-cover transition-transform group-hover/cert:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute inset-0 bg-black/0 group-hover/cert:bg-black/10 transition-colors flex items-center justify-center">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover/cert:opacity-100 transition-opacity">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl w-full p-0 bg-transparent border-none">
                  <div className="relative">
                    <img 
                      src={experience.certificateImage} 
                      alt={`${experience.company} certificate - Full view`}
                      className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] gap-8 items-start">
        {/* Left Side */}
        <div className={`${isEven ? 'order-1' : 'order-3'}`}>
          {isEven ? (
            // Content on left
            <div className="text-right pr-8">
              <Card className={`p-6 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors border-primary/10 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10
                ${experience.highlight ? 'border-primary shadow-lg shadow-primary/20' : ''}
              `}>
                <div className="flex flex-col gap-2 items-end">
                  <div className="flex items-center gap-2 mb-1 flex-row-reverse">
                    <span className={`text-xs font-bold px-2 py-1 rounded bg-gradient-to-r ${experience.color} text-white`}>
                      {experience.period}
                    </span>
                    {experience.highlight && (
                      <span className="text-[10px] animate-pulse font-bold text-primary border border-primary rounded px-1">ACTIVE</span>
                    )}
                  </div>

                  <h3 className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${experience.color}`}>
                    {experience.title}
                  </h3>

                  <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground flex-row-reverse">
                    <Briefcase className="w-4 h-4" />
                    {experience.company}
                  </div>

                  <div className="flex items-center gap-1 text-xs text-muted-foreground/80 flex-row-reverse">
                    <MapPin className="w-3 h-3" />
                    {experience.location}
                  </div>

                  <p className="text-sm text-foreground/80 mt-3 border-r-2 border-primary/50 pr-3">
                    {experience.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2 justify-end">
                    {(isExpanded ? experience.achievements : experience.achievements.slice(0, 2)).map((ach: string, i: number) => (
                      <Badge key={i} variant="secondary" className="text-[10px] font-normal leading-tight h-auto py-1">
                        {ach}
                      </Badge>
                    ))}
                    {experience.achievements.length > 2 && (
                      <Badge 
                        variant="outline" 
                        className="text-[10px] cursor-pointer hover:bg-primary hover:text-primary-foreground transform transition-all active:scale-95"
                        onClick={() => setIsExpanded(!isExpanded)}
                      >
                        {isExpanded ? 'Show less' : `+${experience.achievements.length - 2} more quests`}
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          ) : (
            // Visual on left
            <div className="pl-8">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-muted/30 border border-white/10 hover:border-primary/20 transition-colors flex items-center justify-center">
                {experience.certificateImage ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="w-full h-full cursor-pointer group/cert relative">
                        <img 
                          src={experience.certificateImage} 
                          alt={`${experience.company} certificate`}
                          className="w-full h-full object-cover transition-transform group-hover/cert:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        <div className="absolute inset-0 bg-black/0 group-hover/cert:bg-black/10 transition-colors flex items-center justify-center">
                          <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover/cert:opacity-100 transition-opacity">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl w-full p-0 bg-transparent border-none">
                      <div className="relative">
                        <img 
                          src={experience.certificateImage} 
                          alt={`${experience.company} certificate - Full view`}
                          className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                ) : (
                  <>
                    <div className={`absolute inset-0 bg-gradient-to-br ${experience.color} opacity-5 hover:opacity-10 transition-opacity`} />
                    <Icon className={`w-16 h-16 opacity-20 hover:opacity-30 transition-opacity bg-clip-text text-transparent bg-gradient-to-br ${experience.color} fill-current`} />
                    <div className="absolute inset-0 bg-grid-white/[0.05]" />
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Center - Timeline Point */}
        <div className="order-2 flex flex-col items-center justify-start pt-2">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${experience.color} p-0.5 shadow-lg shadow-primary/20 transform rotate-3 transition-transform hover:rotate-0`}>
            <div className="w-full h-full bg-background rounded-2xl flex items-center justify-center border border-white/10 overflow-hidden">
              {experience.customImage ? (
                <img 
                  src={experience.customImage} 
                  alt={`${experience.title} icon`}
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <Icon className={`w-8 h-8 text-transparent bg-clip-text bg-gradient-to-br ${experience.color} fill-current`} />
              )}
            </div>
          </div>
          <div className="mt-2 bg-background/80 backdrop-blur px-2 py-0.5 rounded text-[10px] font-bold border border-primary/20 uppercase tracking-wider text-muted-foreground whitespace-nowrap">
            Lvl {experience.level}
          </div>
        </div>

        {/* Right Side */}
        <div className={`${isEven ? 'order-3' : 'order-1'}`}>
          {isEven ? (
            // Visual on right
            <div className="pl-8">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-muted/30 border border-white/10 hover:border-primary/20 transition-colors flex items-center justify-center">
                {experience.certificateImage ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="w-full h-full cursor-pointer group/cert relative">
                        <img 
                          src={experience.certificateImage} 
                          alt={`${experience.company} certificate`}
                          className="w-full h-full object-cover transition-transform group-hover/cert:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        <div className="absolute inset-0 bg-black/0 group-hover/cert:bg-black/10 transition-colors flex items-center justify-center">
                          <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover/cert:opacity-100 transition-opacity">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl w-full p-0 bg-transparent border-none">
                      <div className="relative">
                        <img 
                          src={experience.certificateImage} 
                          alt={`${experience.company} certificate - Full view`}
                          className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                ) : (
                  <>
                    <div className={`absolute inset-0 bg-gradient-to-br ${experience.color} opacity-5 hover:opacity-10 transition-opacity`} />
                    <Icon className={`w-16 h-16 opacity-20 hover:opacity-30 transition-opacity bg-clip-text text-transparent bg-gradient-to-br ${experience.color} fill-current`} />
                    <div className="absolute inset-0 bg-grid-white/[0.05]" />
                  </>
                )}
              </div>
            </div>
          ) : (
            // Content on right
            <div className="text-left pl-8">
              <Card className={`p-6 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors border-primary/10 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10
                ${experience.highlight ? 'border-primary shadow-lg shadow-primary/20' : ''}
              `}>
                <div className="flex flex-col gap-2 items-start">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-bold px-2 py-1 rounded bg-gradient-to-r ${experience.color} text-white`}>
                      {experience.period}
                    </span>
                    {experience.highlight && (
                      <span className="text-[10px] animate-pulse font-bold text-primary border border-primary rounded px-1">ACTIVE</span>
                    )}
                  </div>

                  <h3 className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${experience.color}`}>
                    {experience.title}
                  </h3>

                  <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
                    <Briefcase className="w-4 h-4" />
                    {experience.company}
                  </div>

                  <div className="flex items-center gap-1 text-xs text-muted-foreground/80">
                    <MapPin className="w-3 h-3" />
                    {experience.location}
                  </div>

                  <p className="text-sm text-foreground/80 mt-3 border-l-2 border-primary/50 pl-3">
                    {experience.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {(isExpanded ? experience.achievements : experience.achievements.slice(0, 2)).map((ach: string, i: number) => (
                      <Badge key={i} variant="secondary" className="text-[10px] font-normal leading-tight h-auto py-1">
                        {ach}
                      </Badge>
                    ))}
                    {experience.achievements.length > 2 && (
                      <Badge 
                        variant="outline" 
                        className="text-[10px] cursor-pointer hover:bg-primary hover:text-primary-foreground transform transition-all active:scale-95"
                        onClick={() => setIsExpanded(!isExpanded)}
                      >
                        {isExpanded ? 'Show less' : `+${experience.achievements.length - 2} more quests`}
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CareerJourney;
