"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import Link from "next/link";
import moment from "moment";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

// Icons
import { FaHeart, FaRegHeart, FaLocationDot } from "react-icons/fa6";
import { FiArrowRight } from "react-icons/fi";

// Services and utilities
import { IProperty } from "@/services/property.service";
import { generateFilePath } from "@/services/url.service";
import { useSearch } from "@/providers/context/RootContext";
import { useAddWishlist } from "@/services/wishlist.service";
import { toastError, toastSuccess } from "@/utils/toast";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch } from "react-redux";
import { showLoginPopup } from "@/store";
import { formatPrice } from "@/utils/formatPrice";

// Types
interface CategoryCardProps {
  propertyList: IProperty[];
}

interface SearchData {
  startDate?: Date;
  endDate?: Date;
  adult?: number;
  child?: number;
}

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

// Wishlist Button Component
const WishlistButton = ({
  property,
  userId,
  onAddWishlist,
}: {
  property: IProperty;
  userId: string;
  onAddWishlist: (propertyId: string) => void;
}) => (
  <div className="absolute top-3 right-3 z-[10] cursor-pointer">
    <div className="w-[25px] h-[25px] md:w-[30px] md:h-[30px] 2xl:w-[40px] 2xl:h-[40px] rounded-full bg-[#fff] xl:p-1 2xl:p-3 flex items-center justify-center shadow-md">
      <Link
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onAddWishlist(property._id);
        }}
      >
        {userId && property.isWishlist ? (
          <FaHeart className="text-red-500 md:text-[20px]" />
        ) : (
          <FaRegHeart className="text-navibule md:text-[20px]" />
        )}
      </Link>
    </div>
  </div>
);

// Property Image Component
// Property Image Component - Fixed
const PropertyImage = ({
  property,
  userId,
  onAddWishlist,
}: {
  property: IProperty;
  userId: string;
  onAddWishlist: (propertyId: string) => void;
}) => {
  if (!property.allImages || property.allImages?.length === 0) {
    return (
      <div className="relative w-full h-full">
        <Image
          src={generateFilePath(property.mainImage)}
          alt={property.name}
          fill
          priority
          className="group-hover:scale-110 delay-75 duration-1000 group-hover:delay-75 group-hover:duration-1000 ease-in-out object-cover"
        />
        <div className="h-full w-full bg-custom-gradient absolute left-0 pt-3 right-0 mx-auto z-10 bottom-0 gap-3"></div>
        <WishlistButton
          property={property}
          userId={userId}
          onAddWishlist={onAddWishlist}
        />
      </div>
    );
  }

  return (
    <div className="getway_slider relative w-full h-full col-span-12 lg:col-span-1 xl:col-span-1">
      <Swiper
        className="2xl:h-[20rem] h-[13.5rem] rounded-lg md:rounded-none xl:h-[15rem] w-full relative overflow-hidden"
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        navigation={true}
        modules={[Navigation]}
      >
        {property.allImages.map((img, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative w-full h-full">
              <Image
                src={generateFilePath(img)}
                alt={`${property.name} - Image ${idx + 1}`}
                fill
                priority={idx === 0}
                className="delay-75 duration-1000 group-hover:delay-75 group-hover:duration-1000 ease-in-out object-cover"
              />
              <div className="h-full w-full bg-custom-gradient absolute left-0 pt-3 right-0 mx-auto z-10 bottom-0 gap-3"></div>
            </div>
          </SwiperSlide>
        ))}

        {/* Navigation buttons */}
        {/* <div
          className={`swiper-button-prev-${property._id} swiper-button-prev absolute !left-5 top-1/2 z-20 transform -translate-y-1/2 cursor-pointer`}
        />
        <div
          className={`swiper-button-next-${property._id} swiper-button-next absolute right-2 top-1/2 z-20 transform -translate-y-1/2 cursor-pointer`}
        /> */}
      </Swiper>

      <WishlistButton
        property={property}
        userId={userId}
        onAddWishlist={onAddWishlist}
      />
    </div>
  );
};

