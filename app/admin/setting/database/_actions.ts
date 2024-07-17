"use server";

import db from "@/lib/db";

export async function getFarm() {
  let farm = await db.farm.findMany({
    include: {
      owner: true,
    },
    orderBy: {
      created_at: "desc", // 내림차순 최신순
    },
  });

  return farm;
}

export async function getProducts() {
  let farm = await db.product.findMany({
    include: {
      farm: true,
    },
    orderBy: {
      created_at: "desc", // 내림차순 최신순
    },
  });

  return farm;
}
