"use client";

import React, { Suspense, useState } from "react";
import Image from "next/image";
import login from "@/assets/logo/headerlogo.png";
import logo from "@/assets/logo/headerlogo.png";
import OTPInput from "react-otp-input";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { toastError } from "@/utils/toast";
import { signIn } from "next-auth/react";

function Otp() {
  const param = useSearchParams();
  const phone = param.get("phone");
  const router = useRouter();
  const [otp, setOtp] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const result = await signIn("credentials", {
        phone,
        otp,
        callbackUrl: window.location.origin,
        redirect: false,
      });

      if (result?.error) {
        toastError(result.error);
        return;
      }

      if (result?.url) {
        router.push(result.url);
      }
    } catch (error) {
      toastError(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side Image */}
      <div className="hidden lg:block w-1/2 relative">
        <Image src={login} alt="login" fill className="object-cover" />
      </div>

      {/* OTP Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-6 md:px-16 xl:px-24">
        {/* Logo */}
        <Link
          href="/"
          className="relative w-[200px] h-[75px] md:w-[250px] md:h-[90px] 2xl:w-[300px] 2xl:h-[110px] mb-6"
        >
          <Image src={logo} alt="logo" fill className="object-contain" />
        </Link>

        {/* Heading */}
        <h2 className="text-lg md:text-xl lg:text-[28px] font-medium text-[#1e293b] mb-4">
          Enter the 6-digit code we sent to your phone number to verify your
          account
        </h2>
        <p className="text-sm text-gray-500 mb-6">Phone: {phone}</p>

        {/* OTP Input */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-3">
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props: any) => (
                <input
                  {...props}
                  className="border border-gray-300 rounded-lg w-12 h-12 text-center text-xl font-semibold mx-1 focus:outline-none focus:ring-2 focus:ring-[#cf3a22]"
                />
              )}
              containerStyle="flex justify-center"
            />
          </div>

          {/* Action Links */}
          <div className="flex justify-between text-sm">
            <Link
              href="/register/_component/Register"
              className="text-[#1e293b] underline"
            >
              Change Phone Number
            </Link>
            <Link href="#" className="text-[#cf3a22] underline">
              Resend OTP
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-[#cf3a22] text-white w-full py-3 rounded-lg font-semibold text-lg"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}

export default function OTPPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Otp />
    </Suspense>
  );
}
