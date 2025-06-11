"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowDown } from 'lucide-react';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      if (titleRef.current) {
        tl.fromTo(titleRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, 0.2);
      }
      if (subtitleRef.current) {
        tl.fromTo(subtitleRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 }, 0.5);
      }
      if (buttonRef.current) {
        tl.fromTo(buttonRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, 0.8);
      }
    }
  }, []);

  return (
    <section ref={heroRef} id="hero" className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 ref={titleRef} className="font-headline text-5xl md:text-7xl font-bold mb-6 text-foreground leading-tight">
          Welcome to <span className="text-primary">DevFolio Pro</span>
        </h1>
        <p ref={subtitleRef} className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
          Crafting innovative digital experiences with cutting-edge technology. Discover my projects and skills.
        </p>
        <div ref={buttonRef}>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
            <Link href="#projects">
              View My Work <ArrowDown className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
