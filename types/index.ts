export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  url: string;
  technologies?: string[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string; // lucide-react icon name
}

export interface InfoCard {
  id: string;
  title: string;
  content: string;
  icon?: string;
}

