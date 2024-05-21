import { notFound } from "next/navigation";
import { getReviewDetail } from "../_component/actions";
import Link from "next/link";
import { Rating, ThinStar, RoundedStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import Image from "next/image";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
const myStyles = {
  itemShapes: RoundedStar,
  activeFillColor: "#17A34A",
  inactiveFillColor: "#AAF3C4",
};
async function getReviewDetailData(productId: number) {
  //
  //   await new Promise((resolve) => setTimeout(resolve, 10000));
  let result: any = await getReviewDetail(productId);
  return result;
}
export default async function Page({
  params,
}: {
  params: { productId: string };
}) {
  const result = await getReviewDetailData(Number(params.productId));
  if (!result) {
    return notFound();
  }
  //
  console.log("result", result);
  return (
    <article className="w-full bg-white  min-h-screen ">
      <div className="container mx-auto flex-col items-start grid grid-cols-12 gap-3">
        <div className="py-3 mt-3">
          <Button size={"sm"} variant={"outline"} asChild>
            <Link href={`/product/${params.productId}`}>
              <ArrowLeftIcon className="size-4" /> 뒤로가기
            </Link>
          </Button>
        </div>
        <div className="flex flex-col items-start gap-1 text-sm col-span-12 ">
          {result.reviews.length > 0 ? (
            <>
              {result.reviews.map((review: any, index: any) => {
                return (
                  <div
                    className=" flex flex-col lg:flex-row items-start gap-3 lg:gap-6 border p-3 w-full rounded-md"
                    key={index}
                  >
                    <div className="lg:w-[300px] w-full  aspect-square relative">
                      <Image
                        src={review.image}
                        fill
                        alt={`review-${index}`}
                        className=" object-cover"
                      />
                    </div>
                    <div className="flex flex-col items-start flex-1 gap-1">
                      <div className="flex flex-row items-center gap-2 text-neutral-500">
                        {review.user.username.length > 2 ? (
                          <p>
                            {review.user.username.slice(0, 1) +
                              "0" +
                              review.user.username.slice(2, 3)}
                          </p>
                        ) : (
                          <p>{review.user.username.slice(0, 1) + "0"}</p>
                        )}

                        <p>{dayjs(review.created_at).format("YYYY-MM-DD")}</p>
                      </div>
                      <div className=" flex flex-col items-start ">
                        <Rating
                          readOnly
                          value={review.point}
                          style={{ width: 120, height: 20 }}
                          itemStyles={myStyles}
                        />
                      </div>
                      <div className="mt-3">
                        <p className=" whitespace-pre-wrap   ">
                          {review.title}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <div className="flex w-full flex-col items-center justify-center text-neutral-500 h-[500px]">
              <p>체험 후기가 아직 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
