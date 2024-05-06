import { z } from "zod";

export const calenderSchema = z.object({
  reservationDate: z.array(
    z.object({
      id: z.number().optional(),
      visible: z.boolean(),
      amount: z.number().min(0, { message: "0 이상의 값을 입력하세요." }),
      startTime: z.string().min(1, { message: "시간을 선택하세요." }),
      count: z.number().nullable(),
      date: z.union([z.date(), z.string()]).optional(),
    })
  ),
});

export type calenderSchemaType = z.infer<typeof calenderSchema>;
