//
"use client";
import React from "react";
import {
  deleteReview,
  getReivewDetail,
  updateReview,
} from "./_component/actions";
import Image from "next/image";
import StartPoint from "@/components/StartPoint";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { AlertButton, DeleteButton } from "@/components/ButtonComponent";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Page({ params }: { params: { reviewId: string } }) {
  const router = useRouter();

  const [updateLoading, setUpdateLoading] = React.useState(false);
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const [detail, setDetail] = React.useState<any>("");
  const detailData = async () => {
    let result = await getReivewDetail(Number(params.reviewId));
    console.log("result", result);
    setDetail(result);
  };
  React.useEffect(() => {
    detailData();
  }, [params.reviewId]);

  const clickDelete = async () => {
    //
    let result = await deleteReview(Number(params.reviewId));
    router.push("/admin/review");
  };
  const clickUpdate = async (visible: boolean) => {
    //
    console.log(visible);
    setUpdateLoading(true);
    let result = await updateReview({
      reviewId: Number(params.reviewId),
      visible: visible,
    });
    toast.success("수정이 완료되었습니다.");
    detailData();
    setUpdateLoading(false);
    // router.push("/admin/review");
  };
  return (
    <div className="p-3 w-full h-full">
      {detail && (
        <div className="w-full bg-white border p-6 rounded-md">
          <div className="flex flex-col items-start gap-6 w-full">
            <div className="w-full flex flex-row items-start   justify-between gap-3">
              <div className="w-[200px] h-[200px] aspect-square relative">
                <Image src={detail.image} fill priority alt="review" />
              </div>

              <div className="flex flex-row items-center gap-3 w-full justify-center">
                <div className="flex flex-row items-center gap-3 w-full justify-between border p-3 rounded-md">
                  <div>
                    <p>공개여부 : {detail.visible ? "공개" : "비공개"}</p>
                    <p className="text-xs text-neutral-500">
                      리뷰의 공개여부를 변경합니다.
                    </p>
                  </div>
                  {detail.visible ? (
                    <Button
                      onClick={() => clickUpdate(!detail.visible)}
                      variant={"outline"}
                    >
                      비공개
                    </Button>
                  ) : (
                    <Button onClick={() => clickUpdate(!detail.visible)}>
                      공개
                    </Button>
                  )}
                </div>
                <DeleteButton
                  onDelete={() => clickDelete()}
                  title="리뷰를 삭제하겠습니까?"
                  description={"삭제된 리뷰는 복구되지 않습니다."}
                  deleteLoading={deleteLoading}
                />
              </div>
            </div>
            <div className="flex flex-col items-start gap-3  w-full">
              <div className="flex flex-col items-start gap-1 w-full">
                <p className="w-full  text-pretty whitespace-pre-wrap min-h-[300px] border p-3 rounded-md">
                  {detail.title}
                </p>
              </div>
            </div>
            <StartPoint point={detail.point} />

            <div className="flex flex-row items-center gap-2">
              <Avatar className=" relative">
                <AvatarImage src={detail.user.avatar} />
              </Avatar>
              <div className="flex flex-col items-start">
                <p>{detail.user.username}</p>
                <p className="text-neutral-500 text-sm">{detail.user.email}</p>
              </div>
            </div>

            <div className="flex flex-row items-center gap-2">
              <p className="text-neutral-500 text-sm">
                {moment(detail.created_at).format("YYYY년 MM월 DD일")}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
