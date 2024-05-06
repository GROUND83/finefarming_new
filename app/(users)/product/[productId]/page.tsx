"use client";
import getSession from "@/lib/session";
import copy from "copy-to-clipboard";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { notFound } from "next/navigation";
import React from "react";
import { getProductDetail } from "./_component/actions";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper/modules";
import { ProductTitleWrap } from "../_components/ProductTitleWrap";
import Map from "@/components/map";
import Script from "next/script";
import { ImageIcon } from "lucide-react";

async function getIsOwner(authorId: number) {
  const session = await getSession();
  if (session.id) {
    return session.id === authorId;
  }
  return false;
}

export default function Page({ params }: { params: { productId: string } }) {
  const navigationRef = React.useRef<HTMLDivElement>(null);

  const [detail, setDetail] = React.useState<any>();
  const [images, setImages] = React.useState<string[]>([]);
  const getProductsDetailData = async () => {
    const productId = Number(params.productId);
    if (isNaN(productId)) {
      return notFound();
    }
    let result: any = await getProductDetail(productId);
    console.log("result", result);
    setDetail(result);
    let newImage = [...result.images];
    let images = [result.mainImage, ...newImage];
    console.log("images", images);
    setImages(images);
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
    <div className="w-full bg-white container mx-auto ">
      {detail && (
        <div className="w-full flex-col items-start grid grid-cols-12 gap-3">
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
              <TabsList className="w-full flex flex-row items-center justify-start rounded-none text-lg border  ">
                <TabsTrigger value="detail">상세 정보</TabsTrigger>
                <TabsTrigger value="product" className="">
                  추가 정보
                </TabsTrigger>
                <TabsTrigger value="farm">농장 정보</TabsTrigger>
                {/* <TabsTrigger value="refund">취소환불</TabsTrigger> */}
              </TabsList>
              <TabsContent value="product">
                <div className="p-3  flex flex-col items-start gap-3">
                  <div className="px-2">
                    <h1 className=" font-semibold">기본 체험상품 안내</h1>
                  </div>
                  <div className="border p-3 w-full rounded-md flex flex-col items-start gap-3 text-sm">
                    <div className="flex flex-col gap-4 w-full">
                      <div className="flex flex-col items-start w-full gap-2">
                        <h2 className="font-semibold">체험 상품명</h2>
                        <p className="  text-pretty whitespace-pre-wrap text-sm indent-2">
                          {detail.title}
                        </p>
                      </div>
                      <div className="flex flex-col items-start w-full gap-2">
                        <h2 className="font-semibold">체험 상품설명</h2>
                        <p className="  text-pretty whitespace-pre-wrap text-sm indent-2">
                          {detail.description}
                        </p>
                      </div>
                      <div className="flex flex-col items-start w-full gap-2">
                        <h2 className="font-semibold">체험 상품과정</h2>
                        <p className="  text-pretty whitespace-pre-wrap text-sm indent-2">
                          {detail.howto}
                        </p>
                      </div>
                      <div className="flex flex-col items-start w-full gap-2">
                        <h2 className="font-semibold">우천시 교육여부</h2>
                        <p className="  text-pretty whitespace-pre-wrap text-sm indent-2">
                          {detail.farmInsideType ? "교육가능" : "교육불가능"}
                        </p>
                      </div>
                      <div className="flex flex-col items-start w-full gap-2">
                        <h2 className="font-semibold">체험 준비물</h2>
                        <div className="px-2 flex flex-col items-start gap-2 w-full">
                          <div className="flex flex-row items-center gap-1  ">
                            {detail.tools.map((item, index) => {
                              return (
                                <Badge key={index} variant={"outline"}>
                                  {item}
                                </Badge>
                              );
                            })}
                          </div>
                          <div className="w-full rounded-md border px-3 py-1 bg-neutral-100 ">
                            <p className="  text-pretty whitespace-pre-wrap text-sm flex flex-row items-center gap-2">
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
                          {detail.educationSubject.map((item, index) => {
                            return (
                              <Badge key={index} className="">
                                {item.tag}
                              </Badge>
                            );
                          })}
                        </div>
                      </div>
                      <div className="flex flex-row items-center gap-3"></div>
                    </div>
                  </div>
                </div>
                {/* <div className="p-3  flex flex-col items-start gap-3">
                  <div className="px-2">
                    <h1 className=" font-semibold">상세내용</h1>
                  </div>
                  <div className="border p-3 w-full rounded-md flex flex-col items-start gap-3 text-sm">
                    <div
                      className=""
                      dangerouslySetInnerHTML={{ __html: detail.detail }}
                    />
                  </div>
                </div> */}
                <div className="p-3   flex flex-col items-start gap-3">
                  <div className="px-2">
                    <h1 className=" font-semibold">요금정보</h1>
                  </div>
                  <div className="border p-3 w-full rounded-md flex flex-col items-start gap-3 text-sm">
                    <div className="flex flex-col gap-4 w-full">
                      <div className="flex flex-col items-start w-full gap-2">
                        <h2 className="font-semibold">요금 타입</h2>
                        {detail.priceType === "GROUP" ? (
                          <p className="  text-pretty whitespace-pre-wrap text-sm indent-2">
                            <span className="font-semibold text-primary mr-2">
                              그룹별
                            </span>
                            요금을 책정합니다.
                          </p>
                        ) : (
                          <p className="  text-pretty whitespace-pre-wrap text-sm indent-2">
                            <span className="font-semibold text-primary mr-2">
                              개인별
                            </span>
                            요금을 책정합니다.
                          </p>
                        )}
                      </div>
                      {detail.priceType === "PERSONAL" && (
                        <div className="flex flex-col items-start w-full gap-2">
                          <h2 className="font-semibold">개인 요금</h2>
                          <div className="flex flex-col items-start w-full gap-2 px-2">
                            {detail.personalPrice.map((item, index) => {
                              return (
                                <div
                                  key={index}
                                  className=" grid grid-cols-9 gap-2 bg-neutral-100  w-full px-2 py-2 border"
                                >
                                  <div className="flex flex-row items-center gap-3 col-span-3">
                                    <p>{item.startAge}세</p>
                                    <p>~</p>
                                    <p>{item.endAge}세</p>
                                  </div>
                                  <div className="flex flex-row items-center gap-3 col-span-6">
                                    <p>{item.isFree && "뮤료"}</p>
                                    <p>{item.message}</p>
                                  </div>
                                </div>
                              );
                            })}
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
                <div className="p-3  flex flex-col items-start gap-3">
                  <div className="px-2">
                    <h1 className=" font-semibold">취소 환불 정책</h1>
                  </div>
                  <div className="border p-6 w-full rounded-md flex flex-col items-start gap-3 text-sm">
                    <p className="  text-justify whitespace-pre-wrap text-sm">
                      {detail.farm.refundPolicy}
                    </p>
                  </div>
                </div>
              </TabsContent>
              {/* <TabsContent value="detail">
                <div className="p-3 border-b pb-12">
                  <div
                    className=""
                    dangerouslySetInnerHTML={{ __html: detail.detail }}
                  />
                </div>
              </TabsContent> */}

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
                        />
                        <div className="absolute z-20 bottom-0 left-0 p-6 text-white w-full">
                          <div className="flex flex-col items-start gap-1 w-full">
                            <p className="text-md w-full bg-transparent border-none text-white placeholder:text-white  p-0 outline-none m-0 space-y-0">
                              {detail.detail.titleDescription}
                            </p>
                            <p className="resize-none text-xl  whitespace-pre-wrap font-semibold w-full bg-transparent border-none text-white placeholder:text-white  p-0 outline-none m-0 space-y-0">
                              {detail.detail.title}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="w-full bg-white flex flex-col items-start px-3 gap-3 mt-9 ">
                        {detail.detail.sections.map((session, sessionIndex) => {
                          console.log("session", session);
                          return (
                            <div
                              key={sessionIndex}
                              className="w-full flex flex-col items-start gap-3 mb-6"
                            >
                              {session.subtitle && (
                                <div className="bg-primary px-3 py-1 rounded-[3px] flex flex-col items-start">
                                  <p className="text-sm  text-white ">
                                    {session.subtitle}
                                  </p>
                                </div>
                              )}
                              {session.title && (
                                <div className="flex flex-col items-start w-full">
                                  <p className="text-xl  whitespace-pre-wrap w-full font-semibold text-pretty">
                                    {session.title}
                                  </p>
                                </div>
                              )}
                              {session.titleDescription && (
                                <div className="flex flex-col items-start w-full">
                                  <p className="text-sm  whitespace-pre-wrap w-full text-pretty">
                                    {session.titleDescription}
                                  </p>
                                </div>
                              )}
                              {session.images.length > 0 && (
                                <div
                                  className={`w-full grid grid-cols-2  gap-2 `}
                                >
                                  {session.images.map((image, k) => {
                                    return (
                                      <div
                                        key={k}
                                        className={`${
                                          session.images.length > 2 && k === 0
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
                                        />
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="farm">
                <div className="p-3  flex flex-col items-start gap-3">
                  <div className="px-2">
                    <h1 className=" font-semibold">농장정보</h1>
                  </div>
                  <div className="border p-3 w-full rounded-md flex flex-col items-start gap-3 text-sm">
                    <div className="flex flex-col gap-4 w-full">
                      <div className="flex flex-col items-start w-full gap-2">
                        <h2 className="font-semibold">농장명</h2>
                        <p className="  text-pretty whitespace-pre-wrap text-sm indent-2">
                          {detail.farm.name}
                        </p>
                      </div>
                      {detail.farm.introduction && (
                        <div className="flex flex-col items-start w-full gap-2">
                          <h2 className="font-semibold">농장소개</h2>
                          <p className="  text-pretty whitespace-pre-wrap text-sm indent-2">
                            {detail.farm.introduction}
                          </p>
                        </div>
                      )}
                      <div className="flex flex-col items-start w-full gap-2">
                        <h2 className="font-semibold">농장주소</h2>
                        <p className="  text-pretty whitespace-pre-wrap text-sm indent-2">
                          {detail.farm.address}
                        </p>
                        <Button
                          size={"sm"}
                          variant={"outline"}
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
                          // onClick={() => {
                          //   console.log(detail.farm.lat, detail.farm.lang);
                          //   let url =
                          //   location.href = url;
                          //   window.Kakao.Navi.start({
                          //     name: detail.farm.name,
                          //     x: Number(detail.farm.lat),
                          //     y: Number(detail.farm.lang),
                          //     coordType: "wgs84",
                          //   });
                          // }}
                        >
                          <Link
                            target="_blank"
                            href={`https://map.kakao.com/link/map/${detail.farm.name},${detail.farm.lang},${detail.farm.lat}`}
                          >
                            카카오 길 안내
                          </Link>
                        </Button>
                        <Button asChild size={"sm"} variant={"outline"}>
                          <Link
                            target="_blank"
                            href={`https://map.naver.com?lng=${detail.farm.lat}&lat=${detail.farm.lang}&title=${detail.farm.name}`}
                          >
                            네이버 길 안내
                          </Link>
                        </Button>
                      </div>
                      <div className="w-full">
                        <Map address={detail.farm.address} />
                      </div>
                      <div className="flex flex-col items-start w-full gap-2">
                        <h2 className="font-semibold">농장 대표번호</h2>
                        <p className="  text-pretty whitespace-pre-wrap text-sm indent-2">
                          {detail.farm.mainPhone}
                        </p>
                      </div>
                      <div className="flex flex-col items-start w-full gap-2">
                        <h2 className="font-semibold">농장 예약관련문의</h2>
                        <p className="  text-pretty whitespace-pre-wrap text-sm indent-2">
                          {detail.farm.resevationPhone}
                        </p>
                      </div>
                      <div className="flex flex-col items-start w-full gap-2">
                        <h2 className="font-semibold">농장 생산물</h2>
                        <div className="flex flex-row items-center gap-2 flex-wrap w-full">
                          {detail.farm.farmItems.map((item, index) => {
                            return <Badge key={index}>{item}</Badge>;
                          })}
                        </div>
                      </div>
                      <div className="flex flex-col items-start w-full gap-2">
                        <h2 className="font-semibold">농장 시설</h2>
                        <div className="flex flex-row items-center gap-2 flex-wrap w-full">
                          {detail.farm.facilities.map((item, index) => {
                            return <Badge key={index}>{item}</Badge>;
                          })}
                        </div>
                      </div>
                      <div className="flex flex-col items-start w-full gap-2">
                        <h2 className="font-semibold">주차 시설</h2>
                        {detail.farm.parking === "fred" ? (
                          <p>무료</p>
                        ) : detail.farm.parking === "paid" ? (
                          <div className="flex flex-col items-start gap-2">
                            <Badge>유료</Badge>
                            <p>{detail.farm.parkinngFee}</p>
                          </div>
                        ) : (
                          <p>주차불가</p>
                        )}
                      </div>
                      <div className="flex flex-col items-start w-full gap-2">
                        <h2 className="font-semibold">애완동물 출입</h2>
                        {detail.farm.pet ? (
                          <Badge>출입가능</Badge>
                        ) : (
                          <Badge>출입불가</Badge>
                        )}
                      </div>
                      <div className="flex flex-col items-start w-full gap-2">
                        <h2 className="font-semibold">운영시간</h2>
                        {detail.farm.mondayOpen ? (
                          <div className="flex flex-row items-center gap-2 bg-neutral-100 w-full p-2">
                            <p>월요일 오픈</p>
                            <p>{detail.farm.mondayStart}부터</p>
                            <p>{detail.farm.mondayEnd}까지</p>
                          </div>
                        ) : (
                          <div className="flex flex-row items-center gap-2 bg-neutral-100 w-full p-2">
                            <p>월요일 휴무</p>
                          </div>
                        )}
                        {detail.farm.tuesdayOpen ? (
                          <div className="flex flex-row items-center gap-2 bg-neutral-100 w-full p-2">
                            <p>화요일 오픈</p>
                            <p>{detail.farm.tuesdayStart}부터</p>
                            <p>{detail.farm.tuesdayEnd}까지</p>
                          </div>
                        ) : (
                          <div className="flex flex-row items-center gap-2 bg-neutral-100 w-full p-2">
                            <p>화요일 휴무</p>
                          </div>
                        )}
                        {detail.farm.wednesdayOpen ? (
                          <div className="flex flex-row items-center gap-2 bg-neutral-100 w-full p-2">
                            <p>수요일 오픈</p>
                            <p>{detail.farm.wednesdayStart}부터</p>
                            <p>{detail.farm.wednesdayEnd}까지</p>
                          </div>
                        ) : (
                          <div className="flex flex-row items-center gap-2 bg-neutral-100 w-full p-2">
                            <p>수요일 휴무</p>
                          </div>
                        )}
                        {detail.farm.thursdayOpen ? (
                          <div className="flex flex-row items-center gap-2 bg-neutral-100 w-full p-2">
                            <p>목요일 오픈</p>
                            <p>{detail.farm.thursdayStart}부터</p>
                            <p>{detail.farm.thursdayEnd}까지</p>
                          </div>
                        ) : (
                          <div className="flex flex-row items-center gap-2 bg-neutral-100 w-full p-2">
                            <p>목요일 휴무</p>
                          </div>
                        )}
                        {detail.farm.fridayOpen ? (
                          <div className="flex flex-row items-center gap-2 bg-neutral-100 w-full p-2">
                            <p>금요일 오픈</p>
                            <p>{detail.farm.fridayStart}부터</p>
                            <p>{detail.farm.fridayEnd}까지</p>
                          </div>
                        ) : (
                          <div className="flex flex-row items-center gap-2 bg-neutral-100 w-full p-2">
                            <p>금요일 휴무</p>
                          </div>
                        )}
                        {detail.farm.saturdayOpen ? (
                          <div className="flex flex-row items-center gap-2 bg-neutral-100 w-full p-2">
                            <p>토요일 오픈</p>
                            <p>{detail.farm.saturdayStart}부터</p>
                            <p>{detail.farm.saturdayEnd}까지</p>
                          </div>
                        ) : (
                          <div className="flex flex-row items-center gap-2 bg-neutral-100 w-full p-2">
                            <p>토요일 휴무</p>
                          </div>
                        )}
                        {detail.farm.sundayOpen ? (
                          <div className="flex flex-row items-center gap-2 bg-neutral-100 w-full p-2">
                            <p>일요일 오픈</p>
                            <p>{detail.farm.sundayStart}부터</p>
                            <p>{detail.farm.sundayEnd}까지</p>
                          </div>
                        ) : (
                          <div className="flex flex-row items-center gap-2 bg-neutral-100 w-full p-2">
                            <p>일요일 휴무</p>
                          </div>
                        )}
                        {detail.farm.holidayOpen ? (
                          <div className="flex flex-row items-center gap-2 bg-neutral-100 w-full p-2">
                            <p>공휴일 오픈</p>
                            <p>{detail.farm.holidayStart}부터</p>
                            <p>{detail.farm.holidayEnd}까지</p>
                          </div>
                        ) : (
                          <div className="flex flex-row items-center gap-2 bg-neutral-100 w-full p-2">
                            <p>공휴일 휴무</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              {/* <TabsContent value="refund" className="w-full ">
                <div className="p-6 border-b pb-12">
                  <p className=" whitespace-pre-wrap text-sm   text-justify">
                    {detail.farm.refundPolicy}
                  </p>
                </div>
              </TabsContent> */}
            </Tabs>
          </div>
          <div className=" fixed bottom-0 left-0 w-full bg-white border-t col-span-12 px-6">
            <div className="w-full p-3 flex flex-row items-center  justify-between">
              <div>
                <p>{detail.title}</p>
                <p className="text-neutral-500 text-sm">{detail.farm.name}</p>
              </div>
              <Button asChild>
                <Link href={`${params.productId}/reservation`}>예약하기</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
      <>
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.1/kakao.min.js"
          integrity="sha384-kDljxUXHaJ9xAb2AzRd59KxjrFjzHa5TAoFQ6GbYTCAG0bjM55XohjjDT7tDDC01"
          crossOrigin="anonymous"
          onLoad={() => {
            console.log(process.env.NEXT_PUBLIC_KAKAO_MAP_KEY);
            window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_MAP_KEY);
          }}
        />
      </>
    </div>
  );
}
