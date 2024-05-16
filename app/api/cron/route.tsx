import db from "@/lib/db";
import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  console.log("get");
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json(
      { message: "Unauthorized" },
      {
        status: 401,
      }
    );
  }

  // sendDate 검색
  // sendData은 checkInDate의 농장 최소 예약 가능일  -1 =>예약 발생할때 넣을것

  // 검색 후 메일 발송 => 시간대별로 그룹핑해서 리스트 형식으로
  // 각 농장 방송
  // post 포스트맨으로 테스트

  let koreanSelectDay = dayjs().minute(0).second(0).toISOString(); // utc
  let plusDay = dayjs().add(1, "day").toISOString();
  console.log("koreanSelectDay", koreanSelectDay, "plusDay", plusDay);
  let reservations = await db.reservation.findMany({
    where: {
      status: "complete",
      checkInDate: { gte: koreanSelectDay, lt: plusDay },
    },
    include: {
      farm: {
        select: {
          reservationMin: true,
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
  return NextResponse.json({ message: reservations }, { status: 200 });
}
