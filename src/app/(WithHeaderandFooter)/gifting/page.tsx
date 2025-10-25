'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import offerimg from '@/assets/allimg/offerimg.png'
import Link from 'next/link'
import { IoGiftOutline } from 'react-icons/io5'
import dumyimg from '@/assets/allimg/singerimg.jpg'
import dumyimg1 from '@/assets/allimg/singerimg1.jpg'
import giftimg from '@/assets/allimg/Screenshot.png'
import { IoMdClose } from 'react-icons/io'

export default function page() {

  const [modalToggle, setModalToggle] = useState(false);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  return (
    <>
      <div className="w-[95%] md:w-[85%] lg:w-[85%] 2xl:w-[85%] mx-auto md:py-10 py-5">
        <div className="bg-gray-50 py-7 md:py-12 rounded-md">

          <div className="text-center">
            <p className='font-montserrat 2xl:text-[22px] md:text-[18px] text-[16px]'>Gift Cards</p>
            <p className='font-montserrat 2xl:text-[27px] lg:text-[22px] md:text-[18px] text-[16px] font-medium'>Gift a smile, with</p>
            <h2 className='font-montserrat 2xl:text-[40px] lg:text-[27px] md:text-[20px] text-[18px] font-semibold'>The StayCationer <span className='text-[#da6633]'>loyalty program</span></h2>
          </div>

          <div className="m-auto flex justify-center items-center my-6 md:my-11 mb-4 md:mb-10">
            <div className="w-[70%] 2xl:h-[300px] md:h-[180px] h-[75px] relative ">
              <Image src={offerimg} alt='' fill className='object-contain' />
            </div>
          </div>

          <div className="md:w-[550px] m-auto mt-6 md:mt-20 text-center">
            <p className='font-montserrat lg:text-[1.4rem] md:text-[18px] text-[14px] text-center'>You will always enjoy exclusive spaces where friends, families, and colleagues can bond and create lasting memories, with the added luxury of certainty</p>
            <Link href="/create-gift" className='inline-block bg-primarydark text-[#fff] md:text-[16px] text-[15px] my-5 rounded-md px-6 py-3 font-montserrat hover:bg-[#da6633] '>Buy a Gift</Link>
          </div>
        </div>



        <div className="bg-gradient-to-b from-[#f67e5b] to-[#fff] p-5 md:p-10 text-center mt-6 md:mt-10 rounded-xl">
          <p className='font-montserrat lg:text-[2rem] md:text-[22px] text-[20px]' >What you get</p>
          {/* <h5 className='2xl:text-[3rem] lg:text-[2rem] text-[#fff] font-montserrat font-medium'>Giftings we offer</h5> */}

          <div className="mt-6">
            <div className="grid grid-cols-1 md:flex md:grid-cols-2 gap-5 md:gap-8 justify-center items-center lg:w-[80%] w-[100%] mx-auto">
              <div className="relative w-[100%] 2xl:h-[400px] lg:h-[300px] md:text-[260px] h-[220px] rounded-lg overflow-hidden col-span-1 ">
                <Image src={dumyimg} alt="" fill className='object-cover rounded-lg' />
                <span className='bg-[#0000005C] absolute  inset-0 w-full h-full z-10'></span>
                <div className="absolute bottom-5 left-6 z-[11]">
                  <h3 className='text-[#fff] xl:text-[1.4rem] lg:text-[20px] md:text-[18px] text-[16px]'>E-Gift Cards</h3>
                </div>
              </div>
              <div className="relative w-[100%] 2xl:h-[400px] lg:h-[300px] md:text-[260px] h-[220px] rounded-lg overflow-hidden col-span-1">
                <Image src={dumyimg1} alt="" fill className='object-cover rounded-lg' />
                <span className='bg-[#0000005C] absolute  inset-0 w-full h-full z-10'></span>
                <div className="absolute bottom-5 left-6 z-[11]">
                  <h3 className='text-[#fff] xl:text-[1.4rem] lg:text-[20px] md:text-[18px] text-[16px]'>Corporate Gift Cards</h3>
                </div>
              </div>
            </div>
          </div>
        </div>



        <div className="flex flex-col-reverse md:flex-row items-center md:items-start gap-5 md:py-10 py-5">
          <div className="w-full md:w-[50%]">
            <div className="relative w-full h-[12rem] md:h-[14rem] lg:h-[20rem] xl:h-96 mt-6 md:mt-0">
              <Image src={giftimg} alt='' fill className='object-contain' />
            </div>
          </div>
          <div className="w-full md:w-[40%] flex flex-col items-center md:!items-start">
            <h2 className='lg:text-[2rem] md:text-[22px] text-[18px] font-montserrat font-medium'>Recieved a Gift Card?</h2>
            <h4 className='lg:text-[1.5rem] md:text-[20px] text-[16px] font-montserrat font-medium'>Redeem here!</h4>
            <div className='mt-3 md:mt-6'>
              <input type="text" className='w-full md:w-[80%] !text-[14px] rounded-md border-[#333] my-4 p-4 font-montserrat' value={code} onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setCode(value);
                }
              }
              } placeholder='Enter Code' />
              <button onClick={() => setModalToggle(!modalToggle)} className='w-full md:w-[80%] bg-primarydark text-[#fff] font-montserrat p-4 !text-[15px] rounded-md'>Redeem Gift Card</button>
            </div>
          </div>
        </div>

      </div>

      {
        modalToggle &&

        <div className="fixed inset-0 bg-black bg-opacity-50 h-screen z-[9840] mx-auto">
          <div className="animate-[scaleup_0.3s_linear] bg-white rounded-lg bottom-1/2 left-1/2 max-h-[80vh] w-[95%] md:w-[60%] lg:w-[45%] xl:w-[30%] overflow-hidden absolute transform translate-x-[-50%] translate-y-[50%] py-10 px-10">
            <div
              className="absolute top-2 right-2 p-3 cursor-pointer"
              onClick={() => setModalToggle(!modalToggle)}
            >
              <IoMdClose />
            </div>
            <form action="">
              <div className="mb-2">
                <label
                  htmlFor=""
                  className="font-montserrat mb-2 inline-block text-[0.9rem]"
                >
                  Name
                </label>
                <input
                  type="text"
                  className=" font-montserrat right-0 focus:0 !text-[14px] font-normal border-[#d1d5db] rounded-lg focus:ring-0 focus:outline-none  w-full h-12 bg-[#f5f5f5]"
                  placeholder="Enter Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-2">
                <label
                  htmlFor=""
                  className="font-montserrat mb-2 inline-block text-[0.9rem]"
                >
                  Mobile Number
                </label>
                <input
                  type="text"
                  pattern="\d{10}"
                  maxLength={10}
                  className=" font-montserrat right-0 focus:0 !text-[14px] font-normal border-[#d1d5db] rounded-lg focus:ring-0 focus:outline-none  w-full h-12 bg-[#f5f5f5]"
                  placeholder="Enter Mobile number"
                  max={10}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      setPhoneNumber(value);
                    }
                  }}
                  value={phoneNumber}
                />
              </div>

              <div className="mb-2">
                <label
                  htmlFor=""
                  className="font-montserrat mb-2 inline-block text-[0.9rem]"
                >
                  Email
                </label>
                <input
                  type="email"
                  maxLength={10}
                  className=" font-montserrat right-0 focus:0 !text-[14px] font-normal border-[#d1d5db] rounded-lg focus:ring-0 focus:outline-none  w-full h-12 bg-[#f5f5f5]"
                  placeholder="Enter Your Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>

              <div className="flex justify-evenly gap-4 mt-5">
                <button
                  type='button'
                  className="flex-1 border border-primarydark font-montserrat py-3 font-normal px-4 rounded-md text-[15px]"
                  onClick={() => setModalToggle(!modalToggle)}
                >
                  Close
                </button>
                <button
                  className="flex-1 bg-primarydark text-[#fff] py-3 font-normal px-4 rounded-md font-montserrat text-[15px]"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      }
    </>
  )
}

