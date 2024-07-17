"use server";

import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

export async function getMoreData(options: {
  pageIndex: number;
  pageSize: number;
}) {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    const response = await db.$transaction([
      db.farm.count({ where: { ownerId: session?.user.id } }),
      db.farm.findMany({
        where: {
          ownerId: session?.user.id,
        },

        orderBy: {
          created_at: "desc", // 내림차순 최신순
        },
      }),
    ]);
    const pageCount = response[0];
    const rows = response[1];
    console.log({ pageCount, rows });
    return { rows };
  } else {
    return notFound();
  }
}
