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
import { getFarm } from "./_actions";

export default function Page() {
  const [farmItems, setFarmItems] = React.useState<any[]>([]);

  const [updateloading, setUpdateLoading] = React.useState(false);

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
    let data = await getFarm();
    console.log("farm", data);
    if (data && Array.isArray(data)) {
      const dataToexprot = data.map((item: any) => ({
        아이디: item.id,
        상품명: item.title,
        상품설명: item.description,
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
  return (
    <div className="w-full h-screen p-3">
      <div className="w-full flex-1">
        <p>데이터 베이스</p>
        <div className="w-full grid grid-cols-12 gap-3 mt-6">
          <div className=" aspect-square  border p-6 rounded-md col-span-2 flex flex-col items-center justify-center">
            <Button
              onClick={() => getFarmdata("업체리스트", "업체리스트")}
              variant={"outline"}
            >
              업체리스트
            </Button>
          </div>
          <div className=" aspect-square  border p-6 rounded-md col-span-2 flex flex-col items-center justify-center">
            <Button
              onClick={() => getProductdata("상품리스트", "상품리스트")}
              variant={"outline"}
            >
              상품리스트
            </Button>
          </div>
          <div className=" aspect-square  border p-6 rounded-md col-span-2 flex flex-col items-center justify-center">
            <Button
              onClick={() => getFarmdata("업체리스트", "업체리스트")}
              variant={"outline"}
            >
              예약
            </Button>
          </div>
          <div className=" aspect-square  border p-6 rounded-md col-span-2 flex flex-col items-center justify-center">
            <Button
              onClick={() => getFarmdata("업체리스트", "업체리스트")}
              variant={"outline"}
            >
              리뷰
            </Button>
          </div>
          <div className=" aspect-square  border p-6 rounded-md col-span-2 flex flex-col items-center justify-center">
            <Button
              onClick={() => getFarmdata("업체리스트", "업체리스트")}
              variant={"outline"}
            >
              메거진
            </Button>
          </div>
          <div className=" aspect-square  border p-6 rounded-md col-span-2 flex flex-col items-center justify-center">
            <Button
              onClick={() => getFarmdata("업체리스트", "업체리스트")}
              variant={"outline"}
            >
              매일구독자
            </Button>
          </div>
          <div className=" aspect-square  border p-6 rounded-md col-span-2 flex flex-col items-center justify-center">
            <Button
              onClick={() => getFarmdata("업체리스트", "업체리스트")}
              variant={"outline"}
            >
              농장주
            </Button>
          </div>
          <div className=" aspect-square  border p-6 rounded-md col-span-2 flex flex-col items-center justify-center">
            <Button
              onClick={() => getFarmdata("업체리스트", "업체리스트")}
              variant={"outline"}
            >
              작가
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
