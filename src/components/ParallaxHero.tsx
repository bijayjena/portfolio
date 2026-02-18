import { useEffect, useState, useRef, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Phone, Download } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { getExperienceDurationString } from "@/data/experienceData";
import { useReducedMotion } from "@/hooks/useMediaQuery";

// Lazy load the 3D visualization for better initial load
const TechStackVisualization = lazy(() => import("@/components/TechStackVisualization"));

const ParallaxHero = () => {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const rafRef = useRef<number>();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      // Cancel previous frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      // Use RAF for smooth 60fps animations
      rafRef.current = requestAnimationFrame(() => {
        if (heroRef.current) {
          const rect = heroRef.current.getBoundingClientRect();
          if (rect.bottom > 0) {
            setScrollY(window.scrollY);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [prefersReducedMotion]);

  // Calculate experience dynamically using centralized data
  const experienceString = getExperienceDurationString();

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.3)',
          transform: prefersReducedMotion 
            ? 'none' 
            : `translateY(${scrollY * 0.5}px) scale(${1 + scrollY * 0.0005})`,
          willChange: prefersReducedMotion ? 'auto' : 'transform',
        }}
      />

      {/* Gradient Overlay with Parallax */}
      <div
        className="absolute inset-0 bg-gradient-subtle z-0 opacity-80"
        style={{
          transform: prefersReducedMotion ? 'none' : `translateY(${scrollY * 0.3}px)`,
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `translateY(${scrollY * (0.1 + Math.random() * 0.3)}px)`,
              opacity: 0.3 + Math.random() * 0.5,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Content with Parallax */}
      <div
        className="container mx-auto px-4 sm:px-6 lg:px-8 z-10 animate-fade-in"
        style={{
          transform: prefersReducedMotion ? 'none' : `translateY(${scrollY * 0.2}px)`,
          opacity: prefersReducedMotion ? 1 : Math.max(0, 1 - scrollY * 0.002),
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Tech Stack Visualization */}
            <div className="flex justify-center lg:justify-end order-1 lg:order-2">
              <div
                className="relative group cursor-pointer touch-manipulation"
                style={{
                  transform: prefersReducedMotion ? 'none' : `translateY(${-scrollY * 0.1}px)`,
                }}
              >
                <Suspense 
                  fallback={
                    <div className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-lg overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center animate-pulse">
                      <p className="text-white text-sm">Loading...</p>
                    </div>
                  }
                >
                  <TechStackVisualization />
                </Suspense>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none" />
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <p className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                    Interactive Tech Stack
                  </p>
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="text-center lg:text-left order-2 lg:order-1 space-y-4">

              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                style={{
                  transform: prefersReducedMotion ? 'none' : `translateY(${-scrollY * 0.05}px)`,
                }}
              >
                Hi, I'm<br />
                <span className="gradient-text">Bijay Jena</span>
              </h1>
              <div className="flex flex-col gap-2 mb-4">
                <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground">
                  Application Engineer & Full Stack Developer
                </p>
                <p className="text-base sm:text-lg md:text-xl font-medium text-primary">
                  {experienceString} of Experience
                </p>
              </div>
              <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
                Specializing in React, React Native, and AI integration. Building scalable solutions
                that transform healthcare and drive innovation.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8">
                <Button variant="hero" size="lg" asChild className="w-full sm:w-auto">
                  <Link to="/projects">View Projects</Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
                  <Link to="/#contact">Get in Touch</Link>
                </Button>
              </div>

              <div className="flex gap-3 sm:gap-4 justify-center lg:justify-start flex-wrap">
                <a
                  href="https://github.com/bijayjena"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-card hover:bg-primary hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-primary/50"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
                <a
                  href="https://linkedin.com/in/bijayjena"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-card hover:bg-primary hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-primary/50"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
                <a
                  href="mailto:bijayjenaofficial@gmail.com"
                  className="p-3 rounded-full bg-card hover:bg-primary hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-primary/50"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
                <a
                  href="tel:+916371303113"
                  className="p-3 rounded-full bg-card hover:bg-primary hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-primary/50"
                  aria-label="Phone"
                >
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
                <a
                  href="/resume.pdf"
                  download="Bijay_Jena_Resume.pdf"
                  className="p-3 rounded-full bg-card hover:bg-primary hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-primary/50"
                  title="Download Resume"
                  aria-label="Download Resume"
                >
                  <Download className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        style={{
          opacity: Math.max(0, 1 - scrollY * 0.01),
        }}
      >
        <div className="flex flex-col items-center text-muted-foreground animate-bounce">
          <span className="text-sm mb-2">Scroll</span>
          <div className="w-6 h-10 border-2 border-muted-foreground/50 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParallaxHero;