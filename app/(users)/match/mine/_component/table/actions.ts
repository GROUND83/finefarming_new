"use server";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function getMineMatch(options: {
  pageIndex: number;
  pageSize: number;
}) {
  let session = await getServerSession(authOptions);
  let user = await db.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });
  console.log("user", user);
  const response = await db.$transaction([
    db.matching.count({
      where: {
        visible: true,
        userId: user?.id,
      },
    }),

    db.matching.findMany({
      where: {
        visible: true,
        userId: user?.id,
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
