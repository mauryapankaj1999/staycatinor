"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import { Navigation } from 'swiper/modules'
import { SwiperSlide } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/navigation';
import slide1 from '@/assets/allimg/slider1.jpg'
import { generateFilePath } from '@/services/url.service'
import dynamic from 'next/dynamic'


const Swiper = dynamic(() => import('swiper/react').then(mod => mod.Swiper), {
  ssr: false,
});


const RoomlayoutSlider = ({ rooms }: any) => {

  const reviewslider = {
    0: {
      slidesPerView: 1.3,
    },
    576: {
      slidesPerView: 2.4,
    },
    768: {
      slidesPerView: 2.2,
    },
    992: {
      slidesPerView: 2.5,
    },
    1200: {
      slidesPerView: 2.2,
    },
    1500: {
      slidesPerView: 2.6,
    },
  };


  return (
    <>
      <div className="property_detail_shadow md:rounded-md px-[0.5rem] py-[0.6rem] md:px-[1rem] md:py-[1rem] mt-6 md:mt-8 relative">
        <h3 className='font-playfair md:text-[20px] xl:text-[20px] mb-2 text-[16px] absolute top:3 md:top-3 xl:top-[1rem] md:font-normal lg:font-normal xl:font-normal 2xl:font-normal font-semibold'>Spaces</h3>
        <Swiper
          spaceBetween={20}
          loop
          navigation={true}
          modules={[Navigation]}
          className='roomlayout'
          breakpoints={reviewslider}
        >
          {
            rooms && rooms.length && rooms.map((el: any, index: any) => {
              return (
                <>
                  <SwiperSlide>
                    <div className=' rounded-md overflow-hidden mb-2'>
                      <div className="relative">
                        <div className='w-full h-[10rem] lg:h-[200px] 2xl:h-[230px] relative z-0 overflow-hidden transition-all ease-in-out duration-100'>
                          <Image src={generateFilePath(el.image)} alt='' fill className='group-hover:scale-125  group-hover:transition-all group-hover:delay-75 object-cover group-hover:duration-1000 ease-in-out' />
                          <div className='h-full w-full bg-custom-gradient absolute left-0 right-0 mx-auto z-10 bottom-0 gap-3'></div>
                        </div>
                        <p className='absolute bottom-4 left-4 z-10 text-white font-montserrat md:text-[16px] text-[14px] font-medium'>{el.title}</p>
                        {/* <p className='absolute top-4 right-4 z-10 font-medium text-[#fff] font-montserrat text-[10px] md:text-[12px] rounded-sm bg-primarydark py-1 px-2'>First Floor</p> */}
                      </div>
                      <div className="px-2 py-4 ">
                        {/* <div className="flex justify-between items-center">
                        <p className='font-montserrat font-medium text-[12px] md:text-[16px] text-primarygray'>{el.title} </p>
                        </div> */}
                        {/* <div className="inline-flex gap-2 mb-3">
                          <div className="w-[10px]">
                            <div className="h-[6px] w-[6px] bg-[#000] rounded-full mt-[7px]"></div>
                          </div>
                          <p className='font-montserrat font-medium 2xl:text-[14px] xl:text-[12px]  md:text-[10px] text-[11px] text-primarygray  '>{el.description}</p>
                        </div>
                        <div className="inline-flex gap-2 mb-3">
                          <div className="w-[10px]">
                            <div className="h-[6px] w-[6px] bg-[#000] rounded-full mt-[7px]"></div>
                          </div>
                          <p className='font-montserrat font-medium 2xl:text-[14px] xl:text-[12px]  md:text-[10px] text-[11px] text-primarygray  '>{el.description}</p>
                        </div> */}
                      </div>
                    </div>
                  </SwiperSlide>
                </>
              )
            })
          }

        </Swiper>
      </div>


    </>
  )
}

export default RoomlayoutSlider
