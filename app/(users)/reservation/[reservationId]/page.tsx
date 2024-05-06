"use client";

// import getSession from "@/lib/session";
import { notFound, useRouter } from "next/navigation";
import React from "react";
import { getReservationDetail } from "./_components/actions";
import Image from "next/image";
import moment from "moment";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
    console.log("result", result);
    setReservationDetail(result.reservation);
    setProduct(result.product);
    let min = result.product.farm.reservationMin;
    let today = moment().format("YYYY-MM-DD");
    let reservationData = moment(result.reservation.checkInDate)
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
  // const journal = await getJournal(id);
  // if (!journal) {
  //   return notFound();
  // }
  // console.log(journal);
  return (
    <div className="w-full bg-neutral-100 h-full">
      {reservationDetail && (
        <div className="w-full   relative  grid grid-cols-12 gap-6 ">
          {/* <div className=" col-span-12">
            <p>예약 결과</p>
          </div> */}
          <div className=" col-span-12">
            <div className="w-full relative aspect-video">
              <Image src={product.mainImage} fill alt={product.title} />
            </div>
            <div className="p-6 flex flex-col items-start gap-3 w-full bg-white border-b">
              <div>
                <p className=" font-semibold text-lg">{product.title}</p>
                <p className="text-neutral-500">{product.description}</p>
              </div>
              <div className="bg-primary/10 border border-primary p-3 rounded-md text-sm">
                <p>{product.educationTitle}</p>
              </div>

              <div className="flex flex-row items-center w-full gap-2">
                {product.educationSubject.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="bg-primary/10 border border-primary px-3 py-1 rounded-md text-sm text-xs text-primary"
                    >
                      <p>{item.tag}</p>
                    </div>
                  );
                })}
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
                    {reservationDetail.personalPrice.map((item, index) => {
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
                </>
              )}
              <div className=" col-span-3">
                <p>예약상태</p>
              </div>
              <div className=" col-span-9">
                {reservationDetail.status === "waiting" && (
                  <div className="flex flex-col items-start gap-2">
                    <p className="px-3 py-1 bg-primary/10 border rounded-full text-xs">
                      확정대기
                    </p>
                    <p className="text-xs">
                      예약확정 시 카카오톡 또는 네이버톡톡으로 알림 발송합니다.
                    </p>
                  </div>
                )}
                {reservationDetail.status === "complete" && <p>예약확정</p>}
                {reservationDetail.status === "cancle" && <p>취소</p>}
                {reservationDetail.status === "done" && <p>방문완료</p>}
                {reservationDetail.status === "noshow" && <p>노쇼 </p>}
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
              <div className=" col-span-12">
                <p className="font-semibold">결제 예정 금액</p>
              </div>
              {reservationDetail.priceType === "PERSONAL" && (
                <>
                  <div className=" col-span-3">
                    <p>기본</p>
                  </div>
                  <div className=" col-span-9">
                    {reservationDetail.personalPrice.map((item, index) => {
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
                    })}
                  </div>
                  <div className=" col-span-3">
                    <p>결제 예정 금액</p>
                  </div>
                  <div className=" col-span-9">
                    <p>{reservationDetail.totalprice}원</p>
                  </div>
                </>
              )}
            </div>
            <div className="p-6 grid grid-cols-12  gap-1 w-full bg-white border-b mt-1">
              <div className=" col-span-12">
                <p className="font-semibold">취소 환불 정책</p>
              </div>
              <div className=" col-span-12">
                <p className=" whitespace-pre text-pretty text-sm">
                  {reservationDetail.farm.refundPolicy}
                </p>
              </div>
            </div>
            <div className="p-6 grid grid-cols-12  gap-2 w-full bg-white border-b mt-1 pb-24">
              {(reservationDetail.status === "complete" ||
                reservationDetail.status === "waiting") && (
                <div className=" col-span-12">
                  <div className=" col-span-12 flex flex-row items-center  justify-between">
                    <p>최소 가능 예약일자</p>
                    <p>예약일 {product.farm.reservationMin} 일전</p>
                  </div>
                  {isBefore ? (
                    <div className=" col-span-12 flex flex-col items-end w-full">
                      <Button variant={"destructive"}>예약 취소</Button>
                    </div>
                  ) : (
                    <div className=" col-span-12 flex flex-col items-center  w-full bg-neutral-100 p-3 broder rounded-md">
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
        </div>
      )}
    </div>
  );
}
