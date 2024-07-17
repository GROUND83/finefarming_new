import { z } from "zod";

export const baseInfoSchem = z.object({
  title: z.string().nullable(),
  description: z.string().nullable(),
  visible: z.boolean(),
  mainImage: z.object({
    image: z.string().nullable(),
    uploadUrl: z.string().nullable(),
    downUrl: z.string().nullable(),
    file: z.any(),
  }),
  images: z.array(
    z.object({
      image: z.string(),
      uploadUrl: z.string(),
      downUrl: z.string().nullable(),
      file: z.any(),
    })
  ),

  process: z.array(z.object({ title: z.string().nullable() })),
  processNotice: z.string().nullable(),
  priceType: z.string(),
  groupPrice: z.number(),
  groupLimit: z.number().nullable(),
  groupMember: z.array(
    z.object({
      isFree: z.boolean(),
      startAge: z.string(),
      endAge: z.string(),
      message: z.string(),
    })
  ),
  personalPrice: z.array(
    z.object({
      isFree: z.boolean(),
      startAge: z.string(),
      endAge: z.string(),
      price: z.string(),
      message: z.string(),
    })
  ),
  farmInsideType: z.boolean(),
  tools: z.array(z.string()),
  cloth: z.string(),
  educationTitle: z.string(),
  educationData: z.boolean(),
  educationSubject: z.array(
    z.object({
      tag: z.string(),
    })
  ),
});
export const uploadSchema = z.object({
  farmItems: z.string(),
});
export type baseInfoSchemType = z.infer<typeof baseInfoSchem>;
