"use client";
import React, { useEffect, useRef, useState } from "react";
import { RiArrowUpDownFill } from "react-icons/ri";
import Link from "next/link";
import moment from "moment";
import { toastError } from "@/utils/toast";
import axios from "axios";
import { getRoomsAvailablesApi } from "@/services/rate.service";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import Twomonthcalender from "@/app/(WithHeaderandFooter)/customecalneder/_Component/Monthcalender/Twomonthcalender";
import { formatPrice } from "@/utils/formatPrice";
import { useSearch } from "@/providers/context/RootContext";

type EnqueryformProps = {
  propertyId: string;
  review?: number;
  price: number;
};

interface SearchState {
  startDate: Date | null;
  endDate: Date | null;
  adult: number;
  child: number;
  room: number;
}

const Enqueryform = ({ propertyId, price, review = 0 }: EnqueryformProps) => {
  let cancelToken: any;

  const [searchState, setSearchState] = useState<SearchState>({
    startDate: null,
    endDate: null,
    adult: 1,
    child: 0,
    room: 1,
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const [guestArr, setGuestArr] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize state from URL parameters - only once on mount
  useEffect(() => {
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const adult = searchParams.get("adult");
    const child = searchParams.get("child");
    const room = searchParams.get("room");

    const formattedStartDate = startDate ? new Date(startDate) : null;
    const formattedEndDate = endDate ? new Date(endDate) : null;

    if (formattedStartDate) formattedStartDate.setHours(0, 0, 0, 0);
    if (formattedEndDate) formattedEndDate.setHours(0, 0, 0, 0);

    setSearchState({
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      adult: adult ? parseInt(adult) : 1,
      child: child ? parseInt(child) : 0,
      room: room ? parseInt(room) : 1,
    });

    setIsInitialized(true);
  }, []); // Empty dependency array - runs only once on mount

  const [isAvailable, setisAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, settotalPrice] = useState(0);
  const [adultshow, setAdultshow] = useState(false);
  const [showcalender, setShowcalender] = useState(false);
  const [istermsandcondition, setIstermsandcondition] = useState(false);
  const [maxGuests, setMaxGuests] = useState(0);
  const [maxRooms, setMaxRooms] = useState(1);

  const [locationSearch, setLocationSearch] = useSearch();
  // Update URL when search state changes (only after initialization)
  useEffect(() => {
    if (!isInitialized) return;

    const query: any = {};

    if (searchState.startDate) {
      query.startDate = moment(searchState.startDate).format("YYYY-MM-DD");
    }

    if (searchState.endDate) {
      query.endDate = moment(searchState.endDate).format("YYYY-MM-DD");
    }

    if (searchState.adult) {
      query.adult = searchState.adult;
    }

    if (searchState.child) {
      query.child = searchState.child;
    }

    if (searchState.room) {
      query.room = searchState.room;
    }
    setLocationSearch({
      ...locationSearch,
      startDate: searchState.startDate ?? "",
      endDate: searchState.endDate ?? "",
    });
    // Create URL without causing a page reload
    const newQueryString = new URLSearchParams(query).toString();
    const newUrl = `${window.location.pathname}?${newQueryString}`;

    // Use replaceState instead of pushState to avoid adding to history
    window.history.replaceState(null, "", newUrl);
  }, [searchState, isInitialized]);

  // Check availability when search state changes
  useEffect(() => {
    if (propertyId && isInitialized) {
      getAvailabiltyDetails();
    }
  }, [searchState, propertyId, isInitialized]);

  const getAvailabiltyDetails = () => {
    if (
      searchState.endDate &&
      searchState.startDate &&
      searchState.endDate.getTime() <= searchState.startDate.getTime()
    ) {
      toastError("Please Select Valid date");
      return;
    }

    if (typeof cancelToken != typeof undefined) {
      cancelToken.cancel("Cancel ....");
    }
    cancelToken = axios.CancelToken.source();

    handleGetAvailabilty(searchState, cancelToken);
  };

  const handleGetAvailabilty = async (
    searchObj: SearchState,
    cancelTokenValue: any
  ) => {
    setisAvailable(false);
    setIsLoading(true);
    setGuestArr(0);
    try {
      let obj: any = { ...searchObj, propertyId };
      let { data: res } = await getRoomsAvailablesApi(obj, cancelTokenValue);

      if (res.data && res.data?.length > 0) {
        let totalPrice = 0;
        let isAvailable = res.data.some(
          (room: any) => room.isAvailable == true
        );

        if (isAvailable) {
          totalPrice = res.data
            .filter(
              (room: any) =>
                typeof room.price === "number" && !isNaN(room.price)
            )
            .reduce((total: number, room: any) => total + room.price, 0);

          const guestLimit = res.hotel.guest;
          const guestPriceArr = res.hotel.guestPriceArr || [];
          let guestPrice = 0;

          const totalGuests =
            Number(searchState.adult) + Number(searchState.child);
          const excessGuests = Math.max(0, totalGuests - guestLimit);

          if (totalGuests > guestLimit + guestPriceArr.length) {
            setisAvailable(false);
            setIsLoading(false);
            return;
          }

          setMaxGuests(guestLimit + guestPriceArr.length);

          let additionalPrice = 0;
          for (let i = 0; i < excessGuests && i < guestPriceArr.length; i++) {
            guestPrice += guestPriceArr[i].price;
            additionalPrice += guestPriceArr[i].price;
          }
          if (totalGuests > guestLimit) {
            setGuestArr(guestPrice);
          } else {
            setGuestArr(0); // Reset to 0 if within guest limit
          }
          totalPrice += additionalPrice;
        }

        if (res.missingDatesInfo) {
          res.missingDatesInfo.datesWithoutRates.forEach((date: Date) => {
            totalPrice += Number(price);
          });
        }

        setisAvailable(isAvailable);
        settotalPrice(totalPrice);
      }

      if (res.data && res.hotel?.bedroom) {
        setMaxRooms(res.hotel.bedroom);
      }

      setIsLoading(false);
    } catch (error: any) {
      toastError(error?.response?.data?.message || error);
      setIsLoading(false);
      setGuestArr(0);
    }
  };

  const handleapayment = () => {
    if (!istermsandcondition) {
      toastError("please accept terms and conditions");
      return;
    }

    if (
      searchState.endDate &&
      searchState.startDate &&
      searchState.endDate.getTime() <= searchState.startDate.getTime()
    ) {
      toastError("Please Select Valid date");
      return;
    }

    let query = `/payment?propertyId=${propertyId}&startDate=${moment(
      searchState.startDate || new Date()
    ).format("YYYY-MM-DD")}&endDate=${moment(
      searchState.endDate || new Date()
    ).format("YYYY-MM-DD")}&adult=${searchState.adult}&child=${
      searchState.child
    }&totalPrice=${totalPrice}&room=${
      searchState.room
    }&basePrice=${price}&GuestPrice=${guestArr}`;

    router.push(query);
  };

  const handleDateSelection = (checkIn: Date | null, checkOut: Date | null) => {
    setSearchState((prev) => ({
      ...prev,
      startDate: checkIn,
      endDate: checkOut,
    }));
  };

  const wrapperRef: any = useRef(null);
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowcalender(false);
        setAdultshow(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <>
      <div className="sticky lg:top-[165px] 2xl:top-[145px]">
        <div className="propertyformgradent">
          <div className="lg:p-2 xl:p-4 rounded-md relative">
            <div className="flex justify-between items-center mb-3">
              {!searchState.startDate && !searchState.endDate && (
                <div className=" flex items-center">
                  <h3 className="font-montserrat font-semibold text-navibule xl:text-[19px] 2xl:text-[30px]">
                    ₹{price > 0 ? formatPrice(price) : ""}/-
                  </h3>
                  <span className=" ml-2 font-montserrat text-[#555]  lg:text-[12px] font-medium mb-0 text-[12px] inline-block">
                    night + taxes
                  </span>
                </div>
              )}
              {review > 0 && (
                <div className="font-montserrat text-primarygray font-medium flex items-center gap-1">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.9631 5.36985C13.871 5.08637 13.6195 4.88567 13.3232 4.85886L9.28184 4.49195L7.68466 0.752632C7.56674 0.477908 7.29842 0.300598 6.99977 0.300598C6.70112 0.300598 6.4327 0.477908 6.31553 0.752632L4.71835 4.49195L0.67632 4.85886C0.38002 4.8862 0.129115 5.0869 0.0364013 5.36985C-0.0557786 5.65333 0.0293516 5.96427 0.253446 6.1608L3.30841 8.83957L2.40766 12.8068C2.34175 13.0985 2.45498 13.4002 2.69701 13.5751C2.82711 13.6697 2.97996 13.7169 3.13335 13.7169C3.26515 13.7169 3.39707 13.6818 3.51488 13.6114L6.99977 11.5276L10.484 13.6114C10.7396 13.7641 11.061 13.7501 11.3025 13.5751C11.5446 13.4002 11.6578 13.0985 11.5919 12.8068L10.6911 8.83957L13.7461 6.1608C13.9701 5.96427 14.0553 5.65397 13.9631 5.36985V5.36985Z"
                      fill="#FBA919"
                    ></path>
                  </svg>{" "}
                  {review}
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3 justify-between">
              <div className="">
                <label
                  htmlFor="Check-in"
                  className="font-montserrat text-[#000] font-medium lg:text-[14px] 2xl:text-[16px] mb-2 inline-block"
                >
                  Check-in
                </label>
                <div
                  className="font-montserrat cursor-pointer rounded-md text-primarygray border px-3 py-2 lg:text-[13px] 2xl:text-[16px]"
                  onClick={() => setShowcalender(!showcalender)}
                >
                  {searchState.startDate
                    ? format(searchState.startDate, "dd/MM/yyyy")
                    : "dd/mm/yyyy"}
                </div>
              </div>
              <div className="">
                <label
                  htmlFor="Check-out"
                  className=" font-montserrat text-[#000] font-medium lg:text-[14px] 2xl:text-[16px] mb-2 inline-block"
                >
                  Check-out
                </label>
                <div
                  className="font-montserrat cursor-pointer rounded-md text-primarygray border px-3 py-2 lg:text-[13px] 2xl:text-[16px]"
                  onClick={() => setShowcalender(!showcalender)}
                >
                  {searchState.endDate
                    ? format(searchState.endDate, "dd/MM/yyyy")
                    : "dd/mm/yyyy"}
                </div>
              </div>

              {showcalender && (
                <div
                  className="absolute top-28 right-0 bg-white z-50"
                  ref={wrapperRef}
                >
                  <Twomonthcalender
                    setShowcalender={setShowcalender}
                    onSelectDate={handleDateSelection}
                  />
                </div>
              )}
            </div>

            <div className="relative mt-4">
              <div
                onClick={() => setAdultshow(!adultshow)}
                className="cursor-pointer"
              >
                <p className="font-montserrat text-[#000] lg:text-[14px] 2xl:text-[16px] font-medium mb-2 inline-block">
                  Guests
                </p>
                <div className="flex justify-between border py-3 px-2 rounded-md items-center">
                  <p className="font-montserrat text-primarygray font-normal lg:text-[13px] 2xl:text-[16px]">
                    {searchState.room} Room
                    {searchState.room > 1 ? "s" : ""} &{" "}
                    {searchState.adult + searchState.child} Guest
                    {searchState.child + searchState.adult > 1 ? "s" : ""}
                  </p>
                  <h6>
                    <RiArrowUpDownFill className="lg:text-[13px] 2xl:text-[16px] text-primarygray" />
                  </h6>
                </div>
              </div>

              {adultshow && (
                <div
                  className="absolute top-20 w-full bg-white shadow-md py-4 px-2 border z-40"
                  ref={wrapperRef}
                >
                  <ul>
                    <li className="flex mb-2 items-center">
                      <div className="leftsidebar w-[70%]">
                        <p className="font-montserrat text-primarygray font-medium mb-2 inline-block lg:text-[14px] 2xl:text-[16px]">
                          Room
                        </p>
                      </div>
                      <div className="rightsidebar flex-1 flex gap-2">
                        <div
                          className={`minuse border h-8 w-8 flex items-center
                        justify-center rounded-lg cursor-pointer
                        font-montserrat ${
                          searchState.room <= 1
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : ""
                        }`}
                          onClick={() =>
                            setSearchState({
                              ...searchState,
                              room:
                                searchState.room > 1
                                  ? Number(searchState.room - 1)
                                  : 1,
                            })
                          }
                        >
                          -
                        </div>
                        <div className="count border h-8 w-8 flex items-center justify-center rounded-lg font-montserrat text-black font-medium">
                          {searchState.room}
                        </div>
                        <div
                          className={`pluse border ${
                            searchState.room < maxRooms
                              ? ""
                              : "bg-gray-100 text-gray-400 cursor-not-allowed"
                          } h-8 w-8 flex items-center justify-center rounded-lg cursor-pointer  font-montserrat`}
                          onClick={() =>
                            setSearchState({
                              ...searchState,
                              room:
                                searchState.room < maxRooms
                                  ? Number(searchState.room + 1)
                                  : maxRooms,
                            })
                          }
                        >
                          +
                        </div>
                      </div>
                    </li>
                    <li className="flex mb-2">
                      <div className="leftsidebar w-[70%]">
                        <p className="font-montserrat text-primarygray font-medium mb-2 inline-block text-[1rem]">
                          Adult
                        </p>
                      </div>
                      <div className="rightsidebar flex-1 flex gap-2">
                        <div
                          className={`minuse border h-8 w-8 flex items-center justify-center rounded-lg cursor-pointer  font-montserrat ${
                            searchState.adult <= 1
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : ""
                          }`}
                          onClick={() =>
                            setSearchState({
                              ...searchState,
                              adult:
                                searchState.adult > 1
                                  ? Number(searchState.adult) - 1
                                  : 1,
                            })
                          }
                        >
                          -
                        </div>
                        <div className="count border h-8 w-8 flex items-center justify-center rounded-lg font-montserrat text-black font-medium">
                          {searchState.adult}
                        </div>
                        <div
                          className={`pluse border h-8 w-8 flex items-center justify-center rounded-lg cursor-pointer font-montserrat ${
                            searchState.adult + searchState.child >= maxGuests
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : ""
                          }`}
                          onClick={() => {
                            const currentTotal =
                              searchState.adult + searchState.child;
                            if (currentTotal < maxGuests) {
                              setSearchState({
                                ...searchState,
                                adult: Number(searchState.adult) + 1,
                              });
                            }
                          }}
                        >
                          +
                        </div>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="leftsidebar w-[70%]">
                        <div>
                          <p className="font-montserrat text-primarygray font-medium mb-2 inline-block lg:text-[14px] 2xl:text-[16px]">
                            Child
                          </p>
                        </div>
                        <small className="font-montserrat text-gray-400">
                          Age 6 - 12 years
                        </small>
                      </div>
                      <div className="rightsidebar flex-1 flex gap-2">
                        <div
                          className={`minuse border h-8 w-8 flex items-center justify-center rounded-lg cursor-pointer  font-montserrat ${
                            searchState.child <= 0
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : ""
                          }`}
                          onClick={() =>
                            setSearchState({
                              ...searchState,
                              child:
                                searchState.child > 1
                                  ? Number(searchState.child - 1)
                                  : 0,
                            })
                          }
                        >
                          -
                        </div>
                        <div className="count border h-8 w-8 flex items-center justify-center rounded-lg font-montserrat text-black font-medium">
                          {searchState.child}
                        </div>
                        <div
                          className={`pluse border h-8 w-8 flex items-center justify-center rounded-lg cursor-pointer font-montserrat ${
                            searchState.adult + searchState.child >= maxGuests
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : ""
                          }`}
                          onClick={() => {
                            const currentTotal =
                              searchState.adult + searchState.child;
                            if (currentTotal < maxGuests) {
                              setSearchState({
                                ...searchState,
                                child: Number(searchState.child + 1),
                              });
                            }
                          }}
                        >
                          +
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {isAvailable && totalPrice > 0 && (
              <div className="border-b flex justify-between items-center mt-5 py-2">
                <h4 className="font-montserrat font-semibold text-[20px] text-navibule">
                  Total
                </h4>
                <h4 className="font-montserrat font-semibold text-[20px] text-navibule">
                  ₹{formatPrice(totalPrice)}
                </h4>
              </div>
            )}

            <div className="mt-5">
              <label className="inline-flex">
                <input
                  type="checkbox"
                  checked={istermsandcondition}
                  onChange={(e) => setIstermsandcondition(e.target.checked)}
                  className="h-3 w-3  border-[#767676] focus:outline-none bg-white  focus:ring-0 inputcustom mt-1"
                />
                <span className="ml-2 font-montserrat text-[0.7rem]">
                  I have read and accepted the{" "}
                  <Link
                    href="/TermsandCondition"
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    Terms & Conditions,
                  </Link>{" "}
                  and{" "}
                  <Link
                    target="_blank"
                    href="/cancellationPolicy"
                    className="text-blue-600 underline"
                  >
                    Cancellation Policy.
                  </Link>{" "}
                </span>
              </label>
            </div>

            <div className="mt-3">
              {isLoading && (
                <button className="bg-[#da6633] py-3 px-5 font-montserrat font-medium text-white rounded-md block w-full">
                  Loading
                </button>
              )}
              {isAvailable && totalPrice > 0 ? (
                <button
                  className="bg-[#da6633] py-3 px-5 font-montserrat font-medium text-white rounded-md block w-full"
                  onClick={() => handleapayment()}
                >
                  Book Now
                </button>
              ) : (
                <button className="bg-[#da6633] py-3 px-5 font-montserrat font-medium text-white rounded-md block w-full">
                  Not Available
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Enqueryform;
