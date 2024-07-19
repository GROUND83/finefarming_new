import { z } from "zod";

export const baseSchem = z.object({
  id: z.number(),
  name: z.string(),
  visible: z.boolean(),
  initail: z.string(),
  companyNumber: z.string().nullable(),
  address: z.string(),
  mainPhone: z.string(),
  resevationManager: z.string(),
  resevationPhone: z.string(),
  farmerId: z.string(),
  farmerName: z.string(),
  farmerPhone: z.string(),
  introduction: z.string(),
  lat: z.string(),
  lang: z.string(),
  sigungu: z.string(),
  sido: z.string(),
});
export const editSchema = z.object({
  id: z.number(),
  name: z.string(),
  visible: z.boolean(),
  initail: z.string(),
  companyNumber: z.string().nullable(),
  address: z.string(),
  mainPhone: z.string(),
  resevationManager: z.string(),
  resevationPhone: z.string(),
  farmerId: z.string(),
  farmerName: z.string(),
  farmerPhone: z.string(),
  introduction: z.string(),
  lat: z.string(),
  lang: z.string(),
  sigungu: z.string(),
  sido: z.string(),
});
export type baseSchemType = z.infer<typeof baseSchem>;