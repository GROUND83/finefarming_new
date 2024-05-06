"use server";
import db from "@/lib/db";
import getDateTime from "@/lib/getDateTime";
import { redirect } from "next/navigation";

export async function updateDetailProduct(JsonData: string) {
  //
  // let productId = Number(formData.get("productId"));
  // let detail = formData.get("detail");
  let parser = JSON.parse(JsonData);
  console.log("parser", JsonData);
  if (parser.productId && parser.data) {
    let updateProduct = await db.product.update({
      where: {
        id: parser.productId,
      },
      data: {
        detail: parser.data,
        updated_at: getDateTime(),
      },
    });
    return true;
  }
  return true;
}
export async function getProductDetail(productId: number) {
  //

  if (productId) {
    let product = await db.product.findUnique({
      where: {
        id: productId,
      },
      select: {
        farm: {
          select: {
            refundPolicy: true,
          },
        },
        priceType: true,
        personalPrice: true,
        groupLimit: true,
        groupPrice: true,
        detail: true,
        subProduct: true,
        process: true,
        processNotice: true,
      },
    });
    console.log(product);
    return product;
  }
  return true;
}
