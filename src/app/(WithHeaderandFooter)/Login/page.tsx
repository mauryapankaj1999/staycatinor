import { Login } from "@/components/Auth/Login";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/assets/logo/headerlogo.png";
const page = () => {
  return (
    <>
      <div className="px-4 py-24">
        <div className="w-full mx-auto">
          <Image
            src={logo}
            alt=""
            height={60}
            width={200}
            className="mx-auto mb-8 object-contain"
          />
        </div>
        <div className="md:w-[75%] mx-auto">
          <Login />
          <div className="text-center font-montserrat text-sm text-primarygray mt-7">
            <p>
              By signing in or creating an account, you agree with <br /> our{" "}
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
      </div>
    </>
  );
};

export default page;
