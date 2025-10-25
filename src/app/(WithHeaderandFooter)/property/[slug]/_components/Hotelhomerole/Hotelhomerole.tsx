"use client";
import React, { useState } from "react";
import Mobilecomponentaccrodion from "../../../_components/Mobilecomponent/Mobilecomponentaccrodion";

const CHAR_LIMIT = 350; // Adjust as needed

const Hotelhomerole = ({
  propertyRules,
}: {
  propertyRules: string;
}) => {
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => setShowAll((prev) => !prev);

  // Sliced HTML string
  const slicedRules =
    propertyRules.length > CHAR_LIMIT && !showAll
      ? propertyRules.slice(0, CHAR_LIMIT) + "..."
      : propertyRules;

  return (
    <>
      <div className="property_detail_shadow md:rounded-md px-[0.5rem] py-[0.6rem] md:px-[1rem] md:py-[1rem] mt-6 md:mt-8 hidden md:block">
        <h3 className="font-playfair md:text-[20px] xl:text-[20px] mb-2 text-[16px] font-semibold">
          Home Rules
        </h3>
        <div
          className="font-montserrat text-justify font-medium 2xl:text-[16px] lg:text-[15px] md:text-[14px] text-[11px] text-primarygray mb-2"
          dangerouslySetInnerHTML={{ __html: slicedRules }}
        />
        {propertyRules.length > CHAR_LIMIT && (
          <button
            className="underline mt-2"
            onClick={toggleShowAll}
          >
            {showAll ? "Read Less" : "Read More"}
          </button>
        )}
      </div>
      <div className="md:hidden">
        <Mobilecomponentaccrodion title="Home Rules">
          <div
          className="text-justify"
            dangerouslySetInnerHTML={{
              __html: slicedRules,
            }}
          />
          {propertyRules.length > CHAR_LIMIT && (
            <button className=" underline mt-2" onClick={toggleShowAll}>
              {showAll ? "Read Less" : "Read More"}
            </button>
          )}
        </Mobilecomponentaccrodion>
      </div>
    </>
  );
};

export default Hotelhomerole;
