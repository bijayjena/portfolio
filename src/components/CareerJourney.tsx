import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, ChevronDown } from "lucide-react";

const experiences = [
  {
    title: "Associate Team Lead & Manager",
    company: "Squbix Digital Private Limited",
    location: "Bhubaneswar",
    period: "Apr 2025 – Present",
    highlight: true,
    description: "Leading a team of 8 across backend, frontend, app dev, UI/UX, and AI engineering to build the company's own products.",
    achievements: [
      "Overseeing and building flagship products with hands-on AI integration",
      "Managing web app development including admin tools, RBAC, dashboards, and AI integration",
      "Shaping Patient and Doctor Apps for a full-circle healthcare product ecosystem",
      "Driving product innovation with strategic AI implementation across all platforms",
    ],
    bgGradient: "from-violet-600/30 via-purple-600/20 to-fuchsia-600/30",
    accentColor: "text-violet-400",
  },
  {
    title: "Senior Software Engineer",
    company: "Squbix Digital Private Limited",
    location: "Bhubaneswar",
    period: "Apr 2024 – Mar 2025",
    description: "Took over critical HIS development for Akhil Systems Pvt Ltd, a major player in India's healthcare IT market serving Care Hospitals, Kalinga Hospitals, Utkal Hospitals, Ankura, EYE7, and more.",
    achievements: [
      "Led development of 'Augastam' - a next-generation Hospital Information System",
      "Built Form Builder, Webpart Builder, and highly scalable component architecture",
      "Developed EMR, Tariff, Payer, and Billing modules with rapid learning curve",
      "Recognized by PM Abdul Kalam (Solution Architect at Fenergo) to lead a 5-member team",
      "Architected smart Billing system with automatic patient visit bill generation",
      "Go-to person for all AI integrations in the HIS ecosystem",
      "Increased HIS web app performance by 70–80% through React Hooks, Redux Toolkit, and caching",
    ],
    bgGradient: "from-emerald-600/30 via-teal-600/20 to-cyan-600/30",
    accentColor: "text-emerald-400",
  },
  {
    title: "Software Developer",
    company: "Squbix Digital Private Limited",
    location: "Bhubaneswar",
    period: "Oct 2023 – Mar 2024",
    description: "Transitioned to React Native development, building key products that established the company's mobile portfolio.",
    achievements: [
      "Built Sqwallet – a digital wallet app deployed in just 10 days",
      "Developed Chasi and MediClub – cross-platform apps using Expo and Firebase",
      "Created Medbot – an AI chatbot for doctors with NLP integration",
      "Contributed to the offline payment white paper for Sqwallet",
      "Caught the attention of Director Nigamanada Sahoo, leading to App Developer Team Lead role",
    ],
    bgGradient: "from-amber-600/30 via-orange-600/20 to-red-600/30",
    accentColor: "text-amber-400",
  },
  {
    title: "Mobile Application Developer (Intern)",
    company: "Squbix Digital",
    location: "Bhubaneswar",
    period: "Jun 2022 – Jan 2023",
    description: "Started my journey in web and React Native development.",
    achievements: [
      "Created the initial co2network.green static site using React",
      "Built React Native modules for offline messaging via Bluetooth and Wi-Fi",
      "Leveraged Android native APIs for innovative connectivity solutions",
    ],
    bgGradient: "from-sky-600/30 via-blue-600/20 to-indigo-600/30",
    accentColor: "text-sky-400",
  },
  {
    title: "Intern",
    company: "Syllogistek Systems Private Ltd.",
    location: "Bhubaneswar",
    period: "Jun 2020 – Jul 2020",
    description: "First exposure to professional software development.",
    achievements: [
      "Gained foundational experience in software development practices",
    ],
    bgGradient: "from-rose-600/30 via-pink-600/20 to-fuchsia-600/30",
    accentColor: "text-rose-400",
  },
];

