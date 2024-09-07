import Input from "@/components/input";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import {
  ArticleDescription,
  ArticleHeader,
  ImageWrap,
} from "./_components/mainImageWrap";
import type { Metadata, ResolvingMetadata } from "next";
import Subscrip from "./_components/subscrip";
import Head from "next/head";

//
// async function getBanner() {
//   const banners = await db.banner.findMany({
//     where: {
//       visible: true,
//     },
//   });
//   return banners;
// }

export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {
  // const product = await getProduct(params.productId);
  // console.log("product", product);
  // // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || [];

  return {
    metadataBase: new URL("https://www.finefarming.co.kr"),
    alternates: {
      canonical: `/`,
    },
    title: `파인파밍`,
    description:
      "우리는 농업체험을 선택하는데 필요한 지식을 제공하는 동시에 여러분의 체험활동이 기억에 남고 유익한 추억이 될 수 있도록 돕습니다.",
    openGraph: {
      title: "파인파밍",
      url: `https://www.finefarming.co.kr`,
      siteName: "파인파밍",
      locale: "ko_KR",
      type: "website",
    },
  };
}
export default async function Page() {
  // const banners = await getBanner();
  // if (!banners) {
  //   return notFound();
  // }
  // console.log("banners", banners);
  return (
    <>
      {/* <Head>
        <link
          rel="canonical"
          href="https://www.davegray.codes/posts/nextjs-favicon-svg-icon-apple-chrome"
        />
      </Head> */}
      <section className="flex w-full flex-col items-start">
        <article className="grid grid-cols-2 w-full    gap-12 mt-12 lg:container lg:mx-auto">
          <div className="flex flex-col items-start justify-center col-span-2 lg:col-span-1 gap-9 px-6 lg:px-0 py-6 lg:py-12 ">
            <header className="font-semibold text-primary text-pretty text-4xl lg:text-5xl tracking-normal flex flex-col items-start gap-2 w-full">
              <p className="">FineFarming,</p>
              <p className="">Best Farms for you </p>
            </header>
            <p className="text-neutral-500 tracking-normal w-full text-sm text-pretty lg:text-base ">
              우리는 농업체험을 선택하는데 필요한 지식을 제공하는 동시에
              여러분의 체험활동이 기억에 남고 유익한 추억이 될 수 있도록
              돕습니다.
            </p>
            <Subscrip />

            <p className="tracking-wide w-full text-sm lg:text-base text-neutral-500">
              <Link href={"/personalPolicy"} className=" underline  ">
                개인정보 보호정책
              </Link>
              에 따라 고객 정보를 관리합니다
            </p>
          </div>
          <div className="w-full col-span-2 lg:col-span-1 aspect-square   relative">
            <Image
              src={
                "https://imagedelivery.net/8GmAyNHLnOsSkmaGEU1nuA/0ed1d450-6d6b-4b8e-2104-7ab4c3d79900/public"
              }
              alt="article1"
              fill
              className="object-cover"
              sizes="100%"
            />
          </div>
        </article>
        <article className="grid grid-cols-2 w-full ">
          <ArticleHeader title="About us">
            <p className="font-bold tracking-widest text-base lg:text-3xl text-pretty">
              처음 만나는 농장, 체험부터 배움까지
            </p>
          </ArticleHeader>
          <div className="grid grid-cols-2  col-span-2  lg:container lg:mx-auto ">
            <ImageWrap last={false}>
              <Image
                src={
                  "https://imagedelivery.net/8GmAyNHLnOsSkmaGEU1nuA/5eb67a29-229d-4ff4-8b60-ec5a2cc75c00/public"
                }
                alt="section1"
                className="object-cover"
                fill
                sizes="100%"
              />
            </ImageWrap>
            <ArticleDescription>
              <p className="flex flex-col lg:flex-row  gap-1  lg:flex-wrap font-bold text-base lg:text-2xl text-pretty  ">
                몰입형 농업체험을 통해 자연과 과학을 이해하는 유익한 시간을
                제공합니다.
              </p>

              <div>
                <p className="font-semibold text-base">신뢰성</p>
                <p className="text-neutral-500  text-pretty text-sm  lg:text-base">
                  농업과 농촌 전문가들이 검증한 최적의 농장을 추천합니다.
                </p>
              </div>
              <div>
                <p className="font-semibold text-base">참여</p>
                <p className="text-neutral-500  text-pretty text-sm lg:text-base">
                  재미있고 기억에 남는 참여활동을 통해 교육적으로 유익한 시간을
                  제공합니다.
                </p>
              </div>
              <div>
                <p className="font-semibold text-base">차별화</p>
                <p className="text-neutral-500  text-pretty text-sm lg:text-base">
                  새로운 체험경험을 제공하는 작물과 혁신기술이 적용된 농장을
                  발굴합니다.
                </p>
              </div>
            </ArticleDescription>
          </div>
        </article>
        <article className="grid grid-cols-2 w-full   container mx-auto ">
          <ArticleHeader title="Value">
            <p className="font-bold tracking-widest text-base lg:text-3xl text-pretty text-center">
              파인파밍은 농업ㆍ농촌에서 배우는 <br />
              교육적인 가치와 경험을 추구합니다.
            </p>
          </ArticleHeader>

          <div className="w-full grid grid-cols-2 lg:grid-cols-3  col-span-2 gap-3 lg:gap-6">
            <div className="col-span-2 lg:col-span-1 flex flex-col gap-2">
              <div className="relative w-full aspect-video bg-contain">
                <Image
                  src={
                    "https://imagedelivery.net/8GmAyNHLnOsSkmaGEU1nuA/537a67b9-00b2-43be-82fb-ad5a31d34800/public"
                  }
                  alt="value image7"
                  className="object-cover"
                  fill
                  sizes="100%"
                />
              </div>
              <div className="flex flex-col gap-1 p-3 lg:p-0 lg:py-3">
                <p className="font-semibold  text-lg">
                  자연의 소중함을 경험합니다.
                </p>
                <p className="text-neutral-500  text-wrap break-words text-sm lg:text-lg">
                  파인파밍의 체험은 자연과 농업에 대한 사랑을 키울 수 있게
                  도와줍니다.
                </p>
              </div>
            </div>
            <div className="col-span-2 lg:col-span-1 flex flex-col gap-2">
              <div className="relative w-full aspect-video bg-contain">
                <Image
                  src={
                    "https://imagedelivery.net/8GmAyNHLnOsSkmaGEU1nuA/833a827d-75d0-401c-522d-6bfc4f40b500/public"
                  }
                  alt="value image8"
                  className=" object-cover"
                  fill
                  sizes="100%"
                />
              </div>
              <div className="flex flex-col gap-1 p-3 lg:p-0 lg:py-3">
                <p className="font-semibold  text-lg">
                  스스로 지식을 배우고 이해합니다.
                </p>
                <p className="text-neutral-500  text-wrap break-words text-sm lg:text-lg">
                  자연에서 보고, 듣고, 느끼며 체험한 교육을 통해 오래 기억되는
                  생생한 추억을 제공합니다.
                </p>
              </div>
            </div>
            <div className="col-span-2 lg:col-span-1 flex flex-col gap-2">
              <div className="relative w-full aspect-video bg-contain">
                <Image
                  src={
                    "https://imagedelivery.net/8GmAyNHLnOsSkmaGEU1nuA/6ba866f0-703c-484f-d784-5fbb67206100/public"
                  }
                  alt="value image9"
                  className=" object-cover"
                  fill
                  sizes="100%"
                />
              </div>
              <div className="flex flex-col gap-1 p-3 lg:p-0 lg:py-3">
                <p className="font-semibold  text-lg">
                  심리적 안정감이 높아집니다.
                </p>
                <p className="text-neutral-500  text-wrap break-words text-sm lg:text-lg">
                  자연이 주는 여유로움을 통해 스트레스를 줄이고 건강한 신체를
                  위한 정서적 안정을 느낄 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </article>
        <article className="grid grid-cols-2 w-full   container mx-auto  lg:mt-24 gap-6">
          <div className="flex flex-col items-start gap-3 col-span-2 lg:col-span-1  px-6 lg:px-12">
            <header className="flex flex-col  items-start  lg:px-0  py-12 lg:py-24  col-span-2 lg:container lg:mx-auto gap-2 ">
              <h1 className="text-primary font-semibold text-lg">Features</h1>
              <p className="font-bold tracking-widest text-base lg:text-3xl text-pretty text-start">
                우리는 고객과 함께 발전합니다.
              </p>
            </header>

            <div className="flex flex-col items-start gap-3 ">
              <div className="flex flex-col gap-1">
                <p className="text-neutral-500">
                  최고의 농장을 발굴하고 추천하기 위해
                </p>
                <p className="text-neutral-500">
                  파인파밍은 고객의 경험과 지식을 적극적으로 공유합니다.
                </p>
              </div>
              <div className="flex flex-col gap-6  border-l-2 pl-6">
                <div className="flex flex-col gap-3">
                  <p className="font-semibold">Magazine</p>
                  <ul className="flex flex-col gap-1">
                    <li className="text-neutral-500">
                      - 교육 전문가가 직접 경험한 체험 후기
                    </li>
                    <li className="text-neutral-500">
                      - 농업체험에서 찾은 의미있는 교육 노하우 공유
                    </li>
                  </ul>
                  <Link
                    href={"/magazine"}
                    className="text-primary  font-semibold flex flex-row items-center gap-3"
                  >
                    Magazine 보기
                    <ArrowRightIcon className="size-4" />
                  </Link>
                </div>
                <div className="flex flex-col gap-3">
                  <p className="font-semibold">Community</p>
                  <ul className="flex flex-col gap-1">
                    <li className="text-neutral-500">
                      - 직접 경험한 체험과 농장에 대한 다양한 정보 공유
                    </li>
                    <li className="text-neutral-500">
                      - 파인파밍이 보완해야할 조언과 농장정보 추천
                    </li>
                  </ul>
                  <Link
                    href={"/community"}
                    className="text-primary  font-semibold flex flex-row items-center gap-3"
                  >
                    Community 보기
                    <ArrowRightIcon className="size-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2 lg:col-span-1 flex flex-col ">
            <div className="w-full aspect-[2/3]   relative bg-red-200">
              <Image
                src={
                  "https://imagedelivery.net/8GmAyNHLnOsSkmaGEU1nuA/5d83aee8-1609-4a25-7ad4-d1fb4dcd5000/public"
                }
                alt="section10"
                fill
                className=" object-cover"
                sizes="100%"
              />
            </div>
          </div>
        </article>
      </section>
    </>
  );
}
