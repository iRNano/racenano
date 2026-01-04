import { z } from "zod";

export const EventPreset = z.enum([
  "ROAD",
  "NINJA",
  "TRAIL"
]);

export const EventSchema = z.object({
  id: z.string(),
  name: z.string().min(3),
  preset: EventPreset,
  date: z.string(),
  location: z.string(),
  organizerId: z.string(),
  status: z.enum(["DRAFT", "PUBLISHED"]),
  createdAt: z.string()
});

export type Event = z.infer<typeof EventSchema>;