"use client";
import React from "react";
import { useState } from "react";
import { PlusIcon, XIcon } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DaumPostcodeEmbed, { Address } from "react-daum-postcode";
import { Dialog, DialogContent } from "@/components/ui/dialog";
//
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { farmNewSchema, farmNewSchemaType } from "./\bfarmNewSchema";
import { createFarm, getFarmers } from "./actions";
import { useRouter } from "next/navigation";
//
interface farmersType {
  id: number;
  username: string | null;
  phone: string | null;
}
export default function NewFarm() {
  const router = useRouter();
  const [farmers, setFarmers] = useState<farmersType[]>([]);
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [check, setCheck] = useState<boolean>(false);
  const [checkAvailble, setCheckAvailble] = useState<boolean>(false);

  const farmersData = async () => {
    let response = await getFarmers();
    console.log("farmers", response);
    setFarmers(response);
  };
  React.useEffect(() => {
    farmersData();
  }, []);
  const form = useForm<farmNewSchemaType>({
    resolver: zodResolver(farmNewSchema),
    defaultValues: {
      name: "",
      farmerId: "",
      farmerPhone: "",
      companyNumber: "",
      address: "",
      mainPhone: "",
      resevationManager: "",
      resevationPhone: "",
    },
  });
  const onSubmit = form.handleSubmit(async (data: farmNewSchemaType) => {
    console.log("data", data);
    let newData = JSON.stringify(data);
    const formData = new FormData();
    formData.append("newData", newData);
    try {
      await createFarm(formData);

      // router.replace("/admin/farm");
    } catch (e) {
      console.log(e);
    } finally {
      onCloseModal();
      window.location.reload();
    }
    // onCloseModal();
  });
  const handleComplete = (data: Address) => {
    let fullAddress = data.address;
    console.log("fullAddress", fullAddress);
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
    console.log("address", fullAddress);
    form.setValue("address", fullAddress);
    // onClose();
    setModalOpen(false);
  };

  const clickChecked = (checked: boolean) => {
    //
    setCheck(checked);
    if (checked) {
      //
      // form.setValue("resevationManager", fullAddress);
      let formPhone = form.getValues("farmerPhone");
      let farmerId = form.getValues("farmerId");
      let farmerData: any = farmers.filter(
        (item) => item.id === Number(farmerId)
      );
      if (farmerData.length > 0) {
        form.setValue("resevationManager", farmerData[0].username);
      }
      form.setValue("resevationPhone", formPhone);
    } else {
      //
    }
    console.log("checked", checked);
  };

  const onCloseModal = () => {
    form.reset();
    setOpen(false); // window.location.reload();
  };
  //
  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
        className="flex flex-row items-center gap-3  font-light"
        size={"sm"}
      >
        <PlusIcon className="size-4" />
        농장
      </Button>
      <Dialog open={open}>
        {farmers.length > 0 ? (
          <DialogContent className="max-w-[90vw] ">
            <div className="w-full p-3 ">
              <div className="w-full flex flex-col items-end py-3">
                <Button
                  className=""
                  onClick={() => onCloseModal()}
                  variant={"outline"}
                >
                  <XIcon className="size-4" />
                </Button>
              </div>
              <div className="bg-white w-full rounded-md p-6 border ">
                <div className="w-full overflow-y-auto mt-3 p-3">
                  <Form {...form}>
                    <form
                      className="w-full flex flex-col items-start gap-6"
                      onSubmit={onSubmit}
                    >
                      <h1 className=" font-semibold">기본정보</h1>
                      <div className="w-full grid grid-cols-2 gap-3 px-6 border-b pb-12">
                        <div className="col-span-2 grid grid-cols-2 gap-3">
                          <div className="col-span-1 gap-1 flex flex-col">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field: { value, onChange } }) => (
                                <FormItem>
                                  <FormLabel>농장이름</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="농장이름을 입력하세요."
                                      value={value}
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
                              name="farmerId"
                              render={({ field: { value, onChange } }) => (
                                <FormItem>
                                  <FormLabel>농장주</FormLabel>
                                  <Select
                                    required
                                    onValueChange={(event) => {
                                      console.log(event);
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
                                      setCheckAvailble(true);
                                    }}
                                    value={value}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="농장주" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {farmers.map((farmer, index) => (
                                        <SelectItem
                                          value={farmer.id.toString()}
                                          key={farmer.id}
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

                          <div className="col-span-1 gap-1 flex flex-col">
                            <FormField
                              control={form.control}
                              name="companyNumber"
                              render={({ field: { value, onChange } }) => (
                                <FormItem>
                                  <FormLabel>사업자등록번호</FormLabel>
                                  <FormControl>
                                    <Input
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
                          <div className="col-span-2 grid grid-cols-12 gap-6">
                            <div className="col-span-12 flex flex-col items-start gap-3 1">
                              <div className="flex flex-row items-center justify-between w-full gap-3">
                                <FormField
                                  control={form.control}
                                  name="address"
                                  render={({ field: { value, onChange } }) => (
                                    <FormItem className="w-full">
                                      <FormLabel>농장주소</FormLabel>
                                      <FormControl>
                                        <Input
                                          required
                                          placeholder="농장주소를 입력하세요."
                                          type="text"
                                          name="address"
                                          value={value}
                                          onChange={onChange}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <Button
                                  className="mt-8"
                                  type="button"
                                  onClick={() => setModalOpen(true)}
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
                        </div>
                      </div>
                      <h1 className=" font-semibold">연락처</h1>
                      <div className="w-full grid grid-cols-2 gap-3 px-6 border-b pb-12">
                        <div className="col-span-2 grid grid-cols-2 gap-3">
                          <div className="col-span-1 gap-1 flex flex-col">
                            <FormField
                              control={form.control}
                              name="mainPhone"
                              render={({ field: { value, onChange } }) => (
                                <FormItem>
                                  <FormLabel>대표번호</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="대표번호를 입력하세요."
                                      value={value}
                                      onChange={onChange}
                                      required
                                    />
                                  </FormControl>
                                  <FormDescription className="text-xs flex flex-row items-center gap-1">
                                    <ExclamationCircleIcon className="size-4" />
                                    상세 페이지에서 고객에게 첫 번째로 노출되는
                                    연락처
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
                                  <FormLabel>농장주 휴대폰</FormLabel>
                                  <FormControl>
                                    <Input
                                      disabled
                                      placeholder="농장주 선택시 자동입력"
                                      value={value}
                                      onChange={onChange}
                                      required
                                    />
                                  </FormControl>
                                  <FormDescription className="text-xs flex flex-row items-center gap-1">
                                    <ExclamationCircleIcon className="size-4" />
                                    상세 페이지에서 고객에게 두 번째로 노출되는
                                    연락처
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
                                  <FormLabel>예약 담당자 성함</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="예약 담당자 성함을 입력하세요."
                                      value={value}
                                      onChange={onChange}
                                      required
                                    />
                                  </FormControl>
                                  <FormMessage />
                                  <FormDescription className="text-xs flex flex-row items-center gap-1">
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
                                  <FormLabel>예약 담당자 연락처</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="000-0000-0000"
                                      value={value}
                                      onChange={onChange}
                                      required
                                    />
                                  </FormControl>
                                  <FormMessage />
                                  <FormDescription className="text-xs flex flex-row items-center gap-1">
                                    <ExclamationCircleIcon className="size-4" />
                                    농장 측 예약 담당자 전화번호
                                  </FormDescription>
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="flex flex-row items-center gap-2 mt-3">
                            <Checkbox
                              disabled={!checkAvailble}
                              className="w-5 h-5 rounded-xs"
                              checked={check}
                              onCheckedChange={(checked: boolean) => {
                                clickChecked(checked);
                              }}
                            />
                            <p className="text-xs ">농장주와 동일합니다.</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row items-center justify-end font-semibold w-full mt-6 ">
                        <Button
                          type="submit"
                          className="flex flex-row items-center gap-2"
                        >
                          <PlusIcon className="size-4" />
                          추가
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          </DialogContent>
        ) : (
          <DialogContent className="max-w-[90vw] p-12 rounded-md">
            <div className="h-[50vh] flex w-full flex-col items-center justify-start">
              <div className="w-full flex flex-col items-end py-3">
                <Button
                  className=""
                  onClick={() => onCloseModal()}
                  variant={"outline"}
                >
                  <XIcon className="size-4" />
                </Button>
              </div>
              <div className="gap-1 flex flex-col items-center justify-center w-full h-full  p-3 rounded-md text-red-500">
                <p className="text-sm">
                  등록된 농장주가 없습니다. <br />
                  농장주 등록 후 농장을 생성하세요. <br />
                  승인된 농장주만 나타남니다.
                </p>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
