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
import Link from "next/link";
import dayjs from "dayjs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [reviewsData, setReviewsData] = useState<any[]>([]);
  const [reservationData, setReservationData] = useState<any[]>([]);
  const [communityData, setCommunityData] = useState<any[]>([]);
  const [imageUrlUpload, setImageUrlUpload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updateloading, setUpdateLoading] = useState(false);
  const [provider, setProvider] = useState("");
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [originaAvatar, setOriginalAvatar] = useState("");
  const [preview, setPreview] = useState("");
  const [uploadUrl, setUploadUrl] = useState("");
  const [created_at, setCreated] = useState<any>("");
  const [file, setFile] = useState<File | null>(null);
  const maimImageRef = useRef<HTMLInputElement>(null);

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
        const customer = await getDeatailData(id);
        console.log("customer", customer);
        setReservationData(customer.reservation);
        setReviewsData(customer.reviews);
        if (!customer) {
          notFound();
        }
        if (customer) {
          reset({
            id: customer.id ?? "",
            avatar: customer.avatar ?? "",
            email: customer.email ?? "",
            phone: customer.phone ?? "",
            username: customer.username ?? "",
            approve: customer.approve,
          });
          if (customer.avatar) {
            console.log(customer.avatar);
            setOriginalAvatar(customer.avatar);
          }
          if (customer.created_at) {
            setCreated(customer.created_at);
          }
          if (customer.provider) {
            setProvider(customer.provider);
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
        toast.success("데이터 수정이 완료 되었습니다.");
      }
    } catch (e: any) {
      console.log(e);
      toast.error(e);
    } finally {
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
        toast.success("삭제 완료 되었습니다.");
        router.push("/admin/customer");
      }
    } catch (e: any) {
      toast.error(e);
    }
    setDeleteLoading(false);
  };
  return (
    <div className=" w-full  flex-1 flex flex-col items-start  p-3 ">
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
                              src={`${
                                getValues("avatar")
                                  ? getValues("avatar")
                                  : empty_avatar_url
                              }`}
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
                      placeholder="고객 성함을 입력하세요."
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
                    <AlertDialogTitle>고객을 삭제하겠습니까?</AlertDialogTitle>
                    <AlertDialogDescription>
                      고객을 삭제하면 관련된 리뷰,커뮤니티,주문내역도 삭제되어
                      복구되지 않습니다.
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
                type="button"
                onClick={() => setDeleteAlert(true)}
                variant="ghost"
                size={"icon"}
              >
                <TrashIcon className="size-6 text-destructive" />
              </Button>
            </div>
          </div>
          <div className="w-full  p-6  col-span-8 bg-white border rounded-md grid grid-cols-3 gap-3">
            <div className="col-span-1 p-3 flex flex-col items-start border rounded-md">
              <p>주문내역</p>
              <ScrollArea className="w-full flex flex-col items-start gap-2 mt-3 h-[600px]">
                {reservationData.length > 0 ? (
                  <div className="flex flex-col w-full gap-3 items-start">
                    {reservationData.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="flex flex-row items-center w-full p-3 border rounded-md justify-between"
                        >
                          <div>
                            <p className=" font-semibold text-sm">
                              {item.reservationNumber}
                            </p>
                            <p className="text-neutral-500  text-sm">
                              {dayjs(item.created_at).format("YYYY-MM-DD")}
                            </p>
                          </div>
                          <div>
                            <Button asChild size={"sm"} variant={"outline"}>
                              <Link href={`/admin/reservation/${item.id}`}>
                                자세히보기
                              </Link>
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div>
                    <p>예약 내역이 없습니다.</p>
                  </div>
                )}
              </ScrollArea>
            </div>
            <div className="col-span-1 p-3 flex flex-col items-start border rounded-md">
              <p>체험후기</p>
              <ScrollArea className="w-full flex flex-col items-start gap-2 mt-3 h-[600px]">
                {reviewsData.length > 0 ? (
                  <div className="flex flex-col w-full gap-3 items-start">
                    {reviewsData.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="flex flex-row items-center w-full p-3 border rounded-md justify-between"
                        >
                          <div>
                            <p className=" font-semibold text-sm">
                              {item.title}
                            </p>
                            <p className="text-neutral-500  text-sm">
                              {dayjs(item.created_at).format("YYYY-MM-DD")}
                            </p>
                          </div>
                          <div>
                            <Button asChild size={"sm"} variant={"outline"}>
                              <Link href={`/admin/review/${item.id}`}>
                                자세히보기
                              </Link>
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div>
                    <p>체험후기 내역이 없습니다.</p>
                  </div>
                )}
              </ScrollArea>
            </div>
            <div className="col-span-1 p-3 flex flex-col items-start border rounded-md">
              <p>커뮤니티</p>
              <ScrollArea className="w-full flex flex-col items-start gap-2 mt-3 h-[600px]">
                {communityData.length > 0 ? (
                  <div className="flex flex-col w-full gap-3 items-start">
                    {communityData.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="flex flex-row items-center w-full p-3 border rounded-md justify-between"
                        >
                          <div>
                            <p className=" font-semibold text-sm">
                              {item.title}
                            </p>
                            <p className="text-neutral-500  text-sm">
                              {dayjs(item.created_at).format("YYYY-MM-DD")}
                            </p>
                          </div>
                          <div>
                            <Button asChild size={"sm"} variant={"outline"}>
                              <Link href={`/admin/community/${item.id}`}>
                                자세히보기
                              </Link>
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div>
                    <p>커뮤니티 내역이 없습니다.</p>
                  </div>
                )}
              </ScrollArea>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
