"use client";
import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { FaRegCalendar } from "react-icons/fa";
import Link from "next/link";
import { IoArrowForwardOutline } from "react-icons/io5";
import Recentblog from "@/components/BlogComponents/Recentblog/Recentblog";
import { STATUS } from "@/common/contstant";
import { IBlog, useBlog } from "@/services/blog.service";
import { generateFilePath } from "@/services/url.service";

const page = () => {
  const { data: blogs } = useBlog({
    status: STATUS.ACTIVE,
  });

  useEffect(() => {
    if (blogs && blogs?.data) {
      setBlogcard(blogs?.data);
    }
  }, [blogs]);
  const [blogcard, setBlogcard] = useState<IBlog[]>([]);
  const recentBlogs = blogs?.data?.slice(0, 3) || [];
  return (
    <Suspense fallback="Loading ....">
      <div className="w-[95%] md:w-[85%] lg:w-[85%] 2xl:w-[85%] mx-auto md:py-[2.5rem] py-[1rem]">

        <h1 className="lg:text-[33px] md:text-[28px] text-[21px] text-[#da6633] font-medium">Blogs</h1>
        <div className="grid grid-cols-1 my-4 gap-5 xl:gap-10">
          <div className="col-span-1">
            <div className="grid md:grid-cols-2 xl:!grid-cols-3 grid-cols-1 gap-6">
              {blogcard.map((el, index) => {
                return (
                  <>
                    <div className="col-span-12 md:col-span-1">
                      <div className="shadow-custom-light rounded-t-md overflow-hidden group">
                        <div className="w-full h-60 relative overflow-hidden">
                          <Link href={`blog/${el?._id}`}>
                            <Image
                              src={generateFilePath(el.thumbnail)}
                              alt=""
                              fill
                              className="object-cover overflow-hidden group-hover:scale-110 delay-75 duration-1000 group-hover:delay-75 group-hover:duration-1000 ease-in-out"
                            />
                          </Link>
                        </div>

                        <div className="p-4">
                          <div className="flex justify-between py-1">
                            <div className="flex gap-2 items-center font-montserrat text-primarygray text-[0.8rem] font-medium">
                              <FaRegCalendar />
                              {new Date(el.date).toDateString()}
                            </div>
                            {/* <div className="flex gap-2 items-center font-montserrat text-primarygray text-[0.8rem] font-medium">
                                                  <FaEye /> {el.blogview}
                                                </div> */}
                          </div>

                          <h4 className="font-playfair md:text-[22px] text-[18px] font-medium line-clamp-1 overflow-hidden">
                            {" "}
                            {el.name}{" "}
                          </h4>
                          <p
                            className="font-montserrat text-[14px] md:text-[1rem] text-primarygray my-2 line-clamp-2 overflow-hidden"
                            dangerouslySetInnerHTML={{
                              __html: el.description,
                            }}
                          ></p>
                          <Link
                            href={`blog/${el?._id}`}
                            className="flex font-montserrat font-[1rem] text-navibule gap-1 items-center py-2"
                          >
                            Read More <IoArrowForwardOutline />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>

          {/* <div className="hidden lg:block lg:col-span-1">
            <Recentblog data={recentBlogs} />
          </div> */}
        </div>
      </div>
    </Suspense>
  );
};

export default page;

{
  /* <div className="shadow-custom-light p-[0.5rem] md:p-[1rem] rounded-md">
  <div className="h-[10rem] md:h-[24rem] w-full relative">
    <Image
      src={blogimg}
      alt=""
      fill
      className="object-cover rounded-md"
    />
  </div>
  <div className="flex justify-between py-[1rem] md:py-[1.2rem]">
    <div className="flex gap-2 items-center font-montserrat text-primarygray text-[0.8rem] md:text-[1rem] font-medium">
      <FaRegCalendar /> 13 March 2024{" "}
    </div>
    <div className="flex gap-2 items-center font-montserrat text-primarygray text-[0.8rem] md:text-[1rem] font-medium">



      <FaEye /> 890 Views



    </div>
  </div>

  <h4 className="font-playfair md:text-[1.5rem] text-[18px] font-medium">
    10 Best Places to Visit in February and March 2024
  </h4>
  <p className="font-montserrat text-[14px] md:text-[1rem] text-primarygray py-[0.8rem] md:py-[0.5rem]">
    As winter gives way to spring, February and March become perfect
    months toexplore the diversity of India. The weather is generally
    pleasant across the country, making it an ideal…
  </p>
  <Link
    href=""
    className="flex font-montserrat font-[1rem] text-navibule gap-1 items-center py-2"
  >
    Read More <IoArrowForwardOutline />
  </Link>
</div> */
}
