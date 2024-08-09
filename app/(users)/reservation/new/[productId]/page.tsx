"use client";
import { notFound, usePathname, useRouter } from "next/navigation";
import React from "react";
import {
  getFarmImpossibe,
  getHolidays,
  getNationalHoliday,
  getProductDetail,
  getReservationDate,
  makeReservation,
} from "./_component/actions";
import { Button } from "@/components/ui/button";
import { ko } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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

import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Loader2 } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Badge } from "@/components/ui/badge";
import { GroupNumberInput, NumberInput } from "@/components/form/NumberInput";

import { SelectProductField } from "./_component/selectProductField";
import dayjs from "dayjs";
import { getSession, useSession } from "next-auth/react";

import { z } from "zod";

import { toast } from "sonner";

const FormSchema = z.object({
  checkInDate: z.union([
    z.date({ required_error: "방문일자을 선택하세요." }),
    z.string(),
  ]),
  checkInTime: z.string().min(1, { message: "예약 가능 시간을 선택하세요." }),
  // optionProduct: z.array(z.string().nullable()).nullable(),
  groupNumber: z
    .number()
    .min(0, { message: "최소 가능인원수는 1명입니다." })
    .nullable(),
  groupPrice: z.number().nullable(),
  groupMembers: z.array(
    z.object({
      amount: z.number(),
      endAge: z.string(),
      isFree: z.boolean(),
      message: z.string(),
      startAge: z.string(),
    })
  ),
  agePrice: z.array(
    z.object({
      amount: z.number(),
      endAge: z.string(),
      isFree: z.boolean(),
      message: z.string(),
      price: z.string(),
      startAge: z.string(),
    })
  ),
  subProduct: z.array(
    z.object({
      title: z.string(),
      description: z.string().optional(),
      price: z.number(),
      selectProducts: z.array(
        z.object({
          amount: z.number().optional(),
          title: z.string().optional(),
          description: z.string().optional(),
          price: z.number(),
        })
      ),
    })
  ),
  visitor: z.string().min(1, { message: "방문자 대표를 입력하세요." }),
  visitorPhone: z
    .string()
    .min(1, { message: "방문자 대표 연락처를 입력하세요." }),
});
type optionSchemaType = z.infer<typeof FormSchema>;
type nationalholidayType = {
  id: number;
  dateName: string;
  day: string;
  locdate: string;
  month: string;
  year: string;
};

