"use client"
import React, { useState } from 'react'
import { GoCheckCircle, GoChevronDown, GoChevronUp, GoCircle } from 'react-icons/go';

const Propertytype = ({ heading, filterArr, handleChange }: { heading: string, filterArr: { label: string, checked: boolean }[], handleChange: (e: { label: string, checked: boolean }[]) => void }) => {

    const handleChecked = (index: number, value: boolean) => {
        let tempArr = filterArr;
        tempArr[index].checked = value;

        console.log(tempArr)
        handleChange(tempArr)
    }
    const [expanded, setExpanded] = useState(0);

    const toggleAccordion = (index: any) => {
        setExpanded(expanded === index ? null : index);
    };

    const accordionItems = [
        {
            City: 'Delhi',
            location: [
                {
                    locataionname: 'Delhi'
                },
                {
                    locataionname: 'Rohini'
                },
                {
                    locataionname: 'patel Nagar'
                },
                {
                    locataionname: 'nangoli'
                },
            ]
        },
        {
            City: 'Goa',
            location: [
                {
                    locataionname: 'Delhi'
                },
                {
                    locataionname: 'Rohini'
                },
                {
                    locataionname: 'patel Nagar'
                },
                {
                    locataionname: 'nangoli'
                },
            ]
        },
        {
            City: 'Nainital',
            location: [
                {
                    locataionname: 'Delhi'
                },
                {
                    locataionname: 'Rohini'
                },
                {
                    locataionname: 'patel Nagar'
                },
                {
                    locataionname: 'nangoli'
                },
            ]
        },
        {
            City: 'Kasauli',
            location: [
                {
                    locataionname: 'Delhi'
                },
                {
                    locataionname: 'Rohini'
                },
                {
                    locataionname: 'patel Nagar'
                },
                {
                    locataionname: 'nangoli'
                },
            ]
        },
        {
            City: 'Shimla',
            location: [
                {
                    locataionname: 'Delhi'
                },
                {
                    locataionname: 'Rohini'
                },
                {
                    locataionname: 'patel Nagar'
                },
                {
                    locataionname: 'nangoli'
                },
            ]
        },


    ];


    return (
        <>
            {/* <div className='mb-5 border-b pb-3'>
                <div className='mb-3'>
                    <h4 className="2xl:text-[1.4rem] xl:text-[1.3rem] text-primarydark font-playfair font-medium">{heading}</h4>
                </div>
                <div>
                    <ul className='custominput'>
                        {
                            filterArr && filterArr.map((el, index) => (
                                <li className='mb-3'>
                                    <div className="flex items-center space-x-2">
                                        <input id={`${el.label.replace(" ", "")}${index}`} onChange={() => handleChecked(index, !el.checked)} type="checkbox" checked={el.checked} className="check-with-label 2xl:h-4 2xl:w-4 xl:h-2 xl:w-2 border-[#767676] focus:outline-none bg-white focus:ring-0 inputcustom" />
                                        <label htmlFor={`${el.label.replace(" ", "")}${index}`} className="label-for-check  text-[#767676] font-montserrat font-medium  2xl:text-[0.9rem] xl:text-[0.8rem]">{el.label}</label>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div> */}


            <div className="">
                <div id="accordion-flush" data-accordion="collapse" data-active-classes="bdark:bg-gray-900 text-gray-900 dark:text-white" data-inactive-classes="text-gray-500 dark:text-gray-400">
                    {accordionItems.map((item, index) => (
                        <div key={index} className='mb-2'>


                            <p id={`font-montserrat accordion-flush-heading-${index + 1} `} className={`rounded-full px-[10px] py-[8px] ${expanded === index ? 'bg-[#ffcbac]' : 'bg-[#f0f0f0]'}`}>
                                <button
                                    type="button"
                                    className="flex md:items-center justify-between w-full font-medium md:rtl:text-right text-gray-500   gap-3"
                                    data-accordion-target={`#accordion-flush-body-${index + 1}`}
                                    aria-expanded={expanded === index}
                                    aria-controls={`accordion-flush-body-${index + 1}`}
                                    onClick={() => toggleAccordion(index)}
                                >
                                    <span className='font-montserrat text-start font-playfair font-medium text-[12px] lg:text-[14px] text-navibule'>{item.City}</span>
                                    {
                                        expanded === index ?
                                        <GoChevronUp className='h-5 w-5' />
                                            :
                                            <GoChevronDown className='h-5 w-5' />
                                    }

                                    {/* <svg
                                        data-accordion-icon
                                        className={`w-3 h-3 ${expanded === index ? 'rotate-180' : ''} shrink-0`}
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 10 6"
                                    >
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
                                    </svg> */}
                                </button>
                            </p>


                            <div id={`accordion-flush-body-${index + 1}`} className={`${expanded === index ? '' : 'hidden'}`} aria-labelledby={`accordion-flush-heading-${index + 1}`}>
                                <div className="border-b border-gray-200 dark:border-gray-700">
                                    <ul className='px-2 my-2'>
                                        {item.location.map((loc, idx) => (
                                            <li key={idx} className="py-1 font-montserrat">
                                                <div className="flex justify-between">
                                                    <div className="flex gap-2 items-center">
                                                        {
                                                            expanded === index ?
                                                                <GoCircle className='h-4 w-4' />
                                                                :
                                                                <GoCheckCircle className='h-4 w-4' />
                                                        }
                                                        <span className='text-[14px]'>{loc.locataionname}</span>
                                                    </div>
                                                    <div className="">
                                                        <GoChevronDown className='h-5 w-5' />
                                                    </div>
                                                </div>

                                            </li>
                                        ))}
                                    </ul>

                                    {/* <p className="font-montserrat font-medium text-primarygray md:leading-8 md:text-[1rem] text-[0.8rem]">
                                        {item.content}
                                    </p> */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>





        </>



    )
}

export default Propertytype
