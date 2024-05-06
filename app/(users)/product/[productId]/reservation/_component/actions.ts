"use server";

import db from "@/lib/db";
import { Prisma } from "@prisma/client";
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

  console.log("product", products, farmInd);
  return products;
}

type getReservationDate = {
  farmId: number;
  date: Date;
};
export async function getReservationDate({ farmId, date }: getReservationDate) {
  let newdate = new Date(date);
  console.log(farmId, "date", date);

  let newKoreanDate = newdate.setHours(newdate.getHours() + 9);

  const farm = await db.farm.findUnique({
    where: {
      id: farmId,
    },
    select: {
      slot: true,
    },
  });
  let slot = farm?.slot as Prisma.JsonArray;
  //1.슬롯과 트정일 합치기

  // 특정일 예약 슬롯 가져오기
  const reservationDate = await db.reserVationDate.findMany({
    where: {
      farmId: farmId,
      visible: true,
      AND: [
        {
          date: { gte: new Date(newKoreanDate) },
        },
        {
          date: {
            lt: new Date(
              moment(newKoreanDate).add(1, "days").format("YYYY-MM-DD")
            ),
          },
        },
      ],
    },
  });
  // 슬롯 합치고 중복제거
  let totalReservationDate = [...slot, ...reservationDate];

  //  예약 가져오기
  const reservation = await db.reservation.findMany({
    where: {
      farmId: farmId,
      AND: [
        {
          checkInDate: { gte: new Date(newKoreanDate) },
        },
        {
          checkInDate: {
            lt: new Date(
              moment(newKoreanDate).add(1, "days").format("YYYY-MM-DD")
            ),
          },
        },
      ],
    },
  });
  // 슬롯에 예약 반영해서 슬롯 리턴 남은수량 계산
  return totalReservationDate;
}

export async function makeReservation(formData: FormData) {
  let newData = formData.get("newData");
  if (newData) {
    let result = await JSON.parse(newData);

    console.log("result", result);
    let createReservation = await db.reservation.create({
      data: {
        reservationNumber: `${result.farmInitail}-${new Date().getTime()}`,
        farm: {
          connect: {
            id: result.farmId,
          },
        },
        user: {
          connect: { id: result.userId },
        },
        productId: result.productId,
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
    return redirect(`/reservation/${createReservation.id}`);
  }
}
