import { z } from "zod";
import { LANGS } from "./i18n";

export const contactSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  phone: z.string().trim().max(40).optional(),
  projectType: z.string().trim().min(1).max(100),
  message: z.string().trim().min(1).max(5000),
  lang: z.enum(LANGS),
});