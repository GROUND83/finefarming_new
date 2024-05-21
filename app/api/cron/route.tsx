import db from "@/lib/db";
import dayjs from "dayjs";
import { NextRequest, NextResponse } from "next/server";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import sendMail from "@/lib/sendMail/sendMail";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Seoul");
export async function GET(request: NextRequest) {
  console.log("get");
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json(
      { message: "Unauthorized" },
      {
        status: 401,
      }
    );
  }

  let koreanSelectDay = dayjs().tz().format("YYYY-MM-DD");

  let plusDay = dayjs(koreanSelectDay).tz().add(1, "day").format();
  console.log("koreanSelectDay", koreanSelectDay, "plusDay", plusDay);
  let reservations = await db.reservation.findMany({
    where: {
      status: "complete",
      sendDate: koreanSelectDay,
    },
    include: {
      farm: {
        select: {
          reservationMin: true,
          name: true,
          owner: {
            select: {
              id: true,
              email: true,
              phone: true,
            },
          },
        },
      },
    },
  });
  let newObj: { [key: string]: any } = {};
  for (const reservation of reservations) {
    let farmEmail = reservation.farm.owner.email as string;
    const farmEmailExist = Object.keys(newObj).includes(farmEmail!);
    if (farmEmailExist) {
      //
      let newOb2 = newObj[farmEmail];
      const checkInTimeCheck = Object.keys(newObj[farmEmail]).includes(
        reservation.checkInTime!
      ) as any;
      if (checkInTimeCheck) {
        //
        newObj[farmEmail][reservation.checkInTime].push(reservation);
      } else {
        //
        newObj[farmEmail][reservation.checkInTime] = [reservation];
      }
      console.log("checkInTimeCheck", checkInTimeCheck);
    } else {
      newObj = {
        [farmEmail]: { [reservation.checkInTime]: [reservation] },
      };
    }
  }
  console.log("newObj", newObj);

  for (const [key, value] of Object.entries(newObj) as any) {
    let farmName = "";
    for (const [reservationCheckinTime, reservationDatas] of Object.entries(
      value
    ) as any) {
      let string = `<!doctype html> <html><body style="width:500px;padding:20px;">
      <div>
      <img
      src="https://imagedelivery.net/8GmAyNHLnOsSkmaGEU1nuA/bdab6fb3-d498-49e5-3a5b-d03c601c8d00/public"
      alt="finefarminglogo"
      title="Logo"
      style="display:block;width:100px;height:50px;"/>
      </div>
      <div  style="
      padding-left: 10px;
      width: 100%;
      marging-top:10px;
    ">
      <p style="font-size:22px; font-weight:bold;">${koreanSelectDay} ${reservationDatas[0].farm.name} 예약내역</p>
      </div>
        </div>
        `;
      string += `<div
        style="
          padding-left: 10px;
          width: 100%;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 10px;
          marging-top:10px;
        "
      >
        <span style="margin-left: 10px;font-size:22px;font-weight: bold;magin-top:10px;">${reservationCheckinTime}</span>
       </div>`;
      console.log(`${key}: ${value}`);
      for (const reservationData of reservationDatas) {
        farmName = reservationData.farm.name;

        let userName = reservationData.visitor;
        console.log("userName", userName);
        string += `<div
        style="
          padding-left: 10px;
          width: 100%;
          padding-top:10px;
        "
      >
        <span style="margin-left: 10px">${userName}</span>
       </div>`;

        if (reservationData.priceType === "GROUP") {
          //
          let groupPrice = reservationData.groupPrice;
          for (const member of reservationData.groupMember) {
            let startAge = member.startAge;
            let endAge = member.endAge;
            let isFree = member.isFree;
            let amount = member.amount;
            string += `<div
            style="
              padding-left: 10px;
              width: 100%;
  
            "
          >
            <span style="margin-left: 10px">${startAge}세</span>
            <span>~</spna>
            <span style="margin-left: 10px">${endAge}세 ${
              isFree ? "무료" : ""
            }</span>
            <span style="margin-left: 10px">${amount}명</span>
          </div>`;
          }
          for (const product of reservationData.subProduct) {
            let essentailtitle = product.title;
            let essentailprice = product.tipricetle;
            string += `<div
            style="
              padding-left: 10px;
              width: 100%;
  
            "
          >
            <span style="margin-left: 10px">필수체험</span>
            <span>~</spna>
            <span style="margin-left: 10px">${essentailtitle}</span>
          </div>`;
            let selectProducts = product.selectProducts.filter(
              (item: any) => item.amount >= 1
            );
            for (const selectProduct of selectProducts) {
              let selectProductTitle = selectProduct.title;
              let selectProductdescription = selectProduct.description;
              let selectProductamount = selectProduct.amount;
              let selectProductprice = selectProduct.price;
              string += `<div
              style="
                padding-left: 10px;
                width: 100%;
  
              "
            >
              <span style="margin-left: 10px">옵션추가</span>
              <span>~</spna>
              <span style="margin-left: 10px">${selectProductTitle}</span>
              <span style="margin-left: 10px">${selectProductamount}개</span>
            </div>`;
            }
          }
        } else {
          //

          for (const personalPrice of reservationData.personalPrice) {
            let startAge = personalPrice.startAge;
            let endAge = personalPrice.endAge;
            let isFree = personalPrice.isFree;
            let amount = personalPrice.Amount;
            string += `<div
            style="
              padding-left: 10px;
              width: 100%;
  
            "
          >
            <span style="margin-left: 10px">${startAge}세</span>
            <span>~</spna>
            <span style="margin-left: 10px">${endAge}세 ${
              isFree ? "무료" : ""
            }</span>
            <span style="margin-left: 10px">${amount}명</span>
          </div>`;
          }
          for (const product of reservationData.subProduct) {
            let essentailtitle = product.title;
            let essentailprice = product.tipricetle;
            string += `<div
            style="
              padding-left: 10px;
              width: 100%;
  
            "
          >
            <span style="margin-left: 10px">필수체험</span>
  
            <span style="margin-left: 10px">${essentailtitle}</span>
          </div>`;
            let selectProducts = product.selectProducts.filter(
              (item: any) => item.amount >= 1
            );
            for (const selectProduct of selectProducts) {
              let selectProductTitle = selectProduct.title;
              let selectProductdescription = selectProduct.description;
              let selectProductamount = selectProduct.amount;
              let selectProductprice = selectProduct.price;
              string += `<div
              style="
                padding-left: 10px;
                width: 100%;
  
              "
            >
              <span style="margin-left: 10px">옵션추가</span>
  
              <span style="margin-left: 10px">${selectProductTitle}</span>
              <span style="margin-left: 10px">${selectProductamount}개</span>
            </div>`;
            }
          }
        }
        string += `<div
        style="
          padding-left: 10px;
          width: 100%;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom:10px;
        "
      >
        <span style="margin-left: 10px">결제예정금액</span>
  
        <span style="margin-left: 10px">${reservationData.totalprice.toLocaleString()}원</span>
      </div>`;
      }
      string += `  <div style="margin-top: 50px">
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
    </body>
    </html>`;
      console.log(reservations);
      let to = `${key}`;
      const mailData: any = {
        to: to,
        subject: `${koreanSelectDay} ${farmName} 예약내역`,
        from: "info@finefarming.co.kr",
        html: string,
      };

      console.log("string", string);
      let sendResult = await sendMail(mailData);
      console.log("sendResult", sendResult);
    }
  }

  return NextResponse.json({ message: newObj }, { status: 200 });
}
