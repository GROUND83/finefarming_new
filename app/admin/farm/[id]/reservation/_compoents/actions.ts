"use server";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import { editSchema } from "./editSchema";

import moment from "moment";
import { calenderSchema } from "./calenderSchema";
import getDateTime from "@/lib/getDateTime";
import dayjs from "dayjs";
import dayLocale from "@/lib/dayjs";

export async function getSlotData(id: number) {
  let farm = await db.farm.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      slot: true,
      reservationMax: true,
      reservationMin: true,
    },
  });
  // console.log("farm", farm);

  // let sortArray: any = farm.sort((a, b) => {
  //   if (
  //     Number(a.startTime.split(":")[0]) > Number(b.startTime.split(":")[0])
  //   ) {
  //     return 1;
  //   }
  //   if (
  //     Number(a.startTime.split(":")[0]) < Number(b.startTime.split(":")[0])
  //   ) {
  //     return -1;
  //   }
  //   return 0;
  // });

  if (farm) {
    return farm;
  } else {
    redirect("/not-found");
  }
}
type getReservationDateProps = {
  farmId: number;
  selectedDay: string;
};
export async function getAllReservationDate(farmId: number) {
  // console.log("farmId", farmId);
  let reserVationDate = await db.reserVationDate.findMany({
    where: {
      farmId: farmId,
    },
    select: {
      date: true,
    },
  });
  if (reserVationDate.length > 0) {
    let newArray = [];
    for (const reserdate of reserVationDate) {
      newArray.push(new Date(moment(reserdate.date).format("YYYY-MM-DD")));
    }
    return newArray;
  }
  return [];
  // return { reserVationDate, slot };
}

