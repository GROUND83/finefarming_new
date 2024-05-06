"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import React from "react";
import {
  changeComplete,
  changeStatus,
  getReservationDetail,
} from "./_components/actions";
import moment from "moment";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
let dummyData = {
  id: 1,
  reservationNumber: "GX29319501",
  farmName: "피코니크 농장",
  user: "백지민",
  checkInData: new Date(),
  howMany: 3,
  totalPrice: 36000,
  status: "확정대기",
  created_at: new Date(),
};

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

  const clickComplete = async () => {
    //
    let result = await changeComplete(Number(params.reservationId));
    console.log(result);
    getData();
  };
  const clickDone = async () => {
    let result = await changeStatus({
      reservationId: Number(params.reservationId),
      status: "done",
    });
    getData();
  };
  const clickNoShow = async () => {
    let result = await changeStatus({
      reservationId: Number(params.reservationId),
      status: "noShow",
    });
    getData();
  };
  const clickCancle = async () => {
    let result = await changeStatus({
      reservationId: Number(params.reservationId),
      status: "cancle",
    });
    console.log(result);
    getData();
  };

  return (
    <div className="w-full  h-full">
      {detail && (
        <div className="flex flex-col items-start w-full gap-3 ">
          <div className="flex w-full bg-white  border-b px-6 py-3">
            <div className="flex flex-row items-center gap-3 w-full">
              <p className="font-bold text-lg">{detail.reservationNumber}</p>
              {detail.status === "waiting" && (
                <Badge variant={"waiting"} className="text-xs">
                  확정대기
                </Badge>
              )}
              {detail.status === "complete" && (
                <Badge variant={"complete"} className="text-xs">
                  예약확정
                </Badge>
              )}
              {detail.status === "done" && (
                <Badge variant={"done"} className="text-xs">
                  방문완료
                </Badge>
              )}
              {detail.status === "cancel" && (
                <Badge variant={"cancel"} className="text-xs">
                  취소
                </Badge>
              )}
              {detail.status === "noshow" && (
                <Badge variant={"noshow"} className="text-xs">
                  노쇼
                </Badge>
              )}
            </div>
            <div className="flex flex-row items-center gap-3">
              {detail.start !== "done" ||
                (detail.start !== "noShow" && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="deleteOutline" size={"sm"}>
                        예약 취소
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className=" rounded-md">
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          예약을 취소하겠습니까?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          예약상태를 예약취소로 변경합니다.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>닫기</AlertDialogCancel>
                        <AlertDialogAction onClick={() => clickCancle()}>
                          확정
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                ))}
              {detail.status === "waiting" && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="default" size={"sm"}>
                      예약 확정
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className=" rounded-md">
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        예약상태를 예약확정으로 변경하겠습니까?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        예약상태를 예약확정으로 변경합니다.
                        <br /> 고객, 농장주에게 알림 메세지가 발송됩니다.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>닫기</AlertDialogCancel>
                      <AlertDialogAction onClick={() => clickComplete()}>
                        확정
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
              {detail.status === "complete" && (
                <>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size={"sm"}>
                        노쇼
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className=" rounded-md">
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          예약상태를 노쇼로 변경하겠습니까?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          예약상태를 노쇼로 변경합니다.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>닫기</AlertDialogCancel>
                        <AlertDialogAction onClick={() => clickNoShow()}>
                          확정
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="default" size={"sm"}>
                        방문완료
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className=" rounded-md">
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          예약상태를 방문완료으로 변경하겠습니까?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          예약상태를 방문완료으로 변경합니다.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>닫기</AlertDialogCancel>
                        <AlertDialogAction onClick={() => clickDone()}>
                          확정
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </>
              )}
            </div>
          </div>
          <div className="flex w-full p-3 flex-col">
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
                    <p className="text-neutral-500">
                      {product.subProduct.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="flex flex-col items-start gap-2"
                          >
                            <p>{item.title}</p>
                            {item.selectProducts.length > 0 && (
                              <div>
                                <p>옵션상품</p>
                                {item.selectProducts.map((sub, subIndex) => {
                                  return (
                                    <div key={subIndex}>
                                      <p>{sub.title}</p>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </p>
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
                      {moment(detail.checkInDate).format("YYYY년 MM월 DD일")}
                    </p>
                  </div>
                  <div className=" col-span-6 flex flex-col gap-1">
                    <p className=" font-semibold">인원</p>
                    <p className="text-neutral-500">
                      {detail.personalPrice.map((item, index) => {
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
                    </p>
                  </div>
                  <div className=" col-span-6 flex flex-col gap-1">
                    <p className=" font-semibold">옵션</p>
                    <p className="text-neutral-500">{}</p>
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
                    <p className="text-neutral-500">{detail.totalPrice}원</p>
                  </div>
                  {detail.priceType === "PERSONAL" && (
                    <div className=" col-span-6 flex flex-col gap-2 items-start">
                      <Badge>개인별</Badge>
                      {detail.personalPrice.map((item, index) => {
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
                  <div className=" col-span-6 flex flex-col gap-1">
                    <p className=" font-semibold">옵션</p>
                    <p className="text-neutral-500">{}</p>
                  </div>
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
