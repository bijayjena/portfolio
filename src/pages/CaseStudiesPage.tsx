import CaseStudiesSection from "@/components/CaseStudiesSection";
import PageTransition from "@/components/PageTransition";

import SEO from "@/components/SEO";

const CaseStudiesPage = () => {
  return (
    <PageTransition>
      <SEO
        title="Case Studies"
        description="Deep dive into technical challenges and solutions implemented by Bijay Jena."
      />
      <CaseStudiesSection />
    </PageTransition>
  );
};

export default CaseStudiesPage;
