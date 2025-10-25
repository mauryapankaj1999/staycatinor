"use client";
import React, { useEffect, useRef } from 'react'

export default function TabSections({ listItems, handleItemClick }: { listItems: any, handleItemClick: any }) {
    const tabHeaderRef: React.MutableRefObject<null | any> = useRef(null)
    useEffect(() => {
        if (tabHeaderRef && tabHeaderRef.current) {
            localStorage.setItem("tabHeader", String(tabHeaderRef?.current?.clientHeight))
        }
    }, [tabHeaderRef])

    return (
        <div ref={tabHeaderRef}>

            <div className="bg-white mb-4">
                <ul className="overflow-x-scroll lg:overflow-x-auto flex md:gap-2 items-center justify-between border-b border-b-[#dddddd] hide-scrollbar">
                    {listItems.map((el: any) => (
                        <li
                            key={`tab-section-${el.id}`}
                            onClick={() => handleItemClick(el.id)}
                            className={` w-full text-nowrap font-montserrat font-normal mr-2 text-center ${el.active
                                    ? "border-b-[3px] border-b-[#da6633] text-[#da6633] "
                                    : "border-b-[3px] border-b-transparent text-primarygray"
                                } px-[15px] pt-[12px] pb-[7px] md:pt-[1rem] md:pb-[0.45rem] xl:pt-[2rem] xl:pb-[1rem] cursor-pointer hover:border-b-[3px] hover:border-b-[#da6633] text-[14px] md:text-[16px]`} >
                            {el.item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
