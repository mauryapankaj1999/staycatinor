import React, { useState, useEffect } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  isSameDay,
  isWithinInterval,
  isToday,
  isBefore,
  startOfToday,
} from "date-fns";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { useSearch } from "@/providers/context/RootContext";
import moment from "moment";

export default function Twomonthcalender({ onSelectDate, setShowcalender }: any) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [rangeEnd, setRangeEnd] = useState<Date | null>(null);
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [currentDate, setCurrentDate] = useState(startOfToday());
  const [locationSearch, setLocationSearch] = useSearch();

  // Initialize selected dates from locationSearch when component mounts
  useEffect(() => {
    if (locationSearch?.startDate && locationSearch?.endDate) {
      setSelectedDate(new Date(locationSearch.startDate));
      setRangeEnd(new Date(locationSearch.endDate));
    } else if (locationSearch?.startDate) {
      setSelectedDate(new Date(locationSearch.startDate));
      setRangeEnd(null);
    }
  }, [locationSearch?.startDate, locationSearch?.endDate]);

  const isPastMonth = isBefore(startOfMonth(currentDate), startOfMonth(startOfToday()));

  const handlePrevMonth = () => {
    if (!isPastMonth) {
      setCurrentDate((prev) => addMonths(prev, -1));
    }
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => addMonths(prev, 1));
  };

  const selectDate = (date: Date) => {
    if (isBefore(date, startOfToday())) return;

    if (!selectedDate) {
      setSelectedDate(date);
      setRangeEnd(null);
    } else if (!rangeEnd) {
      if (date > selectedDate) {
        setRangeEnd(date);
        setShowcalender(false);
        onSelectDate(selectedDate, date);
        setLocationSearch({
          ...locationSearch,
          startDate: new Date(selectedDate),
          endDate: new Date(date),
        });
      } else {
        setSelectedDate(date);
        setRangeEnd(null);
      }
    } else {
      setSelectedDate(date);
      setRangeEnd(null);
    }
  };

  const generateDates = (baseDate: Date) => {
    const monthStart = startOfMonth(baseDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const dates: (Date | null)[] = [];

    let day = startDate;
    while (day <= endDate) {
      dates.push(
        format(day, "MM yyyy") === format(baseDate, "MM yyyy") ? day : null
      );
      day = addDays(day, 1);
    }
    return dates;
  };

  const renderMonth = (baseDate: Date) => {
    const dates = generateDates(baseDate);
    const weeks = dates.reduce<(Date | null)[][]>(
      (acc, date, i) => {
        const weekIndex = Math.floor(i / 7);
        acc[weekIndex] = acc[weekIndex] || [];
        acc[weekIndex].push(date);
        return acc;
      },
      []
    );

    return (
      <div className="month-grid">
        <div className="weekdays font-montserrat">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="weekday font-montserrat">
              {day}
            </div>
          ))}
        </div>
        {weeks.map((week, index) => (
          <div key={index} className="week-row font-montserrat">
            {week.map((date, idx) => {
              if (!date) return <div key={idx} className="day empty" />;
              const isSelected = selectedDate && isSameDay(date, selectedDate);
              const isRangeEnd = rangeEnd && isSameDay(date, rangeEnd);
              const isInRange =
                selectedDate &&
                (rangeEnd || hoveredDate) &&
                isWithinInterval(date, {
                  start: selectedDate,
                  end: rangeEnd || hoveredDate!,
                });
              const isCurrentDay = isToday(date);
              const isPast = isBefore(date, startOfToday());

              return (
                <button
                  key={idx}
                  onClick={() => selectDate(date)}
                  onMouseEnter={() => !isPast && setHoveredDate(date)}
                  disabled={isPast}
                  className={`font-montserrat day
                    ${isPast ? "text-gray-400" : ""}
                    ${isCurrentDay ? "today" : ""}
                    ${isSelected ? "selected" : ""}
                    ${isInRange ? "in-range" : ""}
                    ${isRangeEnd ? "active end-selected" : ""}`}
                >
                  {format(date, "d")}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="calendar-container customecalender font-montserrat">
      <div className="months-display">
        <div className="month">
          <div className="flex justify-between mb-3">
            <button onClick={handlePrevMonth} disabled={isPastMonth}>
              <GoChevronLeft
                className={`text-[1rem] lg:text-[1.5rem] ${isPastMonth ? "opacity-50 cursor-not-allowed" : ""}`}
              />
            </button>
            <p className="font-semibold">{format(currentDate, "MMMM yyyy")}</p>
            <p> </p>
          </div>
          {renderMonth(currentDate)}
        </div>
        <div className="month">
          <div className="flex justify-between mb-3">
            <p> </p>
            <p className="font-semibold">
              {format(addMonths(currentDate, 1), "MMMM yyyy")}
            </p>
            <button onClick={handleNextMonth}>
              <GoChevronRight className="text-[1rem] lg:text-[1.5rem]" />
            </button>
          </div>
          {renderMonth(addMonths(currentDate, 1))}
        </div>
      </div>
    </div>
  );
}
