export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint?: string;
  liveLink?: string;
  repoLink?: string;
  tags: string[];
}
