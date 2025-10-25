"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useDestination } from "@/services/destination.service";
import { STATUS } from "@/common/contstant";
import { generateFilePath } from "@/services/url.service";

export default function ExploreLocations() {
  const { data: explorelocations } = useDestination({ status: STATUS.ACTIVE });

  const locationswiper = {
    0: {
      slidesPerView: 3,
    },
    576: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 4,
    },
    992: {
      slidesPerView: 5,
    },
    1200: {
      slidesPerView: 6,
    },
    1400: {
      slidesPerView: 6,
    },
  };

  return (
    <div className=" w-[95%] md:w-[85%] lg:w-[85%] 2xl:w-[85%] mx-auto py-[2.5rem] md:py-[3rem] relative">
      <p
        className={`lg:text-[33px] md:text-[28px] text-[21px] text-[#da6633] font-medium absolute top-[1.9rem] md:top-[2.9rem] lg:top-[2.55rem] 2xl:top-[3.5rem] font-comfortaa`}
      >
        Explore By Location
      </p>

      {explorelocations && explorelocations?.data?.length > 0 ? (
        <Swiper
          navigation={true}
          loop
          speed={1000}
          freeMode={true}
          modules={[Navigation]}
          className="locationicon"
          breakpoints={locationswiper}
        >
          {explorelocations?.data.map((el: any, index: any) => (
            <SwiperSlide key={el?._id}>
              {/* First Different Card */}
              <div className="card_box group">
                <Link
                  href={`property?destination=${el._id}`}
                  className="group-hover:bg-primarygray"
                >
                  {/* <img src={el.thumbnail} alt={el.name || "location"} /> */}
                  <div className="icon relative h-[80px] w-[80px] lg:h-[80px] lg:w-[80px] xl:w-[110px] between-max1280-and-1280min:h-[90px] between-max1280-and-1280min:w-[100px] xl:h-[110px] 2xl:w-[150px] 2xl:h-[150px] mx-auto">
                    <Image
                      src={el.thumbnail && generateFilePath(el.thumbnail)}
                      alt={el.name || "location"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-center mt-3">
                    <p className="font-medium text-[12px] font-montserrat lg:text-[15px] mt-1">
                      {el.name}
                    </p>
                  </div>
                </Link>
              </div>

              {/* Second Different Card */}
              {/* {explorelocations?.data[index + 1] && (
              <div className="card_box group">
                <Link
                  href={`property?destination=${explorelocations?.data[index + 1]._id
                    }`}
                  className="group-hover:bg-primarygray"
                >
                  <div className="icon relative h-[80px] w-[80px] lg:h-[80px] lg:w-[80px] xl:w-[110px] between-max1280-and-1280min:h-[90px] between-max1280-and-1280min:w-[100px] xl:h-[110px] 2xl:w-[173px] 2xl:h-[150px] mx-auto">
                    <Image
                      src={generateFilePath(
                        explorelocations?.data[index + 1].thumbnail
                      )}
                      alt={explorelocations?.data[index + 1].name || "location"}
                      fill
                    />
                  </div>
                  <div className="text-center mt-3 me-[20px]">
                    <p className="font-medium text-[0.8rem] font-montserrat lg:text-[15px] mt-1">
                      {explorelocations?.data[index + 1]?.name}
                    </p>
                  </div>
                </Link>
              </div>
            )} */}
            </SwiperSlide>
          ))}
        </Swiper>
      ) : null}
    </div>
  );
}
