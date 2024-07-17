"use server";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import { editSchema } from "./editSchema";
import { ParkingType } from "@prisma/client";
import getDateTime from "@/lib/getDateTime";

export async function getFacilityInitData(id: number) {
  let facility = await db.facility.findMany({
    select: { title: true, id: true },
  }); // 구비시설
  let farmItem = await db.farmItem.findMany({
    select: { title: true, id: true },
  }); // 체험품종
  let farm = await db.farm.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      farmItems: true,
      parking: true,
      parkinngFee: true,
      facilities: true,
      pet: true,
    },
  });
  console.log("farm", farm);
  if (farm) {
    return { facility, farmItem, farm };
  } else {
    redirect("/not-found");
  }
}

export async function updateData(formData: FormData) {
  return new Promise(async (resolve, reject) => {
    const data: any = formData.get("newData");

    let dataParser = await JSON.parse(data);
    console.log("dataparser", dataParser, typeof dataParser);

    const result = await editSchema.safeParseAsync(dataParser);
    console.log(result);
    if (!result.success) {
      console.log(result.error.flatten());
      return result.error.flatten();
    } else {
      if (result.data) {
        try {
          let response = await db.farm.update({
            where: {
              id: result.data.id,
            },
            data: {
              farmItems: result.data.farmItems,
              parking:
                result.data.parking === "paid"
                  ? ParkingType.paid
                  : result.data.parking === "noPark"
                  ? ParkingType.noPark
                  : ParkingType.free,
              parkinngFee: result.data.parkinngFee,
              facilities: result.data.facilities,
              pet: result.data.pet,
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
