"use client";
import React from "react";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { ExclamationCircleIcon as FillExclamtion } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
import { XIcon } from "lucide-react";

import { Switch } from "@/components/ui/switch";

import { Input } from "@/components/ui/input";
import DaumPostcodeEmbed, { Address } from "react-daum-postcode";

import { baseSchem, baseSchemType } from "./baseSchema";
import {
  deleteFarm,
  getBaseData,
  getFarmers,
  updateData,
} from "./_component/baseActions";
import {
  DeleteButton,
  LoadingEditSubmitButton,
} from "@/components/ButtonComponent";

import {
  FormFooter,
  FormTitle,
  FormWrap,
} from "@/app/admin/_component/form/form";
import SubSectionWrap from "@/app/admin/_component/subSectionWrap";
import { Textarea } from "@/components/ui/textarea";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

// export const dynamic = "force-static";
// export const dynamicParams = false;
//
interface farmersType {
  id: number;
  username: string;
  phone: string | null;
}
export default function Page({ params }: { params: { id: string } }) {
  const [farmers, setFarmers] = useState<farmersType[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updateloading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const router = useRouter();
  //
  const initailData = async () => {
    let defaultData: any = await getBaseData(Number(params.id));
    // console.log("defaultData", defaultData);
    let farmers = await getFarmers();
    setFarmers(farmers);
    return {
      id: defaultData?.id ?? "",
      name: defaultData?.name ?? "",
      visible: defaultData?.visible ?? "",
      initail: defaultData?.initail ?? "",
      companyNumber: defaultData?.companyNumber ?? "",
      address: defaultData?.address ?? "",
      mainPhone: defaultData?.mainPhone ?? "",
      resevationManager: defaultData?.resevationManager ?? "",
      resevationPhone: defaultData?.resevationPhone ?? "",
      farmerId: defaultData?.owner.id.toString() ?? "",
      farmerName: defaultData?.owner.username ?? "",
      farmerPhone: defaultData?.owner.phone ?? "",
      introduction: defaultData?.introduction ?? "",
      lat: defaultData?.lat ?? "",
      lang: defaultData?.lang ?? "",
      sido: defaultData?.sido ?? "",
      sigungu: defaultData?.sigungu ?? "",
    };
  };

  const form = useForm<baseSchemType>({
    resolver: zodResolver(baseSchem),
    defaultValues: {
      id: undefined,
      name: "",
      visible: false,
      initail: "",
      companyNumber: "",
      address: "",
      mainPhone: "",
      resevationManager: "",
      resevationPhone: "",
      farmerId: "",
      farmerName: "",
      farmerPhone: "",
      introduction: "",
      lat: "",
      lang: "",
      sigungu: "",
      sido: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data: baseSchemType) => {
    // baseSchemType 채크
    console.log("etdata", data);

    setUpdateLoading(true);

    // console.log("data.approve", data.approve, typeof data.approve);
    const formData = new FormData();
    formData.append("id", params.id);
    formData.append("name", data.name);
    formData.append("visible", data.visible.toString());
    formData.append("initail", data.initail);
    formData.append("companyNumber", data.companyNumber ?? "");
    formData.append("address", data.address);
    formData.append("mainPhone", data.mainPhone);
    formData.append("resevationManager", data.resevationManager);
    formData.append("resevationPhone", data.resevationPhone);
    formData.append("farmerId", data.farmerId.toString());
    formData.append("farmerName", data.farmerName);
    formData.append("farmerPhone", data.farmerPhone);
    formData.append("introduction", data.introduction);
    formData.append("lat", data.lat ?? "");
    formData.append("lang", data.lang ?? "");
    formData.append("sido", data.sido ?? "");
    formData.append("sigungu", data.sigungu ?? "");
    try {
      const result = await updateData(formData);
      console.log("result", result);
    } catch (e: any) {
      console.log("e", e);
      // toast.error(e);
    } finally {
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("수정이 완료 되었습니다.");
      setUpdateLoading(false);
      reload();
      // router.push(`/admin/farm/${params.id}/base`);
    }
  });

  const deleteItem = async () => {
    //
    console.log("delete");
    try {
      setDeleteLoading(true);
      await deleteFarm(Number(params.id));
      toast.success("삭제가 완료 되었습니다.");
    } catch (e) {
    } finally {
      router.replace("/admin/farm");
      setDeleteLoading(false);
    }
  };
  const getGeo = async (address: string) => {
    return new Promise<any>(async (resolve, reject) => {
      await window.kakao.maps.load(async () => {
        const geocoder = new window.kakao.maps.services.Geocoder(); // 주소-좌표 반환 객체를 생성
        await geocoder.addressSearch(address, (result: any, status: any) => {
          if (status === window.kakao.maps.services.Status.OK) {
            // 정상적으로 검색이 완료됐으면
            resolve({
              lat: result[0].x,
              lang: result[0].y,
            });
          } else {
            reject();
            // 정상적으로 좌표가 검색이 안 될 경우 디폴트 좌표로 검색
          }
        });
      });
    });
  };
  const handleComplete = async (data: Address) => {
    console.log("Data", data);
    let sido = data.sido;
    let sigungu = data.sigungu;
    let fullAddress = data.address;
    // 주소로 좌표를 검색

    let geto = await getGeo(fullAddress);
    console.log("fullAddress", fullAddress, sido, sigungu, geto);
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    console.log("address", fullAddress, sido);
    form.setValue("address", fullAddress, { shouldDirty: true });
    form.setValue("lat", geto.lat.toString(), { shouldDirty: true });
    form.setValue("lang", geto.lang.toString(), { shouldDirty: true });
    form.setValue("sido", sido, { shouldDirty: true });
    form.setValue("sigungu", sigungu, { shouldDirty: true });
    // onClose();
    setModalOpen(false);
  };
  const reload = async () => {
    setLoading(true);
    let data = await initailData();
    form.reset(data);
    setLoading(false);
  };

  React.useEffect(() => {
    reload();
  }, []);

  return (
    <div className=" w-full flex    flex-1 ">
      <SubSectionWrap isLoading={loading}>
        <div className="w-full  flex h-full ">
          <div className="p-6 flex-1 border rounded-md  bg-white   flex flex-col items-start justify-between w-full h-full  ">
            <Form {...form}>
              <form
                className="w-full flex flex-col items-start gap-6  "
                onSubmit={onSubmit}
              >
                <FormWrap>
                  <FormTitle title="기본정보" sub="" />
                  <div className="col-span-9 grid grid-cols-2 gap-6 ">
                    <div className="col-span-2 ">
                      <FormField
                        control={form.control}
                        name="initail"
                        render={({ field: { value, onChange } }) => (
                          <FormItem>
                            <FormLabel className="flex flex-row items-center gap-2">
                              농장이니셜
                              <FillExclamtion className="size-5 text-primary" />
                            </FormLabel>
                            <FormControl>
                              <Input
                                disabled
                                placeholder="농장이니셜"
                                value={value || ""}
                                onChange={onChange}
                                required
                                className=""
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-1">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field: { value, onChange } }) => (
                          <FormItem>
                            <FormLabel className="flex flex-row items-center gap-2">
                              농장이름
                              <FillExclamtion className="size-5 text-primary" />
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="농장이름을 입력하세요."
                                value={value || ""}
                                onChange={onChange}
                                required
                                className=""
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-1  ">
                      <FormField
                        control={form.control}
                        name="farmerId"
                        render={({ field: { value, onChange } }) => (
                          <FormItem>
                            <FormLabel className="flex flex-row items-center gap-2">
                              농장주
                              <FillExclamtion className="size-5 text-primary" />
                            </FormLabel>

                            <Select
                              required
                              onValueChange={(event) => {
                                form.setValue("farmerId", event);
                                let farmerfilter = farmers.filter(
                                  (item) => item.id === Number(event)
                                );
                                if (farmerfilter.length > 0) {
                                  form.setValue(
                                    "farmerPhone",
                                    farmerfilter[0].phone!
                                  );
                                }
                                // setCheckAvailble(true);
                              }}
                              value={value || ""}
                            >
                              <FormControl className="">
                                <SelectTrigger>
                                  <SelectValue placeholder="농장주" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {farmers.map((farmer, index) => (
                                  <SelectItem
                                    value={farmer.id.toString()}
                                    key={farmer.id}
                                    className=""
                                  >
                                    {farmer.username}({farmer.phone})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-1 ">
                      <FormField
                        control={form.control}
                        name="companyNumber"
                        render={({ field: { value, onChange } }) => (
                          <FormItem>
                            <FormLabel className="">사업자등록번호</FormLabel>
                            <FormControl>
                              <Input
                                className=""
                                placeholder="000-00-00000"
                                value={value || ""}
                                onChange={onChange}
                                pattern="[0-9]{3}-[0-9]{2}-[0-9]{5}"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-1 ">
                      <FormField
                        control={form.control}
                        name="visible"
                        render={({ field: { value, onChange } }) => (
                          <FormItem className="flex flex-col items-start gap-2">
                            <FormLabel className="">공개여부</FormLabel>
                            <FormControl>
                              <Switch
                                checked={value || false}
                                onCheckedChange={onChange}
                              />
                            </FormControl>
                            <FormDescription className="flex flex-row items-center gap-2">
                              <ExclamationCircleIcon className="size-4" />
                              비공개시 관련된 체험상품,매거진,리뷰 모두 비공개
                              됩니다.
                              <br />
                              농장 비공개 상태에서는 상품이 공개되지 않습니다.
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-2 ">
                      <div className="flex flex-col items-start gap-3 1">
                        <div className="flex flex-row items-center justify-between w-full gap-3">
                          <FormField
                            control={form.control}
                            name="address"
                            render={({ field: { value, onChange } }) => (
                              <FormItem className="w-full">
                                <FormLabel className="flex flex-row items-center gap-2">
                                  농장주소
                                  <FillExclamtion className="size-5 text-primary" />
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    required
                                    placeholder="농장주소를 입력하세요."
                                    type="text"
                                    name="address"
                                    value={value || ""}
                                    onChange={onChange}
                                    className=""
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button
                            className="mt-6"
                            type="button"
                            onClick={() => setModalOpen(true)}
                            size={"sm"}
                          >
                            검색
                          </Button>
                        </div>
                      </div>
                      <Dialog open={modalOpen}>
                        <DialogContent className="w-[70vw] h-[80vh] p-12">
                          <div className="w-full flex flex-row items-center justify-between">
                            <p>주소검색</p>
                            <Button
                              type="button"
                              onClick={() => setModalOpen(false)}
                              size={"icon"}
                              variant={"ghost"}
                            >
                              <XIcon className="size-4" />
                            </Button>
                          </div>
                          <DaumPostcodeEmbed
                            onComplete={handleComplete}
                            style={{ height: "100%" }}
                          />
                        </DialogContent>
                      </Dialog>
                    </div>
                    <div className="col-span-2 ">
                      <FormField
                        control={form.control}
                        name="introduction"
                        render={({ field: { value, onChange } }) => (
                          <FormItem className="flex flex-col items-start gap-2">
                            <FormLabel className="">농장 소개글</FormLabel>
                            <FormControl>
                              <Textarea
                                value={value}
                                onChange={onChange}
                                className=" resize-none "
                                rows={10}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </FormWrap>

                <FormWrap>
                  <FormTitle title="연락처" sub="" />
                  <div className="col-span-9 grid grid-cols-2 gap-6 ">
                    <div className="col-span-1 gap-1 flex flex-col">
                      <FormField
                        control={form.control}
                        name="mainPhone"
                        render={({ field: { value, onChange } }) => (
                          <FormItem>
                            <FormLabel className="flex flex-row items-center gap-2">
                              대표번호
                              <FillExclamtion className="size-5 text-primary" />
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="대표번호를 입력하세요."
                                value={value || ""}
                                onChange={onChange}
                                required
                                className=""
                              />
                            </FormControl>
                            <FormDescription className=" flex flex-row items-center gap-1">
                              <ExclamationCircleIcon className="size-4" />
                              상세 페이지에서 고객에게 첫 번째로 노출되는 연락처
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-1 gap-1 flex flex-col">
                      <FormField
                        control={form.control}
                        name="farmerPhone"
                        render={({ field: { value, onChange } }) => (
                          <FormItem>
                            <FormLabel className="">농장주 휴대폰</FormLabel>
                            <FormControl>
                              <Input
                                disabled
                                placeholder="농장주 선택시 자동입력"
                                value={value || ""}
                                onChange={onChange}
                                required
                                className=""
                              />
                            </FormControl>
                            <FormDescription className=" flex flex-row items-center gap-1">
                              <ExclamationCircleIcon className="size-4" />
                              상세 페이지에서 고객에게 첫 번째로 노출되는 연락처
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-1 gap-1 flex flex-col">
                      <FormField
                        control={form.control}
                        name="resevationManager"
                        render={({ field: { value, onChange } }) => (
                          <FormItem>
                            <FormLabel className="flex flex-row items-center gap-2">
                              예약 담당자 성함
                              <FillExclamtion className="size-5 text-primary" />
                            </FormLabel>

                            <FormControl>
                              <Input
                                placeholder="예약 담당자 성함을 입력하세요."
                                value={value || ""}
                                onChange={onChange}
                                required
                                className=""
                              />
                            </FormControl>
                            <FormMessage />
                            <FormDescription className=" flex flex-row items-center gap-1">
                              <ExclamationCircleIcon className="size-4" />
                              관리자가 연락드릴 농장 측 예약 담당자 이름
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-1 gap-1 flex flex-col">
                      <FormField
                        control={form.control}
                        name="resevationPhone"
                        render={({ field: { value, onChange } }) => (
                          <FormItem>
                            <FormLabel className="flex flex-row items-center gap-2">
                              예약 담당자 연락처
                              <FillExclamtion className="size-5 text-primary" />
                            </FormLabel>

                            <FormControl>
                              <Input
                                placeholder="000-0000-0000"
                                value={value || ""}
                                onChange={onChange}
                                required
                                className=""
                              />
                            </FormControl>
                            <FormMessage />
                            <FormDescription className=" flex flex-row items-center gap-1">
                              <ExclamationCircleIcon className="size-4" />
                              농장 측 예약 담당자 전화번호
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </FormWrap>
                <FormFooter>
                  <div>
                    <DeleteButton
                      onDelete={() => deleteItem()}
                      title="농장을 삭제하겠습니까?"
                      description={`농장을 삭제하면 관련된데이터(농장,리뷰,예약내역,주문내역 등) \n모두 삭제됩니다.`}
                      deleteLoading={deleteLoading}
                    />
                  </div>
                  <div>
                    <LoadingEditSubmitButton
                      loading={updateloading}
                      disabled={
                        !form.formState.isDirty ||
                        form.formState.isSubmitting ||
                        updateloading
                      }
                    />
                  </div>
                </FormFooter>
              </form>
            </Form>
          </div>
        </div>
      </SubSectionWrap>
    </div>
  );
}
