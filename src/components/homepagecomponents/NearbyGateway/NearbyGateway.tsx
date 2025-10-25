"use client";
import React from "react";
import { Navigation } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import dynamic from "next/dynamic";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// Icons
import { GoArrowRight } from "react-icons/go";

// Assets
import dummyimg from "@/assets/homepage/mainimg.jpg";

// Services and constants
import { APPROVE_STATUS, STATUS } from "@/common/contstant";
import { IProperty, useProperty } from "@/services/property.service";
import { useSearch } from "@/providers/context/RootContext";
import { generateFilePath } from "@/services/url.service";
import { formatPrice } from "@/utils/formatPrice";

const Swiper = dynamic(() => import("swiper/react").then((mod) => mod.Swiper), {
  ssr: false,
});

// Types
interface SearchParams {
  startDate: string;
  endDate: string;
  adult: number;
  child: number;
  room: number;
}

// Star Rating SVG Component
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

// Property Image Component
const PropertyImage = ({ property }: { property: IProperty }) => {
  if (!property?.allImages || property?.allImages.length === 0) {
    return (
      <div className="w-full h-[160px] md:h-[170px] lg:h-[210px] xl:h-[300px] 2xl:h-[340px] relative z-0 overflow-hidden transition-all ease-in-out duration-1000 rounded-tr-[10px] rounded-tl-[10px]">
        <Image
          src={dummyimg}
          alt="Dummy Image"
          fill
          className="group-hover:scale-125 object-cover duration-1000 transition-all group-hover:transition-all group-hover:delay-75 group-hover:duration-1000 ease-in-out"
        />
        <div className="h-full w-full md:bg-custom-gradient absolute left-0 pt-3 right-0 text-center mx-auto z-10 bottom-0" />
      </div>
    );
  }
  return (
    <div className="relative">
      <Swiper className="getway_slider">
        {property?.allImages.map((img: string, idx: number) => (
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
        ))}

        {/* Navigation buttons */}
        <div
          className={`swiper-button-prev-${property._id} swiper-button-prev absolute !left-5 top-1/2 z-20 transform -translate-y-1/2 cursor-pointer`}
        />
        <div
          className={`swiper-button-next-${property._id} swiper-button-next absolute right-2  z-20 transform -translate-y-1/2 cursor-pointer`}
        />
      </Swiper>

      {/* Destination Badge */}
      <div className="absolute top-4 right-4 bg-[#da6633] font-montserrat px-3 py-1 text-[0.7rem] text-[#fff] rounded-sm z-10">
        {property.destination}
      </div>

      {/* Room Info Overlay (Desktop Only) */}
      <div className="md:block hidden room_info absolute bottom-4 left-5 z-10">
        <PropertyInfoList property={property} />
      </div>
    </div>
  );
};

// Property Info List Component
const PropertyInfoList = ({ property }: { property: IProperty }) => (
  <ul className="flex gap-5">
    <li className="text-white font-montserrat md:text-[13px] xl:text-[13px] before-content">
      Upto {property.guest} Guests
    </li>
    <li className="text-white font-montserrat md:text-[13px] xl:text-[13px] before-content">
      {property.bedroom} Bedroom
    </li>
    <li className="text-white font-montserrat md:text-[13px] xl:text-[13px] before-content before-dot before:mr-2">
      {property.serviceType}
    </li>
  </ul>
);

// Property Rating Component
const PropertyRating = ({ maxStar }: { maxStar?: number }) => {
  if (!maxStar) return null;

  return (
    <div className="flex gap-1 items-center">
      <p className="font-montserrat text-[16px] font-medium text-[#333]">
        {maxStar}
      </p>
      <StarIcon />
    </div>
  );
};

// Mobile Property Details Component
const MobilePropertyDetails = ({ property }: { property: IProperty }) => (
  <div className="md:hidden z-10 my-2">
    <ul className="flex gap-1">
      <li className="text-[#000] px-1 py-1 rounded-sm bg-[#f5f5f5] font-montserrat text-[10px] md:text-[18px]">
        Upto {property.guest} Guests
      </li>
      <li className="text-[#000] px-1 py-1 rounded-sm bg-[#f5f5f5] font-montserrat text-[10px] md:text-[18px]">
        {property.bedroom} Bedroom
      </li>
      {property.serviceType && (
        <li className="text-[#000] px-1 py-1 rounded-sm bg-[#f5f5f5] font-montserrat text-[10px] md:text-[18px]">
          {property.serviceType}
        </li>
      )}
    </ul>
  </div>
);

// Property Pricing Component
const PropertyPricing = ({ property }: { property: IProperty }) => (
  <div>
    <p className="text-[16px] md:text-[20px] text-primarydark font-medium font-montserrat flex flex-row items-center">
      ₹{formatPrice(property.price)}/-
      <span className="text-[11px] md:text-[12px] text-[#555] font-montserrat ml-1">
        night + taxes
      </span>
    </p>
    {/* <span className="text-[11px] md:text-[12px] text-[#555] font-montserrat">
      (₹{Math.round((property.dayPrice ?? property.price) / property.bedroom)} x{" "}
      {property.bedroom} Rooms)
    </span> */}
  </div>
);

