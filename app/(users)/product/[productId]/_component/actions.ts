"use server";

import db from "@/lib/db";

export async function getProductDetail(productId: number) {
  const products = await db.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      subProduct: true,
      farm: true,
    },
  });
  return products;
}
