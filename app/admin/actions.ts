"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabaseClient";
import { supabaseAdmin } from "@/lib/supabaseAdminClient";

function revalidateAfterChange() {
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function updateAboutAction(formData: FormData) {
  const id = formData.get("id")?.toString();
  const fullName = formData.get("fullName")?.toString().trim();
  const shortBio = formData.get("shortBio")?.toString().trim();
  const skills = formData.get("skills")?.toString().trim();
  const experience = formData.get("experience")?.toString().trim();
  const education = formData.get("education")?.toString().trim();

  if (!id) {
    throw new Error("About record missing id.");
  }

  const { error } = await supabaseAdmin
    .from("about_me")
    .update({
      full_name: fullName,
      short_bio: shortBio,
      skills,
      experience,
      education,
    })
    .eq("id", id);

  if (error) {
    throw error;
  }

  revalidateAfterChange();
}

export async function createProjectAction(formData: FormData) {
  const title = formData.get("title")?.toString().trim();
  const description = formData.get("description")?.toString().trim();
  const image = formData.get("image")?.toString().trim();
  const url = formData.get("url")?.toString().trim();
  const technologies = parseTechnologies(formData.get("technologies"));

  if (!title || !description || !image || !url) {
    throw new Error("All fields are required to create a project.");
  }

  const { error } = await supabaseAdmin.from("projects").insert([
    {
      title,
      description,
      image,
      url,
      technologies,
    },
  ]);

  if (error) {
    throw error;
  }

  revalidateAfterChange();
}

export async function updateProjectAction(formData: FormData) {
  const id = formData.get("id")?.toString();
  const title = formData.get("title")?.toString().trim();
  const description = formData.get("description")?.toString().trim();
  const image = formData.get("image")?.toString().trim();
  const url = formData.get("url")?.toString().trim();
  const technologies = parseTechnologies(formData.get("technologies"));

  if (!id) {
    throw new Error("Project id is required.");
  }

  const { error } = await supabaseAdmin
    .from("projects")
    .update({
      title,
      description,
      image,
      url,
      technologies,
    })
    .eq("id", id);

  if (error) {
    throw error;
  }

  revalidateAfterChange();
}

export async function deleteProjectAction(formData: FormData) {
  const id = formData.get("id")?.toString();

  if (!id) {
    throw new Error("Project id is required.");
  }

  const { error } = await supabaseAdmin.from("projects").delete().eq("id", id);

  if (error) {
    throw error;
  }

  revalidateAfterChange();
}

function parseTechnologies(value: FormDataEntryValue | null): string[] {
  if (!value) return [];

  return value
    .toString()
    .split(",")
    .map((tech) => tech.trim())
    .filter(Boolean);
}


