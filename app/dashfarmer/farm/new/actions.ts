"use server";
import makeid from "@/lib/randonString";
import { farmNewSchema } from "./\bfarmNewSchema";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import getDateTime from "@/lib/getDateTime";

export async function createFarm(formData: FormData) {
  let newdata: any = formData.get("newData");
  console.log("newdata", newdata);
  if (newdata) {
    let data = JSON.parse(newdata);
    console.log(data);
    const result = await farmNewSchema.safeParseAsync(data);

    if (!result.success) {
      console.log(result.error.flatten());
      return result.error.flatten();
    } else {
      //
      let uui = makeid(5);

      try {
        let refundarrya = await db.refundPolicy.findMany();
        await db.farm.create({
          data: {
            name: result.data.name,
            initail: uui.toUpperCase(),
            address: result.data.address,
            companyNumber: result.data.companyNumber ?? "",
            mainPhone: result.data.mainPhone,
            resevationManager: result.data.resevationManager,
            resevationPhone: result.data.resevationPhone,
            refundPolicy: refundarrya[0].content,
            owner: {
              connect: {
                id: Number(result.data.farmerId),
              },
            },
            created_at: getDateTime(),
            updated_at: getDateTime(),
          },
        });
      } catch (e) {
        //
      } finally {
        return;
        // redirect("/404");
      }
    }
  }
}

export async function getFarmers() {
  let result = await db.farmer.findMany({
    where: {
      approve: true,
    },
  });
  return result;
}
