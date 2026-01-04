import { z } from "zod";

export const RacerSchema = z.object({
  name: z.string(),
  bib: z.string(),
  category: z.string(),
  ageGroup: z.string().optional()
});

export type Racer = z.infer<typeof RacerSchema>;
