"use client";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import bookingimg from "@/assets/mainbanner/slider2.png";
import { FaRegEdit } from "react-icons/fa";
import Image from "next/image";
import { IOrder, useOrder } from "@/services/order.service";
import { generateFilePath } from "@/services/url.service";
import moment from "moment";
import ReactPaginate from "react-paginate";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { useRouter, useSearchParams } from "next/navigation";

export default function page() {
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
    router.push("/booking?" + params.toString());
  };

  const sort = searchPrams.get("sort") ? searchPrams.get("sort") : "";
  const page = searchPrams.get("page") ? Number(searchPrams.get("page")) : 1;

  const PER_PAGE_LIMIT = 4;

  const [query, setQuery] = useState("");
  const [orderList, setOrderList] = useState<IOrder[]>([]);
  console.log("orderList", orderList);
  const searchObj = useMemo(() => {
    let obj: any = {};

    obj.pageIndex = page <= 1 ? 0 : page - 1;
    obj.pageSize = PER_PAGE_LIMIT;
    return obj;
  }, [query, searchPrams]);

  const {
    data: order,
    isFetching,
    isPending,
    refetch,
  } = useOrder(searchObj, true, true);

  useEffect(() => {
    if (order && order?.data) {
      setOrderList(order?.data);
      setTotalPage(Math.ceil(order?.total / PER_PAGE_LIMIT));
    }
  }, [order]);

  const [toggledetails, setToggledetails] = useState("");

  const handeltoggle = (id: any) => {
    if (id == toggledetails) {
      setToggledetails("");
    } else {
      setToggledetails(id);
    }
  };

  return (
    <Suspense fallback="Loading ....">
      {isPending ? (
        <p>Loading ...</p>
      ) : (
        <>
          {orderList?.length > 0 ? (
            orderList.map((el, index) => {
              return (
                <div className="border bg-[#f5f5f5] p-3 mb-8" key={index}>
                  <div className="flex justify-between mb-4">
                    <div className="">
                      <p className="text-primarygray text-[0.7rem] md:text-[1.1rem] font-montserrat font-normal">
                        Booking ID -{" "}
                        <span className="font-medium text-[0.7rem] md:text-[1.1rem] text-navibule font-montserrat">
                          {" "}
                          {el._id}
                        </span>
                      </p>
                    </div>
                    <div className="">
                      <p className="text-primarygray font-montserrat text-[0.7rem] md:text-[1.1rem] font-medium">
                        Grand Total -{" "}
                        <span className="font-medium text-navibule text-[0.7rem] md:text-[1.1rem]">
                          {" "}
                          ₹ {el.subTotalAmount}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="col-span-1">
                      <div className="h-[10rem] md:h-[20rem] w-full relative">
                        {el?.hotelsArr && el?.hotelsArr?.length > 0 ? (
                          <Image
                            src={generateFilePath(el?.hotelsArr[0]?.image)}
                            alt=""
                            fill
                            className="object-cover rounded-xl"
                          />
                        ) : (
                          <Image
                            src={bookingimg}
                            alt=""
                            fill
                            className="object-cover rounded-xl"
                          />
                        )}
                      </div>
                    </div>
                    <div className="col-span-1">
                      <div className="my-3">
                        <div className="grid grid-cols-5 gap-3 mt-5 mb-4">
                          <div className="col-span-2">
                            <div className="mb-3">
                              <p className="font-montserrat font-medium text-[0.8rem] md:text-[1.1rem] text-navibule mb-1">
                                Property name
                              </p>
                              <p className="font-montserrat font-medium text-[0.8rem] md:text-[1.1rem] text-navibule mb-1">
                                Adult
                              </p>
                              <p className="font-montserrat font-medium text-[0.8rem] md:text-[1.1rem] text-primarygray">
                                Check - In
                              </p>
                              <p className="font-montserrat font-medium text-[0.8rem] md:text-[1.1rem] text-navibule mb-1">
                                {" "}
                                {`${moment(new Date(el.startDate)).format(
                                  "ddd, MMM DD"
                                )}`}{" "}
                              </p>
                              <p className="font-montserrat font-medium text-[0.8rem] md:!text-[1.1rem] text-primarygray">
                                From 11 : 00 PM
                              </p>
                            </div>
                          </div>

                          <div className="col-span-1 text-center flex justify-center">
                            <div className="h-full w-[1px] bg-[#d6d6d6] opacity-50"></div>
                          </div>

                          <div className="col-span-2 text-end">
                            <div className="mb-3">
                              <p className="font-montserrat font-medium text-[0.8rem] md:text-[1.1rem] text-navibule mb-1 line-clamp-1">
                                {el?.hotelsArr[0]?.name}
                              </p>
                              <p className="font-montserrat font-medium text-[0.8rem] md:text-[1.1rem] text-navibule">
                                Adult {el?.adult} Children {el?.child}
                              </p>

                              <p className="font-montserrat font-medium text-[0.8rem] md:text-[1.1rem] text-primarygray">
                                Check - Out
                              </p>
                              <p className="font-montserrat font-medium text-[0.8rem] md:text-[1.1rem] text-navibule mb-1">
                                {`${moment(new Date(el.endDate)).format(
                                  "ddd, MMM DD"
                                )}`}{" "}
                              </p>
                              <p className="font-montserrat font-medium text-[0.8rem] md:text-[1.1rem] text-primarygray">
                                From 11 : 00 PM
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <h6 className="my-3 font-medium text-[1.2rem] text-navibule  font-montserrat">
                            ₹{el.subTotalAmount}{" "}
                            <span className="text-[0.9rem] text-primarygray">
                              {el?.nights} Nights
                            </span>
                          </h6>
                          <p
                            onClick={() => handeltoggle(el._id)}
                            className="text-[#2f80ed] font-montserrat underline text-[0.8rem] md:text-[1.1rem] cursor-pointer"
                          >
                            {toggledetails === el._id
                              ? "Less Details"
                              : "View Details"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {el._id == toggledetails && (
                    <div className="grid md:grid-cols-2 gap-[1rem] md:gap-[2rem] lg:gap-[5rem] mt-4">
                      <div className="col-span-1">
                        <p className="font-montserrat text-[1.2rem] md:text-[1.5rem] text-navibule">
                          Booking Summary
                        </p>
                        <div className="grid grid-cols-5 gap-3 mt-5 mb-4">
                          <div className="col-span-2">
                            <div className="mb-3">
                              <p className="font-montserrat font-medium text-[0.8rem] md:text-[1.1rem] text-navibule mb-1">
                                Full Name
                              </p>
                              <p className="font-montserrat font-medium text-[0.8rem] md:text-[1.1rem] text-navibule mb-1">
                                Unit
                              </p>
                              <p className="font-montserrat font-medium text-[0.8rem] md:text-[1.1rem] text-navibule mb-1">
                                Guest
                              </p>
                              <p className="font-montserrat font-medium text-[0.8rem] md:text-[1.1rem] text-primarygray">
                                Check - In
                              </p>
                              <p className="font-montserrat font-medium text-[0.8rem] md:text-[1.1rem] text-navibule mb-1">
                                {`${moment(new Date(el.startDate)).format(
                                  "ddd, MMM DD"
                                )}`}{" "}
                              </p>
                              <p className="font-montserrat font-medium text-[0.8rem] md:text-[1.1rem] text-primarygray">
                                From 11 : 00 PM
                              </p>
                            </div>
                          </div>

                          <div className="col-span-1 text-center flex justify-center">
                            <div className="h-full w-[1px] bg-[#d6d6d6] opacity-50"></div>
                          </div>

                          <div className="col-span-2 text-end">
                            <div className="mb-3">
                              <p className="font-montserrat font-medium text-[0.8rem] md:text-[1.1rem] text-navibule mb-1">
                                {el.name}
                              </p>
                              <p className="font-montserrat font-medium text-[0.8rem] md:text-[1.1rem] text-navibule">
                                Apartment
                              </p>
                              <p className="font-montserrat font-medium text-[0.8rem] md:text-[1.1rem] text-navibule">
                                Adult {el?.adult} Children {el?.child}
                              </p>

                              <p className="font-montserrat font-medium text-[0.8rem] md:text-[1.1rem] text-primarygray">
                                Check - Out
                              </p>
                              <p className="font-montserrat font-medium text-[0.8rem] md:text-[1.1rem] text-navibule mb-1">
                                {`${moment(el.endDate).format("ddd, MMM DD")}`}{" "}
                              </p>
                              <p className="font-montserrat font-medium text-[0.8rem] md:text-[1.1rem] text-primarygray">
                                From 11 : 00 PM
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-1">
                        <h2 className="font-montserrat text-[1.2rem] md:text-[1.5rem] text-navibule">
                          Booking Detail
                        </h2>

                        <div className="grid grid-cols-5 gap-3 mt-5 mb-4">
                          <div className="col-span-2">
                            <div className="mb-3">
                              <p className="font-montserrat font-medium text-[0.8rem] md:text-[1.1rem] text-navibule mb-1">
                                Status
                              </p>
                              <p className="font-montserrat font-medium text-[0.8rem] md:text-[1.1rem] text-navibule mb-1">
                                Discount
                              </p>
                              <p className="font-montserrat font-medium text-[0.8rem] md:text-[1.1rem] text-navibule mb-1">
                                Tax and Service fees
                              </p>
                              <p className="font-montserrat font-medium text-[0.8rem] md:text-[1.1rem] text-navibule mb-1">
                                Total{" "}
                              </p>
                            </div>
                          </div>

                          <div className="col-span-1 text-center flex justify-center">
                            <div className="h-full w-[1px] bg-[#d6d6d6] opacity-50"></div>
                          </div>

                          <div className="col-span-2 text-end">
                            <div className="mb-3">
                              <p className="font-montserrat font-medium text-[0.8rem] md:text-[1.1rem] text-navibule mb-1">
                                {"Confirmed"}
                              </p>
                              <p className="font-montserrat font-medium text-[0.8rem] md:text-[1.1rem] text-navibule">
                                {el?.dicountObj?.amount??0}
                              </p>
                              <p className="font-montserrat font-medium text-[0.8rem] md:text-[1.1rem] text-navibule">
                                {el?.gst?.amount ?? 0}
                              </p>
                              <p className="font-montserrat font-medium text-[0.8rem] md:text-[1.1rem] text-navibule mb-1">
                                ₹ {el.subTotalAmount}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="flex justify-center">
              <h4>No Booking Found</h4>
            </div>
          )}
        </>
      )}

      {orderList && orderList?.length > 0 && (
        <div className="row">
          <div className="col-md-10">
            <div className="col-lg-12 col-sm-10 col-md-12">
              <div className="row">
                <div className="pagination_list_box">
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel={<GoChevronRight />}
                    previousLinkClassName="circle_no"
                    nextLinkClassName="circle_no"
                    containerClassName="pagination_list"
                    pageLinkClassName="circle_no"
                    activeLinkClassName="active"
                    onPageChange={handlePageClick}
                    forcePage={page - 1}
                    pageRangeDisplayed={3}
                    pageCount={totalPage}
                    previousLabel={<GoChevronLeft />}
                    renderOnZeroPageCount={null}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Suspense>
  );
}