const CareerJourney = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const scrollTop = container.scrollTop;
      const sectionHeight = container.clientHeight;
      
      const newIndex = Math.round(scrollTop / sectionHeight);
      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < experiences.length) {
        setActiveIndex(newIndex);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [activeIndex]);

  const scrollToNext = () => {
    if (containerRef.current && activeIndex < experiences.length - 1) {
      const sectionHeight = containerRef.current.clientHeight;
      containerRef.current.scrollTo({
        top: (activeIndex + 1) * sectionHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative">
      {/* Section Header */}
      <div className="bg-background py-8 md:py-12 px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-slide-up">
          Career <span className="gradient-text">Journey</span>
        </h2>
        <p className="text-muted-foreground text-sm md:text-base">Scroll through my professional timeline</p>
      </div>

      {/* Progress Indicator */}
      <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
        {experiences.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (containerRef.current) {
                const sectionHeight = containerRef.current.clientHeight;
                containerRef.current.scrollTo({
                  top: index * sectionHeight,
                  behavior: "smooth",
                });
              }
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeIndex === index
                ? "bg-primary scale-125 shadow-lg shadow-primary/50"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            aria-label={`Go to experience ${index + 1}`}
          />
        ))}
      </div>

      {/* Snap Scroll Container */}
      <div
        ref={containerRef}
        className="h-screen overflow-y-scroll snap-y snap-mandatory"
        style={{ scrollSnapType: "y mandatory" }}
      >
        {experiences.map((exp, index) => (
          <div
            key={index}
            ref={(el) => (sectionRefs.current[index] = el)}
            className={`h-screen snap-start flex items-center justify-center px-4 transition-all duration-700 bg-gradient-to-br ${exp.bgGradient}`}
            style={{ scrollSnapAlign: "start" }}
          >
            <div className="container mx-auto max-w-4xl">
              <Card className="p-8 md:p-12 bg-card/80 backdrop-blur-xl border-primary/20 shadow-2xl">
                <div className="flex items-start gap-4 mb-6">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${exp.bgGradient} border border-primary/20`}>
                    <Briefcase className={`w-8 h-8 ${exp.accentColor}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between flex-wrap gap-2">
                      <h3 className={`text-2xl md:text-3xl font-bold ${exp.highlight ? 'gradient-text' : ''}`}>
                        {exp.title}
                      </h3>
                      {exp.highlight && (
                        <Badge className="bg-primary/20 text-primary border-primary/30 animate-pulse">
                          Current
                        </Badge>
                      )}
                    </div>
                    <p className={`text-xl font-semibold mt-2 ${exp.accentColor}`}>{exp.company}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <Badge variant="secondary">{exp.location}</Badge>
                      <Badge variant="outline" className="border-primary/30">{exp.period}</Badge>
                    </div>
                  </div>
                </div>

                {exp.description && (
                  <p className="text-muted-foreground mb-6 text-lg border-l-4 border-primary/30 pl-4 italic">
                    {exp.description}
                  </p>
                )}

                <ul className="grid md:grid-cols-2 gap-3">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start text-muted-foreground">
                      <span className={`mr-2 mt-1 ${exp.accentColor}`}>▹</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Scroll Indicator */}
              {index < experiences.length - 1 && (
                <button
                  onClick={scrollToNext}
                  className="mt-8 mx-auto flex flex-col items-center text-muted-foreground hover:text-primary transition-colors animate-bounce"
                >
                  <span className="text-sm mb-2">Next Role</span>
                  <ChevronDown className="w-6 h-6" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Journey Summary */}
      <div className="bg-background py-12 px-4 text-center">
        <Card className="inline-block p-6 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <p className="text-lg font-medium">
            <span className="gradient-text font-bold">2+ years</span> at Squbix Digital • 
            From Intern to <span className="gradient-text font-bold">Team Lead</span> • 
            Managing <span className="gradient-text font-bold">8+ engineers</span>
          </p>
        </Card>
      </div>
    </section>
  );
};

export default CareerJourney;