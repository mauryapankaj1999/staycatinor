"use client";
import Image from "next/image";
import React, { useState } from "react";

const PropertyFaq = ({
  faqs,
}: {
  faqs: {
    question: string;
    answer: string;
  }[];
}) => {
  const [expanded, setExpanded] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <>
      <div className="property_detail_shadow md:rounded-md px-[0.5rem] py-[0.6rem] md:px-[1rem] md:py-[1rem] md:mt-8 mt-6 w-full max-w-full box-border">
        <h3 className="font-playfair md:text-[20px] xl:text-[20px] mb-2 text-[16px] lg:font-normal xl:font-normal 2xl:font-normal font-semibold">
          FAQ'S
        </h3>
        <div
          id="accordion-flush"
          data-accordion="collapse"
          data-active-classes="bg-white text-gray-900 dark:text-white"
          data-inactive-classes="text-gray-500 dark:text-gray-400"
          className="w-full max-w-full"
        >
          {faqs.map((item, index) => (
            <div
              key={index}
              className="border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 w-full max-w-full"
            >
              <h2 id={`accordion-flush-heading-${index + 1}`}>
                <button
                  type="button"
                  className="flex justify-between items-start w-full max-w-full py-3 font-medium rtl:text-right text-gray-500 gap-3"
                  data-accordion-target={`#accordion-flush-body-${index + 1}`}
                  aria-expanded={expanded === index}
                  aria-controls={`accordion-flush-body-${index + 1}`}
                  onClick={() => toggleAccordion(index)}
                >
                  <span className="font-montserrat text-left flex-1 min-w-0 max-w-full font-medium md:text-[16px] text-[14px] text-navibule break-words hyphens-auto word-wrap-break overflow-wrap-anywhere">
                    {item.question}
                  </span>
                  <div className="flex-shrink-0 ml-2">
                    {expanded === index ? (
                      <svg
                        className="w-6 h-6 shrink-0"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M18 12H6"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-6 h-6 shrink-0"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v12m6-6H6"
                        />
                      </svg>
                    )}
                  </div>
                </button>
              </h2>
              <div
                id={`accordion-flush-body-${index + 1}`}
                className={`transition-all duration-300 ease-in-out ${
                  expanded === index ? "block" : "hidden"
                }`}
                aria-labelledby={`accordion-flush-heading-${index + 1}`}
              >
                <div className="pb-3 border-b border-gray-200 dark:border-gray-700 w-full max-w-full">
                  <p className="font-medium leading-relaxed font-montserrat md:text-[16px] text-[12px] text-primarygray break-words hyphens-auto whitespace-pre-wrap word-wrap-break overflow-wrap-anywhere max-w-full">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PropertyFaq;
