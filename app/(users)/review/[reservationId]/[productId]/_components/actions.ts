"use server";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function getReviews({
  reservationId,
  productId,
  userId,
}: {
  reservationId: number;
  productId: number;
  userId: number;
}) {
  //

  let reviews = await db.review.findMany({
    where: {
      reservationId: reservationId,
      productId: productId,
      userId: userId,
    },
  });
  let reservation = await db.reservation.findUnique({
    where: {
      id: reservationId,
    },
  });
  let product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });
  console.log("result", reviews);

  console.log(reviews);
  return { reviews, reservation, product };
}

export async function createReview(data: string) {
  let parserData = JSON.parse(data);
  console.log("parserData", parserData);
  let product = await db.product.findUnique({
    where: {
      id: parserData.productId,
    },
    select: {
      farmId: true,
    },
  });
  let createReview = await db.review.create({
    data: {
      image: parserData.image,
      title: parserData.title,
      point: parserData.point,
      reservationId: parserData.reservationId,
      farm: {
        connect: {
          id: product?.farmId,
        },
      },
      product: {
        connect: {
          id: parserData.productId,
        },
      },
      user: {
        connect: {
          id: parserData.userId,
        },
      },
    },
  });
  return createReview;
}
