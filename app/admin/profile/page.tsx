"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getUserData } from "@/lib/getUserData";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
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
import { changePasswrod } from "./_component/actions";

const findPasswordSchema = z.object({
  password: z.string().min(1, { message: "비밀번호를 입력하세요." }),
  newpassword: z.string().min(1, { message: "새로운 비밀번호를 입력하세요." }),
});

export default function Page() {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const [user, setUser] = React.useState<any>();

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
          router.push("/admin/farm");
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
  }
  const getUser = async () => {
    let userdata = await getUserData({
      userId: Number(session?.user.id),
      role: "manager",
    });
    console.log("userdata", userdata);
    if (userdata) {
      setUser(userdata);
    }
  };
  React.useEffect(() => {
    if (session?.user) {
      getUser();
    }
  }, [session]);

  //
  return (
    <div className="w-full p-2 flex flex-col items-start">
      <div className="p-3 w-full flex flex-row items-center justify-between border-b py-3">
        <div className="flex flex-col items-start w-full ">
          {user?.role === "manager" && <Badge>매니저</Badge>}
          {user?.role === "superAdmin" && <Badge>슈퍼어드민</Badge>}
          <span className="text-sm mt-3">{user?.username}</span>
          <div className="text-wrap  w-full">
            <p className="text-xs text-neutral-500 break-words ">
              {user?.email}
            </p>
          </div>
        </div>
        <Button
          size={"sm"}
          variant={"outline"}
          onClick={() => signOut()}
          className="flex gap-2 mt-3"
        >
          로그아웃
          <ArrowRightStartOnRectangleIcon className="size-4" />
        </Button>
      </div>
      {user?.role === "manager" && (
        <div className="p-6 border  mt-3">
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
      )}
    </div>
  );
}
