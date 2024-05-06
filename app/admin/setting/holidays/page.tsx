"use client";

import React from "react";
import { getHolidays } from "./_component/actions";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { holidaySchema, holidaySchemaType } from "./_component/holidaySchema";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Loader2, PlusIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ko } from "date-fns/locale";
import { FormFooter, FormTitle } from "../../_component/form/form";
import { LoadingEditSubmitButton } from "@/components/ButtonComponent";
import HolidayModal from "./_component/holidayModal";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import moment from "moment";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AddHolidayModal from "./_component/addHolidayModal";
import EditHolidayModal from "./_component/editHolidayModal";
import SubSectionWrap from "../../_component/subSectionWrap";

type listDataType = {
  id: number;
  dateName: string;
  day: string;
  locdate: string;
  month: string;
  year: string;
};

export default function Page({
  params,
}: {
  params: { id: string; productid: string };
}) {
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);
  const [yearRange, setYearRange] = React.useState<string[]>([]);
  const [selectYear, setSelectYear] = React.useState<string>(
    moment().format("YYYY")
  );
  const [listData, setListData] = React.useState<listDataType[]>([]);
  //
  const form = useForm<holidaySchemaType>({
    resolver: zodResolver(holidaySchema),
    defaultValues: {
      holidays: [{ dateName: "", year: "", month: "", day: "" }],
    },
  });
  const { fields, append, remove, prepend } = useFieldArray({
    control: form.control,
    name: "holidays",
  });

  const onSubmit = form.handleSubmit(async (data: holidaySchemaType) => {
    // 업로드 이미지
    // console.log("etdata", data);
    // // if (!file) {
    // //   return;
    // // }
    // setUpdateLoading(true);
    // let newData = JSON.stringify(data.optionProduct);
    // // console.log("data.approve", data.approve, typeof data.approve);
    // const formData = new FormData();
    // formData.append("newData", newData);
    // formData.append("productId", params.productid.toString());
    // try {
    //   let result = await upDateOptionProduct(formData);
    //   if (result) {
    //     // toast({
    //     //   duration: 3000,
    //     //   title: "수정완료",
    //     //   description: "데이터 수정이 완료 되었습니다.",
    //     // });
    //   }
    // } catch (e: any) {
    //   console.log(e);
    //   toast({
    //     duration: 3000,
    //     variant: "destructive",
    //     title: "수정 ERROR",
    //     description: `${e}`,
    //   });
    // } finally {
    //   await new Promise((resolve) => setTimeout(resolve, 1000));
    //   setUpdateLoading(false);
    //   // window.location.reload();
    // }
  });

  const reload = async () => {
    setLoading(true);
    console.log("reload");
    let response = await getHolidays(selectYear);
    console.log("response", response);
    // form.reset({ holidays: response });
    setListData(response);
    setLoading(false);
  };
  React.useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      console.log(
        "form.formState.isSubmitSuccessful",
        form.formState.isSubmitSuccessful
      );
      toast({
        duration: 3000,
        title: "수정완료",
        description: "데이터 수정이 완료 되었습니다.",
      });
      reload();
      console.log("done");
      // window.location.reload();
    }
  }, [form.formState.isSubmitSuccessful]);
  React.useEffect(() => {
    console.log("did", params);
    reload();
  }, [selectYear]);
  //
  React.useEffect(() => {
    let newData = [];
    newData.push(moment().format("YYYY"));
    newData.push(moment().add(1, "years").format("YYYY"));
    console.log(newData);
    setYearRange(newData);
  }, []);
  return (
    <div className=" w-full h-full">
      <SubSectionWrap isLoading={loading}>
        <div className="p-6 flex-1 border rounded-md  bg-white   grid grid-cols-12 gap-3 w-full  ">
          <div className=" col-span-4 flex flex-col items-start justify-start gap-6 ">
            <div className="flex flex-row items-center gap-3">
              <FormTitle
                title="공휴일"
                sub={"공휴일은 예약시 업체 설정에 따라 설정됩니다."}
              />
            </div>
            <div className="flex flex-col items-start gap-3">
              <Select onValueChange={setSelectYear} value={selectYear}>
                <SelectTrigger className="w-[180px] font-semibold">
                  <SelectValue placeholder="년도 선택" />
                </SelectTrigger>
                <SelectContent className="text-semibold">
                  {yearRange.map((year, index) => {
                    return (
                      <SelectItem
                        key={index}
                        value={year}
                        className=" font-semibold"
                      >
                        {year}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <HolidayModal reload={reload} />
              <AddHolidayModal year={selectYear} reload={reload} />
            </div>
          </div>
          <div className=" col-span-8">
            {listData.length > 0 ? (
              <div className="w-full flex flex-col items-start gap-1 mt-3">
                {listData.map((list, index) => {
                  return (
                    <div
                      key={list.id}
                      className="flex flex-row items-center gap-3 p-2 border w-full rounded-md text-sm justify-between"
                    >
                      <div className="flex flex-row items-center gap-3">
                        <p>{moment(list.locdate).format("YYYY년 MM월 DD일")}</p>
                        <p>{list.dateName}</p>
                      </div>
                      <EditHolidayModal holiday={list} reload={reload} />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="w-full flex flex-col items-center gap-1 mt-3 h-[50vh] justify-center text-sm text-neutral-500">
                <p>공휴일 데이터가 없습니다.</p>
                <p>공휴일 업데이트를 하거나 직접 추가하세요.</p>
              </div>
            )}
          </div>
        </div>
      </SubSectionWrap>
    </div>
  );
}
