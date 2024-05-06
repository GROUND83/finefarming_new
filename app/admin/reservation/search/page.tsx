"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
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

const formSchema = z.object({
  search: z.string().min(2, { message: "2자 이상 입력하세요." }),
  type: z.string().min(1, { message: "검색 필터를 선택하세요." }),
});

export default function Page() {
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [searchData, setSearchData] = React.useState<
    {
      id: number;
      reservationNumber: true;
      farm: {
        id: number;
        name: string;
      };
      checkInDate: Date;
      created_at: Date;
      status: string;
      user: {
        select: {
          id: number;
          username: string;
          phone: string;
          avatar: string;
        };
      };
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
      if (response.length > 0) {
        setSearchData(response);
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
    <div className="flex-1 p-3 bg-white w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-row items-center gap-3 bg-neutral-100 p-3 border rounded-md"
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
                      <SelectItem value="reservationNumber">
                        예약번호
                      </SelectItem>
                      <SelectItem value="farmName">농장명</SelectItem>
                      <SelectItem value="userName">예약자</SelectItem>
                      <SelectItem value="create">예약일</SelectItem>
                      <SelectItem value="status">예약상태</SelectItem>
                      <SelectItem value="checkIndate">방문일시</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
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
                      placeholder="예약번호,농장명,예약자,예약일,예약상태,방문일시"
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
        <FormDescription className="p-2">
          예약일 및 방문일은 예(2024-04-01),예약상태
          예(확정대기,예약완료,예약취소,방문완료,노쇼) 입력하세요.
        </FormDescription>
      </Form>

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
