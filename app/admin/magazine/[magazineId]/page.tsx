"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
  magazineSchema,
  magazineSchemaType,
} from "./_component/magazineSchema";
import { getUploadUrl } from "@/lib/uploadUrl";
import { deleteMagazine, getMagazineData } from "./_component/actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  DeleteButton,
  LoadingEditSubmitButton,
} from "@/components/ButtonComponent";

import moment from "moment";
import { NestedImage } from "./_component/nestedImage";
import { PlusIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { updateMagazine } from "./actions";
import { useRouter } from "next/navigation";
import ModalPcComponent from "./_component/modalPcComponent";
import { UploadFileClient } from "@/lib/fileUploaderClient";

export default function Page({ params }: { params: { magazineId: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectAuthor, setSelectAuthor] = useState<any>("");
  const [products, setProducts] = useState<
    | {
        id: number;
        title: string | null;
        farmId: number;
        farm: {
          id: number;
          name: string | null;
        };
      }[]
  >([]);
  const [author, setAuthor] = useState<
    | {
        id: number;
        username: string | null;
        intruduceTitle: string | null;
        avatar: string | null;
        intruduce: string | null;
        link: string | null;
      }[]
  >([]);
  const [sectionType, setSectionType] = useState("mobile");
  const [updateloading, setUpdateLoading] = useState(false);

  const imageRef = useRef<any>(null);
  const { data: session } = useSession();
  const form = useForm<magazineSchemaType>({
    resolver: zodResolver(magazineSchema),
    defaultValues: {
      image: {
        image: "",
        uploadUrl: "",
        downUrl: "",
        file: "",
      },
      title: "",
      sections: [],
      suggestion: [],
      productId: "",
      authorId: "",
      author: {
        id: undefined,
        username: "",
        link: "",
        intruduceTitle: "",
        intruduce: "",
        avatar: "",
      },
    },
  });
  const {
    fields: sectionsFields,
    append: sectionsAppend,
    remove: sectionsRemove,
  } = useFieldArray({
    control: form.control,
    name: "sections",
  });
  const {
    fields: suggestionFields,
    append: suggestionAppend,
    remove: suggestionRemove,
  } = useFieldArray({
    control: form.control,
    name: "suggestion",
  });
  //
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
    if (file.size > 5000000) {
      alert("이미지 사이즈가 50mb를 초과 하였습니다.");
      return;
    }

    const url = URL.createObjectURL(file);
    console.log(url);

    form.setValue(
      "image",
      {
        image: url,
        uploadUrl: "",
        downUrl: "",
        file: file,
      },
      { shouldDirty: true }
    );
  };
  const onSubmit = form.handleSubmit(async (data) => {
    setUpdateLoading(true);
    console.log("data", data);
    let checkData = {
      image: "",
      // authorId: user?.id,
      productId: data.productId,
      magazineId: Number(params.magazineId),
      authorId: data.authorId,
      title: "",
      sections: [] as any,
      suggestion: data.suggestion as any,
      visible: data.visible,
    };
    if (data) {
      if (data.image.file) {
        let res = await UploadFileClient({
          file: data.image.file,
          folderName: `magazine/${dayjs().unix()}`,
        });
        if (res?.location) {
          console.log(res.location);
          checkData.image = res.location;
          // imagesArray.push(res.location);
          // formData.append("mainImage", res.location);
        }
      } else {
        checkData.image = `${data.image.image}`;
      }
      checkData.title = data.title;
      for (const sections of data.sections) {
        let sectionData = {
          subtitle: sections.subtitle,
          title: sections.title,
          description: sections.description,
          images: [] as any,
        } as any;
        if (sections.images.length > 0) {
          for (const images of sections.images) {
            if (images.file) {
              let res = await UploadFileClient({
                file: images.file,
                folderName: `magazine/${dayjs().unix()}`,
              });
              if (res?.location) {
                console.log(res.location);

                // formData.append("mainImage", res.location);
                sectionData.images.push(res.location);
              }
            } else {
              sectionData.images.push(`${images.image}`);
            }
          }
        }
        checkData.sections.push(sectionData);
      }
      try {
        console.log("newdata", checkData);
        let JsonData = JSON.stringify(checkData);

        let result = await updateMagazine(JsonData);
        if (result) {
          toast.success("데이터 수정에 성공하였습니다.");
        }
      } catch (e: any) {
        console.log(e);
        toast.error(e);
      } finally {
        reload();
        setUpdateLoading(false);
      }
    }
  });
  const reload = async () => {
    setLoading(true);
    console.log(params.magazineId);
    let data = await getMagazineData(params.magazineId);
    console.log("data", data);
    setProducts(data.products);
    setAuthor(data.author);
    if (data.magazine) {
      const comments2 = JSON.stringify(data.magazine);
      const parserData = JSON.parse(comments2);
      setSelectAuthor(parserData.author);
      console.log(
        "parserData.authorId.toString(),",
        parserData.authorId.toString()
      );
      let newdata = {
        image: {
          image: parserData.image,
          uploadUrl: parserData.image,
          downUrl: parserData.image,
          file: "",
        },
        title: parserData.title,
        //   sections: data.sections,
        suggestion: parserData.suggestion,
        productId: parserData.productId
          ? parserData.productId.toString()
          : "없음",
        sections: [] as any,
        author: parserData.author,
        authorId: parserData.authorId.toString(),
        visible: parserData.visible,
      };

      for (const section of parserData.sections) {
        if (section) {
          //   console.log("section", section);

          let newsecion = {
            title: section?.title,
            subtitle: section?.subtitle,
            description: section?.description,
            images: [] as any,
          };
          //   console.log("seciont", section.images);
          if (section?.images.length > 0) {
            for (const image of section?.images) {
              let imagedata: any = {
                image: image,
                uploadUrl: image,
                downUrl: image,
                file: "",
              };
              // console.log("imagedata", imagedata);
              newsecion.images.push(imagedata);
            }
          } else {
            // newsecion.images.push([]);
          }
          newdata.sections.push(newsecion);
        }
      }
      console.log("newdata", newdata);
      form.reset(newdata);
      form.resetField("authorId", parserData.authorId.toString());
      form.resetField(
        "productId",
        parserData.productId ? parserData.productId.toString() : "없음"
      );
      setLoading(false);
    }
  };

  React.useEffect(() => {
    reload();
  }, [params.magazineId]);
  //
  const clickDelete = async () => {
    try {
      setDeleteLoading(true);
      let detate = await deleteMagazine(params.magazineId);
      toast.success("매거진 삭제에 성공하였습니다.");
    } catch (e: any) {
      toast.error(e);
    } finally {
      setDeleteLoading(false);
      router.push("/admin/magazine");
    }
  };
  return (
    <div className=" w-full  flex-1 flex flex-col items-start  p-3 ">
      <div className="w-full  flex-1 flex ">
        <div className="p-6 flex-1 border rounded-md  bg-white   flex flex-col items-start justify-between w-full  ">
          <div className="w-full grid grid-cols-12 gap-3">
            <div className=" col-span-12 flex flex-row items-center  justify-between gap-1">
              <div>
                <p>매거진 자세히보기</p>
                <p className="text-xs text-neutral-500">
                  글과 사진으로 구성된 정보를 작성하여
                  <br /> 매거진을 저장합니다.
                </p>
              </div>
            </div>
            <div className="col-span-12 flex flex-col items-start">
              <div className={"w-[350px] min-h-[500px]"}>
                {author.length > 0 && products.length > 0 && (
                  <Form {...form}>
                    <form
                      className="w-full flex flex-col items-start gap-6  "
                      onSubmit={onSubmit}
                    >
                      <div className="  mt-3 flex flex-row items-center justify-between w-full">
                        <DeleteButton
                          onDelete={() => clickDelete()}
                          title={"삭제"}
                          description={"매거진을 삭제 하겠습니까?"}
                          deleteLoading={deleteLoading}
                        />
                        <div className=" col-span-12 flex flex-row items-center justify-end gap-3">
                          <ModalPcComponent
                            magazine={form.formState.defaultValues}
                          />
                        </div>
                        <LoadingEditSubmitButton
                          loading={updateloading}
                          disabled={
                            !form.formState.isDirty ||
                            form.formState.isSubmitting ||
                            updateloading
                          }
                        />
                      </div>
                      <div className="w-full  border flex flex-col items-start  p-3 bg-neutral-100 ">
                        <FormField
                          control={form.control}
                          name="productId"
                          render={({
                            field: { onChange, onBlur, value, ref },
                          }) => (
                            <FormItem className="w-full">
                              <FormLabel>체험상품</FormLabel>
                              <Select onValueChange={onChange} value={value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="체험 상품을 선택하세요." />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value={"없음"}>없음</SelectItem>
                                  {products?.length > 0 &&
                                    products?.map((product, productIndex) => {
                                      return (
                                        <SelectItem
                                          value={product.id.toString()}
                                          key={productIndex}
                                        >
                                          {product.title} -{product.farm.name}
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
                      <div className="w-full  border flex flex-col items-start  p-3 bg-neutral-100 ">
                        <FormField
                          control={form.control}
                          name="authorId"
                          render={({
                            field: { onChange, onBlur, value, ref },
                          }) => (
                            <FormItem className="w-full">
                              <FormLabel>매거진 작가</FormLabel>
                              <Select
                                onValueChange={(value) => {
                                  console.log("value", value);

                                  let findAuthor = author.filter(
                                    (item) => Number(item.id) === Number(value)
                                  );
                                  console.log("findAuthor", findAuthor);
                                  if (findAuthor.length > 0) {
                                    setSelectAuthor({ ...findAuthor[0] });
                                  }
                                  onChange(value);
                                }}
                                value={value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="매거진 작가를 선택하세요." />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {author?.length > 0 &&
                                    author?.map((writer, writerIndex) => {
                                      return (
                                        <SelectItem
                                          value={writer.id.toString()}
                                          key={writerIndex}
                                        >
                                          {writer.username}
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
                      <div className="w-full  border flex flex-col items-start  p-3 bg-neutral-100 ">
                        <FormField
                          control={form.control}
                          name="visible"
                          render={({
                            field: { onChange, onBlur, value, ref },
                          }) => (
                            <FormItem className="w-full  space-y-0 flex flex-row items-center gap-3">
                              <Switch
                                checked={value}
                                onCheckedChange={onChange}
                              />
                              {value ? (
                                <FormLabel>공개</FormLabel>
                              ) : (
                                <FormLabel>비공개</FormLabel>
                              )}

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="w-full  border flex flex-col items-start  pb-3 bg-neutral-100 ">
                        <FormField
                          control={form.control}
                          name="image"
                          render={({
                            field: { onChange, onBlur, value, ref },
                          }) => {
                            return (
                              <div className="w-full  aspect-[16/9]  ">
                                <div className="w-full h-full relative overflow-hidden bg-neutral-100 border-b ">
                                  {value?.image && (
                                    <Image
                                      src={value.image}
                                      alt="농장이미지"
                                      fill
                                      style={{ objectFit: "cover" }}
                                      className="z-0"
                                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                  )}
                                  {!value?.image && (
                                    <div className="absolute z-40 top-0 left-0 p-6 text-black w-full h-full flex flex-col items-center justify-center ">
                                      <label
                                        htmlFor="mainImage"
                                        className=" text-sm flex flex-row items-center gap-2  border bg-white p-2 cursor-pointer"
                                      >
                                        <PlusIcon className="w-4" />
                                        <p className="text-xs text-black">
                                          사진을 추가해주세요.
                                        </p>
                                      </label>
                                      <input
                                        ref={imageRef}
                                        type="file"
                                        accept="image/*"
                                        id="mainImage"
                                        className="hidden"
                                        name="mainImage"
                                        onChange={onMainImageChange}
                                      />
                                      <FormMessage />
                                    </div>
                                  )}

                                  {value?.image && (
                                    <div className="absolute z-40 top-0 left-0 p-6 text-black w-full h-full flex flex-col items-end justify-end">
                                      <button
                                        type="button"
                                        onClick={() => {
                                          form.setValue(
                                            "image",
                                            {
                                              image: "",
                                              uploadUrl: "",
                                              file: "",
                                              downUrl: "",
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
                                        className="text-xs   bg-red-500  text-white px-3 py-1 rounded-md "
                                      >
                                        삭제
                                      </button>
                                      <FormMessage />
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          }}
                        />
                        <div className=" w-full">
                          <div className="flex flex-col items-start gap-2 w-full bg-white px-3 py-6">
                            <FormField
                              control={form.control}
                              name="title"
                              render={({
                                field: { onChange, onBlur, value, ref },
                              }) => {
                                return (
                                  <textarea
                                    value={value}
                                    onChange={onChange}
                                    className="text-xl  font-semibold w-full bg-transparent border-none text-black placeholder:text-black  p-0 outline-none m-0 space-y-0 whitespace-pre-wrap resize-none"
                                    placeholder="매거진 타이틀을 입력해주세요."
                                  />
                                );
                              }}
                            />
                            <FormMessage />
                            <div className="flex flex-row items-center  gap-2 w-full text-sm h-3 text-neutral-500">
                              <div>
                                <p>{selectAuthor?.username}</p>
                              </div>
                              <Separator
                                orientation="vertical"
                                className="text-black"
                              />

                              <div>
                                <p>{moment().format("YYYY.MM.DD")}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className=" w-full mt-3 py-6 bg-white">
                          {sectionsFields.map((item, index) => {
                            return (
                              <div
                                key={item.id}
                                className="flex flex-col items-start gap-2 w-full bg-white px-3 py-6"
                              >
                                <div className="w-full flex flex-col items-start">
                                  <FormField
                                    control={form.control}
                                    name={`sections.${index}.title`}
                                    render={({
                                      field: { onChange, onBlur, value, ref },
                                    }) => {
                                      return (
                                        <input
                                          value={value || ""}
                                          onChange={onChange}
                                          className=" resize-none bg-transparent text-xl  whitespace-pre-wrap font-semibold w-full  border-none text-black placeholder:text-neutral-500  p-0 outline-none m-0 space-y-0"
                                          placeholder="대타이틀"
                                        />
                                      );
                                    }}
                                  />
                                  <FormMessage />
                                </div>
                                <div className="w-full flex flex-col items-start">
                                  <FormField
                                    control={form.control}
                                    name={`sections.${index}.subtitle`}
                                    render={({
                                      field: { onChange, onBlur, value, ref },
                                    }) => {
                                      return (
                                        <input
                                          value={value || ""}
                                          onChange={onChange}
                                          className=" resize-none text-md font-semibold  whitespace-pre-wrap  w-full bg-transparent border-none text-primary placeholder:text-primary/50  p-0 outline-none m-0 space-y-0"
                                          placeholder="소타이틀 혹은 강조하고 싶은 문장"
                                        />
                                      );
                                    }}
                                  />
                                  <FormMessage />
                                </div>
                                <div className="w-full flex flex-col items-start  justify-start border p-3">
                                  <FormField
                                    control={form.control}
                                    name={`sections.${index}.description`}
                                    render={({
                                      field: { onChange, onBlur, value, ref },
                                    }) => {
                                      return (
                                        <textarea
                                          rows={7}
                                          value={value || ""}
                                          onChange={onChange}
                                          className=" resize-none text-sm   whitespace-pre-wrap  w-full bg-transparent border-none text-black placeholder:text-neutral-500  p-0 outline-none m-0 space-y-0"
                                          placeholder="section 설명, 줄바꿈 허용"
                                        />
                                      );
                                    }}
                                  />
                                  <FormMessage />
                                </div>
                                <div className="w-full flex flex-col items-start  justify-start ">
                                  <NestedImage
                                    nestIndex={index}
                                    control={form.control}
                                    setValue={form.setValue}
                                  />
                                </div>
                                <div className="w-full flex flex-col items-end ">
                                  <div>
                                    <Button
                                      type="button"
                                      size={"sm"}
                                      variant={"outline"}
                                      onClick={() => sectionsRemove(index)}
                                    >
                                      section 삭제
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                          <div className="px-3">
                            <Button
                              type="button"
                              size={"sm"}
                              variant={"outline"}
                              onClick={() =>
                                sectionsAppend({
                                  title: "",
                                  subtitle: "",
                                  description: "",
                                  images: [],
                                })
                              }
                            >
                              section 추가
                            </Button>
                          </div>
                        </div>
                        <div className=" w-full mt-3 py-6 bg-white">
                          <div className="flex flex-col items-start gap-2 w-full bg-white px-3 py-6">
                            <p className=" font-semibold text-xl">
                              체험을 추천하는{" "}
                              <span className=" text-primary">세가지</span> 이유
                            </p>
                          </div>
                          <div className="w-full flex flex-col gap-2">
                            <div className="w-full flex flex-col items-end">
                              <Button
                                type="button"
                                variant={"outline"}
                                size={"sm"}
                                onClick={() => {
                                  if (suggestionFields.length < 3) {
                                    suggestionAppend({ title: "" });
                                  }
                                }}
                              >
                                추가
                              </Button>
                            </div>
                            <div className="flex flex-col items-start gap-2">
                              {suggestionFields.map(
                                (suggestion, suggestionIndex) => {
                                  return (
                                    <div
                                      key={suggestion.id}
                                      className="flex flex-col items-start gap-2 w-full bg-white px-3"
                                    >
                                      <div className="w-full flex flex-col items-start">
                                        <FormField
                                          control={form.control}
                                          name={`suggestion.${suggestionIndex}.title`}
                                          render={({
                                            field: {
                                              onChange,
                                              onBlur,
                                              value,
                                              ref,
                                            },
                                          }) => {
                                            return (
                                              <div className="flex flex-col  items-start gap-2 w-full bg-neutral-100 p-2">
                                                <div className="flex flex-row items-center gap-2 w-full">
                                                  <div className="w-[35px]">
                                                    <div className="w-[30px] h-[30px] bg-primary rounded-full text-white flex flex-col items-center justify-center">
                                                      <span className="text-sm">
                                                        {suggestionIndex + 1}
                                                      </span>
                                                    </div>
                                                  </div>
                                                  <textarea
                                                    rows={2}
                                                    value={value || ""}
                                                    onChange={onChange}
                                                    className="  resize-none bg-transparent text-md    w-full  border-none text-black placeholder:text-neutral-500  p-0 outline-none m-0 space-y-0 "
                                                    placeholder="이유를 입력하세요."
                                                  />
                                                </div>
                                                <button
                                                  type="button"
                                                  className="text-red-500 text-xs"
                                                  onClick={() => {
                                                    console.log(
                                                      suggestionIndex
                                                    );
                                                    suggestionRemove(
                                                      suggestionIndex
                                                    );
                                                  }}
                                                >
                                                  삭제
                                                </button>
                                              </div>
                                            );
                                          }}
                                        />
                                        <FormMessage />
                                      </div>
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        </div>
                        <div className=" w-full mt-3 bg-white relative">
                          {selectAuthor && (
                            <div className="w-full  bg-neutral-200  relative flex flex-col items-center justify-center ">
                              <div className="relative w-full  h-[400px]">
                                {form.getValues("image").image && (
                                  <Image
                                    src={form.getValues("image").image}
                                    fill
                                    alt="작가 배경이미지"
                                    style={{ objectFit: "cover" }}
                                    className="brightness-50"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  />
                                )}
                              </div>
                              <div className="flex flex-col items-center gap-2 absolute p-6">
                                <div className="bg-white flex flex-col items-center justify-center p-3  h-[350px]  rounded-md">
                                  <div>
                                    {selectAuthor.avatar && (
                                      <Avatar>
                                        <AvatarImage
                                          src={selectAuthor.avatar}
                                        />
                                      </Avatar>
                                    )}
                                  </div>
                                  <div>
                                    <p className="text-sm font-semibold">
                                      {selectAuthor.username}
                                    </p>
                                  </div>
                                  <div className="flex flex-row items-center h-5 gap-2 justify-center text-neutral-500 text-xs">
                                    <div>
                                      <p className=" ">
                                        {selectAuthor.intruduceTitle}
                                      </p>
                                    </div>
                                    <Separator orientation="vertical" />
                                    <div>
                                      <p className=" ">{selectAuthor.link}</p>
                                    </div>
                                  </div>
                                  <Separator
                                    orientation="horizontal"
                                    className="mt-6"
                                  />
                                  <div className="p-6">
                                    <p className="text-center text-neutral-500 text-xs">
                                      {selectAuthor.intruduce}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </form>
                  </Form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
