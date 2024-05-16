"use server";
import db from "@/lib/db";
import getDateTime from "@/lib/getDateTime";
import adminChangStatusTemplet from "@/lib/mailtemplate/adminChangeStatusTemplet";
import adminDoneTemplet from "@/lib/mailtemplate/adminDoneTemplet";
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
    if (result.groupMember.length > 0) {
      result.groupMember.map((item: any) => {
        howmany += Number(item.amount);
      });
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
  let title = "예약 확정";
  let subTitle = `${username} 고객님의 예약을 확정하였습니다.`;
  let html = adminChangStatusTemplet({
    farmAddress: farmAddress!,
    checkIndate: checkIndate!,
    visitor: visitor!,
    visitorPhone: visitorPhone!,
    farmName: farmName!,
    resevationPhone: resevationPhone!,
    totalPrice: totalPrice!,
    howmany: howmany!,
    title,
    subTitle,
  });
  const mailData: any = {
    to: to,
    subject: subject,
    from: from,
    html: html,
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
          if (result.groupMember.length > 0) {
            result.groupMember.map((item: any) => {
              howmany += Number(item.amount);
            });
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
        let title = "매니저 예약 취소";
        let subTitle = `${username} 고객님의 예약을 취소하였습니다.`;
        let html = adminChangStatusTemplet({
          farmAddress: farmAddress!,
          checkIndate: checkIndate!,
          visitor: visitor!,
          visitorPhone: visitorPhone!,
          farmName: farmName!,
          resevationPhone: resevationPhone!,
          totalPrice: totalPrice!,
          howmany: howmany!,
          title,
          subTitle,
        });
        const mailData: any = {
          to: to,
          subject: subject,
          from: from,
          html: html,
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

        let checkIndate = `${moment(result.checkInDate).format(
          "YYYY년 MM월 DD일"
        )} ${result.checkInTime}시`;

        let from = "info@finefarming.co.kr";
        let subject = `${username} 방문 완료 메일입니다.`;
        let farmerEmail = result.farm.owner.email;

        console.log("farmerEmail", farmerEmail, user.email);
        let to = `${farmerEmail}, ${user.email}`;
        console.log("to", to);
        let title = "방문 완료";
        let subTitle = `${username} 고객님 체험 상품의 리뷰를 남겨주세요.`;
        let html = adminDoneTemplet({
          farmName: farmName!,
          farmAddress: farmAddress!,
          checkIndate: checkIndate!,
          title,
          subTitle,
        });
        const mailData: any = {
          to: to,
          subject: subject,
          from: from,
          html: html,
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
