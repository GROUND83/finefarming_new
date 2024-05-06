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

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";

import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
type ListYearType = {
  dateName: string;
  locdate: string;
  year: string;
  month: string;
  day: string;
};
const FormSchema = z.object({
  date: z.date({
    required_error: "날짜를 선택하세요.",
  }),
  dateName: z.string({ required_error: "공휴일 명을 입력하세요." }),
});

export default function AddHolidayModal({
  year,
  reload,
}: {
  year: string;
  reload: () => void;
}) {
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

  // const onClickHolidayGet = async (year: string) => {
  //   setGetLoading(true);
  //   let result = await getPublicHoldays(year);
  //   if (!result?.error) {
  //     console.log(result);
  //     setListYear(result);
  //   } else {
  //     toast({
  //       duration: 3000,
  //       variant: "destructive",
  //       title: "ERROR",
  //       description: "잠시 후 다시 시도하세요.",
  //     });
  //   }
  //   setGetLoading(false);
  // };
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
      form.reset();
    }
  }, [modalOpen]);
  //
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    let day = moment(data.date).format("DD");
    let month = moment(data.date).format("MM");
    let year = moment(data.date).format("YYYY");
    let newData = {
      dateName: data.dateName,
      day,
      month,
      year,
      locdate: `${year}${month}${day}`,
    };
    let jsonstring = JSON.stringify(newData);

    try {
      let result = await updateHolidays(jsonstring);
      if (result) {
        setSelectYear("");
        setListYear([]);
        form.reset();
        reload();
        setModalOpen(false);
        // toast({
        //   duration: 3000,
        //   title: "수정완료",
        //   description: "데이터 수정이 완료 되었습니다.",
        // });
      }
    } catch (e: any) {
      console.log(e);
      toast({
        duration: 3000,
        variant: "destructive",
        title: "수정 ERROR",
        description: `${e}`,
      });
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // setUpdateLoading(false);
      // window.location.reload();
    }
  }
  // console.log(
  //   moment(year).subtract(1, "year").endOf("year").format("YYYY-MM-DD"),
  //   moment(year).endOf("year").format("YYYY-MM-DD")
  // );
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
          공휴일 직접추가
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
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col items-start gap-3 w-full bg-neutral-100 p-3 rounded-md border "
              >
                <div className="w-full flex flex-row items-start justify-between gap-3">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col flex-1">
                        <FormLabel>공휴일 선택</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  moment(field.value).format("YYYY년 MM월 DD일")
                                ) : (
                                  <span>날짜 선택</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              locale={ko}
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date <
                                  new Date(
                                    moment(year)
                                      .subtract(1, "year")
                                      .endOf("year")
                                      .format("YYYY-MM-DD")
                                  ) ||
                                date >
                                  new Date(
                                    moment(year)
                                      .endOf("year")
                                      .format("YYYY-MM-DD")
                                  )
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>
                          {year}년의 날짜만 선택 가능합니다.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dateName"
                    render={({ field }) => (
                      <FormItem className="flex flex-col flex-1">
                        <FormLabel>공휴일 명</FormLabel>
                        <Input
                          value={field.value || ""}
                          onChange={field.onChange}
                        />

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col items-end mt-6 w-full">
                  <Button type="submit">추가</Button>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
