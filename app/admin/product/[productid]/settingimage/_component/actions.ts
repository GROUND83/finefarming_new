"use server";
import db from "@/lib/db";
import getDateTime from "@/lib/getDateTime";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
export async function getProductImages(id: number) {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    select: {
      wholeImages: true,
    },
  });
  if (product) {
    return product;
  } else {
    redirect("/not-found");
  }
}
export async function createBaseImageProduct(formData: FormData) {
  let imagesArray = formData.get("imagesArray") as string;
  let imagesArrayParser = JSON.parse(imagesArray);

  let productId = Number(formData.get("productId"));
  // let product = await db.product.findUnique({
  //   where: {
  //     id: productId,
  //   },
  // });

  console.log("imagesArrayParser", imagesArrayParser);
  if (imagesArrayParser.length > 0) {
    // let parserMainImage = JSON.parse(mainImage);
    let product = await db.product.update({
      where: {
        id: productId,
      },
      data: {
        wholeImages: imagesArrayParser,
        updated_at: getDateTime(),
      },
    });
    return product;
  }
}
export async function createBaseImageSettingProduct(formData: FormData) {
  let mainImage = formData.get("mainImage") as string;
  let imagesArray = formData.get("imagesArray") as string;
  let imagesArrayParser = JSON.parse(imagesArray);

  let productId = Number(formData.get("productId"));

  console.log("imagesArrayParser", imagesArrayParser);
  let newArray = [];
  if (imagesArrayParser.length > 0) {
    for (const imagesArray of imagesArrayParser) {
      newArray.push(imagesArray.image);
    }
  }
  let product = await db.product.update({
    where: {
      id: productId,
    },
    data: {
      mainImage: mainImage,
      images: newArray,
      updated_at: getDateTime(),
    },
  });
  return product;
}
export async function getProductBase(id: number) {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    select: {
      mainImage: true,
      images: true,
      wholeImages: true,
    },
  });
  if (product) {
    return product;
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
