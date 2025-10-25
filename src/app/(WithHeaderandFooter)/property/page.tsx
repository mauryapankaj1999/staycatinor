"use client";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Filter from "@/components/CategoryComponents/Filter/Filter";
import { ReelLoader } from "./_components/RecentReel/ReelLoader";
import { LocationLoader } from "./_components/Location/LocationLoader";
import CategoryCardLoader from "./_components/Cartegorycard/CategoryCardLoader";
import { useProperty } from "@/services/property.service";
import ReactPaginate from "react-paginate";
import { GoChevronDown, GoChevronLeft, GoChevronRight } from "react-icons/go";
import { ICollection } from "@/services/collection.service";
import { useRouter, useSearchParams } from "next/navigation";
import { IoCloseOutline } from "react-icons/io5";
import { useSession } from "next-auth/react";
import HeaderScaleForm from "@/components/HeaderScaleForm/HeaderScaleForm";
import {
  useDestination,
  useDestinationById,
} from "@/services/destination.service";
import { STATUS } from "@/common/contstant";

const RecentReel = dynamic(
  () => import("./_components/RecentReel/RecentReel"),
  {
    ssr: false,
    loading: () => <ReelLoader />,
  }
);


const Cartegorycard = dynamic(
  () => import("./_components/Cartegorycard/Cartegorycard"),
  {
    ssr: false,
    loading: () => <CategoryCardLoader />,
  }
);

export type FilterPropsType = {
  filetrObj: {
    collectionArr: ICollection[];
    setCollectionArr: (e: ICollection[]) => void;
    priceArr: { label: string; checked: boolean; min?: number; max?: number }[];
  };
};

