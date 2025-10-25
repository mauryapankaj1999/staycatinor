import React, { useMemo, useState } from "react";
import { FiUser } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { IoCalendarClearOutline, IoSearchOutline } from "react-icons/io5";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import groupimg from "@/assets/homepage/groupimg.png";
import iconone1 from "@/assets/allimg/needicon1.png";
import iconone2 from "@/assets/allimg/needicon2.png";
import iconone3 from "@/assets/allimg/needicon4.png";
import iconone4 from "@/assets/allimg/needicon3.png";
import iconone5 from "@/assets/allimg/needicon5.png";
import iconone6 from "@/assets/allimg/needicon6.png";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import enUS from "date-fns/locale/en-US";
import Image from "next/image";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { usePage } from "@/services/page.service";
import { generateFilePath } from "@/services/url.service";
import dynamic from "next/dynamic";

const Swiper = dynamic(() => import("swiper/react").then((mod) => mod.Swiper), {
  ssr: false,
});

const WhatYouneed = () => {
  const [iconlist, setIconlist] = useState([
    {
      iconimg: iconone3,
      nameicon: "24/7 concierge support",
    },
    {
      iconimg: iconone4,
      nameicon: "Pet friendly spaces",
    },
    {
      iconimg: iconone1,
      nameicon: "Expert chefs",
    },
    {
      iconimg: iconone2,
      nameicon: "Hygienic properties",
    },
    {
      iconimg: iconone5,
      nameicon: "Loyalty rewards, exclusive offers",
    },
    {
      iconimg: iconone6,
      nameicon: "Personalised itineraries",
    },
  ]);

  const needswiper = {
    0: {
      slidesPerView: 2,
    },
    576: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    992: {
      slidesPerView: 4,
    },
    1200: {
      slidesPerView: 5,
    },
    1600: {
      slidesPerView: 6,
    },
  };

  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [query, setQuery] = useState("");
  const searchObj = useMemo(
    () => ({
      ...(query && { query }),
      pageIndex: pageIndex - 1,
      pageSize,
    }),
    [pageIndex, pageSize, query]
  );

  const { data: section } = usePage(searchObj);

  console.log(section?.data[0]?.section5, "section");

  const section5 = section?.data[0]?.section5;

  return (
    <>
      <div className="custom_arrow mb-5 md:mb-11 xl:mb-12">
        <div className="mx-auto md:py-9 lg:py-12 pt-[2.3rem] pb-[2rem] scroll-py-12 relative">
          <h2 className=" lg:text-[33px] md:text-[28px] text-[21px] text-[#da6633] font-playfair font-medium mb-[1.3rem] md:mb-[1rem] absolute text-center w-full">
            We Have What You Need
          </h2>
          {section5 && section5?.length > 0 ? (
            <Swiper
              loop
              freeMode={true}
              autoplay={true}
              breakpoints={needswiper}
              navigation={true}
              modules={[Navigation, Autoplay]}
              speed={2000}
              slidesPerView={4}
              className="whatNeed-section"
            >
              {section5 &&
                section5?.length > 0 &&
                section5?.map((el, index) => {
                  return (
                    <>
                      <SwiperSlide key={index}>
                        <div className="mx-auto relative w-[40px] h-[40px] md:w-[50px] md:h-[50px]">
                          <Image
                            src={generateFilePath(el.image)}
                            alt=""
                            fill
                            className="object-contain"
                          />
                        </div>
                        <p className="text-center font-medium lg:text-[16px] md:text-[14px] text-[11px] font-montserrat mt-3">
                          {el?.title}
                        </p>
                      </SwiperSlide>
                    </>
                  );
                })}

              {/* {
              iconlist.map((el, index) => {
                return (
                  <>
                    <SwiperSlide key={index}>
                      <div className="mx-auto relative w-[40px] h-[40px] md:w-[50px] md:h-[50px] ">
                        <Image src={el.iconimg} alt='' fill className='object-contain' />
                      </div>
                      <p className='text-center font-medium lg:text-[16px] md:text-[14px] text-[11px] font-montserrat mt-3'>{el.nameicon}</p>
                    </SwiperSlide>
                  </>
                )
              })
            } */}
            </Swiper>
          ) : null}

          {/* <div className="grid grid-cols-7 gap-4 justify-between items-center">
                        <div className="box1 md:col-span-12 col-span-12">
                            <div className="flex justify-between lg:mt-12 needsectino6 flex-wrap md:gap-x-20">
                                <div className=' col4 mb-[40px] md:mb-[3rem]'>
                                    <div className="mx-auto">
                                        <div className="mx-auto relative w-[30px] h-[30px] xl:w-[50px] xl:h-[50px] ">
                                            <Image src={iconone3} alt='' fill className='object-contain' />
                                        </div>
                                    </div>
                                    <p className='text-center font-medium lg:text-[16px] text-[11px] font-montserrat mt-3'>24/7 concierge support</p>
                                </div>

                                <div className='mb-[40px] md:mb-[3rem] col4'>
                                    <div className="relative w-[50px] h-[50px] xl:w-[50px] xl:h-[50px] mx-auto">
                                        <Image src={iconone4} alt='' fill className='object-contain' />
                                    </div>
                                    <p className='text-center font-medium lg:text-[16px] text-[11px] font-montserrat mt-3'>Pet friendly spaces</p>
                                </div>


                                <div className='mb-[40px] md:mb-[3rem] col4'>
                                    <div className="relative w-[50px] h-[50px] xl:w-[50px] xl:h-[50px] mx-auto">
                                        <Image src={iconone1} alt='' fill className='object-contain' />
                                    </div>
                                    <p className='text-center font-medium lg:text-[16px] text-[11px] font-montserrat mt-3'>Expert chefs</p>
                                </div>

                                <div className='mb-[2rem] md:mb-[1rem] col4'>
                                    <div className="relative w-[50px] h-[50px] xl:w-[50px] xl:h-[50px] mx-auto">
                                        <Image src={iconone2} alt='' fill className='object-contain' />
                                    </div>
                                    <p className='text-center font-medium lg:text-[16px] text-[11px] font-montserrat mt-3'>Hygienic properties</p>
                                </div>


                                <div className='mb-[1rem] md:mb-[1rem] col4'>
                                    <div className="relative w-[50px] h-[50px] xl:w-[50px] xl:h-[50px] mx-auto">
                                        <Image src={iconone5} alt='' fill className='object-contain' />
                                    </div>
                                    <p className='text-center font-medium lg:text-[16px] text-[11px] font-montserrat mt-3'>Loyalty rewards, exclusive offers</p>
                                </div>
                                <div className='mb-[1rem] md:mb-[1rem]  col4'>
                                    <div className="relative w-[50px] h-[50px] xl:w-[50px] xl:h-[50px] mx-auto">
                                        <Image src={iconone6} alt='' fill className='object-contain' />
                                    </div>
                                    <p className='text-center font-medium lg:text-[16px] text-[11px] font-montserrat mt-3'>Personalised itineraries</p>
                                </div>


                            </div>


                        </div>

                    </div> */}
        </div>
      </div>
    </>
  );
};

export default WhatYouneed;
