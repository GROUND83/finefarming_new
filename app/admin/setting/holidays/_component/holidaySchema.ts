import { z } from "zod";

export const holidaySchema = z.object({
  holidays: z.array(
    z.object({
      dateName: z.string(),
      locdate: z.string(),
      year: z.string(),
      month: z.string(),
      day: z.string(),
    })
  ),
});

export type holidaySchemaType = z.infer<typeof holidaySchema>;
