"use client";
import React from "react";
import { Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import { STATUS } from "@/common/contstant";
import { useBlog } from "@/services/blog.service";
import { generateFilePath } from "@/services/url.service";

const BREAKPOINTS = {
  0: { slidesPerView: 1.7, spaceBetween: 15 },
  350: { slidesPerView: 1.9, spaceBetween: 15 },
  400: { slidesPerView: 2.2, spaceBetween: 15 },
  450: { slidesPerView: 2.4, spaceBetween: 15 },
  500: { slidesPerView: 2.6, spaceBetween: 15 },
  530: { slidesPerView: 2.8, spaceBetween: 15 },
  560: { slidesPerView: 2.9, spaceBetween: 15 },
  768: { slidesPerView: 2.8, spaceBetween: 15 },
  800: { slidesPerView: 3, spaceBetween: 15 },
  992: { slidesPerView: 3, spaceBetween: 20 },
  1200: { slidesPerView: 3.3, spaceBetween: 20 },
  1250: { slidesPerView: 3.5, spaceBetween: 20 },
  1400: { slidesPerView: 3.8, spaceBetween: 20 },
  1450: { slidesPerView: 4, spaceBetween: 20 },
  1535: { slidesPerView: 3.8, spaceBetween: 20 },
  1600: { slidesPerView: 4, spaceBetween: 20 },
  1700: { slidesPerView: 4.2, spaceBetween: 20 },
  1800: { slidesPerView: 4.4, spaceBetween: 20 },
  1900: { slidesPerView: 4.5, spaceBetween: 20 },
};

const Blog = () => {
  const { data: blogs } = useBlog({
    status: STATUS.ACTIVE,
    top: STATUS.ACTIVE,
  });

  return (
    <div className="w-[95%] md:w-[85%] mx-auto relative pt-2 mt-10">
      <h2 className="absolute font-playfair font-medium lg:top-0 lg:text-[33px] md:text-[28px] text-[21px] text-[#da6633]">
        Exceptional Experiences Await
      </h2>
      {blogs?.data && (
        <Swiper
          modules={[Navigation, Autoplay]}
          loop={blogs.data.length > 4}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          speed={700}
          freeMode
          navigation
          className="mySwiper_mian"
          breakpoints={BREAKPOINTS}
        >
          {blogs.data.map((el) => (
            <SwiperSlide key={el._id}>
              <Link href={`/blog/${el._id}`} className="block w-full">
                <div className="relative group rounded-lg overflow-hidden shadow-lg h-[215px] md:h-[280px] lg:h-[355px] xl:h-[365px] 2xl:h-[390px]">
                  <Image
                    src={generateFilePath(el.thumbnail)}
                    fill
                    alt={el.name || "Blog thumbnail"}
                    className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-20">
                    <h4 className="text-white md:text-[16px] lg:text-[25px] text-center line-clamp-2 transition-all duration-300 group-hover:-translate-y-2">
                      {el.name}
                    </h4>
                    <p
                    id="blog-card"
                      className="!text-white font-montserrat lg:text-[14px] text-[12px] text-center line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200"
                      dangerouslySetInnerHTML={{ __html: el.description }}
                    />
                    </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Blog;
