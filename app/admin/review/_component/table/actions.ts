"use server";

import db from "@/lib/db";
import getDateTime from "@/lib/getDateTime";
import { redirect } from "next/navigation";

export async function getMoreData(options: {
  pageIndex: number;
  pageSize: number;
}) {
  const response = await db.$transaction([
    db.review.count(),
    db.review.findMany({
      include: {
        user: true,
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

export async function updateReviewVisible({
  id,
  type,
}: {
  id: number;
  type: boolean;
}) {
  //
  console.log(id);
  let result = await db.review.update({
    where: {
      id,
    },
    data: {
      visible: type,
      updated_at: getDateTime(),
    },
  });
  return redirect("/admin/review");
}
