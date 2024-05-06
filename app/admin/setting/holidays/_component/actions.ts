"use server";

import db from "@/lib/db";
import HolidaysKr from "holidays-kr";
export async function getHolidays(year: string) {
  const result = await db.holiday.findMany({
    where: {
      year,
    },
    orderBy: {
      locdate: "asc",
    },
  });

  return result;
}

export async function getPublicHoldays(year: string) {
  //
  const url =
    "http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo";
  const params: any = {
    // 필요한 query params를 {} 형태에 담아준다.
    solYear: year,

    ServiceKey: process.env.NATIONAL_HOLIDAY,
    numOfRows: 100,

    _type: "json",
  };
  const queryString = new URLSearchParams(params).toString();
  const requrl = `${url}?${queryString}`;
  try {
    const response = await fetch(requrl);
    // console.log(res);
    // const xmlString = await response.text();
    const data = await response.json();
    // console.log("data", data);
    if (data.response.header.resultCode === "00") {
      let array = data.response.body.items.item;
      for await (const item of array) {
        delete item.dateKind;
        delete item.seq;
        delete item.isHoliday;
        let yearString = item.locdate.toString();
        let year = yearString.substr(0, 4);
        let month = yearString.substr(4, 2);
        let day = yearString.substr(6, 2);
        item.year = year;
        item.month = month;
        item.day = day;
        item.locdate = item.locdate.toString();
      }
      return array;
    }
    return { error: "no list" };
  } catch (e) {
    console.log(e);
    return { error: e };
  }
}

export async function updateHolidays(newData: string) {
  //

  if (newData) {
    let data = JSON.parse(newData);
    console.log("data", data);
    let year = data[0].year;
    let deletedata = await db.holiday.deleteMany({
      where: {
        year: year,
      },
    });
    let createHoliday = await db.holiday.createMany({
      data: data,
    });
    return createHoliday;
  }
}

export async function editHolidays(newData: string) {
  //

  if (newData) {
    console.log(newData);
    let data = JSON.parse(newData);
    console.log("data", data);

    let createHoliday = await db.holiday.update({
      where: {
        id: data.id,
      },
      data: data,
    });
    return createHoliday;
  }
}
export async function deleteHoliday(id: number) {
  //

  let createHoliday = await db.holiday.delete({
    where: {
      id: id,
    },
  });

  return createHoliday;
}
