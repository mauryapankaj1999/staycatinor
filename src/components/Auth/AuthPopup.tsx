"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoginPopup } from "@/store";
import logo from "@/assets/logo/headerlogo.png";
import { Login } from "./Login";
import { Register } from "./Register";

export function AuthPopup() {
  const isVisible = useSelector((state: any) => state.loginPopup.isVisible);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: any) => {
    setActiveTab(index);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]"
        onClick={() => dispatch(toggleLoginPopup())}
      ></div>
      <div className="fixed bg-white rounded-md lg:w-[30rem] xl:w-[32rem] 2xl:w-[29rem] right-5 mx-auto animate-slide-in p-5 z-[99999]">
        <div className="flex justify-end">
          <button
            onClick={() => dispatch(toggleLoginPopup())}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="">
          <div className="text-center 2xl:my-4 xl:my-2">
            <div className="lg:h-[42px] xl:h-[48px] w-[200px] relative font-bold">
              <Image
                src={logo}
                alt=""
                fill
                className="text-left object-contain"
              />
            </div>
          </div>
          <div className="tab-content">
            {activeTab === 0 && (
              <div className="">
                <p className="font-montserrat font-normal text-primarygray lg:text-[16px] 2xl:mb-5 sm:mb-4"></p>
                <Login setOpen={() => dispatch(toggleLoginPopup())} />
                <div className="text-center font-montserrat lg:text-[14px] xl:text-[15px] text-primarygray my-7">
                  <p>
                    By signing in or creating an account, you agree with <br />{" "}
                    our{" "}
                    <a href="/TermsandCondition" className="text-[#2f80ed]">
                      {" "}
                      Terms & conditions{" "}
                    </a>{" "}
                    and{" "}
                    <a href="/PrivacyPolicy" className="text-[#2f80ed]">
                      {" "}
                      Privacy statement{" "}
                    </a>
                  </p>
                </div>
              </div>
            )}
            {activeTab === 1 && (
              <div className="">
                <div className="">
                  <p className="font-playfair font-normal text-navibule lg:text-[18px] xl:text-[20px] mt-1 mb-2">
                    Register Here
                  </p>
                  <Register />
                  <div className="text-center font-montserrat lg:text-[16px] text-primarygray my-7">
                    <p>
                      By signing in or creating an account, you agree with{" "}
                      <br /> our{" "}
                      <Link
                        href="/TermsandCondition"
                        className="text-[#2f80ed]"
                      >
                        {" "}
                        Terms & conditions{" "}
                      </Link>{" "}
                      and{" "}
                      <Link href="/PrivacyPolicy" className="text-[#2f80ed]">
                        {" "}
                        Privacy statement{" "}
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
