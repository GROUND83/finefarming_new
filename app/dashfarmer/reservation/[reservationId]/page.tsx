"use client";
import { Badge } from "@/components/ui/badge";

import React from "react";
import { getReservationDetail } from "./_components/actions";
import moment from "moment";

import Cancle from "./_components/cancle";
import Complete from "./_components/complete";
import NoShow from "./_components/noshow";
import VisitDone from "./_components/visitdone";

export default function Page({
  params,
}: {
  params: { reservationId: string };
}) {
  const [detail, setDetail] = React.useState<any>();
  const [product, setProduct] = React.useState<any>();
  //
  const getData = async () => {
    let result = await getReservationDetail(Number(params.reservationId));
    console.log("result", result);
    setDetail(result.reservation);
    setProduct(result.product);
  };
  React.useEffect(() => {
    //
    getData();
  }, [params.reservationId]);

  return (
    <div className="w-full  h-full">
      {detail && (
        <div className="flex flex-col items-start w-full gap-3  relative">
          <div className="flex bg-white  border-b px-6 py-3 fixed h-[70px]  w-[calc(100vw-180px)]">
            <div className="flex flex-row items-center gap-3 w-full">
              <p className="font-bold text-lg">{detail.reservationNumber}</p>
              {detail.status === "waiting" && (
                <Badge variant={"waiting"} className="text-xs space-y-0">
                  확정대기
                </Badge>
              )}
              {detail.status === "complete" && (
                <Badge variant={"complete"} className="text-xs space-y-0">
                  예약확정
                </Badge>
              )}
              {detail.status === "done" && (
                <Badge variant={"done"} className="text-xs space-y-0">
                  방문완료
                </Badge>
              )}
              {detail.status === "cancle" && (
                <Badge variant={"cancel"} className="text-xs space-y-0">
                  취소
                </Badge>
              )}
              {detail.status === "managercancle" && (
                <Badge variant={"cancel"} className="text-xs space-y-0">
                  매니저 취소
                </Badge>
              )}
              {detail.status === "noshow" && (
                <Badge variant={"noshow"} className="text-xs space-y-0">
                  노쇼
                </Badge>
              )}
            </div>
            <div className="flex flex-row items-center gap-3">
              {detail.status === "waiting" && (
                <>
                  <Cancle
                    getData={getData}
                    reservationId={Number(params.reservationId)}
                  />
                  <Complete
                    getData={getData}
                    reservationId={Number(params.reservationId)}
                  />
                </>
              )}
              {detail.status === "complete" && (
                <>
                  <NoShow
                    getData={getData}
                    reservationId={Number(params.reservationId)}
                  />
                  <VisitDone
                    getData={getData}
                    reservationId={Number(params.reservationId)}
                  />
                </>
              )}
            </div>
          </div>
          <div className="flex w-full p-3 flex-col mt-[70px]">
            <div className="border rounded-md p-6 bg-white">
              <div className=" grid grid-cols-12  gap-2 w-full  border-b py-6 ">
                <div className=" col-span-3">
                  <p className=" font-semibold">농장 정보</p>
                </div>
                <div className=" col-span-9 grid grid-cols-12 gap-3 text-sm">
                  <div className=" col-span-6 flex flex-col gap-1">
                    <p className=" font-semibold">농장 이름</p>
                    <p className="text-neutral-500">{detail.farm.name}</p>
                  </div>
                  <div className=" col-span-6 flex flex-col gap-1">
                    <p className=" font-semibold">농장 주소</p>
                    <p className="text-neutral-500">{detail.farm.address}</p>
                  </div>
                  <div className=" col-span-6 flex flex-col gap-1">
                    <p className=" font-semibold">농장주 이름</p>
                    <p className="text-neutral-500">
                      {detail.farm.owner.username}
                    </p>
                  </div>
                  <div className=" col-span-6 flex flex-col gap-1">
                    <p className=" font-semibold">대표번호</p>
                    <p className="text-neutral-500">{detail.farm.mainPhone}</p>
                  </div>
                  <div className=" col-span-6 flex flex-col gap-1">
                    <p className=" font-semibold">예약 담당자</p>
                    <p className="text-neutral-500">
                      {detail.farm.resevationManager}
                    </p>
                  </div>
                  <div className=" col-span-6 flex flex-col gap-1">
                    <p className=" font-semibold">예약 담당자 연락처</p>
                    <p className="text-neutral-500">
                      {detail.farm.resevationPhone}
                    </p>
                  </div>
                </div>
              </div>
              <div className=" grid grid-cols-12  gap-2 w-full  border-b py-6 ">
                <div className=" col-span-3">
                  <p className=" font-semibold">체험상품 정보</p>
                </div>
                <div className=" col-span-9 grid grid-cols-12 gap-3 text-sm">
                  <div className=" col-span-6 flex flex-col gap-1">
                    <p className=" font-semibold">기본 상품명</p>
                    <p className="text-neutral-500">{product.title}</p>
                  </div>

                  <div className=" col-span-6 flex flex-col gap-1">
                    <p className=" font-semibold">필수상품</p>
                    <div className="text-neutral-500">
                      {product.subProduct.map((item: any, index: any) => {
                        return (
                          <div
                            key={index}
                            className="flex flex-col items-start gap-2"
                          >
                            <p>{item.title}</p>
                            {item.selectProducts.length > 0 && (
                              <div>
                                <p>옵션상품</p>
                                {item.selectProducts.map(
                                  (sub: any, subIndex: any) => {
                                    return (
                                      <div key={subIndex}>
                                        <p>{sub.title}</p>
                                      </div>
                                    );
                                  }
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className=" grid grid-cols-12  gap-2 w-full  border-b py-6 ">
                <div className=" col-span-3">
                  <p className=" font-semibold">예약 정보</p>
                </div>
                <div className=" col-span-9 grid grid-cols-12 gap-3 text-sm">
                  <div className=" col-span-6 flex flex-col gap-1">
                    <p className=" font-semibold">예약 번호</p>
                    <p className="text-neutral-500">
                      {detail.reservationNumber}
                    </p>
                  </div>
                  <div className=" col-span-6 flex flex-col gap-1">
                    <p className=" font-semibold">일정</p>
                    <p className="text-neutral-500">
                      {moment(detail.checkInDate).format("YYYY년 MM월 DD일")} /{" "}
                      {detail.checkInTime}시
                    </p>
                  </div>
                  <div className=" col-span-6 flex flex-col gap-1">
                    <p className=" font-semibold">인원</p>
                    <div className="text-neutral-500">
                      {detail.personalPrice.map((item: any, index: any) => {
                        return (
                          <div
                            key={index}
                            className="flex flex-row items-center gap-2"
                          >
                            <p>{item.startAge}세</p>
                            <p>~</p>
                            <p>{item.endAge}세</p>
                            <p>{item.amount}명</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className=" grid grid-cols-12  gap-2 w-full  border-b py-6 ">
                <div className=" col-span-3">
                  <p className=" font-semibold">예약자 정보</p>
                </div>
                <div className=" col-span-9 grid grid-cols-12 gap-3 text-sm">
                  <div className=" col-span-6 flex flex-col gap-1">
                    <p className=" font-semibold">예약자 이름</p>
                    <p className="text-neutral-500">{detail.user.username}</p>
                  </div>
                  <div className=" col-span-6 flex flex-col gap-1">
                    <p className=" font-semibold">예약자 ID</p>
                    <p className="text-neutral-500">{detail.user.email}</p>
                  </div>
                  <div className=" col-span-6 flex flex-col gap-1">
                    <p className=" font-semibold">방문자 대표</p>
                    <p className="text-neutral-500">{detail.visitor}</p>
                  </div>
                  <div className=" col-span-6 flex flex-col gap-1">
                    <p className=" font-semibold">연락처</p>
                    <p className="text-neutral-500">{detail.visitorPhone}</p>
                  </div>
                </div>
              </div>
              <div className=" grid grid-cols-12  gap-2 w-full  border-b py-6 ">
                <div className=" col-span-3">
                  <p className=" font-semibold">결제 예정 정보</p>
                </div>
                <div className=" col-span-9 grid grid-cols-12 gap-3 text-sm">
                  <div className=" col-span-12 flex flex-col gap-1">
                    <p className=" font-semibold">결제 예정 총액</p>
                    <p className="text-neutral-500">
                      {detail.totalprice.toLocaleString()}원
                    </p>
                  </div>
                  {detail.priceType === "PERSONAL" && (
                    <div className=" col-span-6 flex flex-col gap-2 items-start">
                      <Badge>개인별</Badge>
                      {detail.personalPrice.map((item: any, index: any) => {
                        return (
                          <div
                            key={index}
                            className="flex flex-row items-center gap-3 text-neutral-500 w-full justify-between px-3 border py-1"
                          >
                            <div className="flex flex-row  items-center gap-1">
                              <p>{item.startAge}세</p>
                              <p>~</p>
                              <p>{item.endAge} 세</p>
                              <p>{item.amount} 명</p>
                              <p>{item.price} 원</p>
                            </div>
                            <p>
                              총 {Number(item.amount) * Number(item.price)} 원
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {detail.subProduct.length > 0 && (
                    <div className=" col-span-6 flex flex-col gap-1">
                      <p className=" font-semibold">옵션</p>
                      <div>
                        {detail.subProduct.map(
                          (subProduct: any, subProductIndex: any) => {
                            return (
                              <div
                                key={subProductIndex}
                                className="flex flex-col items-start border px-3 py-2 gap-2"
                              >
                                <div className="flex flex-col items-start w-full gap-2  ">
                                  <div className="flex-1 flex flex-row  items-center gap-2">
                                    <p>필수</p>
                                    <p className="text-neutral-500">
                                      {subProduct.title}
                                    </p>
                                    <p className="text-neutral-500">
                                      {subProduct.price.toLocaleString()}원
                                    </p>
                                  </div>
                                  {subProduct.selectProducts.length > 0 && (
                                    <div className="flex-1 flex flex-row items-center gap-2">
                                      <p>추가</p>
                                      <div className="flex flex-row items-center gap-2">
                                        {subProduct.selectProducts.map(
                                          (
                                            selectProducts: any,
                                            selectProductsIndex: any
                                          ) => {
                                            return (
                                              <div
                                                key={selectProductsIndex}
                                                className="flex flex-row items-center gap-2 "
                                              >
                                                <p className="text-neutral-500">
                                                  {selectProducts.title}
                                                </p>
                                                <p className="text-neutral-500">
                                                  {selectProducts.amount}개
                                                </p>
                                                <p className="text-neutral-500">
                                                  {Number(
                                                    selectProducts.amount *
                                                      selectProducts.price
                                                  ).toLocaleString()}
                                                  원
                                                </p>
                                              </div>
                                            );
                                          }
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className=" grid grid-cols-12  gap-2 w-full   py-6 ">
                <div className=" col-span-3">
                  <p className=" font-semibold">취소 및 환불정보</p>
                </div>
                <div className=" col-span-9 grid grid-cols-12 gap-3 text-sm">
                  <div className="  col-span-12 ">
                    <p className="text-neutral-500 text-sm whitespace-pre text-pretty">
                      {detail.farm.refundPolicy}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
