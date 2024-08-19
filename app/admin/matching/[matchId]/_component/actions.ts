"use server";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";

export async function getMatchDetail(matchId: string) {
  const product = await db.matching.findUnique({
    where: {
      id: Number(matchId),
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          email: true,
        },
      },
    },
  });
  if (product) {
    return product;
  } else {
    redirect("/not-found");
  }
}
export async function deleteMathch(matchId: string) {
  const product = await db.matching.delete({
    where: {
      id: Number(matchId),
    },
  });
  if (product) {
    return product;
  } else {
    redirect("/not-found");
  }
}
