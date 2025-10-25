"use client";
import Image, { StaticImageData } from "next/image";
import React, { useEffect, useState } from "react";
import { HiMiniPhoto } from "react-icons/hi2";
import { IoMdVideocam } from "react-icons/io";
import smallimg from "@/assets/mainbanner/slider2.png";
import {
  IoChevronBack,
  IoChevronBackOutline,
  IoCloseCircleSharp,
  IoCloseOutline,
  IoShareSocialSharp,
} from "react-icons/io5";
import { Navigation, Pagination } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import sliderimg from "@/assets/mainbanner/slider2.png";
import sliderimg1 from "@/assets/mainbanner/slider1.png";
import sliderimg2 from "@/assets/mainbanner/slider3.png";
import sliderimg3 from "@/assets/mainbanner/slider2.png";
import { generateFilePath } from "@/services/url.service";
import Mobilesingleslider from "@/components/MobileComponents/Mobilesingleslider/Mobilesingleslider";
import { FaHeart, FaRegHeart, FaRegImages, FaVideo } from "react-icons/fa";
import { useAddWishlist } from "@/services/wishlist.service";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { IProperty } from "@/services/property.service";
import { toastError, toastSuccess } from "@/utils/toast";
import GalleryModal from "./GalleryModal";

const Swiper = dynamic(() => import("swiper/react").then((mod) => mod.Swiper), {
  ssr: false,
});

type ImageSilde = {
  mainImage: string;
  propertyId: string;
  property: IProperty | undefined;
  galleryArr: {
    name: string;
    imageList: any[];
  }[];
  reels: any;
};

