import Contact from "@/components/Contact";
import PageTransition from "@/components/PageTransition";

import SEO from "@/components/SEO";

const ContactPage = () => {
  return (
    <PageTransition>
      <SEO
        title="Contact"
        description="Get in touch with Bijay Jena for opportunities, collaborations, or tech discussions."
      />
      <Contact />
    </PageTransition>
  );
};

export default ContactPage;
