"use server";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import moment from "moment";

export default async function searchDatabase({ type, search }: any) {
  if (type === "reservationNumber") {
    let searchData = await db.reservation.findMany({
      where: {
        reservationNumber: {
          contains: search,
        },
      },
      select: {
        id: true,
        reservationNumber: true,
        farm: {
          select: {
            id: true,
            name: true,
          },
        },
        checkInDate: true,
        created_at: true,
        status: true,
        user: {
          select: {
            id: true,
            username: true,
            phone: true,
            avatar: true,
          },
        },
      },
    });
    console.log("searchData", searchData);
    return searchData;
  } else if (type === "farmName") {
    let searchData = await db.reservation.findMany({
      select: {
        id: true,
        reservationNumber: true,
        farm: {
          select: {
            id: true,
            name: true,
          },
        },
        checkInDate: true,
        created_at: true,
        status: true,
        user: {
          select: {
            id: true,
            username: true,
            phone: true,
            avatar: true,
          },
        },
      },
      where: {
        farm: {
          name: {
            contains: search,
          },
        },
      },
    });
    console.log("searchData", searchData);
    return searchData;
  } else if (type === "userName") {
    let searchData = await db.reservation.findMany({
      select: {
        id: true,
        reservationNumber: true,
        farm: {
          select: {
            id: true,
            name: true,
          },
        },
        checkInDate: true,
        created_at: true,
        status: true,
        user: {
          select: {
            id: true,
            username: true,
            phone: true,
            avatar: true,
          },
        },
      },
      where: {
        user: {
          username: {
            contains: search,
          },
        },
      },
    });
    console.log("searchData", searchData);
    return searchData;
  } else if (type === "status") {
    let newSearch = "";
    if (search === "확정대기") {
      //
      newSearch = "waiting";
    } else if (search === "예약완료") {
      //
      newSearch = "complete";
    } else if (search === "예약취소") {
      newSearch = "cancle";
    } else if (search === "방문완료") {
      newSearch = "done";
    } else if (search === "노쇼") {
      newSearch = "noShow";
    }
    let searchData = await db.reservation.findMany({
      select: {
        id: true,
        reservationNumber: true,
        farm: {
          select: {
            id: true,
            name: true,
          },
        },
        checkInDate: true,
        created_at: true,
        status: true,
        user: {
          select: {
            id: true,
            username: true,
            phone: true,
            avatar: true,
          },
        },
      },
      where: {
        status: newSearch as Prisma.EnumReservationStatusFilter,
      },
    });
    console.log("searchData", searchData);
    return searchData;
  } else if (type === "create") {
    let korean = moment(search).subtract(9, "hours");
    console.log("korean", korean);
    console.log({
      lte: moment(korean).add(1, "day").toISOString(),
      gte: moment(korean).toISOString(),
    });
    let searchData = await db.reservation.findMany({
      select: {
        id: true,
        reservationNumber: true,
        farm: {
          select: {
            id: true,
            name: true,
          },
        },
        checkInDate: true,
        created_at: true,
        status: true,
        user: {
          select: {
            id: true,
            username: true,
            phone: true,
            avatar: true,
          },
        },
      },
      where: {
        created_at: {
          lt: moment(korean).add(1, "day").toISOString(),
          gte: moment(korean).toISOString(),
        },
      },
    });
    console.log("searchData", searchData);
    return searchData;
  } else if (type === "checkIndate") {
    let korean = moment(search);
    let searchData = await db.reservation.findMany({
      select: {
        id: true,
        reservationNumber: true,
        farm: {
          select: {
            id: true,
            name: true,
          },
        },
        checkInDate: true,
        created_at: true,
        status: true,
        user: {
          select: {
            id: true,
            username: true,
            phone: true,
            avatar: true,
          },
        },
      },
      where: {
        checkInDate: {
          lt: moment(korean).add(1, "day").toISOString(),
          gte: moment(korean).toISOString(),
        },
      },
    });
    console.log("searchData", searchData);
    return searchData;
  }
}
