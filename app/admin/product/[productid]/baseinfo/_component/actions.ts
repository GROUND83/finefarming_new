"use server";
import db from "@/lib/db";
import getDateTime from "@/lib/getDateTime";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";

export async function getProductBase(id: number) {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    select: {
      title: true,
      description: true,
      visible: true,
      mainImage: true,
      images: true,
      process: true,
      status: true,
      processNotice: true,
      priceType: true,
      groupPrice: true,
      personalPrice: true,
      groupMember: true,
      groupLimit: true,
      farmInsideType: true,
      tools: true,
      cloth: true,
      educationTitle: true,
      educationData: true,
      educationSubject: true,
    },
  });
  if (product) {
    product.personalPrice as Prisma.JsonArray;
    product.groupMember as Prisma.JsonArray;
    return product;
  } else {
    redirect("/not-found");
  }
}
export async function getTools() {
  const tools = await db.tool.findMany({
    select: {
      id: true,
      title: true,
    },
  });
  if (tools) {
    console.log("tools", tools);
    return tools;
  } else {
    redirect("/not-found");
  }
}
export async function createBaseProduct(formData: FormData) {
  let data: any = formData.get("newData");
  let mainImage = formData.get("mainImage") as string;
  let imagesArray = formData.get("imagesArray") as string;
  let imagesArrayParser = JSON.parse(imagesArray);

  let productId = Number(formData.get("productId"));
  // let product = await db.product.findUnique({
  //   where: {
  //     id: productId,
  //   },
  // });
  console.log(data);
  if (data) {
    let parserData = JSON.parse(data);
    console.log("parserData", parserData);
    if (mainImage) {
      // let parserMainImage = JSON.parse(mainImage);
      let product = await db.product.update({
        where: {
          id: productId,
        },
        data: {
          ...parserData,
          mainImage: mainImage,
          groupLimit: parserData.groupLimit ? Number(parserData.groupLimit) : 0,
          created_at: getDateTime(),
          updated_at: getDateTime(),
        },
      });
      // return product;
    }
    console.log("imagesArrayParser", imagesArrayParser);
    if (imagesArrayParser.length > 0) {
      // let parserMainImage = JSON.parse(mainImage);
      let product = await db.product.update({
        where: {
          id: productId,
        },
        data: {
          ...parserData,
          images: imagesArrayParser,
          groupLimit: parserData.groupLimit ? Number(parserData.groupLimit) : 0,
          created_at: getDateTime(),
          updated_at: getDateTime(),
        },
      });
      return product;
    }
  }
}

export async function deleteProduct(formData: FormData) {
  //
  let productId = Number(formData.get("productId"));
  if (productId) {
    let deleteProduct = await db.product.delete({
      where: {
        id: Number(productId),
      },
    });
    return true;
  }
  return true;
}
