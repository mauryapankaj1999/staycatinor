"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Typewriter from "typewriter-effect";
import Image from "next/image";
import {
  IoArrowBack,
  IoCloseCircleSharp,
  IoSearchOutline,
} from "react-icons/io5";
import Mobilecustomecheckoutform from "@/components/homepagecomponents/Mobilecustomecheckoutform/Mobilecustomecheckoutform";
import { useBanner } from "@/services/banner.service";
import { STATUS } from "@/common/contstant";
import { generateFilePath } from "@/services/url.service";

const Mobilebanner = () => {
  const [customemodal, setCustomemodal] = useState(false);
  const { data: banners } = useBanner({ status: STATUS.ACTIVE });

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;

    if (customemodal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalStyle;
    }

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [customemodal]);

  return (
    <div>
      <div className="">
        <Swiper
          loop
          pagination={{
            clickable: true, // This ensures the pagination dots are clickable
          }}
          // pagination={true}
          autoplay={{ delay: 3000 }}
          modules={[Autoplay, Pagination]}
          className="homesliderinmobile -mt-[4rem]"
        >
          {banners?.data &&
            banners?.data.length > 0 &&
            banners?.data.map((el, index) => (
              <SwiperSlide key={el._id ?? index}>
                <div className="relative h-[45vh] lg:h-[55vh]  w-full">
                  <Image
                    src={generateFilePath(el.thumbnail)}
                    alt=""
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="overlaycss"></div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>

        <div className="absolute top-[20%] lg:top-[26%] left-0 right-[15px] text-center text-[#fff] w-[90%] text-[1.7rem] mx-auto z-20">
          <h5 className="text-[1.2rem] md:text-[2rem]">
            Your perfect getaway awaits
          </h5>
        </div>
        <div className="absolute top-[24%] lg:top-[30%] left-[8px] right-[18px] lg:left-0 lg:right-0 text-center mx-auto z-20">
          <div className="">
            <div
              className="serchinput font-montserrat lg:hidden text-sm"
              onClick={() => setCustomemodal(!customemodal)}
            >
              <IoSearchOutline /> Search for a{" "}
              <Typewriter
                options={{
                  strings: ["Hotel", "Property", "Apartment"],
                  autoStart: true,
                  loop: true,
                }}
              />{" "}
            </div>
          </div>
        </div>
      </div>
      <div className={`customemodalcalse ${customemodal ? "block" : "hidden"}`}>
        <div className="relative">
          <div className="headermodal p-4">
            <div className="flex justify-between">
              <div
                className=""
                onClick={() => {
                  window.history.replaceState(
                    {},
                    document.title,
                    window.location.pathname
                  );
                  setCustomemodal(false);
                }}
              >
                <IoArrowBack className="text-[1.4rem]" />
              </div>
              <div className="" onClick={() => setCustomemodal(!customemodal)}>
                <IoCloseCircleSharp className="text-[1.4rem]" />
              </div>
            </div>
          </div>
          <div className="modalbody py-3 px-4">
            <Mobilecustomecheckoutform />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mobilebanner;
