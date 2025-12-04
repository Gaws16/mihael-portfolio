"use client";

import { useState } from "react";
import { Linkedin, Github, Facebook, Mail, Copy } from "lucide-react";
import Link from "next/link";
import { SocialLink } from "@/types";

const EMAIL = "mh.yordanov@gmail.com";

const socialLinks: SocialLink[] = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/mihael-yordanov-b78740270/",
    icon: "linkedin",
  },
  {
    name: "GitHub",
    url: "https://github.com/Gaws16",
    icon: "github",
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/mihael.yordanov.1",
    icon: "facebook",
  },
];

const iconMap = {
  linkedin: Linkedin,
  github: Github,
  facebook: Facebook,
};

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-foreground">
            Mihael&apos;s Portfolio
          </h1>
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
          <EmailTooltip />
        </div>
      </div>
    </nav>
  );
}

function EmailTooltip() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore clipboard errors, still show tooltip
    }
  };

  return (
    <div className="group relative">
      <button
        type="button"
        onClick={handleCopy}
        className="flex items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label="Copy email address"
      >
        <Mail className="h-5 w-5" />
      </button>
      <div className="pointer-events-none absolute left-1/2 top-full mt-3 -translate-x-1/2 rounded-md bg-accent px-3 py-2 text-sm text-accent-foreground opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
        {copied ? (
          <span className="font-medium">Copied!</span>
        ) : (
          <div className="flex items-center gap-2">
            <span>{EMAIL}</span>
            <button
              type="button"
              onClick={handleCopy}
              className="pointer-events-auto rounded-full bg-accent-foreground/10 p-1 text-accent-foreground transition-colors hover:bg-accent-foreground/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
              aria-label="Copy email address"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
