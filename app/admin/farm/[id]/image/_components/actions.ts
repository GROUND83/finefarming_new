"use server";
import bcrypt from "bcrypt";
import db from "@/lib/db";
import { redirect } from "next/navigation";

import { uploadSchema } from "./newFarmImageSchema";
import getDateTime from "@/lib/getDateTime";

export async function farmImageUpload(formData: FormData) {
  // let images: any = formData.get("images");
  const data = {
    mainImage: formData.get("mainImage"),
    // images: JSON.parse(images),
    id: formData.get("id"),
  };
  console.log("data", data);
  const result = await uploadSchema.safeParseAsync(data);
  console.log(result);
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    await db.farm.update({
      where: {
        id: Number(data.id),
      },
      data: {
        mainImage: result.data.mainImage,
        updated_at: getDateTime(),
      },
    });
    redirect(`/admin/farm/${data.id}/image`);
  }
}

export async function getFarmImages(id: number) {
  console.log("id", id);
  let farm = await db.farm.findUnique({
    where: {
      id: id,
    },
    select: {
      images: true,
      mainImage: true,
    },
  });
  console.log("farm", farm);
  return farm;
}
