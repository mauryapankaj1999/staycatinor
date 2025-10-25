"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { LuPhoneCall } from "react-icons/lu";
import { MdOutlineLogin } from "react-icons/md";
import mainlogo from "@/assets/logo/headerlogo-black.png";

interface MobileMenuProps {
  toggle: boolean;
  setToggle: (toggle: boolean) => void;
}

export function MobileMenu({ toggle, setToggle }: MobileMenuProps) {
  const { data: session } = useSession();

  if (!toggle) {
    return null;
  }

  return (
    <div className="block lg:hidden" role="dialog" aria-modal="true">
      <div className="fixed inset-0 z-10 bg-black bg-opacity-50"></div>
      <div className="fixed inset-y-0 right-0 w-full max-w-sm overflow-y-auto bg-white p-5 z-[1000]">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            onClick={() => setToggle(!toggle)}
            className="w-[150px] h-[40px] md:w-[180px] md:h-[50px] relative"
          >
            <Image
              src={mainlogo}
              alt="mainlogo"
              fill
              className="object-contain"
            />
          </Link>
          <button
            type="button"
            className="rounded-md p-2 text-gray-700"
            onClick={() => setToggle(!toggle)}
          >
            <span className="sr-only">Close menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="mt-6 flow-root">
          <div className="divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              <Link
                onClick={() => setToggle(!toggle)}
                href="/property"
                className="block rounded-lg px-4 py-2 font-montserrat leading-6 text-gray-950 hover:bg-gray-50"
              >
                Properties
              </Link>
              <Link
                onClick={() => setToggle(!toggle)}
                href="/list-your-home"
                className="block rounded-lg px-4 py-2 font-montserrat leading-6 text-gray-950 hover:bg-gray-50"
              >
                List your Home
              </Link>
              <div className="py-2">
                <a
                  href="tel:7575985757"
                  className="text-[14px] font-normal leading-6 flex items-center font-montserrat gap-x-2 text-gray-950"
                >
                  <LuPhoneCall />
                  +91 7575985757
                </a>
              </div>
              <div className="mt-4 gap-y-2 flex flex-col">
                {session && session?.user ? (
                  <>
                    <Link
                      href="/profile"
                      onClick={() => setToggle(!toggle)}
                      className="w-max text-[13px] font-montserrat font-medium tracking-wider px-[15px] py-[8px] bg-primarydark text-white"
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="w-max text-[13px] font-montserrat font-medium tracking-wider px-[15px] py-[8px] bg-primarydark text-white"
                    >
                      Log Out
                    </button>
                  </>
                ) : (
                  <Link
                    href="/Login"
                    onClick={() => setToggle(!toggle)}
                    className="flex gap-2 items-center w-full text-[14px] rounded-md font-montserrat font-medium tracking-wider px-[15px] py-2 bg-[#da6633] text-white"
                  >
                    <MdOutlineLogin className="text-[1.4rem]" />
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
