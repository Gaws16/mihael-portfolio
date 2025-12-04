"use client";

import { useState } from "react";
import Image from "next/image";
import type { Project } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  updateProjectAction,
  deleteProjectAction,
} from "@/app/admin/actions";

interface AdminProjectsGridProps {
  projects: Project[];
}

const PROJECT_PLACEHOLDER =
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop&auto=format&q=80";

export function AdminProjectsGrid({ projects }: AdminProjectsGridProps) {
  const [selected, setSelected] = useState<Project | null>(null);

  if (projects.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No projects found.</p>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => {
          const imageSrc = project.image || PROJECT_PLACEHOLDER;

          return (
            <Card
              key={project.id}
              className="group cursor-pointer overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
              onClick={() => setSelected(project)}
            >
              <div className="relative h-40 w-full overflow-hidden bg-muted">
                <Image
                  src={imageSrc}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-base font-semibold group-hover:text-primary">
                  {project.title}
                </CardTitle>
                <CardDescription className="line-clamp-3">
                  {project.description}
                </CardDescription>
              </CardHeader>
              {project.technologies && project.technologies.length > 0 && (
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-primary/5 px-2 py-0.5 text-xs text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {selected && (
        <ProjectEditDialog
          project={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}

function ProjectEditDialog({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const imageSrc = project.image || PROJECT_PLACEHOLDER;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2 sm:p-4">
      <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-lg bg-background shadow-xl">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-lg font-semibold">
            Edit project:{" "}
            <span className="text-primary">{project.title}</span>
          </h2>
          <Button
            type="button"
            variant="ghost"
            className="-mr-2 h-8 w-8 p-0 text-muted-foreground"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </Button>
        </div>

        <div className="border-b bg-muted/40 px-4 py-4 sm:px-6">
          <div className="relative h-40 w-full overflow-hidden rounded-md bg-muted">
            <Image
              src={imageSrc}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 640px"
            />
          </div>
          {project.url && (
            <p className="mt-3 truncate text-xs text-muted-foreground">
              Live URL:{" "}
              <span className="font-mono text-foreground">{project.url}</span>
            </p>
          )}
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 pb-6 sm:px-6">
          <ProjectEditForm project={project} />
        </div>
      </div>
    </div>
  );
}

function ProjectEditForm({ project }: { project: Project }) {
  const technologiesInput = project.technologies?.join(", ") ?? "";

  return (
    <form action={updateProjectAction} className="space-y-3">
      <input type="hidden" name="id" value={project.id} />
      <Field label="Title" name="title" defaultValue={project.title} />
      <Field
        label="Description"
        name="description"
        defaultValue={project.description}
        textarea
      />
      <Field label="Image URL" name="image" defaultValue={project.image} />
      <Field label="Project URL" name="url" defaultValue={project.url} />
      <Field
        label="Technologies (comma separated)"
        name="technologies"
        defaultValue={technologiesInput}
      />
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
        <Button type="submit" className="w-full sm:w-auto sm:min-w-[140px]">
          Save Changes
        </Button>
        <Button
          type="submit"
          formAction={deleteProjectAction}
          variant="destructive"
          className="w-full sm:w-auto sm:min-w-[140px]"
        >
          Delete Project
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue = "",
  textarea,
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  textarea?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      {textarea ? (
        <Textarea
          id={name}
          name={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
          rows={4}
          required
        />
      ) : (
        <Input
          id={name}
          name={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
          required
        />
      )}
    </div>
  );
}


