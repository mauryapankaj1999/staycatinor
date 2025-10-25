"use client"
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Image from 'next/image';
import slider from '@/assets/mobile_img/slider1.webp'
import slider1 from '@/assets/mobile_img/slider2.webp'
import slider3 from '@/assets/mobile_img/slider3.webp'
import { IoArrowBack, IoCloseCircleSharp, IoSearchOutline } from 'react-icons/io5';

const Mobileblog = () => {
    const [customemodal, setCustomemodal] = useState(false);
    const [mobileslider, setMobileslider] = useState([
        {
            slideimg: slider,
            slidertext: 'Introducing Vieda by StayVista',
        },
        {
            slideimg: slider1,
            slidertext: 'Introducing Vieda by StayVista',
        },
        {
            slideimg: slider3,
            slidertext: 'Introducing Vieda by StayVista',
        },
        {
            slideimg: slider1,
            slidertext: 'Introducing Vieda by StayVista',
        },
    ]);

    const blogswiper = {
        0: {
            slidesPerView: 1.3,
        },
        576: {
            slidesPerView: 2,
        },
        992: {
            slidesPerView: 2,
        },
        1200: {
            slidesPerView: 3,
        },
        1400: {
            slidesPerView: 3,
        },
    }
    return (
        <div>
            <div className="md:w-[85%] w-[95%] mx-auto md:pb-[4rem]">

                <h2 className="font-playfair font-medium text-[18px] mb-5 text-center">Exceptional Experiences Await</h2>
                <Swiper
                    loop
                    navigation={true}
                    modules={[Navigation]}
                    className='slidermobilehomed'
                    breakpoints={blogswiper}
                    spaceBetween={20}
                >

                    {
                        mobileslider.map((el, index) => {
                            return (
                                <SwiperSlide>
                                    {/* <div className="relative h-[23.3125em] w-full">
                                    <div className="overlaycss"></div>
                                    <Image src={el.slideimg} alt='' fill className='object-cover' />
                                    <div className="absolute top-[40%] left-0 right-0 text-center text-[#fff] w-[15rem] text-[1.5rem] mx-auto z-20"><h5>{el.slidertext} </h5></div>
                                    </div> */}
                                    <div className="shadow-sm rounded-lg overflow-hidden">
                                        <div className="w-full h-44 md:h-52 relative">
                                            <Image src={el.slideimg} alt='' fill className='object-cover' />
                                        </div>
                                        <div className="border p-4">
                                            <h3 className='text-[1rem] '>Best Places to Visit in 2024</h3>
                                            <p className='text-[0.7rem] font-montserrat'>Lorem ipsum dolor sit amet consectetur adipisicing elit. ipsum dolor sit amet consectetur adipisicing elit ipsum dolor sit amet consectetur adipisicing elit </p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            )
                        })
                    }

                </Swiper>
            </div>
        </div>
    )
}

export default Mobileblog
