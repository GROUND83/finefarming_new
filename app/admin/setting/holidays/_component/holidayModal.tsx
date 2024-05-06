"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Loader2, PlusIcon, XIcon } from "lucide-react";
import React from "react";
import { getPublicHoldays, updateHolidays } from "./actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import moment from "moment";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
//
type ListYearType = {
  dateName: string;
  locdate: string;
  year: string;
  month: string;
  day: string;
};

export default function HolidayModal({ reload }: { reload: () => void }) {
  const router = useRouter();
  const [getLoading, setGetLoading] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [yearRange, setYearRange] = React.useState<string[]>([]);
  const [selectYear, setSelectYear] = React.useState<string>("");
  const [listYear, setListYear] = React.useState<ListYearType[]>([]);
  const { toast } = useToast();
  React.useEffect(() => {
    let newData = [];
    newData.push(moment().format("YYYY"));
    newData.push(moment().add(1, "years").format("YYYY"));
    console.log(newData);
    setYearRange(newData);
  }, []);

  const onClickHolidayGet = async (year: string) => {
    setGetLoading(true);
    let result = await getPublicHoldays(year);
    if (!result?.error) {
      console.log(result);
      setListYear(result);
    } else {
      toast({
        duration: 3000,
        variant: "destructive",
        title: "ERROR",
        description: "잠시 후 다시 시도하세요.",
      });
    }
    setGetLoading(false);
  };
  const clickUpdate = async () => {
    //
    if (listYear.length > 0) {
      //
      let newList = JSON.stringify(listYear);
      const formData = new FormData();
      formData.append("newData", newList);
      try {
        await updateHolidays(newList);
        setModalOpen(false);
        setSelectYear("");
        setListYear([]);
        // router.replace("/admin/setting/holidays");
        reload();
      } catch (e) {
        console.log(e);
      }
    } else {
      toast({
        duration: 3000,
        variant: "destructive",
        title: "ERROR",
        description: "공휴일 리스트가 없습니다.",
      });
    }
  };
  React.useEffect(() => {
    console.log(modalOpen);
    if (modalOpen) {
      setSelectYear("");
      setListYear([]);
    }
  }, [modalOpen]);
  return (
    <div>
      <Dialog open={modalOpen}>
        <Button
          type="button"
          variant={"backdelete"}
          className=" flex flex-row items-center gap-3"
          size={"sm"}
          onClick={() => setModalOpen(true)}
        >
          <PlusIcon className="size-4" />
          공휴일 업데이트
        </Button>
        <DialogContent className="w-[70vw] p-12 rounded-md flex flex-col items-start overflow-y-scroll">
          <div className="w-full flex flex-row items-center justify-end">
            <Button
              type="button"
              onClick={() => setModalOpen(false)}
              size={"icon"}
              variant={"ghost"}
            >
              <XIcon className="size-4" />
            </Button>
          </div>
          <div className="w-full flex flex-col items-start justify-start gap-3 mt-3">
            <div className="flex flex-row items-end gap-3 w-full bg-neutral-100 p-3 rounded-md border">
              <div className="flex flex-col items-start gap-2">
                <Select onValueChange={setSelectYear}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="년도 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {yearRange.map((year, index) => {
                      return (
                        <SelectItem key={index} value={year}>
                          {year}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
              {selectYear && (
                <div>
                  <Button onClick={() => onClickHolidayGet(selectYear)}>
                    공휴일 가져오기
                  </Button>
                </div>
              )}
            </div>
            <div className="w-full min-h-[30vh]">
              {getLoading ? (
                <div className="w-full  min-h-[30vh] flex flex-col items-center justify-center">
                  <Loader2 className=" animate-spin size-46 text-primary" />
                </div>
              ) : (
                <>
                  {listYear.length > 0 ? (
                    <div className="grid grid-cols-12 gap-1 w-full bg-neutral-100 p-3 rounded-md border text-sm  ">
                      {listYear.map((year, index) => {
                        return (
                          <div
                            key={index}
                            className=" col-span-3 gap-3 border w-full p-2 rounded-md bg-white "
                          >
                            <div className="flex flex-row items-center gap-1">
                              <div className="">
                                <p>{year.year}년</p>
                              </div>
                              <div className="">
                                <p>{year.month}월</p>
                              </div>
                              <div className="">
                                <p>{year.day}일</p>
                              </div>
                            </div>
                            <div className="">
                              <p>{year.dateName}</p>
                            </div>
                          </div>
                        );
                      })}
                      <div className=" col-span-12 flex flex-col items-end">
                        <Button onClick={() => clickUpdate()}>업데이트</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full min-h-[30vh] flex flex-col items-center justify-center ">
                      <p className=" text-neutral-500">
                        년도를 선택하고 공휴일을 가져오세요.
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
