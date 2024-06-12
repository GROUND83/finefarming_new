"use client";

// import getSession from "@/lib/session";
import { notFound, useRouter } from "next/navigation";
import React from "react";
import { getReservationDetail, makeCancle } from "./_components/actions";
import Image from "next/image";
import moment from "moment";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getSession } from "next-auth/react";
import { Badge } from "@/components/ui/badge";
import { AlertButton } from "@/components/ButtonComponent";
import dayjs from "dayjs";

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
  const [deleteLoading, setDeleteLoading] = React.useState(false);
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

    //
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
      .subtract(min - 1, "day")
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
  const clickCancle = async () => {
    console.log(reservationDetail);
    try {
      setDeleteLoading(true);
      let resoponse = await makeCancle(reservationDetail.id);
      console.log("resoponse", resoponse);
    } catch (e) {
    } finally {
      router.refresh();
      window.location.reload();
      setDeleteLoading(false);
    }
  };
  return (
    <div className="w-full bg-white h-full">
      {reservationDetail && (
        <div className="w-full  grid grid-cols-12  relative  container mx-auto border lg:mt-12 ">
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
              <div className=" col-span-4">
                <p>예약번호</p>
              </div>
              <div className=" col-span-8">
                <p>{reservationDetail.reservationNumber}</p>
              </div>
              <div className=" col-span-4">
                <p>방문일</p>
              </div>
              <div className=" col-span-8">
                <p>
                  {moment(reservationDetail.checkInDate).format(
                    "YYYY년 MM월 DD일"
                  )}{" "}
                  {reservationDetail.checkInTime}시
                </p>
              </div>
              <div className=" col-span-4">
                <p>예약일</p>
              </div>
              <div className=" col-span-8">
                <p>
                  {dayjs(reservationDetail.created_at)
                    .subtract(9, "hour")
                    .format("YYYY년 MM월 DD일")}
                </p>
              </div>
              {reservationDetail.priceType === "PERSONAL" && (
                <>
                  <div className=" col-span-4">
                    <p>인원</p>
                  </div>
                  <div className=" col-span-8">
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
              {reservationDetail.priceType === "GROUP" && (
                <>
                  <div className=" col-span-4">
                    <p>인원</p>
                  </div>
                  <div className=" col-span-8">
                    {reservationDetail.groupMember.map(
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
              <div className=" col-span-4">
                <p>예약상태</p>
              </div>
              <div className=" col-span-8">
                {reservationDetail.status === "waiting" && (
                  <div className="flex flex-col items-start gap-2">
                    <Badge className="text-sm" variant={"waiting"}>
                      확정대기
                    </Badge>

                    <p className="text-sm">
                      예약확정 후에는 고객님께서 등록하신 이메일로 확정 완료
                      안내 이메일을 발송해 드립니다
                    </p>
                  </div>
                )}
                {reservationDetail.status === "complete" && (
                  <Badge className="text-sm" variant={"complete"}>
                    예약확정
                  </Badge>
                )}
                {(reservationDetail.status === "cancle" ||
                  reservationDetail.status === "managercancle") && (
                  <Badge className="text-sm" variant={"cancel"}>
                    취소
                  </Badge>
                )}
                {reservationDetail.status === "done" && (
                  <Badge className="text-sm" variant={"done"}>
                    방문완료
                  </Badge>
                )}
                {reservationDetail.status === "noshow" && (
                  <Badge className="text-sm" variant={"noshow"}>
                    취소
                  </Badge>
                )}
              </div>
            </div>
            <div className="p-6 grid grid-cols-12  gap-1 w-full bg-white border-b mt-1">
              <div className=" col-span-12">
                <p className="font-semibold">예약자 정보</p>
              </div>
              <div className=" col-span-4">
                <p>예약자</p>
              </div>
              <div className=" col-span-8">
                <p>{reservationDetail.user.username}</p>
              </div>
              <div className=" col-span-4">
                <p>연락처</p>
              </div>
              <div className=" col-span-8">
                <p>{reservationDetail.user.phone}</p>
              </div>
              <div className=" col-span-4">
                <p>이메일</p>
              </div>
              <div className=" col-span-8">
                <p>{reservationDetail.user.email}</p>
              </div>
            </div>
            <div className="p-6 grid grid-cols-12  gap-1 w-full bg-white border-b mt-1">
              <div className=" col-span-12">
                <p className="font-semibold">방문객 대표</p>
              </div>
              <div className=" col-span-4">
                <p>방문객 대표</p>
              </div>
              <div className=" col-span-8">
                <p>{reservationDetail.visitor}</p>
              </div>
              <div className=" col-span-4">
                <p>연락처</p>
              </div>
              <div className=" col-span-8">
                <p>{reservationDetail.visitorPhone}</p>
              </div>
            </div>
            <div className="p-6 grid grid-cols-12  gap-2 w-full bg-white border-b mt-1">
              <div className=" col-span-12">
                <p className="font-semibold"> 결제 예정 금액</p>
              </div>
              <div className=" col-span-12 grid grid-cols-12  gap-3">
                <div className="col-span-4">
                  <p className=""> 추가상품</p>
                </div>
                <div className=" col-span-12 lg:col-span-8">
                  {reservationDetail.subProduct.map(
                    (sub: any, subInex: any) => {
                      return (
                        <div
                          key={subInex}
                          className=" col-span-12 flex flex-col items-start gap-2"
                        >
                          <div className="flex flex-row items-center gap-2">
                            <Badge>필수</Badge>
                            <p>{sub.title}</p>
                            <p>{sub.price.toLocaleString()}원</p>
                          </div>
                          <div>
                            {sub.selectProducts.map(
                              (select: any, selectIndex: any) => {
                                return (
                                  <div
                                    key={selectIndex}
                                    className="flex flex-row items-center gap-2"
                                  >
                                    <Badge variant={"outline"}>선택</Badge>
                                    <p>{select.title}</p>
                                    <p>{select.amount}</p>
                                    <p>
                                      {(
                                        select.amount * select.price
                                      ).toLocaleString()}
                                      원
                                    </p>
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
              {reservationDetail.priceType === "PERSONAL" ? (
                <div className=" col-span-12 grid grid-cols-12  gap-3">
                  <div className=" col-span-4">
                    <p>연령별</p>
                  </div>
                  <div className=" col-span-8 flex flex-col items-start gap-1">
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
                            {!item.isFree && (
                              <p>{Number(item.price).toLocaleString()} 원</p>
                            )}
                            {!item.isFree && (
                              <p>
                                {(
                                  Number(item.amount) * Number(item.price)
                                ).toLocaleString()}{" "}
                                원
                              </p>
                            )}
                            {item.isFree && (
                              <Badge variant={"outline"}>무료</Badge>
                            )}
                          </div>
                        );
                      }
                    )}
                  </div>
                  <div className=" col-span-4">
                    <p>결제 예정 금액</p>
                  </div>
                  <div className=" col-span-8">
                    <p>{reservationDetail.totalprice.toLocaleString()}원</p>
                  </div>
                </div>
              ) : (
                <div className=" col-span-12 grid grid-cols-12  gap-3">
                  <div className=" col-span-4 flex flex-row items-center gap-3">
                    <p>그룹</p>
                  </div>
                  <div className=" col-span-8 flex flex-row items-center gap-3">
                    <p>{reservationDetail.groupPrice.toLocaleString()}원</p>
                  </div>
                  <div className=" col-span-4">
                    <p>결제 예정 금액</p>
                  </div>
                  <div className=" col-span-8">
                    <p>{reservationDetail.totalprice.toLocaleString()}원</p>
                  </div>
                </div>
              )}
            </div>
            <div className="p-6 grid grid-cols-12  gap-2 w-full bg-neutarl-100 ">
              {(reservationDetail.status === "complete" ||
                reservationDetail.status === "waiting") && (
                <div className=" col-span-12 flex flex-row items-center justify-between gap-6 ">
                  <div className=" flex flex-col items-start  justify-between ">
                    <p className="">최소 가능 예약일자</p>
                    <p className="">
                      방문일 {product.farm.reservationMin} 일전
                    </p>
                  </div>
                  {isBefore ? (
                    <div className="  flex flex-col items-end ">
                      {/* <Button
                        variant={"destructive"}
                        onClick={() => clickCancle()}
                      >
                        예약 취소
                      </Button> */}
                      <AlertButton
                        buttonTitle="예약취소"
                        title="예약취소"
                        description="예약취소 시 예약은 복구되지 않습니다."
                        deleteLoading={deleteLoading}
                        onDelete={() => clickCancle()}
                      />
                    </div>
                  ) : (
                    <div className="  flex flex-col items-center  w-full  p-3 broder rounded-md flex-1">
                      <p className="text-red-400 text-sm">
                        취소 가능일이 촤과하여 예약 취소가 불가합니다.
                      </p>
                    </div>
                  )}
                </div>
              )}
              {(reservationDetail.status === "cancle" ||
                reservationDetail.status === "managercancle") && (
                <div className=" col-span-12 flex flex-row items-center justify-between gap-6 ">
                  <div className=" flex flex-col items-start  justify-between ">
                    <p className="text-red-500">예약이 취소 되었습니다.</p>
                  </div>
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
            <div className="p-6 grid grid-cols-12  gap-1 w-full bg-neutral-800  ">
              <div className=" col-span-12">
                <p className="font-semibold text-white text-sm">
                  취소 환불 정책
                </p>
              </div>
              <div className=" col-span-12">
                <p className=" whitespace-pre text-pretty text-xs text-neutral-500">
                  {reservationDetail.farm.refundPolicy}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
