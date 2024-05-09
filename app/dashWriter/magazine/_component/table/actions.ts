"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { getToken } from "next-auth/jwt";

export async function getMoreData(options: {
  pageIndex: number;
  pageSize: number;
  userId: number | undefined;
}) {
  const response = await db.$transaction([
    db.magazine.count(),
    db.magazine.findMany({
      where: {
        authorId: options.userId,
      },
      include: {
        farm: {
          select: {
            name: true,
          },
        },
        product: {
          select: {
            title: true,
          },
        },
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
}
