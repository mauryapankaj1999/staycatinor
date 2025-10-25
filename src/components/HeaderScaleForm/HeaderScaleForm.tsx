import React, { useCallback, useEffect, useMemo, useState } from "react";
import { IoLocationOutline, IoSearchOutline } from "react-icons/io5";
import Twomonthcalender from "@/app/(WithHeaderandFooter)/customecalneder/_Component/Monthcalender/Twomonthcalender";
import { useSearch } from "@/providers/context/RootContext";
import { toastError } from "@/utils/toast";
import moment from "moment";
import { useRouter, useSearchParams } from "next/navigation";
import { debounce } from "lodash";
import { useDestination } from "@/services/destination.service";
import { IoIosCloseCircle } from "react-icons/io";

export default function HeaderScaleForm({
  isActive,
  setIsActive,
  toggleClass,
}: any) {
  const [step, setStep] = useState(0);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showcalender, setShowcalender] = useState(false);
  const [roomcount, setRoomcount] = useState<any>(1);
  const [adultcount, setAdultcount] = useState(1);
  const [childCount, setChildCount] = useState(1);
  const params = useSearchParams();
  const destinationQuery = params.get("destination");
  let adult = params.get("adult") ?? "";
  let children = params.get("child") ?? "";
  let roomparams = params.get("room") ?? "1";
  const router = useRouter();
  let [locationSearch, setLocationSearch] = useSearch();

  const handleSubmit = (location: any) => {
    // Add locationId to query params when selecting a location
    // const currentParams = new URLSearchParams(window.location.search);
    setSearchValue(location.name);
    setSelectedLocation(location.name);
    setLocationSearch({
      ...locationSearch,
      location: location.name,
      locationId: location._id,
    });
    setShowSuggestion(false);
    setStep(2); // Move to calendar step
  };

  const handelincreaseroom = () => {
    if (roomcount >= 10) return;
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set("room", (roomcount + 1).toString());
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${currentParams.toString()}`
    );
    setRoomcount(roomcount + 1);
  };

  const handeldescrseeroom = () => {
    if (roomcount < 2) {
      return;
    }
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set("room", (roomcount - 1).toString());
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${currentParams.toString()}`
    );
    setRoomcount(roomcount - 1);
  };

  const [search, setSearch] = useState("");
  const [searchValue, setSearchValue] = useState(
    locationSearch?.location || ""
  );

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((searchTerm: string) => {
      setSearch(searchTerm);
    }, 500),
    []
  );

  // Input handler
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    debouncedSearch(value);
    if (value.length > 0) {
      setShowSuggestion(true);
    }
  };

  let searchObj = useMemo(() => {
    let obj: any = {
      pageIndex: 0,
      pageSize: 100,
    };
    if (search && search.length > 0) {
      obj["q"] = search;
    }
    return obj;
  }, [search]);

  let { data: locations } = useDestination(searchObj, true);

  const handleClick = () => {
    // Validate location
    if (!locationSearch?.locationId || !locationSearch?.location) {
      toastError("Please select a location.");
      return;
    }

    if (!locationSearch?.startDate || !locationSearch?.endDate) {
      toastError("Please select check-in and check-out dates.");
      return;
    }
    // Validate guests
    if (adultcount < 1) {
      toastError("At least one adult is required.");
      return;
    }
    if (roomcount < 1) {
      toastError("At least one room is required.");
      return;
    }

    setIsActive(false);
    toggleClass();

    let route = "property";
    window.location.href = `/${route}?destination=${
      locationSearch?.locationId
    }&adult=${adultcount}&child=${childCount}&room=${roomcount}&startDate=${moment(
      new Date(locationSearch?.startDate)
    ).format("YYYY-MM-DD")}&endDate=${moment(
      new Date(locationSearch?.endDate)
    ).format("YYYY-MM-DD")}`;
  };

  const handleDecreaseChildCount = () => {
    if (childCount < 1) {
      return;
    }
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set("child", (childCount - 1).toString());
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${currentParams.toString()}`
    );
    setChildCount(childCount - 1);
  };

  const handleIncreaseChildCount = () => {
    if (adultcount + childCount >= 30) {
      return;
    }
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set("child", (childCount + 1).toString());
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${currentParams.toString()}`
    );
    setChildCount(childCount + 1);
  };

  const handleIncreaseAdultCount = () => {
    if (adultcount + childCount >= 30) {
      return;
    }
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set("adult", (adultcount + 1).toString());
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${currentParams.toString()}`
    );
    setAdultcount(adultcount + 1);
  };

  const handleDecreaseAdultCount = () => {
    if (adultcount < 2) {
      return;
    }
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set("adult", (adultcount - 1).toString());
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${currentParams.toString()}`
    );
    setAdultcount(adultcount - 1);
  };

  // Handle step changes properly
  const handleStepChange = (newStep: number) => {
    if (step === newStep) {
      setStep(0); // Close if same step is clicked
    } else {
      setStep(newStep);
    }

    // Close suggestions when moving to other steps
    if (newStep !== 1) {
      setShowSuggestion(false);
    }
  };

  // Handle location input click
  const handleLocationClick = () => {
    setStep(1);
    setShowSuggestion(true);
  };

  // Update locationSearch when check-in/check-out dates change
  useEffect(() => {
    if (destinationQuery && locations?.data) {
      const destination = locations.data.find(
        (loc: any) => loc._id.toLowerCase() === destinationQuery.toLowerCase()
      );
      if (destination) {
        setSearchValue(destination?.name || "");
        setLocationSearch({
          ...locationSearch,
          location: destination.name,
          locationId: destination._id,
        });
      }
    }
  }, [destinationQuery, locations?.data]);

  // Update locationSearch when guest counts change
  useEffect(() => {
    setLocationSearch({
      ...locationSearch,
      room: roomcount,
      adult: adultcount,
      child: childCount,
    });
  }, [roomcount, adultcount, childCount]);

  useEffect(() => {
    if (adult && adult !== "0") {
      setAdultcount(parseInt(adult));
    }
    if (children && children !== "0") {
      setChildCount(parseInt(children));
    }
    if (roomparams && roomparams !== "0") {
      setRoomcount(parseInt(roomparams));
    }
  }, [adult, children, roomparams]);

  // Handle clicks outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".headerscaleform")) {
        setShowSuggestion(false);
        setStep(0);
      }
    };

    if (isActive) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isActive]);

  return (
    <>
      <div
        className={`h-full  xl:!mx-auto xl:!w-[70%] headerscaleform ${
          isActive ? "block" : "hidden"
        }`}
      >
        <p className="close_con xl:!hidden" onClick={toggleClass}>
          <IoIosCloseCircle className="text-[#da6633] text-[26px]" />
        </p>
        <ul
          className={`flex py-1 flex-col xl:!flex-row xl:!rounded-full bg-white xl:!bg-[#f2f2f2] border-[#ddd] xl:!items-center ${
            isActive ? "xl:activemianclass" : "mainserachout"
          }`}
        >
          <li className="relative w-full xl:!w-[38%] bookinginput">
            <div onClick={() => handleStepChange(1)}>
              <div className="px-[15px] xl:!px-[30px] py-[9px] w-full xl:!min-w-[120px]">
                <p className="font-montserrat text-black xl:!text-[#868686] text-[15px] xl:!text-[11px] font-normal">
                  Location
                </p>
                <input
                  type="text"
                  value={searchValue}
                  onChange={handleSearchInput}
                  className="inputforucnone focus:ring-0 focus:outline-none w-full text-[12px] font-normal outline-none font-montserrat bg-transparent px-4 py-2 xl:!px-0 xl:!py-0 border !border-[#e2e0e0] rounded-md xl:!rounded-none xl:!border-none"
                  placeholder="Search for Location"
                  onClick={handleLocationClick}
                />
              </div>
            </div>
            {showSuggestion &&
              step === 1 &&
              locations?.data &&
              locations?.data?.length > 0 && (
                <div className="absolute !top-[70px] xl:!top-16 z-50 bg-white w-full xl:!min-w-[400px] shadow-lg p-4 rounded-md suggest-left">
                  {locations?.data.map((el, index) => {
                    return (
                      <div
                        key={index}
                        className="flex justify-between items-center mb-3 px-2 py-3 cursor-pointer rounded-md hover:bg-[#f2f2f2] "
                        onClick={() => handleSubmit(el)}
                      >
                        <div className="flex gap-4 items-center">
                          <IoLocationOutline />
                          <div className="">
                            <p className="font-montserrat text-[13px] text-[#000]">
                              {el.name}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
          </li>

          <li className="relative w-full xl:!w-[36%]">
            <div onClick={() => handleStepChange(2)}>
              <div className="flex-col xl:!flex-row flex gap-2">
                <div className="px-[15px] xl:!px-[30px] py-[9px] w-full xl:!min-w-[120px]">
                  <p className="font-montserrat text-black xl:!text-[#868686] text-[15px] xl:!text-[11px] font-normal">
                    Check In
                  </p>
                  <p className="font-montserrat text-[#000] text-[13px] font-normal px-4 py-[10px] xl:!px-0 xl:!py-0 border !border-[#e2e0e0] rounded-md xl:!rounded-none xl:!border-none">
                    {locationSearch?.startDate
                      ? new Date(locationSearch?.startDate).toLocaleDateString(
                          "en-GB"
                        )
                      : "Select Date"}
                  </p>
                </div>
                <div className="px-[15px] xl:!px-[30px] py-[9px] w-full xl:!min-w-[120px]">
                  <p className="font-montserrat text-black xl:!text-[#868686] text-[15px] xl:!text-[11px] font-normal">
                    Check Out
                  </p>
                  <p className="font-montserrat text-[#000] text-[13px] font-normal px-4 py-[10px] xl:!px-0 xl:!py-0 border !border-[#e2e0e0] rounded-md xl:!rounded-none xl:!border-none">
                    {locationSearch?.endDate
                      ? new Date(locationSearch?.endDate).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }
                        )
                      : "Select Date"}
                  </p>
                </div>
              </div>
            </div>

            {step === 2 && (
              <div className="absolute left-0 right-0 xl:!top-20 xl:!-left-6 z-50 xl:!min-w-[400px] flex flex-col xl:!flex-row">
                <Twomonthcalender
                  setShowcalender={setShowcalender}
                  onSelectDate={(start: any, end: any) => {
                    setLocationSearch({
                      ...locationSearch,
                      startDate: new Date(start),
                      endDate: new Date(end),
                    });
                    setStep(3); // Move to guest step after dates are selected
                  }}
                />
              </div>
            )}
          </li>

          <li className="relative w-full xl:!w-[20%]">
            <div onClick={() => handleStepChange(3)}>
              <div className="px-[15px] xl:!px-[30px] py-[9px] w-full xl:!min-w-[120px]">
                <p className="font-montserrat text-black xl:!text-[#868686] text-[15px] xl:!text-[11px] font-normal">
                  Guest
                </p>
                <p className="font-montserrat text-[#000] text-[13px] font-normal px-4 py-[10px] xl:!px-0 xl:!py-0 border !border-[#e2e0e0] rounded-md xl:!rounded-none xl:!border-none">
                  {roomcount} Room{roomcount > 1 ? "s" : ""},{" "}
                  {adultcount + childCount} Guest
                  {adultcount + childCount > 1 ? "s" : ""}
                </p>
              </div>
            </div>

            {step === 3 && (
              <div className="absolute top-20 z-50 rounded-md bg-white w-full xl:!w-[336px] box_customShadow">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-3">
                    <div className="text-[16px] font-montserrat text-[#000]">
                      Room
                    </div>
                    <div className="flex gap-[10px] items-center mb-1">
                      <div
                        className="h-[35px] w-[35px] border-[#ddd] border rounded flex items-center justify-center cursor-pointer"
                        onClick={handeldescrseeroom}
                      >
                        <svg
                          width="13"
                          height="3"
                          viewBox="0 0 13 3"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.998263 0.588222L7.45038 0.59364L12.0039 0.588276C12.256 0.59364 12.4598 0.797449 12.4598 1.04417L12.4598 1.95594C12.4544 2.20802 12.2506 2.41183 12.0039 2.41183L5.62151 2.41178L0.998263 2.41178C0.746129 2.40647 0.54232 2.20266 0.542374 1.95589L0.542374 1.04411C0.54763 0.792031 0.751439 0.588222 0.998263 0.588222Z"
                            fill="#333333"
                          ></path>
                        </svg>
                      </div>
                      <div className="text-[12px] font-montserrat text-[#666]">
                        {roomcount}
                      </div>
                      <div
                        className="h-[35px] w-[35px] border-[#ddd] border rounded flex items-center justify-center cursor-pointer"
                        onClick={handelincreaseroom}
                      >
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 13 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.99444 0.578807L6.08807 0.584225C5.84136 0.584225 5.63755 0.788034 5.63219 1.04011L5.63213 5.58822L0.998263 5.58822C0.751439 5.58822 0.54763 5.79203 0.542374 6.04411V6.95589C0.54232 7.20266 0.746129 7.40647 0.998263 7.41178L5.62151 7.41178L5.63224 11.9599C5.63224 12.2067 5.83605 12.4105 6.08813 12.4158L6.99991 12.4158C7.24662 12.4158 7.45043 12.212 7.4558 11.9599L7.45574 7.41183L12.0039 7.41183C12.2506 7.41183 12.4544 7.20802 12.4598 6.95594L12.4598 6.04416C12.4598 5.79745 12.256 5.59364 12.0039 5.58828L7.45038 5.59364L7.45043 1.04553C7.45032 0.78798 7.24652 0.584171 6.99444 0.578807Z"
                            fill="#333333"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <div className="text-[16px] font-montserrat text-[#000]">
                      Adult
                    </div>
                    <div className="flex gap-[10px] items-center">
                      <div
                        className="h-[35px] w-[35px] border-[#ddd] border rounded flex items-center justify-center cursor-pointer"
                        onClick={handleDecreaseAdultCount}
                      >
                        <svg
                          width="13"
                          height="3"
                          viewBox="0 0 13 3"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.998263 0.588222L7.45038 0.59364L12.0039 0.588276C12.256 0.59364 12.4598 0.797449 12.4598 1.04417L12.4598 1.95594C12.4544 2.20802 12.2506 2.41183 12.0039 2.41183L5.62151 2.41178L0.998263 2.41178C0.746129 2.40647 0.54232 2.20266 0.542374 1.95589L0.542374 1.04411C0.54763 0.792031 0.751439 0.588222 0.998263 0.588222Z"
                            fill="#333333"
                          ></path>
                        </svg>
                      </div>
                      <div className="text-[12px] font-montserrat text-[#666]">
                        {adultcount}
                      </div>
                      <div
                        className="h-[35px] w-[35px] border-[#ddd] border rounded flex items-center justify-center cursor-pointer"
                        onClick={handleIncreaseAdultCount}
                      >
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 13 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.99444 0.578807L6.08807 0.584225C5.84136 0.584225 5.63755 0.788034 5.63219 1.04011L5.63213 5.58822L0.998263 5.58822C0.751439 5.58822 0.54763 5.79203 0.542374 6.04411V6.95589C0.54232 7.20266 0.746129 7.40647 0.998263 7.41178L5.62151 7.41178L5.63224 11.9599C5.63224 12.2067 5.83605 12.4105 6.08813 12.4158L6.99991 12.4158C7.24662 12.4158 7.45043 12.212 7.4558 11.9599L7.45574 7.41183L12.0039 7.41183C12.2506 7.41183 12.4544 7.20802 12.4598 6.95594L12.4598 6.04416C12.4598 5.79745 12.256 5.59364 12.0039 5.58828L7.45038 5.59364L7.45043 1.04553C7.45032 0.78798 7.24652 0.584171 6.99444 0.578807Z"
                            fill="#333333"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <div className="text-[16px] font-montserrat text-[#000]">
                        Child
                      </div>
                      <small className="font-montserrat text-gray-400">
                        Age 6 - 12 years
                      </small>
                    </div>
                    <div className="flex gap-[10px] items-center">
                      <div
                        className="h-[35px] w-[35px] border-[#ddd] border rounded flex items-center justify-center cursor-pointer"
                        onClick={handleDecreaseChildCount}
                      >
                        <svg
                          width="13"
                          height="3"
                          viewBox="0 0 13 3"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.998263 0.588222L7.45038 0.59364L12.0039 0.588276C12.256 0.59364 12.4598 0.797449 12.4598 1.04417L12.4598 1.95594C12.4544 2.20802 12.2506 2.41183 12.0039 2.41183L5.62151 2.41178L0.998263 2.41178C0.746129 2.40647 0.54232 2.20266 0.542374 1.95589L0.542374 1.04411C0.54763 0.792031 0.751439 0.588222 0.998263 0.588222Z"
                            fill="#333333"
                          ></path>
                        </svg>
                      </div>
                      <div className="text-[12px] font-montserrat text-[#666]">
                        {childCount}
                      </div>
                      <div
                        className="h-[35px] w-[35px] border-[#ddd] border rounded flex items-center justify-center cursor-pointer"
                        onClick={handleIncreaseChildCount}
                      >
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 13 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.99444 0.578807L6.08807 0.584225C5.84136 0.584225 5.63755 0.788034 5.63219 1.04011L5.63213 5.58822L0.998263 5.58822C0.751439 5.58822 0.54763 5.79203 0.542374 6.04411V6.95589C0.54232 7.20266 0.746129 7.40647 0.998263 7.41178L5.62151 7.41178L5.63224 11.9599C5.63224 12.2067 5.83605 12.4105 6.08813 12.4158L6.99991 12.4158C7.24662 12.4158 7.45043 12.212 7.4558 11.9599L7.45574 7.41183L12.0039 7.41183C12.2506 7.41183 12.4544 7.20802 12.4598 6.95594L12.4598 6.04416C12.4598 5.79745 12.256 5.59364 12.0039 5.58828L7.45038 5.59364L7.45043 1.04553C7.45032 0.78798 7.24652 0.584171 6.99444 0.578807Z"
                            fill="#333333"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </li>
          <li className="absolute bottom-6 left-0 m-auto right-0 w-[90%] md:!static md:!w-auto">
            <div className="px-[15px] xl:!px-[30px] py-[6px] flex text-nowrap w-full xl:!min-w-[120px]">
              <button
                onClick={handleClick}
                className="w-full font-montserrat flex text-center justify-center items-center gap-2 rounded-full text-[13px] font-normal bg-[#da6633] text-[#fff] px-5 py-2"
              >
                Search <IoSearchOutline className="hidden xl:!visible" />
              </button>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
