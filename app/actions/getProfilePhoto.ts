import { supabase } from "@/lib/supabaseClient";

const BUCKET = "project_images";
const KEY = "profile1.jpg";

export async function getProfilePhotoUrl(): Promise<string | null> {
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(KEY);

  if (!data?.publicUrl) {
    console.error("Unable to resolve profile photo URL from Supabase Storage");
    return null;
  }

  // Get file metadata to use as cache buster
  // This ensures the image updates immediately when changed
  try {
    const { data: fileInfo, error } = await supabase.storage
      .from(BUCKET)
      .list("", {
        limit: 1000,
      });

    if (error) {
      throw error;
    }

    // Find the profile photo file
    const profileFile = fileInfo?.find((file) => file.name === KEY);

    // Use updated_at timestamp as cache buster, or current time as fallback
    const cacheBuster = profileFile?.updated_at
      ? new Date(profileFile.updated_at).getTime()
      : Date.now();

    return `${data.publicUrl}?t=${cacheBuster}`;
  } catch (error) {
    // Fallback: use current timestamp if metadata fetch fails
    // This ensures we always have a cache-busting parameter
    return `${data.publicUrl}?t=${Date.now()}`;
  }
}


