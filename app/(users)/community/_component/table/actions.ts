"use server";
import db from "@/lib/db";
import { redirect } from "next/navigation";

export async function getCommunity(options: {
  pageIndex: number;
  pageSize: number;
}) {
  const response = await db.$transaction([
    db.community.count({
      where: {
        visible: true,
      },
    }),

    db.community.findMany({
      where: {
        visible: true,
      },
      skip: options.pageSize * options.pageIndex,
      take: options.pageSize,
      orderBy: {
        created_at: "desc", // 내림차순 최신순
      },
    }),
    db.community.findMany({
      where: {
        visible: true,
        isNotice: true,
      },
    }),
  ]);
  const pageCount = response[0];
  const rows = response[1];
  rows.sort((x, y) => {
    return x.isNotice === y.isNotice ? 0 : x.isNotice ? -1 : 1;
  });
  console.log({ pageCount, rows });
  return { pageCount, rows };
}
