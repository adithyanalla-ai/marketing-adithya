import { z } from "zod";
import { BUDGETS } from "../content/contact";

const text = (max: number) => z.string().transform((s) => s.trim()).pipe(z.string().max(max, "That is a little too long."));

/** Used by the contact form in the browser (the form has no server route). */
export const contactSchema = z.object({
  name: text(100).pipe(z.string().min(2, "Please enter your name.")),
  email: text(200).pipe(z.string().email("Please enter a valid email address.")),
  company: text(150),
  budget: z.enum(BUDGETS).catch("Not sure yet"),
  message: text(4000).pipe(z.string().min(10, "Please tell me a little more (at least 10 characters).")),
});

export type ContactInput = z.infer<typeof contactSchema>;
