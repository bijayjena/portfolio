import ParallaxHero from "@/components/ParallaxHero";
import About from "@/components/About";
import Contact from "@/components/Contact";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";



const HomePage = () => {
  return (
    <PageTransition>
      <SEO
        title="Home"
        description="Bijay Jena - Application Engineer & Full Stack Developer specializing in React, building scalable healthcare solutions."
        keywords={["portfolio", "react", "full stack", "developer", "healthcare", "application engineer"]}
      />
      <div id="home">
        <ParallaxHero />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </PageTransition>
  );
};

export default HomePage;
