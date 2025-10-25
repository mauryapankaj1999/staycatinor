"use client";
import { useProfile, useUpdateUser } from "@/services/users.service";
import React, { Suspense, useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { toastError, toastSuccess } from "@/utils/toast";
import moment from "moment";
import { useRouter } from "next/navigation";

const PersonalInformation = () => {
  const [formData, setFormData] = useState({
    // fullName: '',
    // lastName: '',
    phone: "",
    email: "",
    name: "",
    dob: "",
    gender: "",
    location: "",
  });
  const [errors, setErrors] = useState({
    // fullName: '',
    // lastName: '',
    phone: "",
    name: "",
    email: "",
    dob: "",
    gender: "",
    location: "",
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const { data: user } = useProfile();
  const { mutateAsync: updateUserById } = useUpdateUser();
  const phoneRegex = /^[6-9]{1}[0-9]{9}$/;
  const router = useRouter();
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      // fullName: '',
      // lastName: '',
      name: "",
      phone: "",
      email: "",
      dob: "",
      gender: "",
      location: "",
    };

    // if (!formData.fullName) {
    //   newErrors.fullName = 'First Name is required';
    //   isValid = false;
    // } else if (formData.fullName.length < 3) {
    //   newErrors.fullName = 'First Name must be at least 3 characters long';
    //   isValid = false;
    // }

    // if (!formData.lastName) {
    //   newErrors.lastName = 'Last Name is required';
    //   isValid = false;
    // } else if (formData.lastName.length < 3) {
    //   newErrors.lastName = 'Last Name must be at least 3 characters long';
    //   isValid = false;
    // }
    if (!formData.name) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.phone) {
      newErrors.phone = "Phone Number is required";
      isValid = false;
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Invalid Phone Number";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for the field being edited
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleEditClick = () => {
    if (!isDisabled) {
      // When saving, validate and submit
      if (validateForm()) {
        handleSubmit();
      } else {
        return;
      }
    }
    setIsDisabled(!isDisabled);
  };

  const handleUserById = async () => {
    try {
      if (user && user?._id) {
        setFormData({
          // fullName: user.fullName || '',
          // lastName: user.lastName || '',
          name: user.name || "",
          phone: user.phone || "",
          email: user.email || "",
          dob: user.dob ? moment(user.dob).format("YYYY-MM-DD") : "",
          gender: user.gender || "",
          location: user.location || "",
        });
      }
    } catch (error) {
      console.error("Error setting user data:", error);
      toastError("Failed to load user data");
    }
  };

  useEffect(() => {
    if (user) {
      handleUserById();
    }
  }, [user]);

  const handleSubmit = async () => {
    try {
      const submitData = {
        ...formData,
        userId: user?._id,
      };
      const { data: res } = await updateUserById(submitData);
      if (res && res.message) {
        toastSuccess(res.message);
        setIsDisabled(true); // Disable form after successful submission
        router.refresh();
      }
    } catch (error: any) {
      toastError(error?.response?.data?.message || "Update failed");
      // Do not update UI or disable form on error
    }
  };

  const inputStyle = `font-montserrat font-medium border-gray-300 rounded-lg focus:ring-0 focus:outline-none w-full h-12 ${
    isDisabled ? "!bg-[#f5f5f5]" : ""
  }`;

  return (
    <Suspense fallback="Loading ....">
      <div className="lg:pl-6 xl:pl-9">
        <div className="flex justify-between items-center">
          <h1 className="font-playfair text-navibule text-[18px] md:text-[22px] lg:text-[24px] xl:text-[28px] font-semibold">
            Personal Information
          </h1>
          <button
            onClick={handleEditClick}
            className="flex gap-2 items-center text-[#cf3a22] font-montserrat text-[16px] md:text-[18px] cursor-pointer"
          >
            {isDisabled ? (
              <>
                Edit <FaRegEdit />
              </>
            ) : null}
          </button>
        </div>
        <div className="mt-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!isDisabled) handleEditClick();
            }}
          >
            <div className="grid grid-cols-2 gap-1 md:gap-6">
              <div className="mb-2 md:mb-5 col-span-2 md:!col-span-1">
                <label className="font-montserrat font-medium text-navibule mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={isDisabled}
                  className={inputStyle}
                  placeholder="First Name"
                />
                {errors.name && <p className="text-red-400">{errors.name}</p>}
              </div>

              {/* <div className="mb-2 md:mb-5 col-span-2 md:!col-span-1">
                <label className="font-montserrat font-medium text-navibule mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  disabled={isDisabled}
                  className={inputStyle}
                  placeholder="First Name"
                />
                {errors.fullName && (
                  <p className="text-red-400">{errors.fullName}</p>
                )}
              </div>
              <div className="mb-2 md:mb-5 col-span-2 md:!col-span-1">
                <label className="font-montserrat font-medium text-navibule mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  disabled={isDisabled}
                  className={inputStyle}
                  placeholder="Last Name"
                />
                {errors.lastName && (
                  <p className="text-red-400">{errors.lastName}</p>
                )}
              </div> */}
              <div className="mb-2 md:mb-5 col-span-2 md:!col-span-1">
                <label className="font-montserrat font-medium text-navibule mb-2">
                  Mobile Number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => {
                    const onlyNums = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 10);
                    e.target.value = onlyNums;
                    handleInputChange(e);
                  }}
                  disabled={isDisabled}
                  className={inputStyle}
                  placeholder="Mobile Number"
                />
                {errors.phone && <p className="text-red-400">{errors.phone}</p>}
              </div>
              <div className="mb-2 md:mb-5 col-span-2 md:!col-span-1">
                <label className="font-montserrat font-medium text-navibule mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isDisabled}
                  // className="font-montserrat font-medium border-gray-300 rounded-lg focus:ring-0 focus:outline-none w-full h-12 !bg-[#f5f5f5]"
                  className={inputStyle}
                  placeholder="Enter User Email"
                />
              </div>
              <div className="mb-2 md:mb-5 col-span-2 md:!col-span-1">
                <label className="font-montserrat font-medium text-navibule mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  disabled={isDisabled}
                  max={moment().format("YYYY-MM-DD")}
                  className={inputStyle}
                  placeholder="Enter your DOB"
                />
              </div>
              <div className="mb-2 md:mb-5 col-span-2 md:!col-span-1">
                <label className="font-montserrat font-medium text-navibule mb-2">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  disabled={isDisabled}
                  className={`w-full rounded-lg border-[#d1d5db] font-montserrat h-12 ${
                    isDisabled ? "bg-[#f5f5f5]" : ""
                  }`}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && (
                  <p className="text-red-400">{errors.gender}</p>
                )}
              </div>
              <div className="mb-2 md:mb-5 col-span-2 md:!col-span-1">
                <label className="font-montserrat font-medium text-navibule mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  disabled={isDisabled}
                  className={inputStyle}
                  placeholder="Your Location"
                />
              </div>
            </div>
            {!isDisabled && (
              <div className="mb-2 md:mb-5">
                <button
                  type="submit"
                  style={{ background: "#cf3a22" }}
                  className="w-max bg-[#cf3a22] py-3 px-5 font-montserrat text-[1rem] text-[#fff] font-bold"
                >
                  Submit
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </Suspense>
  );
};

export default PersonalInformation;
