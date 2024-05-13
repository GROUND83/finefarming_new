import db from "@/lib/db";
import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json(
      { message: "Unauthorized" },
      {
        status: 401,
      }
    );
  }

  let koreanSelectDay = dayjs().toISOString();
  let plusDay = dayjs().add(1, "day").toISOString();
  let reservations = await db.reservation.findMany({
    where: {
      status: "complete",
      checkInDate: { gte: koreanSelectDay, lt: plusDay },
    },
    include: {
      farm: {
        include: {
          owner: {
            select: {
              id: true,
              email: true,
              phone: true,
            },
          },
        },
      },
    },
  });
  return NextResponse.json({ message: koreanSelectDay }, { status: 200 });
}
