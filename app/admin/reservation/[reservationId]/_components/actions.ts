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
      farm: true,
    },
  });
  console.log("result", result);
  let user = result.user;

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
  let farmAddress = result.farm.address;
  let checkIndate = `${moment(result.checkInDate).format("YYYY년 MM월 DD일")} ${
    result.checkInTime
  }`;
  let howmany = 0;
  if (result.priceType === "PERSONAL") {
    if (result.personalPrice.length > 0) {
      result.personalPrice.map((item: any) => {
        howmany += Number(item.amount);
      });
    }
  } else {
    if (result.groupNumber) {
      howmany += result.groupNumber;
    }
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
    html: `<div
    style="
      border: 1px;
      width: 400px;
      background-color: #f5f5f5;
      border: 1px solid #e5e7eb;
      padding: 70px;
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      align-items: start;
    "
  >
    <div>
      <img
        src="https://imagedelivery.net/8GmAyNHLnOsSkmaGEU1nuA/85d9c211-3818-463c-9205-bf6a66ca2800/avatar"
        alt="파인파밍 로고"
        style="width: 100px; height: 50px"
      />
    </div>
    <h1 style="font-size: 24px; margin-top: 20px">예약확정</h1>
    <p style="font-size: 24px">${username} 고객님의 예약이 확정되었습니다.</p>
    <div
      style="
        display: flex;
        flex-direction: column;
        align-items: start;
        width: 100%;
        margin-top: 20px;
      "
    >
      <div
        style="
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding-bottom: 10px;
          border-bottom: 1px solid #e5e7eb;
        "
      >
        <span>고객연락처</span>
        <span style="margin-left: 10px">${userPhone}</span>
      </div>
      <div
        style="
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
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
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
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
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
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
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding-bottom: 10px;
          border-bottom: 1px solid #e5e7eb;
          margin-top: 10px;
        "
      >
        <span>방문인원</span>
        <span style="margin-left: 10px">${howmany}</span>
      </div>
      <div
        style="
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
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
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding-bottom: 10px;
          border-bottom: 1px solid #e5e7eb;
          margin-top: 10px;
        "
      >
        <span>농장 예약 문의</span>
        <span style="margin-left: 10px">${mainPhone}</span>
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
  
  `,
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
