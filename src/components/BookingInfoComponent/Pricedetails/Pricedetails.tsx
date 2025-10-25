import React from 'react'
import { MdCalendarMonth } from 'react-icons/md'
import iconcoupon from '@/assets/allimg/mdi_coupon-outline.svg'
import Image from 'next/image'
import Link from 'next/link'
import iconsvg from '@/assets/allimg/carbon_security.svg'

const Pricedetails = () => {
  return (

    <div className="sticky top-0">

      <div className="shadow-custom-light p-4 rounded-md ">
        <div className="border-b border-[#dfdfdf] pb-3">
          <h3 className='font-playfair font-medium text-navibule text-[1.5rem]'>Reservation Price Details</h3>
        </div>
        <div className="border-b border-[#dfdfdf] pb-3">

          <div className="flex justify-between items-center my-2">
            <div className="font-montserrat font-medium text-primarygray text-[1rem]">Rental</div>
            <div className="font-montserrat font-medium text-primarygray text-[1rem]">₹ 22,000</div>
          </div>
          <div className="flex justify-between items-center my-2">
            <div className="font-montserrat font-medium text-primarygray text-[1rem]">Text and Service Fees</div>
            <div className="font-montserrat font-medium text-primarygray text-[1rem]">₹ 1,000</div>
          </div>
          <div className="flex justify-between items-center my-2">
            <div className="font-montserrat font-medium text-primarygray text-[1rem]">Discount</div>
            <div className="font-montserrat font-medium text-primarygray text-[1rem]">- ₹1,000</div>
          </div>

        </div>


        <div className="flex justify-between border-dashed border-2 border-[#adc0d8] py-3 px-2 rounded-md items-center bg-[#dde8fd] mt-3">
          <div className='flex items-center  gap-2'>
            <div className='h-6 w-6 relative'>
              <Image src={iconcoupon} alt='' className='object-contain' fill />
            </div>
            <h5 className='font-montserrat font-semibold text-[0.9rem] text-navibule'>
              STAYCATIONER
            </h5>
          </div>
          <h6 className='font-montserrat font-semibold text-[1rem] text-navibule'>Remove</h6>
        </div>

        <div className="flex justify-between items-center mt-5 px-4 pt-2">
          <div className="">
            <h4 className='font-montserrat font-semibold text-[1.2rem] text-navibule'>Total</h4>
            <h5 className='font-montserrat font-normal text-[0.7rem]'>Include Text and Service</h5>
          </div>
          <h4 className='font-montserrat font-semibold text-[1.3rem] text-navibule'>₹ 22,000</h4>
        </div>

        <div className="flex border-b gap-2 items-center py-5">
          <div className="h-8 w-8 relative">
            <Image src={iconsvg} alt="" fill className='object-contain' />
          </div>
          <div className="">
            <h4 className='font-montserrat font-medium text-[1rem] text-[#219c76]'>Payment secured by 100%</h4>
            <h5 className='font-montserrat font-medium text-[0.7rem] text-[#219c76]'>Trusted by 2k+ Guest </h5>
          </div>
        </div>




        <div className="mt-5">
          <label className="inline-flex items-center">
            <input type="checkbox" className="h-3 w-3  border-[#767676] focus:outline-none bg-white  focus:ring-0 inputcustom" />
            <span className="ml-2 font-montserrat text-[0.7rem]">I have read and accepted the <Link href='/TermsandCondition' className='text-blue-600 underline'>Terms & Conditions,</Link> and <Link href="/PrivacyPolicy" className="text-blue-600 underline">Cancellation Policy.</Link> </span>
          </label>
        </div>

        <div className='mt-3'>
          <button className='bg-[#da6633] py-3 px-5 font-montserrat font-medium text-white rounded-md block w-full'>Book Now</button>
        </div>
      </div>

      <div className="mt-3">
        <div className="flex bg-[#ededed] py-4 px-5 rounded-md justify-between items-center">
          <div className="text-navibule font-montserrat font-medium text-[1rem]">
            Contact Us For Special Request
          </div>
          <div className="">
            <Link href="" className='bg-[#da6633] py-2 px-5 font-montserrat font-medium text-white rounded-md block w-full'>Contact Us</Link>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Pricedetails
