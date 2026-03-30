import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsMarquee from "@/components/SkillsMarquee";
import ProjectsSection from "@/components/ProjectsSection";
import EducationSection from "@/components/EducationSection";
import CertificationsSection from "@/components/CertificationsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => (
  <>
    <div className="mesh-gradient-bg" />
    <div className="noise-overlay" />
    <Navbar />
    <main className="relative z-10">
      <HeroSection />
      <ExperienceSection />
      <SkillsMarquee />
      <ProjectsSection />
      <EducationSection />
      <CertificationsSection />
      <ContactSection />
    </main>
    <Footer />
  </>
);

export default Index;
