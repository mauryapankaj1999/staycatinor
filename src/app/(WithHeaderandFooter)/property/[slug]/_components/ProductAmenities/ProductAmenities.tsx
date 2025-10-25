"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import iocn1 from '@/assets/amenities/Wifi.svg'
import iocn2 from '@/assets/amenities/flat-screentv.svg'
import iocn3 from '@/assets/amenities/Cleaning.svg'
import iocn4 from '@/assets/amenities/Toaster.svg'
import iocn5 from '@/assets/amenities/Stovetop.svg'
import iocn6 from '@/assets/amenities/Pets.svg'
import iocn7 from '@/assets/amenities/Diningtable.svg'
import iocn8 from '@/assets/amenities/Dryer.svg'
import { IoCloseCircle } from 'react-icons/io5'
import { generateFilePath } from '@/services/url.service'
type ProductAmenitiesProps = {
  amenities: AmentiesProps[];
};


type AmentiesProps = {
  name: string;
  amenityCategoryName: string;
  amenityId: string;
  thumbnail: string;
};
const ProductAmenities = ({ amenities }: ProductAmenitiesProps) => {

  const [togglemodal, setTogglemodal] = useState(false);
  const [amenitiesArr, setAmenitiesArr] = useState<any>();

  useEffect(() => {

    let groupingViaCommonProperty = Object.values(
      amenities.reduce((acc: any, current) => {
        acc[`${current.amenityCategoryName}`] =
          acc[`${current.amenityCategoryName}`] ?? [];
        acc[`${current.amenityCategoryName}`].push(current);
        return acc;
      }, {})
    );

    console.log(groupingViaCommonProperty, "groupingViaCommonProperty");

    setAmenitiesArr(groupingViaCommonProperty);
  }, [amenities])


  return (
    <>

      <div className="property_detail_shadow md:rounded-md px-[0.5rem] py-[0.6rem] md:px-[1rem] md:py-[1rem] mt-6 md:mt-8">
        <h3 className="font-playfair md:text-[20px] xl:text-[20px] mb-2 text-[16px] md:font-normal lg:font-normal xl:font-normal 2xl:font-normal font-semibold">
          Amenities
        </h3>
        <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 grid-rows-1 gap-1 md:gap-6 lg:gap-6 my-4">
          {amenities.slice(0, 4).map(
            (el, index: number) => (
              // el.items.slice(0, 2).map((el, index: number) => (
              <li className="mb-2" key={el.amenityId}>
                <div className="flex gap-3 items-center">
                  <div className="2xl:h-7 2xl:w-7 xl:h-5 xl:w-5 w-5 h-5 rounded-md relative 2xl:border 2xl:p-3">
                    <Image
                      src={generateFilePath(el.thumbnail)}
                      alt={el.name}
                      fill
                      className="2xl:object-scale-down  xl:object-contain"
                    />
                  </div>
                  <p className="font-montserrat font-medium lg:text-[16px] md:text-[14px] text-[12px] text-primarygray ">
                    {el.name}
                  </p>
                </div>
              </li>
            )
            // ))
          )}
        </ul>
        {/* <p data-modal-target="default-modal" data-modal-toggle="default-modal" className='xl:py-2 xl:px-4 2xl:py-3 2xl:px-8 cursor-pointer border inline-block rounded-full  border-primarydark font-montserrat font-normal'>See All</p> */}
        {amenities.length > 0 ? <p
          onClick={() => setTogglemodal(!togglemodal)}
          className=" px-[1rem] py-[0.3rem] 2xl:px-[2rem] 2xl:py-[0.5rem] text-[0.8rem] md:text-[15px] cursor-pointer rounded-[4px] border inline-block md:rounded-[50px]  border-primarydark font-montserrat font-normal"
        >
          See All
        </p> : null}
      </div>

      {/* <div id="default-modal" tabIndex={-1} aria-hidden="true"
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative p-4 w-full max-w-7xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

            <div className="flex items-center justify-between p-2 px-4 md:p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-[1.8rem] font-medium text-navibule font-playfair">
                Amenities
              </h3>
              <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5 space-y-4">
              <ul className='grid grid-cols-4 grid-rows-2 gap-6 mb-8'>
                {
                  amenities.map((el: any, index: number) =>
                  (
                    <>
                      <h4>{el.name}</h4>
                      {
                        el.items.map((el: any, index: number) => (
                          <li key={index} className="mb-4">
                            <div className="flex gap-3 items-center">
                              <div className="h-10 w-10 rounded-md relative border p-4">
                                <Image src={el.amenitesimg} alt={el.name} fill className="object-scale-down" />
                              </div>
                              <p className="font-montserrat font-medium text-[1rem]">{el.amenitesname}</p>
                            </div>
                          </li>
                        ))

                      }

                    </>


                  ))
                }
              </ul>
            </div>
          </div>
        </div>
      </div> */}
      {togglemodal ? (
        <div
          className="fixed top-0 left-0 right-0 w-full h-full z-[99999] md:inset-0 max-h-full overflow-y-scroll"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >


          <div className="m-auto relative md:p-4 p-1 md:w-[85%] max-w-7xl max-h-[90vh] md:top-[4rem] top-[5rem] rounded-lg bg-white overflow-y-scroll  w-[95%] mx-auto hide-scrollbar">
            <div className="p-2 md:p-5 space-y-4">
              <div
                className="absolute top-5 md:top-8 right-7 md:right-10 "
                onClick={() => setTogglemodal(!togglemodal)}
              >
                <IoCloseCircle className="text-[22px] md:text-[1.7rem] cursor-pointer text-[#000]" />
              </div>
              <ul className="grid md:grid-cols-4 grid-cols-2 grid-rows-2 md:gap-[1.6rem] gap-[0.8rem] mb-8">
                {amenitiesArr &&
                  amenitiesArr.map((el: any, index: number) => {
                    // Use a Set to skip duplicate amenity names within each category
                    const seen = new Set();
                    const filteredAmenities = el.filter((item: any) => {
                      if (seen.has(item.name)) return false;
                      seen.add(item.name);
                      return true;
                    });
                    return (
                      <div key={index}>
                        <h4 className="block font-bold mb-3 md:mb-5 text-[14px] md:text-[1rem]">
                          {filteredAmenities.length > 0 ? filteredAmenities[0].amenityCategoryName : ""}
                        </h4>
                        {filteredAmenities.map((elx: any, eindex: number) => (
                          <li key={eindex} className="mb-3 md:mb-4">
                            <div className="flex gap-3 items-center">
                              <div className="h-[1rem] w-[1rem] md:!h-[20px] md:!w-[20px] sm:h-[2.5rm] sm:w-[2.5rem] lg:h-[2.5rm] lg:w-[2.5rem] xl:h-[2.5rm] xl:w-[2.5rem] rounded-md relative border md:p-4">
                                <Image
                                  src={generateFilePath(elx.thumbnail)}
                                  alt={elx.name}
                                  fill
                                  className=" object-contain fill"
                                />
                              </div>
                              <p className="font-montserrat font-medium lg:text-[15px] md:text-[14px] text-[12px]">
                                {elx.name}
                              </p>
                            </div>
                          </li>
                        ))}
                      </div>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>

      ) : (
        ""
      )}
    </>
  );
};

export default ProductAmenities
