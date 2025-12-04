import type { NextConfig } from "next";

const supabaseHostname = (() => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) return null;
  try {
    return new URL(supabaseUrl).hostname;
  } catch {
    return null;
  }
})();

const remotePatterns: Array<{
  protocol: "http" | "https";
  hostname: string;
}> = [
  {
    protocol: "https",
    hostname: "images.unsplash.com",
  },
];

if (supabaseHostname) {
  remotePatterns.push({
    protocol: "https",
    hostname: supabaseHostname,
  });
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb", // Increased from default 1mb to allow larger profile photos
    },
  },
};

export default nextConfig;