export default function Page({ params }: { params: { productId: string } }) {
  const pathname = usePathname();
  const [updating, setUpdating] = React.useState(false);
  const [calenderLoading, setCalenderLoading] = React.useState(false);
  const [calenderOpen, setCalenderOpen] = React.useState(false);
  const [nationalholiday, setNationalHoliday] = React.useState<
    nationalholidayType[]
  >([]);
  const [possibleDay, setPossibleDay] = React.useState<any>({});

  const [totalPriceObj, setTotalPriceObj] = React.useState<any>();
  const [farmHoliday, setFarmHoliday] = React.useState<any>();
  const [groupPrice, setGroupPrice] = React.useState(0);
  const [detail, setDetail] = React.useState<any>(); // product detail
  const [totalReservationDate, setTotalReservationDate] = React.useState<any[]>(
    []
  );
  const [agePrice, setAgePrice] = React.useState(0);
  const [selectPrice, setSelectPrice] = React.useState(0);
  const [subTotal, setSubTotal] = React.useState(0);
  const [totalPrice, setTotalPrice] = React.useState(0);

  let { data: session } = useSession();
  const router = useRouter();

  const clickSelectDate = async (date: Date) => {
    console.log("date", date, detail, params.productId);

    setTotalReservationDate([]);
    // setDate(date);
    // let result = await getProductDetail(Number(params.productId));
    let productId = params.productId;
    console.log("productId", productId);
    if (productId) {
      try {
        setCalenderLoading(true);
        // let newdata = JSON.parse(result);
        let totalReservationDate = await getReservationDate({
          productId: Number(productId),
          date,
        });
        console.log("totalReservationDate", totalReservationDate);
        if (totalReservationDate.result) {
          setTotalReservationDate(totalReservationDate.result);
        }
        getProductsDetailData();
      } catch (e) {
        //
        console.log(e);
        notFound();
      } finally {
        setCalenderLoading(false);
      }
    }
  };
  //1.날짜를 선택하면
  //2.reservationDate 갬색
  //3. 가능슬롯 계산
  //4. 가능슬롯 선택

  const getProductsDetailData = async () => {
    const productId = Number(params.productId);
    if (isNaN(productId)) {
      return notFound();
    }
    let result: any = await getProductDetail(productId);
    let newdata = JSON.parse(result);
    console.log("newdataresult", newdata);
    setDetail(newdata);
    let reservationMax = newdata.reservationMax;
    let reservationMin = newdata.reservationMin;
    let slot = newdata.slot;

    console.log("getProductDetail", reservationMax, reservationMin, slot);

    return newdata;
  };

  const form = useForm<optionSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: async () => {
      let result = await getProductsDetailData();

      console.log("result", result);
      if (result.priceType === "GROUP") {
        setGroupPrice(result.groupPrice);
      }
      let optionVaules = result.subProduct.map((item: any) => {
        if (item.essential) {
          return item.title;
        }
      });
      let agePrice = [];
      if (result.personalPrice.length > 0) {
        agePrice = result.personalPrice.map((item: any) => {
          return { ...item, amount: 0 };
        });
      }
      let groupMembers = [];
      if (result.groupMember.length > 0) {
        groupMembers = result.groupMember.map((item: any) => {
          return { ...item, amount: 0 };
        });
      }
      let subProduct = [];
      if (result.subProduct.length > 0) {
        subProduct = result.subProduct.map((item: any) => {
          let selectProducts = item.selectProducts.map((selectProduct: any) => {
            return { ...selectProduct, amount: 0 };
          });
          return { ...item, selectProducts: selectProducts };
        });
      }
      console.log("subProduct", subProduct);
      return {
        groupPrice: result.groupPrice,
        checkInDate: "",
        checkInTime: "",
        groupNumber: 0,
        agePrice: agePrice.length > 0 ? agePrice : [],
        groupMembers: groupMembers.length > 0 ? groupMembers : [],
        subProduct: subProduct.length > 0 ? subProduct : [],
        visitor: "",
        visitorPhone: "",
      };
    },
  });
  const { fields: agePriceFields } = useFieldArray({
    control: form.control,
    name: "agePrice",
  });
  const { fields: groupMembersFields } = useFieldArray({
    control: form.control,
    name: "groupMembers",
  });
  const { fields: subProduct } = useFieldArray({
    control: form.control,
    name: "subProduct",
  });

  const onSubmit = form.handleSubmit(async (data: optionSchemaType) => {
    console.log("data", data, params.productId, detail);
    setUpdating(true);
    if (session?.user) {
      if (detail) {
        if (totalPrice <= 0) {
          //
          toast.error("결제 예정금액이 0원 이상이여야 합니다.");
          return;
        }
        if (!data.checkInDate) {
          //
          toast.error("방문일자를 선택하세요.");
          return;
        }
        let priceType = detail.priceType;
        let groupLimt = detail.groupLimit;
        let checkInTime = data.checkInTime;
        let reservataionLimit = totalReservationDate.filter(
          (item) => item.startTime === checkInTime
        );
        let reservataionLimitCount =
          reservataionLimit[0].amount - reservataionLimit[0].count;
        console.log(
          "reservataionLimit",
          reservataionLimit,
          reservataionLimitCount
        );
        let totalAmount = 0;
        //
        if (priceType === "GROUP") {
          //
          if (data.groupMembers) {
            for (const groupMembers of data.groupMembers) {
              if (!groupMembers.isFree) {
                totalAmount += groupMembers.amount;
              }
            }
          }
        } else {
          //
          for (const agePrice of data.agePrice) {
            if (!agePrice.isFree) {
              totalAmount += agePrice.amount;
            }
          }
        }
        console.log("totalAmount", totalAmount, reservataionLimitCount);
        if (totalAmount > reservataionLimitCount) {
          // return;
          //
          return form.setError("checkInTime", {
            type: "custom",
            message: "예약가능 인원이 초과 되었습니다.",
          });
        }
        console.log("user", session.user);
        let newdata = {
          farmInitail: detail.farm.initail,
          farmId: detail.farmId,
          productId: Number(params.productId),
          userId: session.user.id,
          checkInDate: new Date(data.checkInDate).setHours(
            new Date(data.checkInDate).getHours() + 9
          ),
          subProduct: data.subProduct,
          checkInTime: data.checkInTime,
          visitor: data.visitor,
          visitorPhone: data.visitorPhone,
          personalPrice: data.agePrice,
          groupMember: data.groupMembers,
          groupPrice: detail.groupPrice,
          groupNumber: Number(data.groupNumber),
          priceType: detail.priceType,
          totalPrice: totalPrice,
          totalAmount: totalAmount,
        };
        console.log("newdata", newdata);

        let jsonData = JSON.stringify(newdata);
        // formData.append("newData", string);
        try {
          let result = await makeReservation(jsonData);
          console.log(result);
        } catch (e) {
          console.log("e", e);
        }
      }
    }
    setUpdating(false);
  });
  React.useEffect(() => {
    const subscirbe = form.watch((data, { name }) => {
      // console.log("name", name, data);
      if (name === "checkInDate") {
        // console.log(data.checkInDate, name, detail);
        if (data.checkInDate) {
          clickSelectDate(new Date(data.checkInDate));
          form.resetField("checkInTime");
          form.resetField("groupMembers");
          form.resetField("agePrice");
          form.resetField("subProduct");
          form.resetField("visitor");
          form.resetField("visitorPhone");
        }
      }
      if (name?.includes("agePrice")) {
        // console.log(data.agePrice, name, detail);
        // console.log(form.getValues("agePrice"));
        if (data.agePrice) {
          console.log("agePrice", data.agePrice);
          let totleSum = 0;
          for (const agePrice of data.agePrice) {
            console.log(agePrice);
            if (!agePrice?.isFree) {
              if (agePrice) {
                let price = Number(agePrice.price);
                let amount = Number(agePrice.amount);
                let sum = price * amount;
                totleSum += sum;
              }
            }
          }
          setAgePrice(totleSum);
          // console.log("agePrice totleSum", totleSum, totalPrice);
        }
      }
      if (name?.includes("subProduct")) {
        // console.log(data.subProduct, name, detail);
        // console.log(form.getValues("subProduct"));
        if (data.subProduct) {
          console.log(data.subProduct);
          let totleSum = 0;
          for (const subProduct of data.subProduct) {
            if (subProduct?.selectProducts) {
              for (const selectProducts of subProduct?.selectProducts) {
                console.log(selectProducts);
                if (selectProducts) {
                  let price = Number(selectProducts.price);
                  let amount = Number(selectProducts.amount);
                  let sum = price * amount;
                  totleSum += sum;
                }
              }
            }
          }
          setSelectPrice(totleSum);
          // console.log("subProduct totleSum", totleSum, totalPrice);
        }
      }
      if (name?.includes("groupMembers")) {
        // console.log(data.agePrice, name, groupPrice);
        if (data.groupMembers) {
          // console.log(data.groupMembers);
          if (detail) {
            setGroupPrice(groupPrice);
          }
        }
      }
      if (name?.includes("subProduct")) {
        if (data.subProduct) {
          let subTotal = 0;
          let subProductPrice = data.subProduct.map((item: any) => {
            console.log("item", item);
            subTotal += item.price;
          });
          setSubTotal(subTotal);
        }
      }
    });

    return () => subscirbe.unsubscribe();
  }, [form.watch]);

  //
  const caluTotal = () => {
    console.log(agePrice, selectPrice);
    setTotalPriceObj({
      agePrice: agePrice,
      selectPrice: selectPrice,
      groupPrice: groupPrice,
      subTotal: subTotal,
    });
    setTotalPrice(agePrice + selectPrice + subTotal + groupPrice);
  };

  //
  React.useEffect(() => {
    caluTotal();
  }, [agePrice, selectPrice, groupPrice, subTotal]);

  //
  React.useEffect(() => {
    if (Object.keys(form.formState.errors).length > 0) {
      console.log(form.formState.errors);
      // toast({
      //   variant: "destructive",
      //   title: "모든 필드를 입력하세요.",
      //   description: "",
      // });
    }
  }, [form.formState]);

  //
  const getHoliday = async () => {
    let nationalholiday = await getNationalHoliday();
    console.log("nationalholiday", nationalholiday);
    setNationalHoliday(nationalholiday);
    let holidays = await getHolidays(Number(params.productId));
    console.log("holidays", holidays);
    setFarmHoliday(holidays);
    let resultdata = await getFarmImpossibe(Number(params.productId));
    console.log("resultdata", resultdata);
    setPossibleDay(resultdata);
    console.log("result", resultdata);
  };
  React.useEffect(() => {
    if (detail) {
      getHoliday();
    }
  }, [detail]);
  //
  const checkDisable = (date: any) => {
    console.log("detail", detail, date);
    // 1.특정일 슬롯에 모두 없거나 하나라도 있는경우
    console.log("possibleDay - reservationDate", possibleDay);
    if (Object.keys(possibleDay).length > 0) {
      // console.log(possibleDay[dayjs(date).format("YYYY-MM-DD")]);
      if (possibleDay[dayjs(date).format("YYYY-MM-DD")] !== undefined) {
        if (possibleDay[dayjs(date).format("YYYY-MM-DD")]) {
          if (detail) {
            console.log("detaildetail", detail);
            let getDay = new Date(date).getDay();

            // );
            if (
              date <
              new Date(
                dayjs()
                  .add(detail?.reservationMin, "day")
                  .hour(0)
                  .minute(0)
                  .second(0)
                  .format()
              )
            ) {
              return true;
            }

            if (
              date >=
              new Date(
                dayjs()
                  .add(detail?.reservationMax, "day")
                  .hour(0)
                  .minute(0)
                  .second(0)
                  .format()
              )
            ) {
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
                  let checkday = dayjs(date).format("YYYYMMDD");
                  let check = nationalholiday.some(
                    (item) => item.locdate === checkday
                  );
                  // console.log("check", check);
                  if (check) {
                    return true;
                  }
                }
              }
            }
          }
        } else {
          // if (detail) {
          //   console.log("detaildetail", detail);
          //   let getDay = new Date(date).getDay();

          //   // );
          //   if (
          //     date <
          //     new Date(
          //       dayjs()
          //         .add(detail?.reservationMin, "day")
          //         .hour(0)
          //         .minute(0)
          //         .second(0)
          //         .format()
          //     )
          //   ) {
          //     return true;
          //   }

          //   if (
          //     date >=
          //     new Date(
          //       dayjs()
          //         .add(detail?.reservationMax, "day")
          //         .hour(0)
          //         .minute(0)
          //         .second(0)
          //         .format()
          //     )
          //   ) {
          //     return true;
          //   }
          //   if (farmHoliday) {
          //     if (!farmHoliday.mondayOpen) {
          //       if (getDay === 1) {
          //         return true;
          //       }
          //     }
          //     if (!farmHoliday.tuesdayOpen) {
          //       if (getDay === 2) {
          //         return true;
          //       }
          //     }
          //     if (!farmHoliday.wednesdayOpen) {
          //       if (getDay === 3) {
          //         return true;
          //       }
          //     }
          //     if (!farmHoliday.thursdayOpen) {
          //       if (getDay === 4) {
          //         return true;
          //       }
          //     }
          //     if (!farmHoliday.fridayOpen) {
          //       if (getDay === 5) {
          //         return true;
          //       }
          //     }
          //     if (!farmHoliday.saturdayOpen) {
          //       if (getDay === 6) {
          //         return true;
          //       }
          //     }
          //     if (!farmHoliday.sundayOpen) {
          //       if (getDay === 0) {
          //         return true;
          //       }
          //     }
          //     if (!farmHoliday.holidayOpen) {
          //       if (nationalholiday.length > 0) {
          //         //
          //         let checkday = dayjs(date).format("YYYYMMDD");
          //         let check = nationalholiday.some(
          //           (item) => item.locdate === checkday
          //         );
          //         // console.log("check", check);
          //         if (check) {
          //           return true;
          //         }
          //       }
          //     }
          //     if (detail.slot.length > 0) {
          //       //
          //       let filterArray = detail.slot.filter(
          //         (item: any) => item.visible === false
          //       );
          //       if (filterArray.length >= detail.slot.length) {
          //         return true;
          //       } else {
          //         return false;
          //       }
          //     }
          //   }
          // }
          return true;
        }
      } else {
        if (detail) {
          console.log("detaildetail", detail);
          let getDay = new Date(date).getDay();

          // );
          if (
            date <
            new Date(
              dayjs()
                .add(detail?.reservationMin, "day")
                .hour(0)
                .minute(0)
                .second(0)
                .format()
            )
          ) {
            return true;
          }

          if (
            date >=
            new Date(
              dayjs()
                .add(detail?.reservationMax, "day")
                .hour(0)
                .minute(0)
                .second(0)
                .format()
            )
          ) {
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
                let checkday = dayjs(date).format("YYYYMMDD");
                let check = nationalholiday.some(
                  (item) => item.locdate === checkday
                );
                // console.log("check", check);
                if (check) {
                  return true;
                }
              }
            }
            if (detail.slot.length > 0) {
              //
              let filterArray = detail.slot.filter(
                (item: any) => item.visible === false
              );
              if (filterArray.length >= detail.slot.length) {
                return true;
              } else {
                return false;
              }
            }
          }
        }
      }
    }

    return false;
  };

  const getUser = async () => {
    let sessiondata = await getSession();
    console.log("sessiondata", sessiondata);
    if (sessiondata?.user.role === "user") {
      //
    } else {
      return router.push(`/auth/login?redirect=${pathname}`);
    }
  };
  React.useEffect(() => {
    //
    getUser();
  }, []);

  const checGroupMember = (value: boolean) => {
    // console.log(form.getValues("groupMembers"));
    let groupMembers = form.getValues("groupMembers");

    if (groupMembers) {
      let totleSum = 0;
      for (const groupMember of groupMembers) {
        // console.log(groupMember);
        if (!groupMember?.isFree) {
          if (groupMember) {
            let amount = Number(groupMember.amount);
            let sum = amount;
            totleSum += sum;
          }
        }
      }

      if (detail.groupLimit <= totleSum) {
        if (value) {
          return false;
        } else {
          return true;
        }
      }
    }
  };
  return (
    <div className="w-full    container mx-auto relative  bg-white min-h-screen">
      {detail && (
        <div className="w-full">
          <div className="w-full bg-primary p-3 ">
            <p className="text-lg font-semibold text-white">예약하기</p>
          </div>
          <div className="p-6 col-span-12 bg-white  border-b">
            <p className="text-lg font-semibold">{detail.title}</p>
            <p className="text-sm text-neutral-500">{detail.description}</p>
          </div>
          <div className="w-full flex flex-col items-start  flex-1  ">
            <Form {...form}>
              <form
                onSubmit={onSubmit}
                className=" w-full grid grid-cols-12 gap-1  pb-24  "
              >
                <FormField
                  control={form.control}
                  name="checkInDate"
                  render={({ field }) => (
                    <FormItem className="gap-2 col-span-12  grid grid-cols-12  border-b p-6  bg-white">
                      <FormLabel className=" col-span-12 flex flex-row items-center font-semibold text-lg">
                        방문 일자
                      </FormLabel>
                      <Popover open={calenderOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              type="button"
                              onClick={() => setCalenderOpen(true)}
                              variant={"outline"}
                              className={cn(
                                " col-span-12 text-left font-normal  ",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                dayjs(field.value).format("YYYY-MM-DD")
                              ) : (
                                <span>방문일자를 선택하세요.</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className=" col-span-9 p-0 "
                          align="start"
                        >
                          <Calendar
                            locale={ko}
                            mode="single"
                            selected={new Date(field.value) || undefined}
                            onSelect={(date) => {
                              field.onChange(date);
                              setCalenderOpen(false);
                            }}
                            disabled={(date) => checkDisable(date)}
                          />
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                {calenderLoading ? (
                  <div className=" col-span-12 h-[500px] flex flex-col  items-center justify-center">
                    <Loader2 className="size-12 animate-spin text-primary" />
                  </div>
                ) : (
                  <div className="w-full col-span-12 pb-24">
                    {totalReservationDate.length > 0 && (
                      <>
                        <FormField
                          control={form.control}
                          name="checkInTime"
                          render={({ field }) => (
                            <FormItem className="gap-3 col-span-12  grid grid-cols-12  border-b p-6 bg-white">
                              <div className="col-span-12 flex flex-row items-center gap-3 justify-between">
                                <FormLabel className="col-span-4 flex flex-row items-start font-semibold text-lg">
                                  예약가능 시간
                                </FormLabel>
                                <div className="flex flex-row items-center gap-2">
                                  <div
                                    className={`w-[20px] h-[10px]  p-2 bg-primary/80`}
                                  ></div>
                                  <p className="text-sm">예약가능</p>
                                </div>
                              </div>
                              <FormControl className=" col-span-12 grid grid-cols-12  ">
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  value={field.value || ""}
                                  className="flex flex-col "
                                  required
                                >
                                  <div className=" col-span-12 grid grid-cols-12 gap-3">
                                    {totalReservationDate.map((item, index) => {
                                      return (
                                        <FormItem
                                          key={index}
                                          className={`col-span-6 flex flex-col items-start gap-1 border p-3 
                                         `}
                                        >
                                          <FormControl>
                                            <div className="flex flex-row items-center gap-2 w-full">
                                              <RadioGroupItem
                                                id={item.startTime.toString()}
                                                value={item.startTime}
                                                disabled={
                                                  item.amount <= item.count
                                                    ? true
                                                    : false
                                                }
                                              />
                                              <div className="flex flex-row items-center justify-between w-full">
                                                <p>{item.startTime}</p>
                                                <div className="flex flex-row items-center text-sm text-neutral-500 gap-1">
                                                  <p>
                                                    {item.amount - item.count}명
                                                    /{" "}
                                                  </p>
                                                  <p>{item.amount}명</p>
                                                </div>
                                              </div>
                                            </div>
                                          </FormControl>
                                          <label
                                            className={`flex flex-col items-start gap-3 w-full h-full  ${
                                              item.amount <= item.count
                                                ? "cursor-not-allowed"
                                                : "cursor-pointer"
                                            }`}
                                            htmlFor={item.startTime.toString()}
                                          >
                                            <div className="w-full flex flex-row flex-wrap items-start gap-[2px]">
                                              {new Array(item.amount)
                                                .fill({})
                                                .map((newitem, newIndex) => {
                                                  return (
                                                    <div
                                                      key={newIndex}
                                                      className={`w-[25px] h-[8px]  ${
                                                        newIndex + 1 >
                                                        item.count
                                                          ? "bg-primary/80"
                                                          : "bg-neutral-300"
                                                      }`}
                                                    ></div>
                                                  );
                                                })}
                                            </div>
                                            {/* <p>남은슬롯 : {item.amount} 슬롯</p>
                                          <p>예약 : {item.count} 슬롯</p> */}
                                          </label>
                                        </FormItem>
                                      );
                                    })}
                                  </div>
                                </RadioGroup>
                              </FormControl>
                              <div className=" col-span-12">
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />
                        {form.getValues("checkInTime") && (
                          <>
                            {subProduct.length > 0 && (
                              <div className=" col-span-12   border-b p-6 bg-white">
                                <div className="mb-4">
                                  <FormLabel className="text-lg font-semibold">
                                    옵션 상품
                                  </FormLabel>
                                  <FormDescription>
                                    선택 옵션의 수량을 선택하세요.
                                  </FormDescription>
                                </div>
                                <FormField
                                  control={form.control}
                                  name="subProduct"
                                  render={() => (
                                    <FormItem>
                                      {subProduct.map((item, index) => (
                                        <div
                                          key={index}
                                          className="flex flex-row items-center justify-between w-full"
                                        >
                                          <FormLabel className="flex flex-col items-start gap-2 w-full">
                                            <div className="flex flex-row items-center gap-2  border px-3 py-4 rounded-md w-full justify-between">
                                              <div className="flex flex-row items-center gap-2">
                                                <Badge>필수</Badge>
                                                <p>{item.title}</p>
                                              </div>
                                              <p>
                                                {item.price.toLocaleString()}원
                                              </p>
                                            </div>
                                            <div className="flex flex-row items-center gap-2 w-full mt-3">
                                              <SelectProductField
                                                form={form}
                                                nestIndex={index}
                                                control={form.control}
                                                setvalue={form.setValue}
                                              />
                                            </div>
                                          </FormLabel>
                                        </div>
                                      ))}
                                      {/* <FormMessage /> */}
                                    </FormItem>
                                  )}
                                />
                              </div>
                            )}
                            {detail.priceType === "GROUP" ? (
                              detail.groupPrice && (
                                <>
                                  <FormField
                                    control={form.control}
                                    name="groupNumber"
                                    render={({ field }) => (
                                      <FormItem className="gap-2 col-span-12   flex flex-col items-start   border-b p-6 bg-white">
                                        <div className="flex flex-col items-start justify-between  w-full">
                                          <div className="mb-4">
                                            <FormLabel className="text-lg font-semibold">
                                              그룹 인원
                                            </FormLabel>
                                            <FormDescription className="flex flex-col items-start gap-1">
                                              <div className="flex flex-row items-center gap-2">
                                                <p>그룹당 가격</p>
                                                <p>
                                                  {Number(
                                                    detail.groupPrice
                                                  ).toLocaleString()}
                                                  원
                                                </p>
                                              </div>
                                              체험상품의 그룹 인원수 제한은{" "}
                                              {detail.groupLimit}
                                              명입니다.
                                            </FormDescription>
                                          </div>
                                          <div className="flex flex-col items-start w-full gap-2">
                                            {groupMembersFields.map(
                                              (item, index) => {
                                                // console.log("item", item);
                                                return (
                                                  <div
                                                    className="flex flex-col items-start gap-2 rounded-md border col-span-12 p-3 w-full "
                                                    key={index}
                                                  >
                                                    <Controller
                                                      control={form.control}
                                                      name={`groupMembers.${index}.amount`}
                                                      render={({
                                                        field: {
                                                          onChange,
                                                          onBlur,
                                                          value,
                                                          ref,
                                                        },
                                                      }) => {
                                                        return (
                                                          <div className="flex flex-row items-center flex-1 w-full justify-between">
                                                            <div className="flex flex-col items-start flex-1 gap-1">
                                                              <div className="flex flex-row items-center gap-2  w-full justify-start">
                                                                <div className="flex flex-row items-center gap-3 ">
                                                                  <p>
                                                                    {
                                                                      item.startAge
                                                                    }{" "}
                                                                    세
                                                                  </p>
                                                                  <p>~</p>
                                                                  <p>
                                                                    {
                                                                      item.endAge
                                                                    }{" "}
                                                                    세
                                                                  </p>
                                                                </div>
                                                                {item.isFree && (
                                                                  <Badge className="text-xs">
                                                                    무료
                                                                  </Badge>
                                                                )}
                                                              </div>
                                                              <p className="text-xs text-neutral-500">
                                                                {item.message}
                                                              </p>
                                                            </div>
                                                            <div className="flex flex-col items-end  gap-3  flex-1 ">
                                                              <GroupNumberInput
                                                                min={0}
                                                                max={99}
                                                                disabled={checGroupMember(
                                                                  item.isFree
                                                                )}
                                                                name={`groupMembers.${index}.amount`}
                                                                onChange={
                                                                  onChange
                                                                }
                                                                value={
                                                                  value || 0
                                                                }
                                                                setvalue={
                                                                  form.setValue
                                                                }
                                                              />
                                                            </div>
                                                          </div>
                                                        );
                                                      }}
                                                    />
                                                  </div>
                                                );
                                              }
                                            )}
                                          </div>
                                        </div>
                                      </FormItem>
                                    )}
                                  />
                                </>
                              )
                            ) : (
                              <div className="gap-3 col-span-12  grid grid-cols-12  border-b p-6 bg-white">
                                <div className="flex flex-col items-start col-span-12 gap-1">
                                  <FormLabel className="flex flex-row items-start font-semibold text-lg">
                                    방문인원
                                  </FormLabel>
                                  <p className="text-neutral-500  text-sm">
                                    본 체험상품은{" "}
                                    <span className=" font-semibold text-primary">
                                      개인별
                                    </span>{" "}
                                    금액을 책정합니다.
                                  </p>
                                </div>
                                {agePriceFields.map((item, index) => {
                                  return (
                                    <div
                                      className="flex flex-col items-start gap-2 rounded-md border col-span-12 p-3 "
                                      key={index}
                                    >
                                      <Controller
                                        control={form.control}
                                        name={`agePrice.${index}.amount`}
                                        render={({
                                          field: {
                                            onChange,
                                            onBlur,
                                            value,
                                            ref,
                                          },
                                        }) => {
                                          return (
                                            <div className="flex flex-row items-center flex-1 w-full justify-between">
                                              <div className="flex flex-col items-start flex-1 gap-1">
                                                {item.isFree && (
                                                  <Badge className="text-xs">
                                                    무료
                                                  </Badge>
                                                )}
                                                <div className="flex flex-row items-center gap-2 justify-between w-full">
                                                  <div className="flex flex-row items-center gap-3 flex-1 ">
                                                    <p>{item.startAge} 세</p>
                                                    <p>~</p>
                                                    <p>{item.endAge} 세</p>
                                                  </div>
                                                  <div>
                                                    <p>
                                                      {Number(
                                                        item.price
                                                      ).toLocaleString()}
                                                      원
                                                    </p>
                                                  </div>
                                                </div>
                                                <p className="text-xs text-neutral-500">
                                                  {item.message}
                                                </p>
                                              </div>
                                              <div className="flex flex-col items-end  gap-3  flex-1 ">
                                                <NumberInput
                                                  min={0}
                                                  max={99}
                                                  name={`agePrice.${index}.amount`}
                                                  onChange={onChange}
                                                  value={value || 0}
                                                  setvalue={form.setValue}
                                                />
                                              </div>
                                            </div>
                                          );
                                        }}
                                      />
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                            <FormField
                              control={form.control}
                              name="visitor"
                              render={({ field }) => (
                                <FormItem className="gap-2 col-span-12  grid grid-cols-12   border-b p-6 bg-white">
                                  <FormLabel className="col-span-4 space-y-0">
                                    방문자대표
                                  </FormLabel>
                                  <FormDescription className=" col-span-12 space-y-0">
                                    실제 방문하시는 분으로 입력하세요.
                                  </FormDescription>
                                  <FormControl className=" col-span-12">
                                    <Input
                                      placeholder="방문자 대표를 입력하세요."
                                      {...field}
                                    />
                                  </FormControl>
                                  <div className=" col-span-12">
                                    <FormMessage />
                                  </div>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="visitorPhone"
                              render={({ field }) => (
                                <FormItem className="gap-2 col-span-12  grid grid-cols-12 border-b p-6 bg-white">
                                  <FormLabel className="col-span-4">
                                    연락처
                                  </FormLabel>
                                  <FormDescription className=" col-span-12">
                                    예약 변경 등으로 연락드릴 번호를 입력하세요.
                                  </FormDescription>
                                  <FormControl className=" col-span-12">
                                    <Input
                                      placeholder="방문자 대표 연락처를 입력하세요."
                                      {...field}
                                    />
                                  </FormControl>
                                  <div className=" col-span-12">
                                    <FormMessage />
                                  </div>
                                </FormItem>
                              )}
                            />
                          </>
                        )}
                      </>
                    )}
                  </div>
                )}

                <div className=" fixed bottom-0 left-0 w-full bg-white border-t col-span-12 px-6 ">
                  <div className="container mx-auto p-3 flex  flex-row lg:flex-col  items-center lg:items-end  justify-between">
                    <div className="flex-1 flex flex-col  items-start lg:items-end   w-full">
                      {totalPriceObj && (
                        <div className="text-neutral-500 text-sm flex flex-col items-end">
                          {totalPriceObj.agePrice > 0 && (
                            <div className="flex flex-row items-center gap-2">
                              <p>방문인원 금액</p>
                              <p>{totalPriceObj.agePrice.toLocaleString()}원</p>
                            </div>
                          )}
                          {totalPriceObj.selectPrice > 0 && (
                            <div className="flex flex-row items-center gap-2">
                              <p>선택상품</p>
                              <p>
                                {totalPriceObj.selectPrice.toLocaleString()}원
                              </p>
                            </div>
                          )}
                          {totalPriceObj.subTotal > 0 && (
                            <div className="flex flex-row items-center gap-2">
                              <p>필수상품</p>
                              <p>{totalPriceObj.subTotal.toLocaleString()}원</p>
                            </div>
                          )}
                          {totalPriceObj.groupPrice > 0 && (
                            <div className="flex flex-row items-center gap-2">
                              <p>그룹 금액</p>
                              <p>
                                {totalPriceObj.groupPrice.toLocaleString()}원
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-row items-center gap-6 py-6">
                      <div>
                        <p className="text-sm">결제 예정금액</p>
                        <p className=" font-semibold">
                          {totalPrice.toLocaleString()}원
                        </p>
                      </div>
                      {session?.user.id && (
                        <Button type="submit" disabled={updating}>
                          {updating ? (
                            <Loader2 className="size-4 animate-spin" />
                          ) : (
                            "예약하기"
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
}
