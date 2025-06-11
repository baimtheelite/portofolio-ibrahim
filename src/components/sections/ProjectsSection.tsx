import Image from 'next/image';
import type { Project } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Github, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import FadeInScroll from '@/components/animation/FadeInScroll';

const projectsData: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce platform with admin panel, payment integration, and advanced search functionality.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'e-commerce website',
    liveLink: '#',
    repoLink: '#',
    tags: ['Next.js', 'Stripe', 'Tailwind CSS', 'PostgreSQL'],
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'A collaborative task management tool with real-time updates, Kanban boards, and user authentication.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'task management',
    liveLink: '#',
    repoLink: '#',
    tags: ['React', 'Firebase', 'Node.js', 'Material UI'],
  },
  {
    id: '3',
    title: 'Portfolio Website API',
    description: 'A headless CMS and API backend for managing portfolio content, built with a focus on performance and scalability.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'API code',
    liveLink: '#',
    repoLink: '#',
    tags: ['Python', 'FastAPI', 'Docker', 'GraphQL'],
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 md:py-32 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInScroll>
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-center mb-16 text-foreground">
            Featured Projects
          </h2>
        </FadeInScroll>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <FadeInScroll key={project.id} delay={index * 0.15} className="flex">
              <Card className="flex flex-col w-full shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden">
                <div className="relative w-full h-56">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover"
                    data-ai-hint={project.imageHint}
                  />
                </div>
                <CardHeader>
                  <CardTitle className="font-headline text-2xl text-primary">{project.title}</CardTitle>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs bg-accent/15 text-accent-foreground">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-foreground/80 leading-relaxed">{project.description}</CardDescription>
                </CardContent>
                <CardFooter className="flex justify-end space-x-3 pt-4">
                  {project.repoLink && (
                    <Button variant="outline" size="sm" asChild className="hover:bg-accent/10 hover:border-accent">
                      <Link href={project.repoLink} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" /> Code
                      </Link>
                    </Button>
                  )}
                  {project.liveLink && (
                    <Button variant="default" size="sm" asChild className="bg-primary hover:bg-primary/90">
                      <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                      </Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </FadeInScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
