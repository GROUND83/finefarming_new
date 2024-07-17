import { z } from "zod";

export const facilitiesSchema = z.object({
  title: z.string(),
  description: z.string(),
  visible: z.boolean(),
  mainImage: z.string(),
  images: z.array(z.string()),
  howto: z.string(),
  priceType: z.string(),
  Price: z.number(),
  farmInsideType: z.string(),
  tools: z.array(z.string()),
  cloth: z.string(),
  educationTitle: z.string(),
  educationData: z.boolean(),
  educationSubject: z.array(z.string()),
});
export const uploadSchema = z.object({
  farmItems: z.string(),
});
export type facilitiesSchemaType = z.infer<typeof facilitiesSchema>;
