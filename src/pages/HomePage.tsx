import ParallaxHero from "@/components/ParallaxHero";
import About from "@/components/About";
import SocialPresence from "@/components/SocialPresence";
import Contact from "@/components/Contact";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { profileData } from "@/data/profileData";



const HomePage = () => {
  return (
    <PageTransition>
      <SEO
        title="Home"
        description={profileData.objective}
        keywords={["portfolio", "react", "full stack", "developer", "healthcare", "application engineer"]}
      />
      <div id="home">
        <ParallaxHero />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="presence">
        <SocialPresence />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </PageTransition>
  );
};

export default HomePage;
