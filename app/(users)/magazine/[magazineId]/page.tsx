import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import db from "@/lib/db";
import type { Metadata, ResolvingMetadata } from "next";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getMagazine(magazineId: number) {
  const magazines = await db.magazine.findUnique({
    where: {
      id: magazineId,
    },
    include: {
      author: {
        select: {
          username: true,
          avatar: true,
          intruduceTitle: true,
          link: true,
          intruduce: true,
        },
      },
      product: true,
    },
  });
  return magazines;
}
type Props = {
  params: { magazineId: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const product = await getMagazine(Number(params.magazineId));
  console.log("product", product);
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    metadataBase: new URL("https://www.finefarming.co.kr"),
    alternates: {
      canonical: "/",
    },
    title: product?.title,
    openGraph: {
      title: product?.title,
      url: `https://www.finefarming.co.kr/magazine/${product?.id!}`,
      siteName: "파인파밍",
      images: [
        {
          url: product?.image!, // Must be an absolute URL
          width: 800,
          height: 600,
        },
      ],
      locale: "ko_KR",
      type: "website",
    },
  };
}

export default async function Page({ params }: Props) {
  const id = Number(params.magazineId);
  if (isNaN(id)) {
    return notFound();
  }
  const magazine = await getMagazine(id);
  if (!magazine) {
    return notFound();
  }
  console.log("magazine", magazine);
  return (
    <article className="w-full  relative ">
      <section className=" relative  flex flex-col lg:items-center items-start justify-center ">
        <div className="w-full  aspect-video lg:aspect-[16/4] relative">
          <Image
            src={magazine.image}
            alt={magazine.title}
            fill
            className="object-cover   brightness-50"
            sizes="(min-width: 768px) 50vw, (min-width: 1440) 100vw, 100vw"
          />
        </div>

        <h1 className="text-xl lg:text-3xl font-semibold lg:text-white lg:absolute  relative px-6  pt-6 ">
          {magazine.title}
        </h1>
        <div className="flex flex-row items-center gap-3 h-4 text-neutral-500 lg:text-white text-sm lg:absolute  relative  lg:bottom-6 px-6 ">
          <div>
            <p>{magazine.author.username}</p>
          </div>
          <Separator orientation="vertical" />
          <div>
            <p>{moment(magazine.created_at).format("YYYY.MM.DD")}</p>
          </div>
        </div>
      </section>
      <div className="bg-white py-6 px-3 flex flex-col items-start gap-2">
        <div className="w-full  container mx-auto">
          <div className="bg-white  px-3 flex flex-col items-start gap-2 border-b mt-3 ">
            {magazine.sections.length > 0 &&
              magazine.sections.map((section: any, sectionIndex) => {
                return (
                  <section key={sectionIndex}>
                    {section && (
                      <div className="mt-6">
                        <h2 className=" font-semibold text-lg lg:text-2xl">
                          {section?.title}
                        </h2>
                        {section.subtitle && (
                          <p className=" font-semibold text-md lg:text-lg text-primary underline-offset-[-5px]    underline  decoration-[10px] decoration-primary/20 mt-6 ">
                            {section?.subtitle}
                          </p>
                        )}
                        <p className="text-sm mt-6 lg:text-base">
                          {section.description}
                        </p>
                        {section.images.length > 0 && (
                          <div
                            className={`w-full grid grid-cols-2 gap-3 mt-6 `}
                          >
                            {section.images.map(
                              (image: any, imageIndex: any) => {
                                return (
                                  <div
                                    key={imageIndex}
                                    className={`${
                                      section.images.length === 1
                                        ? "col-span-2 aspect-[4/3]"
                                        : section.images.length === 2
                                        ? "col-span-1   aspect-square"
                                        : section.images.length === 3 &&
                                          imageIndex === 2
                                        ? "col-span-2 aspect-[4/3]"
                                        : section.images.length === 3 &&
                                          imageIndex !== 2
                                        ? "col-span-1 aspect-square"
                                        : "col-span-1 aspect-square"
                                    }   relative `}
                                  >
                                    <Image
                                      src={image}
                                      alt={section?.title}
                                      fill
                                      className=" object-cover"
                                      sizes="(min-width: 768px) 50vw, (min-width: 1440) 100vw, 100vw"
                                    />
                                  </div>
                                );
                              }
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </section>
                );
              })}
          </div>
          <div className="bg-white py-6 px-3 flex flex-col items-start gap-2 mt-3 w-full">
            {magazine.suggestion.length > 0 && (
              <div className="w-full flex flex-col items-start gap-2">
                <h2 className="text-lg font-semibold">
                  체험을 추천 하는 <span className="text-primary">세가지</span>{" "}
                  이유
                </h2>
                {magazine.suggestion.map((suggest: any, suggestIndex: any) => {
                  return (
                    <div
                      key={suggestIndex}
                      className="bg-neutral-100 w-full p-3 flex flex-row items-center gap-2"
                    >
                      <div className="w-[30px] h-[30px] bg-primary  flex flex-col items-center justify-center rounded-full text-white">
                        <p>{suggestIndex + 1}</p>
                      </div>
                      <p className="text-sm">{suggest.title}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      <section className=" flex flex-col items-start gap-2 mt-3 w-full pb-24">
        <div className=" relative w-full aspect-square lg:aspect-[16/4] flex flex-col items-center justify-center ">
          <Image
            src={magazine.image}
            alt={magazine.title}
            fill
            className="object-cover brightness-50  "
            sizes="(min-width: 768px) 50vw, (min-width: 1440) 100vw, 100vw"
          />
          {magazine.author && (
            <div className="  absolute  rounded-md flex flex-col items-center justify-center h-full">
              <div className="flex flex-col lg:flex-row items-center gap-2 bg-white h-[90%] w-[90%]  lg:h-[80%] lg:w-[90%] p-6">
                <div className="flex flex-col items-center gap-1 flex-1  justify-center">
                  <Avatar>
                    <AvatarImage src={magazine?.author?.avatar || undefined} />
                  </Avatar>
                  <p className=" font-semibold  text-sm">
                    {magazine.author.username}
                  </p>
                  <div className="flex flex-row  lg:flex-col items-center justify-center  gap-2 text-neutral-500 text-xs">
                    <p className=" text-md">{magazine.author.intruduceTitle}</p>
                    <Separator orientation="vertical" className="lg:hidden" />
                    <p className=" text-md">{magazine.author.link}</p>
                  </div>
                </div>
                <Separator
                  orientation="horizontal"
                  className="my-3 lg:hidden"
                />
                <div className="flex-1 ">
                  <p className="text-xs text-center text-pretty px-3 flex-1 lg:p-12 ">
                    {magazine.author.intruduce}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      {magazine.product.status !== "FINISHED" && (
        <section className="flex flex-col items-center fixed bottom-6 right-6 w-[100px] h-[100px]">
          <Button
            asChild
            className="w-[100px] h-[100px] flex flex-col items-center justify-center text-center"
          >
            <Link href={`/product/${magazine.productId}`}>
              체험상품 <br /> 자세히보기
            </Link>
          </Button>
        </section>
      )}
    </article>
  );
}
