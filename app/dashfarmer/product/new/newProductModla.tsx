"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon, XIcon } from "lucide-react";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  ExclamationCircleIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { productNewSchema, productNewSchemaType } from "./newSchema";

import { getFarm, productCreateData } from "./actions";
import { toast } from "sonner";

export default function NewProductModal() {
  const [updateloading, setUpdateLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [farms, setFarms] = React.useState<any>([]);

  //
  const form = useForm<productNewSchemaType>({
    resolver: zodResolver(productNewSchema),
    defaultValues: {
      farmId: "",
      title: "",
      description: "",
    },
  });
  const onSubmit = form.handleSubmit(async (data: productNewSchemaType) => {
    // 업로드 이미지
    console.log("etdata", data);
    // if (!file) {
    //   return;
    // }
    setUpdateLoading(true);

    // console.log("data.approve", data.approve, typeof data.approve);
    const formData = new FormData();
    formData.append("farmId", data.farmId);
    formData.append("title", data.title);
    formData.append("description", data.description);

    try {
      const result = await productCreateData(formData);
      if (result) {
        toast.success("데이터 수정이 완료 되었습니다.");
      }
    } catch (e: any) {
      console.log(e);
      toast.error(e);
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setUpdateLoading(false);
      window.location.reload();
    }
  });
  const getFarmdata = async () => {
    let farms = await getFarm();
    console.log("farms", farms);
    setFarms(farms);
  };
  React.useEffect(() => {
    getFarmdata();
  }, []);
  return (
    <div>
      <Button size={"sm"} onClick={() => setOpen(true)}>
        <PlusIcon className="size-4" />
        상품추가
      </Button>
      <Dialog open={open}>
        <DialogContent className="w-[80vw] rounded-md p-6">
          <div className="flex flex-row items-center justify-between w-full">
            <p>상품추가</p>
            <Button
              size={"icon"}
              variant={"ghost"}
              onClick={() => setOpen(false)}
            >
              <XIcon className="size-4" />
            </Button>
          </div>
          <div className="w-full  ">
            <Form {...form}>
              <form
                className="w-full flex flex-col items-start gap-6  text-xs"
                onSubmit={onSubmit}
              >
                <h1 className=" font-semibold text-sm">기본 정보</h1>

                <div className="w-full flex flex-row items-start gap-6 px-6 border-b pb-12">
                  <div className="col-span-1 grid grid-cols-2 gap-3 flex-1">
                    <div className="col-span-1 gap-1 flex flex-col">
                      <FormField
                        control={form.control}
                        name="farmId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>농장</FormLabel>
                            <Select
                              onValueChange={(event) => {
                                form.setValue("farmId", event);
                              }}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="농장을 선택하세요." />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {farms.length > 0 &&
                                  farms.map((item: any, index: any) => {
                                    return (
                                      <SelectItem
                                        value={item.id.toString()}
                                        key={item.id}
                                      >
                                        {item.name}
                                      </SelectItem>
                                    );
                                  })}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="col-span-1 gap-1 flex flex-col">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field: { value, onChange } }) => (
                          <FormItem className="flex flex-col items-start ">
                            <FormLabel>상품 이름</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                value={value}
                                placeholder="상품 이름을 입력하세요."
                                onChange={onChange}
                                required
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="col-span-1 gap-1 flex flex-col">
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field: { value, onChange } }) => (
                          <FormItem className="flex flex-col items-start ">
                            <FormLabel>추가 설명</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                value={value}
                                placeholder="추가 설명을 입력하세요."
                                onChange={onChange}
                                required
                              />
                            </FormControl>
                            <FormDescription className="flex flex-row items-center gap-2">
                              <ExclamationCircleIcon className="size-4" />
                              상품 이름 하단에 표시되는 안내 문구 입니다.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-row items-center justify-end  w-full ">
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
