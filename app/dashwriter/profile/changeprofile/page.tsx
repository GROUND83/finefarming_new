"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
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
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { changePasswrod, getUserData } from "../_component/actions";
import { useSession } from "next-auth/react";
const findPasswordSchema = z.object({
  password: z.string().min(1, { message: "비밀번호를 입력하세요." }),
  newpassword: z.string().min(1, { message: "새로운 비밀번호를 입력하세요." }),
});

export default function Page() {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const form = useForm<z.infer<typeof findPasswordSchema>>({
    resolver: zodResolver(findPasswordSchema),
    defaultValues: {
      password: "",
      newpassword: "",
    },
  });
  async function onSubmit(data: z.infer<typeof findPasswordSchema>) {
    console.log("data", data, session?.user);
    if (session?.user) {
      try {
        setLoading(true);
        let newData = JSON.stringify({
          userId: session?.user.id,
          password: data.password,
          newpassword: data.newpassword,
        });
        console.log("newData", newData);
        let result = await changePasswrod(newData);
        console.log(result);
        if (result?.error) {
          form.reset();
          return toast({
            variant: "destructive",
            title: result.error,
          });
        }

        if (result?.message) {
          toast({
            title: "비밀번호가 성공적으로 변경되었습니다.",
          });
          // router.refresh();
          router.push("/dashwriter/profile");
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
  }
  const checkUser = async (userId: number) => {
    let user = await getUserData(userId);
    if (user) {
      if (user.provider !== "email") {
        //
        router.refresh();
        router.push("/dashwriter/profile");
      }
    }
  };
  React.useEffect(() => {
    if (session?.user) {
      checkUser(session.user.id);
    }
  }, [session]);
  return (
    <div className="w-full ">
      <div className="flex flex-col items-center gap-3 lg:container lg:mx-auto  lg:py-12">
        {/* <div className="flex flex-col items-start  border p-12 w-full rounded-md">
          <p>전화번호 변경</p>
          <p>전화번호 입력</p>
          <p>변경할 전화번호 입력</p>
        </div> */}
        <div className="flex flex-col items-start  border p-12 w-full rounded-md">
          <p>비밀번호 변경</p>
          <Form {...form}>
            <form
              className="flex flex-col gap-6 w-full mt-3"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="비밀번호를 입력하세요."
                        type="password"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newpassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="새로운 비밀번호를 입력하세요."
                        type="password"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="mt-3" disabled={loading}>
                {loading ? <Loader2 className="size-4 animate-spin" /> : "변경"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
