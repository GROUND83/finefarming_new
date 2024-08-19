"use client";

import React from "react";
import { deleteMathch, getMatchDetail } from "./_component/actions";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/ButtonComponent";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { matchId: string } }) {
  //
  const [detail, setDetail] = React.useState<any>();
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const router = useRouter();

  const getDeatailData = async () => {
    //
    let res = await getMatchDetail(params.matchId);
    if (res) {
      console.log("Res", res);
      setDetail(res);
    }
  };
  React.useEffect(() => {
    getDeatailData();
  }, [params]);

  const deleteItem = async () => {
    //
    setDeleteLoading(true);
    try {
      let res = await deleteMathch(params.matchId);
      if (res) {
        toast.success("삭제 완료 되었습니다.");
        router.push(`/admin/matching`);
      }
    } catch (e: any) {
      toast.error(e);
    }
    setDeleteLoading(false);
  };
  return (
    <div className="w-full  relative  p-3">
      {detail && (
        <div className="bg-white w-full p-12 border flex flex-col items-start">
          <div className="flex flex-col items-start border-b w-full py-3">
            <p className=" text-neutral-400 text-sm">제목</p>
            <p>{detail.title}</p>
          </div>
          <div className="flex flex-col items-start border-b w-full py-3">
            <p className=" text-neutral-400 text-sm">작성일</p>
            <p>{dayjs(detail.created_at).format("YYYY-MM-DD")}</p>
          </div>
          <div className="flex flex-col items-start border-b w-full py-3">
            <p className=" text-neutral-400 text-sm">내용</p>
            <p className=" whitespace-pre-wrap">{detail.description}</p>
          </div>
          <div className="flex flex-col items-start border-b w-full py-3">
            <p className=" text-neutral-400 text-sm">작성자</p>
            <p>{detail.user.username}</p>
            <p>{detail.user.email}</p>
          </div>
          <div className="flex flex-col items-start border-b w-full py-3">
            <DeleteButton
              onDelete={() => deleteItem()}
              title="게시글을 삭제하겠습니까?"
              description="게시글을 삭제하면 관련된데이터
                모두 삭제됩니다."
              deleteLoading={deleteLoading}
            />
          </div>
        </div>
      )}
    </div>
  );
}
