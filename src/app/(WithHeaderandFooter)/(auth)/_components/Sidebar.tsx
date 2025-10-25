"use client";
import React, { useState } from "react";
import userimg from "@/assets/allimg/user-dummy.png";
import logoutsvg from "@/assets/allimg/mdi_logout.svg";

import Image from "next/image";
import { FaHeart, FaRegHeart, FaUser } from "react-icons/fa";
import {
  MdCall,
  MdOutlineHistory,
  MdOutlineLiveHelp,
  MdOutlineLogout,
} from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useProfile } from "@/services/users.service";
import { signOut } from "next-auth/react";
import { BiHistory } from "react-icons/bi";
import { LuHeart } from "react-icons/lu";

const Sidebar = ({ handelLink = null }: any) => {
  const pathname = usePathname();
  const { data: user } = useProfile();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const style =
    "flex gap-3 items-center px-4 py-3 font-montserrat font-medium text-navibule xl:text-[18px] lg:text-[16px] text-[15px] border-t border-[#dfdfdf]";

  const style1 = pathname.startsWith("/profile")
    ? "bg-navibule text-white"
    : "";

  const handelLogout = async () => {
    try {
      await signOut({
        callbackUrl: "/", // Redirect to home page after logout
        redirect: true,
      });
      setShowLogoutModal(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleModalClose = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      <div className="bg-[#fff] lg:shadow-md">
        <div className="lg:block hidden sidebarheader px-5 py-2 text-center">
          <div className="h-16 w-16 relative m-auto">
            <Image
              src={userimg}
              alt=""
              fill
              className="rounded-full object-cover"
            />
          </div>
          <h4 className="text-black font-montserrat font-semibold text-[18px]">
            {user?.fullName}
          </h4>
        </div>
        <ul>
          <li>
            {handelLink ? (
              <button
                onClick={() => handelLink("profile")}
                type="button"
                className={`${style} ${style1} w-full text-left`}
              >
                <FaUser /> Personal Info
              </button>
            ) : (
              <Link href={`/profile`} className={`${style} ${style1}`}>
                <FaUser /> Personal Info
              </Link>
            )}
          </li>
          <li>
            {handelLink ? (
              <button
                type="button"
                onClick={() => handelLink("/booking")}
                className={`${style} w-full text-left ${
                  pathname.startsWith("/booking")
                    ? "bg-navibule text-white"
                    : ""
                }`}
              >
                <BiHistory />
                My Booking
              </button>
            ) : (
              <Link
                href={`/booking`}
                className={`${style} ${
                  pathname.startsWith("/booking")
                    ? "bg-navibule text-white"
                    : ""
                }`}
              >
                <BiHistory /> My Booking
              </Link>
            )}
          </li>
          <li>
            {handelLink ? (
              <button
                type="button"
                onClick={() => handelLink("/wishlist")}
                className={`${style} w-full text-left ${
                  pathname.startsWith("/wishlist")
                    ? "bg-navibule text-white"
                    : ""
                }`}
              >
                <LuHeart />
                My Wishlist
              </button>
            ) : (
              <a
                href={`/wishlist`}
                className={`${style} ${
                  pathname.startsWith("/wishlist")
                    ? "bg-navibule text-white"
                    : ""
                }`}
              >
                <LuHeart />
                My Wishlist
              </a>
            )}
          </li>

          <li>
            {handelLink ? (
              <button
                type="button"
                onClick={() => handelLink("/ContactUs")}
                className={`${style} w-full text-left ${
                  pathname.startsWith("/ContactUs")
                    ? "bg-navibule text-white"
                    : ""
                }`}
              >
                <MdCall />
                Contact Us
              </button>
            ) : (
              <Link
                href={`/ContactUs`}
                target="_blank"
                className={`${style} ${
                  pathname.startsWith("/ContactUs")
                    ? "bg-navibule text-white"
                    : ""
                }`}
              >
                <MdCall /> Contact Us
              </Link>
            )}
          </li>

          <li className="border-b">
            <Link
              href="/ContactUs"
              target="_blank"
              className={`${style} ${
                pathname.startsWith("/ContactUs")
                  ? "bg-navibule text-white"
                  : ""
              }`}
            >
              <MdOutlineLiveHelp /> Help & support
            </Link>
          </li>

          <li className="md:block hidden">
            <button
              onClick={handleLogoutClick}
              type="button"
              className={`${style} border-b w-full text-left`}
            >
              <MdOutlineLogout /> Logout
            </button>
          </li>
          <li className="md:hidden border-b">
            <button
              type="button"
              onClick={handelLogout}
              className="flex gap-3 items-center px-4 py-3 font-montserrat font-medium text-navibule xl:text-[18px] lg:text-[16px] text-[15px] border-[#dfdfdf] w-full text-left"
            >
              <MdOutlineLogout /> Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed overflow-y-auto overflow-x-hidden top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
          <div className="relative p-4 w-full max-w-xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 p-8">
              <div className="m-auto text-center flex justify-center">
                <div className="w-20 h-20 relative">
                  <Image src={logoutsvg} alt="" fill />
                </div>
              </div>
              <div className="text-center">
                <p className="font-montserrat text-[1.5rem] my-3 font-semibold">
                  Are you sure you want to <br />
                  Logout ?
                </p>
              </div>
              <ul className="flex space-x-4 justify-center">
                <li>
                  <button
                    onClick={handleModalClose}
                    className="inline-block px-9 py-1 rounded-sm font-montserrat text-[1.3rem] bg-[#231f20] text-white"
                  >
                    No
                  </button>
                </li>
                <li>
                  <button
                    onClick={handelLogout}
                    className="inline-block px-9 py-1 rounded-sm font-montserrat text-[1.3rem] bg-[#ba1d1d] text-white"
                  >
                    Yes
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
