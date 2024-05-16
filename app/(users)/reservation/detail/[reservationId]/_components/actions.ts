"use server";

import db from "@/lib/db";
import userCancleTemple from "@/lib/mailtemplate/userCancleTemplte";
import sendMail from "@/lib/sendMail/sendMail";
import moment from "moment";
import { notFound } from "next/navigation";

export async function getReservationDetail(reservatonId: number) {
  const reservation = await db.reservation.findUnique({
    where: {
      id: reservatonId,
    },
    include: {
      farm: {
        select: {
          refundPolicy: true,
          name: true,
          id: true,
          address: true,
          reservationMin: true,
        },
      },
      user: {
        select: {
          id: true,
          username: true,
          phone: true,
          email: true,
        },
      },
    },
  });
  const product = await db.product.findUnique({
    where: {
      id: reservation?.productId,
    },
    include: {
      farm: true,
    },
  });
  return JSON.stringify({ reservation, product });
}

export async function makeCancle(reservationId: number) {
  console.log("reservationId", reservationId);
  //
  try {
    let result = await db.reservation.update({
      where: {
        id: reservationId,
      },
      data: {
        status: "cancle",
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
    if (result) {
      //
      let username = result.user.username;
      let farmName = result.farm.name;
      let farmAddress = result.farm.address;
      let visitor = result.visitor;
      let visitorPhone = result.visitorPhone;
      let checkIndate = `${moment(result.checkInDate).format(
        "YYYY년 MM월 DD일"
      )} ${result.checkInTime}`;

      let from = "info@finefarming.co.kr";
      let subject = `${username} 예약 취소 메일입니다.`;
      let farmerEmail = result.farm.owner.email;

      console.log("farmerEmail", farmerEmail);
      let to = `${farmerEmail}, newfarmingplatform@gmail.com`;
      console.log("to", to);

      const mailData: any = {
        to: to,
        subject: subject,
        from: from,
        html: userCancleTemple({
          username: username!,
          farmAddress: farmAddress!,
          checkIndate: checkIndate!,
          visitor: visitor!,
          visitorPhone: visitorPhone!,
          farmName: farmName!,
        }),
      };

      let sendResult = await sendMail(mailData);
      console.log("sendResult", sendResult);
    }
    return result;
  } catch (e) {
    //
    notFound();
  }
}
