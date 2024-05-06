"use client";
import getSession from "@/lib/session";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import {
  getProductDetail,
  getReservationDate,
  makeReservation,
} from "./_component/actions";
import { Button } from "@/components/ui/button";
import { de, ko } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { z } from "zod";
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
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper/modules";
import { Badge } from "@/components/ui/badge";
import { NumberInput } from "@/components/form/NumberInput";
import { Checkbox } from "@/components/ui/checkbox";
import { SelectProductField } from "./_component/selectProductField";
import dayjs from "dayjs";

type clickSelectDate = {
  date: Date;
  detail: any;
};
const FormSchema = z.object({
  checkInDate: z.union([
    z.date({ required_error: "방문일자을 선택하세요." }),
    z.string(),
  ]),
  checkInTime: z.string().min(1, { message: "예약 가능 시간을 선택하세요." }),
  // optionProduct: z.array(z.string().nullable()).nullable(),
  groupNumber: z
    .string({
      required_error: "그룹의 인원수를 입력하세요.",
    })
    .nullable(),
  agePrice: z.array(
    z.object({
      amount: z.string(),
      endAge: z.string(),
      isFree: z.boolean(),
      message: z.string(),
      price: z.string(),
      startAge: z.string(),
    })
  ),
  subProduct: z.array(
    z.object({
      howto: z.string(),
      title: z.string(),
      description: z.string(),
      price: z.string(),
      selectProducts: z.array(
        z.object({
          amount: z.string(),
          howto: z.string(),
          title: z.string(),
          description: z.string(),
          price: z.string(),
        })
      ),
    })
  ),
  visitor: z.string({
    required_error: "방문자 대표를 입력하세요.",
  }),
  visitorPhone: z.string({
    required_error: "방문자 대표 연락처를 입력하세요.",
  }),
});
type optionSchemaType = z.infer<typeof FormSchema>;

