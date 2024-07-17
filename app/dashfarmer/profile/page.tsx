"use client";
import { Button } from "@/components/ui/button";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import getWriter from "../actions";
import React, { useRef } from "react";
import { updateUser, getUserData } from "./_component/actions";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { farmerSchema, farmerSchemaType } from "./_component/writerSchema";
import SubSectionWrap from "@/app/admin/_component/subSectionWrap";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoadingEditSubmitButton } from "@/components/ButtonComponent";
import Image from "next/image";
import { PlusIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getUploadUrl } from "@/lib/uploadUrl";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { toast } from "sonner";

// async function getUserData() {
//   const user = await getWriter();
//   if (user) {
//     console.log("user", user);
//     return user;
//   }
//   notFound();
// }
// async function Username() {
//   //await new Promise((resolve) => setTimeout(resolve, 10000));
//   const user = await getUserData();
//   const logOut = async () => {
//     "use server";
//     const session = await getSession();
//     session.destroy();
//     redirect("/");
//   };
//   return (
//     <div className="flex flex-row  items-start justify-between gap-2 border rounded-md p-2 w-full">
//       <div className="">
//         <h1 className="">Welcome!</h1>
//         <p className="text-sm">{user?.username}</p>
//       </div>
//       {/* <p className="text-xs text-neutral-500">{user?.email}</p> */}
//       <form action={logOut}>
//         <Button>로그아웃</Button>
//       </form>
//     </div>
//   );
// }
export default function Page() {
  const [user, setUser] = React.useState<{
    link: string | null;
    id: number;
    username: string | null;
    email: string | null;
    avatar: string | null;
    intruduceTitle: string | null;
    intruduce: string | null;
  } | null>();

  const [loading, setLoading] = React.useState(false);
  const [updateloading, setUpdateLoading] = React.useState(false);
  const imageRef = useRef<any>(null);

  const { data: session } = useSession();

  //
  // const getUser = async () => {
  //   let session = await getSession();
  //   console.log(session);
  //   if (session.id) {
  //     let user = await getUserData(session.id?.toString());
  //     console.log(user);
  //     setUser(user);
  //   }
  //   //
  // };
  // React.useEffect(() => {
  //   //
  //   getUser();
  // }, []);

  const reload = async () => {
    console.log("session", session);
    if (session) {
      setLoading(true);

      try {
        setLoading(true);
        let userId = session.user.id;
        let response = await getUserData(userId);
        console.log("response", response);

        if (!response) {
          notFound();
        }
        form.reset({
          id: response.id ?? undefined,
          username: response.username ?? undefined,
          email: response.email ?? undefined,
          avatar: {
            image: response.avatar ?? undefined,
            uploadUrl: response.avatar ?? undefined,
            downUrl: response.avatar ?? undefined,
            file: "",
          },
          phone: response.phone ?? undefined,
          approve: response.approve ?? undefined,
          provider: response.provider ?? undefined,
        });
      } catch (e) {
        // router.push("/admin/user/farmer");
        // notFound();
        console.log(e);
      } finally {
        setLoading(false);
      }
      setLoading(false);
    }
  };

  const form = useForm<farmerSchemaType>({
    resolver: zodResolver(farmerSchema),
    defaultValues: {},
  });
  const onSubmit = form.handleSubmit(async (data) => {
    console.log("data", data, data.id);
    let formData = new FormData();
    if (data) {
      if (data.avatar.file) {
        const mainImageUpload = new FormData();
        mainImageUpload.append("file", data.avatar.file);
        const response = await fetch(data.avatar.uploadUrl, {
          method: "POST",
          body: mainImageUpload,
        });
        console.log("response", response);
        if (response.status !== 200) {
          return;
        }
        formData.append("avatar", `${data.avatar.downUrl}/avatar`);
      } else {
        formData.append("avatar", `${data.avatar.downUrl}`);
      }
      formData.append("userId", data.id.toString());
      formData.append("phone", data.phone);
      formData.append("username", data.username);
      formData.append("email", data.email);
      let result = await updateUser(formData);
      console.log(result);
      if (result) {
        toast.success("업데이트 성공하였습니다.");
        reload();
      }
    }
  });
  const onMainImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(event.target, event.target.name);
    const {
      target: { files },
    } = event;
    if (!files) {
      return;
    }
    const file = files[0];
    console.log(file);
    if (file.size > 2000000) {
      alert("이미지 사이즈가 2mb를 초과 하였습니다.");
      return;
    }

    const url = URL.createObjectURL(file);
    console.log(url);

    const { success, result } = await getUploadUrl();
    console.log(result);
    if (success) {
      const { id, uploadURL } = result;

      form.setValue(
        "avatar",
        {
          image: url,
          uploadUrl: uploadURL,
          downUrl: `https://imagedelivery.net/8GmAyNHLnOsSkmaGEU1nuA/${id}`,
          file: file,
        },
        { shouldDirty: true }
      );
    }
  };
  React.useEffect(() => {
    reload();
  }, [session]);
  return (
    <div className=" w-full  flex-1 flex flex-col items-start    ">
      <SubSectionWrap isLoading={loading}>
        <div className="flex flex-row items-center gap-3">
          <Button type="button" asChild variant={"outline"}>
            <Link href={"/dashfarmer/profile/changeprofile"}>
              비밀번호 수정
            </Link>
          </Button>
          <Button type="button" onClick={() => signOut()}>
            로그아웃
          </Button>
        </div>
        <Form {...form}>
          <form
            className="w-full flex flex-col items-start gap-6 mt-6 "
            onSubmit={onSubmit}
          >
            <div className="w-full bg-white border gap-2 p-12 flex flex-col items-start justify-center">
              <FormField
                control={form.control}
                name="avatar"
                render={({ field: { onChange, onBlur, value, ref } }) => {
                  return (
                    <div>
                      {value?.image && (
                        <div>
                          <div className=" h-[100px]  aspect-square  rounded-full relative overflow-hidden bg-white">
                            <Image
                              src={value.image}
                              alt="아바타"
                              fill
                              priority
                              className="z-10 w-full h-full"
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              form.setValue(
                                "avatar",
                                {
                                  image: "",
                                  uploadUrl: "",
                                  downUrl: "",
                                  file: "",
                                },
                                {
                                  shouldTouch: true,
                                  shouldDirty: true,
                                }
                              );
                              if (imageRef?.current) {
                                imageRef.current.value = null;
                              }
                            }}
                            className="text-xs  underline text-red-500   "
                          >
                            삭제
                          </button>
                        </div>
                      )}
                      <div>
                        <div className="p-6 text-black ">
                          {!value?.image && (
                            <label
                              htmlFor="mainImage"
                              className=" text-sm flex flex-row items-center w-[100px] h-[100px] gap-2  border bg-white p-2 cursor-pointer  rounded-full"
                            >
                              <PlusIcon className="w-4" />
                              <p className="text-xs">사진을 추가해주세요.</p>
                            </label>
                          )}
                          <FormMessage />
                        </div>

                        <input
                          ref={imageRef}
                          type="file"
                          accept="image/*"
                          id="mainImage"
                          className="hidden"
                          name="mainImage"
                          onChange={onMainImageChange}
                        />
                      </div>
                    </div>
                  );
                }}
              />
              <div className="flex flex-col items-start gap-3 ">
                <FormField
                  control={form.control}
                  name={`username`}
                  render={({ field: { onChange, onBlur, value, ref } }) => {
                    return (
                      <FormItem className=" ">
                        <FormLabel className="text-sm font-semibold">
                          이름
                        </FormLabel>
                        <Input
                          value={value || ""}
                          onChange={onChange}
                          placeholder="소타이틀 입력"
                        />
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div className="flex flex-row items-center gap-2">
                <FormField
                  control={form.control}
                  name={`email`}
                  render={({ field: { onChange, onBlur, value, ref } }) => {
                    return (
                      <FormItem className="w-[300px] ">
                        <FormLabel className="text-sm font-semibold">
                          이메일
                        </FormLabel>
                        <Input
                          value={value || ""}
                          onChange={onChange}
                          className=" resize-none"
                          placeholder="이메일"
                        />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name={"phone"}
                  render={({ field: { onChange, onBlur, value, ref } }) => {
                    return (
                      <FormItem className="w-[300px] ">
                        <FormLabel className="text-sm font-semibold">
                          연락처
                        </FormLabel>
                        <Input
                          value={value || ""}
                          onChange={onChange}
                          className=" resize-none"
                          placeholder="연락처"
                        />
                      </FormItem>
                    );
                  }}
                />
              </div>

              <div className="  mt-3 w-full flex flex-col items-end mt-6">
                <LoadingEditSubmitButton
                  loading={updateloading}
                  disabled={
                    !form.formState.isDirty ||
                    form.formState.isSubmitting ||
                    updateloading
                  }
                />
              </div>
            </div>
          </form>
        </Form>
      </SubSectionWrap>
    </div>
  );
}
