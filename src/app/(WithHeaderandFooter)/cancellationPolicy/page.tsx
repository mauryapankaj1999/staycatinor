"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { Suspense } from 'react'

const page = () => {
    const pathname = usePathname()
    return (
      <Suspense fallback="Loading ....">
        <div className="bg-navibule text-center py-7">
          <div>
            <h4 className="font-montserrat text-white lg:text-[2.2rem] md:text-[30px] text-[24px]">
              Cancellation Policy
            </h4>
          </div>
        </div>

        <div className="w-[95%] lg:w-[85%] font-montserrat! mx-auto md:py-10 py-6">
          <div className="grid grid-cols-12 gap-5">
            <div className="lg:col-span-3 hidden lg:block">
              <div className="border p-3 sticky top-0">
                <Link
                  href="/PrivacyPolicy"
                  className={`mb-3 block py-2 px-4 font-montserrat text-[1.1rem] ${
                    pathname === "/PrivacyPolicy"
                      ? "bg-[#edeeef] border-l-2"
                      : ""
                  } text-navibule  border-navibule`}
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/TermsandCondition"
                  className={`block mb-3 py-2 px-4 ${
                    pathname === "/TermsandCondition"
                      ? "bg-[#edeeef] border-l-2"
                      : ""
                  } font-montserrat text-[1.1rem] text-navibule border-navibule`}
                >
                  Terms and Condition
                </Link>
                <Link
                  href="/cancellationPolicy"
                  className={`block py-2 px-4 ${
                    pathname === "/cancellationPolicy"
                      ? "bg-[#edeeef] border-l-2"
                      : ""
                  } font-montserrat text-[1.1rem] text-navibule border-navibule`}
                >
                  Cancellation Policy
                </Link>
              </div>
            </div>
            <div className="lg:col-span-9 col-span-12 lg:pl-10">
              <h3 className="font-montserrat text-[22px] md:text-[28px] lg:text-[2rem] text-navibule mt-5">
                Cancellation Policy
              </h3>
              <p className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                We understand that plans can change. Please read our
                cancellation terms carefully to avoid any confusion.
              </p>

              <h4 className="font-montserrat text-[1.1rem] text-navibule mt-6">
                Standard Cancellation
              </h4>
              <ul className="mt-3 list-disc pl-6">
                <li className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  <span className="font-semibold">
                    More than 7 days before check-in:
                  </span>{" "}
                  You will receive a 90% refund of the total booking value or
                  100% as a credit note (valid for future stays).
                </li>
                <li className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  <span className="font-semibold">
                    7 days or less before check-in / No-show:
                  </span>{" "}
                  Unfortunately, no refund will be issued.
                </li>
              </ul>

              <h4 className="font-montserrat text-[1.1rem] text-navibule mt-6">
                Last-Minute Cancellations (Extenuating Circumstances)
              </h4>
              <ul className="mt-3 list-disc pl-6">
                <li className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  In rare and genuine cases, if the cancellation happens
                  extremely close to the check-in date: Guests will receive an
                  85% refund only if we are able to rebook the same dates with
                  another guest.
                </li>
                <li className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  If not rebooked, it will be treated as a no-show and no refund
                  will be given.
                </li>
              </ul>

              <h4 className="font-montserrat text-[1.1rem] text-navibule mt-6">
                Property Unavailability
              </h4>
              <ul className="mt-3 list-disc pl-6">
                <li className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  In the unlikely event that the reserved property becomes
                  unavailable due to reasons such as maintenance, unexpected
                  damage, or any unforeseen situation:
                  <ul className="list-disc pl-6 mt-2">
                    <li className="mt-2">
                      We will offer alternative accommodation of equal or higher
                      value, or
                    </li>
                    <li className="mt-2">
                      Provide a full refund of your booking amount.
                    </li>
                  </ul>
                </li>
              </ul>

              <h4 className="font-montserrat text-[1.1rem] text-navibule mt-6">
                Reservation Modifications
              </h4>
              <ul className="mt-3 list-disc pl-6">
                <li className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  If you need to make changes to your reservation (e.g., dates,
                  number of guests), please contact us at the earliest. Changes
                  are subject to availability and may result in additional
                  charges.
                </li>
                <li className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  The original cancellation policy will still apply to any
                  modifications.
                </li>
              </ul>

              <h4 className="font-montserrat text-[1.1rem] text-navibule mt-6">
                Refund Processing
              </h4>
              <ul className="mt-3 list-disc pl-6">
                <li className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  Refunds (if applicable) will be processed within 10 working
                  days from the date of cancellation.
                </li>
                <li className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  Refunds will be made to the original payment method.
                </li>
              </ul>

              <h4 className="font-montserrat text-[1.1rem] text-navibule mt-6">
                Credit Note Policy
              </h4>
              <ul className="mt-3 list-disc pl-6">
                <li className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  <span className="font-semibold">Validity:</span> Credit notes
                  are valid for 12 months from the date of issue.
                </li>
                <li className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  <span className="font-semibold">Peak Dates:</span> Credit
                  notes cannot be redeemed for bookings during peak or
                  high-demand periods.
                </li>
                <li className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  <span className="font-semibold">Usage:</span> Only one credit
                  note can be applied per reservation.
                </li>
              </ul>

              <h4 className="font-montserrat text-[1.1rem] text-navibule mt-6">
                Peak Dates
              </h4>
              <p className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                Credit notes and certain offers do not apply during the
                following peak dates:
              </p>
              <ul className="mt-3 list-disc pl-6">
                <li className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  Independence Day – 15 August
                </li>
                <li className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  Diwali – 10 to 20 November
                </li>
                <li className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  Christmas & New Year – 24 December to 2 January
                </li>
                <li className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  Republic Day – 26 January
                </li>
                <li className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  Other Government Holidays
                </li>
              </ul>

              <h4 className="font-montserrat text-[1.1rem] text-navibule mt-6">
                Need Help?
              </h4>
              <p className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                We’re always here for you.
                <br />
                📧 Email:{" "}
                <a
                  href="mailto:stay@thestaycationer.in"
                  className="text-navibule underline"
                >
                  stay@thestaycationer.in
                </a>
                <br />
                📞 Call/WhatsApp: +91 7575-98-2121 / +91 7575-98-5757
              </p>
            </div>
          </div>
        </div>
      </Suspense>
    );
}

export default page