//
export async function getReservationDate({
  farmId,
  selectedDay,
}: getReservationDateProps) {
  let koreanSelectDay = dayjs(selectedDay).toISOString();
  let plusDay = dayjs(koreanSelectDay).add(1, "day").toISOString();
  console.log(
    "selectedDay",
    selectedDay,
    new Date(selectedDay),
    koreanSelectDay,
    plusDay,
    dayLocale.locale()
  );

  //
  let reserVationDate = await db.reserVationDate.findMany({
    where: {
      farmId: farmId,
      AND: [
        {
          date: { gte: koreanSelectDay },
        },
        {
          date: {
            lt: plusDay,
          },
        },
      ],
    },
    select: {
      id: true,
      visible: true,
      date: true,
      startTime: true,
      amount: true,
      type: true,
    },
  });
  let { slot } = (await db.farm.findUnique({
    where: {
      id: farmId,
    },
    select: {
      slot: true,
    },
  })) as any;

  console.log("reserVationDate", reserVationDate, slot, typeof slot);

  // 예약 groupNumber personalPrice[]  amount
  let reservation = await db.reservation.groupBy({
    by: ["checkInTime"],
    where: {
      checkInDate: {
        gte: koreanSelectDay,
        lt: plusDay,
      },
      OR: [{ status: "waiting" }, { status: "complete" }],
    },
    _count: true,
  });
  // console.log("reservation", reservation);
  if (reserVationDate.length > 0) {
    //
    // reservationData 기준으로  slot 병합
    const map = new Map();
    // slot.forEach((item: any) => map.set(item.startTime, item));

    console.log("map", map);
    reserVationDate.forEach((item: any) =>
      map.set(item.startTime, { ...map.get(item.startTime), ...item })
    );
    console.log("map", map);
    const mergedArray = Array.from(map.values());
    console.log("map", mergedArray);
    // console.log("concatArray", mergedArray);
    let newArray = [];
    for (const mergedArrayData of mergedArray) {
      if (reservation.length > 0) {
        let filetered = reservation.filter(
          (item) => item.checkInTime === mergedArrayData.startTime
        );
        if (filetered.length > 0) {
          //
          let data = {
            ...mergedArrayData,
            count: filetered[0]._count,
          };
          newArray.push(data);
        } else {
          newArray.push({ ...mergedArrayData, count: 0 });
        }
      } else {
        newArray.push({ ...mergedArrayData, count: 0 });
      }
    }
    let sortArray: any = newArray.sort((a, b) => {
      if (
        Number(a.startTime.split(":")[0]) > Number(b.startTime.split(":")[0])
      ) {
        return 1;
      }
      if (
        Number(a.startTime.split(":")[0]) < Number(b.startTime.split(":")[0])
      ) {
        return -1;
      }
      return 0;
    });
    return { result: sortArray, type: "reserVationDate" };
  } else {
    console.log("sole", slot);
    let newArray = [];
    for (const slotdata of slot) {
      if (reservation.length > 0) {
        let filetered = reservation.filter(
          (item) => item.checkInTime === slotdata.startTime
        );
        if (filetered.length > 0) {
          //
          let data = {
            ...slotdata,
            count: filetered[0]._count,
          };
          newArray.push(data);
        } else {
          newArray.push({ ...slotdata, count: 0, id: null });
        }
      } else {
        newArray.push({ ...slotdata, count: 0, id: null });
      }
    }
    let sortArray: any = newArray.sort((a, b) => {
      if (
        Number(a.startTime.split(":")[0]) > Number(b.startTime.split(":")[0])
      ) {
        return 1;
      }
      if (
        Number(a.startTime.split(":")[0]) < Number(b.startTime.split(":")[0])
      ) {
        return -1;
      }
      return 0;
    });
    console.log("sortArray", sortArray);
    return { result: sortArray, type: "slot" };
  }
  // return { reserVationDate, slot };
}
export async function getHolidays(farmId: number) {
  let farmdata = await db.farm.findUnique({
    where: {
      id: farmId,
    },
    select: {
      id: true,

      mondayOpen: true,
      mondayStart: true,
      mondayEnd: true,
      tuesdayOpen: true,
      tuesdayStart: true,
      tuesdayEnd: true,
      wednesdayOpen: true,
      wednesdayStart: true,
      wednesdayEnd: true,
      thursdayOpen: true,
      thursdayStart: true,
      thursdayEnd: true,
      fridayOpen: true,
      fridayStart: true,
      fridayEnd: true,
      saturdayOpen: true,
      saturdayStart: true,
      saturdayEnd: true,
      sundayOpen: true,
      sundayStart: true,
      sundayEnd: true,
      holidayOpen: true,
      holidayStart: true,
      holidayEnd: true,
    },
  });

  // console.log("reserVationDate", farmdata);

  if (farmdata) {
    return farmdata;
  } else {
    return null;
  }
}
export async function updateData(formData: FormData) {
  return new Promise(async (resolve, reject) => {
    const id: any = formData.get("id");

    const data: any = formData.get("newData");

    let dataParser = await JSON.parse(data);
    console.log("dataparser", dataParser, typeof dataParser);

    const result = await editSchema.safeParseAsync(dataParser);
    console.log(result);
    // console.log(result.data.slot);
    if (!result.success) {
      console.log(result.error.flatten());
      return result.error.flatten();
    } else {
      if (result.data) {
        try {
          let response = await db.farm.update({
            where: {
              id: Number(id),
            },
            data: {
              ...result.data,
              updated_at: getDateTime(),
            },
          });
          console.log("response", response);
          return resolve(response);
        } catch (e: any) {
          console.log(e);
        }
      }
    }
  });
}

