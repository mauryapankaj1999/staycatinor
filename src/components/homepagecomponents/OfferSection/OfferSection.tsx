"use client";
import React, { useState } from "react";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import offeriocn from "@/assets/allimg/offeriocn1.png";
import Image from "next/image";
import { useCoupon } from "@/services/coupon.service";
import { STATUS } from "@/common/contstant";
import { toastSuccess } from "@/utils/toast";
import dynamic from "next/dynamic";
import { generateFilePath } from "@/services/url.service";
import moment from "moment";

const Swiper = dynamic(() => import("swiper/react").then((mod) => mod.Swiper), {
  ssr: false,
});

export default function OfferSection() {
  const { data: copouns } = useCoupon({
    status: STATUS.ACTIVE,
    show: true,
  });

  const locationswiper = {
    0: {
      slidesPerView: 1.1,
    },
    400: {
      slidesPerView: 1.4,
    },
    500: {
      slidesPerView: 1.6,
    },
    576: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 2.5,
    },
    1280: {
      slidesPerView: 3,
    },
    1535: {
      slidesPerView: 3.5,
    },
  };
  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toastSuccess("Code Copied");
  };

  return (
    <>
      {copouns && copouns.data.length > 0 && (
        <div className="w-[95%] md:w-[85%] lg:w-[85%] 2xl:w-[85%] mt-[0.45rem] md:mt-[2rem] md:mb-[1rem] mx-auto relative">
          <div className="lg:text-[33px] md:text-[28px] text-[21px] text-[#da6633] font-medium absolute -top-1">
            Offers for You{" "}
          </div>

          <Swiper
            spaceBetween={20}
            speed={1000}
            freeMode={true}
            navigation={true}
            modules={[Navigation]}
            className="offersection "
            slidesPerView={2.7}
            breakpoints={locationswiper}
          >
            {copouns &&
              copouns?.data.map((el, index) => {
                return (
                  <>
                    <SwiperSlide className="mb-4">
                      <div className="border border-[#000] px-4 py-4 lg:py-8 rounded-md">
                        <Image
                          src={el.icon ? generateFilePath(el.icon) : offeriocn}
                          alt=""

                          width={120}
                          height={120}
                          className="w-16 h-16  object-contain mb-5 m-auto"
                        />
                        <p className="font-montserrat text-[12px] sm:text-[16px] text-[#676767] text-center">
                          {el.description}
                        </p>
                        <p className="font-montserrat text-[13px] my-4 text-[#000] text-center">
                          Valid Till: {moment(el.expiryDate).format("DD MMM YYYY")}
                        </p>
                        <p className="font-montserrat text-[13px] mb-2 text-[#000] text-center">
                          ₹ {el.value} {el.type == "FLATOFF" ? "" : "%"} OFF
                        </p>
                        <div className="flex gap-2">
                          <div className="flex-[2] border-dashed border-[1px] border-[#000] px-2 py-2 text-center font-montserrat text-[12px] sm:text-[16px] rounded-full">
                            {el.name}
                          </div>
                          <div
                            onClick={() => copyCode(el.name)}
                            className="flex-1 border-dashed border-[1px] hover:bg-[#da6633] bg-navibule text-[#fff] cursor-pointer hover:border-[#da6633] border-[#202a37] px-2 py-2 text-center text-[12px] rounded-full sm:text-[16px] font-montserrat text-nowrap"
                          >
                            Copy Code
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>

                    {/* <SwiperSlide className="mb-4">
                    <div className="border border-[#000] px-4 py-4 lg:py-8 rounded-md">
                      <Image
                        src={offeriocn}
                        alt=""
                        className="w-10 h-10 object-contain mb-5 m-auto"
                      />
                      <p className="font-montserrat text-[12px] sm:text-[16px] text-[#676767]">
                        {el.description}
                      </p>
                      <p className="font-montserrat text-[13px] my-4 text-[#000]">
                        Expires {new Date(el.expiryDate).toDateString()}
                      </p>
                      <p className="font-montserrat text-[13px] mb-2 text-[#000]">
                        {el.value} {el.type == "FLATOFF" ? "" : "%"} OFF
                      </p>
                      <div className="flex gap-2">
                        <div className="flex-[2] border-dashed border-[1px] border-[#000] px-2 py-2 text-center font-montserrat text-[12px] sm:text-[16px] rounded-full">
                          {el.name}
                        </div>
                        <div
                          onClick={() => copyCode(el.name)}
                          className="flex-1 border-dashed border-[1px] hover:bg-[#da6633] bg-navibule text-[#fff] cursor-pointer hover:border-[#da6633] border-[#202a37] px-2 py-2 text-center text-[12px] rounded-full sm:text-[16px] font-montserrat text-nowrap"
                        >
                          Copy Code
                        </div>
                      </div>
                    </div>
                  </SwiperSlide> */}
                  </>
                );
              })}
          </Swiper>
        </div>
      )}
    </>
  );
}
