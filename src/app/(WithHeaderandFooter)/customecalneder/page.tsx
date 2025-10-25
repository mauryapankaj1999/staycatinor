"use client"
import React, { useState } from 'react'
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, addMonths, subMonths, isSameDay, getWeek, isWithinInterval, isToday } from 'date-fns';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import Twomonthcalender from './_Component/Monthcalender/Twomonthcalender';

export default function page() {
return(
    <>
    <input type="text" placeholder='start date' />
    <input type="text" placeholder='end date' />

    <Twomonthcalender   />

    </>
)
}
