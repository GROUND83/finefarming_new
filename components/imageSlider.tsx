"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
export default function ImageSlider({ images }: { images: any }) {
  return (
    <div className=" col-span-12 bg-white">
      {images.length > 0 && (
        <Swiper
          loop
          speed={2000}
          autoplay
          pagination={true}
          modules={[Pagination, Navigation]}
          className=" w-full h-full "
        >
          {images.map((image: any, index: any) => {
            return (
              <SwiperSlide key={index}>
                <div className=" relative w-full bg-neutral-100  aspect-video">
                  <Image
                    src={image}
                    alt={`image-${index}`}
                    priority
                    width={200}
                    height={200}
                    className="object-cover w-full aspect-video"
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </div>
  );
}
