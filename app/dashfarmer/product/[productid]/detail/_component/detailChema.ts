import { z } from "zod";

export const detailSchema = z.object({
  image: z.object({
    image: z.string(),
    uploadUrl: z.string(),
    downUrl: z.string(),
    file: z.any(),
  }),
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
          uploadUrl: z.string(),
          downUrl: z.string(),
          file: z.any(),
        })
      ),
    })
  ),
});
export const uploadSchema = z.object({
  detail: z.string(),
});
export type detailSchemaType = z.infer<typeof detailSchema>;
