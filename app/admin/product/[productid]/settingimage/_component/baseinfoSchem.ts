import { z } from "zod";

export const baseInfoSchem = z.object({
  mainImage: z.object({
    image: z.string().optional(),
    uploadUrl: z.string().optional(),
    downUrl: z.string().optional(),
    file: z.instanceof(File).optional(),
  }),
  images: z.array(
    z.object({
      image: z.string().optional(),
      uploadUrl: z.string().optional(),
      downUrl: z.string().optional(),
      file: z.instanceof(File).optional(),
    })
  ),
});

export type baseInfoSchemType = z.infer<typeof baseInfoSchem>;
