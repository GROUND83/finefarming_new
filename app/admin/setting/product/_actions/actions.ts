"use server";

import db from "@/lib/db";

export async function getProducts() {
  const products = await db.product.findMany({
    select: {
      id: true,
      mainImage: true,
      title: true,
      description: true,
      visible: true,
      subProduct: true,
      farm: {
        select: {
          name: true,
          sido: true,
          sigungu: true,
          visible: true,
        },
      },
      educationSubject: true,
      order: true,
    },
    where: {
      visible: true,
      farm: {
        visible: true,
      },
    },
    orderBy: {
      order: "asc",
    },
  });
  return products;
}
export async function updateProductOrder({
  productId,
  value,
}: {
  productId: number;
  value: number;
}) {
  const products = await db.product.update({
    where: {
      id: productId,
    },
    data: {
      order: value,
    },
  });
  return products;
}
