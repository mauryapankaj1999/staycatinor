"use client"

import React, { useState } from 'react'
import { IoIosCloseCircle } from 'react-icons/io';
import Sidebar from '../Sidebar';
import Image from "next/image";
import userimg from '@/assets/allimg/user-dummy.png'
import { usePathname } from 'next/navigation';
import { useProfile } from '@/services/users.service';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FaUserCircle } from 'react-icons/fa';
const MobileSidebar = () => {
  const [sidebartoggle, setSidebartoggle] = useState(false);
  const pathname = usePathname()
  const { data: user } = useProfile();
  const router = useRouter()

  const handelLogut = async () => {
    await signOut();
  }

  const handelLink = async (link: string) => {
    setSidebartoggle(!sidebartoggle)
    router.push(link)

  }
  return (
    <div>
      {
        sidebartoggle ?
          <>
            <div className="bgoverlaysidebar" onClick={() => setSidebartoggle(!sidebartoggle)}>
              <div className="sidebar">
                <div className="sidebarheader mb-3 bg-[#202a37]">
                  <div className="flex justify-between items-center">
                    <div className="p-2">
                      <div className="relative">
                        <FaUserCircle className='text-[#fff] text-[2rem]' />
                      </div>
                      <h2 className='text-[#fff] mt-1'>hi  {user?.fullName}</h2>
                    </div>
                    {/* <div className="" onClick={() => setSidebartoggle(!sidebartoggle)}>
                    <IoIosCloseCircle className='text-[1.8rem]' />
                  </div> */}
                  </div>

                </div>
                <div className="sidebarbody">
                  <Sidebar />
                </div>

              </div>
            </div>
          </>
          :
          ''
      }

      <div className="fixedamdin font-montserrat lg:hidden block p-4 z-30" onClick={() => setSidebartoggle(!sidebartoggle)}>Show List</div>
    </div>
  )
}

export default MobileSidebar
