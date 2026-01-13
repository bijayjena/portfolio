import CareerJourney from "@/components/CareerJourney";
import PageTransition from "@/components/PageTransition";

import SEO from "@/components/SEO";

const ExperiencePage = () => {
  return (
    <PageTransition>
      <SEO
        title="Experience"
        description="Explore Bijay Jena's professional journey and career milestones in software development."
      />
      <CareerJourney />
    </PageTransition>
  );
};

export default ExperiencePage;
