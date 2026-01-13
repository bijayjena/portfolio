import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Phone, Download } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import profilePhoto from "@/assets/profile-photo.jpg";

const ParallaxHero = () => {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        if (rect.bottom > 0) {
          setScrollY(window.scrollY);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          transform: `translateY(${scrollY * 0.5}px) scale(${1 + scrollY * 0.0005})`,
          willChange: 'transform',
        }}
      />

      {/* Gradient Overlay with Parallax */}
      <div
        className="absolute inset-0 bg-gradient-subtle z-0 opacity-80"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
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
        className="container mx-auto px-4 z-10 animate-fade-in"
        style={{
          transform: `translateY(${scrollY * 0.2}px)`,
          opacity: Math.max(0, 1 - scrollY * 0.002),
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Profile Photo */}
          <div className="mb-8 flex justify-center">
            <div
              className="relative group cursor-pointer"
              style={{
                transform: `translateY(${-scrollY * 0.1}px)`,
              }}
            >
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-primary/50 shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:border-primary group-hover:shadow-[0_0_40px_rgba(var(--primary-rgb),0.4)]">
                <img
                  src={profilePhoto}
                  alt="Bijay Jena"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-20 transition-opacity duration-500 group-hover:opacity-40" />
              <div className="absolute -inset-2 rounded-full border-2 border-primary/0 transition-all duration-500 group-hover:border-primary/30 group-hover:scale-105" />
            </div>
          </div>

          <h1
            className="text-5xl md:text-7xl font-bold mb-6"
            style={{
              transform: `translateY(${-scrollY * 0.05}px)`,
            }}
          >
            Hi, I'm <span className="gradient-text">Bijay Jena</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-4">
            Application Engineer & Full Stack Developer
          </p>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Specializing in React, React Native, and AI integration. Building scalable solutions
            that transform healthcare and drive innovation.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <Button variant="hero" size="lg" asChild>
              <Link to="/projects">View Projects</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/#contact">Get in Touch</Link>
            </Button>
          </div>

          <div className="flex gap-4 justify-center">
            <a
              href="https://github.com/bijayjena"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-card hover:bg-primary transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/in/bijayjena"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-card hover:bg-primary transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="mailto:bijayjenaofficial@gmail.com"
              className="p-3 rounded-full bg-card hover:bg-primary transition-colors"
            >
              <Mail className="w-6 h-6" />
            </a>
            <a
              href="tel:+916371303113"
              className="p-3 rounded-full bg-card hover:bg-primary transition-colors"
            >
              <Phone className="w-6 h-6" />
            </a>
            <a
              href="/resume.pdf"
              download="Bijay_Jena_Resume.pdf"
              className="p-3 rounded-full bg-card hover:bg-primary transition-colors"
              title="Download Resume"
            >
              <Download className="w-6 h-6" />
            </a>
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