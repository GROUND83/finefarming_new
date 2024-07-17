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
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";

//
export default function OpentimeModal({ farmHoliday }: any) {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Button type="button" variant={"outline"} onClick={() => setOpen(true)}>
        운영정보확인
      </Button>
      <Dialog open={open}>
        <DialogContent className="w-[80vw] rounded-md p-12">
          <div className="flex flex-row items-center justify-between w-full">
            <div>
              <DialogTitle>운영정보 확인</DialogTitle>
              <DialogDescription>농장의 운영정보</DialogDescription>
            </div>
            <Button
              size={"icon"}
              variant={"ghost"}
              onClick={() => setOpen(false)}
            >
              <XIcon className="size-4" />
            </Button>
          </div>
          <div className="grid gap-4 py-4 text-sm">
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="border p-3 rounded-md">
                <div className="flex flex-row items-center justify-between w-full">
                  <p className=" font-semibold">월요일</p>
                  <Switch checked={farmHoliday?.mondayOpen} disabled />
                </div>
                <div className="flex flex-row items-center gap-3">
                  <p>{farmHoliday?.mondayStart}</p> ~
                  <p>{farmHoliday?.mondayEnd}</p>
                </div>
              </div>
              <div className="border p-3 rounded-md">
                <div className="flex flex-row items-center justify-between w-full">
                  <p className=" font-semibold">화요일</p>
                  <Switch checked={farmHoliday?.tuesdayOpen} disabled />
                </div>
                <div className="flex flex-row items-center gap-3">
                  <p>{farmHoliday?.tuesdayStart}</p> ~
                  <p>{farmHoliday?.tuesdayEnd}</p>
                </div>
              </div>
              <div className="border p-3 rounded-md">
                <div className="flex flex-row items-center justify-between w-full">
                  <p className=" font-semibold">수요일</p>
                  <Switch checked={farmHoliday?.wednesdayOpen} disabled />
                </div>
                <div className="flex flex-row items-center gap-3">
                  <p>{farmHoliday?.wednesdayStart}</p> ~
                  <p>{farmHoliday?.wednesdayEnd}</p>
                </div>
              </div>
              <div className="border p-3 rounded-md">
                <div className="flex flex-row items-center justify-between w-full">
                  <p className=" font-semibold">목요일</p>
                  <Switch checked={farmHoliday?.thursdayOpen} disabled />
                </div>
                <div className="flex flex-row items-center gap-3">
                  <p>{farmHoliday?.thursdayStart}</p> ~
                  <p>{farmHoliday?.thursdayEnd}</p>
                </div>
              </div>
              <div className="border p-3 rounded-md">
                <div className="flex flex-row items-center justify-between w-full">
                  <p className=" font-semibold">금요일</p>
                  <Switch checked={farmHoliday?.fridayOpen} disabled />
                </div>
                <div className="flex flex-row items-center gap-3">
                  <p>{farmHoliday?.fridayStart}</p> ~
                  <p>{farmHoliday?.fridayEnd}</p>
                </div>
              </div>
              <div className="border p-3 rounded-md">
                <div className="flex flex-row items-center justify-between w-full">
                  <p className=" font-semibold">토요일</p>
                  <Switch checked={farmHoliday?.saturdayOpen} disabled />
                </div>
                <div className="flex flex-row items-center gap-3">
                  <p>{farmHoliday?.saturdayStart}</p> ~
                  <p>{farmHoliday?.saturdayEnd}</p>
                </div>
              </div>
              <div className="border p-3 rounded-md">
                <div className="flex flex-row items-center justify-between w-full">
                  <p className=" font-semibold">일요일</p>
                  <Switch checked={farmHoliday?.sundayOpen} disabled />
                </div>
                <div className="flex flex-row items-center gap-3">
                  <p>{farmHoliday?.sundayStart}</p> ~
                  <p>{farmHoliday?.sundayEnd}</p>
                </div>
              </div>
              <div className="border p-3 rounded-md">
                <div className="flex flex-row items-center justify-between w-full">
                  <p className=" font-semibold">공휴일</p>
                  <Switch checked={farmHoliday?.holidayOpen} disabled />
                </div>
                <div className="flex flex-row items-center gap-3">
                  <p>{farmHoliday?.holidayStart}</p> ~
                  <p>{farmHoliday?.holidayEnd}</p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
