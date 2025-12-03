"use client";

import { Linkedin, Github, Facebook, Mail } from "lucide-react";
import Link from "next/link";
import { SocialLink } from "@/types";

const socialLinks: SocialLink[] = [
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/yourprofile",
    icon: "linkedin",
  },
  {
    name: "GitHub",
    url: "https://github.com/yourusername",
    icon: "github",
  },
  {
    name: "Facebook",
    url: "https://facebook.com/yourprofile",
    icon: "facebook",
  },
  {
    name: "Email",
    url: "mailto:your.email@example.com",
    icon: "mail",
  },
];

const iconMap = {
  linkedin: Linkedin,
  github: Github,
  facebook: Facebook,
  mail: Mail,
};

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-foreground">Portfolio</h1>
        </div>
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.icon as keyof typeof iconMap];
            return (
              <Link
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                aria-label={link.name}
              >
                <Icon className="h-5 w-5" />
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

