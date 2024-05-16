"use server";

import db from "../db";

export default async function getSiteMap() {
  let magazine = await db.magazine.findMany({
    where: {
      visible: true,
    },
  });
  let product = await db.product.findMany({
    where: {
      visible: true,
    },
  });
  return { magazine, product };
}
