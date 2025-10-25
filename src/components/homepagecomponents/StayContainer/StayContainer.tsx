"use client";
import React, { useState } from "react";
import groupimg from "@/assets/homepage/groupimg.png";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import Link from "next/link";
import smallgroup from "@/assets/mainbanner/blogimg.png";
import { HiArrowRight } from "react-icons/hi";
import { SectionProps } from "@/services/page.service";
import { generateFilePath } from "@/services/url.service";
const StayContainer = ({ section }: { section: SectionProps | null }) => {
  return (
    <>
      {section && section?.image && (
        <div className="w-[95%] md:w-[85%] lg:w-[85%] 2xl:w-[85%] mx-auto !pb-4 pt-0 xl:!pb-[1.55rem] scroll-py-12 relative md:mt-[1.55rem]">
          <div
            style={{
              backgroundImage: `url(${generateFilePath(section?.image)})`,
            }}
            className=" bg-cover bg-right rounded-md w-full py-5 font-medium between-max1280-and-1280min:h-[310px] between-max1440-and-1440min:h-[328px] md:h-[250px] 2xl:h-[435px] between-xl-and-16xl:h-[364px] xl:h-[338px] bg-full flex items-center md:items-end lg:items-end p-4 md:pb-20 lg:pb-20 2xl:pb-20 xl:pb-20 custome_shadow"
          >
            <div className=" md:flex justify-between w-full lg:px-28 md:items-end lg:items-end xl:items-end 2xl:items-end">
              <div className="relative lg:top-12 xl:top-0 md:w-[450px]">
                <h2 className="text-white lg:text-[33px] md:text-[28px] text-[21px] font-playfair font-medium capitalize mb-[2rem] sm:mb-[0rem]">
                  {section?.title}
                </h2>
                <p className="text-white between-max1280-and-1280min:text-[0.9rem] md:text-[1rem] text-[0.8rem] font-montserrat pt-10 hidden sm:block">
                  {section?.description}
                </p>
              </div>
              <div className="lg:text-end">
                <Link
                  href={section.url}
                  // href={"/Loyalty"}
                  className="bg-[#da6633] font-montserrat  px-[1rem] py-[0.6rem] md:px-[1.6rem] md:py-[1rem] inline-block between-max1280-and-1280min:text-[0.9rem]  text-[0.9rem] xl:text-[1.1rem] text-white rounded-full hover:bg-[#202a36]"
                >
                  Explore now
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StayContainer;