// Property Header Component (Title, Location, Rating)
const PropertyHeader = ({ property }: { property: IProperty }) => (
  <div className="flex justify-between md:items-start lg:items-start xl:items-start">
    <div className="mb-2">
      <h3 className="font-playfair text-navibule md:font-normal font-semibold text-[16px] md:text-[18px] lg:text-[20px] 2xl:mb-2 xl:mb-0 line-clamp-1">
        {property.name}
      </h3>
      <p className="flex md:mt:0 mt-1 items-center gap-1 font-montserrat font-normal text-[12px] md:text-[14px] text-primarygray">
        <FaLocationDot className="text-[primarygray] text-[0.7rem] 2xl:text-[0.9rem] xl:text-[0.8rem]" />
        {property.destination}
      </p>
    </div>
    {property.maxStar && (
      <div className="font-montserrat text-primarygray font-medium flex items-center gap-1">
        <StarIcon />
        {property.maxStar}
      </div>
    )}
  </div>
);

// Property Features Component (Bedroom, Bathroom, Guest)
const PropertyFeatures = ({ property }: { property: IProperty }) => (
  <div className="cardbet 2xl:my-4 my-2 lg:my-4">
    <ul className="flex md:gap-5 gap-2 mb-3 md:mb-7">
      <li className="font-montserrat text-[#000] md:text-primarygray md:text-[13px] text-[10px] relative px-2 py-1 lg:bg-white bg-[#f5f5f5]">
        Upto {property.guest} Guest
      </li>
      <li className="font-montserrat text-[#000] md:text-primarygray md:text-[13px] text-[10px] relative px-2 py-1 lg:bg-white bg-[#f5f5f5]">
        {property.bedroom} Bedroom
      </li>
      {property.serviceType && (
        <li className="font-montserrat text-[#000] md:text-primarygray md:text-[13px] text-[10px] relative px-2 py-1 lg:bg-white bg-[#f5f5f5]">
          {property.serviceType}
        </li>
      )}
    </ul>
  </div>
);

// Property Pricing Component
const PropertyPricing = ({ property }: { property: IProperty }) => (
  <div className="2xl:basis-2/3 xl:basis-2/4">
    <p className="font-montserrat text-primarygray font-medium md:text-[12px] hidden md:block">
      Starts From
    </p>
    <p className="text-[16px] md:text-[20px] text-primarydark font-medium font-montserrat flex flex-row items-center">
      ₹{formatPrice(property.price)}/-
      <span className="text-[11px] md:text-[12px] text-[#555] font-montserrat ml-1">
        night + taxes
      </span>
    </p>
    {/* <p>
      <span className="text-[11px] md:text-[12px] !text-[#555] font-montserrat font-medium">
        (₹{Math.round((property.dayPrice ?? property.price) / property.bedroom)}{" "}
        x {property.bedroom} Rooms)
      </span>
    </p> */}
  </div>
);

// Book Now Button Component
const BookNowButton = ({
  propertyLink,
  hasDateRange,
}: {
  propertyLink: string;
  hasDateRange: boolean;
}) => (
  <div className="2xl:basis-1/3 xl:basis-2/4 overflow-hidden">
    <Link
      href={propertyLink}
      className="px-[0.7rem] py-[0.5rem] rounded-sm text-[0.8rem] md:px-[1.6rem] md:py-[0.8rem] lg:-translate-x-52 group-hover:translate-x-0 lg:text-[0.8rem] 2xl:text-[1rem] delay-75 duration-1000 group-hover:delay-75 group-hover:duration-1000 ease-in-out group-hover:opacity-95 border border-primarycolor font-montserrat font-medium flex items-center justify-center lg:gap-1 2xl:gap-2 lg:px-1 lg:py-2 2xl:px-2 2xl:py-3 text-primarycolor lg:w-[70%] 2xl:w-[90%]"
    >
      <span className="hidden md:block 2xl:text-[16px] xl:text-[12px]">
        {hasDateRange ? "Book Now" : "See Availability"}
      </span>
      <FiArrowRight className="text-[1rem] md:text-[1.3rem]" />
    </Link>
  </div>
);

