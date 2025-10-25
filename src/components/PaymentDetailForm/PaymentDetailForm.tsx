import Link from "next/link";
import React from "react";
import { IoCloseOutline } from "react-icons/io5";

export default function PaymentDetailForm({ nextStep, onClose }: any) {
  return (
    <div className="bg-white p-5 h-[75vh] rounded-lg shadow-md w-full">
      <div className="flex justify-between items-center pb-3">
        <p className="font-montserrat font-semibold text-[1rem]">
          Verify your details
        </p>
        <button onClick={onClose}>
          <IoCloseOutline className="text-[2rem]" />
        </button>
      </div>
      <hr />
      <form action="">
        <div className="grid">
          <div className="col-span-1">
            <div className="mb-3">
              <label
                htmlFor=""
                className="font-montserrat font-medium text-navibule mb-5"
              >
                First Name
              </label>
              <input
                type="text"
                className="font-montserrat font-medium border-gray-300 rounded-lg focus:ring-0 focus:outline-none  w-full h-[45px] bg-[#f5f5f5]"
              />
            </div>
          </div>
          <div className="mb-3">
            <label
              htmlFor=""
              className="font-montserrat font-medium text-navibule mb-5"
            >
              Last Name
            </label>
            <input
              type="text"
              className="font-montserrat font-medium border-gray-300 rounded-lg focus:ring-0 focus:outline-none  w-full h-[45px] bg-[#f5f5f5]"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor=""
              className="font-montserrat font-medium text-navibule mb-5"
            >
              Mobile Number
            </label>
            <input
              type="number"
              className="font-montserrat font-medium border-gray-300 rounded-lg focus:ring-0 focus:outline-none  w-full h-[45px] bg-[#f5f5f5]"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor=""
              className="font-montserrat font-medium text-navibule mb-5"
            >
              Email Id
            </label>
            <input
              type="email"
              className="font-montserrat font-medium border-gray-300 rounded-lg focus:ring-0 focus:outline-none  w-full h-[45px] bg-[#f5f5f5]"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor=""
              className="font-montserrat font-medium text-navibule mb-5"
            >
              Massage{" "}
            </label>
            <textarea
              name=""
              id=""
              className="font-montserrat font-medium border-gray-300 rounded-lg focus:ring-0 focus:outline-none  w-full h-[45px] "
            ></textarea>
          </div>
        </div>
      </form>

      <Link
        href="/payment?propertyId=66daa528c215c63932640088&startDate=2024-09-07&endDate=2024-09-08&adult=1&child=0"
        className="bg-primarydark block my-3 w-full px-2 py-3 text-[0.9rem] text-[#fff] rounded-md text-center"
      >
        Request to book
      </Link>
    </div>
  );
}
