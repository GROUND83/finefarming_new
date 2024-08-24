"use client";

import React from "react";
import { getMatchDetail } from "../_component/actions";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Divide } from "lucide-react";

export default function Page({ params }: { params: { matchId: string } }) {
  const router = useRouter();
  const [match, setMatch] = React.useState<any>();
  const session = useSession();

  // React.useEffect(() => {
  //   console.log("session", session);
  //   if (session.status === "authenticated") {
  //     //
  //   }
  // }, [session]);

  //
  const getData = async () => {
    let res = await getMatchDetail(params.matchId);
    console.log("res", res);
    if (res?.data) {
      setMatch(res.data);
    } else {
      router.push("/permition");
    }
    // if (session.status === "authenticated" && res.data) {
    //   if (session?.data?.user.role === "user") {
    //     if (res.data?.userId === session?.data?.user.id) {
    //       //'
    //       // router.push("/match/permition");
    //     } else {
    //       //
    //       router.push("/match/notmine");
    //     }
    //   } else if (session?.data?.user.role === "manager") {
    //     //
    //     router.push("/match/permition");
    //   } else if (session?.data?.user.role === "farmer") {
    //     //
    //     // router.push("/match/permition");
    //   } else {
    //     router.push("/match/permition");
    //   }
    // }
  };
  React.useEffect(() => {
    getData();
  }, [session]);

  // 자기자신 또는 농장주 또는 관리자
  return (
    <div className="w-full p-3">
      <div className=" container mx-auto flex flex-col items-start gap-6">
        {match && (
          <div className="w-full flex flex-col items-start gap-3 border p-6 rounded-md">
            <div className="w-full grid grid-cols-12 gap-3">
              <div className="flex flex-row items-center justify-center gap-2  col-span-12 md:col-span-12 lg:col-span-4 bg-neutral-100 border p-2">
                <p className="text-sm">희망지역</p>
                <div className="w-[1px] bg-neutral-500 h-[10px]" />

                <p className=" whitespace-pre-wrap  text-sm">{match.region}</p>
              </div>
              <div className="flex flex-row items-center justify-center gap-2 col-span-12 md:col-span-12 lg:col-span-4 bg-neutral-100 border p-2">
                <p className="text-sm">희망인원</p>
                <div className="w-[1px] bg-neutral-500 h-[10px]" />
                <p className=" whitespace-pre-wrap  text-sm">{match.number}</p>
              </div>
              <div className=" text-sm flex flex-row items-center justify-center gap-2 col-span-12 md:col-span-12 lg:col-span-4 bg-neutral-100 border p-2">
                <p>선호하는 체험종류</p>
                <div className="w-[1px] bg-neutral-500 h-[10px]" />
                <p className=" whitespace-pre-wrap">{match.preference}</p>
              </div>
              <div className=" text-sm flex flex-row items-center justify-center gap-2 col-span-12 md:col-span-12 lg:col-span-4 bg-neutral-100 border p-2">
                <p>체험일정</p>
                <div className="w-[1px] bg-neutral-500 h-[10px]" />
                <div className="flex flex-row items-center">
                  <p className=" whitespace-pre-wrap ">
                    {dayjs(match.startDate).format("YYYY-MM-DD")}
                  </p>
                  <p>~</p>
                  <p className=" whitespace-pre-wrap ">
                    {dayjs(match.endDate).format("YYYY-MM-DD")}
                  </p>
                </div>
              </div>
              <div className=" text-sm flex flex-row items-center justify-center gap-2 col-span-12 md:col-span-12 lg:col-span-4 bg-neutral-100 border p-2">
                <p>소요예산</p>
                <div className="w-[1px] bg-neutral-500 h-[10px]" />
                <p className=" whitespace-pre-wrap ">{match.spent}</p>
              </div>
              <div className=" text-sm flex flex-row items-center justify-center gap-2 col-span-12 md:col-span-12 lg:col-span-4 bg-neutral-100 border p-2">
                <p>제안 마감기한</p>
                <div className="w-[1px] bg-neutral-500 h-[10px]" />
                <p className=" whitespace-pre-wrap ">
                  {dayjs(match.lastDate).format("YYYY-MM-DD")}
                </p>
              </div>
            </div>
            <div className="border-b w-full py-6">
              <p>제목</p>
              <p className="text-lg font-bold">{match.title}</p>
              <p className="text-neutral-500 text-xs">
                {dayjs(match.created_at).format("YYYY-MM-DD HH:mm")}
              </p>
            </div>
            <div className="border-b w-full py-6">
              <p>내용</p>
              <div className="p-3 min-h-[200px]">
                <p className=" whitespace-pre-wrap">{match.description}</p>
              </div>
            </div>

            <div className=" w-full py-6 flex flex-col items-start gap-2">
              <p>의뢰자</p>
              <div className=" flex flex-row items-center gap-2">
                <p className="bg-neutral-100 border p-2 text-xs">이름</p>
                <p className=" whitespace-pre-wrap bg-neutral-100 border p-2 text-xs">
                  {match.authorName}
                </p>
              </div>
              <div className=" flex flex-row items-center gap-2">
                <p className="bg-neutral-100 border p-2 text-xs">전화번호</p>
                <p className=" bg-neutral-100 border p-2 whitespace-pre-wrap text-xs">
                  {match.authorPhone}
                </p>
              </div>
              <div className=" flex flex-row items-center gap-2">
                <p className="bg-neutral-100 border p-2 text-xs">이메일</p>
                <p className=" bg-neutral-100 border p-2 whitespace-pre-wrap text-xs">
                  {match.authorEmail}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
