"use client";
import React, { useState } from "react";
import moment from "moment";
import { useSearch } from "@/providers/context/RootContext";
import { FiPlus } from "react-icons/fi";
import { LuMinus, LuSearch } from "react-icons/lu";
import Calendar from "./_component/Calendar/Calendar";
import { addDays } from "date-fns";
import { STATUS } from "@/common/contstant";
import { useDestination } from "@/services/destination.service";

const Mobilecustomecheckoutform = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: locations } = useDestination({
    status: STATUS.ACTIVE,
    pageSize: 1000,
    pageIndex: 0,
    q: searchQuery,
  });
  const [locationSearch, setLocationSearch] = useSearch();
  // const options = [
  //     { value: 'chocolate', label: 'Chocolate' },
  //     { value: 'strawberry', label: 'Strawberry' },
  //     { value: 'vanilla', label: 'Vanilla' }
  // ]

  // const router = useRouter();
  // let [locationSearch, setLocationSearch] = useSearch();
  // const [handelform, setHandelform] = useState(true);
  // const [dropdownmenu, setDropdownmenu] = useState(false);
  // const [Checkin, setCheckIn] = useState(false);

  // const [showDateDisplay, setshowDateDisplay] = useState(false);

  // const [room, setRoom] = useState(1);
  // const [adult, setAdult] = useState(0);
  // const [children, setChildren] = useState(0);

  // const increseroom = () => {
  //     setRoom(room + 1)
  // }
  // const increseadult = () => {
  //     setAdult(adult + 1)
  // }
  // const incresechildren = () => {
  //     setChildren(children + 1)
  // }

  // const decremnt = () => {
  //     if (adult < 1) {
  //         return;
  //     }
  //     setAdult(adult - 1)
  // }
  // const decremntchildren = () => {
  //     if (children < 1) {
  //         return;
  //     }
  //     setChildren(children - 1)
  // }
  // const decremntroom = () => {
  //     if (room < 1) {
  //         return;
  //     }
  //     setRoom(room - 1)
  // }
  // const handleSelect = (ranges: any) => {
  //     setLocationSearch({
  //         ...locationSearch,
  //         startDate: ranges?.selection?.startDate,
  //         endDate: ranges?.selection?.endDate,
  //     });
  //     console.log(ranges);
  // };

  // const ref: any = useRef(null);
  // useEffect(() => {
  //     function handleOutside(event: any) {
  //         console.log("sdfsdfsdfsdfdf")
  //         if (!ref.current?.contains(event.target)) {
  //             // alert("Outside Clicked.");
  //             setHandelform(true)
  //             console.log("Outside Clicked. ");
  //         }
  //     }
  //     document.addEventListener("mousedown", handleOutside);
  //     return () => {
  //         document.removeEventListener("mousedown", handleOutside);
  //     };
  // }, [ref]);

  // const handleToggle = () => {
  //     setCheckIn(!Checkin);
  // };

  // function handleClickOutside(event: any) {
  //     if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
  //         console.log(Checkin, "checkin")

  //         if (Checkin) {
  //             setCheckIn(false);
  //         }
  //         else {

  //         }
  //     }
  //     else if (Checkin == false) {
  //     }
  // }

  // const wrapperRef: any = useRef(null);

  // useEffect(() => {
  //     document.addEventListener("mousedown", handleClickOutside);
  //     return () => {
  //         document.removeEventListener("mousedown", handleClickOutside);
  //     };
  // }, [wrapperRef, wrapperRef.current]);

  // const handleClick = () => {
  //     // setToggle(false)
  //     if (
  //         new Date(locationSearch?.endDate).getTime() <=
  //         new Date(locationSearch?.startDate).getTime()
  //     ) {
  //         toastError("Please Select Valid date");
  //         return;
  //     }
  //     let route = "property";
  //     router.push(
  //         `/${route}?startDate=${moment(new Date(locationSearch?.startDate)).format(
  //             "YYYY-MM-DD"
  //         )}&endDate=${moment(new Date(locationSearch?.endDate)).format(
  //             "YYYY-MM-DD"
  //         )}&adult=${locationSearch?.adult}&child=${locationSearch?.child}`
  //     );

  //     setDropdownmenu(!dropdownmenu);
  // };

  // const customStyles = {
  //     control: (base: any) => ({
  //         ...base,
  //         border: '1px solid #526b67 !important',
  //         boxShadow: '0 !important',
  //         padding:'3px',
  //         zindex:'3',
  //         minHeight:'20px',

  //     }),
  // }

  const [searchlist, setSearchlist] = useState([
    {
      searchlists: "Navi mumbai",
    },
    {
      searchlists: "manali uttarkhand",
    },
    {
      searchlists: "delhi",
    },
    {
      searchlists: "Navi mumbai",
    },
  ]);

  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [room, setRoom] = useState(1);
  const [adult, setAdult] = useState(1);
  const [children, setChildren] = useState(0);
  const [showSuggestion, setShowSuggestion] = useState(true);

  const increseroom = () => {
    setRoom(room + 1);
  };
  const increseadult = () => {
    setAdult(adult + 1);
  };
  const incresechildren = () => {
    setChildren(children + 1);
  };

  const decremntadult = () => {
    if (adult <= 1) {
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
    if (room <= 1) {
      return;
    }
    setRoom(room - 1);
  };
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  console.log(checkInDate, checkOutDate, "checkInDate");
  const nextStep = (id?: string) => {
    if (id) {
      setLocationSearch((prev) => {
        return {
          ...prev,
          locationId: id,
          startDate: checkInDate ? new Date(checkInDate) : new Date(),
          endDate: checkOutDate
            ? new Date(checkOutDate)
            : addDays(new Date(), 1),
          adult: 1,
          child: 0,
          room: 1,
        };
      });
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleDateSelection = ({ checkIn, checkOut }: any) => {
    console.log(checkIn, checkOut, "checkIn and checkOut");
    // if (checkIn) setCheckInDate(format(checkIn, 'dd-MM-yyyy'));
    if (checkIn) setCheckInDate(moment(checkIn).format("YYYY-MM-DD"));
    // if (checkOut) setCheckOutDate(format(checkOut, 'dd-MM-yyyy'));
    if (checkOut) setCheckOutDate(moment(checkOut).format("YYYY-MM-DD"));

    // Set params in URL
    const params = new URLSearchParams(window.location.search);
    if (checkIn) params.set("startDate", moment(checkIn).format("YYYY-MM-DD"));
    if (checkOut) params.set("endDate", moment(checkOut).format("YYYY-MM-DD"));
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`
    );
  };

  return (
    <>
      <div className="">
        {step === 1 && (
          <div className="step-1">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestion(true);
              }}
              onClick={() => setShowSuggestion(true)}
              onFocus={() => setShowSuggestion(true)}
              placeholder="Search for a Destination or a home"
              className="w-full font-montserrat focus:ring-0 outline-none  rounded-md h-[45px]"
            />

            {showSuggestion && (
              <ul
                className="px-3 py-5 h-[80vh] overflow-y-scroll"
                onBlur={() => setShowSuggestion(false)}
              >
                {locations &&
                  locations?.data?.length > 0 &&
                  locations?.data.map((el, index) => {
                    return (
                      <li
                        onClick={() => nextStep(el._id)}
                        key={index}
                        className="mb-4 font-montserrat flex items-center gap-2 text-[0.9rem] font-medium"
                      >
                        <LuSearch />
                        {el.name}
                      </li>
                    );
                  })}
              </ul>
            )}

            {/* <button onClick={nextStep} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md" >
                        Next
                    </button> */}
          </div>
        )}

        {step === 2 && (
          <div className="step-2">
            <h5 className="font-montserrat font-medium text-[1.2rem] text-[#000]">
              Add your dates
            </h5>
            <div className="flex gap-2 mt-5">
              <div className="checkin text-center">
                <label
                  htmlFor="checkin"
                  className="font-montserrat text-center font-semibold text-[#686868] text-[0.8rem] mb-3"
                >
                  Check in
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
                  className="font-montserrat text-center text-[#686868] font-semibold text-[0.8rem] mb-3"
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

            <div className="mt-4 flex justify-between absolute bottom-2 w-full  left-0 right-0 px-3">
              <button
                onClick={prevStep}
                className=" py-2 border px-4 rounded-md text-[0.9rem] font-montserrat"
              >
                Previous
              </button>
              <button
                onClick={() => nextStep()}
                className="bg-[#202a36] text-white py-2 px-10 text-[0.9rem] rounded-md font-montserrat"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="step-3">
            <h5 className="font-montserrat font-medium text-[1.2rem] text-[#000]">
              Add guest & room
            </h5>
            <p className="font-montserrat text-[0.7rem] mt-1 mb-3">
              You can select multipal opetion
            </p>

            <div className="font-montserrat border-b-[1px] text-[#000]  font-medium  border-b-black pb-1 mb-6 ">
              {" "}
              {room} Room{room > 1 ? "s" : ""} & {adult + children} Guest{children + adult > 1 ? "s" : ""}
            </div>

            <div className="flex justify-between mb-4 ">
              <div className="font-montserrat font-medium text-[1.1rem]">
                Room
              </div>
              <div className="flex gap-3 items-center">
                <button className="borderbutton" onClick={decremntroom}>
                  <LuMinus />{" "}
                </button>
                <p className="font-montserrat text-[1.2rem]">{room}</p>
                <button className="borderbutton" onClick={increseroom}>
                  <FiPlus />
                </button>
              </div>
            </div>
            <div className="flex justify-between mb-4 ">
              <div className="font-montserrat font-medium text-[1.1rem]">
                Adults
              </div>
              <div className="flex gap-3 items-center">
                <button className="borderbutton" onClick={decremntadult}>
                  <LuMinus />{" "}
                </button>
                <p className="font-montserrat text-[1.2rem]">{adult}</p>
                <button className="borderbutton" onClick={increseadult}>
                  <FiPlus />
                </button>
              </div>
            </div>

            <div className="flex justify-between mb-4 ">
              <div className="font-montserrat font-medium text-[1.1rem]">
                Children
              </div>
              <div className="flex gap-3 items-center">
                <button className="borderbutton" onClick={decremntchildren}>
                  <LuMinus />{" "}
                </button>
                <p className="font-montserrat text-[1.2rem]">{children}</p>
                <button className="borderbutton" onClick={incresechildren}>
                  <FiPlus />
                </button>
              </div>
            </div>

            <div className="mt-4 flex justify-between absolute bottom-2 w-full  left-0 right-0 px-3">
              <button
                onClick={prevStep}
                className="py-2 border   px-4 rounded-md text-[0.9rem] font-montserrat"
              >
                Previous
              </button>
              <a
                href={`/property?destination=${locationSearch?.locationId
                  }&startDate=${checkInDate ??
                  moment(locationSearch?.startDate).format("YYYY-MM-DD")
                  }&endDate=${checkOutDate ??
                  moment(locationSearch.endDate).format("YYYY-MM-DD")
                  }&adult=${adult}&child=${children}&room=${room}`}
                className="bg-[#202a36] text-white py-2 px-10 text-[0.9rem] rounded-md font-montserrat"
              >
                Next
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Mobilecustomecheckoutform;

{
  /* <div className="flex justify-between mb-4 ">
                                <div className="font-montserrat font-medium text-[1.1rem]">
                                Pets
                                </div>
                                <div className="flex gap-3 items-center">
                                    <button className='borderbutton'><LuMinus /> </button>
                                    <p className='font-montserrat text-[1.2rem]'>1</p>
                                    <button  className='borderbutton'><FiPlus /></button>
                                </div>
                            </div> */
}

// <div>
//     <div className="mb-3">
//         <p className='font-montserrat text-[1rem] mb-1'>Loaction</p>
//         <div className='mb-3'>
//             <Select options={options} styles={customStyles} />
//         </div>

//         <div className='mb-3'>
//             <p className='font-montserrat text-[1rem] mb-1'>Check In</p>
//             <div className="flex justify-between h-[48px] items-center py-1 px-3 cursor-pointer bg-white border" onClick={() => setCheckIn(!Checkin)} >
//                 <div className="flex gap-3">

//                 <IoCalendarClearOutline className="text-primarygray" />
//             </div>
//         </div>
//         <div className='mb-3'>
//             <p className='font-montserrat text-[1rem] mb-1'>Check Out</p>
//             <div className="flex justify-between h-[48px] items-center py-1 px-3 cursor-pointer bg-white border" onClick={() => setCheckIn(!Checkin)} >
//                 <span className=" text-navibule font-montserrat font-normal">
//                     {`${moment(new Date(locationSearch.endDate)).format(
//                         "ddd, MMM DD"
//                     )}`}{" "}
//                 </span>
//                 <IoCalendarClearOutline className="text-primarygray" />
//             </div>
//         </div>

//         <div className='mb-3'>
//             <p className='font-montserrat text-[1rem] mb-1'>Guests & Rooms </p>
//             <div
//                 className="flex justify-between h-[48px] items-center py-1 px-3 cursor-pointer bg-white border"
//                 onClick={() => {
//                     setDropdownmenu(!dropdownmenu);
//                     setCheckIn(false);
//                 }}
//             >
//                 {locationSearch.adult > 0 || locationSearch.child > 0 ? (
//                     <>
//                         <div className="text-[1rem] text-navibule font-montserrat font-normal">
//                             Children{" "}
//                             <span className="text-navibule font-montserrat font-medium">
//                                 {" "}
//                                 {locationSearch.child}{" "}
//                             </span>{" "}
//                             Adult{" "}
//                             <span className="text-navibule font-montserrat font-medium">
//                                 {locationSearch.adult}{" "}
//                             </span>{" "}
//                         </div>
//                     </>
//                 ) : (
//                     <>
//                         <FiUser className="text-primarygray" />
//                         <span className="text-navibule font-montserrat font-normal">
//                             Guests{" "}
//                         </span>
//                         <IoIosArrowDown className="text-primarygray" />
//                     </>
//                 )}
//             </div>
//         </div>

//     <button className='bg-[#202a37] w-full px-2 border-r-2 py-3 text-[#fff]'>Apply & Search</button>

//         {dropdownmenu ? (
//             <div className="absolute right-[0%] -mt-14   bg-white divide-y p-3 divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700">
//                 <div className="listaduil">
//                     <ul>
//                         <li className="flex mb-2">
//                             <div className="leftsidebar w-[70%]">
//                                 <h3 className="text-[1rem] text-navibule font-montserrat text-start"> Room </h3>
//                             </div>
//                             <div className="rightsidebar flex-1 flex gap-2">
//                                 <div
//                                     className="minuse border h-8 w-8 flex items-center justify-center rounded-lg cursor-pointer"
//                                     onClick={() =>
//                                         setLocationSearch({
//                                             ...locationSearch,
//                                             room:
//                                                 locationSearch.room > 1
//                                                     ? Number(locationSearch.room - 1)
//                                                     : 1,
//                                         })
//                                     }
//                                 >
//                                     -
//                                 </div>
//                                 <div className="count border h-8 w-8 flex items-center font-montserrat  justify-center rounded-lg">
//                                     {locationSearch.room}
//                                 </div>
//                                 <div
//                                     className="pluse border h-8 w-8 flex items-center justify-center rounded-lg cursor-pointer"
//                                     onClick={() =>
//                                         setLocationSearch({
//                                             ...locationSearch,
//                                             room: Number(locationSearch.room + 1),
//                                         })
//                                     }
//                                 >
//                                     +
//                                 </div>
//                             </div>
//                         </li>
//                         <li className="flex mb-2">
//                             <div className="leftsidebar w-[70%]">
//                                 <h3 className="text-[1rem] text-navibule font-montserrat text-start">
//                                     Adult
//                                 </h3>
//                             </div>
//                             <div className="rightsidebar flex-1 flex gap-2">
//                                 <div
//                                     className="minuse border h-8 w-8 flex items-center justify-center rounded-lg cursor-pointer"
//                                     onClick={() =>
//                                         setLocationSearch({
//                                             ...locationSearch,
//                                             adult:
//                                                 locationSearch.adult > 1
//                                                     ? Number(locationSearch.adult) - 1
//                                                     : 1,
//                                         })
//                                     }
//                                 >
//                                     -
//                                 </div>
//                                 <div className="count border h-8 w-8 flex items-center font-montserrat justify-center rounded-lg">
//                                     {locationSearch.adult}
//                                 </div>
//                                 <div
//                                     className="pluse border h-8 w-8 flex items-center justify-center rounded-lg cursor-pointer"
//                                     onClick={() =>
//                                         setLocationSearch({
//                                             ...locationSearch,
//                                             adult: Number(locationSearch.adult) + 1,
//                                         })
//                                     }
//                                 >
//                                     +
//                                 </div>
//                             </div>
//                         </li>
//                         <li className="flex">
//                             <div className="leftsidebar w-[70%]">
//                                 <h3 className="text-[1rem] text-navibule font-montserrat text-start">
//                                     Children
//                                 </h3>
//                             </div>
//                             <div className="rightsidebar flex-1 flex gap-2">
//                                 <div
//                                     className="minuse border h-8 w-8 flex items-center justify-center rounded-lg cursor-pointer"
//                                     onClick={() =>
//                                         setLocationSearch({
//                                             ...locationSearch,
//                                             child:
//                                                 locationSearch.child > 1
//                                                     ? Number(locationSearch.child - 1)
//                                                     : 0,
//                                         })
//                                     }
//                                 >
//                                     -
//                                 </div>
//                                 <div className="count border h-8 w-8 flex items-center font-montserrat justify-center rounded-lg">
//                                     {locationSearch.child}
//                                 </div>
//                                 <div
//                                     className="pluse border h-8 w-8 flex items-center justify-center rounded-lg cursor-pointer"
//                                     onClick={() =>
//                                         setLocationSearch({
//                                             ...locationSearch,
//                                             child: Number(locationSearch.child + 1),
//                                         })
//                                     }
//                                 >
//                                     +
//                                 </div>
//                             </div>
//                         </li>
//                     </ul>
//                     <div className="text-center mt-5">
//                         <button
//                             className="bg-navibule rounded-md font-montserrat inline-block px-4 py-3 text-[white] w-full"
//                             onClick={() => handleClick()}
//                         >
//                             Done
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         ) : (
//             ""
//         )}

//         <div className="" ref={wrapperRef}>
//             {Checkin && (
//                 <>
//                     <DateRangePicker
//                         ranges={[
//                             {
//                                 startDate: locationSearch
//                                     ? locationSearch.startDate
//                                     : new Date(),
//                                 endDate: locationSearch
//                                     ? locationSearch.endDate
//                                     : addDays(new Date(), 7),
//                                 key: "selection",
//                             },
//                         ]}
//                         moveRangeOnFirstSelection={false}
//                         months={2}
//                         onChange={handleSelect}
//                         direction="horizontal"
//                         preventSnapRefocus={true}
//                         calendarFocus="forwards"
//                         showMonthAndYearPickers={false}
//                     />
//                 </>
//             )}
//         </div>

//     </div>
// </div>
