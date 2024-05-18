"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Edit2Icon, Loader2, PlusIcon, XIcon } from "lucide-react";
import React from "react";
import {
  editHolidays,
  getPublicHoldays,
  updateHolidays,
  deleteHoliday,
} from "./actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import moment from "moment";
import { Label } from "@/components/ui/label";

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

import { Input } from "@/components/ui/input";
import {
  DeleteButton,
  LoadingEditSubmitButton,
} from "@/components/ButtonComponent";
import { toast } from "sonner";
type ListYearType = {
  id: number;
  dateName: string;
  locdate: string;
  year: string;
  month: string;
  day: string;
};
const FormSchema = z.object({
  locdate: z.date({
    required_error: "날짜를 선택하세요.",
  }),
  dateName: z.string({ required_error: "공휴일 명을 입력하세요." }),
});

export default function EditHolidayModal({
  holiday,
  reload,
}: {
  holiday: ListYearType;
  reload: () => Promise<void>;
}) {
  const router = useRouter();
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const [editLoading, setEditLoading] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);

  React.useEffect(() => {
    console.log(modalOpen);
    if (modalOpen) {
      form.reset();
    }
  }, [modalOpen]);
  //
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      locdate: holiday
        ? new Date(moment(holiday.locdate).format("YYYY-MM-DD"))
        : new Date(),
      dateName: holiday ? holiday.dateName : "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setEditLoading(true);
    console.log(data);
    let day = moment(data.locdate).format("DD");
    let month = moment(data.locdate).format("MM");
    let year = moment(data.locdate).format("YYYY");
    let newData = {
      id: holiday.id,
      dateName: data.dateName,
      day,
      month,
      year,
      locdate: `${year}${month}${day}`,
    };
    let jsonstring = JSON.stringify(newData);

    try {
      let result = await editHolidays(jsonstring);
    } catch (e: any) {
      console.log(e);
      toast.error(`${e}`);
    } finally {
      form.reset();
      await reload();
      setModalOpen(false);
      setEditLoading(false);
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      // setUpdateLoading(false);
      // window.location.reload();
    }
  }
  React.useEffect(() => {
    form.reset({
      locdate: holiday
        ? new Date(moment(holiday.locdate).format("YYYY-MM-DD"))
        : new Date(),
      dateName: holiday ? holiday.dateName : "",
    });
  }, [holiday]);
  // console.log(
  //   moment(year).subtract(1, "year").endOf("year").format("YYYY-MM-DD"),
  //   moment(year).endOf("year").format("YYYY-MM-DD")
  // );
  const deletHoliday = async () => {
    //
    setDeleteLoading(true);
    try {
      let result = await deleteHoliday(holiday.id);
    } catch (e: any) {
      console.log(e);
      toast.error(`${e}`);
    } finally {
      form.reset();
      await reload();
      setModalOpen(false);
      setDeleteLoading(true);
    }
  };
  return (
    <div>
      <Dialog open={modalOpen}>
        <Button
          type="button"
          variant={"outline"}
          className=" flex flex-row items-center gap-3 text-neutral-500"
          size={"sm"}
          onClick={() => setModalOpen(true)}
        >
          <Edit2Icon className="size-4 " />
          수정
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
                    name="locdate"
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
                                    moment(holiday.locdate)
                                      .subtract(1, "year")
                                      .endOf("year")
                                      .format("YYYY-MM-DD")
                                  ) ||
                                date >
                                  new Date(
                                    moment(holiday.locdate)
                                      .endOf("year")
                                      .format("YYYY-MM-DD")
                                  )
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>

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
                <div className="flex flex-row justify-end items-center mt-6 w-full gap-3">
                  <DeleteButton
                    onDelete={() => deletHoliday()}
                    title="공휴일을 삭제하겠습니까?"
                    description="삭제된 데이터는 복구되지 않습니다."
                    deleteLoading={deleteLoading}
                  />

                  <LoadingEditSubmitButton
                    loading={editLoading}
                    disabled={
                      !form.formState.isDirty ||
                      form.formState.isSubmitting ||
                      editLoading
                    }
                  />
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
