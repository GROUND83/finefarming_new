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
      products: true,
      month: true,
      image: true,
    },
  });
  if (monthly) {
    let newArray = [];
    let products = monthly.products as any;
    for (const product of products) {
      if (product?.id) {
        let productdata = await db.product.findUnique({
          where: {
            id: Number(product.id) as any,
          },
          include: {
            farm: true,
          },
        });
        newArray.push(productdata);
      }
    }
    let newMonthly = { ...monthly, newProducts: newArray };
    // monthly.newProducts = newArray
    console.log("newMonthly", newMonthly);
    return newMonthly;
  }
}
