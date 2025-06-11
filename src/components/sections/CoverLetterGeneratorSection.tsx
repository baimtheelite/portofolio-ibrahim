"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { generateCoverLetterAction } from "@/lib/actions";
import { Bot, Sparkles, FileText, RefreshCw } from 'lucide-react';
import FadeInScroll from '@/components/animation/FadeInScroll';

const initialState = {
  message: "",
  errors: {},
  success: false,
  coverLetter: null,
};

function GenerateButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-md">
      {pending ? 
        <><RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Generating...</> : 
        <><Sparkles className="mr-2 h-4 w-4" /> Generate Cover Letter</>
      }
    </Button>
  );
}

export default function CoverLetterGeneratorSection() {
  const [state, formAction] = useFormState(generateCoverLetterAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? "AI Assistant" : "Error",
        description: state.message,
        variant: state.success ? "default" : "destructive",
      });
    }
    if (state.success && state.coverLetter) {
        // Form reset is not strictly needed if we show the result below
        // but if the user wants to generate another one, they might want the textarea cleared
        // formRef.current?.reset(); // This could be added if preferred
    }
  }, [state, toast]);

  return (
    <section id="cover-letter" className="py-20 md:py-32 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInScroll>
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
            AI Cover Letter Generator
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
            Paste a job description below and let AI craft a personalized cover letter for you.
            A helpful tool to kickstart your application!
          </p>
        </FadeInScroll>

        <FadeInScroll delay={0.2}>
          <Card className="max-w-3xl mx-auto shadow-xl rounded-xl">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Bot className="h-8 w-8 text-accent" />
                <CardTitle className="font-headline text-3xl text-accent">Cover Letter Assistant</CardTitle>
              </div>
              <CardDescription>
                Enter the job description to generate a tailored cover letter.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form ref={formRef} action={formAction} className="space-y-6">
                <div>
                  <Label htmlFor="jobDescription" className="text-foreground/90">Job Description</Label>
                  <Textarea
                    id="jobDescription"
                    name="jobDescription"
                    placeholder="Paste the full job description here..."
                    rows={10}
                    className="mt-1 bg-background border-border focus:ring-accent"
                    required
                  />
                  {state.errors?.jobDescription && (
                    <p className="text-sm text-destructive mt-1">{state.errors.jobDescription[0]}</p>
                  )}
                </div>
                <GenerateButton />
              </form>

              {state.coverLetter && (
                <FadeInScroll delay={0.1}>
                  <div className="mt-10">
                    <h3 className="font-headline text-2xl font-semibold mb-4 text-foreground flex items-center">
                      <FileText className="mr-2 h-6 w-6 text-primary" /> Generated Cover Letter
                    </h3>
                    <Card className="bg-background border-primary/30 shadow-inner">
                      <CardContent className="p-6">
                        <pre className="whitespace-pre-wrap break-words font-body text-sm leading-relaxed text-foreground/90">
                          {state.coverLetter}
                        </pre>
                      </CardContent>
                    </Card>
                  </div>
                </FadeInScroll>
              )}
            </CardContent>
          </Card>
        </FadeInScroll>
      </div>
    </section>
  );
}
