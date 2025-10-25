"use client"
import React, { useState } from 'react'
import ContactForm from '../ContactForm/ContactForm'
import { useSearchParams } from 'next/navigation'

const EnquerySection = ({ propertyId }: any) => {
  const [modaltoggle, setModaltoggle] = useState(false);
  return (
    <>

      <div className="bg-[#f5f5f5] py-[16px] px-[16px] md:py-[25px] md:px-[25px]  xl:px-8-start md:items-end flex flex-col md:flex-row  justify-between mt-6 md:mt-8">
        <div>
          <h3 className='font-playfair md:text-[20px] xl:text-[20px] text-navibule  text-[16px] font-semibold'>Question?</h3>
          <p className='font-montserrat font-medium 2xl:text-[16px] xl:text-[15px] md:text-[15px] text-[12px] text-primarygray mb-2'>Our Team is Here to Help you. Drop Us a Message!</p>
        </div>
        <div>
          <button onClick={() => setModaltoggle(!modaltoggle)} className='bg-[#da6633] py-2 px-5 font-montserrat md:text-[16px] text-[15px] font-medium text-white rounded-md block w-full'>Contact Us</button>
        </div>
      </div>


      {
        modaltoggle ?

          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
            <div className="bg-white rounded-md md:w-[500px] md:mx-auto relative animate-slide-in p-3 md:p-5 mx-4 ">
              <ContactForm setModaltoggle={setModaltoggle} modaltoggle={modaltoggle} propertyId={propertyId}/>
            </div>
          </div>
          : ''
      }

    </>
  )
}

export default EnquerySection
