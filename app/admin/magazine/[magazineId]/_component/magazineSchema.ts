import { z } from "zod";

export const magazineSchema = z.object({
  visible: z.boolean(),
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
  authorId: z.string(),
  author: z.object({
    id: z.number(),
    username: z.string(),
    link: z.string(),
    intruduceTitle: z.string(),
    intruduce: z.string(),
    avatar: z.string(),
  }),
});
export const uploadSchema = z.object({
  detail: z.string(),
});
export type magazineSchemaType = z.infer<typeof magazineSchema>;
