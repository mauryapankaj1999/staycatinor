"use client";
import React, { Suspense, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { toastError, toastSuccess } from "@/utils/toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useResendOTP, useSendOTP } from "@/services/users.service";
import OTPInput from "react-otp-input";
import { useDispatch } from "react-redux";
import { hideLoginPopup } from "@/store";

export const Login = ({
  setOpen = () => {},
}: {
  setOpen?: (open: boolean) => void;
}) => {
  const [isPhoneLogin, setIsPhoneLogin] = useState(true);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [phone, setPhone] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [showpassword, setShowpassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "demo@gmail.com",
    password: "",
    phone: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    phone: "",
  });

  const router = useRouter();
  const { mutateAsync: sendOTP } = useSendOTP();
  const { mutateAsync: resendOTP } = useResendOTP();
  const dispatch = useDispatch();

  // Email validation function
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Enter a valid email address";
    return "";
  };

  // Password validation function
  const validatePassword = (password: string) => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  // Phone validation function
  const validatePhone = (phone: string) => {
    const phoneRegex = /^\d{10}$/;
    if (!phone) return "Phone number is required";
    if (!phoneRegex.test(phone)) return "Enter a valid 10-digit phone number";
    return "";
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Validate form based on login method
  const validateForm = () => {
    if (isPhoneLogin) {
      const phoneError = validatePhone(formData.phone);
      setErrors({ ...errors, phone: phoneError });
      return !phoneError;
    } else {
      const emailError = validateEmail(formData.email);
      const passwordError = validatePassword(formData.password);
      setErrors({ ...errors, email: emailError, password: passwordError });
      return !emailError && !passwordError;
    }
  };

  const startResendTimer = () => {
    setIsResendDisabled(true);
    setResendTimer(30);
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          setIsResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResendOtp = async () => {
    try {
      const res = await resendOTP({ phone });
      if (res.data?.message) {
        toastSuccess(res.data.message);
        startResendTimer();
      }
    } catch (error) {
      toastError(error);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) return;

    try {
      let res;
      if (isPhoneLogin) {
        if (otpSent) {
          if (otp.length !== 6) {
            toastError("Please enter a 6-digit OTP.");
            return;
          }
          const result = await signIn("credentials", {
            phone,
            otp,
            redirect: false,
          });

          if (result?.error) {
            toastError("invalid OTP");
            return;
          }
          dispatch(hideLoginPopup());
          toastSuccess("Logged in successfully");
          if (window.location.pathname === "/Login") {
            router.back();
          } else {
            router.refresh();
          }
        } else {
          res = await sendOTP({ phone: formData.phone });
          if (res.data?.message) {
            toastSuccess(res.data.message);
            setOtpSent(true);
            setPhone(formData.phone);
            startResendTimer();
          }
        }
      } else {
        const result = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });
        if (result?.error) {
          toastError(result?.error);
          return;
        }
        if (result?.url) {
          dispatch(hideLoginPopup());
          if (window.location.pathname === "/login") {
            router.back();
          } else {
            router.refresh();
          }
        }
      }
    } catch (error) {
      toastError(error);
    }
  };

  const handleOtpChange = (value: any) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    setOtp(numericValue);
  };

  return (
    <Suspense fallback="Loading ....">
      <div className="mt-5">
        <div className="flex font-bold justify-start ">
          <h1 className="font-playfair  text-navibule text-[18px] xl:text-[20px] mt-1 mb-1">
            Welcome to StayCationer{" "}
          </h1>
        </div>
      </div>

      {!otpSent && (
        <h4 className="text-left text-md  md:text-lg mb-3">Login/Signup</h4>
      )}
      <form onSubmit={onSubmit} method="post">
        {isPhoneLogin ? (
          otpSent ? (
            <div className="mb-3">
              <label className="block mb-2 font-medium text-gray-700">
                Enter OTP
              </label>
              <OTPInput
                value={otp}
                onChange={handleOtpChange}
                numInputs={6}
                renderInput={(props) => (
                  <input
                    {...props}
                    style={{ width: "3rem", height: "3rem" }}
                    className="border border-gray-300 font-sans rounded-md text-center text-lg"
                    type="tel"
                    autoComplete="one-time-code"
                    inputMode="numeric"
                  />
                )}
                containerStyle="flex justify-between gap-2"
                shouldAutoFocus={true}
                inputStyle={{
                  fontSize: "1.2rem",
                }}
              />
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={isResendDisabled}
                  className="text-[#d03c2b] disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                  {isResendDisabled
                    ? `Resend OTP in ${resendTimer}s`
                    : "Resend OTP"}
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-3 border">
                <div className="flex items-center border-gray-300 rounded-lg">
                  <span className="px-3 font-montserrat font-medium text-gray-500">
                    +91
                  </span>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    type="text"
                    pattern="\d{10}"
                    className="font-montserrat font-medium px-2 border-none rounded-r-lg focus:bg-transparent focus:ring-0 focus:outline-none outline-none bg-white w-full h-12"
                    placeholder="Enter Your Phone Number"
                    maxLength={10}
                    required
                  />
                </div>
              </div>
              {errors.phone && <p className="text-red-400">{errors.phone}</p>}
            </>
          )
        ) : (
          <>
            <div className="mb-3">
              <input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className=" font-montserrat font-medium border-gray-300 border px-2 rounded-lg focus:ring-0 focus:outline-none bg-white w-full h-12"
                placeholder="Enter Your Email"
                required
              />
              {errors.email && <p className="text-red-400  ">{errors.email}</p>}
            </div>
            <div className="mb-3 relative">
              <input
                type={showpassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className=" font-montserrat font-medium border-gray-300 rounded-lg focus:ring-0 focus:outline-none bg-white w-full h-12"
                placeholder="Enter Your Password"
              />
              <p
                onClick={() => setShowpassword(!showpassword)}
                className="absolute top-4 right-3 cursor-pointer"
              >
                {showpassword ? (
                  <FaEye className="text-[0.9rem]" />
                ) : (
                  <FaEyeSlash className="text-[0.9rem]" />
                )}
              </p>
              {errors.password && (
                <p className="text-red-400  ">{errors.password}</p>
              )}
            </div>
          </>
        )}

        <button
          type="submit"
          style={{ background: "#cf3a22" }}
          className="bg-[#cf3a22] py-[15px] rounded-lg xl:py-[17px] px-[20px] font-montserrat font-semibold text-[1rem] text-[#fff] w-full 2xl:mt-4"
        >
          {isPhoneLogin ? (otpSent ? "Verify OTP" : "Send OTP") : "Log in"}
        </button>
      </form>
    </Suspense>
  );
};
