"use server";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import { refundSchema } from "./editSchema";

import getDateTime from "@/lib/getDateTime";

export async function getOpenData(id: number) {
  let farm = await db.farm.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      refundPolicy: true,
    },
  });
  console.log("farm", farm);
  if (farm) {
    return JSON.stringify(farm);
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
          let response = await db.farm.update({
            where: {
              id: Number(id),
            },
            data: {
              refundPolicy: result.data.refundPolicy,
              updated_at: getDateTime(),
            },
          });
          console.log("response", response);
          return resolve(response);
        } catch (e: any) {
          console.log(e);
        }
      }
    }
  });
}
