import db from "@/lib/db";
import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  if (
    req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let koreanSelectDay = dayjs().toISOString();
  let plusDay = dayjs().add(1, "day").toISOString();
  console.log("koreanSelectDay", koreanSelectDay, "plusDay", plusDay);
  let reservavtion = await db.reservation.findMany({
    where: {
      status: "complete",
      checkInDate: {
        gte: koreanSelectDay,
        lt: plusDay,
      },
    },
    include: {
      farm: {
        include: {
          owner: {
            select: {
              email: true,
              username: true,
              phone: true,
              id: true,
            },
          },
        },
      },
    },
  });
  return NextResponse.json({ ok: true, data: reservavtion });
}
