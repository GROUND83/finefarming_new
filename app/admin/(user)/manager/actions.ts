"use server";
import db from "@/lib/db";

export async function getMoreData(options: {
  pageIndex: number;
  pageSize: number;
}) {
  //
  console.log(options.pageIndex);
  const response = await db.$transaction([
    db.manager.count(),
    db.manager.findMany({
      select: {
        id: true,
        username: true,
        phone: true,
        email: true,
        avatar: true,
        approve: true,
        created_at: true,
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
  return { pageCount, rows };
}
