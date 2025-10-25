"use client";
import React, { useState } from "react";
import mealsimg from "@/assets/mobile_img/mealimg.png";
import Image from "next/image";
import { MdOutlineClose } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { BsFillTriangleFill } from "react-icons/bs";
import { generateFilePath } from "@/services/url.service";
import Link from "next/link";

type Productmeals = {
  vegImage: string;
  noVegImage?: string;
  viewmore?: string;
  mixMenuImage?: string;
  showImage?: boolean;
  showText?: boolean;
  className?: string;
  mealsArr: {
    name: string;
    priceArr: {
      name: string;
      price: number;
    }[];
  }[];
};
export default function Mobilemealscomponents({
  vegImage,
  mixMenuImage,
  viewmore,
  mealsArr,
  showImage = true,
  showText = false,
  className = "",
}: Productmeals) {
  const [activeItem, setActiveItem] = useState(""); // default active item

  const handleActive = (item: any) => {
    setActiveItem(item);
  };
  let [isOpenmodel, setIsOpenmodel] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // State to manage the visibility

  const toggleVisibility = () => {
    setIsOpenmodel(!isOpenmodel); // Toggle the visibility state
  };

  const liBtn =
    "2xl:text-[16px] xl:text-[14px] cursor-pointer md:text-[15px] text-[11px] border text-center text-[#000] bg-[#f8f8f8] font-montserrat font-medium rounded-full py-1 px-1 md:!px-4 md:!px-4 flex flex-row items-center";
  return (
    <>
      <div
        className={`property_detail_shadow md:rounded-md px-[0.5rem] py-[0.6rem] md:px-[1rem] md:py-[1rem] mt-6 md:mt-8 ${className}`}
      >
        <h3 className="font-playfair md:text-[20px] xl:text-[20px] mb-2 text-[16px] md:font-normal lg:font-normal xl:font-normal 2xl:font-normal font-semibold">
          Meals
        </h3>
        {showImage && (
          <div className="w-[100%] md:w-[100%] 2lx:w-[100%] xl:w-[100%] 2xl:h-[225px] md:h-[200px] h-[150px] relative">
            <Image
              src={mealsimg}
              alt=""
              fill
              className=" object-cover rounded-[5px]"
            />
          </div>
        )}
        {showText && (
          <p className="font-montserrat mb-0 text-primarygray md:text-[1rem] text-[0.8rem]">
            Indulge in an all-day meal package of freshly prepared North Indian
            vegetarian and non-vegetarian local specialities. The package
            comprises lunch (first meal after check-in), evening snacks, dinner,
            followed by breakfast (for the next day).
          </p>
        )}
        <ul className="flex gap-2 my-3 md:my-5 items-center">
          {vegImage && (
            <li
              onClick={() => handleActive("Veg menu")}
              className={`${liBtn} ${activeItem === "Veg menu" ? "bg-primarydark text-white" : ""
                }`}
            >
              <Link
                className="flex flex-row items-center gap-1"
                href={generateFilePath(vegImage)}
                target="_blank"
                download
              >
                <GoDotFill className="text-[#0ab739] text-[18px]" /> Veg Menu
              </Link>
            </li>
          )}
          {mixMenuImage && (
            <li
              onClick={() => handleActive("Mix menu")}
              className={`${liBtn} ${activeItem === "Mix menu" ? "bg-primarydark text-white" : ""
                } !pr-[0.45rem] `}
            >
              <Link
                className="flex flex-row items-center gap-1"
                href={generateFilePath(mixMenuImage)}
                target="_blank"
                download
              >
                <div className="flex flex-row items-center ">
                  <GoDotFill className="text-[#0ab739] text-[18px] " />
                  <BsFillTriangleFill
                    className="text-[#e10707] text-[10px]" />
                </div>
                Mix Menu
              </Link>
            </li>
          )}
          <li
            onClick={() => {
              toggleVisibility();
              handleActive("View more");
            }}
            className={`${liBtn} ${activeItem === "View more" ? "bg-primarydark text-white" : ""
              }`}
          >
            <a className="inline-flex gap-1 items-center px-2">View More</a>
          </li>
        </ul>

        <ul className="my-2 pl-4">
          {mealsArr &&
            mealsArr.map((meal, index) => (
              <li
                className="font-montserrat font-medium 2xl:text-[16px] xl:text-[12px]  md:text-[10px]  text-[11px] text-primarygray mb-2"
                key={index}
              >
                {/* {meal.name} */}
              </li>
            ))}
        </ul>
      </div>

      {/* {isVisible && (
       <>
       <div className="fixed inset-0 z-30 bg-black bg-opacity-50" onClick={toggleVisibility}></div>
       <div className="fixed inset-x-0 bottom-0 p-4 bg-white border-t-2 z-40 ">
         <p className="text-lg font-montserrat">Meals</p>
          <ul className='flex gap-2 my-4'>
            <li className='text-[14px] font-montserrat flex gap-1 items-center '><IoIosCheckmarkCircle className='text-[14px] text-[#000]' /> Breakfast</li>
            <li className='text-[14px] font-montserrat flex gap-1 items-center '><IoIosCheckmarkCircle className='text-[14px] text-[#000]' /> Lunch</li>
            <li className='text-[14px] font-montserrat flex gap-1 items-center '><IoIosCheckmarkCircle className='text-[14px] text-[#000]' /> High Tea</li>
            <li className='text-[14px] font-montserrat flex gap-1 items-center '><IoIosCheckmarkCircle className='text-[14px] text-[#000]' /> Dinner</li>
         </ul>
         <p className='text-[14px] font-montserrat font-extralight'>Note: Prepared with a local touch and freshly sourced ingredients, our home-style dining experience is highly recommended.</p>
         <button onClick={toggleVisibility} className="absolute top-0 right-0 p-2 text-lg text-[2rem]"><MdOutlineClose /></button>
       </div>
     </>
      )} */}

      {isOpenmodel ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[10000] animate-slide-in p-4">
          <div className="bg-white rounded-md w-full max-w-[560px] md:max-w-[700px] lg:max-w-[800px] xl:max-w-[900px] max-h-[90vh] overflow-y-auto relative mx-auto">
            <div className="md:p-5 p-3 pr-12 w-full max-w-full box-border">
              <MdOutlineClose
                className="text-[22px] md:text-[1.7rem] cursor-pointer absolute top-4 right-3 z-10 flex-shrink-0"
                onClick={() => setIsOpenmodel(!isOpenmodel)}
              />
              <p className="text-[22px] md:text-[1.5rem] mb-5 font-montserrat pr-8 max-w-full break-words">
                Meals
              </p>
              {/* <ul className="flex gap-2 my-4">
        {mealsArr &&
          mealsArr.map((meal, index) => (
            <li
              className="text-[14px] font-montserrat flex gap-1 items-center "
              key={index}
            >
              <IoIosCheckmarkCircle className="text-[19px] text-[#000]" />{" "}
              {meal.name}
            </li>
          ))}
      </ul> */}
              <div className="w-full max-w-full">
                <p className="text-[0.9rem] font-montserrat text-primarygray leading-relaxed break-words hyphens-auto whitespace-pre-wrap word-wrap-break overflow-wrap-anywhere max-w-full">
                  {viewmore ? viewmore : "No details available"}
                </p>
              </div>
              {/* <button onClick={toggleVisibility} className="absolute top-0 right-0 p-2 text-lg text-[2rem]"><MdOutlineClose /></button> */}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
