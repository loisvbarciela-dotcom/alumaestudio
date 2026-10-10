import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  projectType: z.string().trim().min(1).max(100),
  message: z.string().trim().min(1).max(5000),
  lang: z.enum(["gl", "es", "en"]),
});

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((data) => schema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("contact_messages").insert({
      name: data.name,
      email: data.email,
      project_type: data.projectType,
      message: data.message,
      lang: data.lang,
    });
    if (error) {
      console.error("contact insert failed", error);
      throw new Error("save_failed");
    }
    return { ok: true };
  });
