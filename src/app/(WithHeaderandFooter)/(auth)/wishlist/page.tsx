"use client";
import bookingimg from "@/assets/mainbanner/slider2.png";
import { useSearch } from "@/providers/context/RootContext";
import { IProperty } from "@/services/property.service";
import { generateFilePath } from "@/services/url.service";
import { useAddWishlist, useGetWishlist } from "@/services/wishlist.service";
import moment from "moment";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useState } from "react";
import toast from "react-hot-toast";
import { BiMaleFemale } from "react-icons/bi";
import { FaHeart, FaTimes } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import {
  MdFamilyRestroom,
  MdOutlineClose,
  MdOutlinePets,
} from "react-icons/md";
import Star from "../_components/Star/Star";
import dynamic from "next/dynamic";
const StarRatings = dynamic(() => import("react-star-ratings"), {
  ssr: false,
});
const page = () => {
  let [isOpenmodel, setIsOpenmodel] = useState(false);
  const [rating, setRating] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [propertyId, setPropertyId] = useState("");
  const [propertyDetail, setpropertyDetail] = useState<IProperty>();

  const [propertyName, setpropertyName] = useState("");

  const { mutateAsync: addWishlist } = useAddWishlist();

  const { data: session } = useSession();

  const userId = (session as any)?.token?.decoded_token.userId;

  //  const { data: property } = usePropertyBySlug( propertyName.trim()
  //                                                     .toLowerCase()
  //                                                     .replace(/-/g, '')
  //                                                     .replace(/\s+/g, '-')
  //                                                     .replace(/[^a-z0-9-]/g, ''), true);

  const handleAddWishlist = async (propertyId: string) => {
    try {
      const res = await addWishlist({
        propertyId,
      });
      if (res?.data?.message) {
        toast.success(res?.data?.message);
        setIsWishlisted(!isWishlisted);
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   useEffect(() => {
  //     if (property && property) {
  //       setpropertyDetail(property);
  //       setPropertyId(property?._id);
  //     }
  //   }, [property]);
  // useEffect(() => {
  //     setIsWishlisted(userId === (propertyDetail?.wishlistsObj?.userId))
  // }, [userId && propertyDetail])

  // Function to handle star click
  const handleStarClick = (value: any) => {
    setRating(value); // Set the clicked star as the rating
  };

  const { data: wishlist, refetch } = useGetWishlist({
    pageIndex: 0,
    pageSize: 1000,
    status: "ACTIVE",
  });

  const processedWishlist = wishlist?.data?.map((el: any) => {
    // console.log(el?.data[0].mainImage, 'el?.data[0].mainImage');
    return {
      wishlistimg: el?.data[0].mainImage,
      productId: el?.data[0]._id,
      productname: el?.data[0].name,
      location: el?.data[0].area,
      wishliststart: el?.review[0]?.star,
      wishlistprice: el?.data[0].price,
      review: el?.review.length,
      status: el?.data[0].status,
    };
  });


  let [locationSearch, setLocationSearch] = useSearch();

  //     const newFunction = () => {
  //         handleAddWishlist()}

  //     const handleCrossClick = async (el: any) => {
  // setpropertyName(el.productname)

  // if(propertyName){
  //     await newFunction()

  // }

  //     }

  return (
    <Suspense fallback="Loading ....">
      <h1 className="font-playfair text-[18px] md:text-[22px] lg:text-[24px] xl:text-[28px] font-semibold mb-5">
        Wishlist
      </h1>
      <div className="grid md:grid-cols-2 xl:!grid-cols-3 !gap-4 xl:!gap-2 2xl:!gap-4">
        {processedWishlist &&
          processedWishlist.length > 0 &&
          processedWishlist.map((el, index) => {
            return (
              <>
                <div className="relative border " key={index}>
                  <div className="absolute top-2 right-2 z-20">
                    <button
                      onClick={() => handleAddWishlist(el.productId)}
                      className="bg-white text-black rounded-full p-1 shadow hover:bg-red-500 hover:text-white transition duration-200"
                      title="Remove"
                    >
                      <FaTimes size={14} />
                    </button>
                  </div>
                  <Link
                    href={`property/${el.productname
                      .trim()
                      .toLowerCase()
                      .replace(/-/g, "")
                      .replace(/\s+/g, "-")
                      .replace(/[^a-z0-9-]/g, "")}?startDate=${
                      locationSearch?.startDate
                        ? moment(new Date(locationSearch.startDate)).format(
                            "YYYY-MM-DD"
                          )
                        : moment().format("YYYY-MM-DD")
                    }&endDate=${
                      locationSearch?.endDate
                        ? moment(new Date(locationSearch.endDate)).format(
                            "YYYY-MM-DD"
                          )
                        : moment().add(1, "days").format("YYYY-MM-DD")
                    }&adult=${locationSearch?.adult ?? 1}&child=${
                      locationSearch?.child ?? 0
                    }&room=${locationSearch?.room ?? 1}`}
                  >
                    <div className="w-full h-[180px] md:h-[210px] lg:h-[230px] xl:h-[280px]2xl:h-[245px] relative before-bg-image md:rounded-none rounded-lg">
                      <Image
                        src={generateFilePath(el?.wishlistimg)}
                        alt={el.wishlistimg}
                        fill
                        className="object-cover "
                      />
                      {/* <div className="absolute top-2 text-center right-3 w-9  z-10 font-montserrat text-[0.8rem] font-normal text-white">Upto 10% off</div> */}
                      {/* <div className="absolute bottom-3 left-3 bg-white rounded-full  py-[0.5rem] px-[0.5rem] md:px-[1rem] md:py-[0.5rem] z-10 font-montserrat text-[0.9rem] font-normal text-black flex items-center gap-2"> <FaHeart className='text-[red]' /> <span className='hidden md:block '> {el.status} </span></div> */}
                    </div>
                  </Link>
                  <div className="!p-2 2xl:!p-3 ">
                    <div className="flex justify-between gap-[5px]">
                      <div className="w-[70%]">
                        <Link
                          href={`property/${el.productname
                            .trim()
                            .toLowerCase()
                            .replace(/-/g, "")
                            .replace(/\s+/g, "-")
                            .replace(/[^a-z0-9-]/g, "")}?startDate=${
                            locationSearch?.startDate
                              ? moment(
                                  new Date(locationSearch.startDate)
                                ).format("YYYY-MM-DD")
                              : moment().format("YYYY-MM-DD")
                          }&endDate=${
                            locationSearch?.endDate
                              ? moment(new Date(locationSearch.endDate)).format(
                                  "YYYY-MM-DD"
                                )
                              : moment().add(1, "days").format("YYYY-MM-DD")
                          }&adult=${locationSearch?.adult ?? 1}&child=${
                            locationSearch?.child ?? 0
                          }&room=${locationSearch?.room ?? 1}`}
                        >
                          <h4 className="font-playfair font-medium md:text-[1.1rem] text-[16px] text-navibule">
                            {el.productname}
                          </h4>
                        </Link>
                        <p className="flex items-center font-medium text-[12px] md:text-[14px] gap-2  font-montserrat text-navibule mt-0 md:mt-3">
                          <IoLocationSharp /> {el.location}
                        </p>
                      </div>
                      <div className="w-[25%] text-end hidden md:block">
                        <StarRatings
                          rating={el.wishliststart}
                          starDimension="12px"
                          starSpacing=""
                          starRatedColor="#da6633"
                        />
                        <p className="flex items-center justify-end font-medium text-[0.9rem] gap-2  font-montserrat text-[#2f80ed]">
                          {el.review} reviews
                        </p>
                      </div>
                    </div>
                    <div className="my-3 md:my-5 border-b border-[#dfdfdf] pb-2 md:pb-5">
                      {/* <ul className='flex items-center gap-2 md:justify-between'>
                                                <li className='flex flex-row items-center gap-2 md:text-[14px] text-[12px] text-primarygray font-medium font-montserrat'>  <MdFamilyRestroom className='md:text-[1.2rem] text-[10px]' />   Family   <span className='w-[2px] h-[15px] block  bg-[#7676766b] mx-1'></span></li>

                                                <li className='flex flex-row items-center gap-2 md:text-[14px] text-[12px] text-primarygray font-medium font-montserrat'>  <MdOutlinePets className='md:text-[1.2rem] text-[10px]' />   Pet Friendly   <span className='w-[2px] h-[15px] block  bg-[#7676766b] mx-1'></span></li>
                                                <li className='flex flex-row items-center gap-2 md:text-[14px] text-[12px] text-primarygray font-medium font-montserrat'>  <BiMaleFemale className='md:text-[1.2rem] text-[10px]' />   Couple   </li>
                                            </ul> */}
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="">
                        <h6 className="font-montserrat text-[0.9rem] font-medium text-primarygray">
                          Starts from
                        </h6>
                        <p className="font-montserrat md:text-[1.2rem] text-[14px] font-medium text-navibule">
                          ₹{el.wishlistprice}/{" "}
                          <span className="text-[0.8rem]"> Night </span>
                        </p>
                      </div>
                      {/* <button onClick={() => setIsOpenmodel(!isOpenmodel)} className='font-montserrat  text-[0.8rem]  hover:bg-primarydark bg-primarydark text-[#fff] rounded-sm px-3 py-2 inline-block'>Add Review</button> */}
                    </div>
                  </div>
                </div>
              </>
            );
          })}
      </div>

      {isOpenmodel ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-slide-in">
          <div className="bg-white rounded-md mx-2 md:w-[500px] md:mx-auto">
            <div className="flex justify-between items-center py-4 px-3 border-b">
              <h3 className="md:text-[1.5rem] text-[18px] font-medium">
                Add Review
              </h3>
              <MdOutlineClose
                className="text-[1.35rem] md:text-[2rem] cursor-pointer"
                onClick={() => setIsOpenmodel(!isOpenmodel)}
              />
            </div>
            <div className="p-3">
              <div className="mb-3">
                <label
                  htmlFor=""
                  className="font-montserrat md:text-[1rem] text-[0.9rem] font-medium text-navibule"
                >
                  Name
                </label>
                <input
                  type="text"
                  className="pr-4 font-montserrat font-medium mt-1 border-gray-300 rounded-lg focus:ring-0 focus:outline-none  w-full h-12 bg-[#f5f5f5]"
                  placeholder="Enter Your Name"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor=""
                  className="font-montserrat md:text-[1rem] text-[0.9rem] font-medium text-navibule"
                >
                  Email Id
                </label>
                <input
                  type="text"
                  className="pr-4 font-montserrat font-medium mt-1 border-gray-300 rounded-lg focus:ring-0 focus:outline-none  w-full h-12 bg-[#f5f5f5]"
                  placeholder="Enter Your Email Id"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor=""
                  className="font-montserrat md:text-[1rem] text-[0.9rem] font-medium text-navibule"
                >
                  Message
                </label>
                <textarea
                  cols={4}
                  className="pr-4 font-montserrat font-medium mt-1 border-gray-300 rounded-lg focus:ring-0 focus:outline-none  w-full  bg-[#f5f5f5]"
                  placeholder="Your Message"
                />
              </div>
              <div className="my-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    filled={star <= rating}
                    onClick={() => handleStarClick(star)}
                  />
                ))}
              </div>
              <button
                onClick={() => setIsOpenmodel(!isOpenmodel)}
                className="inline-block bg-primarydark px-4 font-montserrat rounded-md py-2 text-[#fff] hover:bg-primarydark text-[15px]"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </Suspense>
  );
};

export default page;
