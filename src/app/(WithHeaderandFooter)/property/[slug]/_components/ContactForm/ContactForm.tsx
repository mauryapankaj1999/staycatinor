"use client"
import { useAddPropertyEnuiry } from '@/services/PropertyEnuiry.service';
import { toastError, toastSuccess } from '@/utils/toast';
import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io';
import { string } from 'zod';

const ContactForm = ({ setModaltoggle, modaltoggle, propertyId }: any) => {
  const [number, setNumber] = useState("");
  const [emailid, setEmailid] = useState("");
  const [message, setmessage] = useState("");
  const [fname, setFname] = useState("");
  const { mutateAsync: addEnquiry } = useAddPropertyEnuiry()

  const validate = () => {
    if (fname === "") {
      toastError("Please enter your full name");
      return false;
    }
    if (number === "") {
      toastError("Please enter your mobile number");
      return false;
    }
    if (number.length < 10) {
      toastError("Mobile number must be 10 digits");
      return false;
    }
    if (emailid === "") {
      toastError("Please enter your email id");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailid)) {
      toastError("Please enter a valid email id");
      return false;
    }
    if (message === "") {
      toastError("Please enter your message");
      return false;
    }
    return true;
  }

  const handelsubmit = async (e: any) => {
    e.preventDefault();

    try {
      const isValid = validate();
      if (!isValid) {
        return;
      }
      let obj = {
        propertyId: propertyId,
        name: fname,
        mobile: number,
        email: emailid,
        message: message
      }

      const { data } = await addEnquiry(obj);
      if (data) {
        toastSuccess("Enquiry submitted successfully");
        setModaltoggle(!modaltoggle);
        setFname("");
        setNumber("");
        setEmailid("");
        setmessage("");
      }
      console.log(obj, 'check obj --------------------------------')
    }
    catch (error: any) {
      toastError(error?.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <>
      <div className="">
        <div className="flex justify-between items-center mb-4">
          <p className='text-[22px] md:text-[1.5rem] font-montserrat font-medium'>Contact Us</p>

          <p className='cursor-pointer' onClick={() => setModaltoggle(!modaltoggle)}><IoMdClose className='text-[22px] md:text-[1.7rem]' /></p>
        </div>

        <form action="">
          <div className="mb-2">
            <label htmlFor="" className='font-montserrat mb-2 inline-block text-[0.9rem]'>Full Name</label>
            <input type="text" className='!text-[14px] font-montserrat right-0 focus:0 font-normal border-[#d1d5db] rounded-lg focus:ring-0 focus:outline-none  w-full h-12 bg-[#f5f5f5]' placeholder='Enter First Name' value={fname} onChange={(e) => setFname(e.target.value)} />
          </div>
          <div className="mb-2">
            <label htmlFor="" className='font-montserrat mb-2 inline-block text-[0.9rem]'>Mobile Number</label>
            <input type="text" maxLength={10} className='!text-[14px] font-montserrat right-0 focus:0 font-normal border-[#d1d5db] rounded-lg focus:ring-0 focus:outline-none  w-full h-12 bg-[#f5f5f5]' placeholder='Enter Mobile number' value={number}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, ''); // Removes any non-numeric characters
                if (value.length <= 10) {
                  setNumber(value); // Only sets the value if it's less than or equal to 10 digits
                }
              }}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="" className='font-montserrat mb-2 inline-block text-[0.9rem]'>Email</label>
            <input type="email" className='!text-[14px] font-montserrat right-0 focus:0 font-normal border-[#d1d5db] rounded-lg focus:ring-0 focus:outline-none  w-full h-12 bg-[#f5f5f5]' placeholder='Enter Email' value={emailid} onChange={(e) => setEmailid(e.target.value)} />
          </div>
          <div className="mb-2">
            <label htmlFor="" className='font-montserrat mb-2 inline-block text-[0.9rem]'>Message*</label>
            <textarea name="" id="" cols={3} rows={3} placeholder='Enter Your message' className='text-[14px] w-full rounded-lg font-montserrat' value={message} onChange={(e) => setmessage(e.target.value)} ></textarea>
          </div>
          <div className="flex justify-evenly gap-4">
            <button className='flex-1 bg-[#dfdfdf] font-montserrat py-3 font-normal px-4 rounded-md text-[14px] md:text-[1rem]' onClick={() => setModaltoggle(!modaltoggle)}>Close</button>
            <button className='flex-1 bg-[#da6633] text-[#fff] py-3 font-normal px-4 rounded-md font-montserrat text-[14px] md:text-[1rem]' onClick={handelsubmit}>Submit</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default ContactForm
