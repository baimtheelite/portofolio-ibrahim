import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ContactSection from '@/components/sections/ContactSection';
import CoverLetterGeneratorSection from '@/components/sections/CoverLetterGeneratorSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <CoverLetterGeneratorSection />
      <ContactSection />
    </>
  );
}
