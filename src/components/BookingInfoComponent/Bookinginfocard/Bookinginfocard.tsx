"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import bookingimg from "@/assets/mainbanner/slider2.png";
import { FaRegEdit } from "react-icons/fa";
import editicon from "@/assets/allimg/tabler_edit.svg";
import { IProperty } from "@/services/property.service";
import { generateFilePath } from "@/services/url.service";
import { useSearch } from "@/providers/context/RootContext";
import moment from "moment";
import { IoCloseOutline, IoLocationOutline } from "react-icons/io5";
import { RiCoupon4Line } from "react-icons/ri";
import { BsQuestionCircle } from "react-icons/bs";
import { useSearchParams } from "next/navigation";

const Bookinginfocard = ({ hotel }: { hotel: IProperty | null }) => {

  const searchParams = useSearchParams();
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const [couponcard, setCouponcard] = useState(false);
  let [locationSearch, setLocationSearch] = useSearch();
  const [tooltip, settooltip] = useState(false);
  // const hotelPrice = searchParams.get('totalPrice')
  if (!hotel || !hotel?._id) {
    return <p></p>;
  }

  const nights =
    startDate && endDate
      ? moment(endDate).diff(moment(startDate), "days")
      : 0;

  return (
    <div>
      <div className="border border-[#dfdfdf] rounded-xl p-3 shadow-sm md:shadow-none">
        <div className="grid grid-cols-2 gap-4">
          <div className="lg:col-span-1 xl:col-span-1 2xl:col-span-1 col-span-12">
            <div className="h-52 sm:h-52 md:h-80 lg:h-80 xl:h-80 2xl:h-80 w-full relative">
              <Image
                src={generateFilePath(hotel.mainImage)}
                alt=""
                fill
                className="object-cover rounded-xl"
              />
            </div>
          </div>
          <div className="lg:col-span-1 xl:col-span-1 2xl:col-span-1 col-span-12">
            <div className="md:my-3">
              <div className="flex justify-between items-center">
                <h2 className="font-playfair font-medium  text-[1.2rem] md:text-[1.6rem] text-navibule">
                  {hotel.name}{" "}
                </h2>
                {/* <h4><Link href="" className="flex gap-1 items-center font-montserrat font-medium text-[1.1rem] text-[#da6633]"><Image src={editicon} alt='' style={{width:'20px', height:'20px'}} /> Edit </Link></h4> */}
              </div>
              <p className="md:hidden flex gap-2 items-center my-1 font-montserrat text-[0.8rem] mt-2">
                <IoLocationOutline /> {hotel.area}
              </p>

              <p className="md:block hidden font-montserrat font-medium text-[0.8rem] md:text-[1rem] text-navibule mb-1 ">
                <span className="flex gap-1 items-center">
                  <IoLocationOutline /> {hotel.area}
                </span>
              </p>


              <div className="grid grid-cols-5 gap-3 mt-7 mb-6">
                <div className="col-span-2">

                  <p className="font-montserrat font-medium text-[1rem] md:text-[1rem] md:text-[#9598a0] text-primarydark">
                    Check - In
                  </p>

                  <p className="font-montserrat font-medium text-[0.7rem] md:text-[1rem] text-navibule mb-1">
                    {moment(startDate).format("DD-MM-YYYY")}
                  </p>
                  {/* <p className="font-montserrat font-medium text-[0.5rem] md:text-[1rem] text-navibule md:mt-0 mt-1">
                    (From 01 : 00 PM)
                  </p> */}
                </div>
                {/*
                  <div className="col-span-1 text-center flex justify-center hidden md:block">
                    <div className="h-full w-[1px] bg-[#767676] opacity-50"></div>
                  </div> */}

                <div className="col-span-1 flex flex-row items-center justify-center text-center">
                    <span className="bg-primarydark text-[0.7rem] px-2 py-1 rounded-sm text-[#fff] font-bold">
                      For {nights} Night
                    </span>
                </div>

                <div className="col-span-2 text-end">
                  <p className="font-montserrat font-medium text-[1rem] md:text-[1rem] md:text-[#9598a0] text-primarydark">
                    Check - Out
                  </p>

                  <div className="">
                    <p className="font-montserrat font-medium text-[0.7rem] md:text-[1rem] text-navibule mb-1">
                      {moment(endDate).format("DD-MM-YYYY")}
                    </p>
                    {/* <p className="font-montserrat font-medium text-[0.5rem] md:text-[1rem] text-navibule md:mt-0 mt-1">
                      (Until 11 : 00 AM)
                    </p> */}
                  </div>
                </div>

              </div>

              <div className="grid grid-cols-4 justify-between">
                <div className="col-span-2">
                  <p className="font-montserrat font-medium text-[1rem] md:text-[1rem] md:text-[#9598a0] text-primarydark">
                    Guest
                  </p>
                  <p className="font-montserrat font-medium text-[0.7rem] md:text-[1rem] text-navibule mb-1">
                    Adult {locationSearch?.adult} Children {locationSearch?.child}
                  </p>

                </div>

                <div className="col-span-2 flex flex-col items-end border-l border-gray-300">
                  <p className="font-montserrat font-medium text-[1rem] md:text-[1rem] md:text-[#9598a0] text-primarydark">
                    No. of Room
                  </p>
                  <ul className="flex items-center  md:gap-2 gap-4  bookinglist">
                    <li className="font-montserrat font-medium text-[0.7rem] md:text-[1rem] text-navibule mb-1">
                      {hotel.bedroom} Bedroom
                    </li>
                    {/* <li className="font-montserrat font-medium text-[0.7rem] md:text-[1rem] text-navibule mb-1">
                      {hotel.bathroom} Bathroom
                    </li> */}
                  </ul>
                </div>
              </div>




              {/* <h5 c`lassName="my-3 font-montserrat font-medium text-[1.6rem] text-navibule md:block hidden">
                ₹{hotelPrice}
              </h5>` */}
            </div>
          </div>
        </div>
      </div>

      {/* --------------------------------- extra price details summery -------------------------------- */}

      {couponcard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50 animate-slide-in">
          <div className="bg-white p-5 h-[55vh] rounded-lg shadow-md w-full">
            <div className="flex justify-between items-center pb-3">
              <p className="font-montserrat font-semibold text-[1rem]">
                Coupons and Offers
              </p>
              <button onClick={() => setCouponcard(!couponcard)}>
                <IoCloseOutline className="text-[2rem]" />
              </button>
            </div>
            <hr />
            <input
              type="text"
              placeholder="Enter Coupon Code"
              className="mt-2 p-2 h-[50px] border font-montserrat rounded-md w-full"
            />
            <button className="bg-primarydark text-[#fff] font-montserrat text-center px-2 py-3 font-medium rounded-md w-full my-5">
              APPLY
            </button>

            <div className="text-center font-montserrat text-[0.9rem]">
              By signing up, you afree to our{" "}
              <Link href="/TermsandCondition" className="text-blue-600">
                Terms & conditions
              </Link>{" "}
              and{" "}
              <Link href="/PrivacyPolicy" className="text-blue-600">
                Privacy policy
              </Link>{" "}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookinginfocard;

{
  /* <div className="border rounded-xl p-3 mt-2 lg:hidden">
        <p className="font-montserrat font-medium text-[1rem] mb-3">
          Price Details
        </p>
        <div className="flex justify-between mb-2 relative">
          <div className="font-montserrat text-[0.8rem] flex gap-2 items-center">
            Rental Charges{" "}
            <p onClick={() => settooltip(!tooltip)}>
              <BsQuestionCircle />
            </p>
            {tooltip ? (
              <div className="absolute w-2/3 top-5 bg-[#fff] p-2 border shadow-md rounded-md py-4">
                <div className="relative">
                  <p
                    className="absolute -top-2 right-1 "
                    onClick={() => settooltip(!tooltip)}
                  >
                    <IoCloseOutline className="text-[1.2rem]" />
                  </p>
                  <p className="text-[0.8rem] mb-2 font-medium">
                    Rental cost for 2 nights{" "}
                  </p>
                  <div className="flex justify-between">
                    <p className="text-[0.7rem]">1 Guests</p>
                    <p className="text-[0.7rem]">₹1,10,212</p>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <p className="font-montserrat text-[0.8rem]">₹40,625</p>
        </div>
        <div className="flex justify-between mb-2">
          <p className="font-montserrat text-[0.8rem]">GST</p>
          <p className="font-montserrat text-[0.8rem]">₹625</p>
        </div>

        <p
          className="my-5 text-center font-montserrat text-[0.8rem]  text-[#2f80ed] flex gap-2 items-center justify-center"
          onClick={() => setCouponcard(!couponcard)}
        >
          <RiCoupon4Line className="text-[1rem]" /> View More coupons/ Apply
          credit note
        </p>

        <hr />

        <div className="flex justify-between mt-3">
          <p className="font-montserrat text-[0.9rem] font-medium">
            Total Payable
          </p>
          <p className="font-montserrat text-[0.9rem] font-medium">
            {" "}
            ₹ {hotel.price}
          </p>
        </div>
      </div> */
}
