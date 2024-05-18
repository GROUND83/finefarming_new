"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
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

import React from "react";
import { SearchTable } from "./searchTable";
import searchDatabase from "./searchActions";
import { toast } from "sonner";

const formSchema = z.object({
  search: z.string().min(2, { message: "2자 이상 입력하세요." }),
  type: z.string().min(1, { message: "검색 필터를 선택하세요." }),
});

export default function Search() {
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
      search: "",
      type: "",
    },
    mode: "onSubmit",
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("values", values);
    let response = await searchDatabase(values);
    console.log("searchData", searchData);

    //   show search Modal
    if (response) {
      let newData = JSON.parse(response);
      if (newData.length > 0) {
        setSearchData(newData);
        setModalOpen(true);
      } else {
        setSearchData([]);
        setModalOpen(true);
      }
    }
  }

  React.useEffect(() => {
    // do your logic here
    if (form.formState.errors.search) {
      console.log(form.formState.errors);
      toast.error(`${form.formState.errors.search?.message}`);
    }
    if (form.formState.errors.type) {
      console.log(form.formState.errors);
      toast.error(`${form.formState.errors.type?.message}`);
    }
  }, [form.formState.errors]);
  return (
    <div className="flex-1">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-row items-center gap-3"
        >
          <div className="w-[100px]">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="검색필터" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="username">이름</SelectItem>
                      <SelectItem value="phone">전화번호</SelectItem>
                      <SelectItem value="email">이메일</SelectItem>
                    </SelectContent>
                  </Select>
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1">
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="이름, 전화번호, 이메일 검색"
                      {...field}
                      id="search"
                      className="flex-1 w-full"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            variant={"outline"}
            className="flex flrow items-center gap-3"
          >
            <MagnifyingGlassIcon className="size-4" />
            <p className=" font-light">검색</p>
          </Button>
        </form>
      </Form>
      <Dialog open={modalOpen}>
        <DialogContent className="w-[90vw] flex flex-col items-start">
          <div className="p-3 flex flex-row items-center justify-between w-full border-b">
            <div className="flex flex-col items-start gap-1 justify-center">
              <p className="text-md font-light">검색결과</p>
              <div className="flex flex-row items-center gap-1 text-xs">
                <p className="text-xs text-neutral-400">검색필터</p>
                <p className="text-xs">
                  {form.getValues("type") === "phone" ? "전화번호" : "이름"},
                </p>
                <p className="text-xs text-neutral-400">검색어</p>
                <p className="  ">{form.getValues("search")}</p>
                <p className="text-xs text-neutral-400">
                  에 대한 검색결과는 다음과 같습니다.
                </p>
              </div>
            </div>
            <Button
              size={"icon"}
              variant={"outline"}
              onClick={() => setModalOpen(false)}
            >
              <XCircle className="size-4" />
            </Button>
          </div>

          <div className=" w-full flex   flex-col items-start p-6 h-[80vh] overflow-y-auto">
            {searchData.length > 0 ? (
              <SearchTable
                tableData={searchData}
                totalCount={searchData.length}
              />
            ) : (
              <div className="flex flex-col items-center w-full h-full justify-center">
                <p>검색 결과가 없습니다.</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
