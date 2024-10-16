import { z } from "zod";

export const summaryScheme = z.object({
  comment: z.string(),
  feeling: z.enum(["1", "2", "3"]),
});

export type Summary = z.infer<typeof summaryScheme>;
