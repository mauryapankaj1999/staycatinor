"use client";
import React, { Suspense } from "react";
import Image from "next/image";
import Recentblog from "@/components/BlogComponents/Recentblog/Recentblog";
import { IBlog, useBlog, useBlogByBy } from "@/services/blog.service";
import { generateFilePath } from "@/services/url.service";
import { FaRegCalendar, FaUser } from "react-icons/fa";

export default function page({ params }: { params: { id: string } }) {
  const { data: blogdetils } = useBlogByBy(
    decodeURIComponent(params.id),
    !!params.id
  );
  const { data: blogsData } = useBlog();

  const RecentBlogs = blogsData?.data
    .filter((b: IBlog) => b._id !== blogdetils?._id)
    .slice(0, 3);

  return (
    <Suspense fallback="Loading ....">
      <div className="w-[95%] md:w-[85%] lg:w-[85%] 2xl:w-[85%] mx-auto md:py-[2.5rem] py-[1rem]">
        <div className="grid md:grid-cols-3 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 my-4 gap-10">
          <div className="col-span-2">
            <div className="">
              <div className="h-[12rem] md:h-[24rem] w-full relative">
                <Image
                  src={generateFilePath(blogdetils?.thumbnail)}
                  alt=""
                  className="object-cover rounded-xl"
                  fill
                />
              </div>
              <div className="flex justify-between items-center my-[1rem] md:my-[1.4rem]">
                <div className="flex gap-4 items-center">
                  <FaUser />
                  <h4 className="font-montserrat font-medium text-[0.7rem] md:text-[1rem]">
                    {blogdetils?.author}{" "}
                  </h4>
                  
                </div>
                <div className="font-montserrat font-medium  text-[0.7rem] md:text-[1rem] flex items-center gap-2">
                  <FaRegCalendar />
                  {blogdetils?.date
                    ? new Date(blogdetils?.date).toDateString()
                    : ""}
                </div>
              </div>
              <div className="mb-4">
                <h4 className="font-playfair font-medium text-navibule text-[1rem] md:text-[2rem]">
                  {blogdetils?.name}
                </h4>
                <p
                  className="font-montserrat font-medium text-primarygray text-[1rem]"
                  dangerouslySetInnerHTML={{
                    __html: blogdetils?.description
                      ? blogdetils?.description
                      : "<p>Loading...</p>",
                  }}
                ></p>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="col-span-1">
              <div className="sticky top-0">
                <Recentblog data={RecentBlogs} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
