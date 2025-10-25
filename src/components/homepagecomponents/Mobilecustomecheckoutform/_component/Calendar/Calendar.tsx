import React, { useEffect, useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, addMonths, subMonths, isWithinInterval, isSameDay, isBefore } from 'date-fns';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import { useSearchParams } from 'next/navigation';

const Calendar = ({ onSelectDate }: { onSelectDate: (dates: { checkIn: Date | null; checkOut: Date | null }) => void }) => {
  const params = useSearchParams();
  const today = new Date();

  // Compute initial dates directly in useState
  const startDateParam = params.get("startDate");
  const endDateParam = params.get("endDate");


  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);

  useEffect(() => {
    // Call onSelectDate on mount or when params change, but only if valid dates exist
    if (startDateParam && endDateParam) {
      // Convert UTC dates to IST (Indian Standard Time, UTC+5:30)
      const validatedStartDate = new Date(new Date(startDateParam).getTime() + 5.5 * 60 * 60 * 1000).toString();
      const validatedEndDate = new Date(new Date(endDateParam).getTime() + 5.5 * 60 * 60 * 1000).toString();

      setCheckInDate(new Date(validatedStartDate));
      setCheckOutDate(new Date(validatedEndDate));

      onSelectDate({
        checkIn: new Date(validatedStartDate),
        checkOut: new Date(validatedEndDate),
      });
      console.log("Initial dates set:", {
        checkIn: validatedStartDate,
        checkOut: validatedEndDate,
      });
    }
  }, [startDateParam, endDateParam]);

  const handleDateClick = (date: Date) => {
    if (isBefore(date, today) && !isSameDay(date, today)) {
      return;
    }

    if (!checkInDate || (checkInDate && checkOutDate)) {
      setCheckInDate(date);
      setCheckOutDate(null);
      onSelectDate({ checkIn: date, checkOut: null });
    } else if (!checkOutDate && date > checkInDate) {
      setCheckOutDate(date);
      onSelectDate({ checkIn: checkInDate, checkOut: date });
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const generateDates = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dates = [];
    let day = startDate;

    while (day <= endDate) {
      dates.push(day);
      day = addDays(day, 1);
    }

    return dates;
  };

  return (
    <>
      <div className="calendar-container">
        <div className="header flex justify-between items-center">
          <button className="text-xl font-bold p-2" onClick={handlePrevMonth}>
            <GoChevronLeft />
          </button>
          <p className="text-[1rem] font-montserrat font-medium">{format(currentDate, 'MMMM yyyy')}</p>
          <button className="text-xl font-bold p-2" onClick={handleNextMonth}>
            <GoChevronRight />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-2 mt-4 font-montserrat font-medium text-[0.7rem]">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
            <div key={index} className="text-center font-bold">
              {day}
            </div>
          ))}
          {generateDates().map((date, index) => {
            const isInRange = checkInDate && checkOutDate && isWithinInterval(date, { start: checkInDate, end: checkOutDate });
            const isCheckIn = checkInDate && isSameDay(date, checkInDate);
            const isCheckOut = checkOutDate && isSameDay(date, checkOutDate);
            const isPastDate = isBefore(date, today) && !isSameDay(date, today);

            return (
              <button
                key={index}
                onClick={() => handleDateClick(date)}
                disabled={isPastDate}
                className={`py-2 rounded-md
                  ${isPastDate ? 'text-gray-300 cursor-not-allowed' : 'rgb(222 104 52)'}
                  ${format(currentDate, 'M') !== format(date, 'M') ? 'text-gray-400' : ''}
                  ${isCheckIn ? 'checkin-active' : ''}
                  ${isCheckOut ? 'checkin-active' : ''}
                  ${isInRange ? 'range-active' : ''}`}
              >
                {format(date, 'd')}
              </button>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .checkin-active {
          background-color: rgb(222 104 52)!important;
          color: white;
        }
        .range-active {
          background-color: #bfdbfe;
          color: black;
        }
        .text-gray-300 {
          color: #d1d5db;
        }
        .cursor-not-allowed {
          cursor: not-allowed;
        }
        .text-black {
          color: #000;
        }
      `}</style>
    </>
  );
};

export default Calendar;
