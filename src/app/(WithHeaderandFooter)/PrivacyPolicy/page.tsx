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
              Privacy Policy
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
              <p className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                This Privacy Policy outlines how SAYERET BUSINESS SOLUTIONS
                PRIVATE LIMITED (“we,” “our,” or “us”) collects, uses, and
                protects any information that you provide when you visit our
                website or engage with our services, including purchases made
                through our platforms.
              </p>
              <p className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                We are committed to protecting your privacy. If we request
                personally identifiable information while you are using this
                website, rest assured it will be used in accordance with this
                Privacy Policy. We may revise this Policy from time to time.
                Please check this page periodically to stay updated.
              </p>

              <h3 className="font-montserrat text-[22px] md:text-[28px] lg:text-[2rem] text-navibule mt-5">
                Information We Collect
              </h3>
              <ul className="mt-6 list-disc pl-6">
                <li className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  Name
                </li>
                <li className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  Contact information, including email address and phone number
                </li>
                <li className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  Demographic data such as postal code, preferences, and
                  interests
                </li>
                <li className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  Other voluntarily shared information, such as survey responses
                  or promotional offers
                </li>
              </ul>

              <h3 className="font-montserrat text-[22px] md:text-[28px] lg:text-[2rem] text-navibule mt-5">
                How We Use the Information
              </h3>
              <ul className="mt-6 list-disc pl-6"></ul>
              <li className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                Internal record-keeping
              </li>
              <li className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                Improving our services and website experience
              </li>
              <li className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                Sending promotional communications (with your consent)
              </li>
              <li className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                Conducting market research
              </li>
              <li className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                Tailoring website content to your interests
              </li>
              {/* </ul> */}
              <p className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                We implement industry-standard security measures to protect your
                data from unauthorized access or misuse.
              </p>

              <h3 className="font-montserrat text-[22px] md:text-[28px] lg:text-[2rem] text-navibule mt-5">
                Data Retention
              </h3>
              <ul className="mt-6 list-disc pl-6">
                <li className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  We retain your personal data only for as long as necessary to
                  fulfil the purposes outlined in this policy
                </li>
                <li className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  Comply with legal, tax, accounting, or regulatory obligations
                </li>
                <li className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  Resolve disputes and enforce our agreements
                </li>
              </ul>
              <p className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                When personal information is no longer needed, we securely
                delete or anonymize it.
              </p>

              <h3 className="font-montserrat text-[22px] md:text-[28px] lg:text-[2rem] text-navibule mt-5">
                Use of Third-Party Tools
              </h3>
              <ul className="mt-6 list-disc pl-6">
                <li className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  Google Analytics – for website traffic and usage analysis
                </li>
                <li className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  Meta (Facebook/Instagram) Ads – for promotional advertising
                </li>
                <li className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  Mailchimp or similar – for email marketing communications
                </li>
              </ul>
              <p className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                These tools may collect information using cookies or similar
                technologies. Their use of your information is governed by their
                respective privacy policies.
              </p>

              <h3 className="font-montserrat text-[22px] md:text-[28px] lg:text-[2rem] text-navibule mt-5">
                Cookies and Tracking
              </h3>
              <p className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                A cookie is a small file placed on your device’s browser with
                your consent. It helps improve your experience by tracking your
                preferences and activity.
              </p>
              <ul className="mt-6 list-disc pl-6">
                <li className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  Traffic log cookies – to identify which pages are accessed and
                  improve performance
                </li>
                <li className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  Session cookies – to remember your selections temporarily
                </li>
                <li className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  Third-party cookies – set by tools like Google Analytics or
                  Facebook Pixel for analytics and marketing
                </li>
              </ul>
              <p className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                You may disable cookies through your browser settings. However,
                doing so may limit website functionality.
              </p>

              <h3 className="font-montserrat text-[22px] md:text-[28px] lg:text-[2rem] text-navibule mt-5">
                Cookie Disclaimer
              </h3>
              <p className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                By continuing to use our website, you consent to our use of
                cookies in accordance with this Privacy Policy. You may manage
                cookie preferences in your browser settings at any time.
              </p>

              <h3 className="font-montserrat text-[22px] md:text-[28px] lg:text-[2rem] text-navibule mt-5">
                Controlling Your Personal Information
              </h3>
              <ul className="mt-6 list-disc pl-6">
                <li className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  Opting out during form submission
                </li>
                <li className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  Unsubscribing from promotional communications by contacting us
                  at{" "}
                  <a
                    href="mailto:stay@thestaycationer.in"
                    className="text-navibule underline"
                  >
                    stay@thestaycationer.in
                  </a>
                </li>
              </ul>
              <p className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                We do not sell or lease your data to third parties. We may share
                promotional offers from trusted partners only with your consent.
              </p>

              <h3 className="font-montserrat text-[22px] md:text-[28px] lg:text-[2rem] text-navibule mt-5">
                Correction of Information
              </h3>
              <p className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                To update or correct any personal data we hold, please contact
                us:
              </p>
              <ul className="mt-6 list-disc pl-6">
                <li className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  📍 48, Dharam Marg, New Delhi-110021
                </li>
                <li className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  📧{" "}
                  <a
                    href="mailto:stay@thestaycationer.in"
                    className="text-navibule underline"
                  >
                    stay@thestaycationer.in
                  </a>
                </li>
                <li className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                  📞 +91 7575 98 2121 / +91 7575 98 5757
                </li>
              </ul>

              <h3 className="font-montserrat text-[22px] md:text-[28px] lg:text-[2rem] text-navibule mt-5">
                Consent
              </h3>
              <p className="mt-3 font-montserrat lg:text-[1.2rem] md:text-[18px] text-[15px] font-normal text-primarygray">
                By using our website and services, you agree to the collection
                and use of information as described in this Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </Suspense>
    );
}

export default page
