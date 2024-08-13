import { z } from "zod";

export const baseInfoSchem = z.object({
  mainImage: z.string().optional(),
  images: z.array(
    z.object({
      image: z.string().optional(),
    })
  ),
});

export type baseInfoSchemType = z.infer<typeof baseInfoSchem>;
