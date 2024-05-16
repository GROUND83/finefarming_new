"use client";
import React from "react";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { getOpenData, updateData } from "./_compoents/actions";
import { LoadingEditSubmitButton } from "@/components/ButtonComponent";
import { editSchema, editSchemaType } from "./_compoents/editSchema";
import { Switch } from "@/components/ui/switch";
import { notFound } from "next/navigation";
import { FormTitle, FormWrap } from "@/app/admin/_component/form/form";
import SubSectionWrap from "@/app/admin/_component/subSectionWrap";
const timeData = [
  "9:00",
  "9:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
];
//
export default function Page({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(false);
  const [updateloading, setUpdateLoading] = useState(false);

  const form = useForm<editSchemaType>({
    resolver: zodResolver(editSchema),
    defaultValues: {},
  });
  const onSubmit = form.handleSubmit(async (data: editSchemaType) => {
    // 업로드 이미지
    console.log("etdata", data);
    // if (!file) {
    //   return;
    // }
    setUpdateLoading(true);

    // console.log("data.approve", data.approve, typeof data.approve);
    let newData = JSON.stringify(data);
    const formData = new FormData();
    formData.append("newData", newData);
    formData.append("id", params.id);
    try {
      const result = await updateData(formData);
    } catch (e: any) {
      console.log(e);
      toast.error(`${e}`);
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setUpdateLoading(false);
      // window.location.reload();
    }
  });

  const reload = async () => {
    setLoading(true);
    const id = Number(params.id);
    if (isNaN(id)) {
      notFound();
    }
    let data = await getOpenData(id);
    if (!data) {
      notFound();
    }

    form.reset({
      mondayOpen: data.mondayOpen ?? "",
      mondayStart: data.mondayStart ?? "",
      mondayEnd: data.mondayEnd ?? "",
      tuesdayOpen: data.tuesdayOpen ?? "",
      tuesdayStart: data.tuesdayStart ?? "",
      tuesdayEnd: data.tuesdayEnd ?? "",
      wednesdayOpen: data.wednesdayOpen ?? "",
      wednesdayStart: data.wednesdayStart ?? "",
      wednesdayEnd: data.wednesdayEnd ?? "",
      thursdayOpen: data.thursdayOpen ?? "",
      thursdayStart: data.thursdayStart ?? "",
      thursdayEnd: data.thursdayEnd ?? "",
      fridayOpen: data.fridayOpen ?? "",
      fridayStart: data.fridayStart ?? "",
      fridayEnd: data.fridayEnd ?? "",
      saturdayOpen: data.saturdayOpen ?? "",
      saturdayStart: data.saturdayStart ?? "",
      saturdayEnd: data.saturdayEnd ?? "",
      sundayOpen: data.sundayOpen ?? "",
      sundayStart: data.sundayStart ?? "",
      sundayEnd: data.sundayEnd ?? "",
      holidayOpen: data.holidayOpen ?? "",
      holidayStart: data.holidayStart ?? "",
      holidayEnd: data.holidayEnd ?? "",
    });
    setLoading(false);
  };
  //
  React.useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      console.log(
        "form.formState.isSubmitSuccessful",
        form.formState.isSubmitSuccessful
      );
      toast.success("데이터 수정이 완료 되었습니다.");
      reload();
      console.log("done");
      // window.location.reload();
    }
  }, [form.formState.isSubmitSuccessful]);
  //
  React.useEffect(() => {
    reload();
  }, []);
  return (
    <div className=" w-full flex flex-col items-start h-full  flex-1  ">
      <SubSectionWrap isLoading={loading}>
        <div className="w-full   flex-1 flex ">
          <div className="p-6 flex-1 border rounded-md  bg-white   flex flex-col items-start justify-between w-full  ">
            <Form {...form}>
              <form
                className="w-full flex flex-col items-start gap-6 text-sm "
                onSubmit={onSubmit}
              >
                <FormWrap>
                  <FormTitle title="체험 정보" sub="" />

                  <div className="col-span-9 grid grid-cols-2 gap-6 ">
                    <div className="col-span-1  border p-6 rounded-md gap-3 ">
                      <FormField
                        control={form.control}
                        name="mondayOpen"
                        render={({ field }) => {
                          return (
                            <div>
                              <FormItem className="flex flex-row items-center gap-2 w-full justify-between ">
                                <span className="text-sm font-semibold">
                                  월요일
                                </span>
                                <div className="flex flex-row items-center gap-3">
                                  <FormControl>
                                    <Switch
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                  <FormLabel className="">
                                    {field.value === true ? "운영" : "휴무"}
                                  </FormLabel>
                                </div>
                              </FormItem>
                            </div>
                          );
                        }}
                      />

                      <div className="flex flex-row items-center gap-6 flex-1 mt-3">
                        <div className="flex-1">
                          <FormField
                            control={form.control}
                            name="mondayStart"
                            render={({ field }) => {
                              return (
                                <FormItem>
                                  <span className="text-neutral-500">
                                    운영시작
                                  </span>
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value || ""}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="시작" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {timeData.map((item, index) => (
                                        <SelectItem key={index} value={item}>
                                          {item}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>

                                  <FormMessage />
                                </FormItem>
                              );
                            }}
                          />
                        </div>
                        <div className="flex flex-col items-center justify-center h-full mt-4">
                          <p>~</p>
                        </div>
                        <div className="flex-1">
                          <FormField
                            control={form.control}
                            name="mondayEnd"
                            render={({ field }) => {
                              return (
                                <FormItem>
                                  <span className="text-neutral-500">종료</span>
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value || ""}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="종료" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {timeData.map((item, index) => (
                                        <SelectItem key={index} value={item}>
                                          {item}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>

                                  <FormMessage />
                                </FormItem>
                              );
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-span-1  border p-6 rounded-md gap-3 ">
                      <FormField
                        control={form.control}
                        name="tuesdayOpen"
                        render={({ field }) => {
                          return (
                            <div>
                              <FormItem className="flex flex-row items-center gap-2 w-full justify-between ">
                                <span className="text-sm font-semibold">
                                  화요일
                                </span>
                                <div className="flex flex-row items-center gap-3">
                                  <FormControl>
                                    <Switch
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                  <FormLabel className="">
                                    {field.value === true ? "운영" : "휴무"}
                                  </FormLabel>
                                </div>
                              </FormItem>
                            </div>
                          );
                        }}
                      />

                      <div className="flex flex-row items-center gap-6 flex-1 mt-3">
                        <div className="flex-1">
                          <FormField
                            control={form.control}
                            name="tuesdayStart"
                            render={({ field }) => {
                              return (
                                <FormItem>
                                  <span className="text-neutral-500">
                                    운영시작
                                  </span>
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value || ""}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="시작" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {timeData.map((item, index) => (
                                        <SelectItem key={index} value={item}>
                                          {item}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>

                                  <FormMessage />
                                </FormItem>
                              );
                            }}
                          />
                        </div>
                        <div className="flex flex-col items-center justify-center h-full mt-4">
                          <p>~</p>
                        </div>
                        <div className="flex-1">
                          <FormField
                            control={form.control}
                            name="tuesdayEnd"
                            render={({ field }) => {
                              return (
                                <FormItem>
                                  <span className="text-neutral-500">종료</span>
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value || ""}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="종료" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {timeData.map((item, index) => (
                                        <SelectItem key={index} value={item}>
                                          {item}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>

                                  <FormMessage />
                                </FormItem>
                              );
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-span-1  border p-6 rounded-md gap-3 ">
                      <FormField
                        control={form.control}
                        name="wednesdayOpen"
                        render={({ field }) => {
                          return (
                            <div>
                              <FormItem className="flex flex-row items-center gap-2 w-full justify-between ">
                                <span className="text-sm font-semibold">
                                  수요일
                                </span>
                                <div className="flex flex-row items-center gap-3">
                                  <FormControl>
                                    <Switch
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                  <FormLabel className="">
                                    {field.value === true ? "운영" : "휴무"}
                                  </FormLabel>
                                </div>
                              </FormItem>
                            </div>
                          );
                        }}
                      />

                      <div className="flex flex-row items-center gap-6 flex-1 mt-3">
                        <div className="flex-1">
                          <FormField
                            control={form.control}
                            name="wednesdayStart"
                            render={({ field }) => {
                              return (
                                <FormItem>
                                  <span className="text-neutral-500">
                                    운영시작
                                  </span>
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value || ""}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="시작" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {timeData.map((item, index) => (
                                        <SelectItem key={index} value={item}>
                                          {item}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>

                                  <FormMessage />
                                </FormItem>
                              );
                            }}
                          />
                        </div>
                        <div className="flex flex-col items-center justify-center h-full mt-4">
                          <p>~</p>
                        </div>
                        <div className="flex-1">
                          <FormField
                            control={form.control}
                            name="wednesdayEnd"
                            render={({ field }) => {
                              return (
                                <FormItem>
                                  <span className="text-neutral-500">종료</span>
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value || ""}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="종료" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {timeData.map((item, index) => (
                                        <SelectItem key={index} value={item}>
                                          {item}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>

                                  <FormMessage />
                                </FormItem>
                              );
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-span-1  border p-6 rounded-md gap-3 ">
                      <FormField
                        control={form.control}
                        name="thursdayOpen"
                        render={({ field }) => {
                          return (
                            <div>
                              <FormItem className="flex flex-row items-center gap-2 w-full justify-between ">
                                <span className="text-sm font-semibold">
                                  목요일
                                </span>
                                <div className="flex flex-row items-center gap-3">
                                  <FormControl>
                                    <Switch
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                  <FormLabel className="">
                                    {field.value === true ? "운영" : "휴무"}
                                  </FormLabel>
                                </div>
                              </FormItem>
                            </div>
                          );
                        }}
                      />

                      <div className="flex flex-row items-center gap-6 flex-1 mt-3">
                        <div className="flex-1">
                          <FormField
                            control={form.control}
                            name="thursdayStart"
                            render={({ field }) => {
                              return (
                                <FormItem>
                                  <span className="text-neutral-500">
                                    운영시작
                                  </span>
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value || ""}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="시작" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {timeData.map((item, index) => (
                                        <SelectItem key={index} value={item}>
                                          {item}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>

                                  <FormMessage />
                                </FormItem>
                              );
                            }}
                          />
                        </div>
                        <div className="flex flex-col items-center justify-center h-full mt-4">
                          <p>~</p>
                        </div>
                        <div className="flex-1">
                          <FormField
                            control={form.control}
                            name="thursdayEnd"
                            render={({ field }) => {
                              return (
                                <FormItem>
                                  <span className="text-neutral-500">종료</span>
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value || ""}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="종료" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {timeData.map((item, index) => (
                                        <SelectItem key={index} value={item}>
                                          {item}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>

                                  <FormMessage />
                                </FormItem>
                              );
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-span-1  border p-6 rounded-md gap-3 ">
                      <FormField
                        control={form.control}
                        name="fridayOpen"
                        render={({ field }) => {
                          return (
                            <div>
                              <FormItem className="flex flex-row items-center gap-2 w-full justify-between ">
                                <span className="text-sm font-semibold">
                                  금요일
                                </span>
                                <div className="flex flex-row items-center gap-3">
                                  <FormControl>
                                    <Switch
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                  <FormLabel className="">
                                    {field.value === true ? "운영" : "휴무"}
                                  </FormLabel>
                                </div>
                              </FormItem>
                            </div>
                          );
                        }}
                      />

                      <div className="flex flex-row items-center gap-6 flex-1 mt-3">
                        <div className="flex-1">
                          <FormField
                            control={form.control}
                            name="fridayStart"
                            render={({ field }) => {
                              return (
                                <FormItem>
                                  <span className="text-neutral-500">
                                    운영시작
                                  </span>
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value || ""}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="시작" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {timeData.map((item, index) => (
                                        <SelectItem key={index} value={item}>
                                          {item}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>

                                  <FormMessage />
                                </FormItem>
                              );
                            }}
                          />
                        </div>
                        <div className="flex flex-col items-center justify-center h-full mt-4">
                          <p>~</p>
                        </div>
                        <div className="flex-1">
                          <FormField
                            control={form.control}
                            name="fridayEnd"
                            render={({ field }) => {
                              return (
                                <FormItem>
                                  <span className="text-neutral-500">종료</span>
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value || ""}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="종료" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {timeData.map((item, index) => (
                                        <SelectItem key={index} value={item}>
                                          {item}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>

                                  <FormMessage />
                                </FormItem>
                              );
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-span-1  border p-6 rounded-md gap-3 ">
                      <FormField
                        control={form.control}
                        name="saturdayOpen"
                        render={({ field }) => {
                          return (
                            <div>
                              <FormItem className="flex flex-row items-center gap-2 w-full justify-between ">
                                <span className="text-sm font-semibold">
                                  토요일
                                </span>
                                <div className="flex flex-row items-center gap-3">
                                  <FormControl>
                                    <Switch
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                  <FormLabel className="">
                                    {field.value === true ? "운영" : "휴무"}
                                  </FormLabel>
                                </div>
                              </FormItem>
                            </div>
                          );
                        }}
                      />

                      <div className="flex flex-row items-center gap-6 flex-1 mt-3">
                        <div className="flex-1">
                          <FormField
                            control={form.control}
                            name="saturdayStart"
                            render={({ field }) => {
                              return (
                                <FormItem>
                                  <span className="text-neutral-500">
                                    운영시작
                                  </span>
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value || ""}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="시작" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {timeData.map((item, index) => (
                                        <SelectItem key={index} value={item}>
                                          {item}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>

                                  <FormMessage />
                                </FormItem>
                              );
                            }}
                          />
                        </div>
                        <div className="flex flex-col items-center justify-center h-full mt-4">
                          <p>~</p>
                        </div>
                        <div className="flex-1">
                          <FormField
                            control={form.control}
                            name="saturdayEnd"
                            render={({ field }) => {
                              return (
                                <FormItem>
                                  <span className="text-neutral-500">종료</span>
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value || ""}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="종료" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {timeData.map((item, index) => (
                                        <SelectItem key={index} value={item}>
                                          {item}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>

                                  <FormMessage />
                                </FormItem>
                              );
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-span-1  border p-6 rounded-md gap-3 ">
                      <FormField
                        control={form.control}
                        name="sundayOpen"
                        render={({ field }) => {
                          return (
                            <div>
                              <FormItem className="flex flex-row items-center gap-2 w-full justify-between ">
                                <span className="text-sm font-semibold">
                                  일요일
                                </span>
                                <div className="flex flex-row items-center gap-3">
                                  <FormControl>
                                    <Switch
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                  <FormLabel className="">
                                    {field.value === true ? "운영" : "휴무"}
                                  </FormLabel>
                                </div>
                              </FormItem>
                            </div>
                          );
                        }}
                      />

                      <div className="flex flex-row items-center gap-6 flex-1 mt-3">
                        <div className="flex-1">
                          <FormField
                            control={form.control}
                            name="sundayStart"
                            render={({ field }) => {
                              return (
                                <FormItem>
                                  <span className="text-neutral-500">
                                    운영시작
                                  </span>
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value || ""}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="시작" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {timeData.map((item, index) => (
                                        <SelectItem key={index} value={item}>
                                          {item}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>

                                  <FormMessage />
                                </FormItem>
                              );
                            }}
                          />
                        </div>
                        <div className="flex flex-col items-center justify-center h-full mt-4">
                          <p>~</p>
                        </div>
                        <div className="flex-1">
                          <FormField
                            control={form.control}
                            name="sundayEnd"
                            render={({ field }) => {
                              return (
                                <FormItem>
                                  <span className="text-neutral-500">종료</span>
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value || ""}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="종료" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {timeData.map((item, index) => (
                                        <SelectItem key={index} value={item}>
                                          {item}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>

                                  <FormMessage />
                                </FormItem>
                              );
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-span-1  border p-6 rounded-md gap-3 ">
                      <FormField
                        control={form.control}
                        name="holidayOpen"
                        render={({ field }) => {
                          return (
                            <div>
                              <FormItem className="flex flex-row items-center gap-2 w-full justify-between ">
                                <span className="text-sm font-semibold">
                                  공휴일
                                </span>
                                <div className="flex flex-row items-center gap-3">
                                  <FormControl>
                                    <Switch
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                  <FormLabel className="">
                                    {field.value === true ? "운영" : "휴무"}
                                  </FormLabel>
                                </div>
                              </FormItem>
                            </div>
                          );
                        }}
                      />

                      <div className="flex flex-row items-center gap-6 flex-1 mt-3">
                        <div className="flex-1">
                          <FormField
                            control={form.control}
                            name="holidayStart"
                            render={({ field }) => {
                              return (
                                <FormItem>
                                  <span className="text-neutral-500">
                                    운영시작
                                  </span>
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value || ""}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="시작" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {timeData.map((item, index) => (
                                        <SelectItem key={index} value={item}>
                                          {item}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>

                                  <FormMessage />
                                </FormItem>
                              );
                            }}
                          />
                        </div>
                        <div className="flex flex-col items-center justify-center h-full mt-4">
                          <p>~</p>
                        </div>
                        <div className="flex-1">
                          <FormField
                            control={form.control}
                            name="holidayEnd"
                            render={({ field }) => {
                              return (
                                <FormItem>
                                  <span className="text-neutral-500">종료</span>
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value || ""}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="종료" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {timeData.map((item, index) => (
                                        <SelectItem key={index} value={item}>
                                          {item}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>

                                  <FormMessage />
                                </FormItem>
                              );
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </FormWrap>

                <div className="flex flex-row items-center  justify-end w-full mt-6 gap-3">
                  <LoadingEditSubmitButton
                    loading={updateloading}
                    disabled={
                      !form.formState.isDirty ||
                      form.formState.isSubmitting ||
                      updateloading
                    }
                  />
                </div>
              </form>
            </Form>
          </div>
        </div>
      </SubSectionWrap>
    </div>
  );
}
