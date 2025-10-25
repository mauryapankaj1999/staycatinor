"use client";
import React, { useState } from "react";
import Mobilecomponentaccrodion from "../../../_components/Mobilecomponent/Mobilecomponentaccrodion";
const MAX_LENGTH = 250; // Adjust as needed

const HotelToDo = ({ todos }: { todos: string }) => {
  const isLong = todos?.length > MAX_LENGTH;
  const [showAll, setShowAll] = useState(false);

  const displayedText = showAll || !isLong
    ? todos
    : todos.slice(0, MAX_LENGTH) + "...";

  return (
    <>
      <div className="property_detail_shadow md:rounded-md px-[0.5rem] py-[0.6rem] md:px-[1rem] md:py-[1rem] mt-6 md:mt-8 hidden md:block">
        <h3 className="font-playfair md:text-[20px] xl:text-[20px]  mb-2 text-[16px] md:font-normal lg:font-normal xl:font-normal 2xl:font-normal font-semibold">
          Things to Do
        </h3>
        <div
          className="font-montserrat text-justify font-medium 2xl:text-[16px] lg:text-[15px] md:text-[14px] text-[11px] text-primarygray mb-2"
          dangerouslySetInnerHTML={{ __html: displayedText }}
        ></div>
        {isLong && (
          <button
            className=" underline mt-2"
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? "Read Less" : "Read More"}
          </button>
        )}
      </div>

      {/* mobile */}
      <div className="md:hidden mt-4">
        <Mobilecomponentaccrodion title="Things to Do">
          <div
          className="text-justify"
            dangerouslySetInnerHTML={{ __html: displayedText }}
          ></div>
          {isLong && (
            <button
              className="underline mt-2"
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? "Read Less" : "Read More"}
            </button>
          )}
        </Mobilecomponentaccrodion>
      </div>
    </>
  );
};

export default HotelToDo;
