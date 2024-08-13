"use server";
import db from "@/lib/db";

import { redirect } from "next/navigation";
// import { productNewSchema } from "./newSchema";
import { type Prisma } from "@prisma/client";
import getDateTime from "@/lib/getDateTime";

export async function getMoreData(options: {
  pageIndex: number;
  pageSize: number;
}) {
  //
  // console.log(options.pageIndex);
  const response = await db.$transaction([
    db.matching.count(),
    db.matching.findMany({
      include: {
        user: { select: { username: true, email: true } },
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
  console.log("row", rows);
  console.log({ pageCount, rows });
  return { pageCount, rows };
}
