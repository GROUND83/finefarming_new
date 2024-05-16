"use client";
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
import { Button } from "@/components/ui/button";
import { changeStatus } from "./actions";
import React from "react";
import { Loader2 } from "lucide-react";

export default function Cancle({
  getData,
  reservationId,
}: {
  getData: () => Promise<void>;
  reservationId: number;
}) {
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const clickCancle = async () => {
    try {
      setLoading(true);
      let result = await changeStatus({
        reservationId: Number(reservationId),
        status: "managercancle",
      });
      console.log(result);
      await getData();
    } catch (e) {
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild>
        <Button
          variant="deleteOutline"
          size={"sm"}
          onClick={() => setOpen(true)}
        >
          예약 취소
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className=" rounded-md">
        <AlertDialogHeader>
          <AlertDialogTitle>예약을 취소하겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            예약상태를 예약취소로 변경합니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className=" w-full flex flex-col items-center gap-2">
          <Button
            onClick={() => clickCancle()}
            variant={"destructive"}
            className="w-full"
          >
            {loading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              "예약 취소"
            )}
          </Button>
          <Button
            onClick={() => setOpen(false)}
            variant={"outline"}
            className="w-full"
          >
            닫기
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
