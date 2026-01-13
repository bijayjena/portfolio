import Education from "@/components/Education";
import PageTransition from "@/components/PageTransition";

import SEO from "@/components/SEO";

const EducationPage = () => {
  return (
    <PageTransition>
      <SEO
        title="Education"
        description="Academic background and qualifications of Bijay Jena."
      />
      <Education />
    </PageTransition>
  );
};

export default EducationPage;
