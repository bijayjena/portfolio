import CaseStudiesSection from "@/components/CaseStudiesSection";
import PageTransition from "@/components/PageTransition";

import SEO from "@/components/SEO";
import { profileData } from "@/data/profileData";

const CaseStudiesPage = () => {
  return (
    <PageTransition>
      <SEO
        title="Case Studies"
        description={`Case studies covering ${profileData.projects.map((project) => project.name).join(", ")} and related application engineering work.`}
      />
      <CaseStudiesSection />
    </PageTransition>
  );
};

export default CaseStudiesPage;
