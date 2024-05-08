"use server";

import db from "@/lib/db";

export async function getReservationDetail(reservatonId: number) {
  const reservation = await db.reservation.findUnique({
    where: {
      id: reservatonId,
    },
    include: {
      farm: {
        select: {
          refundPolicy: true,
          name: true,
          id: true,
          address: true,
          reservationMin: true,
        },
      },
      user: {
        select: {
          id: true,
          username: true,
          phone: true,
          email: true,
        },
      },
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
  return JSON.stringify({ reservation, product });
}
