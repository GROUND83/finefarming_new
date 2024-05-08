"use server";

import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import dayjs from "dayjs";
import moment from "moment";
import { redirect } from "next/navigation";

export async function getProductDetail(productId: number) {
  const products = await db.product.findUnique({
    where: {
      id: productId,
    },

    include: {
      farm: true,
      subProduct: true,
    },
  });
  let farmInd = products?.farm.id;
  const slot = products?.farm.slot;

  console.log("product", products, farmInd);
  return JSON.stringify(products);
}

export async function getSelectDate(productId: number) {
  const products = await db.product.findUnique({
    where: {
      id: productId,
    },

    select: {
      id: true,
      title: true,
      description: true,
      priceType: true,
      groupPrice: true,
      groupLimit: true,
      farmId: true,
      farm: {
        select: {
          initail: true,
          id: true,
          reservationMax: true,
          reservationMin: true,
          slot: true,
        },
      },
      subProduct: true,
    },
  });
  let farmInd = products?.farm.id;
  const slot = products?.farm.slot;

  console.log("product", products, farmInd);
  return JSON.stringify(products);
}

type getReservationDate = {
  productId: number;
  date: Date;
};

// 고객이 특정 날짜 선택후 예약 현황 계산 로직
export async function getReservationDate({
  productId,
  date,
}: getReservationDate) {
  console.log(productId);
  let newdate = new Date(date);

  let newKoreanDate = new Date(dayjs(newdate).add(9, "hour").format());
  let plusDay = new Date(dayjs(newKoreanDate).add(1, "d").format());
  // console.log(productId, "date", newKoreanDate, plusDay);

  //
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      farm: {
        select: {
          id: true,
        },
      },
    },
  });
  let farmId = product?.farm.id;

  //
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
  const slot = newSlot;

  //
  //1.슬롯과 트정일 합치기

  // 특정일 예약 슬롯 가져오기
  const reservationDate = await db.reserVationDate.findMany({
    where: {
      farmId: farmId,
      visible: true,
      date: { gte: newKoreanDate, lt: plusDay },
    },
  });
  // console.log("reservationDate", reservationDate);

  //
  // 슬롯 합치고 중복제거
  let totalReservationDate = [...slot, ...reservationDate];

  //  예약 가져오기
  const reservation = await db.reservation.groupBy({
    by: ["checkInTime"],
    where: {
      checkInDate: {
        gte: newKoreanDate,
        lt: plusDay,
      },
    },
    _count: true,
  });

  // console.log("reservation", totalReservationDate, reservation);
  // 슬롯에 예약 반영해서 슬롯 리턴 남은수량 계산
  if (reservationDate.length > 0) {
    // 특정일 예약 슬롯이 있으면
    // reservationData 기준으로  slot 병합
    const map = new Map();
    // slot.forEach((item: any) => map.set(item.startTime, item));

    // console.log("map", map);
    reservationDate.forEach((item: any) =>
      map.set(item.startTime, { ...map.get(item.startTime), ...item })
    );
    // console.log("map", map);
    // map 을 array 로 만들기
    const mergedArray = Array.from(map.values());
    // console.log("mergedArray", mergedArray);
    // console.log("concatArray", mergedArray);
    let newArray = [];
    // 중복제거 예약 현황
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
    // 정렬
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
    // console.log({ result: sortArray, type: "reserVationDate" }, reservation);

    return { result: sortArray, type: "reserVationDate" };
  } else {
    // console.log("sole", slot);
    let newArray = [];
    for (const slotdata of slot) {
      if (slotdata) {
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
    // console.log({ result: sortArray, type: "slot" });
    return { result: sortArray, type: "slot" };
  }
}

export async function makeReservation(jsonData: string) {
  let result = await JSON.parse(jsonData);
  console.log("result", result);
  if (result) {
    let productId = result.productId;
    //
    let product = await db.product.findUnique({
      where: {
        id: productId,
      },
      select: {
        priceType: true,
        groupPrice: true,
        farm: {
          select: {
            id: true,
            initail: true,
          },
        },
      },
    });
    if (product) {
      let {
        priceType,
        groupPrice,
        farm: { initail, id },
      } = product;
      let createReservation = await db.reservation.create({
        data: {
          reservationNumber: `${initail}-${new Date().getTime()}`,
          farm: {
            connect: {
              id: id,
            },
          },
          user: {
            connect: { id: result.userId },
          },
          productId: productId,
          visitor: result.visitor,
          visitorPhone: result.visitorPhone,
          groupPrice: result.groupPrice ? result.groupPrice : null,
          groupNumber: result.groupNumber ? result.groupNumber : null,
          personalPrice: result.personalPrice,
          priceType: result.priceType,
          checkInDate: new Date(result.checkInDate),
          checkInTime: result.checkInTime,
          totalprice: result.totalPrice,
        },
      });
      console.log("createReservation", createReservation);
      return redirect(`/reservation/detail/${createReservation.id}`);
    }
  }
}
