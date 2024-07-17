"use server";

import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { getServerSession } from "next-auth";

export async function getMoreData(options: {
  pageIndex: number;
  pageSize: number;
}) {
  //
  const session = await getServerSession(authOptions);
  console.log("session", session);
  if (session?.user) {
    const response = await db.$transaction([
      db.product.count(),
      db.product.findMany({
        where: {
          farmerId: session?.user.id,
        },
        select: {
          farm: {
            select: {
              name: true,
            },
          },
          created_at: true,
          id: true,
          visible: true,
          title: true,
        },
        skip: options.pageSize * options.pageIndex,
        take: options.pageSize,
        orderBy: {
          created_at: "desc", // 내림차순 최신순
        },
      }),
    ]);
    const pageCount = response[0];
    const rows = response[1];
    console.log({ pageCount, rows });
    return { pageCount, rows };
  } else {
    return null;
  }
}
