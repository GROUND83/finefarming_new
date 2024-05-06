"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import moment from "moment";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { notFound, redirect } from "next/navigation";
import { getUser, logOut } from "./_components/actions";
import { Button } from "@/components/ui/button";
import React from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import EmptyData from "@/components/emptyData";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";

export default function Profile() {
  const [user, setUser] = React.useState<any>("");
  const [reservation, setReservation] = React.useState<any[]>([]);
  const [doneReservation, setDoneReservation] = React.useState<any[]>([]);
  const [reviews, setReviews] = React.useState<any[]>([]);
  const getUserData = async () => {
    let userresponse: any = await getUser();
    if (userresponse) {
      console.log("userresponse", userresponse);
      let newData = JSON.parse(userresponse);
      setUser(newData);
      if (newData.reservation.length > 0) {
        setReservation(newData.reservation);
        setDoneReservation(
          newData.reservation.filter((item: any) => item.status === "done")
        );
      }
      setReviews(newData?.reviews);
    }
  };
  React.useEffect(() => {
    getUserData();
  }, []);
  //
  const clickLogout = async () => {
    await logOut();
  };
  return (
    <div className="w-full p-6">
      <div className="flex flex-col items-start gap-3">
        <h1>나의 페이지</h1>
        {user && (
          <div className="w-full flex flex-col items-start gap-2">
            <div className="w-full flex flex-row items-center  justify-between gap-3 border p-3  rounded-md ">
              <div className="flex flexr-row items-center gap-3">
                <Avatar className="size-24">
                  <AvatarImage src={`${user.avatar}`} />
                </Avatar>
                <div className="flex flex-col items-start gap-1">
                  <p className="text-lg">{user?.username}</p>
                  <p className="text-sm">{user?.email}</p>
                  <p className="text-sm text-neutral-500">
                    {moment(user?.created_at).format("YYYY년MM월DD일")}
                  </p>
                </div>
              </div>
              <Button
                onClick={async () => clickLogout()}
                variant={"outline"}
                size={"sm"}
                className="gap-2"
              >
                로그아웃
                <ArrowLeftStartOnRectangleIcon className="size-4" />
              </Button>
            </div>
            <Tabs defaultValue="reservation" className="w-full flex-row ">
              <TabsList className="grid w-full grid-cols-3 border bg-neutral-200">
                <TabsTrigger value="reservation">예약내역</TabsTrigger>
                <TabsTrigger value="review">체험 후기</TabsTrigger>
                <TabsTrigger value="qna">문의사항</TabsTrigger>
                {/* <TabsTrigger value="password">문의사항</TabsTrigger> */}
              </TabsList>
              <TabsContent value="reservation">
                <div className="w-full flex flex-row items-center  justify-between gap-3 p-3  ">
                  {reservation.length > 0 ? (
                    <div className="w-full flex flex-col items-start gap-2">
                      {reservation.map((reservation, index) => {
                        return (
                          <div
                            key={index}
                            className="flex flex-col w-full border p-3 rounded-md  text-sm gap-2"
                          >
                            <div className="flex flex-row items-center justify-between w-full">
                              <p>예약번호</p>
                              <p>{reservation.reservationNumber}</p>
                            </div>
                            <div className="flex flex-row items-center justify-between w-full">
                              <p>예약상태</p>
                              {reservation.status === "waiting" && (
                                <Badge variant={"waiting"}>예약대기</Badge>
                              )}
                              {reservation.status === "complete" && (
                                <Badge variant={"complete"}>예약확정</Badge>
                              )}
                              {reservation.status === "done" && (
                                <Badge variant={"done"}>방문완료</Badge>
                              )}
                              {reservation.status === "cancel" && (
                                <Badge variant={"cancel"}>예약취소</Badge>
                              )}
                              {reservation.status === "noshow" && (
                                <Badge variant={"noshow"}>노쇼</Badge>
                              )}
                            </div>
                            <div className="flex flex-row items-center justify-between w-full">
                              <p>농장명</p>
                              <p>{reservation.farm.name}</p>
                            </div>
                            <div className="flex flex-row items-center justify-between w-full">
                              <p>상품명</p>
                              <p>{reservation.farm.name}</p>
                            </div>
                            <div className="flex flex-row items-center justify-between w-full">
                              <p>옵션상품</p>
                              <p>{reservation.farm.name}</p>
                            </div>

                            <div className="flex flex-row items-center justify-between w-full">
                              <p>예약일시</p>
                              <p>
                                {moment(reservation.checkInDate).format(
                                  "YYYY년 MM월 DD일"
                                )}{" "}
                                {reservation.checkInTime}시
                              </p>
                            </div>
                            <div className="flex flex-row items-center justify-between w-full mt-3">
                              <Button
                                asChild
                                className="w-full "
                                size={"sm"}
                                variant={"outline"}
                              >
                                <Link href={`/reservation/${reservation.id}`}>
                                  자세히보기
                                </Link>
                              </Button>
                            </div>
                            {reservation.status === "done" && (
                              <div className="flex flex-row items-center justify-between w-full mt-3">
                                <Button asChild className="w-full " size={"sm"}>
                                  <Link
                                    href={`/review/${reservation.id}/${reservation.productId}`}
                                  >
                                    체험 후기 남기기
                                  </Link>
                                </Button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div>
                      <p>예약 내역이 없습니다.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="qna">
                <div className="w-full flex flex-row items-center  justify-between gap-3 p-3  ">
                  <div className="w-full h-[200px]">
                    <EmptyData title="문의사항이" />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="review">
                <div className="w-full flex flex-row items-center  justify-between gap-3 p-3  ">
                  {reviews.length > 0 ? (
                    <div className="w-full flex flex-col items-start gap-2">
                      {reviews.map((review, index) => {
                        return (
                          <div key={index} className="flex flex-col w-full ">
                            <div className="flex flex-col w-full border p-3 rounded-md   gap-1">
                              <div className="grid grid-cols-12 gap-3 w-full text-md">
                                <div className=" relative aspect-square  col-span-3">
                                  <Image
                                    src={review.image}
                                    alt={review.title}
                                    fill
                                    priority
                                  />
                                </div>
                                <div className=" col-span-9 flex flex-col items-start justify-between h-full ">
                                  <p>{review.title}</p>
                                  <p className="text-neutral-500 text-sm">
                                    {moment(review.created_at).format(
                                      "YYYY년 MM월 DD일"
                                    )}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div>
                      <p>예약 내역이 없습니다.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
}
