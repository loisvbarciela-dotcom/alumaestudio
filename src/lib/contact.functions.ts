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
    try {
      const { sendTemplateEmail } = await import("@/lib/email-templates/send-email");
      await sendTemplateEmail("contact-notification", "alumagalicia@gmail.com", {
        templateData: {
          name: data.name,
          email: data.email,
          projectType: data.projectType,
          message: data.message,
          lang: data.lang,
        },
        idempotencyKey: `contact-${data.email}-${data.message.slice(0, 64)}`,
        replyTo: data.email,
      });
    } catch (emailError) {
      // The message is safely stored; a failed notification must not fail the submission.
      console.error("contact notification email failed", emailError);
    }
    return { ok: true };
  });
