import { z } from "zod";

export const magazineSchema = z.object({
  image: z.object({
    image: z.string(),
    uploadUrl: z.string(),
    downUrl: z.string(),
    file: z.any(),
  }),
  title: z.string(),
  sections: z.array(
    z.object({
      title: z.string().nullable(),
      subtitle: z.string().nullable(),
      description: z.string(),
      images: z.array(
        z.object({
          image: z.string(),
          uploadUrl: z.string(),
          downUrl: z.string(),
          file: z.any(),
        })
      ),
    })
  ),
  suggestion: z.array(
    z.object({
      title: z.string().nullable(),
    })
  ),

  productId: z.string(),
});
export const uploadSchema = z.object({
  detail: z.string(),
});
export type magazineSchemaType = z.infer<typeof magazineSchema>;
