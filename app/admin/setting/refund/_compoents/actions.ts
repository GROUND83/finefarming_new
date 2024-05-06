"use server";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import { refundSchema } from "./editSchema";
import { ParkingType } from "@prisma/client";
import getDateTime from "@/lib/getDateTime";

export async function getDefaultRefund() {
  let farm = await db.refundPolicy.findMany();
  console.log("farm", farm);
  if (farm) {
    let newdata = JSON.stringify(farm);
    return newdata;
  } else {
    redirect("/not-found");
  }
}

export async function updateData(formData: FormData) {
  return new Promise(async (resolve, reject) => {
    const id: any = formData.get("id");
    const data: any = formData.get("newData");

    let dataParser = await JSON.parse(data);
    console.log("dataparser", dataParser, typeof dataParser);

    const result = await refundSchema.safeParseAsync(dataParser);
    console.log(result);
    if (!result.success) {
      console.log(result.error.flatten());
      return result.error.flatten();
    } else {
      if (result.data) {
        try {
          let response = await db.refundPolicy.update({
            where: {
              id: Number(result.data.id),
            },
            data: {
              content: result.data.refundPolicy,
              updated_at: getDateTime(),
            },
          });
          console.log("response", response);
          let newdata = JSON.stringify(response);
          resolve(newdata);
        } catch (e: any) {
          console.log(e);
          reject(e);
        }
      }
    }
  });
}
