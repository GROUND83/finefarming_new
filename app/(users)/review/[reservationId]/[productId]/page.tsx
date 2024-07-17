"use client";

import { createReview, getReviews } from "./_components/actions";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewSchem, reviewSchemType } from "./_components/reviewSchema";
import { Rating, ThinStar, RoundedStar } from "@smastrom/react-rating";
import { LoadingEditSubmitButton } from "@/components/ButtonComponent";
import ImageUploadComponent from "@/app/admin/_component/imageUploadComponent";
import FormImageUpload from "@/components/form/FormImageUpload";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import "@smastrom/react-rating/style.css";
import Image from "next/image";
import moment from "moment";
import { Badge } from "@/components/ui/badge";
import { getUploadUrl } from "@/lib/uploadUrl";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const myStyles = {
  itemShapes: RoundedStar,
  activeFillColor: "#17A34A",
  inactiveFillColor: "#AAF3C4",
};
export default function Page({
  params,
}: {
  params: { reservationId: string; productId: string };
}) {
  const [userId, setUserId] = React.useState<number>();
  const [reviews, setReviews] = React.useState<any[]>([]);
  const [reservagtoin, setReservation] = React.useState<any>();
  const [product, setProduct] = React.useState<any>();
  const [loading, setLoading] = React.useState(false);
  const [updateloading, setUpdateLoading] = React.useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const getReview = async () => {
    //

    if (session?.user) {
      let data = {
        reservationId: Number(params.reservationId),
        productId: Number(params.productId),
        userId: Number(session?.user.id),
      };
      let result = await getReviews(JSON.stringify(data));
      console.log("reviews", result);
      setReviews(result.reviews);
      setReservation(result.reservation);
      setProduct(result.product);
    }
  };

  const form = useForm<reviewSchemType>({
    resolver: zodResolver(reviewSchem),
    defaultValues: {
      title: "",
      image: {
        image: "",
        uploadUrl: "",
        downUrl: "",
        file: "",
      },
      point: 3,
    },
  });
  //

  const onSubmit = form.handleSubmit(async (data: reviewSchemType) => {
    // 업로드 이미지
    console.log("data", data);

    if (!data.image.image) {
      toast.error("후기사진을 첨부하세요.");
      return;
    }

    setUpdateLoading(true);
    console.log("etdata", data);
    console.log(!form.formState.isDirty);
    if (form.formState.isDirty) {
      const mainImageUpload = new FormData();
      mainImageUpload.append("file", data.image.file);
      // 시잔 업로드
      const response = await fetch(data.image.uploadUrl, {
        method: "POST",
        body: mainImageUpload,
      });
      if (response.status !== 200) {
        return;
      }

      let newData = {
        userId: session?.user.id,
        productId: Number(params.productId),
        reservationId: Number(params.reservationId),
        image: `${data.image.downUrl}/public`,
        point: data.point,
        title: data.title,
      };
      let newString = JSON.stringify(newData);
      const formData = new FormData();

      try {
        const result = await createReview(newString);
        console.log(result);
        toast.success("리뷰 작성을 완료 했습니다.");
        router.push("/profile");
      } catch (e: any) {
        // console.log(e);
      } finally {
        setUpdateLoading(false);
        // window.location.reload();
      }
    } else {
      // 수정
      const formData = new FormData();
      console.log(form.formState.dirtyFields);
      // if (data.image.file) {
      //   //
      //   console.log("file", data.image.file);
      //   const mainImageUpload = new FormData();
      //   mainImageUpload.append("file", data.image.file);
      //   // 시잔 업로드
      //   const response = await fetch(data.image.uploadUrl, {
      //     method: "POST",
      //     body: mainImageUpload,
      //   });
      //   if (response.status !== 200) {
      //     return;
      //   }
      //   formData.append("mainImage", `${data.image.downUrl}/public`);
      // } else {
      //   formData.append("mainImage", data.image.image);
      // }
      // let imagesArray = [];

      // formData.append("id", params.id);

      // try {
      //   const result = await farmImageUpload(formData);
      //   // if (result) {
      //   //   toast({
      //   //     duration: 3000,
      //   //     title: "수정완료",
      //   //     description: "데이터 수정이 완료 되었습니다.",
      //   //   });
      //   // }
      // } catch (e: any) {
      //   console.log(e);
      // } finally {
      //   // await new Promise((resolve) => setTimeout(resolve, 1000));
      //   setUpdateLoading(false);
      //   // window.location.reload();
      // }
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
    // if (file.size > 2000000) {
    //   alert("이미지 사이즈가 2mb를 초과 하였습니다.");
    //   return;
    // }

    const url = URL.createObjectURL(file);
    console.log(url);

    const { success, result } = await getUploadUrl();
    console.log(result);
    if (success) {
      const { id, uploadURL } = result;

      form.setValue(
        "image",
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

  //
  React.useEffect(() => {
    getReview();
  }, [session?.user]);
  //
  const onValid = async () => {
    await onSubmit();
  };
  return (
    <div className="w-full bg-white h-full p-3">
      <div className="w-full   relative  grid grid-cols-12 gap-6 bg-white ">
        <div className="p-6 flex-1   flex flex-col items-start justify-between w-full   col-span-12 gap-6">
          {product && (
            <div className="w-full border rounded-md p-3 flex flex-row items-start gap-3">
              <div className=" relative w-[120px] aspect-square  overflow-hidden">
                <Image
                  src={product.mainImage}
                  fill
                  priority
                  alt={product.title}
                />
              </div>
              <div className="flex flex-col items-start justify-between flex-1   h-full">
                <div className="flex-1  px-3 flex flex-col items-start w-full ">
                  <p className="text-md font-semibold">{product.title}</p>
                  <p className="text-sm">{product.description}</p>
                </div>
                <div className="flex-1  px-3 flex flex-col items-start justify-end  w-full  ">
                  <div className="flex flex-row items-center justify-between gap-2 text-sm text-neutral-500">
                    <p>방문일</p>
                    <p className="text-sm">
                      {moment(reservagtoin.checkInDate).format(
                        "YYYY년 MM월 DD일"
                      )}
                    </p>
                    {reservagtoin.status === "done" && <Badge>방문완료</Badge>}
                  </div>
                </div>
              </div>
            </div>
          )}
          <p className=" font-semibold">후기 쓰기</p>
          <form
            className="w-full flex flex-col items-start gap-6 "
            action={onValid}
          >
            <div className="w-full grid grid-cols-2 gap-6 ">
              <div className="col-span-2 border bg-white rounded-md aspect-[4/3] flex flex-col items-center justify-center ">
                <Controller
                  control={form.control}
                  name="image"
                  render={({ field: { onChange, onBlur, value, ref } }) => {
                    // let images = form.getValues("mainImage.image");
                    // console.log("images", value);
                    return (
                      <FormImageUpload
                        name="image"
                        image={value.image}
                        setValue={form.setValue}
                        onMainImageChange={onMainImageChange}
                      />
                    );
                  }}
                />
              </div>
            </div>
            <p className=" font-semibold  ">후기 내용</p>
            <div className="w-full grid grid-cols-2 gap-6 ">
              <div className="col-span-2    flex flex-col items-start justify-center gap-6 ">
                <Controller
                  control={form.control}
                  name="title"
                  render={({ field: { onChange, onBlur, value, ref } }) => {
                    // let images = form.getValues("mainImage.image");
                    // console.log("images", images);
                    return (
                      <Textarea
                        required
                        rows={10}
                        value={value}
                        onChange={onChange}
                        className="resize-none text-xs w-full"
                      />
                    );
                  }}
                />
              </div>
            </div>
            <p className=" font-semibold  ">점수</p>
            <div className="w-full grid grid-cols-2 gap-6 ">
              <div className="col-span-2  flex flex-col items-start justify-center ">
                <Controller
                  control={form.control}
                  name="point"
                  render={({ field: { onChange, onBlur, value, ref } }) => {
                    return (
                      <div className="flex flex-row items-center w-full">
                        <Rating
                          value={value}
                          onChange={onChange}
                          style={{ maxWidth: 300, height: 40 }}
                          itemStyles={myStyles}
                          // className="flex flex-row items-center"
                        />
                      </div>
                    );
                  }}
                />
              </div>
            </div>
            <div className="  w-full col-span-12 flex flex-col items-end mt-12">
              <LoadingEditSubmitButton
                loading={updateloading}
                disabled={
                  !form.formState.isDirty ||
                  form.formState.isSubmitting ||
                  updateloading
                }
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
