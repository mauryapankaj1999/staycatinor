"use client";
import Image from "next/image";
import React, { Suspense, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { LuShare2 } from "react-icons/lu";
import { SiWhatsapp } from "react-icons/si";
import { FaRegHeart, FaHeart } from "react-icons/fa";

import {
  IoCallOutline,
  IoCloseCircle,
  IoLocationOutline,
} from "react-icons/io5";
import StarRatings from "react-star-ratings";
import Hotelservice from "./_components/Hotelservice/Hotelservice";
import Propertydetailsconetnt from "./_components/Propertydetailsconetnt/Propertydetailsconetnt";
import ProductReview from "./_components/ProductReview/ProductReview";
import Productmeals from "./_components/Productmeals/Productmeals";
import ProductLocation from "./_components/ProductLocation/ProductLocation";
import HotelToDo from "./_components/HotelToDo/HotelToDo";
import RoomlayoutSlider from "./_components/RoomlayoutSlider/RoomlayoutSlider";
import Hotelhomerole from "./_components/Hotelhomerole/Hotelhomerole";
import PropertyFaq from "./_components/PropertyFaq/PropertyFaq";
import EnquerySection from "./_components/EnquerySection/EnquerySection";
import SuggestHotel from "./_components/SuggestHotel/SuggestHotel";
import Enqueryform from "./_components/Enqueryform/Enqueryform";
import ProductAbout from "./_components/ProductAbout/ProductAbout";
import ProductAmenities from "./_components/ProductAmenities/ProductAmenities";
import { ProductImageLoader } from "./_components/Productdetailsimg/ProductImageLoader";
import { IProperty, usePropertyBySlug } from "@/services/property.service";
import iconone from "@/assets/allimg/bed_1.webp";
import iconone1 from "@/assets/allimg/tab_icon.webp";

import iconone2 from "@/assets/allimg/guest_img.webp";
import iconone3 from "@/assets/allimg/mealsAvailable.svg";
import { IoIosCloseCircle } from "react-icons/io";
import Detailspageform from "@/components/Detailspageform/Detailspageform";
import Otpopenmodal from "@/components/Otpopenmodal/Otpopenmodal";
import Mobilemealscomponents from "./_components/Mobilemealscomponents/Mobilemealscomponents";
import icon1 from "@/assets/allimg/citizens.svg";
import icon2 from "@/assets/allimg/meals.svg";
import icon3 from "@/assets/allimg/kids_icon.svg";
import animites1 from "@/assets/allimg/Amenities1.webp";
import animites2 from "@/assets/allimg/Amenities2.webp";
import animites3 from "@/assets/allimg/Amenities3.webp";
import animites4 from "@/assets/allimg/Amenities4.webp";
import animites5 from "@/assets/allimg/Amenities5.webp";
import TabSections from "./_components/TabSections/TabSections";
import { useAddWishlist } from "@/services/wishlist.service";
import { useSession } from "next-auth/react";
import { generateFilePath } from "@/services/url.service";
import { BiSolidFilePdf } from "react-icons/bi";
import { toastError, toastSuccess } from "@/utils/toast";
import { useCollection } from "@/services/collection.service";
import { useDispatch } from "react-redux";
import { showLoginPopup } from "@/store";

const Productdetailsimg = dynamic(
  () => import("./_components/Productdetailsimg/Productdetailsimg"),
  {
    ssr: false,
    loading: () => <ProductImageLoader />,
  }
);

export default function page({ params }: { params: { slug: string } }) {
  const { data: session } = useSession();
  const userId = (session as any)?.token?.decoded_token.userId;

  const { data: property, isLoading } = usePropertyBySlug(
    { slug: params.slug, userId: userId ?? "" },
    !!params.slug
  );
  console.log(property, "property--");
  const [propertyId, setPropertyId] = useState("");
  const [propertyDetail, setpropertyDetail] = useState<IProperty>();
  const [tagglefilterbottm, setTagglefilterbottm] = useState(false);
  const [step, setStep] = useState(1);
  const [booknow, setBooknow] = useState(false);
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const [amenitiesArr, setAmenitiesArr] = useState<any>();

  const [togglemodal, setTogglemodal] = useState(false);

  const { mutateAsync: addWishlist } = useAddWishlist();
  useEffect(() => {
    if (property && property) {
      setpropertyDetail(property);
      setPropertyId(property?._id);
    }
  }, [property]);

  const [listItems, setListItems] = useState([
    { item: "About", id: 1, active: false },
    { item: "Spaces", id: 2, active: false },
    { item: "Amenities", id: 3, active: false },
    { item: "Meals", id: 4, active: false },
    { item: "Location", id: 5, active: false },
    { item: "Things to Do", id: 6, active: false },
    { item: "Reviews", id: 7, active: false },
    { item: "Home Rule", id: 8, active: false },
    { item: "FAQ", id: 9, active: false },
  ]);

  // Store the refs for each section
  const sectionRefs: any = {
    1: useRef(null),
    2: useRef(null),
    3: useRef(null),
    4: useRef(null),
    5: useRef(null),
    6: useRef(null),
    7: useRef(null),
    8: useRef(null),
    9: useRef(null),
  };

  // Function to update the active tab
  const handleScroll = () => {
    let headerHeight = localStorage.getItem("headerHeight") || "0";
    let tabHeaderHeight = localStorage.getItem("tabHeader") || "0";

    const sectionPositions = listItems.map((el) => {
      const ref = sectionRefs[el.id].current;
      if (ref) {
        const rect = ref.getBoundingClientRect();
        return {
          id: el.id,
          top:
            Number(rect.top) - Number(headerHeight) - Number(tabHeaderHeight),
          bottom:
            Number(rect.bottom) -
            Number(headerHeight) -
            Number(tabHeaderHeight),
        };
      }
      return null;
    });

    // Determine which section is currently in view
    let activeId = null;
    for (let i = 0; i < sectionPositions.length; i++) {
      const section = sectionPositions[i];
      if (
        section &&
        section.top <= window.innerHeight / 2 &&
        section.bottom >= 100
      ) {
        activeId = section.id;
        break;
      }
    }

    // Update the active state in listItems
    setListItems((prevItems) =>
      prevItems.map((el) =>
        el.id === activeId ? { ...el, active: true } : { ...el, active: false }
      )
    );
  };

  // Set up scroll listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [listItems]);

  // Function to handle clicking on a tab
  const handleTabItemClick = (id: any) => {
    setListItems((prevItems) =>
      prevItems.map((el) =>
        el.id === id ? { ...el, active: true } : { ...el, active: false }
      )
    );
    let headerHeight = localStorage.getItem("headerHeight") || "0";
    let tabHeaderHeight = localStorage.getItem("tabHeader") || "0";

    if (window && window != undefined) {
      window.scroll({
        left: 0,
        top: Number(
          parseInt(sectionRefs[id].current.offsetTop) -
            Number(headerHeight) -
            Number(tabHeaderHeight)
        ),
        behavior: "smooth",
      });
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {}, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleShareClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: document.title,
          text: "Check out this amazing page!",
          url: window.location.href,
        })
        .then(() => {
          console.log("Thanks for sharing!");
        })
        .catch((error: any) => {
          console.error("Error sharing:", error);
        });
    } else {
      alert("Web Share API not supported in this browser.");
      // Fallback code to share link via other means (e.g., copy to clipboard)
      const fallbackUrl = window.location.href;
      const fallbackText = "Copy this link to share: " + fallbackUrl;
      const fallbackContainer = document.createElement("div");
      fallbackContainer.innerText = fallbackText;
      document.body.appendChild(fallbackContainer);
    }
  };

  useEffect(() => {
    if (property?.amenities) {
      // Group amenities by category and remove duplicates by amenity _id
      let groupingViaCommonProperty = Object.values(
        property?.amenities.reduce((acc: any, current) => {
          const category = current.amenityCategoryName;
          acc[category] = acc[category] ?? [];
          // Check for duplicate by _id
          if (
            !acc[category].some((item: any) => item._id === current.amenityId)
          ) {
            acc[category].push(current);
          }
          return acc;
        }, {})
      );
      console.log("groupingViaCommonProperty", groupingViaCommonProperty);

      setAmenitiesArr(groupingViaCommonProperty);
    }
  }, [property?.amenities]);

  const handleAddWishlist = async () => {
    try {
      if (!userId) {
        dispatch(showLoginPopup());
        // toastError("Please login to add wishlist");
        return;
      }
      const res = await addWishlist({
        propertyId,
      });
      if (res?.data?.message) {
        // setIsWishlisted(!isWishlisted);
        toastSuccess(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // setIsWishlisted(userId === (propertyDetail?.wishlistsObj?.userId))
  }, [userId && propertyDetail]);

  if (isLoading) {
    return (
      <div className="w-full h-[100vh] flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <Suspense fallback="Loading ....">
      <Productdetailsimg
        reels={property?.reels}
        mainImage={property?.mainImage ? property?.mainImage : ""}
        galleryArr={property?.galleries ? property?.galleries : []}
        propertyId={propertyId}
        property={property}
      />

      <div className="w-[95%] md:w-[85%] lg:w-[95%] 2xl:w-[78%] mx-auto mt-3 lg:mt-6">
        <div className="sticky top-[60px] md:top-[68px] lg:top-[6.2rem] xl:top-[6.3rem] 2xl:top:[5rem] z-20 custom_listSticky">
          <TabSections
            listItems={listItems}
            handleItemClick={(id: number) => handleTabItemClick(id)}
          />
        </div>

        <div className="flex">
          <div className="w-full lg:!w-[67%] lg:pr-[30px]">
            <div className="flex flex-col justify-between">
              <h3 className="font-playfair font-bold text-navibule text-[18px] md:text-[28px] 2xl:text-[28px] w-[100%] capitalize">
                {property?.name}
              </h3>

              {/* <div className="mt-3 flex gap-2 items-center md:block">
                          <StarRatings
                            rating={4}
                            starDimension="15px"
                            starSpacing="1px"
                            starRatedColor="#da6633"
                          />
                          <p className="font-montserrat text-[#2f80ed] 2xl:text-[16px] text-[10px] xl:text-[11px] font-medium">
                            306 reviews
                          </p>
                        </div> */}

              <div className="flex flex-row gap-2 items-center justify-between">
                <p className="flex items-center gap-1 font-montserrat text-[0.8rem] md:text-[16px] font-normal mt-2">
                  {/* <IoLocationOutline className="text-primarygray text-[14px] 2xl:text-[18px] xl:text-[18px]" />{" "} */}
                  {property?.location}
                </p>
                <ul className="flex gap-3 items-center mt-2 justify-end">
                  <li>
                    {/* <Link href="https://wa.me/917575985757"> */}
                    {/* <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="share (3) 1" clip-path="url(#clip0_23396_7084)">
                        <path
                          id="Subtract"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M4.53659 0H14.683L22.2927 7.35691V22.0707C22.2927 22.7211 22.0255 23.3449 21.5498 23.8048C21.0741 24.2647 20.4289 24.523 19.7562 24.523H4.53659C3.86385 24.523 3.21865 24.2647 2.74295 23.8048C2.26725 23.3449 2 22.7211 2 22.0707V2.4523C2 1.80191 2.26725 1.17816 2.74295 0.718263C3.21865 0.258367 3.86385 0 4.53659 0ZM7.32938 17.9141C8.00285 17.9141 8.58119 17.7547 8.97309 17.3991C9.27241 17.1232 9.43729 16.7173 9.43856 16.2367C9.43856 15.7585 9.22041 15.3526 8.89827 15.105C8.55963 14.8438 8.05738 14.7138 7.35094 14.7138C6.83363 14.7069 6.31659 14.7406 5.80489 14.8144V19.6405H6.93875V17.892C7.06828 17.9081 7.1988 17.9154 7.32938 17.9141ZM11.4678 19.692C12.4584 19.692 13.2688 19.4884 13.8015 19.0605C14.2885 18.662 14.6424 18.0158 14.6424 17.0803C14.6424 16.2159 14.3126 15.6138 13.7863 15.2362C13.2993 14.8806 12.6753 14.7138 11.7152 14.7138C11.1979 14.7093 10.681 14.7434 10.1691 14.8156V19.6184C10.4545 19.6552 10.8743 19.692 11.4678 19.692ZM16.5448 15.658H18.4879V14.7506H15.3957V19.6417H16.5448V17.675H18.361V16.775H16.5448V15.658ZM13.4147 2.4523V8.58306H19.7562L13.4147 2.4523ZM6.94438 15.5914C7.02555 15.5693 7.18282 15.5472 7.41618 15.5472C7.98692 15.5472 8.30906 15.817 8.30906 16.2657C8.30906 16.7672 7.93491 17.064 7.3274 17.064C7.16125 17.064 7.04077 17.0578 6.94438 17.0358V15.5914ZM11.3225 15.6061C11.4202 15.584 11.5851 15.5619 11.8387 15.5619C12.8229 15.5619 13.4381 16.099 13.4304 17.1167C13.4304 18.284 12.7557 18.8358 11.7195 18.8284C11.5775 18.8284 11.4202 18.8284 11.3225 18.8063V15.6061ZM8.82903 5.14692L9.1877 5.48405L7.91941 6.67614L6.65111 5.48405L7.00978 5.14692L7.66575 5.76347V3.26974H8.17306V5.76347L8.82903 5.14692ZM5.89013 7.15298H9.94868V6.1993H10.456V7.15298C10.456 7.27944 10.4025 7.40072 10.3074 7.49015C10.2123 7.57957 10.0832 7.62981 9.94868 7.62981H5.89013C5.75558 7.62981 5.62654 7.57957 5.5314 7.49015C5.43626 7.40072 5.38281 7.27944 5.38281 7.15298V6.1993H5.89013V7.15298Z"
                          fill="#EE7E7E"
                        ></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_23396_7084">
                          <rect width="24" height="24" fill="white"></rect>
                        </clipPath>
                      </defs>
                    </svg> */}
                    <a href={generateFilePath(property?.pdf)} target="_blank">
                      <BiSolidFilePdf className="text-[#ee7e7e] text-[24px]" />
                    </a>
                    {/* </Link> */}
                  </li>
                  <li>
                    {" "}
                    <p
                      id="share-button"
                      className="cursor-pointer"
                      onClick={handleShareClick}
                    >
                      <LuShare2 className="text-[16px] md:text-[20px] text-navibule" />
                    </p>{" "}
                  </li>
                  <li>
                    {" "}
                    <Link href="https://wa.me/917575985757" target="_blank">
                      <SiWhatsapp className="text-[16px] md:text-[20px]" />
                    </Link>{" "}
                  </li>
                  <li className="hidden md:block cursor-pointer">
                    <Link
                      href="#"
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault(); // Prevent the default anchor behavior
                        handleAddWishlist();
                      }}
                    >
                      {userId && propertyDetail?.isWishlist ? (
                        <FaHeart className="text-red-500 md:text-[20px]" />
                      ) : (
                        <FaRegHeart className="text-navibule md:text-[20px]" />
                      )}
                    </Link>
                  </li>
                </ul>
                {/* <div > <Link href="https://wa.me/917575985757" className="mt-5 inline-block bg-primarydark text-[#fff] text-[10px] md:text-[13px] rounded-sm font-montserrat px-2 py-2 ">View Brochure</Link></div> */}
              </div>
            </div>

            <div className="flex gap-2 flex-row mt-4 md:!mt-6 overflow-x-scroll xl:overflow-x-hidden">
              <Hotelservice
                title={"Guests"}
                count={property?.guest}
                img={iconone2}
              />
              <Hotelservice
                title={"Bedroom"}
                count={property?.bedroom}
                img={iconone}
              />
              <Hotelservice
                title={"Bathroom"}
                count={property?.bathroom}
                img={iconone1}
              />
            </div>

            {property?.collectionsDetails?.length ? (
              <div className="flex flex-wrap gap-2 mt-5 md:mt-6 items-center">
                <span className="font-montserrat font-medium text-md md:text-[16px] text-gray-700">
                  Great for:
                </span>
                <ul className="flex gap-3 md:gap-5 items-center overflow-x-auto pb-2">
                  {property.collectionsDetails.map((el: any, index: number) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 font-montserrat text-xs md:text-sm text-gray-800"
                    >
                      <div className="w-7 h-7 relative">
                        <Image
                          src={generateFilePath(el?.thumbnail)}
                          alt={el?.name}
                          fill
                          className="object-contain rounded"
                        />
                      </div>
                      <span>{el?.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="mt-5 md:!mt-6 flex flex-row gap-2 md:gap-5 items-start ">
              <ul className="flex gap-2 md:gap-3">
                {/* {property?.amenities && property?.amenities.length > 0 &&
                  property.amenities
                    .filter(
                      (item, idx, arr) =>
                        arr.findIndex((x) => x.amenityId === item.amenityId) === idx
                    )
                    .slice(0, 5)
                    .map((items, itemIndex) => (
                      <li className="w-[45px] md:w-[60px] lg:w-[70px] text-center flex flex-col items-center" key={itemIndex}>
                        <div className="w-[35px] h-[35px] md:w-[40px] md:h-[40px] flex items-center justify-center border border-[#c3c7c3] rounded-[3px]">
                          <div className="relative w-[20px] h-[20px]">
                            <Image
                              src={generateFilePath(items.thumbnail)}
                              alt=""
                              fill
                              priority
                              className="object-contain"
                            />
                          </div>
                        </div>
                        <div className="font-montserrat font-normal text-[12px] md:text-[14px] text-center mt-[3px] leading-[16px]">
                          {items.name}
                        </div>
                      </li>
                    ))
                } */}
                {/* <li className="w-[60px] text-center">
                  <div className="w-[40px] m-auto h-[40px] flex items-center justify-center border border-[#c3c7c3] rounded-[3px]">
                    <Image
                      src={animites2}
                      alt=""
                      className="w-[20px] h-[20px]"
                    />
                  </div>
                  <div className="font-montserrat font-normal text-[12px] md:text-[14px] text-center mt-[3px] leading-[16px]">
                    Lawn
                  </div>
                </li>
                <li className="w-[60px] text-center">
                  <div className="w-[40px] m-auto h-[40px] flex items-center justify-center border border-[#c3c7c3] rounded-[3px]">
                    <Image
                      src={animites3}
                      alt=""
                      className="w-[20px] h-[20px]"
                    />
                  </div>
                  <div className="font-montserrat font-normal text-[12px] md:text-[14px] text-center mt-[3px] leading-[16px]">
                    WiFi{" "}
                  </div>
                </li>
                <li className="w-[60px] text-center">
                  <div className="w-[40px] m-auto h-[40px] flex items-center justify-center border border-[#c3c7c3] rounded-[3px]">
                    <Image
                      src={animites4}
                      alt=""
                      className="w-[20px] h-[20px]"
                    />
                  </div>
                  <div className="font-montserrat font-normal text-[12px] md:text-[14px] text-center mt-[3px] leading-[16px]">
                    Bar
                  </div>
                </li>
                <li className="w-[60px] text-center">
                  <div className="w-[40px] m-auto h-[40px] flex items-center justify-center border border-[#c3c7c3] rounded-[3px]">
                    <Image
                      src={animites5}
                      alt=""
                      className="w-[20px] h-[20px]"
                    />
                  </div>
                  <div className="font-montserrat font-normal text-[12px] md:text-[14px] text-center mt-[3px] leading-[16px]">
                    Alfresco Dining{" "}
                  </div>
                </li>

                <li className="w-[60px] text-center">
                  <div className="w-[40px] m-auto h-[40px] flex items-center justify-center border border-[#c3c7c3] rounded-[3px]">
                    <Image
                      src={animites5}
                      alt=""
                      className="w-[20px] h-[20px]"
                    />
                  </div>
                  <div className="font-montserrat font-normal text-[12px] md:text-[14px] text-center mt-[3px] leading-[16px]">
                    Alfresco Dining{" "}
                  </div>
                </li> */}
              </ul>
              {/* {amenitiesArr && amenitiesArr.length > 0 ? <button onClick={() => setTogglemodal(true)} className="text-[12px] text-[#da6633] underline font-montserrat pt-4">See All</button> : null} */}
            </div>

            {/* <Hotelservice  title={'Guests'} count={property?.guest} /> */}
            <div className="bg-[#f5f5f5] mt-5 px-3 py-3 rounded-sm ">
              <p className="flex gap-2 justify-between font-montserrat items-center text-[0.7rem] text-black font-semibold">
                <p className="flex gap-1 text-[14px] md:text-[16px] font-medium">
                  <IoCallOutline className="md:text-[1.55rem] text-[1rem]" />{" "}
                  &nbsp;Connect with Host{" "}
                </p>{" "}
                <Link
                  href={`tel:${property?.support ?? "7575985757"}`}
                  className="bg-primarydark p-2 text-white text-[12px] md:text-[14px] rounded-sm font-montserrat font-medium"
                >
                  {`+91 ${property?.support ?? "7575985757"}`}
                </Link>
              </p>
            </div>

            <div ref={sectionRefs[1]}>
              <ProductAbout description={property?.description} />
            </div>
            {property?.rooms && property?.rooms.length > 0 && (
              <div ref={sectionRefs[2]}>
                <RoomlayoutSlider rooms={property?.rooms} />
              </div>
            )}
            <div ref={sectionRefs[3]}>
              <ProductAmenities
                amenities={property?.amenities ? property?.amenities : []}
              />
            </div>
            <div ref={sectionRefs[4]}>
              <Productmeals
                vegImage={property?.mealImage ? property?.mealImage : ""}
                noVegImage={
                  property?.nonVegMenuImage ? property?.nonVegMenuImage : ""
                }
                mealsArr={property?.meals ? property?.meals : []}
              />
              <Mobilemealscomponents
                mixMenuImage={property?.mixMenuImage || ""}
                vegImage={property?.mealImage ? property?.mealImage : ""}
                viewmore={property?.viewMore}
                // noVegImage={
                //   property?.nonVegMenuImage ? property?.nonVegMenuImage : ""
                // }
                mealsArr={property?.meals ? property?.meals : []}
              />
            </div>
            {property?.map && (
              <div ref={sectionRefs[5]}>
                <ProductLocation map={property?.map} />
              </div>
            )}
            {property?.todos && property?.todos.length > 0 && (
              <div ref={sectionRefs[6]}>
                <HotelToDo todos={property?.todos} />
              </div>
            )}
            <div ref={sectionRefs[7]}>
              <ProductReview propertyId={propertyId} />
            </div>

            {property?.propertyRules && property?.propertyRules.length > 0 && (
              <div ref={sectionRefs[8]}>
                <Hotelhomerole propertyRules={property?.propertyRules} />
              </div>
            )}

            {property?.faqs && property?.faqs?.length > 0 && (
              <div ref={sectionRefs[9]}>
                <div>
                  <PropertyFaq faqs={property?.faqs ? property?.faqs : []} />
                </div>
              </div>
            )}
            <EnquerySection propertyId={propertyId} />

            <SuggestHotel
              destinationId={
                property?.destination ? property?.destination?._id : ""
              }
              propertyId={property?._id ? property?._id : ""}
            />
          </div>

          <div className="!w-[40%] hidden lg:block pl-[10px]">
            <Enqueryform
              review={property?.maxStar ?? 0}
              propertyId={propertyId}
              price={property?.price ? property?.price : 0}
            />
          </div>
        </div>
      </div>

      {/* ---------------------------------------------- Amenities Modal------------------------------------------------- */}

      {togglemodal ? (
        <div
          className="fixed top-0 left-0 right-0 w-full h-full z-[99999] md:inset-0 max-h-full overflow-y-scroll"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="m-auto relative md:p-4 p-1 md:w-[85%] max-w-7xl max-h-[90vh] md:top-[4rem] top-[5rem] rounded-lg bg-white overflow-y-scroll  w-[95%] mx-auto hide-scrollbar">
            <div className="p-2 md:p-5">
              <div
                className="absolute top-5 md:top-8 right-7 md:right-10 "
                onClick={() => setTogglemodal(!togglemodal)}
              >
                <IoCloseCircle className="text-[22px] md:text-[1.7rem] cursor-pointer text-[#000]" />
              </div>
              <ul className="grid md:grid-cols-4 grid-cols-2 md:gap-[1.6rem] gap-[0.8rem] mb-8">
                {amenitiesArr.map((el: any, index: number) => (
                  <div key={index}>
                    <h4 className="block font-bold mb-3 md:mb-5 text-[14px] md:text-[1rem]">
                      {el?.length > 0 ? el?.[0]?.amenityCategoryName : ""}
                    </h4>
                    {el
                      .filter(
                        (elx: any, eindex: number, arr: any[]) =>
                          arr.findIndex(
                            (x) => x.amenityId === elx.amenityId
                          ) === eindex
                      )
                      .map((elx: any, eindex: number) => (
                        <li key={eindex} className="mb-3 md:mb-4">
                          <div className="flex gap-3 items-center">
                            <div className="border rounded-md md:p-1">
                              <div className="h-[1rem] w-[1rem] md:!h-[20px] md:!w-[20px] lg:!w-[25px] lg:!h-[25px] relative ">
                                <Image
                                  src={generateFilePath(elx.thumbnail)}
                                  alt={elx.name}
                                  fill
                                  className=" object-contain"
                                />
                              </div>
                            </div>

                            <p className="font-montserrat font-medium md:text-[14px] text-[12px]">
                              {elx.name}
                            </p>
                          </div>
                        </li>
                      ))}
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {/* --------------------------------------------- Amenities Modal ----------------------------------------------- */}

      {/*------------------------------------- checkout custome model-------------------------------- */}
      {tagglefilterbottm ? (
        <>
          <div className="bottomshow_filter">
            <div className="bottompaddingfilter py-7 px-3 mt-5">
              <Detailspageform
                setBooknow={setBooknow}
                propertyId={propertyId}
                price={property?.price ? property?.price : 0}
                setTagglefilterbottm={setTagglefilterbottm}
              />
            </div>
          </div>
        </>
      ) : (
        ""
      )}

      <div className="lg:hidden items-center flex justify-between fixed bottom-0 w-full z-10 p-3 bg-[#fff] font-montserrat font-medium text-[#000] border-t">
        <div className="w-[95%] md:w-[90%] items-center flex justify-between mx-auto">
          <div className="pl-1">
            <p className="font-montserrat md:text-[12px] text-[10px] text-[#787878]">
              Starts from
            </p>
            <p className="font-montserrat text-[16px] md:text-[20px] md:font-medium font-semibold">
              ₹{property?.price}{" "}
            </p>
            <p className="font-montserrat md:text-[12px] text-[10px] ">
              ({property?.guest} guest)
            </p>
            <p className="font-montserrat md:text-[12px] text-[10px] ">
              Exclusive of taxes
            </p>
          </div>
          <div className="">
            {booknow ? (
              <button
                onClick={() => setModalOpen(true)}
                className="bg-[#da6633] px-3 py-2 text-[#fff] rounded-sm md:text-[15px] text-[14px] font-medium"
              >
                Book Now{" "}
              </button>
            ) : (
              <button
                className="bg-[#da6633] px-3 py-2 rounded-sm md:text-[15px] text-[14px] font-medium text-[#fff]"
                onClick={() => setTagglefilterbottm(!tagglefilterbottm)}
              >
                Check Availability
              </button>
            )}
          </div>
        </div>
        {/* Check Availability */}
      </div>

      {/*------------------------------------ otp modal css ---------------------------------- */}
      {/*------------------------------------ otp modal css ---------------------------------- */}

      {/*
      <div className="">
        <Otpopenmodal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      </div> */}
    </Suspense>
  );
}
