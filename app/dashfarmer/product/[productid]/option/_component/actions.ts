"use server";
import db from "@/lib/db";
import getDateTime from "@/lib/getDateTime";
import { redirect } from "next/navigation";

export async function getOptionProduct(id: number) {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    select: {
      subProduct: true,
    },
  });
  console.log("product", product);
  if (product) {
    return product.subProduct;
  } else {
    // redirect("/not-found");
  }
}
export async function upDateOptionProduct(formData: FormData) {
  const productId: any = formData.get("productId");
  const newData: any = formData.get("newData");
  // 1.먼제 서브 프로덕트 삭제
  // 2. 서브 업데이트
  const arrays = JSON.parse(newData);
  console.log("arrays", arrays, arrays.selectProducts);
  let newArrays = [];
  for (const optionProduct of arrays) {
    newArrays.push({
      ...optionProduct,
      productId: Number(productId),
      created_at: getDateTime(),
      updated_at: getDateTime(),
    });
    console.log(optionProduct.selectProducts);
  }
  //
  const delelteSubProduct = await db.subOptionProduct.deleteMany({
    where: {
      productId: Number(productId),
    },
  });

  const product = await db.subOptionProduct.createMany({
    data: newArrays,
  });

  console.log("product", product);
  if (product) {
    return product;
  } else {
    // redirect("/not-found");
  }
  return;
}