export default function Page({ params }: { params: { productId: string } }) {
  const [userId, setUserId] = React.useState<number>();
  const [images, setImages] = React.useState<string[]>([]);
  const [calenderOpen, setCalenderOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>();
  const [detail, setDetail] = React.useState<any>();
  const [totalReservationDate, setTotalReservationDate] = React.useState<any[]>(
    []
  );
  const [agePrice, setAgePrice] = React.useState(0);
  const [selectPrice, setSelectPrice] = React.useState(0);

  const [totalPrice, setTotalPrice] = React.useState(0);
  const getUser = async () => {
    const session = await getSession();
    console.log("sesion", session);
    if (session) {
      setUserId(session.id);
    }
  };
  React.useEffect(() => {
    getUser();
  }, []);

  const clickSelectDate = async ({ date, detail }: clickSelectDate) => {
    console.log("date", date, detail);
    // setDate(date);
    let result = await getProductDetail(Number(params.productId));
    if (result) {
      let totalReservationDate = await getReservationDate({
        farmId: Number(result.farm.id),
        date,
      });
      console.log("totalReservationDate", totalReservationDate);
      setTotalReservationDate(totalReservationDate);
    }
  };
  //1.날짜를 선택하면
  //2.reservationDate 갬색
  //3. 가능슬롯 계산
  //4. 가능슬롯 선택

  const getProductsDetailData = async () => {
    // 1.제품정보 가져오기
    // 2.농장의 예약데이트 가져오기
    //3. 농장의 예약 슬롯가져오기
    //   4. 농장의 취소 예약 맥스 가져오기

    // 3. 농장의 영업시간 가져오기

    const productId = Number(params.productId);
    if (isNaN(productId)) {
      return notFound();
    }
    let result: any = await getProductDetail(productId);
    console.log("result", result);
    setDetail(result);
    let reservationMax = result.farm.reservationMax;
    let reservationMin = result.farm.reservationMin;
    let slot = result.farm.slot;
    let reservationDate = result.farm.reservationDate;
    console.log(reservationMax, reservationMin, slot, reservationDate);
    return result;
  };

  //
  React.useEffect(() => {
    if (params.productId) {
      getProductsDetailData();
    }
  }, [params.productId]);

  const form = useForm<optionSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: async () => {
      let result = await getProductsDetailData();
      let newImage = [...result.images];
      let images = [result.mainImage, ...newImage];
      console.log("images", images);
      setImages(images);
      console.log("result", result);
      let optionVaules = result.subProduct.map((item: any) => {
        if (item.essential) {
          return item.title;
        }
      });
      let agePrice = [];
      if (result.personalPrice.length > 0) {
        agePrice = result.personalPrice.map((item: any) => {
          return { ...item, amount: "0" };
        });
      }
      let subProduct = [];
      if (result.subProduct.length > 0) {
        subProduct = result.subProduct.map((item: any) => {
          let selectProducts = item.selectProducts.map((selectProduct: any) => {
            return { ...selectProduct, amount: "0" };
          });
          return { ...item, selectProducts: selectProducts };
        });
      }
      console.log("subProduct", subProduct);
      return {
        checkInDate: "",
        checkInTime: "",
        groupNumber: "",
        agePrice: agePrice.length > 0 ? agePrice : [],
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
  const { fields: subProduct } = useFieldArray({
    control: form.control,
    name: "subProduct",
  });
  const onSubmit = form.handleSubmit(async (data: optionSchemaType) => {
    console.log("data", data);
    let newdata = {
      farmInitail: detail.farm.initail,
      farmId: detail.farmId,
      productId: Number(params.productId),
      userId: userId,
      checkInDate: new Date(data.checkInDate).setHours(
        new Date(data.checkInDate).getHours() + 9
      ),
      checkInTime: data.checkInTime,
      visitor: data.visitor,
      visitorPhone: data.visitorPhone,
      personalPrice: data.agePrice,
      groupPrice: detail.groupPrice,
      groupNumber: data.groupNumber,
      priceType: detail.priceType,
      totalPrice: totalPrice,
    };
    console.log("newdata", newdata);
    const formData = new FormData();
    let string = JSON.stringify(newdata);
    formData.append("newData", string);
    let result = await makeReservation(formData);
    console.log(result);
    if (result) {
    }
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  });
  React.useEffect(() => {
    const subscirbe = form.watch((data, { name }) => {
      console.log("name", name, data);
      if (name === "checkInDate") {
        console.log(data.checkInDate, name, detail);
        if (data.checkInDate) {
          clickSelectDate({ date: new Date(data.checkInDate), detail });
          form.resetField("checkInTime");
        }
      }
      if (name?.includes("agePrice")) {
        console.log(data.agePrice, name, detail);
        console.log(form.getValues("agePrice"));
        if (data.agePrice) {
          console.log(data.agePrice);
          let totleSum = 0;
          for (const agePrice of data.agePrice) {
            console.log(agePrice);
            if (agePrice) {
              let price = Number(agePrice.price);
              let amount = Number(agePrice.amount);
              let sum = price * amount;
              totleSum += sum;
            }
          }
          setAgePrice(totleSum);
          console.log("agePrice totleSum", totleSum, totalPrice);
        }
      }
      if (name?.includes("subProduct")) {
        console.log(data.subProduct, name, detail);
        console.log(form.getValues("subProduct"));
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
          console.log("subProduct totleSum", totleSum, totalPrice);
        }
      }
    });

    return () => subscirbe.unsubscribe();
  }, [form.watch]);

  //
  const caluTotal = () => {
    let subTotal = 0;
    let subProductPrice = form
      .getValues("subProduct")
      .map((item: any) => (subTotal += item.price));
    console.log(agePrice, selectPrice);
    setTotalPrice(agePrice + selectPrice + subTotal);
  };

  //
  React.useEffect(() => {
    caluTotal();
  }, [agePrice, selectPrice]);

  //
  return (
    <div className="w-full    container mx-auto relative  min-h-screen">
      {detail && (
        <div className="w-full">
          <div className=" col-span-12 bg-white">
            {images.length > 0 && (
              <Swiper
                loop
                speed={2000}
                autoplay
                pagination={true}
                modules={[Pagination, Navigation]}
                className=" w-full h-full "
              >
                {images.map((image, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <div className=" relative w-full bg-red-200  aspect-[4/3]">
                        <Image
                          src={image}
                          alt={`${detail.name}-${index}`}
                          fill
                          priority
                        />
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            )}
          </div>
          <div className="p-3 col-span-12 bg-white">
            <p className="text-lg font-semibold">{detail.title}</p>
            <p className="text-sm text-neutral-500">{detail.description}</p>
            <p>메거진 링크</p>
            {detail.educationSubject.length > 0 && (
              <div className="flex flex-row items-center gap-2 flex-wrap">
                {detail.educationSubject.map((item: any, index: any) => {
                  return <Badge key={index}>{item.tag}</Badge>;
                })}
              </div>
            )}
          </div>
          <div className="w-full flex flex-col items-start bg-white gap-3 flex-1  p-6 ">
            <Form {...form}>
              <form
                onSubmit={onSubmit}
                className=" w-full grid grid-cols-12 gap-6  pb-24  "
              >
                <FormField
                  control={form.control}
                  name="checkInDate"
                  render={({ field }) => (
                    <FormItem className="gap-8 col-span-12  grid grid-cols-12 ">
                      <FormLabel className=" col-span-4 flex flex-row items-center font-semibold">
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
                                " col-span-8 text-left font-normal  ",
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
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                {totalReservationDate.length > 0 && (
                  <>
                    <FormField
                      control={form.control}
                      name="checkInTime"
                      render={({ field }) => (
                        <FormItem className="gap-8 col-span-12  grid grid-cols-12 ">
                          <FormLabel className="col-span-4 flex flex-row items-start font-semibold">
                            예약가능 시간
                          </FormLabel>
                          <FormControl className=" col-span-8 grid grid-cols-12 3">
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value || ""}
                              className="flex flex-col "
                            >
                              {totalReservationDate.map((item, index) => {
                                return (
                                  <FormItem
                                    key={index}
                                    className="  col-span-12 border rounded-md p-3 flex flex-row items-center gap-2 space-y-0"
                                  >
                                    <FormControl>
                                      <RadioGroupItem value={item.startTime} />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      <div className="flex flex-row items-center gap-3">
                                        <p>{item.startTime}</p>
                                        <p>남은슬롯 : {item.amount} 슬롯</p>
                                      </div>
                                    </FormLabel>
                                  </FormItem>
                                );
                              })}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className=" col-span-12">
                      <div className="mb-4">
                        <FormLabel className="text-base">옵션 상품</FormLabel>
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
                                    <p>{item.price.toLocaleString()}원</p>
                                  </div>
                                  <div className="flex flex-row items-center gap-2 w-full">
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
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {detail.priceType === "GROUP" ? (
                      <FormField
                        control={form.control}
                        name="groupNumber"
                        render={({ field }) => (
                          <FormItem className="gap-8 col-span-12  grid grid-cols-12 ">
                            <FormLabel>그룹 인원</FormLabel>
                            <FormControl>
                              <Input
                                value={field.value || "0"}
                                onChange={field.onChange}
                                placeholder="그룹의 인원수을입력하세요."
                              />
                            </FormControl>
                            <FormDescription>
                              체험상품의 그룹 인원수 제한은 {detail.groupLimit}
                              명입니다.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ) : (
                      <div className="gap-3 col-span-12  grid grid-cols-12 ">
                        <div className="flex flex-col items-start col-span-12 gap-1">
                          <FormLabel className="flex flex-row items-start font-semibold">
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
                                  field: { onChange, onBlur, value, ref },
                                }) => {
                                  return (
                                    <div className="flex flex-row items-center flex-1 w-full justify-between">
                                      <div className="flex flex-col items-start flex-1 gap-1">
                                        {item.isFree && (
                                          <Badge className="text-xs">
                                            무료
                                          </Badge>
                                        )}
                                        <div className="flex flex-row items-center gap-3 flex-1 ">
                                          <p>{item.startAge} 세</p>
                                          <p>~</p>
                                          <p>{item.endAge} 세</p>
                                        </div>
                                        <p className="text-xs text-neutral-500">
                                          {item.message}
                                        </p>
                                      </div>
                                      <div className="flex flex-row items-center justify-end gap-3  flex-1">
                                        <NumberInput
                                          name={`agePrice.${index}.amount`}
                                          onChange={onChange}
                                          value={value || "0"}
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
                        <FormItem className="gap-2 col-span-12  grid grid-cols-12 ">
                          <FormLabel className="col-span-4 space-y-0">
                            방문자대표
                          </FormLabel>
                          <FormDescription className=" col-span-12 space-y-0">
                            실제 방문하시는 분으로 입력하세요.
                          </FormDescription>
                          <FormControl className=" col-span-12">
                            <Input
                              required
                              placeholder="방문자 대표를 입력하세요."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="visitorPhone"
                      render={({ field }) => (
                        <FormItem className="gap-2 col-span-12  grid grid-cols-12 ">
                          <FormLabel className="col-span-4">연락처</FormLabel>
                          <FormDescription className=" col-span-12">
                            예약 변경 등으로 연락드릴 번호를 입력하세요.
                          </FormDescription>
                          <FormControl className=" col-span-12">
                            <Input
                              required
                              placeholder="방문자 대표 연락처를 입력하세요."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                <div className=" fixed bottom-0 left-0 w-full bg-white border-t col-span-12 px-6">
                  <div className="w-full p-3 flex flex-row items-center  justify-between">
                    <div>
                      <p className="text-sm">결제 예정금액</p>
                      <p className=" font-semibold">
                        {totalPrice.toLocaleString()}원
                      </p>
                    </div>
                    <Button type="submit">예약하기</Button>
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
