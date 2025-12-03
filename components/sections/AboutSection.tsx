"use client";

import InfoCard from "./InfoCard";
import { InfoCard as InfoCardType } from "@/types";

const aboutCards: InfoCardType[] = [
  {
    id: "1",
    title: "Skills",
    content:
      "Proficient in modern web technologies including React, Next.js, TypeScript, and Node.js. Experienced with database design, API development, and cloud deployment.",
  },
  {
    id: "2",
    title: "Experience",
    content:
      "Several years of experience building scalable web applications. Worked on projects ranging from small business websites to large-scale enterprise applications.",
  },
  {
    id: "3",
    title: "Education",
    content:
      "Strong foundation in computer science with continuous learning through online courses, documentation, and hands-on project development.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
          About Me
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aboutCards.map((card) => (
            <InfoCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}

