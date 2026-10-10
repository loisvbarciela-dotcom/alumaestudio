import { createServerFn } from "@tanstack/react-start";
import { contactSchema } from "./contact-schema";

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((data) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("contact_messages").insert({
      name: data.name,
      email: data.email,
      phone: data.phone ?? null,
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
