import { getAboutContent } from "@/app/actions/getAboutContent";
import { getProjects } from "@/app/actions/getProjects";
import { getProfilePhotoUrl } from "@/app/actions/getProfilePhoto";
import {
  createProjectAction,
  deleteProjectAction,
  updateAboutAction,
  updateProjectAction,
  updateProfilePhotoAction,
} from "./actions";
import { AdminProjectsGrid } from "@/components/admin/AdminProjectsGrid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ProfilePhoto from "@/components/profile/ProfilePhoto";

export const dynamic = "force-dynamic";

interface AdminPageProps {
  searchParams?: {
    status?: string;
  };
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const [aboutContent, projects, profilePhotoUrl] = await Promise.all([
    getAboutContent(),
    getProjects(),
    getProfilePhotoUrl(),
  ]);

  const status = searchParams?.status;

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <h1 className="text-4xl font-bold text-foreground">Admin Dashboard</h1>

        {status && (
          <div className="rounded-md border border-emerald-600/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-900 dark:border-emerald-400/40 dark:bg-emerald-400/10 dark:text-emerald-100">
            {status === "about-updated" && "About section updated successfully."}
            {status === "project-created" && "Project created successfully."}
            {status === "project-updated" && "Project updated successfully."}
            {status === "project-deleted" && "Project deleted successfully."}
            {status === "profile-updated" && "Profile photo updated successfully."}
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Profile Photo</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className="flex justify-center md:justify-start">
              <ProfilePhoto src={profilePhotoUrl} />
            </div>
            <form
              action={updateProfilePhotoAction}
              className="flex-1 space-y-3"
            >
              <div className="space-y-2">
                <Label htmlFor="profilePhoto">Upload new photo</Label>
                <Input
                  id="profilePhoto"
                  name="profilePhoto"
                  type="file"
                  accept="image/*"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Recommended: a square image at least 512×512px for best
                  quality.
                </p>
              </div>
              <Button type="submit" className="w-full sm:w-auto">
                Save Profile Photo
              </Button>
            </form>
          </CardContent>
        </Card>

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
          <CardContent>
            <AdminProjectsGrid projects={projects} />
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
