import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import FadeInScroll from '@/components/animation/FadeInScroll';

const skills = [
  "React", "Next.js", "TypeScript", "JavaScript", "Node.js", "Python", 
  "GraphQL", "REST APIs", "Docker", "Kubernetes", "AWS", "Firebase", "Tailwind CSS", "GSAP"
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInScroll>
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-center mb-16 text-foreground">
            About Me
          </h2>
        </FadeInScroll>
        
        <div className="grid md:grid-cols-3 gap-12 items-center">
          <FadeInScroll className="md:col-span-1" delay={0.2}>
            <Card className="overflow-hidden shadow-xl rounded-xl">
              <Image
                src="https://placehold.co/600x600.png"
                alt="Professional Headshot"
                width={600}
                height={600}
                className="object-cover w-full h-auto"
                data-ai-hint="professional headshot"
              />
            </Card>
          </FadeInScroll>

          <FadeInScroll className="md:col-span-2" delay={0.4}>
            <Card className="shadow-xl rounded-xl">
              <CardHeader>
                <CardTitle className="font-headline text-3xl text-primary">John Doe</CardTitle>
                <p className="text-muted-foreground text-lg">Full-Stack Developer & UI/UX Enthusiast</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg leading-relaxed text-foreground/90">
                  Hello! I'm John, a passionate and results-driven Full-Stack Developer with a keen eye for design and user experience. 
                  With over 5 years in the industry, I specialize in building modern, responsive, and scalable web applications using cutting-edge technologies.
                </p>
                <p className="text-lg leading-relaxed text-foreground/90">
                  My journey in tech began with a fascination for how software can solve real-world problems and enhance human experiences. 
                  I thrive in collaborative environments and am always eager to learn new skills and take on challenging projects. 
                  When I'm not coding, you can find me exploring new design trends, contributing to open-source, or enjoying a good cup of coffee.
                </p>
                <div>
                  <h3 className="font-headline text-2xl font-semibold mb-4 text-foreground">Skills</h3>
                  <div className="flex flex-wrap gap-3">
                    {skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-sm px-3 py-1 bg-accent/20 text-accent-foreground hover:bg-accent/30 transition-colors">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeInScroll>
        </div>
      </div>
    </section>
  );
}
