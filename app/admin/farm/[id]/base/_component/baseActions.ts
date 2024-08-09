"use server";
import db from "@/lib/db";

import { redirect } from "next/navigation";

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
      mainImage: true,
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
    id: Number(formData.get("id")) as number,
    name: formData.get("name") as string,
    visible: formData.get("visible") === "true" ? true : false,
    initail: formData.get("initail") as string,
    companyNumber: formData.get("companyNumber") as string,
    address: formData.get("address") as string,
    mainPhone: formData.get("mainPhone") as string,
    resevationManager: formData.get("resevationManager") as string,
    resevationPhone: formData.get("resevationPhone") as string,
    farmerId: formData.get("farmerId") as string,
    farmerName: formData.get("farmerName") as string,
    farmerPhone: formData.get("farmerPhone") as string,
    introduction: formData.get("introduction") as string,
    lat: formData.get("lat") as string,
    lang: formData.get("lang") as string,
    sigungu: formData.get("sigungu") as string,
    sido: formData.get("sido") as string,
    mainImage: formData.get("mainImage") as string,
  };
  console.log("data", data);

  try {
    let response = await db.farm.update({
      where: {
        id: Number(data.id),
      },
      data: {
        name: data.name || "",
        visible: data.visible || false,
        initail: data.initail || "",
        companyNumber: data.companyNumber || "",
        address: data.address || "",
        mainPhone: data.mainPhone || "",
        resevationManager: data.resevationManager || "",
        resevationPhone: data.resevationPhone || "",
        introduction: data.introduction || "",
        lat: data.lat || "",
        lang: data.lang || "",
        sigungu: data.sigungu || "",
        sido: data.sido || "",
        owner: { connect: { id: Number(data.farmerId) } },
        updated_at: getDateTime(),
        mainImage: data.mainImage ? data.mainImage : null,
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
    if (!data.visible) {
      await db.product.updateMany({
        where: {
          farmId: Number(data.id),
        },
        data: {
          visible: data.visible,
          updated_at: getDateTime(),
        },
      });
      await db.magazine.updateMany({
        where: {
          farmId: Number(data.id),
        },
        data: {
          visible: data.visible,
          updated_at: getDateTime(),
        },
      });
      await db.review.updateMany({
        where: {
          farmId: Number(data.id),
        },
        data: {
          visible: data.visible,
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
