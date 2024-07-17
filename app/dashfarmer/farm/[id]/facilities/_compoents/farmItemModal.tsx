"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

//
export default function FarmItemModal() {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <button
        type="button"
        // href={"/admin/setting"}
        className="text-primary underline text-sm"
        onClick={() => setOpen(true)}
      >
        품종관리
      </button>
      <Dialog open={open}>
        <DialogContent className="w-[80vw] rounded-md p-12">
          <div className="flex flex-row items-center justify-between w-full">
            <div>
              <DialogTitle>체험 품종 관리</DialogTitle>
              <DialogDescription>
                체험 품종을 추가하거나 삭제하세요.
              </DialogDescription>
            </div>
            <Button
              size={"icon"}
              variant={"ghost"}
              onClick={() => setOpen(false)}
            >
              <XIcon className="size-4" />
            </Button>
          </div>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4"></div>
          </div>
          <DialogFooter>
            <Button type="submit">수정</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
