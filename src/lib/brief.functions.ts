import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { LANGS } from "./i18n";

const briefSchema = z.object({
  brief: z.string().trim().min(20).max(4000),
  lang: z.enum(LANGS),
});

export const proposeApproach = createServerFn({ method: "POST" })
  .inputValidator((data) => briefSchema.parse(data))
  .handler(async ({ data }) => {
    const { generateBriefProposal } = await import("./brief.server");
    try {
      return { ok: true as const, text: await generateBriefProposal(data.brief, data.lang) };
    } catch (error) {
      console.error("brief proposal failed", error);
      return { ok: false as const, text: "" };
    }
  });
