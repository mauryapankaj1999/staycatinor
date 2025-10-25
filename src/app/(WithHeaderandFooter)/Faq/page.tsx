"use client";
import React, { Suspense, useState } from "react";

const page = () => {
  const [expanded, setExpanded] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState("faqs");

  const toggleAccordion = (index: any) => {
    setExpanded(expanded === index ? null : index);
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    setExpanded(null); // Reset accordion when switching categories
  };

  const accordionItems = [
    {
      title: "How much is the security deposit?",
      content: `The security deposit is determined by The StayCationer and may vary based on the property. For specific details, please refer to the individual property description.`,
    },
    {
      title: "What are the charges for extra guests?",
      content: `Additional mattresses for extra guests can be arranged upon request, at an additional charge of ₹1,500 per adult, per night.`,
    },
    {
      title: "Is the villa pet friendly?",
      content: `All our homes are pet-friendly; however, prior approval is required. The number and size of pets must be confirmed before finalizing the booking. An additional surcharge or an increased security deposit may apply.`,
    },
    {
      title: "What is the cancellation policy?",
      content: `The cancellation policy is moderately flexible. To know more, read our cancellation policy.`,
    },
    {
      title: "What kind of services are included with the property?",
      content: `Daily housekeeping and villa cleaning are included with your stay. Our dedicated concierge team is available to assist with a wide range of arrangements, from transportation to restaurant reservations. Villa attendants are on-site and available from 8:00 AM to 10:00 PM to ensure a seamless and comfortable experience.`,
    },
    {
      title: "What is your pre-check in the process?",
      content: `To ensure a smooth and seamless arrival experience, a few pre-arrival formalities are required. Guests will be requested to provide a clear photo of a valid government-issued ID prior to check-in. This process helps us verify your identity and uphold a secure and comfortable environment for all our guests.`,
    },
    {
      title: "What payment methods are available?",
      content: `We offer multiple convenient payment options for your reservation. Accepted methods include Credit Card, Debit Card, Net Banking, UPI, and Cash.`,
    },
    {
      title: "How would you ensure my villa is well maintained?",
      content: `To ensure your villa remains in excellent condition, we conduct regular inspections along with unannounced audits. This helps us maintain the highest standards of upkeep and service at all times.`,
    },
    {
      title: "How would I know at what price my villa is booked at?",
      content: `At The StayCationer, transparency with homeowners is a core principle. We provide a detailed monthly report outlining all bookings, including pricing and the source of each reservation.`,
    },
    {
      title:
        "How do you ensure rules and regulations at my villas are adhered to?",
      content: `Before accepting the booking, we inform the guests about all the rules and regulations about the property.`,
    },
    {
      title: "More questions?",
      content: `Call us on +91 7575-98-2121 or email us your questions on info@thestaycationer.in`,
    },
  ];

  const bookingItems = [
    {
      title: "How do I make a reservation on your website?",
      content: `Making a reservation on our website is easy! Simply go to the "Book Now" or "Reservations" section, choose your check-in and check-out dates, select the type of room you prefer, and follow the on-screen instructions to complete your booking.`,
    },
    {
      title: "What information do I need to provide when booking?",
      content: `You'll need to provide basic information such as your name, contact details, check-in/check-out dates, number of guests, and payment information. A valid government-issued ID will also be required for verification.`,
    },
    {
      title: "Can I book multiple properties at once?",
      content: `Yes, you can book multiple properties. However, each property requires a separate booking process to ensure proper management and service delivery.`,
    },
    {
      title: "Is there a minimum stay requirement?",
      content: `Minimum stay requirements may vary by property and season. Please check the specific property details for minimum stay requirements.`,
    },
  ];

  const cancellationItems = [
    {
      title: "What is your cancellation policy?",
      content: `Our cancellation policy is moderately flexible. Cancellations made 48 hours before check-in are eligible for a full refund. Cancellations made within 48 hours may incur charges.`,
    },
    {
      title: "How do I cancel my booking?",
      content: `You can cancel your booking by logging into your account, going to "My Bookings" section, and selecting the cancel option. You can also contact our customer support team for assistance.`,
    },
    {
      title: "Will I get a refund if I cancel?",
      content: `Refund eligibility depends on when you cancel relative to your check-in date and the specific cancellation policy of the property. Please refer to your booking confirmation for detailed terms.`,
    },
    {
      title: "Can I modify my booking instead of cancelling?",
      content: `Yes, you can modify your booking subject to availability and the property's modification policy. Changes may incur additional charges depending on the new booking details.`,
    },
  ];

  const rentalItems = [
    {
      title: "How can I list my property with you?",
      content: `To list your property, contact our team at +91 7575-98-2121 or email us at info@thestaycationer.in. Our team will guide you through the listing process and requirements.`,
    },
    {
      title: "What are the requirements for listing my home?",
      content: `Your property should meet our quality standards, have proper documentation, and be well-maintained. Our team will conduct an inspection to ensure it meets our guest expectations.`,
    },
    {
      title: "How much commission do you charge?",
      content: `Our commission structure is competitive and transparent. Please contact our team for detailed information about commission rates and payment terms.`,
    },
    {
      title: "How do I track my property's performance?",
      content: `We provide detailed monthly reports outlining all bookings, pricing, occupancy rates, and revenue. You'll have complete transparency about your property's performance.`,
    },
  ];

  const getCurrentItems = () => {
    switch (activeCategory) {
      case "faqs":
        return accordionItems;
      case "booking":
        return bookingItems;
      case "cancellation":
        return cancellationItems;
      case "rental":
        return rentalItems;
      default:
        return accordionItems;
    }
  };

  const getCurrentTitle = () => {
    switch (activeCategory) {
      case "faqs":
        return "FAQ'S";
      case "booking":
        return "How to Book Apartment and Villas";
      case "cancellation":
        return "Cancellation Policy";
      case "rental":
        return "How to Start Rental";
      default:
        return "FAQ'S";
    }
  };

  const sidebarItems = [
    { id: "faqs", label: "FAQ's" },
    { id: "booking", label: "How to Book Apartment and Villas" },
    { id: "cancellation", label: "What type of Cancellation Booking" },
    { id: "rental", label: "How to Start for Rental my homes" },
  ];

  return (
    <Suspense fallback="Loading ....">
      <div className="w-[95%] md:w-[85%] lg:w-[85%] 2xl:w-[85%] mx-auto md:py-[2.2rem] py-[1rem]">
        <div className="text-center my-6">
          <h4 className="font-playfair font-medium text-[1.4rem] md:text-[2.5rem] text-navibule mb-3">
            Frequently Asked Question
          </h4>
          <p className="font-montserrat font-medium text-[0.7rem] md:text-[1rem] text-primarygray">
            So if you're feel stuck, confused, or just need some extra help,
            don't hesitate <br />
            to reach out at support Staycationer
          </p>
        </div>

        <div className="grid grid-cols-8 mt-8 gap-10">
          <div className="col-span-2 hidden md:block">
            <div className="">
              <ul>
                {sidebarItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleCategoryClick(item.id)}
                      className={`w-full text-left py-3 px-4 font-montserrat text-[1rem] font-medium transition-colors duration-200 ${
                        activeCategory === item.id
                          ? "bg-primarydark text-white"
                          : "bg-[#f5f5f5] text-navibule hover:bg-gray-200"
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="md:col-span-6 col-span-8">
            <div className="border rounded-md p-4">
              <h3 className="font-playfair 2xl:text-[1.9rem] xl:text-[1.8rem] mb-2 hidden md:block">
                {getCurrentTitle()}
              </h3>

              {/* Mobile Category Selector */}
              <div className="md:hidden mb-4">
                <select
                  value={activeCategory}
                  onChange={(e) => handleCategoryClick(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md font-montserrat text-navibule"
                >
                  {sidebarItems.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div
                id="accordion-flush"
                data-accordion="collapse"
                data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                data-inactive-classes="text-gray-500 dark:text-gray-400"
              >
                {getCurrentItems().map((item, index) => (
                  <div
                    key={`${activeCategory}-${index}`}
                    className="border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
                  >
                    <h2
                      id={`accordion-flush-heading-${activeCategory}-${
                        index + 1
                      }`}
                    >
                      <button
                        type="button"
                        className="flex md:items-center justify-between w-full py-3 font-medium md:rtl:text-right text-gray-500 gap-3"
                        data-accordion-target={`#accordion-flush-body-${activeCategory}-${
                          index + 1
                        }`}
                        aria-expanded={expanded === index}
                        aria-controls={`accordion-flush-body-${activeCategory}-${
                          index + 1
                        }`}
                        onClick={() => toggleAccordion(index)}
                      >
                        <span className="text-start font-playfair font-medium xl:text-[1rem] text-[0.9rem] 2xl:text-[1.1rem] text-navibule">
                          {item.title}
                        </span>
                        <svg
                          data-accordion-icon
                          className={`w-3 h-3 ${
                            expanded !== index ? "rotate-180" : ""
                          } shrink-0 transition-transform duration-200`}
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 10 6"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5 5 1 1 5"
                          />
                        </svg>
                      </button>
                    </h2>
                    <div
                      id={`accordion-flush-body-${activeCategory}-${index + 1}`}
                      className={`${
                        expanded === index ? "block" : "hidden"
                      } transition-all duration-200`}
                      aria-labelledby={`accordion-flush-heading-${activeCategory}-${
                        index + 1
                      }`}
                    >
                      <div className="py-5 border-b border-gray-200 dark:border-gray-700">
                        <p className="font-montserrat font-medium text-primarygray md:leading-8 md:text-[1rem] text-[0.8rem]">
                          {item.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default page;
