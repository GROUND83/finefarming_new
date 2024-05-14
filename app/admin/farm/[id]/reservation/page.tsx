"use client";
import React, { useRef } from "react";

import { useState } from "react";
import { PlusIcon, XIcon } from "lucide-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
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
import {
  getHolidays,
  getReservationDate,
  getSlotData,
  updateData,
} from "./_compoents/actions";
import { LoadingEditSubmitButton } from "@/components/ButtonComponent";
import { editSchema, editSchemaType } from "./_compoents/editSchema";

import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import CalenderWrap from "./_compoents/CalenderWrap";
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

export default function Page({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(false);
  const [updateloading, setUpdateLoading] = useState(false);
  const { toast } = useToast();
  //
  const form = useForm<editSchemaType>({
    resolver: zodResolver(editSchema),
    defaultValues: async () => {
      setLoading(true);
      const id = Number(params.id);
      const response: any = await getSlotData(id);
      console.log("Response", response);
      let sortArray: any = response.slot.sort((a: any, b: any) => {
        if (
          Number(a.startTime.split(":")[0]) > Number(b.startTime.split(":")[0])
        ) {
          return 1;
        }
        if (
          Number(a.startTime.split(":")[0]) < Number(b.startTime.split(":")[0])
        ) {
          return -1;
        }
        return 0;
      });
      // console.log("slot", slot);
      setLoading(false);
      return {
        reservationMax: Number(response.reservationMax) ?? undefined,
        reservationMin: Number(response.reservationMin) ?? undefined,
        slot: sortArray ?? [],
      };
    },
  });
  const {
    fields: slotFields,
    append: slotAppend,
    remove: slotRemove,
  } = useFieldArray({
    control: form.control,
    name: "slot",
  });
  function checkDuplicate(arr: any, keys: any) {
    const seen = new Set();
    for (const item of arr) {
      const key = keys.map((key: any) => item[key]).join("-"); // 특정 키들을 조합하여 하나의 문자열로 만듦
      if (seen.has(key)) {
        // 중복된 데이터가 있음
        return true;
      }
      seen.add(key);
    }
    // 중복된 데이터가 없음
    return false;
  }

  const onSubmit = form.handleSubmit(async (data: editSchemaType) => {
    // 업로드 이미지
    console.log("etdata", data);
    let slot = data.slot;
    const keysToCheck = ["startTime"]; // 체크할 키들
    let checkDup = checkDuplicate(slot, keysToCheck);
    console.log("checkDup", checkDup);
    if (checkDup) {
      toast({
        variant: "destructive",
        duration: 3000,
        title: "중복된 값",
        description: "중복된 값이 있습니다.",
      });
    } else {
      setUpdateLoading(true);
      let newData = JSON.stringify(data);
      const formData = new FormData();
      formData.append("newData", newData);
      formData.append("id", params.id);
      try {
        const result = await updateData(formData);
        if (result) {
          toast({
            duration: 3000,
            title: "수정완료",
            description: "데이터 수정이 완료 되었습니다.",
          });
        }
      } catch (e: any) {
        console.log(e);
        toast({
          duration: 3000,
          variant: "destructive",
          title: "수정 ERROR",
          description: `${e}`,
        });
      } finally {
        // await new Promise((resolve) => setTimeout(resolve, 1000));
        setUpdateLoading(false);
        window.location.reload();
      }
    }
  });

  return (
    <div className=" w-full flex flex-col items-start h-full  flex-1  ">
      <SubSectionWrap isLoading={loading}>
        <div className="w-full   flex-1 flex ">
          <div className="p-6 flex-1 border rounded-md  bg-white    grid grid-cols-12 gap-6 w-full  ">
            <Form {...form}>
              <form
                className="w-full flex flex-col items-start gap-6 col-span-6  "
                onSubmit={onSubmit}
              >
                <div className="grid grid-cols-12 gap-6 w-full  pb-12">
                  <div className="col-span-12 flex flex-col items-start gap-2">
                    <h1 className="">예약 가능 일자 범위</h1>
                    <p className=" text-neutral-500 text-xs">
                      고객이 가장 임박해서 예약 가능한 최소 예약 가능 일자와
                      <br />
                      고객이 가장 미리 예약 가능한 최대 예약 가능일자를
                      지정합니다.
                    </p>
                  </div>
                  <div className="col-span-12 flex flex-row items-center gap-6 ">
                    <div className="col-span-1 flex flex-row items-center justify-between  gap-6">
                      <FormField
                        control={form.control}
                        name="reservationMin"
                        render={({ field }) => {
                          return (
                            <div>
                              <FormItem className="flex flex-col items-start  space-y-0 gap-2 ">
                                <FormLabel className="text-sm">
                                  최소 예약 가능 일자
                                </FormLabel>
                                <div className="flex flex-row items-center gap-3 w-full">
                                  <FormControl>
                                    <Input
                                      min={1}
                                      max={10}
                                      value={field.value || 1}
                                      onChange={(event) =>
                                        field.onChange(
                                          Number(event.target.value)
                                        )
                                      }
                                      type="number"
                                    />
                                  </FormControl>
                                  <FormLabel className=" w-[80px]">
                                    일 전
                                  </FormLabel>
                                  <FormMessage />
                                </div>
                              </FormItem>
                            </div>
                          );
                        }}
                      />
                    </div>
                    <div className="col-span-1 flex flex-row items-center justify-between  gap-6">
                      <div>
                        <FormField
                          control={form.control}
                          name="reservationMax"
                          render={({ field }) => {
                            return (
                              <div>
                                <FormItem className="flex flex-col items-start  space-y-0 gap-2 ">
                                  <FormLabel className="text-sm">
                                    최대 예약 가능 일자
                                  </FormLabel>
                                  <div className="flex flex-row items-center gap-3">
                                    <FormControl>
                                      <Input
                                        min={1}
                                        max={90}
                                        type="number"
                                        value={field.value || 1}
                                        onChange={(event) =>
                                          field.onChange(
                                            Number(event.target.value)
                                          )
                                        }
                                      />
                                    </FormControl>
                                    <FormLabel className=" w-[80px]">
                                      일 후
                                    </FormLabel>
                                    <FormMessage />
                                  </div>
                                </FormItem>
                              </div>
                            );
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-6 w-full border-b pb-12">
                  <div className="col-span-12 flex flex-col items-start gap-2">
                    <h1 className="">예약 슬롯</h1>
                    <p className="text-xs text-neutral-500">
                      각 일자 별로 운영 가능한 슬롯의 시작 시간과 수량을 <br />
                      지정합니다. 지정한 슬롯은 아래 일자별 예약 슬롯 영역에서{" "}
                      <br />
                      날짜 별로 각각 다르게 변경할 수 있습니다
                    </p>
                    <Button
                      type="button"
                      variant={"outline"}
                      size={"sm"}
                      onClick={() => {
                        console.log(form.getValues("slot").length);
                        let limitLength = form.getValues("slot").length;
                        if (limitLength >= 12) {
                          toast({
                            variant: "destructive",
                            title: "최대 허용개수 초과",
                            description: "12개 까지 업로드 가능합니다.",
                          });
                        } else {
                          slotAppend({
                            startTime: "",
                            visible: false,
                            amount: 1,
                          });
                        }
                      }}
                    >
                      <PlusIcon className="size-3" />
                    </Button>
                  </div>
                  <div className="col-span-12 grid grid-cols-2 gap-6 ">
                    <div className="grid grid-cols-6 gap-6 col-span-2 w-full mt-3 ">
                      {slotFields.map((item, index) => {
                        return (
                          <div
                            className="flex flex-col items-start gap-2 relative  col-span-6  border p-3 rounded-md"
                            key={index}
                          >
                            <div className="flex flex-row items-end gap-6 w-full">
                              <div className="flex flex-row items-center gap-2 mb-3 w-[100px]">
                                <Controller
                                  control={form.control}
                                  name={`slot.${index}.visible`}
                                  render={({ field: { onChange, value } }) => (
                                    <Switch
                                      onCheckedChange={(event) =>
                                        onChange(event)
                                      }
                                      checked={value}
                                    />
                                  )}
                                />
                                <label
                                  htmlFor={`slot.${index}.visible`}
                                  className="text-xs"
                                >
                                  공개
                                </label>
                              </div>
                              <div className="flex flex-col items-start gap-2">
                                <label className="text-xs">시작</label>
                                <div className="">
                                  <Controller
                                    control={form.control}
                                    name={`slot.${index}.startTime`}
                                    render={({
                                      field: { onChange, value },
                                    }) => (
                                      <Select
                                        defaultValue={value || ""}
                                        onValueChange={onChange}
                                        required
                                      >
                                        <FormControl>
                                          <SelectTrigger>
                                            <SelectValue placeholder="시작 시간" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          {timeData.map((item, index) => (
                                            <SelectItem
                                              key={index}
                                              value={item}
                                            >
                                              {item}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    )}
                                  />
                                </div>
                              </div>
                              <div className="flex flex-col items-start justify-start gap-2">
                                <label className="text-xs">기본수량</label>
                                <Controller
                                  control={form.control}
                                  name={`slot.${index}.amount`}
                                  render={({ field: { onChange, value } }) => (
                                    <Input
                                      type="number"
                                      required
                                      value={Number(value) || 1}
                                      onChange={(e) =>
                                        onChange(Number(e.target.value))
                                      }
                                    />
                                  )}
                                />
                              </div>
                              <Button
                                type="button"
                                variant={"outline"}
                                onClick={() => slotRemove(index)}
                              >
                                <XIcon className="size-4" />
                              </Button>
                            </div>
                            <div className="flex flex-col items-start w-full flex-1">
                              {form.formState.errors.slot?.[index]
                                ?.startTime && (
                                <p className="text-red-500">
                                  시간을 선택하세요.
                                </p>
                              )}
                              {form.formState.errors.slot?.[index]?.amount && (
                                <p className="text-red-500">
                                  수량을 입력하세요.
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex flex-row items-center  justify-end w-full mt-6 gap-3 col-span-12">
                    <LoadingEditSubmitButton
                      loading={updateloading}
                      disabled={
                        // false
                        !form.formState.isDirty ||
                        form.formState.isSubmitting ||
                        updateloading
                      }
                    />
                  </div>
                </div>
              </form>
            </Form>

            <CalenderWrap farmId={Number(params.id)} />
          </div>
        </div>
      </SubSectionWrap>
    </div>
  );
}
