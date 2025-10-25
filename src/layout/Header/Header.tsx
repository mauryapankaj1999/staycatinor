"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { LuMenu, LuPhoneCall } from "react-icons/lu";
import { FaUserAlt, FaRegUserCircle } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { toggleLoginPopup } from "@/store";
import mainlogo from "@/assets/logo/headerlogo-black.png";
import call_icon from "@/assets/allimg/call_icon.png";
import HeaderScaleForm from "@/components/HeaderScaleForm/HeaderScaleForm";
import { AuthPopup } from "@/components/Auth/AuthPopup";
import { MobileMenu } from "./MobileMenu";
import { useHeader } from "@/hooks/useHeader";

export default function Header() {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const {
    toggle,
    setToggle,
    isActive,
    setIsActive,
    locations,
    start,
    end,
    startMonth,
    endMonth,
    guest,
    toggleClass,
    pathname,
    headerRef,
  } = useHeader();

  return (
    <>
      <header
        ref={headerRef}
        className={`lg:py-4 pt-2 pb-3 md:pt-0 md:my-0 ${
          pathname === "/" ? "mainmenu shadow-menu" : "shadow-menu otherlink"
        }`}
      >
        <div className="px-4 md:px-[80px] md:max-w-[1762px] mx-auto">
          <nav
            className="mx-auto flex items-center justify-between"
            aria-label="Global"
          >
            <div className="flex items-center gap-4">
              <a
                href="/"
                className="h-[40px] w-[140px] md:h-[55px] md:w-[180px] lg:w-[200px] relative"
              >
                <Image
                  src={mainlogo}
                  alt="mainlogo"
                  fill
                  className="object-contain lg:block hidden"
                />

                <Image
                  src={"/logo/headerlogo-orange.png"}
                  alt="mainlogo"
                  fill
                  className="object-contain lg:hidden"
                />
              </a>
            </div>

            <div className="flex gap-3 items-center">
              <div className="lg:hidden">
                <a
                  href="tel:7575985757"
                  className="inline-flex items-center border-[#fff] border text-[13px] p-1 rounded-md text-[000] font-montserrat"
                >
                  <Image
                    src={call_icon}
                    alt="mainlogo"
                    className="object-contain lg:hidden w-[18px] h-[18px]"
                  />
                  &nbsp; Call us
                </a>
              </div>
              {pathname !== "/" && pathname !== "/Login" && (
                <div className="lg:hidden">
                  {session && session?.user ? (
                    <>
                      <Link
                        href="/profile"
                        className="w-[30px] h-[30px] text-[13px] bg-primarydark text-white inline-block rounded-full flex items-center justify-center"
                      >
                        <FaUserAlt />
                      </Link>
                    </>
                  ) : (
                    <Link href="/Login" className="">
                      <FaRegUserCircle className="text-[1.4rem]" />
                    </Link>
                  )}
                </div>
              )}

              {pathname === "/" ? (
                <>
                  <div
                    className="lg:hidden flex gap-2 items-center"
                    onClick={() => setToggle(!toggle)}
                  >
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-md text-gray-700"
                    >
                      <span className="sr-only">Open main menu</span>
                      <LuMenu
                        className={`text-[1.5rem] md:text-[2rem] text-[#000]`}
                      />
                    </button>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>

            {pathname === "/property" ? (
              <>
                <div
                  className="hidden xl:!w-max xl:!flex xl:!justify-center xl:!items-center xl:!mr-[5%] cursor-pointer"
                  onClick={() => {
                    toggleClass();
                  }}
                >
                  <div
                    className={` transition-all duration-300 ${
                      isActive ? "activeseracbarmine" : ""
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="rounded-full header_shadow_custome">
                        <ul className="flex lg:gap-2 py-3 px-3 items-center">
                          <li className="font-montserrat font-medium xl:text-[14px] border-r-[1px] border-[#202a37] px-3 ">
                            {locations?.name ?? "Location"}
                          </li>
                          <li className="font-montserrat font-medium xl:text-[14px] border-r-[1px] border-[#202a37] px-3">
                            {start &&
                            end &&
                            startMonth !== "Month" &&
                            endMonth !== "Month"
                              ? `${start} ${startMonth} - ${end} ${endMonth}`
                              : "Select Dates"}
                          </li>
                          <li className="font-montserrat font-medium xl:text-[14px] px-3 flex gap-3 items-center">
                            {guest > 0
                              ? `${guest} Guest${guest > 1 ? "s" : ""}`
                              : "Select Guest"}
                            <span className="w-[28px] h-[28px] rounded-full bg-[#da6633] inline-flex items-center justify-center">
                              {" "}
                              <FiSearch className="text-white" />
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}

            {/* Desktop Navigation */}
            <div className="hidden lg:flex flex-row justify-end items-center">
              <div
                className="flex gap-x-[18px] items-center"
                onClick={() => setToggle(!toggle)}
              >
                {!pathname.includes("/property") && (
                  <>
                    <Link
                      href="/property"
                      className={`text-[16px] font-montserrat font-medium leading-6 text-[#000] hover:text-[#000] ${
                        pathname === "/property"
                          ? "checkblack text-black"
                          : "text-gray-500"
                      }`}
                    >
                      Properties
                    </Link>
                    <Link
                      href="/list-your-home"
                      className={`text-[16px] font-montserrat font-medium leading-6 text-[#000] hover:text-[#000] ${
                        pathname === "/list-your-home"
                          ? "checkblack text-black"
                          : "text-gray-500"
                      }`}
                    >
                      List your Home
                    </Link>
                  </>
                )}

                {session && session?.user ? (
                  <>
                    <Link
                      href="/profile"
                      className="text-[15px] font-medium font-montserrat tracking-widest rounded-[120px] bg-primarydark text-white py-2 px-5"
                    >
                      My Profile
                    </Link>
                  </>
                ) : (
                  <button
                    className="px-4 text-[15px] py-1 rounded-full font-montserrat bg-[#da6633] text-white hover:bg-navibule"
                    onClick={() => dispatch(toggleLoginPopup())}
                  >
                    Login
                  </button>
                )}
                <div className="w-[1px] h-[40px] bg-primarydark gap-3"></div>
                <a
                  href="tel:7575985757"
                  className="text-[16px] font-montserrat leading-6 flex items-center gap-x-2 text-gray-950"
                >
                  <LuPhoneCall />
                  +91 7575-98-5757
                </a>
              </div>
            </div>
          </nav>
        </div>

        <MobileMenu toggle={toggle} setToggle={setToggle} />

        <HeaderScaleForm
          isActive={isActive}
          toggleClass={toggleClass}
          setIsActive={setIsActive}
        />
      </header>
      <div onClick={toggleClass}>
        <div
          className={` ${isActive ? "navbaroverlay" : "removenabaroverl"}`}
        ></div>
      </div>

      <AuthPopup />
    </>
  );
}