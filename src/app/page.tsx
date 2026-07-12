import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
import GlobalBackground from "@/components/three/GlobalBackground"; // Your chosen 3D file

export default function Home() {
  return (
    <main className="relative w-full">
      {/* This stays locked in the background */}
      <GlobalBackground /> 
      
      {/* Your HTML sections scroll normally over it */}
      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </div>
    </main>
  );
}