"use client";
import React, { use, useState } from "react";
// import { Navigation } from 'swiper/modules'
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";

import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import slide1 from "@/assets/nearbygateway/image1.webp";
import Image from "next/image";
import slider1 from "@/assets/mainbanner/slider1.png";
import slider2 from "@/assets/mainbanner/slider2.png";
import slider3 from "@/assets/mainbanner/slider3.png";
import { IoLocation } from "react-icons/io5";
import Link from "next/link";
import { SectionProps } from "@/services/page.service";
import { generateFilePath } from "@/services/url.service";
import iconmain from "@/assets/allimg/icona11.png";
import iconmain1 from "@/assets/allimg/iconaa12.png";
import iconmain2 from "@/assets/allimg/icona13.png";
import iconmain3 from "@/assets/allimg/icona14.png";
import { GoDotFill } from "react-icons/go";
import { IoMdArrowRoundForward } from "react-icons/io";
import dynamic from "next/dynamic";

const Swiper = dynamic(() => import("swiper/react").then((mod) => mod.Swiper), {
  ssr: false,
});

const HassleFreeToday = ({ section }: { section: SectionProps[] }) => {
  const [hassleslider, setHassleslider] = useState([
    {
      slider: slider1,
      hotelname: "Adviga Villas",
      location: "Dehradun",
    },
    {
      slider: slider2,
      hotelname: "Adviga Villas",
      location: "Mussorie",
    },
    {
      slider: slider3,
      hotelname: "Adviga Villas",
      location: "Manali",
    },
    {
      slider: slider1,
      hotelname: "Adviga Villas",
      location: "Dehradun",
    },
  ]);

  const [openSection, setOpenSection] = useState(0);
  const handleToggle = (index: any) => {
    setOpenSection(openSection === index ? null : index);
  };

  const sections = [
    {
      title: "100% transparency",
      content:
        "Enjoy full access to your dashboard with all booking details for complete transparency",
    },
    {
      title: "Assured earnings",
      content: "Ensure steady revenue with our guaranteed bookings",
    },
    {
      title: "Effortless payouts",
      content: "Seamless timely payouts by the 5th of every month",
    },
    {
      title: "Maintenance contribution",
      content: "We'll maintain your home and share costs.",
    },
  ];

  return (
    <>
      <div className="w-[100%] md:w-[85%] lg:w-[85%] 2xl:w-[85%] mx-auto pt-[1.95rem] pb-0 md:pt-[2.95rem] md:!pb-[0.75rem] lg:pt-[3.75rem] lg:!pb-[1.5rem]">
        <div className="flex freeToday_sction ">
          <div className="w-[100%] lg:w-[50%] lg:ml-9">
            <div className="px-2 py-5">
              <h1 className="between-max1280-and-1280min:text-[33px] lg:text-[33px] md:text-[28px] text-[21px] between-max1440-and-1440min:text-[33px] font-playfair capitalize text-[#da6633] font-medium">
                Start earning hassle free today
              </h1>
              <p className="text-primarydark  between-max1280-and-1280min:text-[0.9rem] xl:text-[1rem] font-medium font-theseasion text-[14px] ">
                <i> Sit back, relax, </i> and let us manage your vacation home
              </p>
              <div className="my-3 md:mb-5 md:mt-5">
                <div className="flex gap-1">
                  <div className="mt-1">
                    <GoDotFill className="text-[#da6633]" />
                  </div>
                  <div>
                    <p className="font-montserrat lg:text-[16px] text-[13px]">
                      100% Transparency through homeowner app
                    </p>
                    {/* <p className='font-montserrat text-[0.9rem]'>Enjoy full access to your dashboard with all </p> */}
                  </div>
                </div>
              </div>
              <div className="mb-3 md:mb-5">
                <div className="flex gap-1">
                  <div>
                    <GoDotFill className="text-[#da6633]" />
                  </div>
                  <div>
                    <p className="font-montserrat lg:text-[16px] text-[13px]">
                      No operational costs incurred by the owner
                    </p>
                    {/* <p className='font-montserrat text-[0.9rem]'>Ensure steady revenue with our guaranteed</p> */}
                  </div>
                </div>
              </div>

              <div className="mb-3 md:mb-5">
                <div className="flex gap-1">
                  <GoDotFill className="text-[#da6633]" />
                  <div>
                    <p className="font-montserrat lg:text-[16px] text-[13px]">
                      Unlimited nights to the home owner
                    </p>

                    {/* asd */}
                    {/* <p className='font-montserrat text-[0.9rem]'>Seamless timely payouts by the 5th of every Month</p> */}
                  </div>
                </div>
              </div>
              <div className="mb-3 md:mb-5">
                <div className="flex gap-1">
                  <GoDotFill className="text-[#da6633]" />
                  <div className="">
                    <p className="font-montserrat lg:text-[16px] text-[13px]">
                      Higher occupancy rates through professional marketing
                    </p>
                    {/* <p className='font-montserrat text-[0.9rem]'>We take full responsibility of maintaining your</p> */}
                  </div>
                </div>
              </div>

              <Link
                href="/list-your-home"
                className=" px-6 py-2 bg-navibule inline-block text-[0.9rem] font-montserrat xl:text-[1rem] text-white rounded-full hover:bg-[#da6633]"
              >
                Know More
              </Link>
            </div>
          </div>

          <div className="w-[100%] lg:w-[50%]">
            <Swiper
              spaceBetween={1}
              // autoplay
              speed={2000}
              effect={"fade"}
              loop
              navigation={true}
              modules={[EffectFade, Autoplay, Pagination, Navigation]}
              pagination={{
                clickable: true,
              }}
              className="setpaginationitem custome_shadow  bg-transparent"
            >
              {section.map((el, index) => {
                console.log("el||", el.url);
                return (
                  <>
                    <SwiperSlide>
                      <div className="image overflow-hidden relative h-[247px] md:h-[300px] w-full lg:h-[403px] xl:h-[465px] 2xl:h-[516px] ">
                        <Link href={el.url ?? ""} target="_blank">
                          <Image
                            src={generateFilePath(el.image)}
                            alt=""
                            fill
                            priority
                            className="object-cover "
                          />
                        </Link>

                        <div className="h-full  w-full bg-custom-gradient absolute left-0 pt-3 right-0 text-center mx-auto z-10 bottom-0  gap-3">
                          <h5 className="text-[#fff] text-lg md:text-[1.4rem] font-medium font-playfair absolute left-7 bottom-14">
                            {el.title}
                          </h5>
                          <p className="text-white gap-3 items-center flex md:text-[1rem] text-sm font-montserrat absolute left-7 bottom-7">
                            <IoLocation /> {el.description}
                          </p>
                          <Link
                            href={el?.url}
                            className="text-white gap-3 hidden lg:block items-center text-[12px] font-montserrat absolute right-20 bottom-7 bg-navibule px-5 py-2 rounded-full hover:bg-[#da6633]"
                          >
                            View Property
                          </Link>
                          <Link
                            href={el?.url}
                            className="text-white block lg:hidden gap-3 items-center text-[12px] font-montserrat absolute right-20 bottom-[1.35rem] md:bottom-7 bg-navibule px-2 py-1 rounded-full hover:bg-[#da6633]"
                          >
                            <IoMdArrowRoundForward className="text-xl" />
                          </Link>
                        </div>
                      </div>
                    </SwiperSlide>
                  </>
                );
              })}
            </Swiper>
          </div>
        </div>

        {/* <div className="grid grid-cols-7 gap-4 justify-between">
          <div className="box1 md:col-span-4 col-span-12">
            <h1 className="between-max1280-and-1280min:text-[33px] text-[33px] between-max1440-and-1440min:text-[33px] lg:text-[17px] xl:text-[33px] 2xl:text-[33px] font-playfair capitalize text-[#da6633] font-medium">
              Start earning hassle-free today
            </h1>
            <p className="text-primarydark  between-max1280-and-1280min:text-[0.9rem] lg:text-[0.8rem] xl:text-[1rem] font-medium font-montserrat text-[0.9rem] md:my-[1rem] mt-[1rem]">
              Sit back, relax, and let us manage your vacation home
            </p>
            <div className="pl-7 relative testimonal_click lg:my-5 md:my-[2.5rem] xl:my-[2.5rem] mt-[0.5rem]">
              {sections.map((section, index) => (
                <div
                  key={index}
                  className={`list relative mb-5 ${openSection === index ? "active" : ""
                    }`}
                >
                  <p
                    className={`font-montserrat between-max1280-and-1280min:text-[0.9rem] lg:text-[0.9rem] xl:text-[1.1rem] font-semibold capitalize cursor-pointer `}
                    onClick={() => handleToggle(index)}
                  >
                    {section.title}
                  </p>
                  {openSection === index && (
                    <p className="font-medium between-max1280-and-1280min:text-[0.8rem] text-[0.8rem] lg:text-[0.8rem] xl:text-[1rem] font-montserrat text-[#767676] mt-1">
                      {section.content}
                    </p>
                  )}
                </div>
              ))}
            </div>



            <Link
              href="/list-your-home"
              className="px-[1rem] py-[0.6rem] md:px-[1.6rem] md:py-[1rem] bg-navibule inline-block font-montserrat between-max1280-and-1280min:text-[0.8rem] xl:text-[1rem] text-white rounded-full hover:bg-[#da6633]"
            >
              Explore now
            </Link>
          </div>
          <div className="box2 w-full relative md:col-span-3 col-span-12 md:mt-[0rem] mt-4 custome_shadow">
            <Swiper
              spaceBetween={1}
              // autoplay
              speed={1000}
              effect={"fade"}
              // loop
              modules={[EffectFade, Autoplay, Pagination]}
              pagination={{
                clickable: true,
              }}
              className="setpaginationitem custome_shadow rounded-lg bg-transparent"
            >
              {section.map((el, index) => {
                return (
                  <>
                    <SwiperSlide>
                      <div className="image rounded-lg overflow-hidden relative h-[200px] md:h-[320px] w-full between-max1280-and-1280min:h-[371px] lg:h-[250px] xl:h-[350px]  2xl:h-[400px] ">
                        <Link href={el.url} target='_blank'>
                          <Image
                            src={generateFilePath(el.image)}
                            alt=""
                            fill
                            priority
                            className="rounded-lg object-cover "
                          />
                        </Link>

                        <div className="h-full  w-full bg-custom-gradient absolute left-0 pt-3 right-0 text-center mx-auto z-10 bottom-0 rounded-b-xl gap-3">
                          <h5 className="text-[#fff] text-[1rem] md:text-[1.4rem] font-medium font-playfair absolute left-7 bottom-14">
                            {el.title}
                          </h5>
                          <p className="text-white gap-3 items-center flex md:text-[1rem] text-[0.8rem] font-montserrat  absolute left-7 bottom-7">
                            <IoLocation /> {el.description}
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                  </>
                );
              })}
            </Swiper>
            <div className=""></div>
          </div>
        </div> */}
      </div>

      {/* mobile show tab */}
      {/* <div className="md:hidden">
        <div className="w-[95%] mx-auto md:py-[2.5rem] pt-[2rem]">
          <h6 className='font-montserrat text-[18px] text-center'>Start earning hassle-free today</h6>
          <p className='font-montserrat text-[0.9rem] mt-1 text-center'>Sit back relax, and let us manage your vaction home</p>


          <div className="sm:grid sm:grid-cols-2">
            <div className="mb-7 mt-10 ">
              <div className="w-[50px] h-[50px] relative m-auto">
                <Image src={iconmain} alt='' fill className='object-cover' />
              </div>
              <p className='text-center font-montserrat text-[0.9rem] mt-2 mb-1 font-semibold'>100% transparency</p>
              <p className='text-center font-montserrat text-[0.9rem]'>Enjoy full access to your dashboard with all </p>
            </div>

            <div className="mb-7 mt-10">
              <div className="w-[50px] h-[50px] relative m-auto">
                <Image src={iconmain1} alt='' fill className='object-contain' />
              </div>
              <p className='text-center font-montserrat text-[0.9rem] mt-2 mb-1 font-semibold'>Assured earnings</p>
              <p className='text-center font-montserrat text-[0.9rem]'>Ensure steady revenue with our guaranteed</p>
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-2">
          <div className="mb-7 ">
          <div className="w-[50px] h-[50px] relative m-auto">
              <Image src={iconmain2} alt='' fill className='object-contain' />
            </div>
            <p className='text-center font-montserrat text-[0.9rem] mt-2 mb-1 font-semibold'>Effortless payouts</p>
            <p className='text-center font-montserrat text-[0.9rem]'>Seamless timely payouts by the 5th of every Month</p>
          </div>

          <div className="mb-7 ">
          <div className="w-[50px] h-[50px] relative m-auto">
              <Image src={iconmain3} alt='' fill className='object-contain' />
            </div>
            <p className='text-center font-montserrat text-[0.9rem] mt-2 mb-1 font-semibold'>Maintenance contribution</p>
            <p className='text-center font-montserrat text-[0.9rem]'>We take full responsibility of maintaining your</p>
          </div>
          </div>

        </div>
      </div> */}
    </>
  );
};

export default HassleFreeToday;
