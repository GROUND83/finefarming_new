import { z } from "zod";

export const newFarmImageSchema = z.object({
  title: z.string(),
  description: z.string(),
  visible: z.boolean().default(false),
  image: z.string().optional(),
});
export const uploadSchema = z.object({
  mainImage: z.string(),
  id: z.string(),
});

export const editEventSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  visible: z.boolean().default(false),
  image: z.string().optional(),
});
export type editEventSchemaType = z.infer<typeof editEventSchema>;

export type newFarmImageSchemaType = z.infer<typeof newFarmImageSchema>;
