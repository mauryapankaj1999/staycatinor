"use client"
import React, { useState } from 'react'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/navigation';
import sliderimg from '@/assets/mainbanner/slider2.png'
import sliderimg1 from '@/assets/mainbanner/slider1.png'
import sliderimg2 from '@/assets/mainbanner/slider3.png'
import sliderimg3 from '@/assets/mainbanner/slider2.png'
import Image from 'next/image';
import { generateFilePath } from '@/services/url.service';
export default function Mobilesingleslider({ imagesArr }: { imagesArr: any }) {


  const [mobileslider, setMobileslider] = useState([
    {
      sliderimg: sliderimg
    },
    {
      sliderimg: sliderimg1
    },
    {
      sliderimg: sliderimg2
    },
    {
      sliderimg: sliderimg3
    },
    {
      sliderimg: sliderimg2
    },
    {
      sliderimg: sliderimg
    },
    {
      sliderimg: sliderimg1
    },
    {
      sliderimg: sliderimg2
    },
    {
      sliderimg: sliderimg3
    },
    {
      sliderimg: sliderimg2
    },
  ]);
  const [activeSlide, setActiveSlide] = useState(1);

  const handleSlideChange = (swiper: any) => {
    setActiveSlide(swiper.realIndex + 1); // realIndex is 0-based, so add 1
  };

  return (
    <>


      <div className="relative h-[80vh] flex items-center justify-center">
        <Swiper
          navigation={true}
          loop={true}
          modules={[Navigation]}
          className="singleimg w-full"
          onSlideChange={handleSlideChange}
        >
          {imagesArr && imagesArr?.length > 0 && imagesArr?.map((item: any, index: number) => (
            <SwiperSlide key={index} className="text-white text-[2rem] ">
              <div className="lg:!w-[80%] xl:!w-[70%] 2xl:!w-[60%] mx-auto">
                <div className="w-full !h-[220px] md:!h-[400px] lg:!h-[480px] xl:!h-[500px] 2xl:!h-[515px] relative">
                  <Image src={generateFilePath(item)} alt={`Slide ${index + 1}`} fill className='object-cover' />
                </div>
              </div>

            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute bottom-2 right-2 left-2 text-center z-[20] text-white text-lg font-montserrat font-bold">
          {activeSlide} of {imagesArr.length}
        </div>
      </div>
    </>
  )
}
