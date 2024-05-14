"use server";
import db from "@/lib/db";

export async function getReivewDetail(reviewId: number) {
  let result = await db.review.findUnique({
    where: {
      id: reviewId,
    },
    include: {
      product: true,
      user: true,
    },
  });
  return result;
}

export async function deleteReview(reviewId: number) {
  let result = await db.review.delete({
    where: {
      id: reviewId,
    },
  });
  return result;
}
export async function updateReview({
  reviewId,
  visible,
}: {
  reviewId: number;
  visible: boolean;
}) {
  //
  console.log(reviewId, visible);
  let result = await db.review.update({
    where: {
      id: reviewId,
    },
    data: {
      visible: visible,
    },
  });
  return result;
}
