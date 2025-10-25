"use client";
import React from "react";
import Image from "next/image";
import {  FaRegCalendar } from "react-icons/fa";
import { generateFilePath } from "@/services/url.service";
import Link from "next/link";

const Recentblog = ({ data }: any) => {
  return (
    <>
      <div className="">
        <h3 className="font-playfair font-medium text-[1.8rem] text-navibule">
          Recent Blog
        </h3>

        {data?.map((el: any, index: number) => {
          return (
            <>
              <Link
                href={`/blog/${el._id}`}
                className="inline-block w-full"
              >
                <div className="shadow-custom-light mt-2 mb-5 p-2 xl:p-5">
                  <div className="lg:h-[13rem] xl:h-[15rem]  w-full relative">
                    <Image
                      src={generateFilePath(el.thumbnail)}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between py-1">
                      <div className="flex gap-2 items-center font-montserrat text-primarygray text-[0.8rem] font-medium">
                        <FaRegCalendar /> {new Date(el.date).toDateString()}
                      </div>
                      {/* <div className="flex gap-2 items-center font-montserrat text-primarygray text-[0.8rem] font-medium"><FaEye />{el.blogview}</div> */}
                    </div>
                    <h4 className="font-playfair text-[1.1rem] font-medium line-clamp-1 overflow-hidden">
                      {el.name}{" "}
                    </h4>
                  </div>
                </div>
              </Link>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Recentblog;
