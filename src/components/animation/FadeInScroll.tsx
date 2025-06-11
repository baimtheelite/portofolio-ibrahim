"use client";
import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FadeInScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  stagger?: number;
  childClassName?: string; // For staggering children
}

const FadeInScroll: React.FC<FadeInScrollProps> = ({ 
  children, 
  className, 
  delay = 0, 
  y = 20, 
  x = 0,
  stagger = 0,
  childClassName
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const target = stagger > 0 && childClassName ? ref.current.querySelectorAll(`.${childClassName}`) : ref.current;
      gsap.fromTo(
        target,
        { opacity: 0, y: y, x: x },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.8,
          delay: delay,
          stagger: stagger,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%', 
            toggleActions: 'play none none none', 
          },
          ease: 'power3.out',
        }
      );
    }
  }, [delay, y, x, stagger, childClassName]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default FadeInScroll;
