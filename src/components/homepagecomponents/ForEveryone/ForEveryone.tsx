import Image from "next/image";
import React from "react";
import { SectionProps } from "@/services/page.service";
import { generateFilePath } from "@/services/url.service";
import { Navigation, Autoplay } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";

const Swiper = dynamic(() => import("swiper/react").then((mod) => mod.Swiper), {
  ssr: false,
});

export default function ForEveryone({ section }: { section: SectionProps[] }) {
  const responsiveweb = {
    0: {
      slidesPerView: 1.7,
      spaceBetween: 15,
    },
    350: {
      slidesPerView: 1.9,
      spaceBetween: 15,
    },
    400: {
      slidesPerView: 2.2,
      spaceBetween: 15,
    },
    450: {
      slidesPerView: 2.4,
      spaceBetween: 15,
    },
    500: {
      slidesPerView: 2.6,
      spaceBetween: 15,
    },
    530: {
      slidesPerView: 2.8,
      spaceBetween: 15,
    },
    560: {
      slidesPerView: 2.9,
      spaceBetween: 15,
    },
    768: {
      slidesPerView: 2.8,
      spaceBetween: 15,
    },
    800: {
      slidesPerView: 3,
      spaceBetween: 15,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1200: {
      slidesPerView: 3.3,
      spaceBetween: 20,
    },
    1250: {
      slidesPerView: 3.5,
      spaceBetween: 20,
    },
    1400: {
      slidesPerView: 3.8,
      spaceBetween: 20,
    },
    1450: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    1535: {
      slidesPerView: 3.8,
      spaceBetween: 20,
    },
    1600: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    1700: {
      slidesPerView: 4.2,
      spaceBetween: 20,
    },
    1800: {
      slidesPerView: 4.4,
      spaceBetween: 20,
    },
    1900: {
      slidesPerView: 4.5,
      spaceBetween: 20,
    },
  };

  return (
    <>
      <div>
        <div className="w-[95%] md:w-[85%] lg:w-[85%] 2xl:w-[85%] mx-auto py-7 md:pt-[1.2rem] md:pb-7 lg:py-[1.5rem] xl:py-7">
          <h2 className="lg:text-[33px] md:text-[28px] text-[21px] text-[#da6633] font-medium font-playfair text-center mb-2">
            We Have Something For Everyone
          </h2>
          <p className="lg:!text-[16px] text-xs text-primarygray font-montserrat font-medium text-center lg:!leading-6">
            From cozy corners for two to sprawling villas for the whole crew,
            choose from thoughtfully <br className="hidden lg:block" /> designed
            homes that match your mood, style, and group size.
          </p>

          <Swiper
            modules={[Navigation, Autoplay]}
            loop
            speed={2000}
            freeMode={true}
            navigation={true}
            className="mySwiper_mian"
            breakpoints={responsiveweb}
          >
            {section &&
              section.map((el, index) => (
                <SwiperSlide className="rounded-lg">
                  <Link
                    href={`${el.url}`}
                    target="_blank"
                    className="custome_shadow inline-block w-full rounded-lg"
                  >
                    <div className="!relative lg:!group !rounded-lg group">
                      <div className="relative w-full 2xl:h-[390px] xl:h-[365px] lg:h-[355px] md:h-[280px] h-[215px] rounded-lg overflow-hidden">
                        <Image
                          src={generateFilePath(el.image)}
                          fill
                          alt=""
                          className="object-cover rounded-lg"
                        />
                        <div className="h-full w-full bg-custom-gradient absolute left-0 pt-3 right-0 text-center mx-auto z-10 bottom-0 rounded-b-xl gap-3"></div>
                      </div>
                      <div className="absolute bottom-5 z-20 left-0 right-0 text-center m-auto">
                        <p className="text-[#fff] font-theseasion text-[15px] md:text-[1rem] lg:text-[22px] tracking-widest">
                          {el.title}
                        </p>
                        <p className="font-montserrat text-[0.8rem] font-normal sm:text-[1rem] text-[#fff] 2xl:text-[1.2rem] lg:text-[1rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {el.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}
