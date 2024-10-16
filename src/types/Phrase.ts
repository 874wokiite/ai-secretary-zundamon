import { z } from "zod";

export const phraseScheme = z.object({
  id: z.string(),
  comment: z.string(),
  time: z.date(),
});

export type Phrase = z.infer<typeof phraseScheme>;

export type PhraseMap = {
  [id: string]: Phrase;
};
