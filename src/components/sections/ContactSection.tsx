"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { submitContactForm } from "@/lib/actions";
import { Github, Linkedin, Twitter, Mail, Send } from 'lucide-react';
import Link from 'next/link';
import FadeInScroll from '@/components/animation/FadeInScroll';

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters long."),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const initialState = {
  message: "",
  errors: {},
  success: false,
};

const socialLinks = [
  { Icon: Github, href: 'https://github.com/johndoe', label: 'GitHub', username: 'johndoe' },
  { Icon: Linkedin, href: 'https://linkedin.com/in/johndoe', label: 'LinkedIn', username: 'johndoe' },
  { Icon: Twitter, href: 'https://twitter.com/johndoe_dev', label: 'Twitter', username: '@johndoe_dev' },
  { Icon: Mail, href: 'mailto:john.doe@example.com', label: 'Email', username: 'john.doe@example.com' },
];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-md">
      {pending ? "Sending..." : <>Send Message <Send className="ml-2 h-4 w-4" /></>}
    </Button>
  );
}

export default function ContactSection() {
  const [state, formAction] = useFormState(submitContactForm, initialState);
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? "Success!" : "Error",
        description: state.message,
        variant: state.success ? "default" : "destructive",
      });
      if (state.success) {
        form.reset();
      }
    }
  }, [state, toast, form]);

  return (
    <section id="contact" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInScroll>
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-center mb-16 text-foreground">
            Get In Touch
          </h2>
        </FadeInScroll>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <FadeInScroll delay={0.2}>
            <Card className="shadow-xl rounded-xl">
              <CardHeader>
                <CardTitle className="font-headline text-3xl text-primary">Contact Me</CardTitle>
                <CardDescription>
                  Have a project in mind or just want to say hi? Fill out the form or reach out via social media.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form action={formAction} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-foreground/90">Full Name</Label>
                    <Input id="name" name="name" placeholder="John Doe" className="mt-1 bg-muted/30 border-border focus:ring-primary" />
                    {state.errors?.name && <p className="text-sm text-destructive mt-1">{state.errors.name[0]}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-foreground/90">Email Address</Label>
                    <Input id="email" name="email" type="email" placeholder="you@example.com" className="mt-1 bg-muted/30 border-border focus:ring-primary" />
                    {state.errors?.email && <p className="text-sm text-destructive mt-1">{state.errors.email[0]}</p>}
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-foreground/90">Message</Label>
                    <Textarea id="message" name="message" placeholder="Your message here..." rows={5} className="mt-1 bg-muted/30 border-border focus:ring-primary" />
                    {state.errors?.message && <p className="text-sm text-destructive mt-1">{state.errors.message[0]}</p>}
                  </div>
                  <SubmitButton />
                </form>
              </CardContent>
            </Card>
          </FadeInScroll>
          
          <FadeInScroll delay={0.4}>
            <Card className="shadow-xl rounded-xl">
              <CardHeader>
                <CardTitle className="font-headline text-3xl text-accent">Connect With Me</CardTitle>
                 <CardDescription>
                  You can also find me on these platforms:
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {socialLinks.map(({ Icon, href, label, username }) => (
                  <Link key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center p-4 rounded-lg hover:bg-accent/10 transition-colors group border border-transparent hover:border-accent/30">
                    <Icon className="h-8 w-8 text-accent group-hover:scale-110 transition-transform" />
                    <div className="ml-4">
                      <p className="text-lg font-medium text-foreground group-hover:text-accent transition-colors">{label}</p>
                      <p className="text-sm text-muted-foreground">{username}</p>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </FadeInScroll>
        </div>
      </div>
    </section>
  );
}
