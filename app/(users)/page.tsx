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
import Footer from "./_components/footerWrap";

export default function Page() {
  return (
    <section className="flex w-full flex-col items-start">
      <article className="grid grid-cols-2 w-full    gap-12 mt-12 lg:container lg:mx-auto">
        <div className="flex flex-col items-start justify-center col-span-2 lg:col-span-1 gap-9 px-6 lg:px-0 py-6 lg:py-12 ">
          <header className="font-semibold text-primary text-pretty text-4xl lg:text-5xl tracking-normal flex flex-col items-start gap-2 w-full">
            <p className="">FineFarming,</p>
            <p className="">Best Farms for you </p>
          </header>
          <p className="text-neutral-500 tracking-normal w-full text-sm text-pretty lg:text-base ">
            우리는 농업체험을 선택하는데 필요한 지식을 제공하는 동시에 여러분의
            체험활동이 기억에 남고 유익한 추억이 될 수 있도록 돕습니다.
          </p>
          <form className="flex flex-col lg:flex-row lg:items-center  items-start gap-3 w-full ">
            <div className="w-full">
              <Input name="email" placeholder="이메일을 입력하세요." />
            </div>
            <Button type="submit" className=" ">
              최신 소식 받아보기
            </Button>
          </form>
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
            priority={true}
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
              className=" object-cover"
              fill
              priority={true}
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
      <article className="grid grid-cols-2 w-full   container mx-auto gap-12">
        <ArticleHeader title="Target">
          <p className="font-bold tracking-widest text-base lg:text-3xl text-pretty text-center">
            파인파밍은 고객 연령대별 <br className="lg:hidden" /> 맞춤농장을
            추천합니다.
          </p>
        </ArticleHeader>

        <div className="w-full grid grid-cols-2  col-span-2  container mx-auto gap-6 lg:gap-12">
          <ImageWrap last={true}>
            <Image
              src={
                "https://imagedelivery.net/8GmAyNHLnOsSkmaGEU1nuA/9184127f-ef0b-4adf-75ef-becf127cc500/public"
              }
              alt="section1"
              className="  object-cover"
              fill
              priority={true}
            />
          </ImageWrap>
          <ArticleDescription>
            <div className="flex flow-row items-end gap-1  ">
              <p className="text-lg lg:text-3xl font-semibold tracking-wide">
                유아
              </p>
              <span className="text-base lg:text-lg">(4세이하)</span>
            </div>
            <div className="flex flex-row items-start gap-2">
              <CheckCircleIcon className="size-6" />
              <div className="flex flex-col items-start gap-1">
                <p className="font-semibold text-base">
                  식물, 꽃, 열매를 이해할 수 있는 체험
                </p>
                <p className="text-neutral-500 text-sm lg:text-base">
                  &quot;딸기는 무슨 색일까?&quot;
                </p>
              </div>
            </div>
            <div className="flex flex-row items-start gap-2">
              <CheckCircleIcon className="size-6" />
              <div className="flex flex-col items-start gap-1">
                <p className="font-semibold text-base">
                  여유있는 수확체험이 가능한 농장
                </p>
                <p className="text-neutral-500 text-sm lg:text-base">
                  유아 전용 이용시간 예약 서비스 제공
                </p>
              </div>
            </div>
            <div className="flex flex-row items-start gap-2">
              <CheckCircleIcon className="size-6" />
              <div className="flex flex-col items-start gap-1">
                <p className="font-semibold text-base">
                  부모님과 아이가 함께 즐길 수 있는 시설
                </p>
              </div>
            </div>

            <Link
              href={"/product"}
              className="text-primary  font-semibold flex flex-row items-center gap-3 mt-3"
            >
              추천농장 보기
              <ArrowRightIcon className="size-4" />
            </Link>
          </ArticleDescription>
        </div>
        <div className="w-full grid grid-cols-2  col-span-2  container mx-auto gap-6 lg:gap-12  ">
          <ImageWrap last={false}>
            <Image
              src={
                "https://imagedelivery.net/8GmAyNHLnOsSkmaGEU1nuA/85dbe136-1ff4-4a17-7f9e-12292fb06c00/public"
              }
              alt="section2"
              className="  object-cover"
              fill
              priority={true}
            />
          </ImageWrap>
          <ArticleDescription>
            <div className="flex flow-row items-end gap-1  ">
              <p className="text-lg  lg:text-3xl font-semibold tracking-wide">
                미취학아동
              </p>
              <span className="text-base  lg:text-lg">(5~7세)</span>
            </div>
            <div className="flex flex-row items-start gap-2">
              <CheckCircleIcon className="size-6" />
              <div className="flex flex-col items-start gap-1">
                <p className="font-semibold text-base">
                  자연환경과 과학을 이해하는 체험
                </p>
                <p className="text-neutral-500 text-sm lg:text-base">
                  &quot;토마토는 과일일까? 채소일까?&quot;
                </p>
              </div>
            </div>
            <div className="flex flex-row items-start gap-2">
              <CheckCircleIcon className="size-6" />
              <div className="flex flex-col items-start gap-1">
                <p className="font-semibold text-base">
                  아이가 직접 체험할 수 있는 프로그램 운영
                </p>
                <p className="text-neutral-500 text-sm lg:text-base">
                  농업ㆍ생태교육 관련 그림그리기 키트 제공
                </p>
              </div>
            </div>
            <div className="flex flex-row items-start gap-2">
              <CheckCircleIcon className="size-6" />
              <div className="flex flex-col items-start gap-1">
                <p className="font-semibold text-base">
                  환경보호ㆍ리사이클링 참여 이벤트 진행
                </p>
              </div>
            </div>

            <Link
              href={"/product"}
              className="text-primary  font-semibold flex flex-row items-center gap-3 mt-3"
            >
              추천농장 보기
              <ArrowRightIcon className="size-4" />
            </Link>
          </ArticleDescription>
        </div>
        <div className="w-full grid grid-cols-2  col-span-2  container mx-auto gap-6 lg:gap-12">
          <ImageWrap last={true}>
            <Image
              src={
                "https://imagedelivery.net/8GmAyNHLnOsSkmaGEU1nuA/e5a2ac6f-6769-4c1a-deda-93e20ce98900/public"
              }
              alt="section3"
              className="object-cover"
              fill
              priority={true}
            />
          </ImageWrap>
          <ArticleDescription>
            <div className="flex flow-row items-end gap-1  ">
              <p className="text-lg  lg:text-3xl font-semibold tracking-wide">
                초등학생
              </p>
              <span className="text-base lg:text-lg">(8세이상)</span>
            </div>
            <div className="flex flex-row items-start gap-2">
              <CheckCircleIcon className="size-6" />
              <div className="flex flex-col items-start gap-1">
                <p className="font-semibold text-base">
                  스마트팜과 AI를 이해할 수 있는 체험
                </p>
                <p className="text-neutral-500 text-sm lg:text-base">
                  &quot;스마트팜 딸기에게 물은 누가 줄까?&quot;
                </p>
              </div>
            </div>
            <div className="flex flex-row items-start gap-2">
              <CheckCircleIcon className="size-6" />
              <div className="flex flex-col items-start gap-1">
                <p className="font-semibold text-base">
                  농장 IoT를 통해 배우는 데이터 과학
                </p>
                <p className="text-neutral-500 text-sm lg:text-base">
                  교육전문가와 함께 만든 체험학습지 제공
                </p>
              </div>
            </div>
            <div className="flex flex-row items-start gap-2">
              <CheckCircleIcon className="size-6" />
              <div className="flex flex-col items-start gap-1">
                <p className="font-semibold text-base">
                  단체 체험학습ㆍ견학 프로그램 운영
                </p>
              </div>
            </div>

            <Link
              href={"/product"}
              className="text-primary  font-semibold flex flex-row items-center gap-3 mt-3"
            >
              추천농장 보기
              <ArrowRightIcon className="size-4" />
            </Link>
          </ArticleDescription>
        </div>
        <div className="w-full grid grid-cols-2  col-span-2  container mx-auto gap-6 lg:gap-12">
          <ImageWrap last={false}>
            <Image
              src={
                "https://imagedelivery.net/8GmAyNHLnOsSkmaGEU1nuA/6f2e29be-4aef-4276-1b71-65eec22f4700/public"
              }
              alt="section1"
              className="object-cover"
              fill
              priority={true}
            />
          </ImageWrap>
          <ArticleDescription>
            <div className="flex flow-row items-end gap-1  ">
              <p className="text-lg  lg:text-3xl font-semibold tracking-wide">
                성인
              </p>
              <span className="text-base lg:text-lg">(힐링ㆍ식물치유)</span>
            </div>
            <div className="flex flex-row items-start gap-2">
              <CheckCircleIcon className="size-6" />
              <div className="flex flex-col items-start gap-1">
                <p className="font-semibold text-base">
                  자연과 농촌에서 경험하는 치유농업 체험
                </p>
                <p className="text-neutral-500 text-sm lg:text-base">
                  흙과 식물이 인체에 주는 건강한 효과
                </p>
              </div>
            </div>
            <div className="flex flex-row items-start gap-2">
              <CheckCircleIcon className="size-6" />
              <div className="flex flex-col items-start gap-1">
                <p className="font-semibold text-base">
                  수확을 통해 경험하는 정서ㆍ심리적 안정
                </p>
                <p className="text-neutral-500 text-sm lg:text-base">
                  화분(상자텃밭) 교육 프로그램 운영
                </p>
              </div>
            </div>
            <div className="flex flex-row items-start gap-2">
              <CheckCircleIcon className="size-6" />
              <div className="flex flex-col items-start gap-1">
                <p className="font-semibold text-base">
                  로컬 레스토랑ㆍ카페 연계 투어(이벤트)
                </p>
                <p className="text-neutral-500 text-sm lg:text-base">
                  화분(상자텃밭) 교육 프로그램 운영
                </p>
              </div>
            </div>
            <Link
              href={"/product"}
              className="text-primary  font-semibold flex flex-row items-center gap-3 mt-3"
            >
              추천농장 보기
              <ArrowRightIcon className="size-4" />
            </Link>
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
              />
            </div>
            <div className="flex flex-col gap-1 p-3 lg:p-0 lg:py-3">
              <p className="font-semibold  text-lg">
                심리적 안정감이 높아집니다.
              </p>
              <p className="text-neutral-500  text-wrap break-words text-sm lg:text-lg">
                자연이 주는 여유로움을 통해 스트레스를 줄이고 건강한 신체를 위한
                정서적 안정을 느낄 수 있습니다.
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
          <div className="w-full aspect-[2/3]  bg-cover relative">
            <Image
              src={
                "https://imagedelivery.net/8GmAyNHLnOsSkmaGEU1nuA/5d83aee8-1609-4a25-7ad4-d1fb4dcd5000/public"
              }
              alt="section10"
              fill
              priority={true}
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </article>
      <Footer />
    </section>
  );
}
