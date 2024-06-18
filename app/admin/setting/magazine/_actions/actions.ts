"use server";

import db from "@/lib/db";

export async function getMagazines() {
  const products = await db.magazine.findMany({
    select: {
      id: true,
      image: true,
      title: true,

      visible: true,
      author: {
        select: {
          username: true,
          avatar: true,
        },
      },
      farm: {
        select: {
          name: true,
          sido: true,
          sigungu: true,
          visible: true,
        },
      },

      order: true,
    },
    where: {
      visible: true,
    },
    orderBy: {
      order: "asc",
    },
  });
  return products;
}
export async function updateMagazineOrder({
  magazineId,
  value,
}: {
  magazineId: number;
  value: number;
}) {
  const products = await db.magazine.update({
    where: {
      id: magazineId,
    },
    data: {
      order: value,
    },
  });
  return products;
}
