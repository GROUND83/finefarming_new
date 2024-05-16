"use client";
import { Calendar } from "@/components/ui/calendar";
import moment from "moment";
import React, { useState } from "react";
import { ko } from "date-fns/locale";
import { toast } from "sonner";

import {
  deleteCalender,
  getAllReservationDate,
  getHolidays,
  getNationalHoliday,
  getReservationDate,
  updateCalender,
} from "./actions";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { calenderSchema, calenderSchemaType } from "./calenderSchema";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { PlusIcon, XIcon } from "lucide-react";
import { LoadingEditSubmitButton } from "@/components/ButtonComponent";
import OpentimeModal from "./opentimeModal";
import { usePathname, useSearchParams } from "next/navigation";
import dayjs from "dayjs";
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
type finddayProp = {
  id: number;
  date: Date;
  visible: boolean;
  startTime: string;
  amount: number;
};
type farmIdprops = {
  farmId: number;
};
type nationalholidayType = {
  id: number;
  dateName: string;
  day: string;
  locdate: string;
  month: string;
  year: string;
};

export default function CalenderWrap({ farmId }: farmIdprops) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedDay, setSelectedDay] = useState<Date>();
  const [findDay, setFindDay] = useState<finddayProp[]>([]);
  const [farmHoliday, setFarmHoliday] = useState<any>();
  const [updateloading, setUpdateLoading] = useState(false);
  const [nationalholiday, setNationalHoliday] = useState<nationalholidayType[]>(
    []
  );
  const [bookedDays, setBookedDay] = useState<Date[]>([]);

  //
  const form = useForm<calenderSchemaType>({
    resolver: zodResolver(calenderSchema),
    defaultValues: {
      reservationDate: [],
    },
  });
  //
  const {
    fields: reservationDateFields,
    append: reservationDateAppend,
    remove: reservationDateRemove,
  } = useFieldArray({
    control: form.control,
    name: "reservationDate",
  });
  const getHoliday = async () => {
    let nationalholiday = await getNationalHoliday();
    console.log("nationalholiday", nationalholiday);
    setNationalHoliday(nationalholiday);
    let holidays = await getHolidays(farmId);
    console.log("holidays", holidays);
    setFarmHoliday(holidays);
    let allReservationDate = await getAllReservationDate(farmId);
    console.log("allReservationDate", allReservationDate);
    setBookedDay(allReservationDate);
    return;
  };
  //
  //
  React.useEffect(() => {
    console.log("pathname", pathname, searchParams.get("id"));
    if (farmId) {
      getHoliday();
    }
  }, []);
  // console.log("farmId", farmId);
  //
  // React.useEffect(() => {
  //   console.log("dirtyFields", form.formState.dirtyFields);
  // }, [form.formState.dirtyFields]);

  const changeSelectedDay = async (day: Date) => {
    //

    // 특정일자 스케줄 가져온다.
    let reservationData = await getReservationDate({
      farmId: farmId,
      selectedDay: dayjs(selectedDay).format("YYYY-MM-DD"),
    });
    console.log("reservationData", reservationData);

    setFindDay(reservationData.result);
    let newData = [];
    for (const dateResult of reservationData.result) {
      let newObj = {
        id: dateResult.id ? dateResult.id : undefined,
        visible: dateResult.visible ? dateResult.visible : false,
        amount: dateResult.amount ? dateResult.amount : 0,
        startTime: dateResult.startTime ? dateResult.startTime : "",
        count: dateResult.count ? dateResult.count : 0,
        date: dateResult.date
          ? dateResult.date
          : new Date(dayjs(selectedDay).format("YYYY-MM-DD")),
      };
      newData.push(newObj);
    }
    form.reset({
      reservationDate: newData,
    });

    // setFindDay(newdata);

    // setSelectedDay(day);
  };

  //
  React.useEffect(() => {
    if (selectedDay) {
      console.log("selectedDay", selectedDay);
      changeSelectedDay(selectedDay);
    } else {
      form.reset({
        reservationDate: [],
      });
    }
  }, [selectedDay]);

  const checkDisable = (date: any) => {
    // console.log(date);
    let getDay = new Date(date).getDay();
    // console.log(monday);
    if (date < new Date()) {
      return true;
    }
    if (farmHoliday) {
      if (!farmHoliday.mondayOpen) {
        if (getDay === 1) {
          return true;
        }
      }
      if (!farmHoliday.tuesdayOpen) {
        if (getDay === 2) {
          return true;
        }
      }
      if (!farmHoliday.wednesdayOpen) {
        if (getDay === 3) {
          return true;
        }
      }
      if (!farmHoliday.thursdayOpen) {
        if (getDay === 4) {
          return true;
        }
      }
      if (!farmHoliday.fridayOpen) {
        if (getDay === 5) {
          return true;
        }
      }
      if (!farmHoliday.saturdayOpen) {
        if (getDay === 6) {
          return true;
        }
      }
      if (!farmHoliday.sundayOpen) {
        if (getDay === 0) {
          return true;
        }
      }
      if (!farmHoliday.holidayOpen) {
        if (nationalholiday.length > 0) {
          //
          let checkday = moment(date).format("YYYYMMDD");
          let check = nationalholiday.some((item) => item.locdate === checkday);
          // console.log("check", check);
          if (check) {
            return true;
          }
        }
      }
    }

    return false;
  };
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
  const onSubmit = form.handleSubmit(async (data) => {
    // 업로드 이미지
    console.log("etdata", data);

    let reservationDate = data.reservationDate;
    const keysToCheck = ["startTime"]; // 체크할 키들
    let checkDup = checkDuplicate(reservationDate, keysToCheck);
    console.log("checkDup", checkDup);

    if (checkDup) {
      toast.warning("중복된 값이 있습니다.");
    } else {
      setUpdateLoading(true);
      let newData = JSON.stringify(data);
      const formData = new FormData();
      console.log("newData", newData);
      formData.append("newData", newData);
      formData.append("farmId", farmId.toString());
      if (selectedDay) {
        formData.append("date", selectedDay?.toString());
      } else {
        return;
      }
      try {
        const result = await updateCalender(formData);
        if (result) {
          console.log("result", result);
          toast.success("데이터 수정이 완료 되었습니다.");
        }
      } catch (e: any) {
        console.log(e);
        toast.error(e);
      } finally {
        // await new Promise((resolve) => setTimeout(resolve, 1000));
        setUpdateLoading(false);
        //   window.location.reload();
      }
    }
  });
  const deleteReservationDate = async (index: any) => {
    // reservationDateRemove(index);
    console.log(index, findDay[index]);
    let data = findDay[index];
    console.log("data", data);
    if (data.id) {
      //   reservationDate에서 온것은 바로 삭제
      const formData = new FormData();
      formData.append("reservationDateId", data.id.toString());
      // 예약 있는지 확인하고 변경할것
      const result = await deleteCalender(formData);
      if (result) {
        if (selectedDay) {
          changeSelectedDay(selectedDay);
        }
        toast.success("데이터 수정이 완료 되었습니다.");
      }
      //
    } else {
      reservationDateRemove(index);
      //   1. slot 에서 온 데이터는 삭제시 남은것만 업로드
    }
  };

  React.useEffect(() => {
    if (form.formState.errors) {
      console.log(form.formState.errors);
    }
  }, [form.formState]);
  return (
    <div className="flex flex-col items-start gap-6  col-span-6 bg-neutral-100 p-3 border">
      <div className="flex flex-col items-start gap-2 w-full">
        <h1 className="">일자별 예약 슬롯</h1>
        <p className="text-xs text-neutral-500">
          날짜 별 기본 수량을 각각 변경할 수 있습니다.
        </p>
        <div>
          <Calendar
            mode="single"
            locale={ko}
            showOutsideDays={false}
            className="rounded-md border bg-white"
            selected={selectedDay}
            onSelect={setSelectedDay}
            disabled={(date) => checkDisable(date)}
            modifiers={{ haveCustomDate: bookedDays }}
            // modifiersStyles={{ booked: bookedStyle }}
            modifiersClassNames={{
              haveCustomDate: "text-primary  underline",
            }}
            // footer={footer}
          />
        </div>
      </div>
      <div className="flex flex-col items-start justify-start gap-3  flex-1  w-full">
        <div className="flex flex-row items-center justify-between col-span-2  w-full gap-3 ">
          <div className="flex flex-row items-center justify-between w-full">
            <div>
              <p className=" text-lg font-semibold">
                {moment(selectedDay).format("YYYY년 MM월 DD일")}
              </p>
              <p className="text-neutral-500 text-xs">
                운영정보의 요일별 운영, 휴일 운영을 반영합니다.
              </p>
              <p className="text-neutral-500 text-xs">
                특정일 예약슬롯이 우선순위입니다.
              </p>
            </div>
            <OpentimeModal farmHoliday={farmHoliday} />
          </div>
          {form.getValues("reservationDate").length > 0 && (
            <div>
              <Button
                type="button"
                variant={"outline"}
                size={"sm"}
                className="flex flex-row items-center gap-3"
                onClick={() => {
                  console.log(form.getValues("reservationDate").length);
                  let limitLength = form.getValues("reservationDate").length;
                  if (limitLength >= 12) {
                    toast({
                      variant: "destructive",
                      title: "최대 허용개수 초과",
                      description: "12개 까지 업로드 가능합니다.",
                    });
                  } else {
                    reservationDateAppend({
                      startTime: "",
                      visible: false,
                      amount: 0,
                      count: 0,
                    });
                  }
                }}
              >
                <PlusIcon className="size-3" />
                슬롯추가
              </Button>
            </div>
          )}
        </div>
        <Form {...form}>
          <form
            className="flex flex-col items-start col-span-2  justify-start w-full"
            onSubmit={onSubmit}
          >
            <div className="grid grid-cols-6 gap-3 col-span-2 w-full mt-3   ">
              {reservationDateFields.map((item, index) => {
                // console.log("iten", item);
                return (
                  <div
                    className="flex flex-col items-start gap-2 relative  col-span-6 w-full border rounded-md p-3 bg-white"
                    key={index}
                  >
                    <div className="flex flex-row items-end  justify-between gap-3 w-full">
                      <div className="flex flex-row items-center gap-2 mb-3 w-[100px]">
                        <Controller
                          control={form.control}
                          name={`reservationDate.${index}.visible`}
                          render={({ field: { onChange, value } }) => (
                            <Switch
                              onCheckedChange={(event) => onChange(event)}
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
                            name={`reservationDate.${index}.startTime`}
                            render={({ field: { onChange, value } }) => (
                              <Select
                                value={value || ""}
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
                                    <SelectItem key={index} value={item}>
                                      {item}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col items-start justify-start gap-2 w-[60px]">
                        <label className="text-xs">기본수량</label>
                        <Controller
                          control={form.control}
                          name={`reservationDate.${index}.amount`}
                          render={({ field: { onChange, value } }) => (
                            <Input
                              type="number"
                              required
                              value={value}
                              onChange={(event) =>
                                onChange(Number(event?.target.value))
                              }
                            />
                          )}
                        />
                      </div>

                      <div className="flex flex-col items-start justify-start gap-2  w-[50px]">
                        <p className="text-xs">예약현황</p>
                        <div className="border py-2 px-3 rounded-md">
                          <p className="text-sm">{item.count}</p>
                        </div>
                      </div>

                      <Button
                        type="button"
                        variant={"outline"}
                        onClick={() => deleteReservationDate(index)}
                      >
                        <XIcon className="size-4" />
                      </Button>
                    </div>
                    <div className="flex flex-col items-start w-full flex-1">
                      {form.formState.errors.reservationDate?.[index]
                        ?.startTime && (
                        <p className="text-red-500">시간을 선택하세요.</p>
                      )}
                      {form.formState.errors.reservationDate?.[index]
                        ?.amount && (
                        <p className="text-red-500">수량을 입력하세요.</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            {form.getValues("reservationDate").length > 0 && (
              <div className="flex flex-col items-end col-span-2 w-full mt-3  ">
                <LoadingEditSubmitButton
                  loading={updateloading}
                  disabled={
                    !form.formState.isDirty ||
                    form.formState.isSubmitting ||
                    updateloading
                  }
                />
              </div>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
