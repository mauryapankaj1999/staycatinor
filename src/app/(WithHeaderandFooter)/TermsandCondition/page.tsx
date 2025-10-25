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
              Terms and Condition
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
              <h4 className="font-montserrat  md:text-[1.2rem] text-[16px]">
                Last modified: Jan 13 2024
              </h4>

              <p className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                For the purpose of these Terms and Conditions, The term "we",
                "us", "our" used anywhere on this page shall mean SAYERET
                BUSINESS SOLUTIONS PRIVATE LIMITED, whose registered/operational
                office is 48, Dharam Marg, New Delhi-110021. "you", “your”,
                "user", “visitor” shall mean any natural or legal person who is
                visiting our website and/or agreed to purchase from us.
              </p>
              <p className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                Your use of the website and/or purchase from us are governed by
                following Terms and Conditions:
              </p>
              <ul className="mt-6 list-disc pl-6">
                <li className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  The content of the pages of this website is subject to change
                  without notice.
                </li>
                <li className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  Neither we nor any third parties provide any warranty or
                  guarantee as to the accuracy, timeliness, performance,
                  completeness or suitability of the information and materials
                  found or offered on this website for any particular purpose.
                  You acknowledge that such information and materials may
                  contain inaccuracies or errors and we expressly exclude
                  liability for any such inaccuracies or errors to the fullest
                  extent permitted by law.
                </li>
                <li className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  Your use of any information or materials on our website and/or
                  product pages is entirely at your own risk, for which we shall
                  not be liable. It shall be your own responsibility to ensure
                  that any products, services or information available through
                  our website and/or product pages meet your specific
                  requirements.
                </li>
                <li className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  Our website contains material which is owned by or licensed to
                  us. This material includes, but are not limited to, the
                  design, layout, look, appearance and graphics. Reproduction is
                  prohibited other than in accordance with the copyright notice,
                  which forms part of these terms and conditions.
                </li>
                <li className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  All trademarks reproduced in our website which are not the
                  property of, or licensed to, the operator are acknowledged on
                  the website.
                </li>
                <li className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  Unauthorized use of information provided by us shall give rise
                  to a claim for damages and/or be a criminal offense.
                </li>
                <li className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  From time to time our website may also include links to other
                  websites. These links are provided for your convenience to
                  provide further information.
                </li>
                <li className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  You may not create a link to our website from another website
                  or document without SAYERET BUSINESS SOLUTIONS PRIVATE
                  LIMITED’s prior written consent.
                </li>
                <li className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  Any dispute arising out of use of our website and/or purchase
                  with us and/or any engagement with us is subject to the laws
                  of India.
                </li>
                <li className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  We, shall be under no liability whatsoever in respect of any
                  loss or damage arising directly or indirectly out of the
                  decline of authorization for any Transaction, on Account of
                  the Cardholder having exceeded the preset limit mutually
                  agreed by us with our acquiring bank from time to time.
                </li>
              </ul>

              <h3 className="font-montserrat text-[22px] md:text-[28px] lg:text-[2rem] text-navibule mt-5">
                Booking and Payment Terms
              </h3>
              <ul className="mt-3 list-disc pl-6">
                <li className="font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  All reservations/bookings are subject to availability and
                  confirmation.
                </li>
                <li className="font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  Full or partial payment must be made in advance as per the
                  payment schedule shared at the time of booking.
                </li>
                <li className="font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  Prices are subject to change without prior notice unless
                  already confirmed.
                </li>
                <li className="font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  We reserve the right to refuse, cancel, or modify bookings in
                  case of inaccurate listings, double bookings, or unforeseen
                  property issues.
                </li>
              </ul>

              <h3 className="font-montserrat text-[22px] md:text-[28px] lg:text-[2rem] text-navibule mt-5">
                Property Unavailability
              </h3>
              <ul className="mt-3 list-disc pl-6">
                <li className="font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  If a property becomes unavailable due to unforeseen
                  circumstances (e.g. damage or maintenance), The StayCationer
                  reserves the right to:
                  <ul className="list-disc pl-6 mt-2">
                    <li>
                      Provide alternate accommodation of equal or higher value,
                      or
                    </li>
                    <li>Issue a full refund to the guest.</li>
                  </ul>
                </li>
              </ul>

              <h3 className="font-montserrat text-[22px] md:text-[28px] lg:text-[2rem] text-navibule mt-5">
                Refund & Cancellation Policy
              </h3>
              <ul className="mt-3 list-disc pl-6">
                <li className="font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  Refer to our separate Cancellation & Refund Policy page for
                  detailed terms.
                </li>
                <li className="font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  Refunds, if applicable, will be processed through the original
                  payment method within a specified timeline.
                </li>
                <li className="font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  Cancellation terms vary by property. Guests are advised to
                  review the specific cancellation policy shared at the time of
                  booking.
                </li>
              </ul>

              <h3 className="font-montserrat text-[22px] md:text-[28px] lg:text-[2rem] text-navibule mt-5">
                User Responsibilities
              </h3>
              <ul className="mt-3 list-disc pl-6">
                <li className="font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  You agree not to use our website for any unlawful or
                  prohibited activities.
                </li>
                <li className="font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  You must provide accurate, current, and complete information
                  while making bookings or enquiries.
                </li>
                <li className="font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  Guests agree to use the property responsibly and follow all
                  house rules communicated before or during the stay. Failure to
                  comply may result in cancellation of the booking or additional
                  charges.
                </li>
                <li className="font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  Guests are responsible for maintaining the property in good
                  condition. Any damage, loss, or violation of house rules may
                  lead to deductions from the security deposit or legal action.
                </li>
                <li className="font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  Homeowners agree to provide accurate information about their
                  property and permit The StayCationer to manage bookings,
                  guests, and housekeeping, as per the signed agreement.
                </li>
              </ul>

              <h3 className="font-montserrat text-[22px] md:text-[28px] lg:text-[2rem] text-navibule mt-5">
                Intellectual Property
              </h3>
              <ul className="mt-3 list-disc pl-6">
                <li className="font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  All content, design, graphics, logos, and text are the
                  intellectual property of Sayeret Business Solutions Pvt. Ltd.
                </li>
                <li className="font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  Unauthorized use, reproduction, or redistribution is strictly
                  prohibited and may lead to legal action.
                </li>
              </ul>

              <h3 className="font-montserrat text-[22px] md:text-[28px] lg:text-[2rem] text-navibule mt-5">
                Limitation of Liability
              </h3>
              <ul className="mt-3 list-disc pl-6">
                <li className="font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  We are not liable for any indirect, incidental, or
                  consequential damages arising out of the use or inability to
                  use our website or services.
                </li>
                <li className="font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  We shall not be held responsible for third-party service
                  failures, including payment gateways or internet providers.
                </li>
                <li className="font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  Any personal injury, loss, or theft occurring during the stay.
                </li>
                <li className="font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  Disruption due to natural calamities, government regulations,
                  or property-specific issues beyond our control.
                </li>
              </ul>

              <h3 className="font-montserrat text-[22px] md:text-[28px] lg:text-[2rem] text-navibule mt-5">
                Pet and Smoking Policy
              </h3>
              <ul className="mt-3 list-disc pl-6">
                <li className="font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  Pets are allowed only with prior written approval and may be
                  subject to additional charges.
                </li>
                <li className="font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  Smoking is strictly prohibited indoors. Designated smoking
                  areas are provided where applicable.
                </li>
              </ul>

              <h3 className="font-montserrat text-[22px] md:text-[28px] lg:text-[2rem] text-navibule mt-5">
                Check-In and Check-Out
              </h3>
              <ul className="mt-3 list-disc pl-6">
                <li className="font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  Standard check-in and check-out times will be communicated
                  with each booking. Early check-in and late check-out requests
                  are subject to availability and may incur charges.
                </li>
              </ul>

              <h3 className="font-montserrat text-[22px] md:text-[28px] lg:text-[2rem] text-navibule mt-5">
                Transaction Decline
              </h3>
              <ul className="mt-3 list-disc pl-6">
                <li className="font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  We are not liable for any loss or damage arising from payment
                  failures, including card transaction declines due to limit
                  issues or banking errors.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Suspense>
    );
}

export default page
