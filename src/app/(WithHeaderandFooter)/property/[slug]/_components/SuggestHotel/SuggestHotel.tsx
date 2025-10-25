"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Navigation } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { IProperty, useProperty } from "@/services/property.service";
import moment from "moment";
import { generateFilePath } from "@/services/url.service";
import { useSearch } from "@/providers/context/RootContext";
import dynamic from "next/dynamic";
import { formatPrice } from "@/utils/formatPrice";

const Swiper = dynamic(() => import("swiper/react").then((mod) => mod.Swiper), {
  ssr: false,
});

// Types
interface SuggestHotelProps {
  destinationId: string;
  propertyId: string;
}

// Breakpoints configuration
const reviewslider = {
  0: { slidesPerView: 1.3 },
  576: { slidesPerView: 2 },
  992: { slidesPerView: 2 },
  1200: { slidesPerView: 1.8 },
  1400: { slidesPerView: 2 },
  1500: { slidesPerView: 1.8 },
  1535: { slidesPerView: 1.8 },
  1600: { slidesPerView: 1.8 },
};

// Star Icon Component
const StarIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.9631 5.36985C13.871 5.08637 13.6195 4.88567 13.3232 4.85886L9.28184 4.49195L7.68466 0.752632C7.56674 0.477908 7.29842 0.300598 6.99977 0.300598C6.70112 0.300598 6.4327 0.477908 6.31553 0.752632L4.71835 4.49195L0.67632 4.85886C0.38002 4.8862 0.129115 5.0869 0.0364013 5.36985C-0.0557786 5.65333 0.0293516 5.96427 0.253446 6.1608L3.30841 8.83957L2.40766 12.8068C2.34175 13.0985 2.45498 13.4002 2.69701 13.5751C2.82711 13.6697 2.97996 13.7169 3.13335 13.7169C3.26515 13.7169 3.39707 13.6818 3.51488 13.6114L6.99977 11.5276L10.484 13.6114C10.7396 13.7641 11.061 13.7501 11.3025 13.5751C11.5446 13.4002 11.6578 13.0985 11.5919 12.8068L10.6911 8.83957L13.7461 6.1608C13.9701 5.96427 14.0553 5.65397 13.9631 5.36985V5.36985Z"
      fill="#FBA919"
    />
  </svg>
);

