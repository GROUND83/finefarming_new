import { z } from "zod";

export const detailSchema = z.object({
  image: z.string(),
  title: z.string(),
  titleDescription: z.string(),
  sections: z.array(
    z.object({
      subtitle: z.string().nullable(),
      title: z.string().nullable(),
      titleDescription: z.string(),
      images: z.array(
        z.object({
          image: z.string(),
        })
      ),
    })
  ),
});
export const uploadSchema = z.object({
  detail: z.string(),
});
export type detailSchemaType = z.infer<typeof detailSchema>;
