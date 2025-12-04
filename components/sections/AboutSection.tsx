import InfoCard from "./InfoCard";
import { InfoCard as InfoCardType } from "@/types";
import ProfilePhoto from "@/components/profile/ProfilePhoto";
import { getProfilePhotoUrl } from "@/app/actions/getProfilePhoto";
import { getAboutContent } from "@/app/actions/getAboutContent";

export default async function AboutSection() {
  const [profilePhotoUrl, aboutContent] = await Promise.all([
    getProfilePhotoUrl(),
    getAboutContent(),
  ]);

  const aboutCards: InfoCardType[] = [
    {
      id: "skills",
      title: "Skills",
      content: aboutContent.skills,
    },
    {
      id: "experience",
      title: "Experience",
      content: aboutContent.experience,
    },
    {
      id: "education",
      title: "Education",
      content: aboutContent.education,
    },
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
          <div className="flex flex-col items-center text-center gap-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-foreground">
                Meet {aboutContent.fullName}
              </h2>
            </div>
            <ProfilePhoto src={profilePhotoUrl} />
            <p className="max-w-md text-base text-muted-foreground">
              {aboutContent.shortBio}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {aboutCards.map((card) => (
              <InfoCard key={card.id} card={card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

