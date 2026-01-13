import Navigation from "@/components/Navigation";
import ParallaxHero from "@/components/ParallaxHero";
import About from "@/components/About";
import CareerJourney from "@/components/CareerJourney";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <ParallaxHero />
      <About />
      <CareerJourney />
      <CaseStudiesSection />
      <Skills />
      <Projects />
      <Education />
      <Contact />
      
      <footer className="bg-card py-6 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Bijay Jena. Built with React & TypeScript.</p>
      </footer>
    </div>
  );
};

export default Index;