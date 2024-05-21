"use server";

import db from "@/lib/db";

export async function getProductDetail(productId: number) {
  const products = await db.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      reviews: {
        where: {
          visible: true,
        },
        include: {
          user: {
            select: {
              username: true,
              avatar: true,
            },
          },
        },
      },
      subProduct: true,
      farm: true,
      event: {
        where: {
          visible: true,
        },
      },
    },
  });
  return products;
}

export async function getReviewDetail(productId: number) {
  const products = await db.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      reviews: {
        where: {
          visible: true,
        },
        include: {
          user: {
            select: {
              username: true,
              avatar: true,
            },
          },
        },
      },
    },
  });
  return products;
}
