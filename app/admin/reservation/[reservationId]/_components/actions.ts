"use server";
import db from "@/lib/db";
import getDateTime from "@/lib/getDateTime";
import sendMail from "@/lib/sendMail/sendMail";
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
      user: {
        select: {
          username: true,
          phone: true,
          email: true,
        },
      },
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
  console.log("result", result);
  let user = result.user;

  let username = user.username;
  let farmName = result.farm.name;
  let farmAddress = result.farm.address;
  let visitor = result.visitor;
  let visitorPhone = result.visitorPhone;
  let checkIndate = `${moment(result.checkInDate).format("YYYY년 MM월 DD일")} ${
    result.checkInTime
  }시`;
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
  let totalPrice = `${Number(result.totalprice).toLocaleString()}원`;
  let resevationPhone = result.farm.resevationPhone;

  let from = "info@finefarming.co.kr";
  let subject = `${username} 예약 확정 메일입니다.`;
  let farmerEmail = result.farm.owner.email;

  console.log("farmerEmail", farmerEmail, user.email);
  let to = `${farmerEmail}, ${user.email}, newfarmingplatform@gmail.com`;
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
   
    <h1 style="font-size: 24px; margin-top: 20px">예약 확정</h1>
    <p style="font-size: 24px">${username} 고객님의 예약을 확정하였습니다.</p>
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
    //	attachments 옵션으로 첨부파일도 전송 가능함
    //	attachments : [첨부파일]
  };
  let sendResult = await sendMail(mailData);
  console.log("sendResult", sendResult);
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
    console.log("result", result);
    if (result) {
      if (status === "managercancle") {
        // 관리자 예약취소
        console.log("result", result);
        let user = result.user;

        let username = user.username;
        let farmName = result.farm.name;
        let farmAddress = result.farm.address;
        let visitor = result.visitor;
        let visitorPhone = result.visitorPhone;
        let checkIndate = `${moment(result.checkInDate).format(
          "YYYY년 MM월 DD일"
        )} ${result.checkInTime}시`;
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
        let totalPrice = `${Number(result.totalprice).toLocaleString()}원`;
        let resevationPhone = result.farm.resevationPhone;

        let from = "info@finefarming.co.kr";
        let subject = `${username} 예약 취소 메일입니다.`;
        let farmerEmail = result.farm.owner.email;

        console.log("farmerEmail", farmerEmail, user.email);
        let to = `${farmerEmail}, ${user.email}`;
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
         
          <h1 style="font-size: 24px; margin-top: 20px">매니저 예약 취소</h1>
          <p style="font-size: 24px">${username} 고객님의 예약을 취소하였습니다.</p>
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
          //	attachments 옵션으로 첨부파일도 전송 가능함
          //	attachments : [첨부파일]
        };
        let sendResult = await sendMail(mailData);
        console.log("sendResult", sendResult);
      } else if (status === "done") {
        // 관리자 방문완료
        console.log("result", result);
        let user = result.user;

        let username = user.username;
        let farmName = result.farm.name;
        let farmAddress = result.farm.address;
        let visitor = result.visitor;
        let visitorPhone = result.visitorPhone;
        let checkIndate = `${moment(result.checkInDate).format(
          "YYYY년 MM월 DD일"
        )} ${result.checkInTime}시`;
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
        let totalPrice = `${Number(result.totalprice).toLocaleString()}원`;
        let resevationPhone = result.farm.resevationPhone;

        let from = "info@finefarming.co.kr";
        let subject = `${username} 방문 완료 메일입니다.`;
        let farmerEmail = result.farm.owner.email;

        console.log("farmerEmail", farmerEmail, user.email);
        let to = `${farmerEmail}, ${user.email}`;
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
         
          <h1 style="font-size: 24px; margin-top: 20px">방문 완료</h1>
          <p style="font-size: 24px">${username} 고객님 체험 상품의 리뷰를 남겨주세요.</p>
          <div
            style="
             
              width: 100%;
              margin-top: 20px;
            "
          >
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
    }

    console.log(result);
    return result;
  }
  return;
}
