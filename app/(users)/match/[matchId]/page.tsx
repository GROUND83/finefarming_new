"use client";

import React from "react";
import { getMatchDetail } from "../_component/actions";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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
    setMatch(res.data);
    if (session.status === "authenticated" && res.data) {
      if (session?.data?.user.role === "user") {
        if (res.data?.userId === session?.data?.user.id) {
          //'
          // router.push("/match/permition");
        } else {
          //
          router.push("/match/notmine");
        }
      } else if (session?.data?.user.role === "manager") {
        //
        router.push("/match/permition");
      } else if (session?.data?.user.role === "farmer") {
        //
        // router.push("/match/permition");
      } else {
        router.push("/match/permition");
      }
    }
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
                  {match.user.username}
                </p>
              </div>
              <div className=" flex flex-row items-center gap-2">
                <p className="bg-neutral-100 border p-2 text-xs">이메일</p>
                <p className=" bg-neutral-100 border p-2 whitespace-pre-wrap text-xs">
                  {match.user.email}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