export async function updateCalender(formData: FormData) {
  return new Promise(async (resolve, reject) => {
    const farmId: any = formData.get("farmId");
    const date: any = formData.get("date"); // korean
    let newdate = dayjs(date).toISOString(); //
    const data: any = formData.get("newData");
    let newKoreanDate = dayjs(newdate).add(9, "hour").toISOString();
    let plusDay = dayjs(newKoreanDate).add(1, "day").toISOString();
    console.log(farmId, "date", date, newdate, newKoreanDate, plusDay);
    let dataParser = await JSON.parse(data);
    console.log("dataparser", dataParser, typeof dataParser);

    const result = await calenderSchema.safeParseAsync(dataParser);
    console.log(result);
    if (!result.success) {
      console.log(result.error.flatten());
      return result.error.flatten();
    } else {
      if (result.data) {
        try {
          // 날짜 별 검색후 모두 삭제
          let deleteReservation = await db.reserVationDate.deleteMany({
            where: {
              AND: [
                {
                  date: { gte: newKoreanDate },
                },
                {
                  date: {
                    lt: plusDay,
                  },
                },
              ],
            },
          });
          // reservationDate 생성 또는 업데이트 => 아이디로
          for (const reservationDate of result.data.reservationDate) {
            if (reservationDate.id) {
              await db.reserVationDate.upsert({
                where: {
                  id: reservationDate.id,
                },
                create: {
                  date: newKoreanDate,
                  visible: reservationDate.visible,
                  amount: reservationDate.amount,
                  startTime: reservationDate.startTime,
                  farmId: Number(farmId),
                  created_at: getDateTime(),
                  updated_at: getDateTime(),
                },
                update: {
                  date: newKoreanDate,
                  visible: reservationDate.visible,
                  amount: reservationDate.amount,
                  startTime: reservationDate.startTime,
                  farmId: Number(farmId),
                  updated_at: getDateTime(),
                },
              });
            } else {
              let cretateReservationData = await db.reserVationDate.create({
                data: {
                  date: newKoreanDate,
                  visible: reservationDate.visible,
                  amount: reservationDate.amount,
                  startTime: reservationDate.startTime,
                  farmId: Number(farmId),
                  created_at: getDateTime(),
                  updated_at: getDateTime(),
                },
              });
            }
          }

          return resolve(true);
        } catch (e: any) {
          console.log(e);
        }
      }
    }
  });
}
export async function deleteCalender(formData: FormData) {
  return new Promise(async (resolve, reject) => {
    const reservationDateId: any = formData.get("reservationDateId");

    try {
      // 날짜 별 검색후 모두 삭제
      let deleteReserverationDate = await db.reserVationDate.delete({
        where: {
          id: Number(reservationDateId),
        },
      });
      // reservationDate 생성 또는 업데이트 => 아이디로

      // let updateData = result.data.reservationDate.map((item) => ({
      //   date: new Date(newKoreanDate),
      //   visible: item.visible,
      //   amount: item.amount,
      //   startTime: item.startTime,
      //   farmId: Number(farmId),
      // }));
      console.log("deleteReserverationDate", deleteReserverationDate);
      // let reserVationDate = await db.reserVationDate.createMany({
      //   data: updateData,
      // });

      // console.log("updateData", reserVationDate);
      // console.log("reserVationDate", updateData);
      // let response = await db.farm.update({
      //   where: {
      //     id: Number(farmId),
      //   },
      //   data: {
      //     reserVationDates: {
      //       upsert: updateData,
      //     },
      //   },
      //   include: {
      //     reserVationDates: true, // Include all posts in the returned object
      //   },
      // });
      // console.log("response", response);
      return resolve(true);
    } catch (e: any) {
      console.log(e);
    }
  });
}

export async function getNationalHoliday() {
  let year = moment().format("YYYY");
  let nationalHoliday = await db.holiday.findMany({
    where: {
      year,
    },
    select: {
      id: true,
      dateName: true,
      day: true,
      locdate: true,
      month: true,
      year: true,
    },
  });
  return nationalHoliday;
}

export async function getReservation(date: string) {
  let reservation = await db.reservation.groupBy({
    by: ["checkInTime"],
    where: {
      checkInDate: {
        gte: moment(date).toISOString(),
        lte: moment(date).add(1, "day").toISOString(),
      },
    },
    _count: true,
  });
  // console.log("reservation", reservation);
  return reservation;
}
export async function farmPossibleDay(farmId: number) {
  const farm = await db.farm.findUnique({
    where: {
      id: farmId,
    },
    select: {
      slot: true,
    },
  });
  let newFarm = JSON.stringify(farm);
  let resutFarm = JSON.parse(newFarm);
  const slotarray = resutFarm?.slot;
  let newSlot = slotarray.filter((item: any) => item.visible === true);

  let reserVationDates = await db.reserVationDate.findMany({
    where: {
      farmId: farmId,
      visible: true,
    },
    select: {
      id: true,
      visible: true,
      date: true,
      startTime: true,
      amount: true,
      type: true,
    },
  });
  if (reserVationDates.length > 0) {
    const map = new Map();
    reserVationDates.forEach((item: any) => {
      if (item.visible) {
        return map.set(item.startTime, { ...map.get(item.startTime), ...item });
      }
    });
    // console.log("map", map);
    // map 을 array 로 만들기
    const mergedArray = Array.from(map.values());
    console.log("mergedArray", reserVationDates, mergedArray);
    let newArray = [];
    for (const reserVationDate of reserVationDates) {
      newArray.push(dayjs(reserVationDate.date).format("YYYY-MM-DD"));
    }
    console.log("newArray", newArray);
    return newArray;
  } else {
    return [];
  }
}
