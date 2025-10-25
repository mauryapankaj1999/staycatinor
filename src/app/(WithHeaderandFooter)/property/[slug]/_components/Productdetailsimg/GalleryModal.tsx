"use client";

import React, { useEffect } from "react";
import { IoChevronBackOutline, IoCloseCircleSharp } from "react-icons/io5";
import Image from "next/image";
import { generateFilePath } from "@/services/url.service";
import Mobilesingleslider from "@/components/MobileComponents/Mobilesingleslider/Mobilesingleslider";

interface GalleryModalProps {
  setOpengalleryimg: (value: boolean) => void;
  opengalleryimg: boolean;
  galleryArr: { name: string; imageList: any[] }[];
  imagesArr: any[];
  setSingleimgopen: (value: boolean) => void;
  singleimgopen: boolean;
  activeItem: string;
  handleItemClick: (name: string) => void;
}

export default function GalleryModal({
  setOpengalleryimg,
  opengalleryimg,
  setSingleimgopen,
  singleimgopen,
  galleryArr,
  imagesArr,
  activeItem,
  handleItemClick,
}: GalleryModalProps) {
  // Disable background scroll when modal is open
  useEffect(() => {
    if (opengalleryimg) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup in case modal unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, [opengalleryimg]);

  // Helper to stop scroll bleed (optional, if needed)
  const onScrollCapture = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight;
    const offsetHeight = target.offsetHeight;

    if (
      (scrollTop === 0 &&
        e.nativeEvent instanceof WheelEvent &&
        e.nativeEvent.deltaY < 0) || // Scrolling up at top
      (scrollTop + offsetHeight >= scrollHeight &&
        e.nativeEvent instanceof WheelEvent &&
        e.nativeEvent.deltaY > 0) // Scrolling down at bottom
    ) {
      e.preventDefault();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[10000000000] bg-white flex flex-col"
      aria-modal="true"
      role="dialog"
    >
      <div className="w-full md:w-[90%] lg:w-[70%] md:mx-auto flex flex-col h-full">
        <div className="bg-white py-3 px-3 sticky top-0 z-[15] flex-shrink-0">
          <p
            className="flex items-center gap-2 font-montserrat font-medium cursor-pointer select-none"
            onClick={() => setOpengalleryimg(false)}
          >
            <IoChevronBackOutline /> &nbsp; Go Back
          </p>
        </div>

        {/* Scrollable container with controlled scroll */}
        <div
          className="p-3 overflow-y-auto flex-grow"
          style={{ maxHeight: "calc(100vh - 56px)" /* header height approx */ }}
          onWheelCapture={onScrollCapture}
        >
          <div>
            <ul className="flex gap-3 overflow-x-auto mb-3 pb-2">
              {galleryArr &&
                galleryArr.length > 0 &&
                galleryArr.map((el, index) => (
                  <li
                    key={index}
                    className={`whitespace-nowrap cursor-pointer border px-4 py-1 text-[0.9rem] font-montserrat rounded-[5px]  ${
                      activeItem === el.name ? "bg-[#da6633] text-white" : ""
                    }`}
                    onClick={() => handleItemClick(el.name)}
                  >
                    {el.name}
                  </li>
                ))}
            </ul>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">
            {imagesArr &&
              imagesArr.length > 0 &&
              imagesArr.map((item, index) => (
                <div className="col-span-1 px-2 " key={index}>
                  <div
                    className="w-full relative h-[540px] md:h-[320px] xl:h-[375px] 2xl:h-[470px] mb-2 custom_imageSlider cursor-pointer"
                    onClick={() => setSingleimgopen(true)}
                  >
                    <Image
                      src={generateFilePath(item)}
                      alt=""
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                </div>
              ))}
          </div>

          {singleimgopen && (
            <div className="fixed inset-0 z-[100000] bg-black flex flex-col">
              <div className="px-3 md:px-[3.75rem] py-5 text-end flex items-end justify-end flex-shrink-0">
                <IoCloseCircleSharp
                  className="text-[1.8rem] text-white cursor-pointer"
                  onClick={() => setSingleimgopen(false)}
                />
              </div>
              <div className="flex-grow overflow-auto">
                <Mobilesingleslider imagesArr={imagesArr} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
