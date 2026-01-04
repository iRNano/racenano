import { z } from "zod";

export const OrganizerSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  socials: z.object({
    facebook: z.string().optional(),
    instagram: z.string().optional()
  }),
  verified: z.boolean()
});

export type Organizer = z.infer<typeof OrganizerSchema>;