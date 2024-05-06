"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { XCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import React from "react";
import { SearchTable } from "./searchTable";
import searchDatabase from "./searchActions";
import moment from "moment";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";
const formSchema = z.object({
  username: z.string(),
  minPoint: z.number().min(0).max(5),
  maxPoint: z.number().min(0).max(5),
  minDate: z.date(),
  maxDate: z.date(),
});

export default function Page() {
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [searchData, setSearchData] = React.useState<
    {
      id: number;
      username: string;
      email: string | null;
      phone: string | null;
      avatar: string | null;
      created_at: Date;
      approve: boolean;
    }[]
  >([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      minPoint: 0,
      maxPoint: 5,
      minDate: new Date(),
      maxDate: new Date(),
    },
    mode: "onSubmit",
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("values", values);
    if (values.minPoint > values.maxPoint) {
      console.log(form.formState.errors);
      toast({
        variant: "destructive",
        title: "리뷰 점수 범위가 잘못되었습니다.",
        description: "최소점수는 최대점수 보다 작아야됩니다.",
      });
    }
    if (moment(values.minDate).isAfter(moment(values.maxDate))) {
      console.log(form.formState.errors);
      toast({
        variant: "destructive",
        title: "작성일 범위가 잘못되었습니다.",
        description: "최소일자는 최대일자 보다 작아야됩니다.",
      });
    }
    let newString = JSON.stringify(values);
    let response: any = await searchDatabase(newString);
    // console.log("searchData", searchData);

    //   show search Modal
    if (response) {
      if (response.length > 0) {
        setSearchData(response);
        setModalOpen(true);
      } else {
        toast({
          variant: "destructive",
          title: "검색결과.",
          description: "검색결과가 없습니다.",
        });
        setSearchData([]);
        setModalOpen(true);
      }
    }
  }

  React.useEffect(() => {
    // do your logic here
    if (form.formState.errors.search) {
      console.log(form.formState.errors);
      toast({
        variant: "destructive",
        title: "검색 필드가 잘못되었습니다.",
        description: `${form.formState.errors.search?.message}`,
      });
    }
    if (form.formState.errors.type) {
      console.log(form.formState.errors);
      toast({
        variant: "destructive",
        title: "검색 필드가 잘못되었습니다.",
        description: `${form.formState.errors.type?.message}`,
      });
    }
  }, [form.formState.errors]);
  return (
    <div className="flex-1 w-full p-3 bg-white">
      <div className="w-full bg-neutral-100  p-3 border rounded-md">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-center gap-3"
          >
            <div className=" w-full flex flex-col items-start gap-1">
              <p className="text-sm text-neutral-500">작성자</p>
              <FormField
                control={form.control}
                name="username"
                render={({ field: { value, onChange } }) => (
                  <FormItem className="w-full">
                    <Input
                      value={value}
                      onChange={onChange}
                      placeholder="작성자를 입력하세요."
                    />

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-row items-end gap-3 w-full">
              <div className="flex flex-col items-start gap-2">
                <p className="text-sm text-neutral-500">리뷰 점수</p>
                <div className="flex flex-row items-center gap-3 flex-1">
                  <div className="">
                    <FormField
                      control={form.control}
                      name="minPoint"
                      render={({ field: { value, onChange } }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="최소 포인트를 입력하세요."
                              min={0}
                              max={5}
                              value={value || 0}
                              onChange={(e) => onChange(Number(e.target.value))}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <p className="text-sm text-neutral-500">부터</p>
                  <div className="">
                    <FormField
                      control={form.control}
                      name="maxPoint"
                      render={({ field: { value, onChange } }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="number"
                              min={0}
                              max={5}
                              placeholder="최대 포인트를 입력하세요."
                              value={value}
                              onChange={(e) => onChange(Number(e.target.value))}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <p className="text-sm text-neutral-500">까지</p>
                </div>
              </div>
              <div className="flex flex-col items-start gap-2">
                <p className="text-sm text-neutral-500">작성일</p>
                <div className="flex flex-row   items-center gap-3">
                  <div className="w-[200px]">
                    <FormField
                      control={form.control}
                      name="minDate"
                      render={({ field: { value, onChange } }) => (
                        <FormItem>
                          <FormItem>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-[200px] pl-3 text-left font-normal",
                                      !value && "text-muted-foreground"
                                    )}
                                  >
                                    {value ? (
                                      moment(value).format("YYYY-MM-DD")
                                    ) : (
                                      <span>날짜선택</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  locale={ko}
                                  mode="single"
                                  selected={value}
                                  onSelect={onChange}
                                  // disabled={(date) =>
                                  //   date > new Date() ||
                                  //   date < new Date("1900-01-01")
                                  // }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </FormItem>
                        </FormItem>
                      )}
                    />
                  </div>
                  <p className="text-sm text-neutral-500">부터</p>
                  <div className="w-[200px]">
                    <FormField
                      control={form.control}
                      name="maxDate"
                      render={({ field: { value, onChange } }) => (
                        <FormItem>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-[200px] pl-3 text-left font-normal",
                                    !value && "text-muted-foreground"
                                  )}
                                >
                                  {value ? (
                                    moment(value).format("YYYY-MM-DD")
                                  ) : (
                                    <span>날짜선택</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                locale={ko}
                                mode="single"
                                selected={value}
                                onSelect={onChange}
                                // disabled={(date) =>
                                //   date > new Date() ||
                                //   date < new Date("1900-01-01")
                                // }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </FormItem>
                      )}
                    />
                  </div>
                  <p className="text-sm text-neutral-500">까지</p>
                </div>
              </div>
              <div className="flex-1 flex flex-row justify-end ">
                <Button
                  type="submit"
                  variant={"outline"}
                  className="flex flrow items-center gap-3"
                >
                  <MagnifyingGlassIcon className="size-4" />
                  <p className=" font-light">검색</p>
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>

      <div className=" w-full flex   flex-col items-start p-6 h-[80vh] overflow-y-auto">
        {searchData.length > 0 ? (
          <SearchTable tableData={searchData} totalCount={searchData.length} />
        ) : (
          <div className="flex flex-col items-center w-full h-full justify-center">
            <p>검색 결과가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