const Productdetailsimg = ({
  mainImage,
  galleryArr,
  propertyId: propertyIdpar,
  reels,
  property,
}: ImageSilde) => {
  const [modelhide, setModelhide] = useState(false);
  const [imagesArr, setImagesArr] = useState<any[]>(
    galleryArr ? galleryArr[0]?.imageList : []
  );
  const [activeItem, setActiveItem] = useState("All");
  const [singleimgopen, setSingleimgopen] = useState(false);
  const [opengalleryimg, setopengalleryimg] = useState(false);
  const [videotoggle, setVideotoggle] = useState(false);

  const [propertyId, setPropertyId] = useState<string>(propertyIdpar);
  const [propertyDetail, setpropertyDetail] = useState<IProperty>();

  const { mutateAsync: addWishlist } = useAddWishlist();

  const { data: session } = useSession();

  const userId = (session as any)?.token?.decoded_token.userId;

  const handleAddWishlist = async () => {
    try {
      if (!userId) {
        toastError("Please login to add to wishlist");
        return;
      }
      const res = await addWishlist({
        propertyId,
      });
      if (res?.data?.message) {
        toastSuccess(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {}, [userId && propertyDetail]);

  useEffect(() => {
    if (property && property) {
      setpropertyDetail(property);
      setPropertyId(property?._id);
    }
  }, [property]);

  const handleItemClick = (listname: any) => {
    setActiveItem(listname);
    let tempPropertyArr = [...galleryArr];

    let tempObj = tempPropertyArr.find((el) => el.name == listname);

    if (tempObj && tempObj?.name) {
      if (tempObj?.imageList) {
        setImagesArr(tempObj.imageList);
      }
    }
  };

  const categories = [
    { id: 1, name: "All" },
    { id: 2, name: "Washroom" },
    { id: 3, name: "Indoor" },
    { id: 4, name: "Outdoor" },
    { id: 5, name: "Common Area" },
  ];

  const [activeCategory, setActiveCategory] = useState(1); // Default active category ID

  const [mobileslider, setMobileslider] = useState([
    {
      sliderimg: sliderimg,
    },
    {
      sliderimg: sliderimg1,
    },
    {
      sliderimg: sliderimg2,
    },
    {
      sliderimg: sliderimg3,
    },
    {
      sliderimg: sliderimg2,
    },
    {
      sliderimg: sliderimg,
    },
    {
      sliderimg: sliderimg1,
    },
    {
      sliderimg: sliderimg2,
    },
    {
      sliderimg: sliderimg3,
    },
    {
      sliderimg: sliderimg2,
    },
  ]);

  // const [isWishlisted, setIsWishlisted] = useState(false);
  return (
    <>
      <div className="lg:block hidden">
        <div className="grid grid-cols-10 gap-1 ">
          <div className="col-span-2 ">
            <div className="flex flex-col gap-1">
              {galleryArr &&
                galleryArr?.length > 0 &&
                galleryArr[0].imageList?.length > 0 &&
                galleryArr[0].imageList[0] && (
                  <div className="w-full lg:h-[208px] xl:h-[280px] 2xl:h-[300px] relative">
                    <Image
                      src={generateFilePath(galleryArr[0].imageList[0])}
                      alt=""
                      fill
                      priority
                      className="object-cover rounded-tl-md"
                    />
                  </div>
                )}

              {galleryArr &&
                galleryArr?.length > 1 &&
                galleryArr[1].imageList?.length > 0 &&
                galleryArr[1].imageList[0] && (
                  <div className="w-full lg:h-[208px] xl:h-[280px] 2xl:h-[300px] relative">
                    <Image
                      src={generateFilePath(galleryArr[1].imageList[0])}
                      alt=""
                      fill
                      priority
                      className="object-cover rounded-bl-md"
                    />
                  </div>
                )}
            </div>
          </div>
          <div className="col-span-6">
            <div className="w-full lg:h-[420px] xl:h-[565px] 2xl:h-[37.9rem] relative">
              <Image
                src={mainImage ? generateFilePath(mainImage) : smallimg}
                alt=""
                fill
                priority
                className="object-cover"
              />
              <div className=" absolute bottom-3 right-3 z-10">
                <ul className="flex gap-4">
                  <li
                    className="flex gap-2 items-center cursor-pointer bg-navibule bg-opacity-50 border  border-[#ffffff80] text-white lg:py-2 2xl:p-2 rounded-md font-montserrat xl:text-[0.8rem] 2xl:text-[1rem] px-5 hover:bg-[#da6633] hover:border-[#da6633]"
                    onClick={() => setVideotoggle(!videotoggle)}
                  >
                    <IoMdVideocam className="" /> Play Video
                  </li>
                  <li
                    className="cursor-pointer flex gap-2 items-center bg-navibule bg-opacity-50 border border-[#ffffff80] text-white lg:py-2 2xl:p-2 rounded-md xl:text-[0.8rem] 2xl:text-[1rem] font-montserrat px-5 hover:bg-[#da6633] hover:border-[#da6633]"
                    onClick={() => {
                      setopengalleryimg(!opengalleryimg);
                      console.log(opengalleryimg, "open");
                      handleItemClick(galleryArr[0]?.name);
                    }}
                  >
                    <HiMiniPhoto /> View More
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-span-2">
            <div className="flex flex-col gap-1">
              {galleryArr &&
                galleryArr?.length > 2 &&
                galleryArr[2].imageList?.length > 0 &&
                galleryArr[2].imageList[0] && (
                  <div className="w-full lg:h-[208px] xl:h-[280px] 2xl:h-[300px] relative">
                    <Image
                      src={generateFilePath(galleryArr[2].imageList[0])}
                      alt=""
                      fill
                      priority
                      className="object-cover rounded-tr-md"
                    />
                  </div>
                )}

              {galleryArr &&
                galleryArr?.length > 3 &&
                galleryArr[3].imageList?.length > 0 &&
                galleryArr[3].imageList[0] && (
                  <div className="w-full lg:h-[208px] xl:h-[280px] 2xl:h-[300px] relative">
                    <Image
                      src={generateFilePath(galleryArr[3].imageList[0])}
                      alt=""
                      fill
                      priority
                      className="object-cover rounded-br-md"
                    />
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>

      {/*----------------------------------------------- mobile image top section  ---------------------------------*/}
      <div className="lg:hidden relative">
        <div className="w-full h-[250px] md:h-[300px] relative imgoverlay">
          <Image
            src={mainImage ? generateFilePath(mainImage) : smallimg}
            alt=""
            fill
            priority
            className="object-cover"
          />

          <div
            className="absolute cursor-pointer md:top-7 top-4 right-[1rem]"
            onClick={(e) => {
              e.preventDefault(); // Prevent the default anchor behavior
              // toggleWishlist();
              handleAddWishlist();
            }}
          >
            {userId && propertyDetail?.isWishlist ? (
              <div className="w-[30px] h-[30px] bg-red-500 rounded-full flex items-center justify-center">
                <FaHeart className="text-[#fff] text-[1.1rem]" />
              </div>
            ) : (
              <div className="w-[30px] h-[30px] bg-white rounded-full flex items-center justify-center">
                <FaRegHeart className="text-[#000] text-[1.1rem]" />
              </div>
            )}
          </div>

          <div className="overlayimggallery absolute bottom-4 right-4">
            {/* <Image src={smallimg1} alt='' className='w-[100px] h-[55px] ' /> */}
            <p
              className="font-montserrat font-bold text-center text-nowrap items-center px-2 py-[0.4rem] bg-[rgba(0,0,0,0.502)] rounded-sm border-[hsla(0,0%,100%,0.502)] absolute bottom-1 right-[8rem] text-[#fff] text-[0.7rem] flex gap-2"
              onClick={() => setVideotoggle(!videotoggle)}
            >
              <FaVideo className="text-[1.1rem]" />
            </p>
            <p
              className="font-montserrat font-bold text-center text-nowrap items-center px-3 py-2 bg-[rgba(0,0,0,0.502)] rounded-sm border-[hsla(0,0%,100%,0.502)] absolute bottom-1 right-1 text-[#fff] text-[0.7rem] flex gap-2"
              onClick={() => {
                setopengalleryimg(!opengalleryimg);
                handleItemClick(galleryArr[0]?.name);
              }}
            >
              {" "}
              <FaRegImages className="text-[1rem]" /> View Photo
            </p>
          </div>
        </div>
      </div>

      {opengalleryimg ? (
        <GalleryModal
          setSingleimgopen={setSingleimgopen}
          singleimgopen={singleimgopen}
          setOpengalleryimg={setopengalleryimg}
          opengalleryimg={opengalleryimg}
          galleryArr={galleryArr}
          imagesArr={imagesArr}
          activeItem={activeItem}
          handleItemClick={handleItemClick}
        />
      ) : (
        ""
      )}

      {/* ----------------------------------------- open gallery desktop modal --------------------------------- */}

      {/* {
        modelhide ? (
          <div className="lg:block hidden fixed h-screen w-screen bg-white inset-0  z-[10000]">
            <div className="flex items-center justify-between py-1  max-w-[1500px] mx-auto px-4 2xl:!px-0 mt-4">
              <div
                onClick={() => setModelhide(!modelhide)}
                className="cursor-pointer flex items-center gap-1 font-montserrat font-medium text-[1rem]"
              >
                <IoChevronBack className="text-[1.2rem]" /> Go Back
              </div>
              <div className="flex items-center gap-3 font-montserrat font-medium text-[1rem]">
                <IoShareSocialSharp className="text-[1.2rem]" />
                Share
              </div>
            </div>
            <div className="p-4">
              <div className="w-[1350px] m-auto mt-8">
                <ul className="flex items-center gap-7">
                  {galleryArr && galleryArr?.length > 0 && galleryArr?.map((el, index) => {
                    return (
                      <>
                        <li
                          key={index}
                          className={`py-3 px-6 rounded-full cursor-pointer font-montserrat font-semibold ${activeItem === el.name
                            ? "bg-[#da6633] text-white"
                            : "bg-[#dfdfdf] text-primarygray"
                            }`}
                          onClick={() => handleItemClick(el.name)}
                        >
                          {el.name}
                        </li>
                      </>
                    );
                  })}
                </ul>
              </div>

              <div className=" max-w-[1500px] m-auto mt-8">
                <div className="">
                  <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    modules={[Navigation]}
                    loop
                    speed={3000}
                    navigation={true}
                    className="propertyallimg"
                  >
                    {imagesArr && imagesArr?.length > 0 && imagesArr?.map((item, index) => {
                      return (
                        <>
                          <SwiperSlide key={index}>
                            <div className="w-full h-[75vh] relative">
                              <Image
                                src={generateFilePath(item)}
                                alt=""
                                fill
                                className="object-cover"
                              />
                            </div>
                          </SwiperSlide>
                        </>
                      );
                    })}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )
      } */}
      {/* ----------------------------------------- open gallery desktop modal end--------------------------------- */}

      {/* ----------------------------------------- video modal mobile and desktop--------------------------------- */}

      {videotoggle ? (
        <>
          <div
            className="fixed inset-0 w-full h-[100vh] opacity-95 bg-black bg-opacity-50 flex items-center justify-center z-[9999] animate-slide-in"
            onClick={() => setVideotoggle(!videotoggle)}
          ></div>
          <p
            className="fixed md:top-8 top-4 right-[2%] md:right-[7%] z-[99999] flex items-center justify-center cursor-pointer"
            onClick={() => setVideotoggle(!videotoggle)}
          >
            <IoCloseOutline className="text-[2.35rem] text-white" />
          </p>
          <div className="fixed md:w-[45%] w-[80%] m-auto inset-0 z-[9999999] flex items-center justify-center">
            <video controls autoPlay loop>
              <source
                src={reels.length ? generateFilePath(reels[0].video) : `/mainbanner/reel.mp4`}
                type="video/mp4"
                className="rounded-sm"
              />
            </video>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Productdetailsimg;
