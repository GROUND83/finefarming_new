import { z } from "zod";

export const newFarmImageSchema = z.object({
  mainImage: z.object({
    image: z.string(),
    uploadUrl: z.string(),
    downUrl: z.string().nullable(),
    file: z.any(),
  }),
});
export const uploadSchema = z.object({
  mainImage: z.string(),
  id: z.string(),
});
export type newFarmImageSchemaType = z.infer<typeof newFarmImageSchema>;
