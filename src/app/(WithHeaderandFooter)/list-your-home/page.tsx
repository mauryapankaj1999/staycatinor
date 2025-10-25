"use client";
import { toastError, toastSuccess } from "@/utils/toast";
import Image from "next/image";
import React, { useState } from "react";
import imgwebone from "@/assets/allimg/listwebimg1.webp";
import imgwebone1 from "@/assets/allimg/listwebimg3.webp";
import imgwebone2 from "@/assets/allimg/listwebimg2.webp";
import Link from "next/link";
import familyimg from "@/assets/allimg/family_img.webp";
import imgproperty from "@/assets/blogimg/listyourpropertyLogo.png";
import ownerBenefit from "@/assets/list_home/owners-benefits.png";
import guestBenefit from "@/assets/list_home/check-in.png";
import expertise from "@/assets/list_home/our-expertise.png";
import service_1 from "@/assets/list_home/service_1.png";
import service_2 from "@/assets/list_home/service_2.png";
import service_3 from "@/assets/list_home/service_3.png";
import service_4 from "@/assets/list_home/service_4.png";
import icon1 from "@/assets/list_home/signature-service.png";
import icon2 from "@/assets/list_home/flawless-upkeep.png";
import icon3 from "@/assets/list_home/seamless.png";
import icon4 from "@/assets/list_home/long-stay.png";
import icon5 from "@/assets/list_home/beautiful-homes-onboarded.png";
import icon6 from "@/assets/list_home/families-osted.png";
import icon7 from "@/assets/list_home/nights-booked.png";

import p_1 from "@/assets/list_home/p_1.jpg";
import p_2 from "@/assets/list_home/p_2.jpg";
import p_3 from "@/assets/list_home/p_3.jpg";
import p_4 from "@/assets/list_home/p_4.jpg";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { GoArrowRight } from "react-icons/go";
import ListYourHomeForm from "./_components/ListYourHomeForm/ListYourHomeForm";
import { IoCloseOutline } from "react-icons/io5";
import dynamic from "next/dynamic";

const Swiper = dynamic(() => import("swiper/react").then((mod) => mod.Swiper), {
  ssr: false,
});

