import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function Mobilecomponentaccrodion({ title, children }: any) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="accordion border-b border-gray-300 px-2">
      <div
        className=" flex justify-between items-center py-4"
        onClick={toggleAccordion}
      >
        <h3 className="font-playfair font-playfair 2xl:text-[30px] md:text-[20px] xl:text-[20px] text-[16px] md:font-normal lg:font-normal xl:font-normal 2xl:font-normal font-[600]">
          {title}
        </h3>
        <span className="text-xl">
          {isOpen ? (
            <FaChevronUp className="text-[0.8rem] text-[#6b7280]" />
          ) : (
            <FaChevronDown className="text-[0.8rem] text-[#6b7280]" />
          )}
        </span>
      </div>
      {isOpen && (
        <div className="accordion-content px-1 py-2 bg-white">{children}</div>
      )}
    </div>
  );
}
