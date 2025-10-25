import { SectionProps } from "@/services/page.service";
import { generateFilePath } from "@/services/url.service";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import memorableimg from "@/assets/allimg/gift_img.jpg";
export default function MidBanner({
  section,
}: {
  section: SectionProps | null;
}) {
  return (
    <>
      {section && section?.image && (
        <div className="w-[95%] md:w-[85%] lg:w-[85%] 2xl:w-[85%] mx-auto md:py-[1.5rem] lg:pb-8 lg:pt-[2.25rem] xl:py-[2.5rem] 2xl:pt-10 2xl:pb-14 hidden md:block">
          <div
            style={{
              backgroundImage: `url(${generateFilePath(section?.image)})`,
            }}
            className={`bg-cover bg-right rounded-md p-4  w-full between-max1280-and-1280min:h-[290px] between-max1440-and-1440min:h-[288px] between-xl-and-16xl:h-[317px] lg:h-[225px] xl:h-[295px] 2xl:h-[380px] bg-full flex items-center custome_shadow`}
          >
            <div className="grid lg:grid-cols-2 py:[1.5rem] md:py-[2rem] w-full">
              <div className="col_ks lg:col-start-2 lg:justify-self-end">
                <h2 className="mb-3 text-[#ececec] font-playfair font-medium between-max1280-and-1280min:text-[33px] lg:text-[33px] md:text-[28px] text-[21px] lg:leading-[2.3rem] capitalize">
                  {section?.title}
                </h2>
                <p className="  text-[#ececec] between-max1280-and-1280min:text-[0.8rem] lg:text-[12px] xl:text-[1rem]  text-[0.8rem] 2xl:text-[1rem]  font-montserrat font-light pt-2 pb-6 lg:!pt-0 lg:!pb-3 ">
                  {section?.description}
                </p>
                <Link
                  href="/create-gift"
                  className="2xl:mt-5  px-5 py-2 bg-navibule inline-block text-[0.9rem] font-montserrat xl:text-[1rem] text-white rounded-full hover:bg-[#da6633]"
                >
                  Explore now
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --------------------------------------- for mobile and tabs section  ----------------------------------------- */}
      {/* --------------------------------------- for mobile section  ----------------------------------------- */}
      <div className="md:hidden my-1">
        <div className="w-[95%] mx-auto md:py-12">
          <h2 className="text-[#da6633] font-playfair text-center font-medium  text-[21px] capitalize">
            {section?.title}
          </h2>
          <p className="text-[#000] lg:text-[14px] text-[12px] font-montserrat font-normal pt-2 pb-6 text-center">
            {section?.description}
          </p>
          <div className="relative w-full h-[250px]">
            <Image
              src={memorableimg}
              fill
              className="object-cover rounded-xl"
              alt=""
            />
          </div>
          <div className="my-4 text-center">
            <Link
              href="/create-gift"
              className=" 2xl:mt-5 px-[1rem] py-[0.6rem] md:px-[1.6rem] md:py-[1rem] bg-navibule inline-block text-[0.9rem] font-montserrat xl:text-[1rem] text-white rounded-full hover:bg-[#da6633]"
            >
              Explore now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
