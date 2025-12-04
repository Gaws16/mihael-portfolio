import Navbar from "@/components/navigation/Navbar";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
import { getProjects } from "./actions/getProjects";

export default async function Home() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <AboutSection />
        <ProjectsSection projects={projects} />
        <ContactSection />
      </main>
    </div>
  );
}
