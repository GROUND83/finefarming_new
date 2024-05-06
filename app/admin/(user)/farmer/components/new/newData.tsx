"use client";
import React, { useRef } from "react";
import Input from "@/components/input";
import { PlusIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import ButtonCustom from "@/components/button";
import { XIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { upLoadData } from "./newActions";
import { Button } from "@/components/ui/button";
import { newSchemaType, newSchema } from "./newSchema";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { getUploadUrl } from "@/lib/uploadUrl";
import { empty_avatar_url } from "@/lib/constants";
import { useRouter } from "next/navigation";
//
export default function NewFarmer() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [preview, setPreview] = useState("");
  const [uploadUrl, setUploadUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const maimImageRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,

    formState: { errors },
  } = useForm<newSchemaType>({
    resolver: zodResolver(newSchema),
  });
  const onCloseModal = () => {
    //
    setPreview("");
    setUploadUrl("");
    setFile(null);
    if (maimImageRef.current) {
      maimImageRef.current.value = "";
    }
    reset();
    setModalOpen(false);
    window.location.reload();
  };
  const onMainImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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
        `https://imagedelivery.net/8GmAyNHLnOsSkmaGEU1nuA/${id}/avatar`
      );
    }
  };
  const checkImage = async () => {
    //
    if (file) {
      //
    } else {
      setValue("avatar", empty_avatar_url);
    }
    await onSubmit();
  };
  const onSubmit = handleSubmit(async (data: newSchemaType) => {
    // 업로드 이미지
    if (file) {
      const cloudflareForm = new FormData();
      cloudflareForm.append("file", file);
      // 시잔 업로드
      const response = await fetch(uploadUrl, {
        method: "POST",
        body: cloudflareForm,
      });
      if (response.status !== 200) {
        return;
      }
    }
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("phone", data.phone);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    if (data.avatar) {
      formData.append("avatar", data.avatar);
    } else {
      formData.append("avatar", empty_avatar_url);
    }
    await upLoadData(formData);
    onCloseModal();
  });
  const onValid = async () => {
    checkImage();
  };
  return (
    <div>
      <Button
        onClick={() => setModalOpen(true)}
        className="flex flex-row items-center gap-3  font-light"
        size={"sm"}
      >
        <PlusIcon className="size-4" />
        농장주
      </Button>
      <Dialog open={modalOpen}>
        <DialogContent className="max-w-[90vw] ">
          <div className="bg-white w-full rounded-md">
            <div className="flex flex-row items-center justify-between p-6 border-b">
              <div>
                <h1 className="text-lg font-semibold">농장주 추가</h1>
                <p className="text-neutral-500 text-sm">
                  농장주 데이터를 추가하세요.
                </p>
              </div>

              <Button
                variant={"outline"}
                size="icon"
                className="flex flex-row items-center gap-3"
                onClick={() => onCloseModal()}
              >
                <XIcon className="size-4" />
              </Button>
            </div>
            <div className="w-full overflow-y-auto p-6">
              <form
                className="w-full flex flex-col items-start gap-6"
                action={onValid}
              >
                <div className="w-full grid grid-cols-12 gap-6">
                  <div className="flex flex-col items-center justify-center gap-3  col-span-4">
                    <div className="flex flex-col items-start gap-3 relative">
                      <label
                        htmlFor="avatar"
                        className="  aspect-square rounded-full flex flex-col items-center justify-center  bg-center cursor-pointer bg-cover w-40"
                        style={{
                          backgroundImage: preview
                            ? `url(${preview})`
                            : `url(${empty_avatar_url})`,
                        }}
                      >
                        <input
                          type="file"
                          id="avatar"
                          name="avatar"
                          accept="image/*"
                          className="hidden"
                          onChange={onMainImageChange}
                          ref={maimImageRef}
                        />
                      </label>
                      {preview && (
                        <span
                          className=" cursor-pointer absolute top-2 right-0"
                          onClick={() => {
                            setPreview("");
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
                      ) : (
                        <p className="text-neutral-600 text-xs">
                          프로필 사진을 추가하세요.
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-span-8 grid grid-cols-12 gap-6">
                    <div className="col-span-6 gap-1 flex flex-col">
                      <p className="text-neutral-600 text-sm font-semibold">
                        이름
                      </p>
                      <Input
                        type="text"
                        placeholder="농장주 성함을 입력하세요."
                        required
                        {...register("username")}
                        errors={[errors.username?.message ?? ""]}
                      />
                    </div>

                    <div className="col-span-6 gap-1 flex flex-col">
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

                      <div className="text-neutral-500 flex flex-row gap-1">
                        <ExclamationCircleIcon className="size-4" />
                        <p className="text-xs ">
                          농장주 로그인시 아이디로 사용됩니다.
                        </p>
                      </div>
                      <p className="text-xs text-neutral-500"></p>
                    </div>
                    <div className="col-span-6 gap-1 flex flex-col">
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
                      <div className="text-neutral-500 flex flex-row gap-1">
                        <ExclamationCircleIcon className="size-4" />
                        <p className="text-xs ">
                          상세 페이지에서 고객에게 두 번째로 노출되는 연락처
                        </p>
                      </div>
                    </div>
                    <div className="col-span-6 gap-1 flex flex-col font-semibold"></div>
                    <div className="col-span-6 gap-1 flex flex-col ">
                      <p className="text-neutral-600 text-sm font-semibold">
                        임시 비밀번호
                      </p>
                      <Input
                        type="password"
                        {...register("password")}
                        placeholder="임시 비밀번호를 입력하세요."
                        required
                        errors={[errors.password?.message ?? ""]}
                      />

                      <div className="text-neutral-500 flex flex-row gap-1">
                        <ExclamationCircleIcon className="size-4" />
                        <p className="text-xs ">
                          소문자,대문자,숫자,특수문자를 포함 4자이상 이어야
                          합니다.
                        </p>
                      </div>
                    </div>
                    <div className="col-span-6 gap-1 flex flex-col ">
                      <p className="text-neutral-600 text-sm font-semibold">
                        임시 비밀번호 확인
                      </p>
                      <Input
                        type="password"
                        {...register("confirmPassword")}
                        placeholder="임시 비밀번호를 다시 입력하세요."
                        required
                        errors={[errors.confirmPassword?.message ?? ""]}
                      />
                      <div className="text-neutral-500 flex flex-row gap-1">
                        <ExclamationCircleIcon className="size-4" />
                        <p className="text-xs ">
                          임시 비밀번호 발급 후 변경 가능합니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row items-center font-semibold w-full mt-6 ">
                  <ButtonCustom text="추가" />
                </div>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
