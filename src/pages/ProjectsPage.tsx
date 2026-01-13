import Projects from "@/components/Projects";
import PageTransition from "@/components/PageTransition";

import SEO from "@/components/SEO";

const ProjectsPage = () => {
  return (
    <PageTransition>
      <SEO
        title="Projects"
        description="Showcase of web and mobile applications developed by Bijay Jena."
      />
      <Projects />
    </PageTransition>
  );
};

export default ProjectsPage;
