import { Login } from '@/components/Auth/Login'
import { Register } from '@/components/Auth/Register'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <>
      <div className="px-4 py-12">
        <h4 className='text-center text-[22px] md:text-[24px] mb-4'>Join us! Create an Account</h4>

        <div className="md:w-[75%] mx-auto">
          <Register />

          <Link href="/Login" className='text-[1rem] underline block font-montserrat text-[#d03c2b] mt-4'>Login Here </Link>
        </div>
      </div>
    </>
  )
}

export default page
