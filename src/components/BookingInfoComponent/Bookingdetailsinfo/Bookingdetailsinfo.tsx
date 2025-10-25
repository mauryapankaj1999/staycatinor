"use client"
import React from 'react'

const Bookingdetailsinfo = () => {
    return (
        <div>
            <h3 className="font-playfair font-normal text-[1.6rem] mb-4 text-navibule mt-9">Enter your Detail</h3>
            <form action="">
                <div className="flex gap-3 flex-wrap justify-between bookinginput">
                    <div className='mb-5 w-[48%]'>
                        <label htmlFor="" className="font-montserrat font-medium text-navibule mb-5">First Name</label>
                        <input type="text" id="first_name" className=" font-montserrat font-medium border-gray-300 rounded-lg focus:ring-0 focus:outline-none  w-full h-12 bg-[#f5f5f5]" placeholder="First name" required />
                    </div>
                    <div className='mb-5 w-[48%]'>
                        <label htmlFor="" className="font-montserrat font-medium text-navibule mb-2">Last Name</label>
                        <input type="text" id="first_name" className="font-montserrat font-medium border-gray-300 rounded-lg focus:ring-0 focus:outline-none  w-full h-12" placeholder="Last Name" required />
                    </div>
                    <div className='mb-5 w-[48%]'>
                        <label htmlFor="" className="font-montserrat font-medium text-navibule mb-2">Mobile Number</label>
                        <input type="text" id="first_name" className=" font-montserrat font-medium border-gray-300 rounded-lg focus:ring-0 focus:outline-none bg-[#f5f5f5] w-full h-12" placeholder="Mobile Number" required />
                    </div>
                    <div className='mb-5 w-[48%]'>
                        <label htmlFor="" className="font-montserrat font-medium text-navibule mb-2">Email Address</label>
                        <input type="text" id="first_name" className=" font-montserrat font-medium border-gray-300 rounded-lg focus:ring-0 focus:outline-none bg-[#f5f5f5] w-full h-12" placeholder="Email Id" required />
                    </div>
                    <div className='mb-5 w-[48%]'>
                        <label htmlFor="" className="font-montserrat font-medium text-navibule mb-2">Gst Number</label>
                        <input type="text" id="first_name" className=" font-montserrat font-medium border-gray-300 rounded-lg focus:ring-0 focus:outline-none bg-[#f5f5f5] w-full h-12" placeholder="Gst Number" required />
                    </div>
                    <div className='mb-5 w-[100%] relative'>
                        <label htmlFor="message" className="font-montserrat font-medium text-navibule mb-2">Any Special Request <span className="text-[0.8rem] text-primarygray"> (Optional) </span></label>
                        <textarea id="message" rows={4} className="textareainput font-montserrat focus:outline-none focus:border-transparent block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Bookingdetailsinfo
