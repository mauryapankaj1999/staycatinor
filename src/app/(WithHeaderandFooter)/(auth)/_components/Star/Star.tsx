import React, { useState } from 'react'
import { IoIosStarOutline } from 'react-icons/io'
import { MdOutlineStar, MdOutlineStarBorder } from 'react-icons/md'

export default function Star({ filled, onClick }:any) {

  return (
    <div>
      <span onClick={onClick} style={{ cursor: 'pointer', fontSize: '2rem',  }} className='text-[1rem]'>
      {filled ?  <MdOutlineStar  />  :  <MdOutlineStarBorder />

 } 
    </span>
    </div>
  )
}
