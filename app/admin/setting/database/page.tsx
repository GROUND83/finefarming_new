"use client";
import React from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import { MinusIcon } from "lucide-react";

import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { LoadingEditSubmitButton } from "@/components/ButtonComponent";

import { FormTitle } from "../../_component/form/form";
import { toast } from "sonner";
import {
  getFamers,
  getFarm,
  getMagazines,
  getProducts,
  getReservations,
  getReviews,
  getSubscribers,
  getUser,
  getWriter,
} from "./_actions";

export default function Page() {
  const getFarmdata = async (title?: string, worksheetname?: string) => {
    let data = await getFarm();
    console.log("farm", data);
    if (data && Array.isArray(data)) {
      const dataToexprot = data.map((item: any) => ({
        아이디: item.id,
        농장명: item.name,
        이니셜: item.initail,
        농장주: item.owner.username,
        농장주연락처: item.owner?.phone,
        농장주이메일: item.owner?.email,
        사업자번호: item.companyNumber,
        대표번호: item.mainPhone,
        예약담당자: item.resevationManager,
        예약담당자연락처: item.resevationManager,
        주소: item.address,
        lat: item.lat,
        lang: item.lang,
        공개여부: item.visible ? "공개" : "비공개",
      }));
      const workbook = XLSX.utils.book_new();
      let objectMaxLength = [] as any;

      const worksheet = XLSX.utils?.json_to_sheet(dataToexprot);
      data.forEach((arr: any) => {
        for (const key in arr) {
          console.log("key", key);
          let len = 0;
          switch (typeof arr[key]) {
            case "number":
              len = arr[key].toString().length;
              break;
            case "string":
              len = arr[key].length;
              break;
            case "object":
              if (arr[key] instanceof Date) len = 10;
              break;
          }
          objectMaxLength[0] = { wpx: 50 };
          if (key === "name") {
            if (objectMaxLength[1]) {
              console.log("objectMaxLength", objectMaxLength[1]);
              objectMaxLength[1] = {
                wpx: Math.max(objectMaxLength[1].wpx, len * 10),
              };
            } else {
              objectMaxLength[1] = { wpx: len * 10 };
            }
          }

          objectMaxLength[2] = { wpx: 80 };
          objectMaxLength[3] = { wpx: 80 };
          objectMaxLength[4] = { wpx: 120 };
          objectMaxLength[5] = { wpx: 200 };
          objectMaxLength[6] = { wpx: 120 };
          objectMaxLength[7] = { wpx: 80 };
          objectMaxLength[8] = { wpx: 80 };
          objectMaxLength[9] = { wpx: 80 };
          objectMaxLength[10] = { wpx: 300 };
          objectMaxLength[11] = { wpx: 120 };
          objectMaxLength[12] = { wpx: 120 };
          objectMaxLength[13] = { wpx: 100 };
        }
      });
      console.log("worksheetCols", objectMaxLength);
      worksheet["!cols"] = objectMaxLength;

      worksheet["!rows"] = [
        {
          hpx: 20,
        }, // "pixels" in row1
        {
          hpx: 20,
        }, // "pixels" in row2
      ];
      XLSX.utils.book_append_sheet(workbook, worksheet, worksheetname);
      // Save the workbook as an Excel file
      XLSX.writeFile(workbook, `${title}.xlsx`);
      console.log(`Exported data to ${title}.xlsx`);
    }
  };
  const getProductdata = async (title?: string, worksheetname?: string) => {
    let data = await getProducts();
    console.log("product", data);
    if (data && Array.isArray(data)) {
      const dataToexprot = data.map((item: any) => ({
        아이디: item.id,
        노출여부: item.visible ? "노출" : "비노출",
        상품명: item.title,
        상품설명: item.description,
        상품진행설명: item.process,
        상품진행설명노티스: item.processNotice,
        가격타입: item.priceType === "PERSONAL" ? "개인" : "그룹",
        그룹리밋: item.groupLimit,
        그룹가격: item.groupPrice,
        그룹인원요금: item.groupMember,
        개별인원요금: item.personalPrice,
        체험실내공간: item.farmInsideType ? "실내" : "실외",
        도구및복장: item.tools,
        도구복장안내문구: item.cloth,
        교육안내문구: item.educationTitle,
        교육자료제공: item.educationData ? "제공" : "미제공",
        예약max: item.reservationMax,
        예약min: item.reservationMin,
        // 상테: item.status,
      }));
      const workbook = XLSX.utils.book_new();
      let objectMaxLength = [] as any;

      const worksheet = XLSX.utils?.json_to_sheet(dataToexprot);
      data.forEach((arr: any) => {
        for (const key in arr) {
          console.log("key", key);
          let len = 0;
          switch (typeof arr[key]) {
            case "number":
              len = arr[key].toString().length;
              break;
            case "string":
              len = arr[key].length;
              break;
            case "object":
              if (arr[key] instanceof Date) len = 10;
              break;
          }
          objectMaxLength[0] = { wpx: 50 };
          if (key === "title") {
            if (objectMaxLength[2]) {
              console.log("objectMaxLength", objectMaxLength[2]);
              objectMaxLength[2] = {
                wpx: Math.max(objectMaxLength[2].wpx, len * 10),
              };
            } else {
              objectMaxLength[2] = { wpx: len * 10 };
            }
          }
          if (key === "description") {
            if (objectMaxLength[3]) {
              console.log("objectMaxLength", objectMaxLength[2]);
              objectMaxLength[3] = {
                wpx: Math.max(objectMaxLength[3].wpx, len * 10),
              };
            } else {
              objectMaxLength[3] = { wpx: len * 10 };
            }
          }
          if (key === "processNotice") {
            if (objectMaxLength[5]) {
              console.log("objectMaxLength", objectMaxLength[2]);
              objectMaxLength[5] = {
                wpx: Math.max(objectMaxLength[5].wpx, len * 10),
              };
            } else {
              objectMaxLength[5] = { wpx: len * 10 };
            }
          }
          if (key === "cloth") {
            if (objectMaxLength[13]) {
              console.log("objectMaxLength", objectMaxLength[2]);
              objectMaxLength[13] = {
                wpx: Math.max(objectMaxLength[13].wpx, len * 10),
              };
            } else {
              objectMaxLength[13] = { wpx: len * 10 };
            }
          }
          if (key === "educationTitle") {
            if (objectMaxLength[14]) {
              console.log("objectMaxLength", objectMaxLength[2]);
              objectMaxLength[14] = {
                wpx: Math.max(objectMaxLength[14].wpx, len * 10),
              };
            } else {
              objectMaxLength[14] = { wpx: len * 10 };
            }
          }
          // objectMaxLength[2] = { wpx: 80 };
          // objectMaxLength[3] = { wpx: 300 };
          objectMaxLength[4] = { wpx: 80 };
          // objectMaxLength[5] = { wpx: 80 };
          objectMaxLength[6] = { wpx: 80 };
          objectMaxLength[7] = { wpx: 80 };
          objectMaxLength[8] = { wpx: 80 };
          objectMaxLength[9] = { wpx: 80 };
          objectMaxLength[10] = { wpx: 80 };
          objectMaxLength[11] = { wpx: 80 };
          objectMaxLength[12] = { wpx: 80 };
          objectMaxLength[15] = { wpx: 80 };
          objectMaxLength[16] = { wpx: 80 };
          objectMaxLength[17] = { wpx: 80 };
        }
      });
      console.log("worksheetCols", objectMaxLength);
      worksheet["!cols"] = objectMaxLength;

      worksheet["!rows"] = [
        {
          hpx: 20,
        }, // "pixels" in row1
        {
          hpx: 20,
        }, // "pixels" in row2
      ];
      XLSX.utils.book_append_sheet(workbook, worksheet, worksheetname);
      // Save the workbook as an Excel file
      XLSX.writeFile(workbook, `${title}.xlsx`);
      console.log(`Exported data to ${title}.xlsx`);
    }
  };
  const getReservationdata = async (title?: string, worksheetname?: string) => {
    let data = await getReservations();
    console.log("product", data);
    if (data && Array.isArray(data)) {
      const dataToexprot = data.map((item: any) => ({
        아이디: item.id,
        상태:
          item.status === "done"
            ? "방문완료"
            : item.status === "cancle"
            ? "최소"
            : item.status === "waiting"
            ? "확정대기"
            : item.status === "noshow"
            ? "노쇼"
            : item.status === "managercancle"
            ? "매니저취소"
            : item.status === "complete"
            ? "예약확정"
            : "",
        예약자: item.user.username,
        상품: item.product.title,
        방문자: item.visitor,
        가격타입: item.priceType === "PERSONAL" ? "개인" : "그룹",
        예약총인원: item.totalAmount,
        총가격: item.totalprice,
        체크인: item.checkInDate,
        체크인시간: item.checkInTime,
        생성일: item.created_at,
      }));
      const workbook = XLSX.utils.book_new();
      let objectMaxLength = [] as any;

      const worksheet = XLSX.utils?.json_to_sheet(dataToexprot);
      data.forEach((arr: any) => {
        for (const key in arr) {
          console.log("key", key);
          let len = 0;
          switch (typeof arr[key]) {
            case "number":
              len = arr[key].toString().length;
              break;
            case "string":
              len = arr[key].length;
              break;
            case "object":
              if (arr[key] instanceof Date) len = 10;
              break;
          }
          objectMaxLength[0] = { wpx: 50 };

          if (key === "status") {
            if (objectMaxLength[1]) {
              console.log("objectMaxLength", objectMaxLength[1]);
              objectMaxLength[1] = {
                wpx: Math.max(objectMaxLength[1].wpx, len * 10),
              };
            } else {
              objectMaxLength[1] = { wpx: len * 10 };
            }
          }

          objectMaxLength[2] = { wpx: 200 };
          objectMaxLength[3] = { wpx: 200 };
          objectMaxLength[4] = { wpx: 150 };
          objectMaxLength[5] = { wpx: 80 };
          objectMaxLength[6] = { wpx: 80 };
          objectMaxLength[7] = { wpx: 80 };
          objectMaxLength[8] = { wpx: 80 };
          objectMaxLength[9] = { wpx: 80 };
          objectMaxLength[10] = { wpx: 80 };
          // objectMaxLength[11] = { wpx: 120 };
          // objectMaxLength[12] = { wpx: 120 };
          // objectMaxLength[13] = { wpx: 100 };
        }
      });
      console.log("worksheetCols", objectMaxLength);
      worksheet["!cols"] = objectMaxLength;

      worksheet["!rows"] = [
        {
          hpx: 20,
        }, // "pixels" in row1
        {
          hpx: 20,
        }, // "pixels" in row2
      ];
      XLSX.utils.book_append_sheet(workbook, worksheet, worksheetname);
      // Save the workbook as an Excel file
      XLSX.writeFile(workbook, `${title}.xlsx`);
      console.log(`Exported data to ${title}.xlsx`);
    }
  };
  const getReviewData = async (title?: string, worksheetname?: string) => {
    let data = await getReviews();
    console.log("product", data);
    if (data && Array.isArray(data)) {
      const dataToexprot = data.map((item: any) => ({
        아이디: item.id,
        상태: item.visible ? "노출" : "비노출",
        작성자: item.user.username,
        상품: item.product.title,
        내용: item.title,
        점수: item.point,
      }));
      const workbook = XLSX.utils.book_new();
      let objectMaxLength = [] as any;

      const worksheet = XLSX.utils?.json_to_sheet(dataToexprot);
      data.forEach((arr: any) => {
        for (const key in arr) {
          console.log("key", key);
          let len = 0;
          switch (typeof arr[key]) {
            case "number":
              len = arr[key].toString().length;
              break;
            case "string":
              len = arr[key].length;
              break;
            case "object":
              if (arr[key] instanceof Date) len = 10;
              break;
          }
          objectMaxLength[0] = { wpx: 50 };
          objectMaxLength[1] = { wpx: 50 };
          objectMaxLength[2] = { wpx: 80 };
          objectMaxLength[3] = { wpx: 200 };
          objectMaxLength[4] = { wpx: 400 };
          objectMaxLength[5] = { wpx: 80 };
        }
      });
      console.log("worksheetCols", objectMaxLength);
      worksheet["!cols"] = objectMaxLength;

      worksheet["!rows"] = [
        {
          hpx: 20,
        }, // "pixels" in row1
        {
          hpx: 20,
        }, // "pixels" in row2
      ];
      XLSX.utils.book_append_sheet(workbook, worksheet, worksheetname);
      // Save the workbook as an Excel file
      XLSX.writeFile(workbook, `${title}.xlsx`);
      console.log(`Exported data to ${title}.xlsx`);
    }
  };
  const getMagazineData = async (title?: string, worksheetname?: string) => {
    let data = await getMagazines();
    console.log("product", data);
    if (data && Array.isArray(data)) {
      const dataToexprot = data.map((item: any) => ({
        아이디: item.id,
        상태: item.visible ? "노출" : "비노출",
        작성자: item.author.username,
        타이틀: item.title,
        상품: item.product.title,
      }));
      const workbook = XLSX.utils.book_new();
      let objectMaxLength = [] as any;

      const worksheet = XLSX.utils?.json_to_sheet(dataToexprot);
      data.forEach((arr: any) => {
        for (const key in arr) {
          console.log("key", key);
          let len = 0;
          switch (typeof arr[key]) {
            case "number":
              len = arr[key].toString().length;
              break;
            case "string":
              len = arr[key].length;
              break;
            case "object":
              if (arr[key] instanceof Date) len = 10;
              break;
          }
          objectMaxLength[0] = { wpx: 50 };
          objectMaxLength[1] = { wpx: 50 };

          objectMaxLength[2] = { wpx: 200 };
          objectMaxLength[3] = { wpx: 400 };
          objectMaxLength[4] = { wpx: 200 };
        }
      });
      console.log("worksheetCols", objectMaxLength);
      worksheet["!cols"] = objectMaxLength;

      worksheet["!rows"] = [
        {
          hpx: 20,
        }, // "pixels" in row1
        {
          hpx: 20,
        }, // "pixels" in row2
      ];
      XLSX.utils.book_append_sheet(workbook, worksheet, worksheetname);
      // Save the workbook as an Excel file
      XLSX.writeFile(workbook, `${title}.xlsx`);
      console.log(`Exported data to ${title}.xlsx`);
    }
  };
  const getSubscriptionData = async (
    title?: string,
    worksheetname?: string
  ) => {
    let data = await getSubscribers();
    console.log("product", data);
    if (data && Array.isArray(data)) {
      const dataToexprot = data.map((item: any) => ({
        아이디: item.id,
        이메일: item.email,
        생성일: item.created_at,
      }));
      const workbook = XLSX.utils.book_new();
      let objectMaxLength = [] as any;

      const worksheet = XLSX.utils?.json_to_sheet(dataToexprot);
      data.forEach((arr: any) => {
        for (const key in arr) {
          console.log("key", key);
          let len = 0;
          switch (typeof arr[key]) {
            case "number":
              len = arr[key].toString().length;
              break;
            case "string":
              len = arr[key].length;
              break;
            case "object":
              if (arr[key] instanceof Date) len = 10;
              break;
          }
          objectMaxLength[0] = { wpx: 50 };

          objectMaxLength[1] = { wpx: 200 };

          objectMaxLength[2] = { wpx: 80 };
        }
      });
      console.log("worksheetCols", objectMaxLength);
      worksheet["!cols"] = objectMaxLength;

      worksheet["!rows"] = [
        {
          hpx: 20,
        }, // "pixels" in row1
        {
          hpx: 20,
        }, // "pixels" in row2
      ];
      XLSX.utils.book_append_sheet(workbook, worksheet, worksheetname);
      // Save the workbook as an Excel file
      XLSX.writeFile(workbook, `${title}.xlsx`);
      console.log(`Exported data to ${title}.xlsx`);
    }
  };
  const getFamerData = async (title?: string, worksheetname?: string) => {
    let data = await getFamers();
    console.log("product", data);
    if (data && Array.isArray(data)) {
      const dataToexprot = data.map((item: any) => ({
        아이디: item.id,
        승인: item.approve ? "승인" : "미승인",
        이름: item.username,
        이메일: item.email,
        전화번호: item.phone,
        생성일: item.created_at,
      }));
      const workbook = XLSX.utils.book_new();
      let objectMaxLength = [] as any;

      const worksheet = XLSX.utils?.json_to_sheet(dataToexprot);
      data.forEach((arr: any) => {
        for (const key in arr) {
          console.log("key", key);
          let len = 0;
          switch (typeof arr[key]) {
            case "number":
              len = arr[key].toString().length;
              break;
            case "string":
              len = arr[key].length;
              break;
            case "object":
              if (arr[key] instanceof Date) len = 10;
              break;
          }
          objectMaxLength[0] = { wpx: 50 };

          objectMaxLength[1] = { wpx: 50 };

          objectMaxLength[2] = { wpx: 200 };
          objectMaxLength[3] = { wpx: 300 };
          objectMaxLength[4] = { wpx: 200 };
        }
      });
      console.log("worksheetCols", objectMaxLength);
      worksheet["!cols"] = objectMaxLength;

      worksheet["!rows"] = [
        {
          hpx: 20,
        }, // "pixels" in row1
        {
          hpx: 20,
        }, // "pixels" in row2
      ];
      XLSX.utils.book_append_sheet(workbook, worksheet, worksheetname);
      // Save the workbook as an Excel file
      XLSX.writeFile(workbook, `${title}.xlsx`);
      console.log(`Exported data to ${title}.xlsx`);
    }
  };
  const getWriterData = async (title?: string, worksheetname?: string) => {
    let data = await getWriter();
    console.log("product", data);
    if (data && Array.isArray(data)) {
      const dataToexprot = data.map((item: any) => ({
        아이디: item.id,
        승인: item.approve ? "승인" : "미승인",
        이름: item.username,
        이메일: item.email,
        전화번호: item.phone,
        소개글타이틀: item.intruduceTitle,
        소개글: item.intruduce,
        링크: item.link,
        생성일: item.created_at,
      }));
      const workbook = XLSX.utils.book_new();
      let objectMaxLength = [] as any;

      const worksheet = XLSX.utils?.json_to_sheet(dataToexprot);
      data.forEach((arr: any) => {
        for (const key in arr) {
          console.log("key", key);
          let len = 0;
          switch (typeof arr[key]) {
            case "number":
              len = arr[key].toString().length;
              break;
            case "string":
              len = arr[key].length;
              break;
            case "object":
              if (arr[key] instanceof Date) len = 10;
              break;
          }

          objectMaxLength[0] = { wpx: 50 };

          objectMaxLength[1] = { wpx: 50 };

          objectMaxLength[2] = { wpx: 200 };
          objectMaxLength[3] = { wpx: 300 };
          objectMaxLength[4] = { wpx: 200 };
          objectMaxLength[5] = { wpx: 200 };
          objectMaxLength[6] = { wpx: 200 };
          objectMaxLength[7] = { wpx: 200 };
        }
      });
      console.log("worksheetCols", objectMaxLength);
      worksheet["!cols"] = objectMaxLength;

      worksheet["!rows"] = [
        {
          hpx: 20,
        }, // "pixels" in row1
        {
          hpx: 20,
        }, // "pixels" in row2
      ];
      XLSX.utils.book_append_sheet(workbook, worksheet, worksheetname);
      // Save the workbook as an Excel file
      XLSX.writeFile(workbook, `${title}.xlsx`);
      console.log(`Exported data to ${title}.xlsx`);
    }
  };
  const getUserData = async (title?: string, worksheetname?: string) => {
    let data = await getUser();
    console.log("product", data);
    if (data && Array.isArray(data)) {
      const dataToexprot = data.map((item: any) => ({
        아이디: item.id,
        승인: item.approve ? "승인" : "미승인",
        이름: item.username,
        이메일: item.email,
        전화번호: item.phone,
        provider: item.provider,

        생성일: item.created_at,
      }));
      const workbook = XLSX.utils.book_new();
      let objectMaxLength = [] as any;

      const worksheet = XLSX.utils?.json_to_sheet(dataToexprot);
      data.forEach((arr: any) => {
        for (const key in arr) {
          // console.log("key", key);
          let len = 0;
          switch (typeof arr[key]) {
            case "number":
              len = arr[key].toString().length;
              break;
            case "string":
              len = arr[key].length;
              break;
            case "object":
              if (arr[key] instanceof Date) len = 10;
              break;
          }
          objectMaxLength[0] = { wpx: 50 };
          objectMaxLength[1] = { wpx: 50 };

          objectMaxLength[2] = { wpx: 200 };
          objectMaxLength[3] = { wpx: 400 };
          objectMaxLength[4] = { wpx: 200 };
        }
      });
      console.log("worksheetCols", objectMaxLength);
      worksheet["!cols"] = objectMaxLength;

      worksheet["!rows"] = [
        {
          hpx: 20,
        }, // "pixels" in row1
        {
          hpx: 20,
        }, // "pixels" in row2
      ];
      XLSX.utils.book_append_sheet(workbook, worksheet, worksheetname);
      // Save the workbook as an Excel file
      XLSX.writeFile(workbook, `${title}.xlsx`);
      console.log(`Exported data to ${title}.xlsx`);
    }
  };
  return (
    <div className="w-full h-screen p-3">
      <div className="w-full flex-1">
        <p>데이터 베이스</p>
        <div className="w-full grid grid-cols-12 gap-3 mt-6">
          <div className=" aspect-square  border p-6 rounded-md col-span-2 flex flex-col items-center justify-center bg-white">
            <Button
              onClick={() => getFarmdata("업체리스트", "업체리스트")}
              variant={"outline"}
            >
              업체리스트
            </Button>
          </div>
          <div className=" aspect-square  border p-6 rounded-md col-span-2 flex flex-col items-center justify-center bg-white">
            <Button
              onClick={() => getProductdata("상품리스트", "상품리스트")}
              variant={"outline"}
            >
              상품리스트
            </Button>
          </div>
          <div className=" aspect-square  border p-6 rounded-md col-span-2 flex flex-col items-center justify-center bg-white">
            <Button
              onClick={() => getReservationdata("예약리스트", "예약리스트")}
              variant={"outline"}
            >
              예약
            </Button>
          </div>
          <div className=" aspect-square  border p-6 rounded-md col-span-2 flex flex-col items-center justify-center bg-white">
            <Button
              onClick={() => getReviewData("리뷰리스트", "리뷰리스트")}
              variant={"outline"}
            >
              리뷰
            </Button>
          </div>
          <div className=" aspect-square  border p-6 rounded-md col-span-2 flex flex-col items-center justify-center bg-white">
            <Button
              onClick={() => getMagazineData("메거진리스트", "메거진리스트")}
              variant={"outline"}
            >
              메거진
            </Button>
          </div>
          <div className=" aspect-square  border p-6 rounded-md col-span-2 flex flex-col items-center justify-center bg-white">
            <Button
              onClick={() =>
                getSubscriptionData("매일구독자리스트", "매일구독자리스트")
              }
              variant={"outline"}
            >
              매일구독자
            </Button>
          </div>
          <div className=" aspect-square  border p-6 rounded-md col-span-2 flex flex-col items-center justify-center bg-white">
            <Button
              onClick={() => getFamerData("농장주리스트", "농장주리스트")}
              variant={"outline"}
            >
              농장주
            </Button>
          </div>
          <div className=" aspect-square  border p-6 rounded-md col-span-2 flex flex-col items-center justify-center bg-white">
            <Button
              onClick={() => getWriterData("작가리스트", "작가리스트")}
              variant={"outline"}
            >
              작가
            </Button>
          </div>
          <div className=" aspect-square  border p-6 rounded-md col-span-2 flex flex-col items-center justify-center bg-white">
            <Button
              onClick={() => getUserData("고객리스트", "고객리스트")}
              variant={"outline"}
            >
              고객
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
