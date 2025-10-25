
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

const LocationCardLoader = () => {
  const swiperBreakpoints = {
    0: { slidesPerView: 1.3 },
    576: { slidesPerView: 2 },
    992: { slidesPerView: 2 },
    1200: { slidesPerView: 2.5 },
    1400: { slidesPerView: 2.5 },
  };
  return (
    <div className="gap-5 mt-3 lg:mt-0">
      <Swiper
        spaceBetween={20}
        loop
        freeMode={true}
        speed={2000}
        className="location_weekend"
        breakpoints={swiperBreakpoints}
      >
        {[...Array(3)].map((_, index) => (
          <SwiperSlide key={index}>
            <div className="group view_card transition ease-in delay-100 mb-3 rounded-br-[10px] rounded-bl-[10px] rounded-tr-[10px] rounded-tl-[10px] bg-white animate-pulse">
              <div className="relative">
                <div className="w-full h-[160px] md:h-[170px] lg:h-[210px] xl:h-[300px] 2xl:h-[340px] bg-gray-300 rounded-tr-[10px] rounded-tl-[10px]"></div>
              </div>
              <div className="content py-3 px-[12px] md:px-[15px] xl:px-[35px] bg-[#fff] rounded-[10px]">
                <div className="flex flex-row justify-between">
                  <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
                  <div className="h-6 w-1/4 bg-gray-300 rounded"></div>
                </div>
                <div className="md:hidden z-10 my-2">
                  <ul className="flex gap-1">
                    <li className="h-6 w-1/4 bg-gray-300 rounded"></li>
                    <li className="h-6 w-1/4 bg-gray-300 rounded"></li>
                    <li className="h-6 w-1/4 bg-gray-300 rounded"></li>
                  </ul>
                </div>
                <div className="flex flex-row justify-between items-center mt-2">
                  <div className="min:w-1/3">
                    <div className="h-6 w-1/2 bg-gray-300 rounded"></div>
                    <div className="h-4 w-1/3 bg-gray-300 rounded mt-1"></div>
                  </div>
                  <div className="w-1/4 h-10 bg-gray-300 rounded-full"></div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LocationCardLoader;
