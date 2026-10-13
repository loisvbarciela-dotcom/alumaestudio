import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import type { Lang } from "./i18n";

const LANG_NAMES: Record<Lang, string> = { gl: "Galician", es: "Spanish", en: "English", ru: "Russian" };

const INSTRUCTIONS = `You are the creative producer of ALUMA, a hybrid film studio in Galicia, Spain.
ALUMA's method: "We film what has soul (faces, skin, product, real places) · We generate with AI what would be impossible or out of reach · We integrate seamlessly, and show the seams anyway." Every piece ships with a breakdown of what was filmed vs generated. ALUMA complies with the EU AI Act, marks synthetic content where required and only uses real people's likeness with explicit written consent.
Given a client's campaign brief, propose a hybrid audiovisual production approach. Structure, with short headings:
1. Creative idea (one line + short paragraph)
2. What we film (live action)
3. What we generate (AI)
4. How we integrate
5. Deliverables and formats (by channel)
6. Phases of the process
7. Questions to refine the brief
Be concrete and cinematic, concise (max ~400 words). Never invent prices, budgets, deadlines, clients or past results. Plain text, headings on their own line, bullets starting with "· ".`;

export async function generateBriefProposal(brief: string, lang: Lang): Promise<string> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) throw new Error("missing_key");
  let runId: string | undefined;
  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: async (input, init) => {
      const headers = new Headers(init?.headers);
      if (runId) headers.set("X-Lovable-AIG-Run-ID", runId);
      const res = await fetch(input, { ...init, headers });
      runId ??= res.headers.get("X-Lovable-AIG-Run-ID") ?? undefined;
      return res;
    },
  });
  const result = streamText({
    model: provider.responses("openai/gpt-6-astra"),
    system: `${INSTRUCTIONS}\nAlways answer in ${LANG_NAMES[lang]}.`,
    messages: [{ role: "user", content: brief }],
    maxRetries: 0,
    providerOptions: {
      openai: {
        forceReasoning: true,
        reasoningEffort: "low",
        reasoningSummary: "auto",
        store: false,
        include: ["reasoning.encrypted_content"],
      },
    },
  });
  const text = (await result.text).trim();
  if (!text) throw new Error("empty");
  return text;
}
