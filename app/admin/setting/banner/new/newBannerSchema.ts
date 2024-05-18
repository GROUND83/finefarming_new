import { z } from "zod";

export const newBannerShema = z.object({
  type: z.string(),
  title: z.string(),
  description: z.string(),
  detailDescription: z.string(),
  period: z.string(),
  image: z.string(),
  visible: z.boolean().default(false),
});

export type newBannerShemaType = z.infer<typeof newBannerShema>;
