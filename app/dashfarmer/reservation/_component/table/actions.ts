"use server";

import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { getServerSession } from "next-auth";

export async function getMoreData(options: {
  pageIndex: number;
  pageSize: number;
}) {
  const session = await getServerSession(authOptions);
  console.log("session", session);
  if (session?.user) {
    const response = await db.$transaction([
      db.reservation.count(),
      db.reservation.findMany({
        where: { farmerId: session?.user.id },
        select: {
          id: true,
          reservationNumber: true,
          farm: true,
          farmName: true,
          user: true,
          visitor: true,
          visitorPhone: true,
          status: true,
          checkInDate: true,
          checkInTime: true,
          sendDate: true,
          created_at: true,
          product: {
            select: {
              title: true,
              id: true,
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
  } else {
    return null;
  }
}
