"use client";
import React, { useMemo, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import { GoArrowRight } from "react-icons/go";

import { STATUS } from "@/common/contstant";
import { IProperty, useProperty } from "@/services/property.service";
import { useDestination } from "@/services/destination.service";
import { useSearch } from "@/providers/context/RootContext";
import { generateFilePath } from "@/services/url.service";
import { formatPrice } from "@/utils/formatPrice";
import LocationCardLoader from "./LocationCardLoader";

export const LocationCart = () => {
  const [selectLocation, setSelectLocation] = useState("ALL");
  const [locationSearch] = useSearch();

  // Search parameters for property API
  const searchObj = useMemo(() => {
    const params: { status: string; destinationId?: string } = {
      status: "APPROVED",
    };
    if (selectLocation !== "ALL") {
      params.destinationId = selectLocation;
    }
    return params;
  }, [selectLocation]);

  // API calls
  const { data: propertyList, isLoading } = useProperty(searchObj, true, true);
  const { data: locations } = useDestination({
    status: STATUS.ACTIVE,
  });

  // Swiper responsive breakpoints
  const swiperBreakpoints = {
    0: { slidesPerView: 1.3 },
    576: { slidesPerView: 2 },
    992: { slidesPerView: 2 },
    1200: { slidesPerView: 2.5 },
    1400: { slidesPerView: 2.5 },
  };

  // Generate property link with search parameters
  const getPropertyLink = (property: IProperty) => {
    const startDate = moment(
      locationSearch?.startDate
        ? new Date(locationSearch.startDate)
        : new Date()
    ).format("YYYY-MM-DD");

    const endDate = moment(
      locationSearch?.endDate
        ? new Date(locationSearch.endDate)
        : moment().add(1, "day").toDate()
    ).format("YYYY-MM-DD");

    return `property/${property.slug}?startDate=${startDate}&endDate=${endDate}&adult=${locationSearch?.adult}&child=${locationSearch?.child}&room=${property?.bedroom}`;
  };

  const renderLocationTabs = () => (
    <div className="mb-7 mt-2 md:mt-0 lg:mt-0">
      <ul className="hide-scrollbar flex overflow-y-auto mt-[24] md:mt-[1.5rem] gap-4 snap-x snap-mandatory overflow-x-auto justify-between scroll-smooth border-b mb-2">
        <li
          className={`font-montserrat text-[12px] md:text[16px] w-fit text-nowrap cursor-pointer font-normal pb-2 px-[.8rem] ${
            selectLocation === "ALL"
              ? "text-[#da6633] border-b-2 border-[#da6633]"
              : ""
          }`}
          onClick={() => setSelectLocation("ALL")}
        >
          All
        </li>
        {locations?.data.map((location) => (
          <li
            key={location._id}
            className={`font-montserrat text-[12px] md:text[16px] w-fit text-nowrap cursor-pointer font-normal pb-2 px-[.8rem] ${
              location._id === selectLocation
                ? "text-[#da6633] border-b-2 border-[#da6633]"
                : ""
            }`}
            onClick={() => setSelectLocation(location._id)}
          >
            {location.name}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div
      className={`w-[95%] md:w-[85%] lg:w-[85%] 2xl:w-[85%] mx-auto md:pb-8 pb-4 lg:pb-0 lg:mb-10 relative min-h-[250px]`}
    >
      {/* Header */}
      <div className="absolute -top-[3px] 2xl:top-[-12px] z-20">
        <p className="lg:text-[33px] md:text-[28px] text-[21px] text-[#da6633] font-theseasion font-medium">
          Explore our Properties
        </p>
      </div>

      {/* Location Filter Tabs */}
      <div className="absolute top-8 md:top-7 lg:top-[2.4rem] xl:top-[2.9rem] z-20 w-full">
        {renderLocationTabs()}
      </div>

      {/* Properties List */}
      {isLoading ? (
        <LocationCardLoader />
      ) : propertyList?.data && propertyList.data.length > 0 ? (
        <div className="gap-5 mt-3 lg:mt-0 transition-all delay-75 ease-in-out duration-1000">
          <Swiper
            navigation={true}
            spaceBetween={20}
            loop
            freeMode={true}
            speed={2000}
            modules={[Navigation]}
            className="location_weekend"
            breakpoints={swiperBreakpoints}
          >
            {propertyList.data.map((property, index) => {
              const createPropertyLink = () => {
                return `property/${property.slug}`;
              };

              return (
                <SwiperSlide key={index}>
                  <Link href={createPropertyLink()}>
                    <div className="group view_card mt-[5px] xs:mt-[40px] sm:mt-[80px] md:mt-[20px] lg:mt-[10px] transition ease-in delay-100 mb-3 rounded-br-[10px] rounded-bl-[10px] rounded-tr-[10px] rounded-tl-[10px]">
                      <div className="relative">
                        <Swiper
                          className="getway_slider"
                          spaceBetween={0}
                          slidesPerView={1}
                          loop={true}
                          navigation={true}
                          modules={[Navigation]}
                        >
                          {property?.allImages?.map(
                            (img: string, idx: number) => (
                              <SwiperSlide key={idx}>
                                <div className="w-full h-[160px] md:h-[170px] lg:h-[210px] xl:h-[300px] 2xl:h-[340px] relative z-0 overflow-hidden transition-all ease-in-out duration-1000 rounded-tr-[10px] rounded-tl-[10px]">
                                  <Image
                                    src={generateFilePath(img)}
                                    alt={property.name}
                                    fill
                                    className="group-hover:scale-125 object-cover duration-1000 transition-all group-hover:transition-all group-hover:delay-75 group-hover:duration-1000 ease-in-out"
                                  />
                                  <div className="h-full w-full md:bg-custom-gradient absolute left-0 pt-3 right-0 text-center mx-auto z-10 bottom-0" />
                                </div>
                              </SwiperSlide>
                            )
                          )}
                        </Swiper>

                        {/* Desktop room info overlay */}
                        <div className="md:block hidden room_info absolute bottom-4 left-5 z-10">
                          <ul className="flex gap-5">
                            <li className="text-white font-montserrat md:text-[13px] xl:text-[13px] before-content before:mr-2">
                              Upto {property.guest} Guests
                            </li>
                            <li className="text-white font-montserrat md:text-[13px] xl:text-[13px] before-content before:mr-2">
                              {property.bedroom} Bedroom
                            </li>
                            <li className="text-white font-montserrat md:text-[13px] xl:text-[13px] before-content before-dot before:mr-2">
                              {property.serviceType}
                            </li>
                          </ul>
                        </div>

                        {/* Destination badge */}
                        <div className="absolute top-4 right-4 bg-[#da6633] font-montserrat px-3 py-1 text-[0.7rem] text-[#fff] rounded-sm z-10">
                          {property.destination}
                        </div>
                      </div>

                      <div className="content py-3 px-[12px] md:px-[15px] xl:px-[35px] bg-[#fff] rounded-[10px]">
                        {/* Title and Rating */}
                        <div className="flex flex-row justify-between">
                          <h4 className="lg:text-[20px] text-[15px] text-primarydark font-theseasion capitalize font-medium mb-0 md:w-[80%] line-clamp-1">
                            {property.name}
                          </h4>
                          {property.maxStar && (
                            <div className="flex gap-1 items-center">
                              <svg
                                width="13"
                                height="13"
                                viewBox="0 0 14 14"
                                fill="none"
                              >
                                <path
                                  d="M13.9631 5.36985C13.871 5.08637 13.6195 4.88567 13.3232 4.85886L9.28184 4.49195L7.68466 0.752632C7.56674 0.477908 7.29842 0.300598 6.99977 0.300598C6.70112 0.300598 6.4327 0.477908 6.31553 0.752632L4.71835 4.49195L0.67632 4.85886C0.38002 4.8862 0.129115 5.0869 0.0364013 5.36985C-0.0557786 5.65333 0.0293516 5.96427 0.253446 6.1608L3.30841 8.83957L2.40766 12.8068C2.34175 13.0985 2.45498 13.4002 2.69701 13.5751C2.82711 13.6697 2.97996 13.7169 3.13335 13.7169C3.26515 13.7169 3.39707 13.6818 3.51488 13.6114L6.99977 11.5276L10.484 13.6114C10.7396 13.7641 11.061 13.7501 11.3025 13.5751C11.5446 13.4002 11.6578 13.0985 11.5919 12.8068L10.6911 8.83957L13.7461 6.1608C13.9701 5.96427 14.0553 5.65397 13.9631 5.36985V5.36985Z"
                                  fill="#FBA919"
                                />
                              </svg>
                              <p className="font-montserrat text-[16px] font-medium text-[#333]">
                                {property.maxStar}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Mobile room info */}
                        <div className="md:hidden z-10 my-2">
                          <ul className="flex gap-1">
                            <li className="text-[#000] px-2 py-1 rounded-sm bg-[#f5f5f5] font-montserrat text-[10px]">
                              Upto {property.guest} Guests
                            </li>
                            <li className="text-[#000] px-2 py-1 rounded-sm bg-[#f5f5f5] font-montserrat text-[10px]">
                              {property.bedroom} Bedroom
                            </li>
                            {property.serviceType && (
                              <li className="text-[#000] px-2 py-1 rounded-sm bg-[#f5f5f5] font-montserrat text-[10px]">
                                {property.serviceType}
                              </li>
                            )}{" "}
                          </ul>
                        </div>

                        {/* Price and Availability Button */}
                        <div className="flex flex-row justify-between items-center">
                          <div className="min:w-1/3">
                            <p className="text-[16px] md:text-[20px] text-primarydark font-medium font-montserrat flex flex-row items-center">
                              ₹
                              {property.dayPrice
                                ? formatPrice(property.dayPrice)
                                : formatPrice(property.price)}
                              /-
                              <span className="text-[11px] md:text-[12px] text-[#555] font-montserrat ml-1">
                                night + taxes
                              </span>
                            </p>
                            {/* <span className="text-[11px] md:text-[12px] text-[#555] font-montserrat">
                              (₹
                              {Math.round(
                                (property.dayPrice ?? property.price) /
                                  property.bedroom
                              )}{" "}
                              x {property.bedroom} Rooms)
                            </span> */}
                          </div>

                          <div className="between-max1280-and-1280min:w-3/6 min:w-4/12 overflow-hidden">
                            <Link
                              href={getPropertyLink(property)}
                              className="rounded-full px-2 py-1 md:px-3 lg:px-4 lg:py-2 md:translate-x-[-100%] group-hover:translate-x-0 text-[0.11px] lg:text-[12px] xl:text-[14px] 2xl:text-[16px] delay-75 duration-300 group-hover:delay-100 group-hover:duration-300 ease-in-out opacity-0 group-hover:opacity-100 border border-primarycolor font-montserrat font-medium flex items-center justify-center gap-2 text-primarycolor w-max between-max1280-and-1280min:w-[70%] hover:text-white hover:bg-[#da6633] hover:border-[#da6633]"
                            >
                              <span className="md:block hidden xl:text-[13px] 2xl:text-[16px]">
                                See Availability
                              </span>
                              <GoArrowRight className="text-[1rem] md:text-[1.7rem]" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      ) : (
        <div className="text-center h-[160px] flex justify-center items-center md:h-[170px] lg:h-[210px] xl:h-[300px] 2xl:h-[340px]">
          <p>No properties found for the selected location.</p>
        </div>
      )}
    </div>
  );
};
