"use server";
import db from "@/lib/db";

import { redirect } from "next/navigation";
import { editSchema } from "../baseSchema";
import getDateTime from "@/lib/getDateTime";

export async function getFarmers() {
  const farmer = await db.farmer.findMany({
    where: {
      approve: true,
    },
    select: {
      username: true,
      phone: true,
      id: true,
    },
  });
  if (farmer) {
    return farmer;
  } else {
    redirect("/not-found");
  }
}
export async function getBaseData(id: number) {
  const farmer = await db.farm.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      visible: true,
      initail: true,
      companyNumber: true,
      address: true,
      mainPhone: true,
      resevationManager: true,
      resevationPhone: true,
      introduction: true,
      lat: true,
      lang: true,
      sido: true,
      sigungu: true,
      owner: {
        select: {
          username: true,
          phone: true,
          id: true,
        },
      },
    },
  });
  if (farmer) {
    return farmer;
  } else {
    redirect("/not-found");
  }
}

export async function updateData(formData: FormData) {
  const data = {
    id: Number(formData.get("id")),
    name: formData.get("name"),
    visible: formData.get("visible") === "true" ? true : false,
    initail: formData.get("initail"),
    companyNumber: formData.get("companyNumber"),
    address: formData.get("address"),
    mainPhone: formData.get("mainPhone"),
    resevationManager: formData.get("resevationManager"),
    resevationPhone: formData.get("resevationPhone"),
    farmerId: formData.get("farmerId"),
    farmerName: formData.get("farmerName"),
    farmerPhone: formData.get("farmerPhone"),
    introduction: formData.get("introduction"),
    lat: formData.get("lat"),
    lang: formData.get("lang"),
    sigungu: formData.get("sigungu"),
    sido: formData.get("sido"),
  };
  console.log("data", data);
  const result = await editSchema.safeParseAsync(data);
  console.log(result);
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    if (result.data.id) {
      try {
        let response = await db.farm.update({
          where: {
            id: Number(data.id),
          },
          data: {
            name: result.data.name,
            visible: result.data.visible,
            initail: result.data.initail,
            companyNumber: result.data.companyNumber,
            address: result.data.address,
            mainPhone: result.data.mainPhone,
            resevationManager: result.data.resevationManager,
            resevationPhone: result.data.resevationPhone,
            introduction: result.data.introduction,
            lat: result.data.lat,
            lang: result.data.lang,
            sigungu: result.data.sigungu,
            sido: result.data.sido,
            owner: { connect: { id: Number(result.data.farmerId) } },
            updated_at: getDateTime(),
          },
          select: {
            products: {
              select: {
                id: true,
              },
            },
            magazines: {
              select: {
                id: true,
              },
            },
          },
        });
        if (!result.data.visible) {
          await db.product.updateMany({
            where: {
              farmId: Number(data.id),
            },
            data: {
              visible: result.data.visible,
              updated_at: getDateTime(),
            },
          });
          await db.magazine.updateMany({
            where: {
              farmId: Number(data.id),
            },
            data: {
              visible: result.data.visible,
              updated_at: getDateTime(),
            },
          });
          await db.review.updateMany({
            where: {
              farmId: Number(data.id),
            },
            data: {
              visible: result.data.visible,
              updated_at: getDateTime(),
            },
          });
        }
        console.log("response", response);
        return response;
      } catch (e: any) {
        console.log(e);
        return { error: e };
      }
    } else {
      return { error: "id error" };
    }
  }
}
export async function deleteFarm(id: number) {
  const farmer = await db.farm.delete({
    where: {
      id,
    },
  });
  if (farmer) {
    return farmer;
  } else {
    redirect("/not-found");
  }
}
