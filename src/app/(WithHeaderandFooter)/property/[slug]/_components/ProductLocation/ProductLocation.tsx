"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import booking from '@/assets/amenities/booking.svg'
import airbnb from '@/assets/amenities/logos_airbnb-icon.svg'
import google from '@/assets/amenities/devicon_google.svg'
import dumyimg from '@/assets/allimg/img_avatar.png'
import StarRatings from 'react-star-ratings';
import Link from 'next/link'
const ProductLocation =  React.memo(({ map }: any) => {
  return (
    <>
      <div className='property_detail_shadow md:rounded-md px-[0.5rem] py-[0.6rem] md:px-[1rem] md:py-[1rem] mt-6 md:mt-8 locationmap'>
        <h3 className='font-playfair md:text-[20px] xl:text-[20px] mb-2 text-[16px] md:font-normal lg:font-normal xl:font-normal 2xl:font-normal font-semibold'>Location</h3>
        <p className='font-montserrat font-normal text-[#767676] md:!text-[16px] text-[12px]' dangerouslySetInnerHTML={{ __html: map }}></p>
      </div>
      {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d181343.51201464268!2d77.12227911954564!3d32.376025161573075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39047ef0b27a15ad%3A0xbfdd7e65efefc66b!2sRohtang%20La!5e0!3m2!1sen!2sin!4v1717234963305!5m2!1sen!2sin" width="100%" height="450"  allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe> */}
    </>
  )
});
export default ProductLocation
