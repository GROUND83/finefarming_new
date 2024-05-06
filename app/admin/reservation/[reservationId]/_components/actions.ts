"use server";
import db from "@/lib/db";
import getDateTime from "@/lib/getDateTime";
import { Prisma, ReservationStatus } from "@prisma/client";
import moment from "moment";
import nodemailer from "nodemailer";

export async function getReservationDetail(reservationId: number) {
  //
  let reservation = await db.reservation.findUnique({
    where: {
      id: reservationId,
    },
    include: {
      user: true,
      farm: {
        include: {
          owner: true,
        },
      },
    },
  });
  let product = await db.product.findUnique({
    where: {
      id: reservation?.productId,
    },
    include: {
      subProduct: true,
    },
  });
  console.log(reservation);
  return { reservation, product };
}

export async function changeComplete(reservationId: number) {
  //
  let result = await db.reservation.update({
    where: {
      id: reservationId,
    },
    data: {
      status: "complete",
      updated_at: getDateTime(),
    },
    include: {
      user: true,
      farm: {
        include: {
          owner: true,
        },
      },
    },
  });
  console.log("result", result);
  let user = result.user;
  let farmer = result.farm.owner;
  // 카카오 메세지 발송
  // 네이너 톡톡 발송
  // 이메일 발송
  // let send = await fetch("https://gw.talk.naver.com/chatbot/v1/event", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json;charset=UTF-8",
  //     Authorization: "IiKyGXi9Q4mqBCsW4CBC",
  //   },
  //   body: JSON.stringify({
  //     event: "send",
  //     user: "6Q989F2A9cj9mvecq-gaEclkRlgboHyLGYCgIBURYe8",
  //     textContent: { text: "hello world" },
  //   }),
  // });
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    // 아래 secure 옵션을 사용하려면 465 포트를 사용해야함
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      // 초기에 설정해둔 env 데이터
      user: process.env.AUTH_USER,
      pass: process.env.AUTH_PASS,
    },
  });

  let username = user.username;
  let userPhone = user.phone;
  let farmName = result.farm.name;
  let checkIndate = `${moment(result.checkInDate).format("YYYY년 MM월 DD일")} ${
    result.checkInTime
  }`;
  let howmany = 0;
  if (result.personalPrice.length > 0) {
    result.personalPrice.map((item: any) => {
      howmany += Number(item.amount);
    });
  }
  let totalPrice = result.totalprice;
  let mainPhone = result.farm.mainPhone;
  let to = user.email;
  let from = "info@finefarming.co.kr";
  let subject = `${username} 예약확정 메일입니다.`;

  const mailData: any = {
    to: to,
    subject: subject,
    from: from,
    html: `<div style="border: 1px;width: 400px;background-color: white;border: 1px solid #f4f4f4;padding: 40px;border-radius: 20px;display: flex;flex-direction: column;align-items: center;">
  <h1>예약확정</h1>
  <p style="font-size: 24px">${username} 고객님의 예약이 확정되었습니다.</p>
  <span style="margin-top: 10px">고객연락처 : ${userPhone}</span>
  <span style="margin-top: 10px">농장명 : ${farmName}</span>
  <span style="margin-top: 10px">방문일시 : ${checkIndate}</span>
  <span style="margin-top: 10px">방문인원 : ${howmany}명</span>
  <span style="margin-top: 10px">결제예정금액 : ${totalPrice}원</span>
  <span style="margin-top: 10px">문의 : ${mainPhone}</span>
  <div style="margin-top: 20px">
    <a href="https://finefarming.co.kr"
      style="
        padding: 10px 10px;
        border: 1px solid black;
        border-radius: 10px;
        text-decoration: none;
        background-color: white;
        color: #000;
      "
    >
      파인파밍 바로가기</a
    >
  </div>
</div>`,
    //	attachments 옵션으로 첨부파일도 전송 가능함
    //	attachments : [첨부파일]
  };
  console.log("send");
  let seondmail = transporter.sendMail(mailData);
  console.log(seondmail);
  return result;
}

export async function changeStatus({
  reservationId,
  status,
}: {
  reservationId: number;
  status: ReservationStatus;
}) {
  //
  if (status) {
    let result = await db.reservation.update({
      where: {
        id: reservationId,
      },
      data: {
        status: status,
        updated_at: getDateTime(),
      },
      include: {
        user: true,
        farm: {
          include: {
            owner: true,
          },
        },
      },
    });
    console.log("result", result);

    console.log(result);
    return result;
  }
  return;
}
