"use client";
import React from "react";
import Link from "next/link";
import { generateFilePath } from "@/services/url.service";

type Productmeals = {
  vegImage: string;
  noVegImage: string;
  mealsArr: {
    name: string;
    priceArr: {
      name: string;
      price: number;
    }[];
  }[];
};

const Productmeals = ({ vegImage, noVegImage, mealsArr }: Productmeals) => {
  console.log(vegImage, noVegImage, mealsArr)
  return (
    <>
      <div className="property_detail_shadow md:rounded-md px-[0.5rem] py-[0.6rem] md:px-[1rem] md:py-[1rem] mt-6 md:mt-8 hidden">
        <h3 className="font-playfair md:text-[20px] xl:text-[20px] mb-5 text-[16px] md:font-normal lg:font-normal xl:font-normal 2xl:font-normal font-semibold">
          Meals
        </h3>
        {/* <ul className="flex flex-col md:flex-row items-start md:items-center gap-5"> */}
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 md:w-[60%]">
          {vegImage && (
            <li>
              <div className="bg-[#e0f2e8]  px-4 py-4 rounded-full flex items-center  gap-3">
                <div className="h-5 w-5 border bg-white border-[#0f923f]  flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-[#0f923f]"></div>
                </div>

                <h4 className="text-[0.7rem] 2xl:text-[0.9rem] xl:text-[0.9rem] font-montserrat font-semibold text-navibule">
                  <Link href={generateFilePath(vegImage)} target="_blank">
                    {" "}
                    Veg Menu
                  </Link>{" "}
                </h4>
              </div>
            </li>
          )}


          {noVegImage && (
            <li>
              <div className="bg-[#fbe5e4] px-4 py-4 rounded-full flex items-center gap-3">
                <div className="h-5 w-5 border bg-white border-[#da251e]  flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-[#da251e]"></div>
                </div>

                <h4 className="  text-[0.7rem] 2xl:text-[0.9rem] xl:text-[0.9rem] font-montserrat font-semibold text-navibule">
                  <Link href={generateFilePath(noVegImage)} target="_blank">
                    {" "}
                    Non Veg Menu
                  </Link>{" "}
                </h4>
              </div>
            </li>
          )}

          <li
            data-modal-target="bottom-left-modal"
            data-modal-toggle="bottom-left-modal"
            className="cursor-pointer"
          >
            <div className="bg-[#da6633] px-4 py-4 rounded-full flex items-center gap-3 ">
              <h4 className="text-[0.7rem] 2xl:text-[0.9rem] xl:text-[0.9rem] font-montserrat font-semibold text-white">
                View Meals Pricing  
              </h4>
            </div>
          </li>
        </ul>
      </div>

      <div
        id="bottom-left-modal"
        data-modal-placement="bottom-left"
        tabIndex={-1}
        className="fixed top-0  2x;:xl:md:left-[9rem] lg:left-[9rem] xl:left-[9rem] right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto  h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative w-full md:max-w-[72] max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold font-montserrat text-navibule">
                Meals Preferences
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="bottom-left-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5 space-y-4">
              <div className="flex gap-8 justify-between">
                {mealsArr &&
                  mealsArr.map((meal, index) => (
                    <>
                      <div className="basis-[90%]">
                        <h5 className="font-montserrat font-semibold text-[1.1rem] my-4">
                          {meal.name}
                        </h5>
                        {meal.priceArr.map((price, index) => {
                          return (
                            <>
                              <div className="flex justify-between items-center mb-4">
                                <div className="flex gap-5 items-center">
                                  <h3 className="font-montserrat text-primarygray font-semibold text-[0.9rem]">
                                    {price.name}
                                  </h3>
                                  <div className="bg-[#f5f5f5] rounded-full px-6 py-2 text-navibule font-semibold font-montserrat text-[0.8rem]">
                                    {" "}
                                    ₹ {price.price} +GST (per guest/day)
                                  </div>
                                </div>
                                <div className="font-montserrat text-primarygray font-semibold text-[0.9rem]">
                                  <h4 className=" 2xl:text-[0.9rem] xl:text-[0.9rem] font-montserrat font-semibold text-white">
                                    Select
                                  </h4>
                                </div>
                              </div>
                            </>
                          );
                        })}
                      </div>
                      <div className="basis-[1%] flex items-center justify-center">
                        <div className="h-full w-[1px] bg-[#dfdfdf]"></div>
                      </div>
                    </>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Productmeals;