// Main SuggestHotel Component
const SuggestHotel = ({ destinationId, propertyId }: SuggestHotelProps) => {
  const { data: property } = useProperty(
    { destinationId },
    true,
    destinationId ? true : false
  );
  const [locationSearch] = useSearch();
  const [propertyList, setPropertyList] = useState<IProperty[]>([]);

  useEffect(() => {
    if (property && property?.data) {
      setPropertyList(property?.data.filter((el) => el._id !== propertyId));
    }
  }, [property, propertyId]);

  console.log("propertyList", propertyList);

  if (!propertyList || propertyList.length === 0) {
    return null;
  }

  return (
    <div className="md:p-4 mt-6 md:mt-8 relative md:px-0 px-[0.5rem]">
      <h3 className="font-playfair 2xl:text-[22px] md:text-[20px] xl:text-[20px] text-[16px] absolute 2xl:top-[12px] md:!top-4 top-0 font-semibold">
        We Also Suggest
      </h3>
      <Swiper
        spaceBetween={20}
        loop
        navigation={true}
        modules={[Navigation]}
        className="suggestsection"
        breakpoints={reviewslider}
      >
        {propertyList.map((property, index) => (
          <SwiperSlide key={`propertyList${property._id || index}`}>
            <div className="shadow-custom-light rounded-md group mb-4">
              <div className="h-[190px] sm:h-[160px] md:h-[175px] lg:h-[210px] xl:h-[300px] w-full rounded-tl-md rounded-tr-md relative overflow-hidden">
                {/* Only render Swiper if there are images */}
                {property?.allImages && property.allImages.length > 0 ? (
                  <Swiper
                    className="h-full w-full card_slider"
                    spaceBetween={0}
                    slidesPerView={1}
                    loop={property.allImages.length > 1} // Only loop if more than 1 image
                    navigation={{
                      nextEl: `.swiper-button-next-${property._id}`,
                      prevEl: `.swiper-button-prev-${property._id}`,
                      disabledClass: "swiper-button-disabled",
                    }}
                    modules={[Navigation]}
                    watchSlidesProgress={true}
                    observer={true}
                    observeParents={true}
                  >
                    {property.allImages.map((img: string, idx: number) => (
                      <SwiperSlide key={idx}>
                        <Link
                          href={`/property/${property.slug}?startDate=${moment(
                            new Date(locationSearch?.startDate)
                          ).format("YYYY-MM-DD")}&endDate=${moment(
                            new Date(locationSearch?.endDate)
                          ).format("YYYY-MM-DD")}&adult=${
                            locationSearch?.adult
                          }&child=${locationSearch?.child}&room=${
                            locationSearch?.room
                          }`}
                        >
                          <Image
                            src={generateFilePath(img)}
                            alt={`${property.name} - Image ${idx + 1}`}
                            fill
                            priority={idx === 0}
                            className="object-cover"
                          />
                        </Link>
                      </SwiperSlide>
                    ))}

                    {/* Custom Navigation Buttons */}
                    {property.allImages.length > 1 && (
                      <>
                        <div
                          className={`swiper-button-prev-${property._id} swiper-button-prev absolute !left-2 !top-1/2 z-20 !w-8 !h-8 !mt-0 transform -translate-y-1/2 cursor-pointer bg-white/80 !text-gray-800 rounded-full shadow-md hover:bg-white transition-all duration-200 after:!text-sm after:!font-bold`}
                        />
                        <div
                          className={`swiper-button-next-${property._id} swiper-button-next absolute !right-2 !top-1/2 z-20 !w-8 !h-8 !mt-0 transform -translate-y-1/2 cursor-pointer bg-white/80 !text-gray-800 rounded-full shadow-md hover:bg-white transition-all duration-200 after:!text-sm after:!font-bold`}
                        />
                      </>
                    )}
                  </Swiper>
                ) : (
                  // Fallback for no images
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-500">No images available</span>
                  </div>
                )}

                <div className="h-full w-full bg-custom-gradient absolute left-0 right-0 mx-auto z-10 bottom-0 gap-3"></div>
                <div className="absolute top-3 right-3 z-10 cursor-pointer">
                  <Link
                    href=""
                    className="inline-block bg-[#d16323] py-1 px-2 font-montserrat text-[0.7rem] text-white"
                  >
                    {property.destination}
                  </Link>
                </div>
                <div className="md:block hidden room_info absolute bottom-4 left-5 z-10">
                  <ul className="flex gap-5">
                    <li className="text-white font-montserrat md:text-[13px] xl:text-[13px] before-content before:mr-2">
                      Upto {property.guest} Guests
                    </li>
                    <li className="text-white font-montserrat md:text-[13px] xl:text-[13px] before-content before:mr-2">
                      {property.bedroom} Bedroom
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-span-1 py-2 px-[10px] md:px-[15px] xl:px-[35px]">
                <div className="flex flex-row justify-between">
                  <p className="lg:text-[20px] text-[15px] text-primarydark font-theseasion capitalize font-medium mb-0 md:w-[80%] line-clamp-1">
                    {property.name}
                  </p>
                  {property.maxStar && (
                    <div className="flex gap-1 items-center">
                      <p className="font-montserrat text-[16px] font-medium text-[#333]">
                        {property.maxStar}
                      </p>
                      <StarIcon />
                    </div>
                  )}
                </div>

                <div className="md:hidden z-10 my-2">
                  <ul className="flex gap-1">
                    <li className="text-[#000] flex flex-row px-2 py-1 rounded-sm bg-[#f5f5f5] font-montserrat text-[10px] md:text-[18px]">
                      Upto {property.guest} Guests
                    </li>
                    <li className="text-[#000] flex flex-row px-2 py-1 rounded-sm bg-[#f5f5f5] font-montserrat text-[10px] md:text-[18px]">
                      {property.bedroom} Bedroom
                    </li>
                    {property.serviceType && (
                      <li className="text-[#000] flex flex-row px-2 py-1 rounded-sm bg-[#f5f5f5] font-montserrat text-[10px] md:text-[18px]">
                        {property.serviceType}
                      </li>
                    )}
                  </ul>
                </div>

                <div className="flex justify-between mt-1 gap-2">
                  <div className="w-[60%]">
                    <p className="text-[16px] md:text-[20px] flex items-center text-primarydark font-medium font-montserrat">
                      ₹{formatPrice(property.price)}/-
                      <span className="text-[11px] md:text-[12px] text-[#555] font-montserrat">
                        night + taxes
                      </span>
                    </p>
                  </div>
                  <div className="w-[40%] overflow-hidden flex flex-row items-center justify-end">
                    <Link
                      href={`/property/${property.slug}?startDate=${moment(
                        new Date(locationSearch?.startDate)
                      ).format("YYYY-MM-DD")}&endDate=${moment(
                        new Date(locationSearch?.endDate)
                      ).format("YYYY-MM-DD")}&adult=${
                        locationSearch?.adult
                      }&child=${locationSearch?.child}&room=${
                        locationSearch?.room
                      }`}
                      className="py-[0.4rem] w-fit rounded px-[0.7rem] xl:p-[0.6rem] between-max1280-and-1280min:xl:p-1 md:-translate-x-52 group-hover:translate-x-0 between-max1280-and-1280min:text-[0.9rem] text-[0.7rem] lg:text-[0.8rem] xl:text-[1rem] delay-75 duration-1000 group-hover:delay-75 group-hover:duration-1000 ease-in-out group-hover:opacity-95 border border-primarycolor font-montserrat font-medium flex items-center justify-center gap-2 text-primarycolor between-max1280-and-1280min:w-[70%] hover:text-white hover:bg-[#da6633] hover:border-[#da6633]"
                    >
                      <span className="md:block hidden xl:text-[12px] 2xl:text-[14px]">
                        See Availability
                      </span>
                      <FiArrowRight className="text-[1rem] md:text-[1.7rem]" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SuggestHotel;
