"use server";

import db from "@/lib/db";

export async function getReservationDetail(reservatonId: number) {
  const reservation = await db.reservation.findUnique({
    where: {
      id: reservatonId,
    },
    include: {
      farm: true,
      user: true,
    },
  });
  const product = await db.product.findUnique({
    where: {
      id: reservation?.productId,
    },
    include: {
      farm: true,
    },
  });
  return { reservation, product };
}
