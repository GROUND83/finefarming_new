import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import { getProductDetail } from "./_component/actions";
import { Button } from "@/components/ui/button";
import { ExclamationCircleIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Rating, ThinStar, RoundedStar } from "@smastrom/react-rating";
import { ProductTitleWrap } from "../_components/ProductTitleWrap";
import Map from "@/components/map";
import type { Metadata, ResolvingMetadata } from "next";
import ImageSlider from "@/components/imageSlider";
import AddressCopy from "../_components/addressCopy";
import EventWrap from "../_components/eventWrap";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { empty_avatar_url } from "@/lib/constants";
import dayjs from "dayjs";
//
import "@smastrom/react-rating/style.css";
const myStyles = {
  itemShapes: RoundedStar,
  activeFillColor: "#17A34A",
  inactiveFillColor: "#AAF3C4",
};
async function getProductsDetailData(productId: number) {
  //
  //   await new Promise((resolve) => setTimeout(resolve, 10000));
  let result: any = await getProductDetail(productId);
  let newImage = [...result.images];

  if (result.mainImage) {
    let images = [result.mainImage, ...newImage];
    // console.log("images", images);

    return {
      result: result,
      images: images,
      event: result.event.length > 0 ? result.event[0] : "",
    };
  } else {
    return {
      result: result,
      images: newImage,
      event: result.event.length > 0 ? result.event[0] : "",
    };
  }
}
type Props = {
  params: { productId: string };
};
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params

  // fetch data
  const { result, images } = await getProductsDetailData(
    Number(params.productId)
  );
  // console.log("result", result);
  return {
    metadataBase: new URL("https://www.finefarming.co.kr"),
    alternates: {
      canonical: `/product/${params.productId}`,
    },
    title: `${result?.title} - 파인파밍`,
    description: result.description,
    keywords: result?.keywords,
    openGraph: {
      title: result?.title,
      url: `https://www.finefarming.co.kr/product/${result?.id!}`,
      siteName: "파인파밍",
      images: [
        {
          url: result?.detail?.image ? result?.detail.image : result.mainImage, // Must be an absolute URL
          width: 800,
          height: 600,
        },
      ],
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function Page({
  params,
}: {
  params: { productId: string };
}) {
  const { result, images, event } = await getProductsDetailData(
    Number(params.productId)
  );
  if (!result) {
    return notFound();
  }
  //
  console.log("resultdetail", result.detail);

  return (
    <article className="w-full bg-white  ">
      {result && (
        <div className="container mx-auto flex-col items-start grid grid-cols-12 gap-3">
          {images.length > 0 && <ImageSlider images={images} />}
          {/* {event && (
            <EventWrap event={event} />
          
          )} */}
          <section className="col-span-12 bg-white">
            <ProductTitleWrap
              productId={result.id}
              title={result.title}
              description={result.description}
              educationSubject={result.educationSubject}
              showSubMenu={true}
            />
          </section>

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
                <TabsTrigger value="reviews" className="">
                  <div className="flex flex-row items-center gap-2">
                    <p className="text-sm lg:text-lg">체험 후기</p>
                    <p className=" font-normal">{result.reviews.length}</p>
                  </div>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="product">
                <section className="p-3  flex flex-col items-start gap-3">
                  <div className=" p-3 w-full flex flex-col items-start gap-3 text-sm">
                    <div className="flex flex-col gap-4 w-full">
                      {result.farmInsideType && (
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
                            {result.tools.map((item: any, index: any) => {
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
                              {result.cloth}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-start w-full gap-2">
                        <h2 className="font-semibold">교육정보</h2>
                        <div className="w-full px-2 flex flex-col items-start gap-2">
                          <p className="  text-pretty whitespace-pre-wrap text-sm ">
                            {result.educationTitle}
                          </p>

                          {result.educationData ? (
                            <Badge variant={"outline"}>자료제공</Badge>
                          ) : (
                            <Badge variant={"outline"}>자료미제공</Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-start w-full gap-2">
                        <h2 className="font-semibold">교육주제</h2>
                        <div className="w-full px-2 flex flex-row items-center flex-wrap gap-1">
                          {result.educationSubject.map(
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
                </section>

                <section className="p-3   flex flex-col items-start gap-3">
                  <div className="px-2">
                    <h1 className=" font-semibold">요금정보</h1>
                  </div>
                  <div className=" p-3 w-full flex flex-col items-start gap-3 text-sm">
                    <div className="flex flex-col gap-4 w-full">
                      <div className="flex flex-col items-start w-full gap-2">
                        {result.priceType === "GROUP" ? (
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
                      {result.priceType === "PERSONAL" && (
                        <div className="flex flex-col items-start w-full gap-2">
                          <div className="flex flex-col items-start w-full gap-2 ">
                            {result.personalPrice.map(
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
                      {result.priceType === "GROUP" && (
                        <div className="flex flex-col items-start w-full gap-2">
                          <h2 className="font-semibold">그룹 요금</h2>
                          <div className="flex flex-col items-start w-full gap-2 px-2">
                            <div className=" grid grid-cols-9 gap-2 bg-neutral-100  w-full px-2 py-2 border">
                              <div className="flex flex-row items-center gap-3 col-span-3">
                                <p>그룹 제한</p>

                                <p>{result.groupLimit}명</p>
                              </div>
                              <div className="flex flex-row items-center gap-3 col-span-6">
                                <p>그룹 요금</p>
                                <p>{result.groupPrice.toLocaleString()}원</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </section>
                <section className="p-3  flex flex-col items-start gap-3 bg-neutral-800">
                  <div className="px-2">
                    <h1 className=" font-semibold text-white">
                      취소 환불 정책
                    </h1>
                  </div>
                  <div className=" p-3 w-full  flex flex-col items-start gap-3 text-sm">
                    <p className="  text-justify whitespace-pre-wrap text-sm text-neutral-500">
                      {result.farm.refundPolicy}
                    </p>
                  </div>
                </section>
              </TabsContent>

              <TabsContent value="detail">
                <div className="w-full bg-white flex flex-col items-start gap-2 pb-3 px-2">
                  {result.detail && (
                    <>
                      <section className="w-full h-[480px]   rounded-b-2xl bg-gradient-to-t from-primary relative overflow-hidden bg-white ">
                        <div className="w-full h-full bg-gradient-to-t from-[#063824] to-from-[#063824] to-55%  z-10 absolute"></div>
                        <Image
                          src={result.detail.image}
                          alt={result.detail.title}
                          priority
                          width={200}
                          height={200}
                          className="object-cover w-full  h-[480px]"
                        />
                        <div className="absolute z-20 bottom-0 left-0 p-6 text-white w-full">
                          <div className="flex flex-col items-start gap-1 w-full">
                            <p className="text-md lg:text-lg w-full bg-transparent border-none text-white placeholder:text-white  p-0 outline-none m-0 space-y-0">
                              {result.detail.titleDescription}
                            </p>
                            <p className="resize-none text-xl lg:text-3xl  whitespace-pre-wrap font-semibold w-full bg-transparent border-none text-white placeholder:text-white  p-0 outline-none m-0 space-y-0">
                              {result.detail.title}
                            </p>
                          </div>
                        </div>
                      </section>
                      <div className="w-full bg-white flex flex-col items-start px-3 gap-3 mt-9 ">
                        {result.detail.sections.map(
                          (session: any, sessionIndex: any) => {
                            // console.log("session", session);
                            return (
                              <section
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
                                        // console.log("image", image.image);
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
                                              src={image.image}
                                              width={200}
                                              height={200}
                                              className={`object-cover ${
                                                session.images.length > 2 &&
                                                k === 0
                                                  ? "  aspect-square relative"
                                                  : session.images.length > 2 &&
                                                    k === 0
                                                  ? "  aspect-square relative"
                                                  : session.images.length > 1 &&
                                                    k === 0
                                                  ? "  aspect-square relative"
                                                  : session.images.length > 1 &&
                                                    k !== 0
                                                  ? "  aspect-square relative"
                                                  : session.images.length ===
                                                      1 && k !== 0
                                                  ? "  aspect-[4/3] relative"
                                                  : session.images.length ===
                                                      1 && k === 0
                                                  ? "   aspect-square relative"
                                                  : "  aspect-square relative"
                                              } w-full`}
                                              alt={`image${k}`}
                                            />
                                          </div>
                                        );
                                      }
                                    )}
                                  </div>
                                )}
                              </section>
                            );
                          }
                        )}
                      </div>
                      <section className="w-full bg-white flex flex-col items-start px-3 gap-3 mt-9 ">
                        {result.process.length > 0 && (
                          <div className="w-full flex flex-col items-start gap-2">
                            <p className="text-lg font-semibold">
                              체험 진행 순서
                            </p>
                            {result.process.map(
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
                            <p className="text-sm">{result.processNotice}</p>
                          </div>
                        </div>
                      </section>
                    </>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="farm">
                <div className="p-3  flex flex-col items-start gap-3">
                  <div className=" p-3 w-full flex flex-col items-start gap-3 text-sm">
                    <div className="flex flex-col gap-4 w-full">
                      <section className="flex flex-col items-start w-full ">
                        <h1 className="text-pretty whitespace-pre-wrap text-lg lg:text-2xl font-semibold">
                          {result.farm.name}
                        </h1>
                      </section>
                      {result.farm.introduction && (
                        <section className="flex flex-col items-start w-full gap-2">
                          <p className=" text-pretty whitespace-pre-wrap text-sm  lg:text-lg">
                            {result.farm.introduction}
                          </p>
                        </section>
                      )}
                      <div className="flex flex-col items-start gap-1 text-sm lg:text-base">
                        <section className="flex flex-row items-center w-full gap-2 border p-3 justify-between ">
                          <div className="flex flex-row items-center gap-1">
                            <p>대표번호</p>
                          </div>
                          <div className="flex flex-row items-center gap-1">
                            <p className="text-md font-semibold">
                              {result.farm.mainPhone}
                            </p>
                          </div>
                        </section>
                        <section className="flex flex-row items-center w-full gap-2 border p-3 justify-between ">
                          <div>
                            <p>예약관련문의</p>
                          </div>
                          <div className="flex flex-row items-center gap-1">
                            <p className="text-md font-semibold">
                              {result.farm.resevationPhone}
                            </p>
                          </div>
                        </section>
                        <section className="flex flex-row items-center w-full gap-2 border p-3 justify-between ">
                          <div>
                            <p>체험품종</p>
                          </div>
                          <div className="flex flex-row items-center gap-1">
                            {result.farm.farmItems.map(
                              (item: any, index: any) => {
                                return <Badge key={index}>{item}</Badge>;
                              }
                            )}
                          </div>
                        </section>
                        <section className="flex flex-row items-center w-full gap-2 border p-3 justify-between ">
                          <div>
                            <p>시설</p>
                          </div>
                          <div className="flex flex-row items-center gap-2 flex-wrap">
                            {result.farm.facilities.map(
                              (item: any, index: any) => {
                                return <Badge key={index}>{item}</Badge>;
                              }
                            )}
                          </div>
                        </section>
                        {result.farm.parking !== "noPark" && (
                          <section className="flex flex-row items-center w-full gap-2 border p-3 justify-between ">
                            <h2 className=" lg:text-base text-sm">주차 시설</h2>
                            {result.farm.parking === "free" ? (
                              <p>무료</p>
                            ) : result.farm.parking === "paid" ? (
                              <div className="flex flex-col items-start gap-2">
                                <Badge>유료</Badge>
                                <p>{result.farm.parkinngFee}</p>
                              </div>
                            ) : null}
                          </section>
                        )}
                      </div>

                      {result.farm.pet && (
                        <section className="flex flex-col items-start w-full gap-2">
                          <h2 className="text-sm lg:text-base">
                            애완동물 출입
                          </h2>

                          <Badge>출입가능</Badge>
                        </section>
                      )}
                      <section className="flex flex-col items-start w-full gap-2">
                        <h2 className="font-semibold">운영시간</h2>
                        {result.farm.mondayOpen && (
                          <div className="flex flex-row items-center gap-2 bg-neutral-100 w-full p-2 border">
                            <p>월요일 </p>
                            <p>{result.farm.mondayStart}부터</p>
                            <p>{result.farm.mondayEnd}까지</p>
                          </div>
                        )}
                        {result.farm.tuesdayOpen && (
                          <div className="flex flex-row items-center gap-2 bg-neutral-100 w-full p-2 border">
                            <p>화요일 </p>
                            <p>{result.farm.tuesdayStart}부터</p>
                            <p>{result.farm.tuesdayEnd}까지</p>
                          </div>
                        )}
                        {result.farm.wednesdayOpen && (
                          <div className="flex flex-row items-center gap-2 bg-neutral-100 w-full p-2 border">
                            <p>수요일 </p>
                            <p>{result.farm.wednesdayStart}부터</p>
                            <p>{result.farm.wednesdayEnd}까지</p>
                          </div>
                        )}
                        {result.farm.thursdayOpen && (
                          <div className="flex flex-row items-center gap-2 bg-neutral-100 w-full p-2 border">
                            <p>목요일 </p>
                            <p>{result.farm.thursdayStart}부터</p>
                            <p>{result.farm.thursdayEnd}까지</p>
                          </div>
                        )}
                        {result.farm.fridayOpen && (
                          <div className="flex flex-row items-center gap-2 bg-neutral-100 w-full p-2 border">
                            <p>금요일 </p>
                            <p>{result.farm.fridayStart}부터</p>
                            <p>{result.farm.fridayEnd}까지</p>
                          </div>
                        )}
                        {result.farm.saturdayOpen && (
                          <div className="flex flex-row items-center gap-2 bg-neutral-100 w-full p-2 border">
                            <p>토요일 </p>
                            <p>{result.farm.saturdayStart}부터</p>
                            <p>{result.farm.saturdayEnd}까지</p>
                          </div>
                        )}
                        {result.farm.sundayOpen && (
                          <div className="flex flex-row items-center gap-2 bg-neutral-100 w-full p-2 border">
                            <p>일요일 </p>
                            <p>{result.farm.sundayStart}부터</p>
                            <p>{result.farm.sundayEnd}까지</p>
                          </div>
                        )}
                        {result.farm.holidayOpen && (
                          <div className="flex flex-row items-center gap-2 bg-neutral-100 w-full p-2 border">
                            <p>공휴일 </p>
                            <p>{result.farm.holidayStart}부터</p>
                            <p>{result.farm.holidayEnd}까지</p>
                          </div>
                        )}
                      </section>
                      <section className="flex flex-col items-start w-full gap-2">
                        <p className="  text-pretty whitespace-pre-wrap text-sm">
                          {result.farm.address}
                        </p>
                        <div className="flex flex-row items-center gap-4 mt-3">
                          <AddressCopy address={result.farm.address} />

                          <Button
                            asChild
                            size={"sm"}
                            variant={"outline"}
                            className="bg-[#FFE500] text-sm"
                          >
                            <Link
                              target="_blank"
                              href={`https://map.kakao.com/link/map/${result.farm.name},${result.farm.lang},${result.farm.lat}`}
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
                              href={`https://map.naver.com?lng=${result.farm.lat}&lat=${result.farm.lang}&title=${result.farm.name}`}
                            >
                              네이버 길 안내
                            </Link>
                          </Button>
                        </div>
                      </section>
                      <section className="w-full">
                        <Map address={result.farm.address} />
                      </section>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="reviews">
                <div className="p-3  flex flex-col items-start gap-3">
                  <div className=" p-3 w-full flex flex-col items-start gap-3 text-sm">
                    <div className="flex flex-col gap-4 w-full">
                      <div className="flex flex-col items-start gap-1 text-sm ">
                        {result.reviews.length > 0 ? (
                          <>
                            {result.reviews.map((review: any, index: any) => {
                              return (
                                <Link
                                  href={`/product/${params.productId}/reviews`}
                                  className=" flex flex-row items-center gap-3 border p-3 w-full rounded-md"
                                  key={index}
                                >
                                  <div className="flex flex-col items-start flex-1 gap-1">
                                    <div className="flex flex-row items-center gap-2 text-neutral-500">
                                      {review.user.username.length > 2 ? (
                                        <p>
                                          {review.user.username.slice(0, 1) +
                                            "0" +
                                            review.user.username.slice(2, 3)}
                                        </p>
                                      ) : (
                                        <p>
                                          {review.user.username.slice(0, 1) +
                                            "0"}
                                        </p>
                                      )}
                                      <p>
                                        {dayjs(review.created_at).format(
                                          "YYYY-MM-DD"
                                        )}
                                      </p>
                                    </div>
                                    <div>
                                      <Rating
                                        readOnly
                                        value={review.point}
                                        // onChange={onChange}
                                        style={{ width: 120, height: 20 }}
                                        itemStyles={myStyles}
                                        // className="flex flex-row items-center"
                                      />
                                    </div>
                                    <div>
                                      <p className=" whitespace-pre-wrap line-clamp-3  ">
                                        {review.title}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="w-[100px]  aspect-square relative">
                                    <Image
                                      src={review.image}
                                      width={100}
                                      height={100}
                                      alt={`review-${index}`}
                                      className=" object-cover w-full aspect-square"
                                    />
                                  </div>
                                </Link>
                              );
                            })}
                          </>
                        ) : (
                          <div className="flex w-full flex-col items-center justify-center text-neutral-500 h-[500px]">
                            <p>체험 후기가 아직 없습니다.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <section className=" fixed bottom-0 container mx-auto bg-white border col-span-12 px-6 z-50">
            {result.status === "POSSIBLE" && (
              <div className="w-full p-3 flex flex-row items-center  justify-between">
                <div>
                  <p>{result.title}</p>
                  <p className="text-neutral-500 text-sm">{result.farm.name}</p>
                </div>
                <Button asChild>
                  <Link href={`/reservation/new/${params.productId}`}>
                    예약하기
                  </Link>
                </Button>
              </div>
            )}
            {result.status === "FINISHED" && (
              <div className="w-full p-3 flex flex-row items-center  justify-center">
                <p>예약이 불가 합니다.</p>
              </div>
            )}
            {result.status === "TESTING" && (
              <div className="w-full p-3 flex flex-row items-center  justify-center">
                <p>예약이 불가 합니다.</p>
              </div>
            )}
          </section>
        </div>
      )}
    </article>
  );
}