// Availability Button Component
const AvailabilityButton = ({ propertyLink }: { propertyLink: string }) => (
  <div className="between-max1280-and-1280min:w-3/6 min:w-4/12 overflow-hidden">
    <Link
      href={propertyLink}
      className="rounded-full w-max px-2 py-1 lg:px-6 lg:py-2 md:-translate-x-52 group-hover:translate-x-0 text-[0.11px] lg:text-[12px] xl:text-[14px] 2xl:text-[16px] delay-75 duration-1000 group-hover:delay-75 group-hover:duration-1000 ease-in-out group-hover:opacity-95 border border-primarycolor font-montserrat font-medium flex items-center justify-center gap-2 text-primarycolor between-max1280-and-1280min:w-[70%] hover:text-white hover:bg-[#da6633] hover:border-[#da6633]"
    >
      <span className="md:block hidden xl:text-[13px] 2xl:text-[16px]">
        See Availability
      </span>
      <GoArrowRight className="text-[1rem] md:text-[1.7rem]" />
    </Link>
  </div>
);

// Property Card Component
const PropertyCard = ({
  property,
  searchParams,
}: {
  property: IProperty;
  searchParams: SearchParams;
}) => {
  const createPropertyLink = () => {
    const { startDate, endDate, adult, child, room } = searchParams;
    return `property/${property.slug}`;
  };

  const propertyLink = createPropertyLink();

  return (
    <Link
      href={propertyLink}
      className="view_card group transition ease-in delay-100 shadow-md mb-3 rounded-br-[10px] rounded-bl-[10px]"
    >
      <div className="relative">
        <Swiper
          className="getway_slider"
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          navigation={true}
          modules={[Navigation]}
        >
          {property?.allImages?.map((img: string, idx: number) => (
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
          ))}
        </Swiper>

        {/* Destination Badge */}
        <div className="absolute top-4 right-4 bg-[#da6633] font-montserrat px-3 py-1 text-[0.7rem] text-[#fff] rounded-sm z-10">
          {property.destination}
        </div>

        {/* Room Info Overlay (Desktop Only) */}
        <div className="md:block hidden room_info absolute bottom-4 left-5 z-10">
          <PropertyInfoList property={property} />
        </div>
      </div>

      <div className="content py-3 px-[12px] md:px-[15px] xl:px-[35px] bg-[#fff] rounded-[10px]">
        {/* Property Header */}
        <div className="flex flex-row justify-between">
          <h4 className="lg:text-[20px] text-[15px] text-primarydark font-theseasion capitalize font-medium mb-0 md:w-[80%] line-clamp-1">
            <Link href={propertyLink}>{property.name}</Link>
          </h4>
          <PropertyRating maxStar={property.maxStar} />
        </div>

        {/* Mobile Property Details */}
        <MobilePropertyDetails property={property} />

        {/* Pricing and Availability Section */}
        <div className="flex flex-row justify-between items-center">
          <PropertyPricing property={property} />
          <AvailabilityButton propertyLink={propertyLink} />
        </div>
      </div>
    </Link>
  );
};

// Properties Slider Component
const PropertiesSlider = ({
  properties,
  searchParams,
}: {
  properties: IProperty[];
  searchParams: SearchParams;
}) => {
  const swiperBreakpoints = {
    0: { slidesPerView: 1.3 },
    576: { slidesPerView: 2 },
    992: { slidesPerView: 2 },
    1200: { slidesPerView: 2.5 },
    1400: { slidesPerView: 2.5 },
  };

  return (
    <div className="gap-5 transition-all delay-75 ease-in-out duration-1000">
      <Swiper
        speed={2000}
        navigation={true}
        spaceBetween={20}
        loop={properties.length > 2}
        freeMode={true}
        modules={[Navigation]}
        className="allgetway_slider"
        breakpoints={swiperBreakpoints}
      >
        {properties.map((property: IProperty, index: number) => (
          <SwiperSlide key={property._id || index}>
            <PropertyCard property={property} searchParams={searchParams} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

// Main Component
export default function NearbyGateway() {
  // Fetch property data
  const { data: propertyList } = useProperty(
    { status: APPROVE_STATUS.APPROVED, top: STATUS.ACTIVE },
    true,
    true
  );
  console.log("propertyList::", propertyList?.data);
  // Get search context
  const [locationSearch] = useSearch();

  // Format search parameters
  const formatSearchParams = (): SearchParams => ({
    startDate: moment(new Date(locationSearch?.startDate)).format("YYYY-MM-DD"),
    endDate: moment(new Date(locationSearch?.endDate)).format("YYYY-MM-DD"),
    adult: locationSearch?.adult,
    child: locationSearch?.child,
    room: locationSearch?.room,
  });

  const searchParams = formatSearchParams();
  const hasProperties = propertyList && propertyList?.data?.length > 0;

  return (
    <div className="w-[95%] md:w-[85%] lg:w-[85%] 2xl:w-[85%] mx-auto md:pb-8 pb-4 pt-7 lg:pt-[1.55rem] 2xl:!pt-0 relative">
      {/* Section Title */}
      <h2 className="lg:text-[33px] md:text-[28px] text-[21px] text-[#da6633] font-medium font-playfair lg:top-[1.55rem] xl:top-[1.15rem] absolute 2xl:top-0 left-0">
        Available This Weekend
      </h2>

      {/* Properties Grid */}
      {hasProperties && (
        <PropertiesSlider
          properties={propertyList.data}
          searchParams={searchParams}
        />
      )}
    </div>
  );
}
