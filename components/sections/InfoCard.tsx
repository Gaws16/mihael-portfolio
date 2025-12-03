"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InfoCard as InfoCardType } from "@/types";
import { cn } from "@/lib/utils";

interface InfoCardProps {
  card: InfoCardType;
  className?: string;
}

export default function InfoCard({ card, className }: InfoCardProps) {
  return (
    <Card
      className={cn(
        "group relative h-full cursor-default transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20 hover:border-primary/50",
        className
      )}
    >
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
          {card.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
          {card.content}
        </p>
      </CardContent>
    </Card>
  );
}

