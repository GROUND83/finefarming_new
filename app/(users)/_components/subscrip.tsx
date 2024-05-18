"use client";
import Input from "@/components/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
import { updateSubscriper } from "./actions";
import { toast } from "sonner";

export const subScriberSchema = z.object({
  email: z.string(),
});

type optionSchemaType = z.infer<typeof subScriberSchema>;
export default function Subscrip() {
  const [updateLoading, setUpdateLoading] = React.useState(false);
  const form = useForm<optionSchemaType>({
    resolver: zodResolver(subScriberSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = form.handleSubmit(async (data: optionSchemaType) => {
    setUpdateLoading(true);
    if (data) {
      try {
        console.log("newdata", data);
        let JsonData = JSON.stringify(data);
        let result = await updateSubscriper(JsonData);
        console.log("result", result);
        toast.success("이메일 등록에 성공하였습니다.");
      } catch (e) {
        // console.log(e);
        toast.error("이미 등록된 이메일입니다.");
      } finally {
        form.reset();
        // reload();
        setUpdateLoading(false);
      }
    }
  });

  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className="flex flex-col lg:flex-row lg:items-center  items-start gap-3 w-full "
      >
        <div className="flex-1">
          <FormField
            control={form.control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <Input
                name="email"
                placeholder="이메일을 입력하세요."
                required
                value={value}
                onChange={onChange}
              />
            )}
          />
        </div>

        <Button type="submit" className=" ">
          최신 소식 받아보기
        </Button>
      </form>
    </Form>
  );
}
