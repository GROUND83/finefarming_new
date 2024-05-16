"use client";
import getSession from "@/lib/session";
import copy from "copy-to-clipboard";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { notFound } from "next/navigation";
import React from "react";
import { getProductDetail } from "./_component/actions";
import { Button } from "@/components/ui/button";

import { ExclamationCircleIcon, PhoneIcon } from "@heroicons/react/24/outline";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper/modules";
import { ProductTitleWrap } from "../_components/ProductTitleWrap";
import Map from "@/components/map";

export default function Page({ params }: { params: { productId: string } }) {
  const [detail, setDetail] = React.useState<any>();
  const [images, setImages] = React.useState<string[]>([]);
  const getProductsDetailData = async () => {
    const productId = Number(params.productId);
    if (isNaN(productId)) {
      return notFound();
    }
    let result: any = await getProductDetail(productId);
    // console.log("result", result);
    setDetail(result);
    let newImage = [...result.images];
    if (result.mainImage) {
      let images = [result.mainImage, ...newImage];
      // console.log("images", images);
      setImages(images);
    } else {
      setImages(newImage);
    }
  };
  React.useEffect(() => {
    if (params.productId) {
      getProductsDetailData();
    }
  }, [params.productId]);

  const handleCopyClipBoard = (text: string) => {
    try {
      copy(text);
      // navigator.clipboard.writeText(text);
      alert("주소가 복사되었습니다.");
    } catch (error) {
      alert("주소 복사에 실패하였습니다.");
    }
  };

  return (
    <div className="w-full bg-white  ">
      {detail && (
        <div className="container mx-auto flex-col items-start grid grid-cols-12 gap-3">
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
                      <div className=" relative w-full bg-neutral-100  aspect-[4/3] lg:aspect-video">
                        <Image
                          src={image}
                          alt={`${detail.name}-${index}`}
                          fill
                          priority
                          className="  object-cover"
                          sizes="(min-width: 768px) 50vw, (min-width: 1440) 100vw, 100vw"
                        />
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            )}
          </div>
          <div className="col-span-12 bg-white">
            <ProductTitleWrap
              productId={detail.id}
              title={detail.title}
              description={detail.description}
              educationSubject={detail.educationSubject}
              showSubMenu={true}
            />
          </div>

          <div className="w-full relative pb-24 col-span-12 ">
            <Tabs defaultValue="detail" className="w-full">
              <TabsList className="w-full flex flex-row items-center justify-start  px-3   ">
                <TabsTrigger value="detail" className="text-sm lg:text-lg">
                  상세 정보
                </TabsTrigger>
                <TabsTrigger value="product" className="text-sm lg:text-lg">
                  추가 정보
                </TabsTrigger>
                <TabsTrigger value="farm" className="text-sm lg:text-lg">
                  농장 정보
                </TabsTrigger>
              </TabsList>
              <TabsContent value="product">
                <div className="p-3  flex flex-col items-start gap-3">
                  <div className=" p-3 w-full flex flex-col items-start gap-3 text-sm">
                    <div className="flex flex-col gap-4 w-full">
                      {detail.farmInsideType && (
                        <div className="flex flex-col items-start w-full gap-2">
                          <p className="  text-pretty whitespace-pre-wrap text-sm indent-2">
                            우천시 교육가능
                          </p>
                        </div>
                      )}
                      <div className="flex flex-col items-start w-full gap-2">
                        <h2 className="font-semibold">체험 준비물</h2>
                        <div className="px-2 flex flex-col items-start gap-2 w-full">
                          <div className="flex flex-row items-center gap-1  ">
                            {detail.tools.map((item: any, index: any) => {
                              return (
                                <Badge key={index} variant={"outline"}>
                                  {item}
                                </Badge>
                              );
                            })}
                          </div>
                          <div className="w-full rounded-md border  bg-neutral-100 p-3">
                            <p className="  text-pretty whitespace-pre-wrap text-sm flex flex-row items-start gap-2">
                              <ExclamationCircleIcon className="size-4" />
                              {detail.cloth}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-start w-full gap-2">
                        <h2 className="font-semibold">교육정보</h2>
                        <div className="w-full px-2 flex flex-col items-start gap-2">
                          <p className="  text-pretty whitespace-pre-wrap text-sm ">
                            {detail.educationTitle}
                          </p>

                          {detail.educationData ? (
                            <Badge variant={"outline"}>자료제공</Badge>
                          ) : (
                            <Badge variant={"outline"}>자료미제공</Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-start w-full gap-2">
                        <h2 className="font-semibold">교육주제</h2>
                        <div className="w-full px-2 flex flex-row items-center flex-wrap gap-1">
                          {detail.educationSubject.map(
                            (item: any, index: any) => {
                              return (
                                <Badge key={index} className="">
                                  {item.tag}
                                </Badge>
                              );
                            }
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3   flex flex-col items-start gap-3">
                  <div className="px-2">
                    <h1 className=" font-semibold">요금정보</h1>
                  </div>
                  <div className=" p-3 w-full flex flex-col items-start gap-3 text-sm">
                    <div className="flex flex-col gap-4 w-full">
                      <div className="flex flex-col items-start w-full gap-2">
                        {detail.priceType === "GROUP" ? (
                          <p className="  text-pretty whitespace-pre-wrap text-md">
                            <span className="font-semibold text-primary mr-2">
                              그룹별
                            </span>
                            요금을 책정합니다.
                          </p>
                        ) : (
                          <p className="  text-pretty whitespace-pre-wrap text-md">
                            <span className="font-semibold text-primary mr-2">
                              개인별
                            </span>
                            요금을 책정합니다.
                          </p>
                        )}
                      </div>
                      {detail.priceType === "PERSONAL" && (
                        <div className="flex flex-col items-start w-full gap-2">
                          <div className="flex flex-col items-start w-full gap-2 ">
                            {detail.personalPrice.map(
                              (item: any, index: any) => {
                                return (
                                  <div
                                    key={index}
                                    className=" grid grid-cols-12 gap-2 bg-neutral-100  w-full px-3 py-3 border "
                                  >
                                    <div className="flex flex-col items-start gap-1 col-span-4">
                                      <div className="flex flex-row items-center gap-3 col-span-6">
                                        <p>{item.startAge}세</p>
                                        <p>~</p>
                                        <p>{item.endAge}세</p>
                                      </div>
                                      <div>
                                        <p>
                                          {Number(item.price).toLocaleString()}
                                          원
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex flex-col items-start gap-1 col-span-8">
                                      <p>{item.isFree && "무료"}</p>
                                      <p>{item.message}</p>
                                    </div>
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </div>
                      )}
                      {detail.priceType === "GROUP" && (
                        <div className="flex flex-col items-start w-full gap-2">
                          <h2 className="font-semibold">그룹 요금</h2>
                          <div className="flex flex-col items-start w-full gap-2 px-2">
                            <div className=" grid grid-cols-9 gap-2 bg-neutral-100  w-full px-2 py-2 border">
                              <div className="flex flex-row items-center gap-3 col-span-3">
                                <p>그룹 제한</p>

                                <p>{detail.groupLimit}명</p>
                              </div>
                              <div className="flex flex-row items-center gap-3 col-span-6">
                                <p>그룹 요금</p>
                                <p>{detail.groupPrice.toLocaleString()}원</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-3  flex flex-col items-start gap-3 bg-neutral-800">
                  <div className="px-2">
                    <h1 className=" font-semibold text-white">
                      취소 환불 정책
                    </h1>
                  </div>
                  <div className=" p-3 w-full  flex flex-col items-start gap-3 text-sm">
                    <p className="  text-justify whitespace-pre-wrap text-sm text-neutral-500">
                      {detail.farm.refundPolicy}
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="detail">
                <div className="w-full bg-white flex flex-col items-start gap-2 pb-3 px-2">
                  {detail.detail && (
                    <>
                      <div className="w-full h-[480px]   rounded-b-2xl bg-gradient-to-t from-primary relative overflow-hidden bg-white ">
                        <div className="w-full h-full bg-gradient-to-t from-[#063824] to-from-[#063824] to-55%  z-10 absolute"></div>
                        <Image
                          src={detail.detail.image}
                          fill
                          alt={detail.detail.title}
                          priority
                          style={{ objectFit: "cover" }}
                          className=" z-0"
                          sizes="(min-width: 768px) 50vw, (min-width: 1440) 100vw, 100vw"
                        />
                        <div className="absolute z-20 bottom-0 left-0 p-6 text-white w-full">
                          <div className="flex flex-col items-start gap-1 w-full">
                            <p className="text-md lg:text-lg w-full bg-transparent border-none text-white placeholder:text-white  p-0 outline-none m-0 space-y-0">
                              {detail.detail.titleDescription}
                            </p>
                            <p className="resize-none text-xl lg:text-3xl  whitespace-pre-wrap font-semibold w-full bg-transparent border-none text-white placeholder:text-white  p-0 outline-none m-0 space-y-0">
                              {detail.detail.title}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="w-full bg-white flex flex-col items-start px-3 gap-3 mt-9 ">
                        {detail.detail.sections.map(
                          (session: any, sessionIndex: any) => {
                            // console.log("session", session);
                            return (
                              <div
                                key={sessionIndex}
                                className="w-full flex flex-col items-start gap-3 lg:gap-6 mb-6"
                              >
                                {session.subtitle && (
                                  <div className="bg-primary px-3 py-1 rounded-[3px] flex flex-col items-start">
                                    <p className="text-sm lg:text-base  text-white ">
                                      {session.subtitle}
                                    </p>
                                  </div>
                                )}
                                {session.title && (
                                  <div className="flex flex-col items-start w-full">
                                    <p className="text-xl lg:text-4xl  whitespace-pre-wrap w-full font-semibold text-pretty">
                                      {session.title}
                                    </p>
                                  </div>
                                )}
                                {session.titleDescription && (
                                  <div className="flex flex-col items-start w-full">
                                    <p className="text-sm lg:text-lg  whitespace-pre-wrap w-full text-pretty">
                                      {session.titleDescription}
                                    </p>
                                  </div>
                                )}
                                {session.images.length > 0 && (
                                  <div
                                    className={`w-full grid grid-cols-2  gap-2 `}
                                  >
                                    {session.images.map(
                                      (image: any, k: any) => {
                                        return (
                                          <div
                                            key={k}
                                            className={`${
                                              session.images.length > 2 &&
                                              k === 0
                                                ? " col-span-2 aspect-square relative"
                                                : session.images.length > 2 &&
                                                  k === 0
                                                ? " col-span-1 aspect-square relative"
                                                : session.images.length > 1 &&
                                                  k === 0
                                                ? " col-span-1 aspect-square relative"
                                                : session.images.length > 1 &&
                                                  k !== 0
                                                ? " col-span-1 aspect-square relative"
                                                : session.images.length === 1 &&
                                                  k !== 0
                                                ? " col-span-2 aspect-[4/3] relative"
                                                : session.images.length === 1 &&
                                                  k === 0
                                                ? " col-span-2  aspect-square relative"
                                                : " col-span-2  aspect-square relative"
                                            } relative border`}
                                          >
                                            <Image
                                              src={image}
                                              fill
                                              priority
                                              alt={`image${k}`}
                                              style={{ objectFit: "cover" }}
                                              sizes="(min-width: 768px) 50vw, (min-width: 1440) 100vw, 100vw"
                                            />
                                          </div>
                                        );
                                      }
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          }
                        )}
                      </div>
                      <div className="w-full bg-white flex flex-col items-start px-3 gap-3 mt-9 ">
                        {detail.process.length > 0 && (
                          <div className="w-full flex flex-col items-start gap-2">
                            <p className="text-lg font-semibold">
                              체험 진행 순서
                            </p>
                            {detail.process.map(
                              (suggest: any, suggestIndex: any) => {
                                return (
                                  <div
                                    key={suggestIndex}
                                    className="bg-neutral-100 w-full p-3 flex flex-row items-center gap-2"
                                  >
                                    <div className="w-[30px] h-[30px] bg-primary  flex flex-col items-center justify-center rounded-full text-white">
                                      <p>{suggestIndex + 1}</p>
                                    </div>
                                    <p className="text-sm">{suggest.title}</p>
                                  </div>
                                );
                              }
                            )}
                          </div>
                        )}
                        <div className="w-full flex flex-col items-start gap-2">
                          <div className="bg-neutral-100 w-full p-3 flex flex-row items-center gap-2">
                            <ExclamationCircleIcon className="size-4" />
                            <p className="text-sm">{detail.processNotice}</p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="farm">
                <div className="p-3  flex flex-col items-start gap-3">
                  <div className=" p-3 w-full flex flex-col items-start gap-3 text-sm">
                    <div className="flex flex-col gap-4 w-full">
                      <div className="flex flex-col items-start w-full ">
                        <h1 className="text-pretty whitespace-pre-wrap text-lg lg:text-2xl font-semibold">
                          {detail.farm.name}
                        </h1>
                      </div>
                      {detail.farm.introduction && (
                        <div className="flex flex-col items-start w-full gap-2">
                          <p className=" text-pretty whitespace-pre-wrap text-sm  lg:text-lg">
                            {detail.farm.introduction}
                          </p>
                        </div>
                      )}
                      <div className="flex flex-col items-start gap-1 text-sm lg:text-base">
                        <div className="flex flex-row items-center w-full gap-2 border p-3 justify-between ">
                          <div className="flex flex-row items-center gap-1">
                            {/* <PhoneIcon className="size-3" /> */}
                            <p>대표번호</p>
                          </div>
                          <div className="flex flex-row items-center gap-1">
                            <p className="text-md font-semibold">
                              {detail.farm.mainPhone}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-row items-center w-full gap-2 border p-3 justify-between ">
                          <div>
                            <p>예약관련문의</p>
                          </div>
                          <div className="flex flex-row items-center gap-1">
                            {/* <PhoneIcon className="size-3" /> */}
                            <p className="text-md font-semibold">
                              {detail.farm.resevationPhone}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-row items-center w-full gap-2 border p-3 justify-between ">
                          <div>
                            <p>체험품종</p>
                          </div>
                          <div className="flex flex-row items-center gap-1">
                            {detail.farm.farmItems.map(
                              (item: any, index: any) => {
                                return <Badge key={index}>{item}</Badge>;
                              }
                            )}
                          </div>
                        </div>
                        <div className="flex flex-row items-center w-full gap-2 border p-3 justify-between ">
                          <div>
                            <p>시설</p>
                          </div>
                          <div className="flex flex-row items-center gap-2 flex-wrap">
                            {detail.farm.facilities.map(
                              (item: any, index: any) => {
                                return <Badge key={index}>{item}</Badge>;
                              }
                            )}
                          </div>
                        </div>
                        <div className="flex flex-row items-center w-full gap-2 border p-3 justify-between ">
                          <h2 className=" lg:text-base text-sm">주차 시설</h2>
                          {detail.farm.parking === "free" ? (
                            <p>무료</p>
                          ) : detail.farm.parking === "paid" ? (
                            <div className="flex flex-col items-start gap-2">
                              <Badge>유료</Badge>
                              <p>{detail.farm.parkinngFee}</p>
                            </div>
                          ) : null}
                        </div>
                      </div>

                      {detail.farm.pet && (
                        <div className="flex flex-col items-start w-full gap-2">
                          <h2 className="text-sm lg:text-base">
                            애완동물 출입
                          </h2>

                          <Badge>출입가능</Badge>
                        </div>
                      )}
                      <div className="flex flex-col items-start w-full gap-2">
                        <h2 className="font-semibold">운영시간</h2>
                        {detail.farm.mondayOpen && (
                          <div className="flex flex-row items-center gap-2 bg-neutral-100 w-full p-2 border">
                            <p>월요일 </p>
                            <p>{detail.farm.mondayStart}부터</p>
                            <p>{detail.farm.mondayEnd}까지</p>
                          </div>
                        )}
                        {detail.farm.tuesdayOpen && (
                          <div className="flex flex-row items-center gap-2 bg-neutral-100 w-full p-2 border">
                            <p>화요일 </p>
                            <p>{detail.farm.tuesdayStart}부터</p>
                            <p>{detail.farm.tuesdayEnd}까지</p>
                          </div>
                        )}
                        {detail.farm.wednesdayOpen && (
                          <div className="flex flex-row items-center gap-2 bg-neutral-100 w-full p-2 border">
                            <p>수요일 </p>
                            <p>{detail.farm.wednesdayStart}부터</p>
                            <p>{detail.farm.wednesdayEnd}까지</p>
                          </div>
                        )}
                        {detail.farm.thursdayOpen && (
                          <div className="flex flex-row items-center gap-2 bg-neutral-100 w-full p-2 border">
                            <p>목요일 </p>
                            <p>{detail.farm.thursdayStart}부터</p>
                            <p>{detail.farm.thursdayEnd}까지</p>
                          </div>
                        )}
                        {detail.farm.fridayOpen && (
                          <div className="flex flex-row items-center gap-2 bg-neutral-100 w-full p-2 border">
                            <p>금요일 </p>
                            <p>{detail.farm.fridayStart}부터</p>
                            <p>{detail.farm.fridayEnd}까지</p>
                          </div>
                        )}
                        {detail.farm.saturdayOpen && (
                          <div className="flex flex-row items-center gap-2 bg-neutral-100 w-full p-2 border">
                            <p>토요일 </p>
                            <p>{detail.farm.saturdayStart}부터</p>
                            <p>{detail.farm.saturdayEnd}까지</p>
                          </div>
                        )}
                        {detail.farm.sundayOpen && (
                          <div className="flex flex-row items-center gap-2 bg-neutral-100 w-full p-2 border">
                            <p>일요일 </p>
                            <p>{detail.farm.sundayStart}부터</p>
                            <p>{detail.farm.sundayEnd}까지</p>
                          </div>
                        )}
                        {detail.farm.holidayOpen && (
                          <div className="flex flex-row items-center gap-2 bg-neutral-100 w-full p-2 border">
                            <p>공휴일 </p>
                            <p>{detail.farm.holidayStart}부터</p>
                            <p>{detail.farm.holidayEnd}까지</p>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col items-start w-full gap-2">
                        <p className="  text-pretty whitespace-pre-wrap text-sm">
                          {detail.farm.address}
                        </p>
                        <div className="flex flex-row items-center gap-4 mt-3">
                          <Button
                            size={"sm"}
                            variant={"outline"}
                            className="bg-neutral-100 px-6"
                            onClick={() =>
                              handleCopyClipBoard(detail.farm.address)
                            }
                          >
                            주소복사
                          </Button>
                          <Button
                            asChild
                            size={"sm"}
                            variant={"outline"}
                            className="bg-[#FFE500] text-sm"
                          >
                            <Link
                              target="_blank"
                              href={`https://map.kakao.com/link/map/${detail.farm.name},${detail.farm.lang},${detail.farm.lat}`}
                            >
                              카카오 길 안내
                            </Link>
                          </Button>
                          <Button
                            asChild
                            size={"sm"}
                            variant={"outline"}
                            className="bg-[#03C75A] text-white text-sm"
                          >
                            <Link
                              target="_blank"
                              href={`https://map.naver.com?lng=${detail.farm.lat}&lat=${detail.farm.lang}&title=${detail.farm.name}`}
                            >
                              네이버 길 안내
                            </Link>
                          </Button>
                        </div>
                      </div>
                      <div className="w-full">
                        <Map address={detail.farm.address} />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <div className=" fixed bottom-0 container mx-auto bg-white border col-span-12 px-6 z-50">
            <div className="w-full p-3 flex flex-row items-center  justify-between">
              <div>
                <p>{detail.title}</p>
                <p className="text-neutral-500 text-sm">{detail.farm.name}</p>
              </div>
              <Button asChild>
                <Link href={`/reservation/new/${params.productId}`}>
                  예약하기
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* <>
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.1/kakao.min.js"
          integrity="sha384-kDljxUXHaJ9xAb2AzRd59KxjrFjzHa5TAoFQ6GbYTCAG0bjM55XohjjDT7tDDC01"
          crossOrigin="anonymous"
          onLoad={() => {
            console.log(process.env.NEXT_PUBLIC_KAKAO_MAP_KEY);
            window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_MAP_KEY);
          }}
        />
      </> */}
    </div>
  );
}
