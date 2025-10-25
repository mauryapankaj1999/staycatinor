"use client";
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toastError, toastSuccess } from '@/utils/toast';
import { registerUser } from '@/services/users.service';
import { ROLES } from '@/common/contstant';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const phoneRegex = /^\(?[2-9]\d{2}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

export const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: '',
    phone: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showpassword, setShowpassword] = useState(false);
  const [confirmpass, setConfirmpass] = useState(false);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const router = useRouter();

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Please enter correct email";
    if (!form.password) newErrors.password = "Password is required";
    if (!form.confirm_password) newErrors.confirm_password = "Confirm Password is required";
    if (form.password && form.confirm_password && form.password !== form.confirm_password)
      newErrors.confirm_password = "Confirm password not matched";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!phoneRegex.test(form.phone)) newErrors.phone = "Please enter a valid 10 digit phone number";
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      let obj: any = { ...form, role: ROLES.USER };
      let { data: res } = await registerUser(obj);
      if (res.message) {
        toastSuccess("Register Sucessfully .We will Contact you soon ");
        setForm({ name: '', email: '', password: '', confirm_password: '', phone: '' });
      }
    } catch (error) {
      toastError(error);
    }
  };

  return (
    <form onSubmit={onSubmit} method="post">
      <div className="md:flex gap-3 flex-wrap justify-between">
        <div className="mb-3 md:w-[48%]">
          <input
            placeholder="Enter Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className=" font-montserrat font-medium border-gray-300 border px-2 rounded-lg focus:ring-0 focus:outline-none bg-white w-full h-12"
          />
          {errors.name && (
            <p className="text-red-400">{errors.name}</p>
          )}
        </div>
        <div className="mb-3 md:w-[48%]">
          <input
            type="text"
            placeholder="Mobile Number"
            name="phone"
            value={form.phone}
            onChange={(e) => {
              const onlyNums = e.target.value.replace(/\D/g, '').slice(0, 10);
              e.target.value = onlyNums;
              handleChange(e);
            }}
            maxLength={10}
            className=" font-montserrat font-medium border-gray-300 border px-2 rounded-lg focus:ring-0 focus:outline-none bg-white w-full h-12"
            required
          />
          {errors.phone && (
            <p className="text-red-400">{errors.phone}</p>
          )}
        </div>
        <div className="mb-3 md:w-[48%]">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className=" font-montserrat font-medium border-gray-300 border px-2 rounded-lg focus:ring-0 focus:outline-none bg-white w-full h-12"
            placeholder="Email Id"
            required
          />
          {errors.email && (
            <p className="text-red-400">{errors.email}</p>
          )}
        </div>
        <div className="mb-3 md:w-[48%] relative">
          <input
            type={confirmpass ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            className=" font-montserrat font-medium border-gray-300 border px-2 rounded-lg focus:ring-0 focus:outline-none bg-white w-full h-12"
            placeholder="Password"
            required
          />
          <p
            onClick={() => setConfirmpass(!confirmpass)}
            className="absolute top-4 right-3 cursor-pointer"
          >
            {confirmpass ? (
              <FaEye className="text-[0.9rem]" />
            ) : (
              <FaEyeSlash className="text-[0.9rem]" />
            )}
          </p>
          {errors.password && (
            <p className="text-red-400">{errors.password}</p>
          )}
        </div>
        <div className="mb-3 md:w-[48%] relative">
          <input
            type={showpassword ? "text" : "password"}
            name="confirm_password"
            value={form.confirm_password}
            onChange={handleChange}
            className=" font-montserrat font-medium border-gray-300 border px-2 rounded-lg focus:ring-0 focus:outline-none bg-white w-full h-12"
            placeholder="Confirm Password"
            required
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
          {errors.confirm_password && (
            <p className="text-red-400">{errors.confirm_password}</p>
          )}
        </div>
      </div>
      <button
        type="submit"
        style={{ background: "#cf3a22" }}
        className="bg-[#cf3a22] py-[15px] rounded-lg xl:py-[17px] px-[20px] font-montserrat font-semibold text-[1rem] text-[#fff] w-full 2xl:mt-4"
      >
        Register Now
      </button>
    </form>
  );
}
