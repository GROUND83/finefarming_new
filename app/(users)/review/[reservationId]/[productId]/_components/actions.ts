"use server";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function getReviews(data: string) {
  //

  let newData = JSON.parse(data);

  let reviews = await db.review.findMany({
    where: {
      reservationId: newData.reservationId,
      productId: newData.productId,
      userId: newData.userId,
    },
  });
  let reservation = await db.reservation.findUnique({
    where: {
      id: newData.reservationId,
    },
  });
  let product = await db.product.findUnique({
    where: {
      id: newData.productId,
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
