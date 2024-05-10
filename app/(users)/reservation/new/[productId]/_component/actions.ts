"use server";
import nodemailer from "nodemailer";

import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import dayjs from "dayjs";
import moment from "moment";
import { redirect } from "next/navigation";
import sendMail from "@/lib/sendMail/sendMail";
import getDateTime from "@/lib/getDateTime";

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

  // console.log("product", products, farmInd);
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
      farmId: farmId,
      checkInDate: {
        gte: newKoreanDate,
        lt: plusDay,
      },
      OR: [{ status: "waiting" }, { status: "complete" }],
    },
    _sum: {
      totalAmount: true,
    },
  });
  console.log("reservation", reservation);

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
        console.log("reservation", reservation);
        let filetered = reservation.filter(
          (item) => item.checkInTime === mergedArrayData.startTime
        );
        console.log("filetered", filetered);
        if (filetered.length > 0) {
          //
          let data = {
            ...mergedArrayData,
            count: filetered[0]._sum.totalAmount,
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
              count: filetered[0]._sum.totalAmount,
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
        groupLimit: true,
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
      let groupLimit = product.groupLimit;
      let personalPrice = result.personalPrice;

      // if (personalPrice.length > 0) {
      //   for (const personal of personalPrice) {
      //     if (!personal.isFree) {
      //       totalAmount += personal.amount;
      //     }
      //   }
      // }
      // if (groupLimit) {
      //   totalAmount += groupNumber;
      // }
      //
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
          subProduct: result.subProduct,
          productId: productId,
          visitor: result.visitor,
          visitorPhone: result.visitorPhone,
          groupPrice: result.groupPrice ? result.groupPrice : null,
          groupMember: result.groupMember.length > 0 ? result.groupMember : [],
          personalPrice:
            result.personalPrice.length > 0 ? result.personalPrice : [],
          priceType: result.priceType,
          checkInDate: new Date(result.checkInDate),
          checkInTime: result.checkInTime,
          totalprice: result.totalPrice,
          created_at: getDateTime(),
          updated_at: getDateTime(),
          totalAmount: result.totalAmount,
        },
        include: {
          user: {
            select: {
              username: true,
              phone: true,
              email: true,
            },
          },
          farm: {
            select: {
              resevationPhone: true,
              name: true,
              address: true,
              owner: {
                select: {
                  email: true,
                },
              },
            },
          },
        },
      });
      // 메일보내기 관리자,농장주,고객
      if (createReservation) {
        //
        let username = createReservation.user.username;
        let farmName = createReservation.farm.name;
        let farmAddress = createReservation.farm.address;
        let visitor = createReservation.visitor;
        let visitorPhone = createReservation.visitorPhone;
        let checkIndate = `${moment(createReservation.checkInDate).format(
          "YYYY년 MM월 DD일"
        )} ${createReservation.checkInTime}`;
        let howmany = 0;
        if (createReservation.priceType === "PERSONAL") {
          if (createReservation.personalPrice.length > 0) {
            createReservation.personalPrice.map((item: any) => {
              howmany += Number(item.amount);
            });
          }
        } else {
          if (createReservation.groupMember.length > 0) {
            createReservation.groupMember.map((item: any) => {
              howmany += Number(item.amount);
            });
          }
        }
        let totalPrice = `${Number(
          createReservation.totalprice
        ).toLocaleString()}원`;
        let resevationPhone = createReservation.farm.resevationPhone;

        let from = "info@finefarming.co.kr";
        let subject = `${username} 예약 확인 메일입니다.`;
        let farmerEmail = createReservation.farm.owner.email;

        console.log("farmerEmail", farmerEmail);
        let to = `${farmerEmail}, newfarmingplatform@gmail.com`;
        console.log("to", to);

        const mailData: any = {
          to: to,
          subject: subject,
          from: from,
          html: `<!doctype html>
          <html>
          <body style="width:500px;">
          <div style="border: 1px;width: 400px;background-color: #f5f5f5;border: 1px solid #e5e7eb;padding: 70px;border-radius: 20px;">

            <img
              src="https://imagedelivery.net/8GmAyNHLnOsSkmaGEU1nuA/bdab6fb3-d498-49e5-3a5b-d03c601c8d00/public"
              alt="finefarminglogo"
              title="Logo"
              style="display:block;width:100px;height:50px;"

            />

          <h1 style="font-size: 24px; margin-top: 20px">예약 확인</h1>
          <p style="font-size: 24px">${username} 고객님의 예약을 진행하였습니다.</p>
          <div
            style="

              width: 100%;
              margin-top: 20px;
            "
          >
            <div
              style="
                width: 100%;
                padding-bottom: 10px;
                border-bottom: 1px solid #e5e7eb;
              "
            >
              <span>방문자대표 </span>
              <span style="margin-left: 10px">${visitor}</span>
            </div>
            <div
              style="
                width: 100%;
                padding-bottom: 10px;
                border-bottom: 1px solid #e5e7eb;
              "
            >
              <span>방문자대표 연락처</span>
              <span style="margin-left: 10px">${visitorPhone}</span>
            </div>
            <div
              style="
                width: 100%;
                margin-top: 10px;
                padding-bottom: 10px;
                border-bottom: 1px solid #e5e7eb;
              "
            >
              <span>농장명</span>
              <span style="margin-left: 10px">${farmName}</span>
            </div>
            <div
              style="

                width: 100%;
                margin-top: 10px;
                padding-bottom: 10px;
                border-bottom: 1px solid #e5e7eb;
              "
            >
              <span>농장 주소</span>
              <span style="margin-left: 10px">${farmAddress}</span>
            </div>
            <div
              style="

                width: 100%;
                padding-bottom: 10px;
                border-bottom: 1px solid #e5e7eb;
                margin-top: 10px;
              "
            >
              <span>방문일시</span>
              <span style="margin-left: 10px">${checkIndate}</span>
            </div>
            <div
              style="

                width: 100%;
                padding-bottom: 10px;
                border-bottom: 1px solid #e5e7eb;
                margin-top: 10px;
              "
            >
              <span>방문인원</span>
              <span style="margin-left: 10px">${howmany}명</span>
            </div>
            <div
              style="

                width: 100%;
                padding-bottom: 10px;
                border-bottom: 1px solid #e5e7eb;
                margin-top: 10px;
              "
            >
              <span>결제예정금액</span>
              <span style="margin-left: 10px">${totalPrice}</span>
            </div>
            <div
              style="

                width: 100%;
                padding-bottom: 10px;
                border-bottom: 1px solid #e5e7eb;
                margin-top: 10px;
              "
            >
              <span>농장 예약 문의</span>
              <span style="margin-left: 10px">${resevationPhone}</span>
            </div>
          </div>
          <div style="margin-top: 50px">
            <a
              href="https://finefarming.co.kr"
              style="
                padding: 10px 20px;
                border-radius: 10px;
                text-decoration: none;
                background-color: #21c45d;
                color: white;
              "
            >
              파인파밍 바로가기</a
            >
          </div>
          <div style="margin-top: 50px">
            <p style="color: #737373">© 2024. FineFarming All rights reserved.</p>
          </div>
        </div>
        </body>
        </html>

        `,
        };

        let sendResult = await sendMail(mailData);
        console.log("sendResult", sendResult);
      }

      console.log("createReservation", createReservation);
      return redirect(`/reservation/detail/${createReservation.id}`);
    }
  }
}
