"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import imgmap from "@/assets/allimg/map1.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import HomeCheckoutForm from "../HomeCheckoutForm/HomeCheckoutForm";
import { IBanner, useBanner } from "@/services/banner.service";
import { STATUS } from "@/common/contstant";
import { generateFilePath } from "@/services/url.service";
import {
  IoArrowBack,
  IoCloseCircleSharp,
  IoSearchOutline,
} from "react-icons/io5";
import Mobilecustomecheckoutform from "../Mobilecustomecheckoutform/Mobilecustomecheckoutform";
import mapmarker from "@/assets/allimg/location.png";

export default function Banner() {
  const { data: banners } = useBanner({ status: STATUS.ACTIVE });
  const [bannersList, setBannersList] = useState<IBanner[]>([]);
  useEffect(() => {
    if (banners && banners?.data) {
      setBannersList(banners?.data);
    }
  }, [banners]);

  const [customemodal, setCustomemodal] = useState(false);
  const [handelform, setHandelform] = useState(true);

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
    <>
      <div className="flex items-center justify-center">
        <div className="w-[100%] md:w-[100%] lg:w-[100%] 2xl:w-[100%] mx-auto relative bgimg_header">
          <Swiper
            spaceBetween={1}
            autoplay={true}
            freeMode={true}
            // pagination={{
            //   type: "fraction",
            // }}
            speed={600}
            effect={"fade"}
            // loop
            modules={[EffectFade, Autoplay, Pagination]}
            className="mySwiper1 homeSlider"
          >
            {bannersList &&
              bannersList.map((el, index) => {
                return (
                  <>
                    <SwiperSlide key={el._id}>
                      <div className="image relative w-full h-[35vh] sm:h-[70vh] md:h-[70vh] lg:h-[60vh] xl:h-[89vh]  brightness-[.70]">
                        <Image
                          src={generateFilePath(el.thumbnail)}
                          alt=""
                          fill
                          priority
                          className="object-cover"
                        />
                      </div>
                    </SwiperSlide>
                  </>
                );
              })}

            <div>
              <Image
                src={imgmap}
                alt=""
                className="absolute top-0 -right-10 h-full between-max1280-and-1280min:w-[400px] 2xl:w-[547px] z-40 object-contain"
              />
            </div>

            <div className="location_list" >
              <div className="absolute top-[6rem] right-[8.5rem] z-[99999] fade-in fade-in-1">
                <Image src={mapmarker} alt="" className="h-8 w-8" />
              </div>
              <div className="absolute top-[42%] right-[25%] z-[99999] fade-in fade-in-2">
                <Image src={mapmarker} alt="" className="h-8 w-8" />
              </div>
              <div className="absolute bottom-[6rem] right-[8.5rem] z-[99999] fade-in fade-in-3">
                <Image src={mapmarker} alt="" className="h-8 w-8" />
              </div>
            </div>
          </Swiper>
          <div className="absolute left-0 right-0 text-center z-10 top-1/3 hidden lg:block" >
            <HomeCheckoutForm handelform={handelform} setHandelform={setHandelform} />
            {/* <Customecalender /> */}
          </div>
        </div>
      </div>

      <div
        className="serchinput lg:hidden"
        onClick={() => setCustomemodal(!customemodal)}
      >
        <IoSearchOutline /> Search for a Hotal{" "}
      </div>

      <div className={`customemodalcalse ${customemodal ? "block" : "hidden"}`}>
        <div className="headermodal p-4">
          <div className="flex justify-between">
            <div className="" onClick={() => setCustomemodal(!customemodal)}>
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
    </>
  );
}
