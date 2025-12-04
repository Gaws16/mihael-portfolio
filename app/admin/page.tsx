import { getAboutContent } from "@/app/actions/getAboutContent";
import { getProjects } from "@/app/actions/getProjects";
import {
  createProjectAction,
  deleteProjectAction,
  updateAboutAction,
  updateProjectAction,
} from "./actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Project } from "@/types";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [aboutContent, projects] = await Promise.all([
    getAboutContent(),
    getProjects(),
  ]);

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <h1 className="text-4xl font-bold text-foreground">Admin Dashboard</h1>

        <Card>
          <CardHeader>
            <CardTitle>Edit About Section</CardTitle>
          </CardHeader>
          <CardContent>
            {aboutContent.id ? (
              <form action={updateAboutAction} className="space-y-4">
                <input type="hidden" name="id" value={aboutContent.id} />
                <Field label="Full Name" name="fullName" defaultValue={aboutContent.fullName} />
                <Field
                  label="Short Bio"
                  name="shortBio"
                  defaultValue={aboutContent.shortBio}
                  textarea
                />
                <Field
                  label="Skills"
                  name="skills"
                  defaultValue={aboutContent.skills}
                  textarea
                />
                <Field
                  label="Experience"
                  name="experience"
                  defaultValue={aboutContent.experience}
                  textarea
                />
                <Field
                  label="Education"
                  name="education"
                  defaultValue={aboutContent.education}
                  textarea
                />
                <Button type="submit" className="w-full sm:w-auto">
                  Save About Content
                </Button>
              </form>
            ) : (
              <p className="text-sm text-muted-foreground">
                No about content found. Please insert a row into `about_me` via Supabase.
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Add New Project</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={createProjectAction} className="space-y-4">
              <Field label="Title" name="title" />
              <Field label="Description" name="description" textarea />
              <Field label="Image URL" name="image" />
              <Field label="Project URL" name="url" />
              <Field
                label="Technologies (comma separated)"
                name="technologies"
                placeholder="Next.js, TypeScript, Tailwind CSS"
              />
              <Button type="submit" className="w-full sm:w-auto">
                Add Project
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Existing Projects</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {projects.length === 0 ? (
              <p className="text-sm text-muted-foreground">No projects found.</p>
            ) : (
              projects.map((project) => (
                <ProjectEditor key={project.id} project={project} />
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
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

function ProjectEditor({ project }: { project: Project }) {
  const technologiesInput = project.technologies?.join(", ") ?? "";

  return (
    <div className="rounded-lg border border-border/50 p-4">
      <form action={updateProjectAction} className="space-y-3">
        <input type="hidden" name="id" value={project.id} />
        <Field label="Title" name="title" defaultValue={project.title} />
        <Field label="Description" name="description" defaultValue={project.description} textarea />
        <Field label="Image URL" name="image" defaultValue={project.image} />
        <Field label="Project URL" name="url" defaultValue={project.url} />
        <Field
          label="Technologies (comma separated)"
          name="technologies"
          defaultValue={technologiesInput}
        />
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <Button type="submit" className="w-full sm:w-auto">
            Save Changes
          </Button>
          <Button
            type="submit"
            formAction={deleteProjectAction}
            variant="destructive"
            className="w-full sm:w-auto"
          >
            Delete Project
          </Button>
        </div>
      </form>
    </div>
  );
}

