"use client"
import React, { useState } from 'react'

import Image from 'next/image'

const Hotelservice = ({ title, count, img }: any) => {


  return (
    <>

      <div className='flex flex-row min-w-[107px] md:min-w-[120px] justify-center gap-2 md:gap-3 items-center bg-[#f5f5f5] py-2 px-1 md:py-2 lg:py-2 xl:py-2 rounded-md font-montserrat font-normal text-navibule xl:text-[0.8rem] 2xl:text-[1rem]'>
        <Image src={img} alt='' className='w-[20px] h-[20px] md:w-[26px] md:h-[26px] lg:w-[30px] lg:h-[30px] object-contain' />
        <p className='text-[12px] md:text-[16px] font-medium w-full'> {title} {count}</p>
      </div>

    </>
  )
}

export default Hotelservice

