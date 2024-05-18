import { z } from "zod";

export const bannerShema = z.object({
  id: z.number().optional(),
  type: z.string(),
  title: z.string(),
  description: z.string(),
  detailDescription: z.string(),
  period: z.string(),
  image: z.string(),
  visible: z.boolean(),
});

export type bannerShemaType = z.infer<typeof bannerShema>;
