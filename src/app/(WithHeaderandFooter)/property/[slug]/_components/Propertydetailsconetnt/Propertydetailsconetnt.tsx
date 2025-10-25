"use client"
import React, { useState } from 'react'

const Propertydetailsconetnt = () => {

  const [listhotel, setListhotel] = useState([
    {
      item: "About",
      active: true,
      tab: 1,
      refTo: 'About',
    },
    {
      item: "Amenities",
      active: false,
      tab: 2,
      refTo: 'amenities',
    },
    {
      item: "Reviews",
      active: false,
      tab: 3,
      refTo: 'Reviews',
    },
    {
      item: "Meals",
      active: false,
      tab: 4,
      refTo: 'Meals',
    },
    {
      item: "Things to Do",
      active: false,
      tab: 5,
      refTo: 'Thingstogo',
    },
    {
      item: "Rooms Layout",
      active: false,
      tab: 6,
      refTo: 'RoomsLayout',
    },
    {
      item: "Home Rule",
      active: false,
      tab: 5,
      refTo: 'HomeRule',
    },
    {
      item: "FAQ’S",
      active: false,
      tab: 5,
      refTo: 'FAQS',
    },
  ]);



  // const handleClick = (i: any) => {
  //   const temp = listhotel.map((ele, index) => {
  //     if (i === index) {
  //       ele.active = true;
  //       ele.refTo.current.scrollIntoView({
  //         behavior: "smooth",
  //         block: "start",
  //       });
  //     } else {
  //       ele.active = false;
  //     }
  //     return ele;
  //   });
  //   setListhotel([...temp]);
  // };

  return (
    <>
      <div className="my-4">

        <div className="">
          <ul className='flex gap-2 items-center mt-10 mb-4 border-b pb-3 border-b-[#dddddd]'>
            {
              listhotel.map((el, index) => {
                return (
                  <>
                    <li
                      className='font-montserrat font-normal text-primarygray text-[1.1rem] flex-1 text-center'
                      //  className={`${el.active ?  'adfasd' : 'acut'}`}
                      key={index}
                      // onClick={() => handleClick(index)}

                    >{el.item}</li>
                  </>
                )
              })
            }
          </ul>
        </div>

      </div>
    </>
  )
}

export default Propertydetailsconetnt

