"use server";

import db from "@/lib/db";

export async function getMonthly() {
  const monthly = await db.monthly.findMany({
    where: {
      image: {
        not: null,
      },
    },
    select: {
      id: true,
      products: true,
      month: true,
      image: true,
    },

    orderBy: {
      id: "asc",
    },
  });
  return monthly;
}
export async function getMonthlyDetail(monthlyId: number) {
  const monthly = await db.monthly.findUnique({
    where: {
      id: monthlyId,
    },
    select: {
      id: true,
      products: {
        include: { farm: true },
      },
      month: true,
      image: true,
    },
  });
  return monthly;
}
