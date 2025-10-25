import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { LuMinus } from "react-icons/lu";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import Calendar from "../homepagecomponents/Mobilecustomecheckoutform/_component/Calendar/Calendar";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isWithinInterval,
  isSameDay,
} from "date-fns";
import Link from "next/link";
import { SearchDateInput, useSearch } from "@/providers/context/RootContext";
import moment from "moment";
import { toastError } from "@/utils/toast";
import { getRoomsAvailablesApi } from "@/services/rate.service";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const Detailspageform = ({ setTagglefilterbottm, setBooknow, propertyId, price }: any) => {
  let cancelToken: any;

  const [step, setStep] = useState(1);
  const [room, setRoom] = useState(1);
  const [adult, setAdult] = useState(1);
  const [children, setChildren] = useState(0);
  const [isAvailable, setisAvailable] = useState(false);
  const [totalPrice, settotalPrice] = useState(0);
  const [maxRooms, setMaxRooms] = useState(0);
  const router = useRouter();

  const increseroom = () => {
    if (maxRooms > 0 && room >= maxRooms) {
      console.log("maxRooms", maxRooms, "room", room);
      toastError(`Maximum ${maxRooms} rooms allowed`);
      return;
    }
    setRoom(room + 1);
  };

  const increseadult = () => {
    setAdult(adult + 1);
  };
  const incresechildren = () => {
    setChildren(children + 1);
  };

  const decremntadult = () => {
    if (adult < 1) {
      return;
    }
    setAdult(adult - 1);
  };
  const decremntchildren = () => {
    if (children < 1) {
      return;
    }
    setChildren(children - 1);
  };
  const decremntroom = () => {
    if (room === 1) {
      return;
    }
    setRoom(room - 1);
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  const handleDateSelection = ({ checkIn, checkOut }: any) => {
    if (checkIn) setCheckInDate(moment(checkIn).format("YYYY-MM-DD"));
    if (checkOut) setCheckOutDate(moment(checkOut).format("YYYY-MM-DD"));
  };




  const handelbooknow = () => {
    setBooknow(true);
    setTagglefilterbottm((prev: any) => !prev);
  };






  const handleapayment = async () => {
    let toPrice = 0;
    try {
      if (typeof cancelToken != typeof undefined) {
        cancelToken.cancel("Cacencel ....");
      }
      let cancelTokenValue = axios.CancelToken.source();
      console.log("render||")
      const startDate = new Date(checkInDate);
      const endDate = new Date(checkOutDate);
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);
      let obj: any = { adult, child: children, startDate, endDate, propertyId };

      console.log("Search Objec", obj.startDate, obj.endDate);
      let { data: res } = await getRoomsAvailablesApi(obj, cancelTokenValue);
      if (res.data) {
        console.log("res", res);
        if (res.data && res.data?.length > 0) {
          console.log("res.data", res.data);
          //  setRateArr(res.rateArr[0].dayBreakdown);
          let isAv = res.data.some((el: any) => el.isAvailable == true);

          if (isAv) {
            toPrice = res.data.reduce(
              (acc: any, curr: any) => acc + curr.price,
              0
            );
            const guestLimit = res.hotel.guest;

            const guestPriceArr = res.hotel.guestPriceArr || [];

            const totalGuests =
              Number(adult) + Number(children);
            const excessGuests = Math.max(0, totalGuests - guestLimit);

            if (excessGuests > guestPriceArr.length) {
              setTagglefilterbottm(false);
              toastError(`Cannot accommodate ${excessGuests} extra guests. Maximum additional guests allowed: ${guestPriceArr.length}`);
              return;
            }
            let additionalPrice = 0;
            for (let i = 0; i < excessGuests && i < guestPriceArr.length; i++) {
              additionalPrice += guestPriceArr[i].price;
            }

            // Update total price with additional guest charges
            toPrice += additionalPrice;

          }
          if (res.missingDatesInfo) {
            res.missingDatesInfo.datesWithoutRates.forEach((element: Date) => {
              toPrice += price
            });
          }
          setisAvailable(isAv);
          console.log(toPrice, "toPrice");
          settotalPrice(toPrice);
          //     setstotalPrice(toPrice);
          //     setisAvailable(isAv);
        }
      }
      if (res.data) {
        if (res.hotel && res.hotel.bedroom) {
          setMaxRooms(res.hotel.bedroom);
        }
      }
      if (!checkInDate || !checkOutDate) {
        setTagglefilterbottm(false);
        toastError("Please select check-in and check-out dates");
        return;
      }
      console.log("render||", toPrice)
      let quwry = `/payment?propertyId=${propertyId}&startDate=${moment(
        new Date(checkInDate)
      ).format("YYYY-MM-DD")}&endDate=${moment(
        new Date(checkOutDate)
      ).format("YYYY-MM-DD")}&adult=${adult}&child=${children
        }&totalPrice=${toPrice}&basePrice=${price}`;
      router.push(quwry);
    } catch (error: any) {
      toastError(error?.response?.data?.message || "Something went wrong");
      setTagglefilterbottm(false);
      // return;
    }
  };


  return (
    <>
      {step === 1 && (
        <div className="step-2">
          <h5
            className="font-montserrat font-medium text-[1.2rem] text-[#000] flex gap-2 items-center"
            onClick={() => setTagglefilterbottm(false)}
          >
            {" "}
            <MdOutlineKeyboardBackspace className="text-[1.3rem]" /> &nbsp; Add your date</h5>
          <div className="flex gap-2 mt-9">
            <div className="checkin text-center">
              <label
                htmlFor="checkin"
                className="font-montserrat text-center font-semibold text-[#686868] text-[0.8rem] mb-3"
              >
                Check
              </label>
              <input
                type="text"
                id="checkin"
                value={checkInDate}
                readOnly
                className="w-full font-bold text-[#202a36] font-montserrat text-center border-t-0 border-x-0 focus:outline-none focus:ring-0 focus:outline-0 border-b-1 border-b-black "
              />
            </div>
            <div className="checkout text-center">
              <label
                htmlFor="checkout"
                className="font-montserrat text-center font-semibold text-[#686868] text-[0.8rem] mb-3"
              >
                Check Out
              </label>
              <input
                type="text"
                id="checkout"
                value={checkOutDate}
                readOnly
                className="font-bold text-[#202a36] w-full font-montserrat text-center border-t-0 border-x-0 focus:outline-none focus:ring-0 focus:outline-0 border-b-1 border-b-black"
              />
            </div>
          </div>

          <Calendar onSelectDate={handleDateSelection} />

          <div className="mt-4 flex justify-between absolute bottom-2 w-full  left-0 right-0 px-3  border-t pt-2">
            <button
              onClick={() => {
                router.replace(window.location.pathname, { scroll: false });
                setCheckInDate("");
                setCheckOutDate("");
                // setTagglefilterbottm(false)
              }}
              className=" py-2 px-4 rounded-md text-[0.9rem] font-montserrat"
            >
              Clear All
            </button>
            <button
              // onClick={() => handelbooknow()}
              onClick={nextStep}
              className="bg-[#202a36] text-white py-2 px-10 text-[1rem] font-bold rounded-md font-montserrat"
            >
              Next
            </button>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="step-1">
          <div className="step-3">
            <p
              className="font-montserrat text-[1rem] font-bold text-[#000] flex gap-2 items-center"
              onClick={() => prevStep()}
            >
              {" "}
              <MdOutlineKeyboardBackspace className="text-[1.3rem]" /> &nbsp;
              Add guest & room
            </p>
            {/* <p className='font-montserrat text-[0.7rem] mt-1 mb-3'>You can select multipal opetion</p> */}

            <div className="font-montserrat border-b-[1px] text-[#000]  font-medium  border-b-black pb-1 mb-6 mt-5 ">
              {" "}
              {adult} Adult - {room} Room
            </div>

            <div className="flex justify-between mb-4 ">
              <div className="font-montserrat font-medium text-[1.1rem]">
                Room
              </div>
              <div className="flex gap-3 items-center">
                <button
                  className="borderbutton"
                  onClick={() =>
                    decremntroom()
                  }
                >
                  <LuMinus />{" "}
                </button>
                <p className="font-montserrat text-[1.2rem]">{room}</p>
                <button
                  className="borderbutton"
                  onClick={() =>
                    increseroom()
                  }
                >
                  <FiPlus />
                </button>
              </div>
            </div>
            <div className="flex justify-between mb-4 ">
              <div className="font-montserrat font-medium text-[1.1rem]">
                Adults
              </div>
              <div className="flex gap-3 items-center">
                <button
                  className="borderbutton"
                  onClick={() =>
                    decremntadult()
                  }
                >
                  <LuMinus />{" "}
                </button>
                <p className="font-montserrat text-[1.2rem]">{adult}</p>
                <button
                  className="borderbutton"
                  onClick={() =>
                    increseadult()
                  }
                >
                  <FiPlus />
                </button>
              </div>
            </div>

            <div className="flex justify-between mb-4 ">
              <div className="font-montserrat font-medium text-[1.1rem]">
                <p>
                  Child
                </p>
                <small className="font-montserrat text-gray-400">Age 6 - 12 years</small>
              </div>
              <div className="flex gap-3 items-center">
                <button
                  className="borderbutton"
                  onClick={() =>
                    decremntchildren()
                  }
                >
                  <LuMinus />{" "}
                </button>
                <p className="font-montserrat text-[1.2rem]">{children}</p>
                <button
                  className="borderbutton"
                  onClick={() =>
                    incresechildren()
                  }>
                  <FiPlus />
                </button>
              </div>
            </div>
            {/* <div className="flex justify-between mb-4 ">
                                <div className="font-montserrat font-medium text-[1.1rem]">
                                Pets
                                </div>
                                <div className="flex gap-3 items-center">
                                    <button className='borderbutton'><LuMinus /> </button>
                                    <p className='font-montserrat text-[1.2rem]'>1</p>
                                    <button  className='borderbutton'><FiPlus /></button>
                                </div>
                            </div> */}

            <div className="mt-4 flex justify-between absolute bottom-2 w-full  left-0 right-0 px-3 border-t pt-2">
              <button
                onClick={prevStep}
                className=" py-2 px-4 rounded-md text-[0.9rem] font-montserrat"
              >
                Clear All
              </button>
              <p onClick={handleapayment}
                className="bg-[#202a36] text-white py-2 px-10 text-[1rem] font-bold rounded-md font-montserrat"
              >

                Save
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Detailspageform;
