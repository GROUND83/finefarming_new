"use client";
import React, { useRef } from "react";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  ExclamationCircleIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { notFound, useRouter } from "next/navigation";
import { EditType, editSchema } from "../components/new/editSchema";
import Input from "@/components/input";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import {
  deleteData,
  getDeatailData,
  updateData,
} from "../components/detail/detailActions";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { getUploadUrl } from "@/lib/uploadUrl";
import { empty_avatar_url } from "@/lib/constants";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import moment from "moment";

export const dynamic = "force-static";
export const dynamicParams = false;
//
export default function page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [imageUrlUpload, setImageUrlUpload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updateloading, setUpdateLoading] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [originaAvatar, setOriginalAvatar] = useState("");
  const [preview, setPreview] = useState("");
  const [uploadUrl, setUploadUrl] = useState("");
  const [created_at, setCreated] = useState<any>("");
  const [file, setFile] = useState<File | null>(null);
  const maimImageRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { isDirty, errors },
  } = useForm<EditType>({
    resolver: zodResolver(editSchema),
  });

  React.useEffect(() => {
    const getUserData = async () => {
      const id = Number(params.id);
      if (isNaN(id)) {
        notFound();
      }
      try {
        setLoading(true);
        const manager = await getDeatailData(id);
        console.log("manager", manager);
        if (!manager) {
          notFound();
        }
        if (manager) {
          reset({
            id: manager.id ?? "",
            avatar: manager.avatar ?? "",
            email: manager.email ?? "",
            phone: manager.phone ?? "",
            username: manager.username ?? "",
            approve: manager.approve,
          });
          if (manager.avatar) {
            console.log(manager.avatar);
            setOriginalAvatar(manager.avatar);
          }
          if (manager.created_at) {
            setCreated(manager.created_at);
          }
        }
      } catch (e) {
        // router.push("/admin/user/farmer");
        // notFound();
      } finally {
        setLoading(false);
      }
    };
    getUserData();
  }, [params]);
  //

  const onMainImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setImageUrlUpload(true);
    console.log(event.target.files);
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
    // url 생성 => 브라우져에서 보기위해
    const url = URL.createObjectURL(file);
    console.log(url);
    setPreview(url);
    setFile(file);
    const { success, result } = await getUploadUrl();
    console.log(result);
    if (success) {
      const { id, uploadURL } = result;
      setUploadUrl(uploadURL);
      setValue(
        "avatar",
        `https://imagedelivery.net/8GmAyNHLnOsSkmaGEU1nuA/${id}/avatar`,
        { shouldDirty: true }
      );
    }
    setImageUrlUpload(false);
  };
  //
  const onSubmit = handleSubmit(async (data: EditType) => {
    // 업로드 이미지
    console.log("etdata", data);
    // if (!file) {
    //   return;
    // }
    setUpdateLoading(true);
    if (file) {
      const cloudflareForm = new FormData();
      cloudflareForm.append("file", file);
      const response = await fetch(uploadUrl, {
        method: "POST",
        body: cloudflareForm,
      });
      if (response.status !== 200) {
        return;
      }
    }
    console.log("data.approve", data.approve, typeof data.approve);
    const formData = new FormData();
    formData.append("id", params.id);
    formData.append("username", data.username);
    formData.append("phone", data.phone);
    formData.append("email", data.email);
    formData.append("avatar", data.avatar);
    formData.append("approve", data.approve.toString());
    console.log(formData, data.approve);

    try {
      const result = await updateData(formData);
      if (result) {
        toast({
          duration: 3000,
          title: "수정완료",
          description: "데이터 수정이 완료 되었습니다.",
        });
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
      setUpdateLoading(false);
      window.location.reload();
    }
  });
  const onValid = async () => {
    await onSubmit();
  };
  const deleteItem = async () => {
    //
    console.log("delete");
    setDeleteLoading(true);
    //
    try {
      const formData = new FormData();
      formData.append("id", params.id);
      const result = await deleteData(formData);
      if (result) {
        toast({
          title: "삭제 완료",
          description: "삭제 완료 되었습니다.",
        });
        router.push("/admin/manager");
      }
    } catch (e) {
      toast({
        variant: "destructive",
        title: "삭제 ERROR",
        description: `${e}`,
      });
    }
    setDeleteLoading(false);
  };
  return (
    <div className=" w-full  flex-1 flex flex-col items-start   ">
      {loading ? (
        <div className="w-full  flex flex-col items-center justify-center flex-1">
          <Loader2 className="size-12 animate-spin text-primary" />
        </div>
      ) : (
        <div className="w-full  gap-3 flex-1   flex ">
          <div className="p-6 flex-1 border rounded-md bg-white  flex flex-col items-start justify-between">
            <form
              className="w-full flex flex-col items-start gap-6 text-sm"
              action={onValid}
            >
              <div className="w-full gap-4">
                <div className="flex flex-col items-center justify-center gap-3 w-[300px]  ">
                  <div className="flex flex-col items-start gap-3 relative">
                    {preview === "" ? (
                      <>
                        {originaAvatar ? (
                          <div className="rounded-full overflow-hidden  relative">
                            <Image
                              src={`${getValues("avatar")}`}
                              alt="profile"
                              priority
                              width={80}
                              height={80}
                            />
                          </div>
                        ) : (
                          <div className="rounded-full overflow-hidden   relative flex flex-col items-center justify-center border">
                            <Image
                              src={`${empty_avatar_url}`}
                              width={80}
                              height={80}
                              alt="profile"
                              priority
                            />
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="rounded-full overflow-hidden  relative border">
                        <Image
                          src={preview}
                          width={80}
                          height={80}
                          alt="profile"
                          priority
                        />
                      </div>
                    )}
                    {!preview && (
                      <Button
                        disabled={imageUrlUpload}
                        onClick={(e) => {
                          e.preventDefault();
                          maimImageRef.current?.click();
                        }}
                        className={` border flex flex-col items-center justify-center   cursor-pointer   text-sm  absolute top-0 right-0  w-8 h-8 rounded-full `}
                      >
                        <PencilIcon className="size-3" />
                      </Button>
                    )}
                    <input
                      type="file"
                      id="avatar"
                      name="avatar"
                      accept="image/*"
                      className="hidden"
                      onChange={onMainImageChange}
                      ref={maimImageRef}
                    />
                    {preview && (
                      <span
                        className=" cursor-pointer absolute top-0 right-0"
                        onClick={() => {
                          console.log("originaAvatar", originaAvatar);
                          setPreview("");
                          if (originaAvatar) {
                            setValue("avatar", originaAvatar, {
                              shouldDirty: true,
                            });
                          } else {
                            setValue("avatar", "", { shouldDirty: true });
                          }
                          setUploadUrl("");
                          setFile(null);
                          if (maimImageRef.current) {
                            maimImageRef.current.value = "";
                          }
                        }}
                      >
                        <XCircleIcon className="size-8 text-red-500" />
                      </span>
                    )}
                  </div>
                  <div>
                    {errors.avatar?.message ? (
                      <p>{errors.avatar?.message}</p>
                    ) : null}
                  </div>
                </div>
                <div className="col-span-12  gap-6 w-full flex flex-col items-start ">
                  <div className="gap-1 flex flex-col w-full ">
                    <p className="text-neutral-600 text-sm font-semibold">
                      이름
                    </p>
                    <Input
                      type="text"
                      {...register("username")}
                      placeholder="농장주 성함을 입력하세요."
                      required
                      errors={[errors.username?.message ?? ""]}
                    />
                  </div>
                  <div className="gap-1 flex flex-col w-full ">
                    <p className="text-neutral-600 text-sm font-semibold">
                      이메일
                    </p>
                    <Input
                      type="email"
                      {...register("email")}
                      placeholder="이메일을 입력하세요."
                      required
                      errors={[errors.email?.message ?? ""]}
                    />
                    <p className="text-xs text-neutral-500"></p>
                  </div>
                  <div className="gap-1 flex flex-col w-full ">
                    <p className="text-neutral-600 text-sm font-semibold">
                      휴대폰
                    </p>
                    <Input
                      type="tel"
                      {...register("phone")}
                      pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
                      placeholder="010-0000-0000"
                      required
                      errors={[errors.phone?.message ?? ""]}
                    />
                  </div>
                  <div className="gap-1 flex flex-col w-full ">
                    <div className="gap-3 flex flex-row items-center w-full ">
                      <Switch
                        name="approve"
                        checked={getValues("approve")}
                        onCheckedChange={(checked) =>
                          setValue("approve", Boolean(checked), {
                            shouldDirty: true,
                          })
                        }
                        id="approve"
                      />
                      <Label
                        htmlFor="approve"
                        className="text-neutral-600 text-sm font-semibold"
                      >
                        {getValues("approve") ? "승인" : "미승인"}
                      </Label>
                    </div>
                    <div className="text-neutral-500 flex flex-row gap-1">
                      <ExclamationCircleIcon className="size-4" />
                      <p className="text-xs ">
                        승인된 사용자는 사이트 이용이 활성화 됩니다.
                      </p>
                    </div>
                  </div>
                  <div className="gap-1 flex flex-col w-full ">
                    <p className="text-neutral-600 text-sm font-semibold">
                      가입일
                    </p>
                    {created_at && (
                      <p className="text-xs ">
                        {moment(created_at).format("YYYY년MM월DD일")}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start  w-full mt-1  gap-2">
                <Button
                  type="submit"
                  disabled={!isDirty || updateloading}
                  className="w-full font-semibold"
                  variant={`${isDirty ? "default" : "outline"}`}
                >
                  {updateloading ? (
                    <Loader2 className=" animate-spin size-4" />
                  ) : (
                    "수정"
                  )}
                </Button>
                <div className="text-neutral-500 flex flex-row gap-1">
                  <ExclamationCircleIcon className="size-4" />
                  <p className="text-xs  text-neutral-500">
                    새로운 값 입력 시 활성화 됩니다.
                  </p>
                </div>
              </div>
            </form>
            <div className="mt-3">
              <AlertDialog open={deleteAlert}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      매거진 작가를 삭제하겠습니까?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      매거진 작가를 삭제하면 매거진 데이터도 삭제되어 복구되지
                      않습니다.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setDeleteAlert(false)}>
                      취소
                    </AlertDialogCancel>

                    <Button
                      disabled={deleteLoading}
                      className=" px-12"
                      variant="destructive"
                      onClick={() => deleteItem()}
                    >
                      {deleteLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        "삭제"
                      )}
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <div className=" w-full  flex flex-col items-end">
              <Button
                onClick={() => setDeleteAlert(true)}
                variant="ghost"
                size={"icon"}
              >
                <TrashIcon className="size-6 text-destructive" />
              </Button>
            </div>
          </div>
          <div className="w-full  p-6  col-span-8 bg-white border rounded-md">
            <p>매거진</p>
          </div>
        </div>
      )}
    </div>
  );
}
