"use client"
import React, { useState } from 'react'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';

import slide1 from '@/assets/nearbygateway/image1.webp'
import StarRatings from 'react-star-ratings';
import { IoLocationSharp } from 'react-icons/io5';
import { MdFamilyRestroom, MdOutlinePets } from 'react-icons/md';
import { FaWifi } from 'react-icons/fa';
import { BiMaleFemale } from 'react-icons/bi';
import Link from 'next/link';
import { GoArrowRight } from 'react-icons/go';


export default function NearbyGateway() {


    const [nearbyarr, SetNearbyArr] = useState([
        {
            image: [
                {
                    img: slide1
                },
                {
                    img: slide1
                },
                {
                    img: slide1
                },
            ],
            hotalName: "Adviga",
            location: 'Mussorie',
            guests: 5,
            bedroom: 2,
            entire: "Home",
            rating: 4,
            reviews: 306,
            price: 27000,
            entirehome: 'Entire Home',
            totalreview: 406
        },
        {
            image: [
                {
                    img: slide1
                },
                {
                    img: slide1
                },
                {
                    img: slide1
                },
            ],
            hotalName: "PrideInn",
            location: 'Mussorie',
            guests: 5,
            bedroom: 2,
            entire: "Home",
            rating: 4,
            reviews: 306,
            price: 27000,
            entirehome: 'Entire Home',
            totalreview: 406
        },
        {
            image: [
                {
                    img: slide1
                },
                {
                    img: slide1
                },
                {
                    img: slide1
                },
            ],
            hotalName: "PrideInn",
            location: 'Mussorie',
            guests: 5,
            bedroom: 2,
            entire: "Home",
            rating: 4,
            reviews: 306,
            price: 27000,
            entirehome: 'Entire Home',
            totalreview: 406
        },


    ])



    return (
        <>
            <div className="w-[95%]  md:w-[90%] mx-auto md:py-8 brightness-[.80] py-4">
                {/* <h2 className=' text-[1.9rem] text-primarydark font-medium nearby_main_heading  '>Your Nearby Gateway</h2> */}
                <h2 className=' text-[1.9rem] text-primarydark font-medium  mb-10'>Your Nearby Gateway</h2>

                <div className="grid grid-cols-3 gap-5 transition-all delay-75 ease-in-out duration-1000">
                    {
                        nearbyarr.map((el: any, index: number) => {
                            return (
                                <>
                                    <div className="view_card group transition ease-in delay-100" key={index}>
                                        <div className="relative">
                                            <Swiper navigation={true} modules={[Navigation]}>

                                                {
                                                    el?.image.map((ele: any, ind: number) => (
                                                        <>
                                                            <SwiperSlide key={ind}>
                                                                <div className='w-full h-[300px] relative z-0 overflow-hidden transition-all ease-in-out duration-100'>
                                                                    <Image src={ele.img} alt='' fill className='group-hover:scale-125  group-hover:transition-all group-hover:delay-75  group-hover:duration-1000 ease-in-out' />
                                                                </div>
                                                            </SwiperSlide>
                                                        </>
                                                    ))
                                                }
                                            </Swiper>
                                            <div className="absolute top-2 right-2 bg-[#CF3A23] px-2 py-1  text-[0.8rem] text-[#fff] rounded-sm z-10">{el.location}</div>
                                            <div className="room_info absolute bottom-2 left-2 z-10">
                                                <ul className='flex gap-3'>
                                                    <li className='text-white text-[1.1rem]'>{el.guests} Guests </li>
                                                    <li className='text-white text-[1.1rem]'>{el.bedroom} Bedroom </li>
                                                    <li className='text-white text-[1.1rem]'>{el.entirehome} </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className='content mt-1 py-2 px-3'>
                                            <div className='flex flex-row justify-between mb-2 '>
                                                <h4 className='text-[22px] text-primarydark font-medium mb-0'>{el.hotalName} </h4>
                                                <StarRatings rating={el.rating}
                                                    starDimension="20px"
                                                    starSpacing="5px"
                                                    starRatedColor='#da6633'
                                                />
                                            </div>
                                            <div className='flex flex-row justify-between mb-3 '>
                                                <p className='flex flex-row items-center gap-1 text-sm text-primarydark font-medium font-montserrat'><IoLocationSharp className='text-text18' /> Mussorie</p>
                                                <p className='font-montserrat text-primarydark text-sm font-normal'>{el.totalreview}  Reviews</p>
                                            </div>
                                            <div className='flex flex-row justify-between mb-2 '>
                                                <ul className='flex items-center gap-2 justify-center'>
                                                    <li className='flex flex-row items-center gap-2 text-[0.9rem] text-primarygray font-medium font-montserrat'>  <MdFamilyRestroom className='text-[1.2rem]' />   Family   <span className='w-[2px] h-[20px] block  bg-[#7676766b] mx-1'></span></li>
                                                    <li className='flex flex-row items-center gap-2 text-[0.9rem] text-primarygray font-medium font-montserrat'>  <FaWifi className='text-[1.2rem]' />   WiFi    <span className='w-[2px] h-[20px] block  bg-[#7676766b] mx-1'></span></li>
                                                    <li className='flex flex-row items-center gap-2 text-[0.9rem] text-primarygray font-medium font-montserrat'>  <MdOutlinePets className='text-[1.2rem]' />   Pet Friendly   <span className='w-[2px] h-[20px] block  bg-[#7676766b] mx-1'></span></li>
                                                    <li className='flex flex-row items-center gap-2 text-[0.9rem] text-primarygray font-medium font-montserrat'>  <BiMaleFemale className='text-[1.2rem]' />   Couple   </li>
                                                </ul>
                                            </div>
                                            <div className="flex items-end justify-between ">
                                                <div className="mt-4 ">
                                                    <p className='text-sm font-montserrat text-primarygray font-normal mb-2'>Starts from</p>
                                                    <h5 className='text-[1.2rem] text-primarydark font-medium font-montserrat'>₹{el.price} / <span className='text-[0.9rem]'> Night</span></h5>
                                                </div>

                                                <div className="w-4/12 overflow-hidden">
                                                    <Link href='/PropertyDetails' className='-translate-x-28  w-3/5 group-hover:translate-x-[4.126rem]  group-hover:transition-all  text-[1rem]  group-hover:delay-75  group-hover:duration-1000 ease-in-out  group-hover:opacity-95 border border-primarycolor flex flex-row items-center gap-2 p-1 text-primarycolor'>Book Now  <GoArrowRight className='' /></Link>
                                                </div>


                                            </div>
                                        </div>
                                    </div>

                                </>
                            )
                        })
                    }

                    {/* <div className="w-[33%] view_card">
                        <div className="relative">
                            <Swiper navigation={true} modules={[Navigation]}>
                                <SwiperSlide>
                                    <div className='w-full h-[300px] relative z-0 '>
                                        <Image src={slide1} alt='' fill />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className='w-full h-[300px] relative z-0 '>
                                        <Image src={slide1} alt='' fill />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className='w-full h-[300px] relative z-0 '>
                                        <Image src={slide1} alt='' fill />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className='w-full h-[300px] relative z-0 '>
                                        <Image src={slide1} alt='' fill />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className='w-full h-[300px] relative z-0 '>
                                        <Image src={slide1} alt='' fill />
                                    </div>
                                </SwiperSlide>

                            </Swiper>

                            <div className="absolute top-2 right-2 bg-[#CF3A23] px-2 py-1  text-[0.8rem] text-[#fff] rounded-sm z-10">Mussorie</div>
                            <div className="room_info absolute bottom-2 left-2 z-10">
                                <ul className='flex gap-3'>
                                    <li className='text-white text-[1.1rem]'>5 Guests </li>
                                    <li className='text-white text-[1.1rem]'>2 Bedroom </li>
                                    <li className='text-white text-[1.1rem]'> Entire Home </li>
                                </ul>
                            </div>
                        </div>
                        <div className='content mt-1 py-2 px-3'>
                            <div className='flex flex-row justify-between mb-2 '>
                                <h4 className='text-[22px] text-primarydark font-medium mb-0'>PrideInn</h4>
                                <StarRatings rating={2}
                                    starDimension="20px"
                                    starSpacing="5px"
                                    starRatedColor='#da6633'
                                />
                            </div>
                            <div className='flex flex-row justify-between mb-3 '>
                                <p className='flex flex-row items-center gap-1 text-sm text-primarydark font-medium font-montserrat'><IoLocationSharp className='text-text18' /> Mussorie</p>
                                <p className='font-montserrat text-primarydark text-sm font-normal'>406 Reviews</p>
                            </div>
                            <div className='flex flex-row justify-between mb-2 '>
                                <ul className='flex items-center gap-2 justify-center'>
                                    <li className='flex flex-row items-center gap-2 text-[0.9rem] text-primarygray font-medium font-montserrat'>  <MdFamilyRestroom className='text-[1.2rem]' />   Family   <span className='w-[2px] h-[20px] block  bg-[#7676766b] mx-1'></span></li>
                                    <li className='flex flex-row items-center gap-2 text-[0.9rem] text-primarygray font-medium font-montserrat'>  <FaWifi className='text-[1.2rem]' />   WiFi    <span className='w-[2px] h-[20px] block  bg-[#7676766b] mx-1'></span></li>
                                    <li className='flex flex-row items-center gap-2 text-[0.9rem] text-primarygray font-medium font-montserrat'>  <MdOutlinePets className='text-[1.2rem]' />   Pet Friendly   <span className='w-[2px] h-[20px] block  bg-[#7676766b] mx-1'></span></li>
                                    <li className='flex flex-row items-center gap-2 text-[0.9rem] text-primarygray font-medium font-montserrat'>  <BiMaleFemale className='text-[1.2rem]' />   Couple   </li>
                                </ul>
                            </div>
                            <div className="mt-4">
                                <p className='text-sm font-montserrat text-primarygray font-normal mb-2'>Starts from</p>
                                <h5 className='text-[1.2rem] text-primarydark font-medium font-montserrat'>₹ 51000 / <span className='text-[0.9rem]'> Night</span></h5>
                            </div>
                        </div>
                    </div>
                    <div className="w-[33%] view_card">
                        <div className="relative">
                            <div className='w-full h-[300px] relative z-0 '>
                                <Image src={slide1} alt='' />
                            </div>
                        </div>
                    </div>
                    <div className="w-[33%] view_card">
                        <div className="relative">
                            <div className='w-full h-[300px] relative z-0 '>
                                <Image src={slide1} alt='' />
                            </div>
                        </div>
                    </div> */}

                </div>


                {/* 
                <div className="">
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={30}
                        slidesPerGroup={1}
                        navigation={true}
                        loop
                        modules={[Navigation]}
                        className={`mySwiper`}>

                        {
                            nearbyarr?.map((el: any, index: any) => (
                                <SwiperSlide key={index}>
                                    <div className='relative main_box'>
                                        <div className='w-full h-[300px] relative z-0 '>
                                            <Image src={el.image} alt='' fill className='z-0' ></Image>

                                            <div className="backdrop-opacity-10 w-full h-[15%] bg-[#000]/40 absolute bottom-0 left-0 z-20 py-3">
                                                <div className="overlay_content">
                                                    <ul className='flex items-center gap-2 pl-4'>

                                                        <li className='flex flex-row items-center gap-2 text-[0.9rem] text-[#fff] font-medium font-montserrat'>  {el.guests} Guests <span className='w-[2px] h-[20px] block  bg-[#fff] mx-1'></span></li>
                                                        <li className='flex flex-row items-center gap-2 text-[0.9rem] text-[#fff] font-medium font-montserrat'>  {el.bedroom} Bedroom <span className='w-[2px] h-[20px] block  bg-[#fff] mx-1'></span></li>
                                                        <li className='flex flex-row items-center gap-2 text-[0.9rem] text-[#fff] font-medium font-montserrat'>  Entire {el.entire} </li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className='bg-[#CF3A23] overlay_location p-1 px-2 text-[0.8rem] text-[#fff] absolute right-2 top-2 rounded z-30'>
                                                {el.location}
                                            </div>
                                        </div>
                                        <div className='content mt-1 py-2 px-3'>
                                            <div className='flex flex-row justify-between mb-2 '>

                                                <h4 className='text-[22px] text-primarydark font-medium mb-0'>{el.name}</h4>
                                                <StarRatings
                                                    rating={el.rating}
                                                    starDimension="20px"
                                                    starSpacing="5px"
                                                    starRatedColor='#da6633'
                                                />



                                            </div>

                                            <div className='flex flex-row justify-between mb-3 '>
                                                <p className='flex flex-row items-center gap-1 text-sm text-primarydark font-medium font-montserrat'><IoLocationSharp className='text-text18' /> {el.location}</p>
                                                <p className='font-montserrat text-primarydark text-sm font-normal'>{el.reviews} Reviews</p>
                                            </div>




                                            <div className='flex flex-row justify-between mb-2 '>
                                                <ul className='flex items-center gap-2 justify-center'>

                                                    <li className='flex flex-row items-center gap-2 text-[0.9rem] text-primarygray font-medium font-montserrat'>  <MdFamilyRestroom className='text-[1.2rem]' />   Family   <span className='w-[2px] h-[20px] block  bg-[#7676766b] mx-1'></span></li>
                                                    <li className='flex flex-row items-center gap-2 text-[0.9rem] text-primarygray font-medium font-montserrat'>  <FaWifi className='text-[1.2rem]' />   WiFi    <span className='w-[2px] h-[20px] block  bg-[#7676766b] mx-1'></span></li>
                                                    <li className='flex flex-row items-center gap-2 text-[0.9rem] text-primarygray font-medium font-montserrat'>  <MdOutlinePets className='text-[1.2rem]' />   Pet Friendly   <span className='w-[2px] h-[20px] block  bg-[#7676766b] mx-1'></span></li>
                                                    <li className='flex flex-row items-center gap-2 text-[0.9rem] text-primarygray font-medium font-montserrat'>  <BiMaleFemale className='text-[1.2rem]' />   Couple   </li>

                                                </ul>


                                            </div>

                                            <div className="mt-4">
                                                <p className='text-sm font-montserrat text-primarygray font-normal mb-2'>Starts from</p>
                                                <h5 className='text-[1.2rem] text-primarydark font-medium font-montserrat'>₹ {el.price} / <span className='text-[0.9rem]'> Night</span></h5>
                                            </div>



                                        </div>


                                    </div>


                                </SwiperSlide>
                            ))
                        }





                    </Swiper>
                </div> */}


            </div>


        </>
    )
}
