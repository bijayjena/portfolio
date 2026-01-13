import Skills from "@/components/Skills";
import PageTransition from "@/components/PageTransition";

import SEO from "@/components/SEO";

const SkillsPage = () => {
  return (
    <PageTransition>
      <SEO
        title="Skills"
        description="Technical skills and technology stack expertise of Bijay Jena including React, AI, and more."
      />
      <Skills />
    </PageTransition>
  );
};

export default SkillsPage;
