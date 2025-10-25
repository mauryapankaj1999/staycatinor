"use client";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { FiUser } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { IoCalendarClearOutline, IoSearchOutline } from "react-icons/io5";
import moment from "moment";
import { useRouter, useSearchParams } from "next/navigation";
import { useSearch } from "@/providers/context/RootContext";
import { toastError } from "@/utils/toast";
import { debounce, set } from "lodash";
import { IDestination, useDestination } from "@/services/destination.service";
import { STATUS } from "@/common/contstant";
import Twomonthcalender from "@/app/(WithHeaderandFooter)/customecalneder/_Component/Monthcalender/Twomonthcalender";

const HomeCheckoutForm = ({ handelform, setHandelform }: any) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [locationSearch, setLocationSearch] = useSearch();
  console.log("locationSearch", locationSearch);
  const [dropdownmenu, setDropdownmenu] = useState(false);
  const [adult, setAdult] = useState(1);
  const [child, setChild] = useState(0);
  const [room, setRoom] = useState(1);
  const [showcalender, setShowcalender] = useState(false);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<IDestination[]>([]);

  const { data: locations } = useDestination({
    status: STATUS.ACTIVE,
    pageSize: 1000,
    pageIndex: 0,
    q: searchQuery,
  });

  // Update query parameters function
  const updateQueryParams = (updates: any) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.keys(updates).forEach((key) => {
      if (
        updates[key] !== undefined &&
        updates[key] !== null &&
        updates[key] !== ""
      ) {
        if (key === "startDate" || key === "endDate") {
          params.set(key, moment(updates[key]).format("YYYY-MM-DD"));
        } else {
          params.set(key, updates[key].toString());
        }
      } else {
        params.delete(key);
      }
    });

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  // Initialize state from query parameters
  useEffect(() => {
    const locationId =
      searchParams.get("destination") || searchParams.get("locationId");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const adultParam = searchParams.get("adult");
    const childParam = searchParams.get("child");
    const roomParam = searchParams.get("room");
    const location = searchParams.get("location");

    if (locationId || startDate || endDate || location) {
      setLocationSearch({
        ...locationSearch,
        locationId: locationId || locationSearch.locationId,
        location: location || locationSearch.location,
        startDate: startDate ? new Date(startDate) : locationSearch.startDate,
        endDate: endDate ? new Date(endDate) : locationSearch.endDate,
      });
    }

    if (adultParam) setAdult(parseInt(adultParam));
    if (childParam) setChild(parseInt(childParam));
    if (roomParam) setRoom(parseInt(roomParam));
  }, []);

  // Update adult count and query params
  const handleAdultChange = (newAdult: number) => {
    // Ensure total guests (adult + child) does not exceed 30
    if (newAdult + child > 30) {
      return;
    }
    setAdult(newAdult);
    updateQueryParams({ adult: newAdult });
  };

  // Update child count and query params
  const handleChildChange = (newChild: number) => {
    if (newChild + adult > 30) {
      return;
    }
    setChild(newChild);
    updateQueryParams({ child: newChild });
  };

  // Update room count and query params
  const handleRoomChange = (newRoom: number) => {
    if (newRoom > 10) return;
    setRoom(newRoom);
    updateQueryParams({ room: newRoom });
  };

  const handleSteptoGuest = (state: boolean) => {
    setShowcalender(state);
    if (!state) {
      setDropdownmenu(true);
    }
  };

  useEffect(() => {
    if (locations?.data) {
      setSuggestions(locations?.data ?? []);
    }
  }, [locations?.data, searchQuery]);

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearchQuery(value);
        setShowSuggestion(true);
      }, 800),
    []
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const updatedLocationSearch = {
      ...locationSearch,
      location: value,
    };
    const matchedLocation = locations?.data?.find(
      (loc) => loc.name.toLowerCase() === value.trim().toLowerCase()
    );
    if (matchedLocation) {
      updatedLocationSearch.locationId = matchedLocation._id;
    } else {
      updatedLocationSearch.locationId = "";
    }
    setLocationSearch(updatedLocationSearch);
    updateQueryParams({ ...updatedLocationSearch, location: value });
    debouncedSearch(value);
  };

  const handleSuggestionClick = (property: IDestination) => {
    setShowSuggestion(false);
    setSuggestions([]);
    const updatedLocationSearch = {
      ...locationSearch,
      locationId: property._id,
      location: property.name,
    };
    setLocationSearch(updatedLocationSearch);
    updateQueryParams({
      locationId: property._id,
      location: property.name,
    });

    // Only show calendar if dates are not already selected
    if (!locationSearch.startDate || !locationSearch.endDate) {
      setShowcalender(true);
    } else {
      // If dates are already selected, go to guest selection
      setDropdownmenu(true);
    }
  };

  console.log("locationSearch", locationSearch);

  const handleSelectDate = (start: Date | null, end: Date | null) => {
    if (start && end) {
      const updatedLocationSearch = {
        ...locationSearch,
        startDate: start,
        endDate: end,
      };
      setLocationSearch(updatedLocationSearch);
      updateQueryParams({
        startDate: start,
        endDate: end,
      });

      setShowcalender(false); // Close calendar
      setDropdownmenu(true); // Open adult selection dropdown
    }
  };

  const wrapperRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowcalender(false);
        setShowSuggestion(false);
        setDropdownmenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    if (
      new Date(locationSearch?.endDate).getTime() <=
      new Date(locationSearch?.startDate).getTime()
    ) {
      toastError("Please Select Valid date");
      return;
    }
    if (!locationSearch?.locationId) {
      toastError("Please enter a location");
      return;
    }
    router.push(
      `/property?destination=${locationSearch?.locationId}&startDate=${moment(
        new Date(locationSearch.startDate)
      ).format("YYYY-MM-DD")}&endDate=${moment(
        new Date(locationSearch.endDate)
      ).format("YYYY-MM-DD")}&adult=${adult}&child=${child}&room=${room}`
    );
    setDropdownmenu(false);
  };

  return (
    <div
      className="relative"
      onMouseLeave={() => {
        setTimeout(() => {
          setHandelform(true);
          setDropdownmenu(false);
          setShowcalender(false);
          setSuggestions([]);
        }, 100);
      }}
    >
      <p className="text-white text-[40px] font-normal mb-4 font-theseasion">
        Your Perfect Getaway Awaits...
      </p>

      {handelform ? (
        <div
          className="Seachbar"
          onClick={() => {
            setHandelform(false);
            setTimeout(() => {
              searchInputRef.current?.focus();
            }, 0);
          }}
        >
          <div className="innersearchbar lg:w-[400px] xl:w-[475px] flex gap-3 items-center sm:p-4 lg:px-6 xl:p-5 2xl:px-7 2xl:py-6 rounded-full m-auto">
            <IoSearchOutline className="text-[16px] text-[#fff]" />
            <span className="text-[14px] font-montserrat font-medium text-[#eeeeee]">
              search for location, villa, facilities...
            </span>
          </div>
        </div>
      ) : (
        <div
          className="input_area innersearchbar lg:w-[450px] bg-white rounded-lg m-auto"
          ref={wrapperRef}
        >
          <div className="flex gap-2 items-center border-b-[1px] border-primarygray p-5">
            <IoSearchOutline className="text-[1.3rem]" />
            <div className="relative w-full">
              <input
                type="search"
                ref={searchInputRef}
                className="inline-block w-full focus:ring-0 focus:outline-none font-montserrat border-none px-0 shadow-none placeholder-primarygray py-1"
                placeholder="Search villas & apartments in your desired location"
                value={locationSearch?.location || ""}
                onChange={handleSearchChange}
                onClick={() => {
                  setShowSuggestion(true);
                  setSuggestions(locations?.data ?? []);
                  setShowcalender(false);
                  setDropdownmenu(false);
                }}
              />
              {showSuggestion && suggestions.length > 0 && (
                <div className="absolute z-50 max-h-[300px] overflow-y-scroll w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg transition-all duration-300 ease-in-out opacity-100 translate-y-0">
                  {suggestions.map((property) => (
                    <div
                      key={property._id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSuggestionClick(property)}
                    >
                      <div className="font-medium">{property.name}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between pl-3 pr-3">
            <div className="w-[33%] border-r-[1px] border-primarygray">
              <div
                className="flex xl:gap-2 items-center justify-center h-[50px] cursor-pointer"
                onClick={() => {
                  setShowcalender(!showcalender);
                  setDropdownmenu(false);
                  setShowSuggestion(false);
                }}
              >
                <IoCalendarClearOutline className="text-primarygray" />
                <span className="text-navibule font-montserrat font-normal text-[14px]">
                  {locationSearch.startDate
                    ? moment(new Date(locationSearch.startDate)).format(
                        "ddd, MMM DD"
                      )
                    : "Select date"}
                </span>
                <IoIosArrowDown className="text-primarygray text-sm" />
              </div>
              {showcalender && (
                <div className="absolute -top-1 left-0 bg-white z-50 transition-all duration-300 ease-in-out opacity-100 translate-y-[8pc]">
                  <Twomonthcalender
                    setShowcalender={handleSteptoGuest}
                    onSelectDate={handleSelectDate}
                  />
                </div>
              )}
            </div>
            <div className="flex gap-4 items-center justify-center w-[33%] border-r-[1px] border-primarygray h-[50px]">
              <div
                className="flex items-center xl:gap-2 justify-center h-[50px] cursor-pointer"
                onClick={() => {
                  setShowcalender(!showcalender);
                  setDropdownmenu(false);
                  setShowSuggestion(false);
                }}
              >
                <IoCalendarClearOutline className="text-primarygray" />
                <span className="text-navibule font-montserrat font-normal text-[14px]">
                  {locationSearch.endDate
                    ? moment(new Date(locationSearch.endDate)).format(
                        "ddd, MMM DD"
                      )
                    : "Select date"}
                </span>
                <IoIosArrowDown className="text-primarygray" />
              </div>
            </div>
            <div
              className="flex gap-4 relative items-center justify-center w-[33%] h-[50px] cursor-pointer"
              onClick={() => {
                setDropdownmenu(!dropdownmenu);
                setShowcalender(false);
                setShowSuggestion(false);
              }}
            >
              {adult > 0 || child > 0 ? (
                <div className="text-[14px] text-navibule font-montserrat font-normal">
                  <span className="font-medium">{room}</span> Room
                  {room > 1 ? "s" : ""} ,
                  <span className="font-medium"> {child + adult}</span> Guest
                  {child + adult > 1 ? "s" : ""}{" "}
                </div>
              ) : (
                <>
                  <FiUser className="text-primarygray" />
                  <span className="text-navibule font-montserrat font-normal">
                    Guests
                  </span>
                  <IoIosArrowDown className="text-primarygray" />
                </>
              )}
            </div>
            {dropdownmenu && (
              <div className="absolute -right-[1%] top-[85%] mt-4 bg-white divide-y p-3 divide-gray-100 rounded-lg shadow w-[18rem] transition-all duration-300 ease-in-out opacity-100 translate-y-0">
                <ul>
                  <li className="flex mb-2">
                    <div className="leftsidebar w-[70%]">
                      <h3 className="text-[1rem] text-navibule font-montserrat text-start">
                        Room
                      </h3>
                    </div>
                    <div className="rightsidebar flex-1 flex gap-2">
                      <div
                        className="minuse border h-8 w-8 flex items-center justify-center rounded-lg cursor-pointer"
                        onClick={() =>
                          handleRoomChange(room > 1 ? room - 1 : 1)
                        }
                      >
                        -
                      </div>
                      <div className="count border h-8 w-8 flex items-center font-montserrat justify-center rounded-lg">
                        {room}
                      </div>
                      <div
                        className="pluse border h-8 w-8 flex items-center justify-center rounded-lg cursor-pointer"
                        onClick={() => handleRoomChange(room + 1)}
                      >
                        +
                      </div>
                    </div>
                  </li>
                  <li className="flex mb-2">
                    <div className="leftsidebar w-[70%]">
                      <h3 className="text-[1rem] text-navibule font-montserrat text-start">
                        Adult
                      </h3>
                    </div>
                    <div className="rightsidebar flex-1 flex gap-2">
                      <div
                        className="minuse border h-8 w-8 flex items-center justify-center rounded-lg cursor-pointer"
                        onClick={() =>
                          handleAdultChange(adult > 1 ? adult - 1 : 1)
                        }
                      >
                        -
                      </div>
                      <div className="count border h-8 w-8 flex items-center font-montserrat justify-center rounded-lg">
                        {adult}
                      </div>
                      <div
                        className="pluse border h-8 w-8 flex items-center justify-center rounded-lg cursor-pointer"
                        onClick={() => handleAdultChange(adult + 1)}
                      >
                        +
                      </div>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="leftsidebar w-[70%] text-left">
                      <h3 className="text-[1rem] text-navibule font-montserrat text-start">
                        Child
                      </h3>
                      <small className="font-montserrat text-gray-400">
                        Age 6 - 12 years
                      </small>
                    </div>
                    <div className="rightsidebar flex-1 flex gap-2">
                      <div
                        className="minuse border h-8 w-8 flex items-center justify-center rounded-lg cursor-pointer"
                        onClick={() =>
                          handleChildChange(child > 0 ? child - 1 : 0)
                        }
                      >
                        -
                      </div>
                      <div className="count border h-8 w-8 flex items-center font-montserrat justify-center rounded-lg">
                        {child}
                      </div>
                      <div
                        className="pluse border h-8 w-8 flex items-center justify-center rounded-lg cursor-pointer"
                        onClick={() => handleChildChange(child + 1)}
                      >
                        +
                      </div>
                    </div>
                  </li>
                </ul>
                <div className="text-center mt-5">
                  <button
                    className="bg-navibule rounded-md font-montserrat inline-block px-4 py-3 text-[white] w-full"
                    onClick={handleClick}
                  >
                    Apply and Search
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeCheckoutForm;