// Property Content Component (Right side content)
const PropertyContent = ({
  property,
  locationSearch,
  hasDateRange,
}: {
  property: IProperty;
  locationSearch: SearchData;
  hasDateRange: boolean;
}) => {
  const searchParams = useSearchParams();
  const room = searchParams.get("room");
  const createPropertyLink = () => {
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

    return `property/${
      property.slug
    }?startDate=${startDate}&endDate=${endDate}&adult=${
      locationSearch?.adult ?? 1
    }&child=${locationSearch?.child ?? 0}&room=${room ?? property?.bedroom}`;
  };

  const propertyLink = createPropertyLink();

  return (
    <div className="sm:col-span-12 lg:col-span-1 xl:col-span-1 col-span-12 md:px-[0rem] px-[1rem] md:pb-0 pb-4 md:flex md:flex-col md:justify-center">
      <PropertyHeader property={property} />
      <PropertyFeatures property={property} />

      <div className="flex items-end gap-6 justify-between mt-2">
        <PropertyPricing property={property} />
        <BookNowButton
          propertyLink={propertyLink}
          hasDateRange={hasDateRange}
        />
      </div>
    </div>
  );
};

// Single Property Card Component
const PropertyCard = ({
  property,
  locationSearch,
  userId,
  onAddWishlist,
  hasDateRange,
}: {
  property: IProperty;
  locationSearch: any;
  userId: string;
  onAddWishlist: (propertyId: string) => void;
  hasDateRange: boolean;
}) => {
  const createPropertyLink = () => {
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

    return `property/${
      property.slug
    }?startDate=${startDate}&endDate=${endDate}&adult=${
      locationSearch?.adult ?? 1
    }&child=${locationSearch?.child ?? 0}&room=${property?.bedroom}`;
  };

  const propertyLink = createPropertyLink();

  return (
    <div
      className="md:border view_card sm:shadow-none shadow-md group md:p-4 mb-5 md:mt-0 rounded-md"
      key={property._id}
    >
      <Link href={propertyLink}>
        <div className="grid grid-cols-12 lg:grid-cols-2 xl:grid-cols-2 gap-[10px] md:gap-[30px] lg:gap-[30px] xl:gap-[30px] rounded-sm">
          <PropertyImage
            property={property}
            userId={userId}
            onAddWishlist={onAddWishlist}
          />
          <PropertyContent
            property={property}
            locationSearch={locationSearch}
            hasDateRange={hasDateRange}
          />
        </div>
      </Link>
    </div>
  );
};

// Empty State Component
const EmptyState = () => (
  <h5 className="font-montserrat font-semibold text-[16px] text-primarydark">
    No Property Found
  </h5>
);

// Main Category Card Component
const CategoryCard = ({ propertyList }: CategoryCardProps) => {
  const [locationSearch, setLocationSearch] = useSearch();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const { mutateAsync: addWishlist } = useAddWishlist();
  const dispatch = useDispatch();
  // Extract search parameters
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const hasDateRange = Boolean(startDate && endDate);

  // Get user ID from session
  const userId = (session as any)?.token?.decoded_token?.userId;

  // Handle wishlist functionality
  const handleAddWishlist = async (propertyId: string) => {
    try {
      if (!userId) {
        dispatch(showLoginPopup());
        return;
      }

      const response = await addWishlist({ propertyId });

      if (response?.data?.message) {
        toastSuccess(response.data.message);
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toastError("Failed to add to wishlist");
    }
  };

  // Update location search when URL parameters change
  useEffect(() => {
    if (startDate && endDate) {
      setLocationSearch({
        ...locationSearch,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      });
    }
  }, [startDate, endDate, setLocationSearch]);

  // Render property list or empty state
  if (!propertyList?.length) {
    return <EmptyState />;
  }

  return (
    <div>
      {propertyList.map((property: IProperty) => (
        <PropertyCard
          key={property._id}
          property={property}
          locationSearch={locationSearch}
          userId={userId}
          onAddWishlist={handleAddWishlist}
          hasDateRange={hasDateRange}
        />
      ))}
    </div>
  );
};

export default CategoryCard;
