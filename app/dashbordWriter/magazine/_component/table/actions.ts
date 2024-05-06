"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";

export async function getMoreData(options: {
  pageIndex: number;
  pageSize: number;
}) {
  const user = await getSession();
  console.log("user", user);
  const response = await db.$transaction([
    db.magazine.count(),
    db.magazine.findMany({
      where: {
        authorId: user.id,
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
