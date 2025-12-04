import { supabase } from "@/lib/supabaseClient";

const BUCKET = "project_images";
const KEY = "profile1.jpg";

export async function getProfilePhotoUrl(): Promise<string | null> {
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(KEY);

  if (data?.publicUrl) {
    return data.publicUrl;
  }

  console.error("Unable to resolve profile photo URL from Supabase Storage");
  return null;
}


