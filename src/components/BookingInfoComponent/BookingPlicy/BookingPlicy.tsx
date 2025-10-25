"use client";
import React, { useState } from "react";

const BookingPlicy = ({ Information }: { Information: String }) => {
  const [expanded, setExpanded] = useState(0);
  console.log("Information", Information);
  const toggleAccordion = (index: any) => {
    setExpanded(expanded === index ? null : index);
  };
  const btn =
    "flex justify-between w-full py-3 font-medium rtl:text-right text-gray-500 gap-3";

  const btn2 =
    "font-montserrat text-left font-medium xl:text-[1rem] 2xl:text-[1.4rem] text-[17px] text-navibule";
  return (
    <>
      <div
        id="accordion-flush"
        data-accordion="collapse"
        data-active-classes="bg-white text-gray-900 dark:text-white"
        data-inactive-classes="text-gray-500 dark:text-gray-400"
        className="property_detail_shadow border border-gray-200 rounded-xl overflow-hidden p-3 md:p-5"
      >
        {/* Accordion Item 1 */}
        <div className="border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
          <h2 id="accordion-flush-heading-1">
            <button
              type="button"
              className={btn}
              data-accordion-target="#accordion-flush-body-1"
              aria-expanded={expanded === 0}
              aria-controls="accordion-flush-body-1"
              onClick={() => toggleAccordion(0)}
            >
              <span className={btn2}>Cancellation Policy</span>
              {expanded === 0 ? (
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
            </button>
          </h2>
          <div
            id="accordion-flush-body-1"
            className={`${expanded === 0 ? "" : "hidden"} mb-5`}
            aria-labelledby="accordion-flush-heading-1"
          >
            <div>
              <p className="font-montserrat font-normal text-primarygray leading-8 md:text-[1rem] text-[0.8rem]">
                If the Guest has made a partial payment/advance, the guest is
                entitled for a credit note of the same value. Value depends upon
                below situations:
              </p>
            </div>
            <ul className="list-disc pl-4 my-4">
              <li className="font-montserrat font-normal text-[0.9rem] text-primarygray mb-2">
                Cancellations that are made more than 7 days prior to the
                check-in date will receive a 90% refund of the total booking
                value or 100% in the form of a future credit note.
              </li>
              <li className="font-montserrat font-normal text-[0.9rem] text-primarygray mb-2">
                If the reservation is canceled 7 days or less from the check-in
                date or in case of a no-show, no refund will be issued to the
                guest.
              </li>
              <li className="font-montserrat font-normal text-[0.9rem] text-primarygray mb-2">
                In case of extreme last-minute cancellations due to extenuating
                circumstances, Guests will be refunded 85% of booking amount if
                thestaycationer.in gets another booking for the same date(s). If
                not, Guests will not be given a refund, and the cancellation
                will be treated as a no-show.
              </li>
            </ul>
          </div>
        </div>

        {/* Accordion Item 2 */}
        <div className="border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
          <h2 id="accordion-flush-heading-2">
            <button
              type="button"
              className={btn}
              data-accordion-target="#accordion-flush-body-2"
              aria-expanded={expanded === 1}
              aria-controls="accordion-flush-body-2"
              onClick={() => toggleAccordion(1)}
            >
              <span className={btn2}>Important Information</span>
              {expanded === 1 ? (
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
            </button>
          </h2>
          <div
            id="accordion-flush-body-2"
            className={`${expanded === 1 ? "" : "hidden"}`}
            aria-labelledby="accordion-flush-heading-2"
          >
            <div
              className="font-montserrat font-normal text-primarygray leading-8 md:text-[1rem] text-[0.8rem]"
              dangerouslySetInnerHTML={{
                __html: Information,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingPlicy;
