import { supabase } from "@/lib/supabaseClient";
import { AboutContent } from "@/types";

const DEFAULT_ABOUT_CONTENT: AboutContent = {
  fullName: "Mihael Gaws",
  shortBio:
    "I’m passionate about crafting human-centered digital products that balance thoughtful design with dependable engineering. When I’m not deep in code, you’ll find me exploring new tech, mentoring developers, or sketching the next big idea.",
  skills:
    "Proficient in modern web technologies including React, Next.js, TypeScript, and Node.js. Experienced with database design, API development, and cloud deployment.",
  experience:
    "Several years of experience building scalable web applications. Worked on projects ranging from small business websites to large-scale enterprise applications.",
  education:
    "Strong foundation in computer science with continuous learning through online courses, documentation, and hands-on project development.",
};

export async function getAboutContent(): Promise<AboutContent> {
  const { data, error } = await supabase
    .from("about_me")
    .select("id, full_name, short_bio, skills, experience, education")
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch about content:", error);
    return DEFAULT_ABOUT_CONTENT;
  }

  if (!data) {
    return DEFAULT_ABOUT_CONTENT;
  }

  return {
    id: data.id,
    fullName: data.full_name,
    shortBio: data.short_bio,
    skills: data.skills,
    experience: data.experience,
    education: data.education,
  };
}


