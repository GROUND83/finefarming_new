"use server";

import db from "@/lib/db";

export async function getProducts() {
  const products = await db.product.findMany({
    where: {
      visible: true,
    },
    include: {
      subProduct: true,
      farm: true,
    },
  });
  return products;
}
