"use client";

// import getSession from "@/lib/session";
import { notFound, useRouter } from "next/navigation";
import React from "react";
import { getReservationDetail } from "./_components/actions";
import Image from "next/image";
import moment from "moment";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getSession } from "next-auth/react";
import { Badge } from "@/components/ui/badge";

// async function getIsOwner(authorId: number) {
//   const session = await getSession();
//   if (session.id) {
//     return session.id === authorId;
//   }
//   return false;
// }

export default function Page({
  params,
}: {
  params: { reservationId: string };
}) {
  const [reservationDetail, setReservationDetail] = React.useState<any>();
  const [product, setProduct] = React.useState<any>();
  const [isBefore, setIsBefore] = React.useState(false);
  const router = useRouter();

  const getProductsDetailData = async () => {
    //
    const reservationId = Number(params.reservationId);
    if (isNaN(reservationId)) {
      return notFound();
    }
    let result: any = await getReservationDetail(reservationId);
    let newDate = JSON.parse(result);
    console.log("result", newDate);
    let userSession = await getSession();
    console.log("userSession", userSession);
    if (newDate && userSession) {
      if (newDate?.reservation.userId !== userSession?.user.id) {
        return router.push("/");
      }
    }
    setReservationDetail(newDate.reservation);
    setProduct(newDate.product);
    let min = newDate.product.farm.reservationMin;
    let today = moment().format("YYYY-MM-DD");
    let reservationData = moment(newDate.reservation.checkInDate)
      .subtract(min, "day")
      .format("YYYY-MM-DD");
    console.log(
      min,
      today,

      reservationData,
      moment(today).isBefore(reservationData)
    );
    let isBeforday = moment(today).isBefore(reservationData);
    // setDetail(result);
    setIsBefore(isBeforday);
  };

  //
  React.useEffect(() => {
    if (params.reservationId) {
      getProductsDetailData();
    }
  }, [params.reservationId]);

  return (
    <div className="w-full bg-neutral-100 h-full">
      {reservationDetail && (
        <div className="w-full     grid grid-cols-12 pb-24 relative ">
          <div className=" col-span-12 bg-primary p-3">
            <p className="text-lg text-white font-semibold">예약 내용</p>
          </div>
          <div className=" col-span-12">
            {/* <div className="w-full relative aspect-video">
              <Image src={product.mainImage} fill alt={product.title} />
            </div> */}
            <div className="p-6 flex flex-col items-start gap-3 w-full bg-white border-b">
              <div>
                <p className=" font-semibold text-lg">{product.title}</p>
                <p className="text-neutral-500">{product.description}</p>
              </div>
            </div>
            <div className="p-6 grid grid-cols-12  gap-2 w-full bg-white border-b mt-1">
              <div className=" col-span-3">
                <p>예약번호</p>
              </div>
              <div className=" col-span-9">
                <p>{reservationDetail.reservationNumber}</p>
              </div>
              <div className=" col-span-3">
                <p>방문일</p>
              </div>
              <div className=" col-span-9">
                <p>
                  {moment(reservationDetail.checkInDate).format(
                    "YYYY년 MM월 DD일"
                  )}
                </p>
              </div>
              {reservationDetail.priceType === "PERSONAL" && (
                <>
                  <div className=" col-span-3">
                    <p>인원</p>
                  </div>
                  <div className=" col-span-9">
                    {reservationDetail.personalPrice.map(
                      (item: any, index: any) => {
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
                      }
                    )}
                  </div>
                </>
              )}
              <div className=" col-span-3">
                <p>예약상태</p>
              </div>
              <div className=" col-span-9">
                {reservationDetail.status === "waiting" && (
                  <div className="flex flex-col items-start gap-2">
                    <Badge className="text-sm">확정대기</Badge>

                    <p className="text-sm">
                      예약확정 시 등록된 이메일로 알림 발송합니다.
                    </p>
                  </div>
                )}
                {reservationDetail.status === "complete" && (
                  <Badge className="text-sm">예약확정</Badge>
                )}
                {reservationDetail.status === "cancle" && (
                  <Badge className="text-sm">취소</Badge>
                )}
                {reservationDetail.status === "done" && (
                  <Badge className="text-sm">방문완료</Badge>
                )}
                {reservationDetail.status === "noshow" && (
                  <Badge className="text-sm">취소</Badge>
                )}
              </div>
            </div>
            <div className="p-6 grid grid-cols-12  gap-1 w-full bg-white border-b mt-1">
              <div className=" col-span-12">
                <p className="font-semibold">예약자 정보</p>
              </div>
              <div className=" col-span-3">
                <p>예약자</p>
              </div>
              <div className=" col-span-9">
                <p>{reservationDetail.user.username}</p>
              </div>
              <div className=" col-span-3">
                <p>연락처</p>
              </div>
              <div className=" col-span-9">
                <p>{reservationDetail.user.phone}</p>
              </div>
              <div className=" col-span-3">
                <p>이메일</p>
              </div>
              <div className=" col-span-9">
                <p>{reservationDetail.user.email}</p>
              </div>
            </div>
            <div className="p-6 grid grid-cols-12  gap-1 w-full bg-white border-b mt-1">
              <div className=" col-span-12">
                <p className="font-semibold">방문객 대표</p>
              </div>
              <div className=" col-span-3">
                <p>방문객 대표</p>
              </div>
              <div className=" col-span-9">
                <p>{reservationDetail.visitor}</p>
              </div>
              <div className=" col-span-3">
                <p>연락처</p>
              </div>
              <div className=" col-span-9">
                <p>{reservationDetail.visitorPhone}</p>
              </div>
            </div>
            <div className="p-6 grid grid-cols-12  gap-1 w-full bg-white border-b mt-1">
              <div className=" col-span-3">
                <p className="font-semibold">결제 예정 금액</p>
              </div>
              {reservationDetail.priceType === "PERSONAL" ? (
                <div className=" col-span-12 grid grid-cols-12  gap-3">
                  <div className=" col-span-3">
                    <p>개인</p>
                  </div>
                  <div className=" col-span-9">
                    {reservationDetail.personalPrice.map(
                      (item: any, index: any) => {
                        return (
                          <div
                            key={index}
                            className="flex flex-row items-center gap-2"
                          >
                            <p>{item.startAge}세</p>
                            <p>~</p>
                            <p>{item.endAge} 세</p>
                            <p>{item.amount} 명</p>
                            <p>{item.price} 원</p>
                            <p>{Number(item.amount) * Number(item.price)} 원</p>
                          </div>
                        );
                      }
                    )}
                  </div>
                  <div className=" col-span-3">
                    <p>결제 예정 금액</p>
                  </div>
                  <div className=" col-span-9">
                    <p>{reservationDetail.totalprice.toLocaleString()}원</p>
                  </div>
                </div>
              ) : (
                <div className=" col-span-12 grid grid-cols-12  gap-3">
                  <div className=" col-span-3">
                    <p>그룹</p>
                  </div>
                  <div className=" col-span-9 flex flex-row items-center gap-3">
                    <p>그룹 인원</p>
                    <p>{reservationDetail.groupNumber}명</p>
                  </div>
                  <div className=" col-span-3">
                    <p>결제 예정 금액</p>
                  </div>
                  <div className=" col-span-9">
                    <p>{reservationDetail.totalprice.toLocaleString()}원</p>
                  </div>
                </div>
              )}
            </div>
            <div className="p-6 grid grid-cols-12  gap-1 w-full bg-neutral-800  mt-1">
              <div className=" col-span-12">
                <p className="font-semibold text-white">취소 환불 정책</p>
              </div>
              <div className=" col-span-12">
                <p className=" whitespace-pre text-pretty text-sm text-neutral-500">
                  {reservationDetail.farm.refundPolicy}
                </p>
              </div>
            </div>
          </div>
          <div className="p-6 grid grid-cols-12  gap-2 w-full bg-neutral-900 border-b  fixed bottom-0 left-0">
            {(reservationDetail.status === "complete" ||
              reservationDetail.status === "waiting") && (
              <div className=" col-span-12 flex flex-row items-center justify-between gap-6 ">
                <div className=" flex flex-col items-start  justify-between w-[200px] ">
                  <p className="text-white">최소 가능 예약일자</p>
                  <p className="text-white">
                    방문일 {product.farm.reservationMin} 일전
                  </p>
                </div>
                {isBefore ? (
                  <div className="  flex flex-col items-end w-full">
                    <Button variant={"destructive"}>예약 취소</Button>
                  </div>
                ) : (
                  <div className="  flex flex-col items-center  w-full bg-neutral-800 p-3 broder rounded-md flex-1">
                    <p className="text-red-400 text-sm">
                      취소 가능일이 촤과하여 예약 취소가 불가합니다.
                    </p>
                  </div>
                )}
              </div>
            )}

            {reservationDetail.status === "done" && (
              <div className="flex flex-row items-center justify-between col-span-12 mt-3">
                <Button asChild className="w-full " size={"sm"}>
                  <Link
                    href={`/review/${reservationDetail.id}/${reservationDetail.productId}`}
                  >
                    체험 후기 작성
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
