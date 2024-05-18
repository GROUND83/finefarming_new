"use client";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
export default function MainBanner({ banners }: { banners: any }) {
  return (
    <div className=" w-full max-w-[1600px] mx-auto aspect-[4/3]  lg:aspect-[16/7]  relative">
      <Swiper
        loop={banners.length > 0 ? true : false}
        speed={3000}
        spaceBetween={30}
        autoplay
        pagination={true}
        modules={[Pagination, Navigation]}
        className=" w-full h-full "
        navigation
      >
        {banners.map((banner: any, index: any) => {
          return (
            <SwiperSlide key={index}>
              <Link
                href={`/event/${banner.id}`}
                className="flex flex-col  items-center lg:items-end justify-center h-full z-10 relative"
              >
                <Image
                  src={banner.image}
                  alt="article1"
                  fill
                  className="object-cover  brightness-75"
                  sizes="100%"
                />
                <div className=" absolute bg-white lg:right-24 w-[80%] lg:w-[300px]  flex flex-col items-center justify-center  p-6 lg:p-12 gap-3 lg:gap-6">
                  <p className="text-lg font-semibold text-primary">EVENT</p>
                  <p className="text-2xl text-pretty">{banner.title}</p>
                  <p className="text-sm text-pretty">{banner.period}</p>
                  <p className="text-sm whitespace-pre-line text-wrap">
                    {banner.description}
                  </p>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