export default function page() {
  const { data: session } = useSession();
  const userId = (session as any)?.token?.decoded_token.userId;
  const [sortbytoggle, setsortbytoggle] = useState(false);
  const [tagglefilterbottm, setTagglefilterbottm] = useState(false);
  const searchParams = useSearchParams();
  let destination = searchParams.get("destination") ?? "";
  const { data: locations } = useDestinationById(destination, true);
  const [isActive, setIsActive] = useState(false);
  let startDate = searchParams.get("startDate") ?? "";
  let endDate = searchParams.get("endDate") ?? "";
  let adult = searchParams.get("adult") ?? "";
  let child = searchParams.get("child") ?? "";
  const [start, setStart] = useState<number>(0);
  const [end, setEnd] = useState<number>(0);
  const [startMonth, setStartMonth] = useState<string>("Month");
  const [endMonth, setEndMonth] = useState<string>("Month");

  const [guest, setGuest] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<any>(10);
  const searchPrams = useSearchParams();
  const router = useRouter();

  const handlePageClick = (event: any) => {
    const params = new URLSearchParams(searchPrams.toString());
    let tempPage = event.selected + 1;
    if (tempPage) {
      params.set("page", tempPage);
    } else {
      params.delete("page");
    }
    router.push("/property?" + params.toString());
  };

  const sort = searchPrams.get("sort") ? searchPrams.get("sort") : "";
  const page = searchPrams.get("page") ? Number(searchPrams.get("page")) : 1;

  const PER_PAGE_LIMIT = 8;

  let collectionStr = searchPrams.get("collection");
  let locationStr = searchPrams.get("destination");
  let destinationStr = searchPrams.get("destination");
  const [query, setQuery] = useState("");
  let sortStr = searchPrams.get("sort");
  let minStr = searchPrams.get("min");
  let maxStr = searchPrams.get("max");
  let groupStr = searchPrams.get("group");

  const searchObj = useMemo(() => {
    let obj: any = { level: 1 };
    obj.pageIndex = page <= 1 ? 0 : page - 1;
    obj.pageSize = PER_PAGE_LIMIT;
    obj.userId = userId ?? "";
    if (collectionStr) {
      obj.collection = collectionStr;
    }
    if (locationStr) {
      obj.location = locationStr;
    }
    let room = searchPrams.get("room");
    if (room) {
      obj.room = room;
    }

    if (destinationStr) {
      obj.destinationId = destinationStr;
    }

    if (minStr) {
      obj.min = minStr;
    } else {
      delete obj.min;
    }

    if (maxStr) {
      obj.max = maxStr;
    } else {
      delete obj.max;
    }

    if (sortStr) {
      obj.sort = sortStr;
    }

    if (groupStr) {
      obj.group = groupStr;
    }

    return obj;
  }, [
    query,
    collectionStr,
    locationStr,
    destinationStr,
    sortStr,
    minStr,
    groupStr,
    page,
    maxStr,
    userId,
  ]);

  const {
    data: propertyList,
    isPending,
    refetch,
  } = useProperty(searchObj, true, true);

  useEffect(() => {
    if (propertyList && propertyList?.data) {
      setTotalPage(Math.ceil(propertyList?.total / PER_PAGE_LIMIT));
    }
  }, [propertyList?.data]);

  const handleFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchPrams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(`${key}`);
    }
    router.push("/property?" + params.toString());
  };

  const getSortDisplayText = (sortValue: string | null) => {
    if (!sortValue) return "Sort By";

    switch (sortValue) {
      case "low":
        return "Price: Low to high";
      case "high":
        return "Price: High to low";
      case "oldest":
        return "Oldest";
      case "latest":
        return "Newest first";
      default:
        return "Sort By";
    }
  };

  const toggleClass = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      console.log("start", startDate);
      console.log("end", endDate);
      setStart(start.getDate());
      setStartMonth(start.toLocaleString("default", { month: "long" }));
      setEndMonth(end.toLocaleString("default", { month: "long" }));
      setEnd(end.getDate());
    }
    if (adult && child) {
      setGuest(Number(adult) + Number(child));
    }
  }, [startDate, endDate, adult, child]);

  const [sortToggle, setSortToggle] = useState(false);
  const [selectedSort, setSelectedSort] = useState(getSortDisplayText(sort));

  useEffect(() => {
    setSelectedSort(getSortDisplayText(sort));
  }, [sort]);

  const handleSortChange = (sortValue: string) => {
    handleFilter("sort", sortValue);
    setSortToggle(false);
  };

  const handleMobileSortChange = (sortValue: string) => {
    handleFilter("sort", sortValue);
    setsortbytoggle(false);
  };

  const handleApplyFilter = () => {
    refetch();
  };

  // Custom pagination component
  const CustomPagination = () => {
    const isFirstPage = page === 1;
    const isLastPage = page === totalPage;

    const goToPreviousPage = () => {
      if (!isFirstPage) {
        const params = new URLSearchParams(searchPrams.toString());
        params.set("page", (page - 1).toString());
        router.push("/property?" + params.toString());
      }
    };

    const goToNextPage = () => {
      if (!isLastPage) {
        const params = new URLSearchParams(searchPrams.toString());
        params.set("page", (page + 1).toString());
        router.push("/property?" + params.toString());
      }
    };

    const goToPage = (pageNum: number) => {
      const params = new URLSearchParams(searchPrams.toString());
      params.set("page", pageNum.toString());
      router.push("/property?" + params.toString());
    };

    const getVisiblePages = () => {
      const visiblePages = [];
      const startPage = Math.max(1, page - 2);
      const endPage = Math.min(totalPage, page + 2);

      for (let i = startPage; i <= endPage; i++) {
        visiblePages.push(i);
      }
      return visiblePages;
    };

    return (
      <div className="flex items-center justify-center gap-2 mt-8">
        {/* Previous Button - Only show if not on first page */}
        {!isFirstPage && (
          <button
            onClick={goToPreviousPage}
            className="flex items-center justify-center w-10 h-10 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors"
          >
            <GoChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Page Numbers */}
        {getVisiblePages().map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => goToPage(pageNum)}
            className={`flex items-center justify-center font-montserrat w-10 h-10 rounded-md transition-colors ${
              pageNum === page
                ? "bg-black text-white"
                : "border border-gray-300 hover:bg-gray-100"
            }`}
          >
            {pageNum}
          </button>
        ))}

        {/* Show ellipsis if there are more pages */}
        {page + 2 < totalPage && (
          <span className="flex items-center justify-center w-10 h-10">
            ...
          </span>
        )}

        {/* Show last page if not visible */}
        {page + 2 < totalPage && (
          <button
            onClick={() => goToPage(totalPage)}
            className="flex items-center justify-center w-10 h-10 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors"
          >
            {totalPage}
          </button>
        )}

        {/* Next Button - Only show if not on last page */}
        {!isLastPage && (
          <button
            onClick={goToNextPage}
            className="flex items-center justify-center w-10 h-10 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors"
          >
            <GoChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    );
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      {/*-------------------------------------- mobile show location menu---------------------------------- */}
      <div
        className="xl:hidden md:!relative md:!top-0 fixed top-[60px] z-[70] w-full"
        onClick={toggleClass}
      >
        <div className="bg-white py-1">
          <div className="w-[95%] md:w-[60%] lg:w-[50%] mx-auto my-2 ">
            <div className="border-[1.2px]  border-[#e7e7e7] rounded-full bg-[#f2f2f2] ">
              <ul className="flex lg:gap-2 2xl:gap-4 lg:px-6 2xl:px-6 py-3">
                <li className="font-montserrat text-center font-bold xl-custom:text-[0.8rem] lg:px-3 px-1 text-[10px] xl:text-[0.7rem] 2xl:text-[1rem] border-r-[1px] border-[#202a37] flex-1">
                  {locations?.name || "Select Location"}
                </li>
                <li className="font-montserrat text-center font-bold xl-custom:text-[0.8rem] lg:px-3 px-1 text-[10px] xl:text-[0.7rem] 2xl:text-[1rem] border-r-[1px] border-[#202a37]  flex-3">
                  {startDate && endDate
                    ? `${start} ${startMonth} - ${end} ${endMonth}`
                    : "Select Dates"}
                </li>
                <li className="font-montserrat text-center font-bold xl-custom:text-[0.8rem] lg:px-3 px-1 text-[10px] xl:text-[0.7rem] 2xl:text-[1rem] flex-1">
                  {guest
                    ? `${guest} Guest${guest > 1 ? "s" : ""} `
                    : "Select Guest"}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {isActive && (
        <>
          <div className="bg-[#00000073] fixed w-full h-full z-[9999] top-0 left-0"></div>
          <div className="bg-[#ffff] h-full w-full md:!w-[47%] lg:!w-[40%] fixed z-[10000] p-4 bottom-0 right-0 top-0 xl:hidden">
            <HeaderScaleForm
              isActive={isActive}
              toggleClass={toggleClass}
              setIsActive={setIsActive}
            />
          </div>
        </>
      )}

      <div className="w-[95%] md:w-[85%] lg:w-[90%] 2xl:w-[85%] mx-auto md:py-10 py-5">
        <div className="flex justify-between flex-col md:flex-row">
          <div className="w-[100%] lg:w-[25%]  hidden lg:block ">
            <div className="sticky top-[130px]">
              <div className="">
                <Filter
                  handleApplyFilter={handleApplyFilter}
                  tagglefilterbottm={tagglefilterbottm}
                  setTagglefilterbottm={setTagglefilterbottm}
                />
              </div>
            </div>
          </div>

          <div className="w-[100%] lg:w-[72%]">
            <div className="flex justify-between my-3 md:mb-6 md:mt-8">
              <div className="w-full md:w-[75%]">
                <RecentReel />
              </div>
              <div className="md:w-[25%]">
                <form className="w-full hidden lg:block custom-select">
                  <div className="flex justify-end">
                    <div className="relative">
                      <div
                        onClick={() => setSortToggle(!sortToggle)}
                        className="border border-[#ddd] px-3 py-2 rounded-md w-fit font-montserrat text-[14px] flex gap-1 cursor-pointer"
                      >
                        {selectedSort} <GoChevronDown className="h-5 w-5" />
                      </div>
                      {sortToggle && (
                        <>
                          <div className="absolute border z-[109] shadow-md p-2 w-[250px] top-[50px] rounded-md bg-white border-[#ddd] right-0">
                            <ul>
                              <li
                                onClick={() => handleSortChange("low")}
                                className="font-montserrat text-[14px] px-2 mb-[6px] cursor-pointer"
                              >
                                Price: Low to high
                              </li>
                              <li
                                onClick={() => handleSortChange("high")}
                                className="font-montserrat text-[14px] px-2 mb-[6px] cursor-pointer"
                              >
                                Price: High to low
                              </li>
                              <li
                                onClick={() => handleSortChange("oldest")}
                                className="font-montserrat text-[14px] px-2 mb-[6px] cursor-pointer"
                              >
                                Popularity
                              </li>
                              <li
                                onClick={() => handleSortChange("latest")}
                                className="font-montserrat text-[14px] px-2 mb-[6px] cursor-pointer"
                              >
                                What's New
                              </li>
                            </ul>
                          </div>
                          <div
                            onClick={() => setSortToggle(!sortToggle)}
                            className="fixed h-full w-full inset-0 z-[99]"
                          ></div>
                        </>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {isPending ? (
              <CategoryCardLoader />
            ) : (
              <Cartegorycard propertyList={propertyList?.data ?? []} />
            )}

            {/* Replace ReactPaginate with Custom Pagination */}
            {propertyList && propertyList?.data?.length > 0 && (
              <CustomPagination />
            )}
          </div>
        </div>
      </div>

      {tagglefilterbottm ? (
        <>
          <div className="bg-[#00000073] fixed w-full h-full z-[9999] top-0 left-0"></div>
          <div className="bottomshow_filter overflow-hidden lg:overflow-auto h-full w-full md:!w-[47%] lg:!w-[40%]">
            <Filter
              handleApplyFilter={handleApplyFilter}
              tagglefilterbottm={tagglefilterbottm}
              setTagglefilterbottm={setTagglefilterbottm}
            />
          </div>
        </>
      ) : (
        ""
      )}

      {sortbytoggle ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-[999999] animate-slide-in">
          <div className="bg-white px-5 py-10 min-h-[20vh] rounded-lg shadow-md w-full relative">
            <p
              className="font-montserrat text-[14px] mb-4"
              onClick={() => handleMobileSortChange("high")}
            >
              High to Low
            </p>
            <p
              className="font-montserrat text-[14px] mb-4"
              onClick={() => handleMobileSortChange("low")}
            >
              Low to High
            </p>
            <p
              className="font-montserrat text-[14px] mb-4"
              onClick={() => handleMobileSortChange("oldest")}
            >
              Popularity
            </p>
            <p
              className="font-montserrat text-[14px] mb-4"
              onClick={() => handleMobileSortChange("latest")}
            >
              What's New
            </p>
            <div className="h-[1px] w-full bg-primarygray my-4"></div>
            <p
              className="absolute top-2 right-3"
              onClick={() => setsortbytoggle(!sortbytoggle)}
            >
              <IoCloseOutline className="text-[2rem]" />
            </p>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="lg:hidden fixed bottom-0 w-full z-10 flex gap-2 bg-white p-2">
        <button
          className="font-montserrat rounded-md bg-primarydark px-3 py-2 font-medium flex-1 text-[#fff]"
          onClick={() => setTagglefilterbottm(!tagglefilterbottm)}
        >
          Show filter
        </button>
        <button
          className="font-montserrat  shadow-md  rounded-md font-medium border flex-1 text-primarydark"
          onClick={() => setsortbytoggle(!sortbytoggle)}
        >
          Sort by
        </button>
      </div>
    </Suspense>
  );
}
