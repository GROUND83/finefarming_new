import { z } from "zod";

export const editSchema = z.object({
  reservationMax: z
    .number()
    .min(0, { message: "0 이상의 값을 입력하세요." })
    .max(90, { message: "90 이하의 값을 입력하세요." }),
  reservationMin: z
    .number()
    .min(1, { message: "1 이상의 값을 입력하세요." })
    .max(10, { message: "10 이하의 값을 입력하세요." }),
  slot: z.array(
    z.object({
      visible: z.boolean(),
      amount: z.number().min(1, { message: "기본수량을 선택하세요." }),
      startTime: z.string().min(1, { message: "시작시간을 선택하세요." }),
    })
  ),
});

export type editSchemaType = z.infer<typeof editSchema>;
