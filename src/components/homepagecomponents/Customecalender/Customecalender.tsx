import React, { useState } from 'react'
import { LuSearch } from 'react-icons/lu'
import { MdOutlineLocationOn } from 'react-icons/md'
import Calendar from '../Mobilecustomecheckoutform/_component/Calendar/Calendar';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, addMonths, subMonths, isWithinInterval, isSameDay } from 'date-fns';
import Twomonthcalender from '@/app/(WithHeaderandFooter)/customecalneder/_Component/Monthcalender/Twomonthcalender';
import { IoCalendarClearOutline } from 'react-icons/io5';
const Customecalender = () => {
    const [searchlistshow, setSearchlistshow] = useState(false);
    const [searchlist, setSearchlist] = useState([
        {
            locationname: 'Mulshi Taluka, Pune',
            city: 'Maharashtra',
            state: 'City'
        },
        {
            locationname: 'Mulshi Taluka, Pune',
            city: 'Maharashtra',
            state: 'City'
        },
        {
            locationname: 'Mulshi Taluka, Pune',
            city: 'Maharashtra',
            state: 'City'
        },
    ]);
    const [showcalender, setShowcalender] = useState(false);
    const [checkindate, setcheckindate] = useState({ start: '', end: '' });



    return (
        <>
            <div className="w-[30%] m-auto rounded-md">
                <div className="bg-[#848480] p-4 blurbg flex gap-2 items-center">
                    <LuSearch className='text-[#fff] font-montserrat text-[1rem]' />
                    <p className='text-[#fff] font-montserrat text-[1rem]'>search for location, villa, facilities...</p>
                </div>

                <div className="bg-white py-5 rounded-xl">
                    <div className="px-3">

                        <div className="input flex gap-2 items-center ">
                            <LuSearch className='text-[#000] font-montserrat text-[1rem]' />
                            <input type="text" className='border-none focus:right-0 focus:outline-none  flex-[2] text-[#000] font-montserrat text-[1rem]' placeholder='search for location, villa, facilities...' />
                        </div>

                        {
                            searchlistshow &&
                            <>
                                <p className='font-montserrat text-[0.7rem] text-left text-gray my-2'>home-search-recent-wrapper</p>
                                <div className="searchresultheight">
                                    {
                                        searchlist.map((el, index) => {
                                            return (
                                                <>
                                                    <div className="flex justify-between items-center mb-2 px-2 py-2 rounded-md hover:bg-[#3333330c]">
                                                        <div className="flex gap-2 items-center">
                                                            <div className=""><MdOutlineLocationOn /></div>
                                                            <div className="">
                                                                <p className='text-[0.8rem] font-montserrat font-medium text-[#333]'>{el.locationname}</p>
                                                                <p className='text-[0.6rem] font-montserrat'>{el.city} </p>
                                                            </div>
                                                        </div>
                                                        <div className='text-[0.8rem] font-montserrat'>{el.state}</div>
                                                    </div>

                                                </>
                                            )
                                        })
                                    }
                                </div>
                            </>
                        }
                    </div>
                    <hr className='my-3' />
                    <div className="flex justify-between gap-4 px-3" onClick={() => setShowcalender(!showcalender)}>
                        <div className="border rounded-full px-4 py-2 font-montserrat flex-1 text-[0.9rem] border-[#dddddd] flex gap-4 items-center">
                            <IoCalendarClearOutline />

                            {checkindate?.start
                                ? new Date(checkindate?.start).toLocaleDateString('en-GB')
                                : 'dd/mm/yyyy'
                            }
                        </div>
                        <div className="border rounded-full px-4 py-2 font-montserrat flex-1 text-[0.9rem] border-[#dddddd] flex gap-4 items-center">
                            <IoCalendarClearOutline />
                            {checkindate?.end
                                ? new Date(checkindate?.end).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric'
                                })
                                : 'dd/mm/yyyy'}
                        </div>
                    </div>

                    {
                        showcalender ?
                            <div className="" >
                                <Twomonthcalender setShowcalender={setShowcalender} onSelectDate={setcheckindate} />
                            </div>
                            : ''
                    }
                </div>
            </div>
        </>
    )
}

export default Customecalender
