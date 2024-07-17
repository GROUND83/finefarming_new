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
import { changeComplete, changeStatus } from "./actions";
import React from "react";
import { Loader2 } from "lucide-react";

export default function Complete({
  getData,
  reservationId,
}: {
  getData: () => Promise<void>;
  reservationId: number;
}) {
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const clickComplete = async () => {
    try {
      setLoading(true);
      let result = await changeComplete(Number(reservationId));
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
        <Button size={"sm"} onClick={() => setOpen(true)}>
          예약 확정
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className=" rounded-md">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {" "}
            예약상태를 예약확정으로 변경하겠습니까?
          </AlertDialogTitle>
          <AlertDialogDescription>
            예약상태를 예약확정으로 변경합니다.
            <br /> 고객, 농장주에게 이메일 발송됩니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className=" w-full flex flex-col items-center gap-2">
          <Button onClick={() => clickComplete()} className="w-full">
            {loading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              "예약 확정"
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
