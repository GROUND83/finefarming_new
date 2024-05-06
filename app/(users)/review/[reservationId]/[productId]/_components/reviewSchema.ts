import { z } from "zod";

export const reviewSchem = z.object({
  title: z.string(),
  point: z.number(),
  image: z.object({
    image: z.string({ required_error: "사진은 필수 항목입니다." }),
    uploadUrl: z.string(),
    downUrl: z.string(),
    file: z.any(),
  }),
});

export type reviewSchemType = z.infer<typeof reviewSchem>;
