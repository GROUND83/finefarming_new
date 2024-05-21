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
  const result = reservations.reduce((acc: any, curr: any) => {
    const { checkInTime } = curr;
    if (acc[checkInTime]) acc[checkInTime].push(curr); // [3]
    else acc[checkInTime] = [curr]; // [4]
    return acc;
  }, {});

  for (const [key, value] of Object.entries(result) as any) {
    for (const val of value) {
      console.log(`${key}: ${value}`);
      let string = `<!doctype html> <html>
      <body style="width:500px;border:1px solid #e5e7eb;padding:20px;">
      <div>
      <img
      src="https://imagedelivery.net/8GmAyNHLnOsSkmaGEU1nuA/bdab6fb3-d498-49e5-3a5b-d03c601c8d00/public"
      alt="finefarminglogo"
      title="Logo"
      style="display:block;width:100px;height:50px;"

    />
    <div  style="
    padding-left: 10px;
    width: 100%;
    marging-top:10px;
  ">
    <p>${koreanSelectDay} ${val.farm.name} 예약내역</p>
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
      <span style="margin-left: 10px;font-size:22px;font-weight: bold;">${key}</span>
     </div>`;
      let userName = val.visitor;
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

      if (val.priceType === "GROUP") {
        //
        let groupPrice = val.groupPrice;
        for (const member of val.groupMember) {
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
        for (const product of val.subProduct) {
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

        for (const personalPrice of val.personalPrice) {
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
        for (const product of val.subProduct) {
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

      <span style="margin-left: 10px">${val.totalprice.toLocaleString()}원</span>
    </div>`;
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
    </div></body>
    </html>`;
      console.log(reservations, result, string);
      let to = `${val.farm.owner.email}`;
      const mailData: any = {
        to: to,
        subject: `${koreanSelectDay} ${val.farm.name} 예약내역`,
        from: "info@finefarming.co.kr",
        html: string,
      };
      let sendResult = await sendMail(mailData);
      console.log("sendResult", sendResult);
    }
  }

  return NextResponse.json({ message: result }, { status: 200 });
}
