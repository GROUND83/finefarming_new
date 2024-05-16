"use server";

import db from "@/lib/db";

import dayjs from "dayjs";
import moment from "moment";
import { redirect } from "next/navigation";
import sendMail from "@/lib/sendMail/sendMail";
import getDateTime from "@/lib/getDateTime";
import userNewReservationTemplte from "@/lib/mailtemplate/userNewReservationTemplte copy";

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

  let newKoreanDate = new Date(dayjs(newdate).format());
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
export async function getFarmImpossibe(farmId: number) {
  const reservationDates = await db.reserVationDate.findMany({
    where: {
      farmId: farmId,
    },
  });

  let newArray = {} as any;
  console.log("reservationDates", reservationDates);
  for (const reservationDate of reservationDates) {
    if (Object.keys(newArray).length > 0) {
      console.log(
        "test",
        dayjs(reservationDate.date).format("YYYY-MM-DD") in newArray
      );
      if (dayjs(reservationDate.date).format("YYYY-MM-DD") in newArray) {
        newArray[`${dayjs(reservationDate.date).format("YYYY-MM-DD")}`].push(
          reservationDate.visible
        );
      } else {
        newArray[`${dayjs(reservationDate.date).format("YYYY-MM-DD")}`] = [
          reservationDate.visible,
        ];
        // newArray[`${dayjs(reservationDate.date).format("YYYY-MM-DD")}`] = [reservationDate.visible];
      }
    } else {
      newArray[`${dayjs(reservationDate.date).format("YYYY-MM-DD")}`] = [
        reservationDate.visible,
      ];
    }
  }
  let copyObj = { ...newArray };
  for (const key in newArray) {
    let trueCheck = newArray[key].filter((item: any) => item === true);
    // console.log("copyObj", trueCheck, copyObj);
    if (trueCheck.length > 0) {
      copyObj[key] = true;
    } else {
      copyObj[key] = false;
    }
  }
  console.log("copyObj", copyObj);
  return copyObj;
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
            reservationMin: true,
          },
        },
      },
    });
    if (product) {
      let {
        priceType,
        groupPrice,
        farm: { initail, id, reservationMin },
      } = product;
      let sendDate = dayjs(result.checkInDate)
        .subtract(Number(reservationMin) - 1)
        .format("YYYY-MM-DD");
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
          sendDate: sendDate,
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
          html: userNewReservationTemplte({
            username: username!,
            farmAddress: farmAddress!,
            checkIndate: checkIndate!,
            howmany: howmany!,
            totalPrice: totalPrice!,
            resevationPhone: resevationPhone!,
            visitor: visitor!,
            visitorPhone: visitorPhone!,
            farmName: farmName!,
          }),
        };

        let sendResult = await sendMail(mailData);
        console.log("sendResult", sendResult);
      }

      console.log("createReservation", createReservation);
      return redirect(`/reservation/detail/${createReservation.id}`);
    }
  }
}
