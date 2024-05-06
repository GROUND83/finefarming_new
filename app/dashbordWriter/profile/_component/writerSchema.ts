import { z } from "zod";

export const writerSchema = z.object({
  id: z.number(),
  link: z.string(),
  username: z.string(),
  email: z.string(),
  avatar: z.object({
    image: z.string(),
    uploadUrl: z.string(),
    downUrl: z.string(),
    file: z.any(),
  }),
  intruduceTitle: z.string(),
  intruduce: z.string(),
});

export type writerSchemaType = z.infer<typeof writerSchema>;
