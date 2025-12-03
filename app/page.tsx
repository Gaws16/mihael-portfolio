import Navbar from "@/components/navigation/Navbar";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </div>
  );
}
