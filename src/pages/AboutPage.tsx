import About from "@/components/About";
import PageTransition from "@/components/PageTransition";

import SEO from "@/components/SEO";

const AboutPage = () => {
  return (
    <PageTransition>
      <SEO
        title="About Me"
        description="Learn more about Bijay Jena, a Software Developer at Squbix Digital with expertise in React, React Native, and AI."
      />
      <About />
    </PageTransition>
  );
};

export default AboutPage;
