import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import Link from 'next/link';

const socialLinks = [
  { Icon: Github, href: 'https://github.com', label: 'GitHub' },
  { Icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { Icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { Icon: Mail, href: 'mailto:email@example.com', label: 'Email' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 text-muted-foreground py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center space-x-6 mb-4">
          {socialLinks.map(({ Icon, href, label }) => (
            <Link key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
              <Icon className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
            </Link>
          ))}
        </div>
        <p className="text-sm">
          &copy; {currentYear} DevFolio Pro. All rights reserved.
        </p>
         <p className="text-xs mt-2">
          Designed by an expert designer. Implemented by AI.
        </p>
      </div>
    </footer>
  );
}
