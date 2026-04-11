import About from "@/components/About";
import PageTransition from "@/components/PageTransition";

import SEO from "@/components/SEO";
import { profileData } from "@/data/profileData";

const AboutPage = () => {
  return (
    <PageTransition>
      <SEO
        title="About Me"
        description={profileData.objective}
      />
      <About />
    </PageTransition>
  );
};

export default AboutPage;