export default function page() {
  const [openmodalform, setOpenmodalform] = useState(false);
  const [expanded, setExpanded] = useState(0);

  const toggleAccordion = (index: any) => {
    setExpanded(expanded === index ? null : index);
  };

  const [userreview, setUserreview] = useState([
    {
      heading: "WHAT OUR HOME OWNERS HAVE TO SAY ",
      description:
        "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt minima fugit quod voluptatibus quasi impedit suscipit ipsa molestias, modi error facere! Expedita laudantium qui sequi consectetur! Beatae earum dicta alias.",
      userimg: familyimg,
    },
    {
      heading: "WHAT OUR HOME OWNERS HAVE TO SAY ",
      description:
        "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt minima fugit quod voluptatibus quasi impedit suscipit ipsa molestias, modi error facere! Expedita laudantium qui sequi consectetur! Beatae earum dicta alias.",
      userimg: familyimg,
    },
    {
      heading: "WHAT OUR HOME OWNERS HAVE TO SAY ",
      description:
        "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt minima fugit quod voluptatibus quasi impedit suscipit ipsa molestias, modi error facere! Expedita laudantium qui sequi consectetur! Beatae earum dicta alias.",
      userimg: familyimg,
    },
    {
      heading: "WHAT OUR HOME OWNERS HAVE TO SAY ",
      description:
        "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt minima fugit quod voluptatibus quasi impedit suscipit ipsa molestias, modi error facere! Expedita laudantium qui sequi consectetur! Beatae earum dicta alias.",
      userimg: familyimg,
    },
    {
      heading: "WHAT OUR HOME OWNERS HAVE TO SAY ",
      description:
        "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt minima fugit quod voluptatibus quasi impedit suscipit ipsa molestias, modi error facere! Expedita laudantium qui sequi consectetur! Beatae earum dicta alias.",
      userimg: familyimg,
    },
    {
      heading: "WHAT OUR HOME OWNERS HAVE TO SAY ",
      description:
        "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt minima fugit quod voluptatibus quasi impedit suscipit ipsa molestias, modi error facere! Expedita laudantium qui sequi consectetur! Beatae earum dicta alias.",
      userimg: familyimg,
    },
    {
      heading: "WHAT OUR HOME OWNERS HAVE TO SAY ",
      description:
        "  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt minima fugit quod voluptatibus quasi impedit suscipit ipsa molestias, modi error facere! Expedita laudantium qui sequi consectetur! Beatae earum dicta alias.",
      userimg: familyimg,
    },
  ]);

  const benefits = [
    {
      title: "Earn Effortlessly",
      description: "Steady income without lifting a finger, we manage all.",
    },
    {
      title: "Stay Anytime",
      description:
        "Unlimited complimentary nights at your own beautiful property.",
    },
    {
      title: "Worry Free Compliance",
      description:
        "You receive your earnings directly by the 10th of every month neat, predictable, and always on time. You can check your performance anytime through our platform.",
    },
    {
      title: "Full Transparency",
      description:
        "Track bookings, earnings, and reports via our homeowner app.",
    },
    {
      title: "Maximum Visibility",
      description:
        "We don’t just list your home we market it. Through leading OTAs, our website, and smart pricing tools, we make sure your property shines in all the right places.",
    },
    {
      title: "Homeowner network",
      description:
        "our homeowner network offers complementary stays and offers to the home owners.",
    },
    {
      title: "Always Guest-Ready",
      description:
        "Regular upgrades keep your property shining and market competitive.",
    },
  ];

  const service1 = [
    {
      guestsimg: icon1,
      guestname: "Signature Service",
    },
    {
      guestsimg: icon2,
      guestname: "Flawless Upkeep",
    },
    {
      guestsimg: icon3,
      guestname: "Seamless check in",
    },
    {
      guestsimg: icon4,
      guestname: "Long Stay pricing",
    },
  ];

  const service2 = [
    {
      title: "Spotless Stays",
      description:
        "Daily housekeeping keeps your property shining, welcoming, and always guest-ready.",
    },
    {
      title: "Fully Loaded",
      description:
        "Enjoy kitchens, modern amenities, and comforts that feel like home.",
    },
    {
      title: "Pure Privacy",
      description:
        "Unwind in complete safety, security, and uninterrupted private spaces.",
    },
  ];

  const stats = [
    {
      srcimg: icon5,
      title: "Hosted more than 25000 groups ",
      value: "25000+",
    },
    {
      srcimg: icon6,
      title: "55+ Properties successfully maintained ",
      value: "55+",
    },
    {
      srcimg: icon7,
      title: "More then 40% active members through our loyalty cards",
      value: "40%",
    },
  ];

  const locationswiper = {
    0: {
      slidesPerView: 1,
    },
    576: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
    },
    1280: {
      slidesPerView: 4,
    },
  };

  return (
    <>
      <div className="bg-[url('/mainbanner/propertyimgbg.jpeg')] py-8 relative w-full bg-cover bg-center flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-60"></div>

        <div className="w-[95%] md:w-[85%] mx-auto md:!py-10 py-[0.5rem] relative">
          <div className="sm:grid sm:grid-cols-2 gap-6 items-center">
            <div className="">
              <h5 className="text-[#fff] 2xl:text-[30px] lg:text-[25px] md:text-[20px] text-[18px]">
                Unlock the True Potential of Your Holiday Home
              </h5>
              <p className="2xl:text-[30px] lg:text-[25px] text-[16px] my-4 text-[#fff] font-montserrat">
                List your property with us!
              </p>
              <ul className="list-disc pl-4">
                <li className="text-[#fff] 2xl:text-[17px] lg:text-[15px] text-[14px] font-montserrat mb-2">
                  Effortless Earnings – We handle everything, you enjoy steady
                  income.
                </li>
                <li className="text-[#fff] 2xl:text-[17px] lg:text-[15px] text-[14px] font-montserrat mb-2">
                  No Operational Costs – All maintenance, staffing, and service
                  costs are on us.{" "}
                </li>
                <li className="text-[#fff] 2xl:text-[17px] lg:text-[15px] text-[14px] font-montserrat mb-2">
                  Home insuarance - We help the owners to cover all type of
                  damages caused.{" "}
                </li>
                <li className="text-[#fff] 2xl:text-[17px] lg:text-[15px] text-[14px] font-montserrat mb-2">
                  End-to-End Management – From housekeeping to guest handling,
                  we cover it all.{" "}
                </li>
                <li className="text-[#fff] 2xl:text-[17px] lg:text-[15px] text-[14px] font-montserrat mb-2">
                  Guaranteed Visibility – Your property gets listed across top
                  booking platforms.{" "}
                </li>
                <li className="text-[#fff] 2xl:text-[17px] lg:text-[15px] text-[14px] font-montserrat mb-2">
                  Higher Occupancy Rates – Professional marketing ensures
                  consistent bookings.{" "}
                </li>
              </ul>
            </div>
            <div className="mt-10 sm:mt-0">
              <div className="bg-white rounded-md px-4 md:px-8 2xl:py-[20px] xl:py-[20px] lg:py-[8px] sm:py-[10px] py-[16px] 2xl:w-[70%] lg:w-[90%] m-auto">
                <h3 className="font-medium 2xl:text-[1.9rem] lg:text-[22px] text-[21px]">
                  Lets Chat
                </h3>
                <p className="2xl:text-[14px] text-[13px] font-montserrat mb-4">
                  If you would like to see your Luxury Villa in trusted hands,
                  write to us!
                </p>
                <ListYourHomeForm />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[95%] md:w-[85%] mx-auto py-6 md:!py-10 relative">
        <div className="sm:flex gap-4">
          <div className="sm:w-8/12">
            <div className="sm:grid sm:grid-cols-2 gap-4">
              <div className="2xl:h-[340px] lg:h-[220px] sm:h-[250px] h-[180px] relative w-full overflow-hidden rounded-lg flex items-center justify-center sm:mb-[0] mb-[15px]">
                <Image
                  src={imgwebone}
                  alt=""
                  fill
                  className="object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute bottom-5 z-20 left-4  pr-8 m-auto ">
                  <h3 className="text-[#fff] 2xl:text-[44px] lg:text-[25px] md:text-[20px] text-[18px] mb-4 font-medium font-montserrat">
                    Loyalty That Pays Back
                  </h3>
                  <p className="font-montserrat font-normal text-[#fff] 2xl:text-[14px] text-[16px]">
                    Redeem points for free stays, get exclusive member
                    discounts, and enjoy double-point days.{" "}
                  </p>
                </div>
              </div>
              <div className="2xl:h-[340px] lg:h-[220px] sm:h-[250px] h-[180px] relative w-full overflow-hidden rounded-lg sm:mb-[0] mb-[15px]">
                <Image
                  src={imgwebone1}
                  alt=""
                  fill
                  className="object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute bottom-5 z-20 left-4  pr-8 m-auto ">
                  <h3 className="text-[#fff] 2xl:text-[44px] lg:text-[25px] md:text-[20px] text-[18px] mb-4 font-medium font-montserrat">
                    Privileges Beyond Stays{" "}
                  </h3>
                  <p className="font-montserrat font-normal text-[#fff] 2xl:text-[14px] text-[16px]">
                    Unlock curated itineraries, free transfers, early check-ins,
                    and access to special events.{" "}
                  </p>
                </div>
              </div>
              <div className=" col-span-2">
                <div className="2xl:h-[340px] lg:h-[220px] sm:h-[250px] h-[180px] relative w-full overflow-hidden rounded-lg sm:mb-[0] mb-[15px]">
                  <Image
                    src={imgwebone2}
                    alt=""
                    fill
                    className="object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black opacity-50"></div>
                  <div className="absolute bottom-5 z-20 left-4  pr-8 m-auto ">
                    <h3 className="text-[#fff] 2xl:text-[44px] lg:text-[25px] md:text-[20px] text-[18px] mb-4 font-medium font-montserrat">
                      Celebrations Made Special
                    </h3>
                    <p className="font-montserrat font-normal text-[#fff] 2xl:text-[14px] text-[16px]">
                      From birthdays to anniversaries, enjoy complimentary
                      surprises, curated moments, and family-sharing rewards.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/3 bg-[#da6633] rounded-xl py-8 lg:px-10 px-5 md:!py-10 md:px-3 flex items-center">
            <div className="">
              {/* <div className="2xl:w-[112px] 2xl:h-[112px] lg:h-[50px] lg:w-[50px] relative">
                                <Image src={starimg} alt='' fill className='object-contain' />
                            </div> */}
              <h3 className="text-[#fff] 2xl:text-[28px] lg:text-[24px] md:text-[20px] text-[18px] mb-4 font-medium">
                Why Guests Choose The StayCationer
              </h3>
              <p className="text-[#fff] font-montserrat font-light 2xl:text-[16px] text-[16px]">
                Guests choose us for comfort, care, and convenience. From
                pet-friendly homes to personalized itineraries, 24×7 concierge,
                curated dining, and effortless transfers—we turn every stay into
                a seamless, memorable experience.
              </p>
              {/* <Link
                href="/ContactUs"
                className="text-[#fff] font-montserrat font-light text-[1rem] my-12 flex gap-2 items-center"
              >
                More Info <GoArrowRight className="text-[1.5rem]" />
              </Link> */}
            </div>
          </div>
        </div>
      </div>

      <div className="owner-benefit md:!py-10 py-5 mb-10">
        <div className="w-[95%] md:w-[85%] lg:w-[85%] 2xl:w-[85%] mx-auto relative">
          {/* <div className="grid grid-cols-8 gap-4">
            <div className="col-span-2">
              <h1 className="title mb-4">
                <p className="lg:text-[33px] text-[18px] text-[#da6633] font-theseasion ">
                  Home
                  <br /> Owners
                  <br /> Benefits
                </p>
              </h1>
              <div className="img w-auto">
                <Image
                  src={ownerBenefit}
                  priority
                  objectFit="contain"
                  alt=""
                  height={150}
                />
              </div>
            </div>


            <div className="col-span-8 font-montserrat">
              <div className="grid grid-cols-4 gap-4">
                {benefits.map((item, i) => (
                  <div className="col-span-2">
                    <div className="box">
                      <h1 className="sub mb-3 font-semibold">{item?.title}</h1>
                      <p className="text-[0.9rem]">{item?.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div> */}
          <div className="2xl:text-[28px] lg:text-[24px] md:text-[20px] text-[18px] text-[#000] font-medium absolute lg:top-[0.75rem]">
            Home Owners Benefits{" "}
          </div>

          <Swiper
            navigation={true}
            // autoplay={true}
            modules={[Navigation, Autoplay]}
            breakpoints={locationswiper}
            className="offersection"
            loop
            speed={2000}
            slidesPerView={3.1}
            spaceBetween={20}
          >
            {benefits.map((item, i) => (
              <SwiperSlide>
                <div className="col-span-2 h-full flex items-stretch">
                  <div className="flex flex-col justify-start p-4 rounded-lg bg-white shadow-sm min-h-[145px] md:min-h-[190px] max-w-full overflow-hidden">
                    <h1 className="sub mb-3 font-semibold text-[15px] lg:text-[16px] 2xl:text-[20px] text-[#000] font-montserrat break-words">
                      {item?.title}
                    </h1>
                    <p className="font-montserrat text-[13px] lg:text-[15px] 2xl:text-[16px] text-[#555] break-words">
                      {item?.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className="list-partner bg-[#f5f5f5] md:!py-10 py-6 lg:pb-0">
        <div className="w-[95%] md:w-[85%] lg:w-[85%] 2xl:w-[85%] mx-auto">
          <div className="grid grid-cols-1 md:!grid-cols-12 !gap-4">
            <div className="col-span-1 md:!col-span-5 lg:!col-span-3 flex flex-col items-center justify-between md:!items-start md:!justify-start">
              <h3 className="2xl:text-[28px] lg:text-[24px] text-[20px]  font-theseasion ">
                Why Choose The StayCationer?
              </h3>
              <h4 className="text-[#da6633] text-[18px] md:text-[20px]">
                Partner with staycation
              </h4>

              <p className="font-montserrat text-[14px] lg:text-[16px] text-[#555] my-2 text-center md:!text-left">
                You're not just joining a platform. You're becoming part of a
                growing network of stylish, guest-loved homes. interactions.
              </p>
              <button
                className="font-montserrat btn bg-[#da6633] text-white rounded-full px-4 py-3 text-[15px] hidden md:block mt-4"
                onClick={() => setOpenmodalform(!openmodalform)}
              >
                List Your Property
              </button>
            </div>
            <div className="col-span-1 md:!col-span-7 lg:!col-span-9 font-montserrat">
              <div className="flex flex-row xl:!grid xl:!grid-cols-6 gap-4 overflow-x-scroll w-full">
                {stats.map((item, i) => (
                  <div className="min-w-[250px] xl:!col-span-2">
                    <div className="box bg-[#fff] rounded-lg text-center shadow-md">
                      <div className="w-full h-[260px] relative">
                        <Image
                          fill
                          src={item.srcimg}
                          className="object-cover"
                          alt=""
                        />
                      </div>
                      <div className="upper py-3 md:py-8 font-semi;bold text-[#000]">
                        <h1 className="mb-1 md:mb-4 text-[22px] md:text-[26px] font-semibold lg:text-5xl">
                          {item?.value}
                        </h1>
                        <h3 className="font-montserrat text-[14px] lg:text-[16px] text-[#555]">
                          {item?.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-row items-center justify-center">
            <button
              className="btn bg-[#da6633] text-white rounded-full px-4 py-3 text-[15px] block md:hidden mt-4 "
              onClick={() => setOpenmodalform(!openmodalform)}
            >
              List Your Property
            </button>
          </div>
        </div>
      </div>

      <div className="list-service my-6 md:!my-10">
        <div className="w-[95%] md:w-[85%] lg:w-[85%] 2xl:w-[85%] mx-auto">
          <div className="grid grid-cols-1 lg:!grid-cols-12 gap-2 md:!gap-4">
            <div className="col-span-1 lg:!col-span-3">
              <h1 className="title mb-2 md:mb-4">
                <p className="2xl:text-[28px] lg:text-[24px] md:text-[20px] text-[18px] font-theseasion ">
                  Let’s Get Your Home Booked{" "}
                </p>
                <p className="text-[#da6633] text-[20px]">
                  {" "}
                  Partner What we do for our guest
                </p>
              </h1>
              <div className="img w-auto hidden lg:block">
                <Image
                  src={guestBenefit}
                  priority
                  objectFit="contain"
                  alt=""
                  height={120}
                />
              </div>
            </div>

            <div className="col-span-1 lg:!col-span-9  font-montserrat">
              <div className="grid grid-cols-2 xl:!grid-cols-8 gap-4">
                {service1.map((item, i) => (
                  <div className="col-span-1 xl:!col-span-2" key={i}>
                    <div className="box1 text-center">
                      <div className="img py-4 !md:py-7 rounded-lg mb-3 bg-[#f5f5f5]">
                        <img
                          src={item.guestsimg.src}
                          className="object-contain mx-auto w-[40px] h-[40px] md:w-[50px] md:h-[50px] "
                          alt=""
                        />
                      </div>
                      <p className="font-montserrat text-[14px] lg:text-[16px] text-[#555]">
                        {item.guestname}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <hr className="my-6 md:my-14" />

              <div className="grid grid-cols-2 md:!grid-cols-6 gap-4">
                {service2.map((item, i) => (
                  <div className="col-span-2">
                    <div className="box2 bg-[#f5f5f5] p-3 md:p-6 rounded-lg flex flex-col justify-center">
                      <h1 className="sub mb-1 md:mb-3 font-semibold text-[16px]">
                        {item?.title}
                      </h1>
                      <p className="font-montserrat text-[14px] lg:text-[16px] text-[#555]">
                        {item?.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {openmodalform ? (
        <div className="fixed inset-0 z-[999] backdropblurcustom flex justify-center">
          <div className="w-[485px] m-auto rounded-[15px] bg-white p-[20px] relative mx-2">
            <h3 className="text-[20px] md:text-[30px] font-theseasion mb-4">
              List Your Home
            </h3>
            <div
              className="absolute top-2 md:top-4 right-4 cursor-pointer"
              onClick={() => setOpenmodalform(!openmodalform)}
            >
              <IoCloseOutline className="text-[22px] md:text-[30px] " />
            </div>
            <ListYourHomeForm />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
