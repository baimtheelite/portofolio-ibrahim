"use server";

import { z } from "zod";
import { generateCoverLetter as generateCoverLetterFlow } from "@/ai/flows/cover-letter-generator";
import type { CoverLetterInput, CoverLetterOutput } from "@/ai/flows/cover-letter-generator";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export async function submitContactForm(prevState: any, formData: FormData) {
  try {
    const validatedFields = contactFormSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Validation failed. Please check your input.",
        success: false,
      };
    }

    const { name, email, message } = validatedFields.data;

    // Simulate sending email
    console.log("Contact Form Submission:");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);
    
    // In a real app, you'd use a service like Resend, SendGrid, or Nodemailer here
    // await sendEmail({ to: "your-email@example.com", subject: `New message from ${name}`, text: message, from: email });

    return {
      message: "Thank you for your message! I'll get back to you soon.",
      success: true,
      errors: {},
    };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return {
      message: "An unexpected error occurred. Please try again later.",
      success: false,
      errors: {},
    };
  }
}


const coverLetterSchema = z.object({
  jobDescription: z.string().min(50, "Job description must be at least 50 characters."),
});

export async function generateCoverLetterAction(prevState: any, formData: FormData) {
  try {
    const jobDescription = formData.get("jobDescription") as string;
    
    const validatedFields = coverLetterSchema.safeParse({ jobDescription });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Validation failed. Please check your input.",
        success: false,
        coverLetter: null,
      };
    }

    const input: CoverLetterInput = { jobDescription: validatedFields.data.jobDescription };
    const result: CoverLetterOutput = await generateCoverLetterFlow(input);

    return {
      message: "Cover letter generated successfully!",
      success: true,
      coverLetter: result.coverLetter,
      errors: {},
    };
  } catch (error) {
    console.error("Error generating cover letter:", error);
    return {
      message: "AI failed to generate cover letter. Please try again.",
      success: false,
      coverLetter: null,
      errors: {},
    };
  }
}
