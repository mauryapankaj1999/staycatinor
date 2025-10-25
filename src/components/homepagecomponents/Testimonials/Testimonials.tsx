"use client";
import React from "react";
import { SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
// import quote from "@/assets/quote.png";
import StarRatings from "react-star-ratings";
import { useReview } from "@/services/review.service";
import { STATUS } from "@/common/contstant";
import dynamic from "next/dynamic";

const Swiper = dynamic(() => import("swiper/react").then((mod) => mod.Swiper), {
  ssr: false,
});

const Testimonials = () => {
  const { data: reviews } = useReview({
    status: STATUS.ACTIVE,
    top: STATUS.ACTIVE,
  });

  return (
    <>
      <div className="w-[100%] md:w-[85%] lg:w-[85%] 2xl:w-[65%] mx-auto pb-2 md:pt-4 md:pb-0 lg:py-10 scroll-py-12 relative lg:mt-0 mt-[1.75rem] md:mt-5">
        <div className="text-center mb-4 md:mb-8">
          <h2 className="lg:text-[33px] md:text-[28px] text-[21px] text-[#da6633] font-playfair font-medium">
            Hear What Others Say
          </h2>
        </div>

        {/* <ImQuotesRight  /> */}

        {/* <Image
            src={quotes}
            alt=""
            className="absolute left-0 right-0 top-4 md:top-24 m-auto h-[150px] w-[150px]  md:h-48 md:w-48"
          /> */}

        {reviews && reviews?.data?.length > 0 && (
          <Swiper
            modules={[Navigation]}
            slidesPerView={1}
            loop
            freeMode={true}
            speed={2000}
            navigation
            spaceBetween={30}
            className="review_section"
          >
            {reviews?.data &&
              reviews?.data.length > 0 &&
              reviews?.data.map((el, index) => {
                return (
                  <SwiperSlide key={el._id ?? index} className="slides_bg">
                    <div className="mx-auto md:mx-0 w-[90%] md:w-[88%] flex flex-col md:!ml-[8rem]">
                      <div className="flex flex-col">
                        <div className="w-[90%] md:w-[88%] mx-auto md:mx-0">
                          <h3 className="font-montserrat font-normal text-[12px] lg:text-[18px] text-[#000] mb-1 faq capitalize">
                            {el.description}
                          </h3>
                          <div className="mt-1 mb-2 md:mb-0 md:mt-0 lg:mt-4">
                            <StarRatings
                              rating={el.star}
                              starDimension="20px"
                              starSpacing="2px"
                              starRatedColor="#da6633"
                            />
                          </div>
                          <p className="font-montserrat font-normal text-[#333] xl:text-[18px] text-[14px] capitalize">
                            {el.name}
                          </p>
                          <p className="font-montserrat lg:text-[13px] text-[#555] text-[12px]">
                            Guest
                          </p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            {/* {Array(10).fill(0).map((_, i) => (
            <SwiperSlide key={i}>
              <div className="flex flex-col items-center justify-center">
                <div className="relative">
                  <Image
                    src={groupimg}
                    alt=""
                    className="h-[150px] w-[150px] md:h-[200px] md:w-[200px] rounded-full"
                  />
                  <Image
                    src={quote}
                    alt=""
                    className="absolute top-0 left-0 right-0 bottom-0 m-auto h-[50px] w-[50px] md:h-[70px] md:w-[70px]"
                  />
                </div>
                <p className="text-center text-[#da6633] font-playfair font-medium text-[18px] mt-4">
                  “I am so grateful for the support and guidance I received from this platform. It has truly changed my life for the better!”
                </p>
                <h3 className="text-[#da6633] font-playfair font-semibold text-[20px] mt-4">John Doe</h3>
                <p className="text-[#da6633] font-playfair font-normal text-[16px]">CEO, Company Name</p>
              </div>
            </SwiperSlide>
          ))
          } */}
          </Swiper>
        )}
      </div>
    </>
  );
};

export default Testimonials;
