"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Project } from "@/types";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import { useState } from "react";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

const PROJECT_PLACEHOLDER =
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop&auto=format&q=80";

function sanitizeProjectImage(url?: string | null) {
  if (!url) return PROJECT_PLACEHOLDER;
  try {
    const parsed = new URL(url);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return parsed.toString();
    }
  } catch {
    // ignored
  }
  return PROJECT_PLACEHOLDER;
}

export default function ProjectCard({ project, className }: ProjectCardProps) {
  const [imageSrc, setImageSrc] = useState(sanitizeProjectImage(project.image));

  return (
    <Card
      className={cn(
        "group relative h-full cursor-pointer overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20 hover:border-primary/50",
        className
      )}
      onClick={() => window.open(project.url, "_blank", "noopener,noreferrer")}
    >
      <div className="relative h-48 w-full overflow-hidden bg-muted">
        <Image
          src={imageSrc}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={() => setImageSrc(PROJECT_PLACEHOLDER)}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ExternalLink className="h-5 w-5 text-white" />
        </div>
      </div>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
          {project.title}
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {project.description}
        </CardDescription>
      </CardHeader>
      {project.technologies && project.technologies.length > 0 && (
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}


