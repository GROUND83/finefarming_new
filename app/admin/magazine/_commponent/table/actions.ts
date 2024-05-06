"use server";

import db from "@/lib/db";
import getDateTime from "@/lib/getDateTime";
import { redirect } from "next/navigation";

export async function getMoreData(options: {
  pageIndex: number;
  pageSize: number;
}) {
  const response = await db.$transaction([
    db.magazine.count(),
    db.magazine.findMany({
      include: {
        author: {
          select: {
            id: true,
            username: true,
            avatar: true,
            email: true,
            approve: true,
          },
        },
        product: {
          select: {
            id: true,
            title: true,
          },
        },
        farm: {
          select: {
            id: true,
            name: true,
            mainPhone: true,
            mainImage: true,
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
