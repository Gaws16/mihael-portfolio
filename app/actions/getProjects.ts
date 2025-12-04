import { supabase } from "@/lib/supabaseClient";
import { Project } from "@/types";

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("id, title, description, image, url, technologies")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching projects from Supabase:", error);
    return [];
  }

  return (data ?? []) as Project[];
}


