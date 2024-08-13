"use server";
import db from "@/lib/db";
import getDateTime from "@/lib/getDateTime";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";

export async function getProductTitle(id: number) {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    select: {
      title: true,
    },
  });
  if (product) {
    return product;
  } else {
    redirect("/not-found");
  }
}
