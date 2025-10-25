"use client";

import React, { useState } from "react";
import listImg from "@/assets/allimg/listwebimg3.webp";
import needicon1 from "@/assets/allimg/needicon1.png";
import needicon2 from "@/assets/allimg/needicon2.png";
import needicon5 from "@/assets/allimg/needicon5.png";
import { FiGift } from "react-icons/fi";
import { MdOutlineFastfood } from "react-icons/md";
import { TbHomeStar } from "react-icons/tb";
import Image from "next/image";
import img1 from "@/assets/allimg/singerimg.jpg";
import img2 from "@/assets/allimg/singerimg2.jpg";
import Link from "next/link";
import verify from "@/assets/allimg/verify.png";
import badge from "@/assets/allimg/badge.png";
import star from "@/assets/allimg/star.png";
import silver from "@/assets/allimg/card 1.png";
import gold from "@/assets/allimg/card 2.png";
import platinum from "@/assets/allimg/card 3.png";
import food from "@/assets/allimg/coffee.png";
import offer from "@/assets/allimg/gift-box.png";
import wifi from "@/assets/allimg/wifi-signal.png";
import room from "@/assets/allimg/bedroom.png";
import india from "@/assets/allimg/indiaFlag.png";
import enjoy from "@/assets/allimg/job-satisfaction.webp";
import earning from "@/assets/allimg/winner.webp";
import stay from "@/assets/allimg/blissful.webp";
import pay from "@/assets/allimg/hand.webp";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useAddLoyaltyQuery } from "@/services/LoyaltyQuery.service";
import { toastError } from "@/utils/toast";
import { useSession } from "next-auth/react";

export default function page() {
  const [expanded, setExpanded] = useState(0);
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    travelType: "",
    DateOfBirth: "",
  });

  const { mutateAsync: addLoyaltyQuery } = useAddLoyaltyQuery();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toggleAccordion = (index: any) => {
    setExpanded(expanded === index ? null : index);
  };

  const { data: session } = useSession();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let obj = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      city: formData.city,
      travelType: formData.travelType,
      DateOfBirth: formData.DateOfBirth,
    };

    try {
      await addLoyaltyQuery(obj);
      setOpen(true);
    } catch (error: any) {
      toastError(error?.response?.data?.message || error);
    }
  };

  const accordionItems = [
    {
      title: " How do I join The StayCationer Loyalty Program",
      content: `<p>You can simply enroll for the loyalty program by The StayCationer by filling the form on the website or You can contact us through our phone number or you can mail us.</p>`,
    },
    {
      title: "What are the different loyalty tiers and how are they assigned?",
      content: `<p>We offer three tiers, based on your activity over the past year:</p>
       <table class="w-full text-left table-auto border-collapse mt-2">
        <thead>
          <tr>
            <th class="border px-3 py-2">Tier Name</th>
            <th class="border px-3 py-2">Eligibility</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border px-3 py-2">Silver</td>
            <td class="border px-3 py-2">2 stays/year</td>
          </tr>
          <tr>
            <td class="border px-3 py-2">Gold</td>
            <td class="border px-3 py-2">4 stays/year or 4 referrals</td>
          </tr>
          <tr>
            <td class="border px-3 py-2">Platinum</td>
            <td class="border px-3 py-2">6+ stays/year or 6+ referrals</td>
          </tr>
        </tbody>
      </table>
      <p>Your tier is assigned and updated automatically based on your most recent 12-month activity. If you're eligible for a higher tier, your benefits start immediately.
</p>`,
    },
    {
      title: "Can I check my tier or points online?",
      content: `<p>Your loyalty is important to us, and we’re always keeping track of your stays, referrals, and rewards in the background. Whenever you’d like to know your current tier, reward points, or available perks, just send us a quick message on WhatsApp or email. We’ll be happy to share an update and make sure you’re enjoying all the benefits you’ve earned. Thank you for being a valued part of The StayCationer community!</p>

`,
    },
    {
      title: "How do I earn points? ",
      content: `<p>Points are automatically awarded after each eligible stay, referral, or review:</p>
      <ul style="list-style-type: disc; padding-left: 20px;">
      <li>Silver Tier: 10% of booking value</li>
      <li>Gold Tier: 15% of booking value</li>
      <li>Platinum Tier: 20% of booking value</li>
      <li>Referrals: 500–1500 points (based on tier)</li>
      <li>Online Reviews: +500 points per platform per stay (Google, TripAdvisor, Booking.com)</li></ul>`,
    },
    {
      title: "How can I redeem my benefits?",
      content: `<p>Once you qualify for Orange or Black, a relationship manager will handle all your benefits, point redemptions, and special requests. For the Beige tier, simply reach out to our team during your next booking to apply your benefits.</p>`,
    },
    {
      title: "Do loyalty points expire?",
      content: `<p>Yes, depending on your tier:</p>
       <ul style="list-style-type: disc; padding-left: 20px;">
      <li>Silver Tier: Points valid for 365 days from last stay/referral</li>
      <li>Gold Tier: Valid for 730 days</li>
      <li>Platinum Tier: Evergreen – as long as you complete 1 stay or referral every year</li></ul>
      <p>We’ll remind you before your points are set to expire.</p>`,
    },
    {
      title: "Can I combine rewards or stack offers?",
      content: `Loyalty rewards cannot be combined with other third-party discounts. However, within The StayCationer system, multiple benefits (points + discounts + perks) can be used together, subject to availability and tier level.
`,
    },
    {
      title: "Can I transfer my points or share them with friends/family?",
      content: `No, loyalty points are non-transferable. They are linked to your mobile number email and tracked internally for secure reward allocation.
`,
    },
    {
      title: " What if I forget to mention my referral or forget to review?",
      content: `<p>No problem!</p>
       <ul style="list-style-type: disc; padding-left: 20px;">
      <li>Referrals: Share your preferred guest’s booking ID with us within 7 days of their check-in.</li>
      <li>Reviews: Send us a screenshot of your review within 7 days of checkout to earn points.</li></ul>
`,
    },
  ];
  return (
    <>
      <div className="container mx-auto py-4 lg:py-8 px-[1rem]">
        <h2 className="md:text-[2.5rem] text-[22px] text-[#dc774c] font-bold text-center">
          Explore offerings and benefits
        </h2>
        <div className="flex flex-row pb-8 pt-14 lg:pt-[7rem] gap-10 px-0 lg:px-10 lg:items-center lg:justify-center overflow-x-scroll lg:overflow-x-hidden">
          {/* Silver Card */}
          <div className="membership_card w-[360px] min-w-[290px] bg-white border border-[#E7E7E7] rounded-2xl shadow-md flex flex-col md:min-h-[650px min-h-[230px]">
            <div className="rounded-t-2xl flex flex-col">
              <div className="relative w-full lg:h-[220px] h-[100px] mt-[-35px] lg:mt-[-102px]">
                <Image
                  src={silver}
                  alt="Silver Tier"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="px-9 py-4">
                <p className="font-montserrat text-[#3a3d42d0] font-bold lg:text-[15px] text-[12px]">
                  For our frequent friends – 2 stays/year referral earns you
                  this tier.
                </p>
              </div>
              <ul className="flex flex-col gap-2 lg:!gap-4 lg:px-8 px-[1rem] pt-2 pb-5  max-h-[400px]  overflow-y-auto flex-grow">
                <li className="font-montserrat text-[#7d838e] flex flex-row gap-2">
                  <div className="bg-[#e5e7eb] w-6 h-6 inline-flex rounded-full items-center justify-center">
                    <div className="relative w-full h-[16px]">
                      <Image
                        src={verify}
                        alt="Checkmark"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <h2 className="lg:text-[16px] text-[14px] w-[90%]">
                    10% off on every booking
                  </h2>
                </li>
                <li className="font-montserrat text-[#7d838e] flex flex-row gap-2">
                  <div className="bg-[#e5e7eb] w-6 h-6 inline-flex rounded-full items-center justify-center">
                    <div className="relative w-full h-[16px]">
                      <Image
                        src={verify}
                        alt="Checkmark"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <h2 className="lg:text-[16px] text-[14px] w-[90%]">
                    10% off on food & beverages
                  </h2>
                </li>
                <li className="font-montserrat text-[#7d838e] flex flex-row gap-2">
                  <div className="bg-[#e5e7eb] w-6 h-6 inline-flex rounded-full items-center justify-center">
                    <div className="relative w-full h-[16px]">
                      <Image
                        src={verify}
                        alt="Checkmark"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <h2 className="lg:text-[16px] text-[14px] w-[90%]">
                    Earn 10% of stay value back in loyalty points
                  </h2>
                </li>
                <li className="font-montserrat text-[#7d838e] flex flex-row gap-2">
                  <div className="bg-[#e5e7eb] w-6 h-6 inline-flex rounded-full items-center justify-center">
                    <div className="relative w-full h-[16px]">
                      <Image
                        src={verify}
                        alt="Checkmark"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <h2 className="lg:text-[16px] text-[14px] w-[90%]">
                    50% off on one date change
                  </h2>
                </li>
                <li className="font-montserrat text-[#7d838e] flex flex-row gap-2">
                  <div className="bg-[#e5e7eb] w-6 h-6 inline-flex rounded-full items-center justify-center">
                    <div className="relative w-full h-[16px]">
                      <Image
                        src={verify}
                        alt="Checkmark"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <h2 className="lg:text-[16px] text-[14px] w-[90%]">
                    500 points per guest referred
                  </h2>
                </li>
                <li className="font-montserrat text-[#7d838e] flex flex-row gap-2">
                  <div className="bg-[#e5e7eb] w-6 h-6 inline-flex rounded-full items-center justify-center">
                    <div className="relative w-full h-[16px]">
                      <Image
                        src={verify}
                        alt="Checkmark"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <h2 className="lg:text-[16px] text-[14px] w-[90%]">
                    10% off on curated activities
                  </h2>
                </li>
                <li className="font-montserrat text-[#7d838e] flex flex-row gap-2">
                  <div className="bg-[#e5e7eb] w-6 h-6 inline-flex rounded-full items-center justify-center">
                    <div className="relative w-full h-[16px]">
                      <Image
                        src={verify}
                        alt="Checkmark"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <h2 className="lg:text-[16px] text-[14px] w-[90%]">
                    Early check-in (subject to availability)
                  </h2>
                </li>
                <li className="font-montserrat text-[#7d838e] flex flex-row gap-2">
                  <div className="bg-[#e5e7eb] w-6 h-6 inline-flex rounded-full items-center justify-center">
                    <div className="relative w-full h-[16px]">
                      <Image
                        src={verify}
                        alt="Checkmark"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <h2 className="lg:text-[16px] text-[14px] w-[90%]">
                    Tier valid for 365 days from last stay/referral
                  </h2>
                </li>
              </ul>
            </div>
          </div>

          {/* Gold Card */}
          <div className="membership_card w-[360px] min-w-[290px] bg-white border border-[#E7E7E7] rounded-2xl shadow-md flex flex-col md:min-h-[650px min-h-[230px]">
            <div className="rounded-t-2xl flex flex-col">
              <div className="relative w-full lg:h-[220px] h-[100px] mt-[-35px] lg:mt-[-102px]">
                <Image
                  src={gold}
                  alt="Gold Tier"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="px-9 py-4">
                <p className="font-montserrat text-[#3a3d42d0] font-bold lg:text-[15px] text-[12px]">
                  For our loyal insiders – 4 stays/year or 4 referral unlocks
                  this tier.
                </p>
              </div>
              <ul className="flex flex-col gap-2 lg:!gap-4 lg:px-8 px-[1rem] pt-2 pb-5  max-h-[400px]  overflow-y-auto flex-grow scrollbar-hide">
                <li className="font-montserrat text-[#7d838e] flex flex-row gap-2">
                  <div className="bg-[#e5e7eb] w-6 h-6 inline-flex rounded-full items-center justify-center">
                    <div className="relative w-full h-[16px]">
                      <Image
                        src={verify}
                        alt="Checkmark"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <h2 className="lg:text-[16px] text-[14px] w-[90%]">
                    15% off on every booking
                  </h2>
                </li>
                <li className="font-montserrat text-[#7d838e] flex flex-row gap-2">
                  <div className="bg-[#e5e7eb] w-6 h-6 inline-flex rounded-full items-center justify-center">
                    <div className="relative w-full h-[16px]">
                      <Image
                        src={verify}
                        alt="Checkmark"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <h2 className="lg:text-[16px] text-[14px] w-[90%]">
                    Free breakfast + 15% off on food & beverages
                  </h2>
                </li>
                <li className="font-montserrat text-[#7d838e] flex flex-row gap-2">
                  <div className="bg-[#e5e7eb] w-6 h-6 inline-flex rounded-full items-center justify-center">
                    <div className="relative w-full h-[16px]">
                      <Image
                        src={verify}
                        alt="Checkmark"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <h2 className="lg:text-[16px] text-[14px] w-[90%]">
                    Earn 15% of stay value back in loyalty points
                  </h2>
                </li>
                <li className="font-montserrat text-[#7d838e] flex flex-row gap-2">
                  <div className="bg-[#e5e7eb] w-6 h-6 inline-flex rounded-full items-center justify-center">
                    <div className="relative w-full h-[16px]">
                      <Image
                        src={verify}
                        alt="Checkmark"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <h2 className="lg:text-[16px] text-[14px] w-[90%]">
                    2 free date changes
                  </h2>
                </li>
                <li className="font-montserrat text-[#7d838e] flex flex-row gap-2">
                  <div className="bg-[#e5e7eb] w-6 h-6 inline-flex rounded-full items-center justify-center">
                    <div className="relative w-full h-[16px]">
                      <Image
                        src={verify}
                        alt="Checkmark"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <h2 className="lg:text-[16px] text-[14px] w-[90%]">
                    1000 points per guest referred
                  </h2>
                </li>
                <li className="font-montserrat text-[#7d838e] flex flex-row gap-2">
                  <div className="bg-[#e5e7eb] w-6 h-6 inline-flex rounded-full items-center justify-center">
                    <div className="relative w-full h-[16px]">
                      <Image
                        src={verify}
                        alt="Checkmark"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <h2 className="lg:text-[16px] text-[14px] w-[90%]">
                    20% off on curated activities
                  </h2>
                </li>
                <li className="font-montserrat text-[#7d838e] flex flex-row gap-2">
                  <div className="bg-[#e5e7eb] w-6 h-6 inline-flex rounded-full items-center justify-center">
                    <div className="relative w-full h-[16px]">
                      <Image
                        src={verify}
                        alt="Checkmark"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <h2 className="lg:text-[16px] text-[14px] w-[90%]">
                    Early check-in + late checkout
                  </h2>
                </li>
                <li className="font-montserrat text-[#7d838e] flex flex-row gap-2">
                  <div className="bg-[#e5e7eb] w-6 h-6 inline-flex rounded-full items-center justify-center">
                    <div className="relative w-full h-[16px]">
                      <Image
                        src={verify}
                        alt="Checkmark"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <h2 className="lg:text-[16px] text-[14px] w-[90%]">
                    Tier valid for 730 days from last stay/referral
                  </h2>
                </li>
                <li className="font-montserrat text-[#7d838e] flex flex-row gap-2">
                  <div className="bg-[#e5e7eb] w-6 h-6 inline-flex rounded-full items-center justify-center">
                    <div className="relative w-full h-[16px]">
                      <Image
                        src={verify}
                        alt="Checkmark"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <h2 className="lg:text-[16px] text-[14px] w-[90%]">
                    Dedicated Concierge
                  </h2>
                </li>
              </ul>
            </div>
          </div>

          {/* Platinum Card */}
          <div className="membership_card w-[360px] min-w-[290px] bg-white border border-[#E7E7E7] rounded-2xl shadow-md flex flex-col md:min-h-[650px min-h-[230px]">
            <div className="rounded-t-2xl flex flex-col">
              <div className="relative w-full lg:h-[220px] h-[100px] mt-[-35px] lg:mt-[-102px]">
                <Image
                  src={platinum}
                  alt="Platinum Tier"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="px-9 py-4">
                <p className="font-montserrat text-[#3a3d42d0] font-bold lg:text-[15px] text-[12px]">
                  For our champions – 6+ stays/year or 2+ referrals earn you
                  elite status.
                </p>
              </div>
              <ul className="flex flex-col gap-2 lg:!gap-4 lg:px-8 px-[1rem] pt-2 pb-5  max-h-[400px]  overflow-y-auto flex-grow">
                <li className="font-montserrat text-[#7d838e] flex flex-row gap-2">
                  <div className="bg-[#e5e7eb] w-6 h-6 inline-flex rounded-full items-center justify-center">
                    <div className="relative w-full h-[16px]">
                      <Image
                        src={verify}
                        alt="Checkmark"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <h2 className="lg:text-[16px] text-[14px] w-[90%]">
                    20% off on every booking
                  </h2>
                </li>
                <li className="font-montserrat text-[#7d838e] flex flex-row gap-2">
                  <div className="bg-[#e5e7eb] w-6 h-6 inline-flex rounded-full items-center justify-center">
                    <div className="relative w-full h-[16px]">
                      <Image
                        src={verify}
                        alt="Checkmark"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <h2 className="lg:text-[16px] text-[14px] w-[90%]">
                    Free breakfast + 20% off on food & beverages
                  </h2>
                </li>
                <li className="font-montserrat text-[#7d838e] flex flex-row gap-2">
                  <div className="bg-[#e5e7eb] w-6 h-6 inline-flex rounded-full items-center justify-center">
                    <div className="relative w-full h-[16px]">
                      <Image
                        src={verify}
                        alt="Checkmark"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <h2 className="lg:text-[16px] text-[14px] w-[90%]">
                    Earn 20% of stay value back in loyalty points
                  </h2>
                </li>
                <li className="font-montserrat text-[#7d838e] flex flex-row gap-2">
                  <div className="bg-[#e5e7eb] w-6 h-6 inline-flex rounded-full items-center justify-center">
                    <div className="relative w-full h-[16px]">
                      <Image
                        src={verify}
                        alt="Checkmark"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <h2 className="lg:text-[16px] text-[14px] w-[90%]">
                    4 free date changes
                  </h2>
                </li>
                <li className="font-montserrat text-[#7d838e] flex flex-row gap-2">
                  <div className="bg-[#e5e7eb] w-6 h-6 inline-flex rounded-full items-center justify-center">
                    <div className="relative w-full h-[16px]">
                      <Image
                        src={verify}
                        alt="Checkmark"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <h2 className="lg:text-[16px] text-[14px] w-[90%]">
                    1500 points per guest referred
                  </h2>
                </li>
                <li className="font-montserrat text-[#7d838e] flex flex-row gap-2">
                  <div className="bg-[#e5e7eb] w-6 h-6 inline-flex rounded-full items-center justify-center">
                    <div className="relative w-full h-[16px]">
                      <Image
                        src={verify}
                        alt="Checkmark"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <h2 className="lg:text-[16px] text-[14px] w-[90%]">
                    50% off on curated activities
                  </h2>
                </li>
                <li className="font-montserrat text-[#7d838e] flex flex-row gap-2">
                  <div className="bg-[#e5e7eb] w-6 h-6 inline-flex rounded-full items-center justify-center">
                    <div className="relative w-full h-[16px]">
                      <Image
                        src={verify}
                        alt="Checkmark"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <h2 className="lg:text-[16px] text-[14px] w-[90%]">
                    Early check-in + late checkout guaranteed wherever possible
                  </h2>
                </li>
                <li className="font-montserrat text-[#7d838e] flex flex-row gap-2">
                  <div className="bg-[#e5e7eb] w-6 h-6 inline-flex rounded-full items-center justify-center">
                    <div className="relative w-full h-[16px]">
                      <Image
                        src={verify}
                        alt="Checkmark"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <h2 className="lg:text-[16px] text-[14px] w-[90%]">
                    Tier never expires as long as there's one stay or referral
                    every 730 days
                  </h2>
                </li>
                <li className="font-montserrat text-[#7d838e] flex flex-row gap-2">
                  <div className="bg-[#e5e7eb] w-6 h-6 inline-flex rounded-full items-center justify-center">
                    <div className="relative w-full h-[16px]">
                      <Image
                        src={verify}
                        alt="Checkmark"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <h2 className="lg:text-[16px] text-[14px] w-[90%]">
                    Dedicated Personal Concierge
                  </h2>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="container mx-auto py-8">
        <div className="grid grid-cols-2 bg-[#f5f5f5]">
          <div className="col-span-1 px-10 py-4">
            <h2 className="text-[33px] text-[#dc774c] font-bold my-2 pt-4">
              Exclusive Savings Privilege
            </h2>
            <p className="font-montserrat text-[16       px] flex flex-col gap-1">
              As a valued Premium or VIP member, you can unlock the Exclusive
              Rate Enhancer — granting up to 20% off on every booking. Once
              enabled, this feature also elevates your Rewards accumulation to:
              <ul className="list-disc pl-4 ">
                <li> Premium members earn 9 points per USD </li>
                <li> VIP members earn a distinguished 12 points per USD</li>
              </ul>
            </p>
            <button className="text-white py-1 px-3 bg-[#dc774c] w-max mt-4 rounded-2xl">
              Sign in
            </button>
          </div>
          <div className="col-span-1 ">
            <div className="relative w-full h-[300px] ">
              <Image
                src={img1}
                alt=""
                fill
                className="object-cover rounded-l-full"
              />
            </div>
          </div>
        </div>
      </div> */}
      <div className="py-8">
        <div className="relative before:absolute before:contents-[''] before:z-[1]  before:top-0 before:left-0 before:w-full  bg-[url('/bgImg.jpg')] bg-cover h-[450px]  w-full flex flex-col items-center justify-center ">
          {/* <div className=" absolute custom_shadow bg-white gap-4 p-8 rounded-lg z-[2]">
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-[22px] font-bold my-2 pt-4 ">
                Join Staycationer Rewards
              </h2>
              <p className="font-montserrat text-[#5e5c5c]">
                Start earning points today and enjoy exclusive benefits
              </p>
            </div>
            <form action="" className="flex flex-col mt-4">
              <label className="font-montserrat text-[14px] text-[#3f3e3ec4] font-bold">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="ring-[#f5f5f5] ring-0 rounded-lg p-2 mt-2 focus-visible:outline-none focus-visible:ring-2"
              />
            </form>
            <button className="text-white bg-[#dc774c] w-full mt-4 rounded-lg py-2 font-medium">
              Join Now
            </button>
          </div> */}

          <div className="grid grid-cols-6 lg:grid-cols-12 gap-0 lg:!px-10 px-2">
            <div className="col-span-2 lg:!col-span-4 bg-[#363636b3] backdrop-blur-[6px] rounded-l-lg flex flex-col  lg:py-4 lg:px-8 px-2">
              <h2 className="text-white text-[26px] font-extrabold ">
                {/* Join Loyalty Rewards */}
              </h2>
              <div className="flex flex-col lg:gap-8 gap-4 pt-4">
                <div className="flex flex-col lg:flex-row items-center lg:gap-4 gap-3">
                  <div className="relative lg:w-[50px] lg:h-[50px] w-[30px] h-[30px]">
                    <Image src={room} alt="" fill className="object-contain" />
                  </div>
                  <h3 className="text-white font-montserrat text-[14px] lg:text-[16px] text-center">
                    Free room nights
                  </h3>
                </div>
                <div className="flex flex-col lg:flex-row items-center lg:gap-4 gap-3">
                  <div className="relative lg:w-[50px] lg:h-[50px] w-[30px] h-[30px]">
                    <Image src={food} alt="" fill className="object-contain" />
                  </div>
                  <h3 className="text-white font-montserrat text-[14px] lg:text-[16px] text-center">
                    Complimentary breakfast
                  </h3>
                </div>
                <div className="flex flex-col lg:flex-row items-center lg:gap-4 gap-3">
                  <div className="relative lg:w-[50px] lg:h-[50px] w-[30px] h-[30px]">
                    <Image src={offer} alt="" fill className="object-contain" />
                  </div>
                  <h3 className="text-white font-montserrat text-[14px] lg:text-[16px] text-center">
                    Special offers
                  </h3>
                </div>
                <div className="flex flex-col lg:flex-row items-center lg:gap-4 gap-3">
                  <div className="relative lg:w-[50px] lg:h-[50px] w-[30px] h-[30px]">
                    <Image src={wifi} alt="" fill className="object-contain" />
                  </div>
                  <h3 className="text-white font-montserrat text-[14px] lg:text-[16px] text-center">
                    Free Early Check-in
                  </h3>
                </div>
              </div>
            </div>
            <div className="col-span-4 lg:!col-span-8 bg-[#ffffff63] backdrop-blur-[12px] lg:pt-10 lg:py-6 lg:px-8 px-4 py-3 rounded-r-lg">
              <form
                onSubmit={handleSubmit}
                action=""
                className="flex flex-col lg:gap-4 gap-[0.5rem]"
              >
                <h2 className="lg:text-[26px] text-[14px] font-extrabold ">
                  Join the StayCationer Loyalty Program
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4 gap-[0.5rem] ">
                  <div className="col-span-1">
                    <input
                      type="text"
                      name="name"
                      onChange={handleChange}
                      placeholder="Full Name"
                      required
                      className="border-0 c_shadow w-[100%] rounded-lg font-montserrat "
                      value={formData.name}
                    />
                  </div>

                  <div className="col-span-1">
                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      onChange={handleChange}
                      value={formData.email}
                      required
                      className="border-0 c_shadow lg:w-[315px] w-[100%] font-montserrat  rounded-lg"
                    />
                  </div>

                  <div className="col-span-1 ">
                    <div className="flex flex-row items-center border-0 c_shadow font-montserrat rounded-lg bg-white">
                      <div className="relative w-[30px] h-[30px] ml-2">
                        <Image
                          src={india}
                          alt=""
                          fill
                          className="object-contain "
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="+91"
                        name="phone"
                        onChange={(e) => {
                          // Only allow digits, max 10
                          const value = e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 10);
                          setFormData((prevData) => ({
                            ...prevData,
                            phone: value,
                          }));
                        }}
                        value={formData.phone}
                        maxLength={10}
                        required
                        className="border-none outline-none focus-visible:outline-none f w-[100%] rounded-lg"
                        inputMode="numeric"
                        pattern="[0-9]{10}"
                        autoComplete="tel"
                      />
                    </div>
                  </div>

                  <div className="col-span-1">
                    <input
                      type="text"
                      name="city"
                      onChange={handleChange}
                      value={formData.city}
                      placeholder="Select city"
                      required
                      className="border-0 c_shadow lg:w-[315px] w-[100%] font-montserrat  rounded-lg"
                    />
                  </div>
                  <div className="col-span-1">
                    <select
                      name="travelType"
                      onChange={handleChange}
                      value={formData.travelType}
                      className="border-0 c_shadow lg:w-[315px] w-[100%] rounded-lg text-gray-500  font-montserrat"
                    >
                      <option value="" disabled className="">
                        Preferred Travel Type
                      </option>
                      <option value="Solo">Solo </option>
                      <option value="Couple">Couple </option>
                      <option value="Family">Family </option>
                      <option value="Group">Group </option>
                      <option value="Corporate">Corporate </option>
                    </select>
                  </div>
                  <div className="col-span-1 flex flex-col relative">
                    <input
                      type="date"
                      name="DateOfBirth"
                      onChange={handleChange}
                      value={formData.DateOfBirth}
                      required
                      className="border-0 c_shadow w-[100%] font-montserrat rounded-lg pt-3 peer"
                      max={new Date().toISOString().split("T")[0]}
                      id="date-of-birth"
                      placeholder=" "
                    />
                    <label
                      htmlFor="date-of-birth"
                      className={`absolute left-0 top-0 rounded-lg text-gray-500 text-[13px] font-montserrat pointer-events-none transition-all duration-200
                        flex items-center
                        w-[80%]
                        ${formData.DateOfBirth ? "hidden" : ""}
                            peer-focus:hidden
                          bg-white`}
                      style={{
                        background: "white",
                        paddingLeft: "10px",
                        height: "100%",
                        paddingRight: "10px",
                      }}
                    >
                      Date of Birth
                    </label>
                  </div>
                </div>
                <button
                  className="!bg-[#dc774c]  text-white w-max lg:px-6 lg:py-2 px-4 py-1 rounded-lg "
                  type="submit"
                >
                  Join
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto lg:py-10">
        <h2 className="text-[#DC774C] text-[22px] lg:text-[35px] font-bold text-center">
          Every Stay Brings You More
        </h2>
        <p className="text-[#000000ad] lg:text-[16px] text-[14px] text-center font-montserrat px-4 lg:px-12 lg:w-[70%] mx-auto mb-5">
          The StayCationer's Loyalty Program makes every stay more rewarding.
          Earn points, unlock discounts, and enjoy exclusive offers every time
          you book with us. Joining is easy—sign up on our website or call us
          directly. You’ll receive a digital or physical Loyalty card with a
          unique number, which you can use while booking to claim your rewards.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:py-5 lg:gap-20 gap-4 px-4 lg:px-0">
          <div
            className="col-span-1 hover:border-[#dc774c] hover:scale-105 transition-transform duration-300 border-2 px-6 py-4 rounded-lg flex flex-col
           gap-3 items-center justify-center"
          >
            <div className="inline-flex items-center justify-center border-[1px] border-[#dc774c] rounded-full h-[60px] w-[60px]">
              <div className="relative w-full h-[40px] ">
                <Image src={stay} alt="" fill className="object-contain " />
              </div>
            </div>
            <h3 className="text-[16px] font-bold text-[#434548] text-center font-montserrat">
              Celebrations Made Special
            </h3>
            <p className="text-center text-[14px] lg:text-[16px] text-[#777373e0] font-montserrat">
              From birthdays to anniversaries, enjoy complimentary surprises,
              curated moments, and family-sharing rewards. Our loyalty program
              makes every stay not just memorable—but deeply personal.
            </p>
          </div>
          <div className="col-span-1 border-2 hover:border-[#dc774c] hover:scale-105 transition-transform duration-300 px-6 py-4 rounded-lg flex flex-col gap-3 items-center justify-center">
            <div className="inline-flex items-center justify-center border-[1px]  border-[#dc774c] rounded-full h-[60px] w-[60px]">
              <div className="relative w-full h-[40px] ">
                <Image src={enjoy} alt="" fill className="object-contain" />
              </div>
            </div>

            <h3 className="text-[16px] font-bold text-[#434548] text-center font-montserrat">
              Value for Money
            </h3>
            <p className="text-center text-[14px] lg:text-[16px] text-[#777373e0] font-montserrat">
              Redeem points for free stays, get exclusive member discounts, and
              enjoy double-point days. Every booking guarantees you more
              savings, more comfort, and more rewards.
            </p>
          </div>
          <div className="col-span-1 hover:border-[#dc774c] hover:scale-105 transition-transform duration-300 border-2 px-6 py-4 rounded-lg flex flex-col gap-3 items-center justify-center ">
            <div className="inline-flex items-center justify-center border-[1px] border-[#dc774c] rounded-full h-[60px] w-[60px]">
              <div className="relative w-full h-[40px] ">
                <Image src={pay} alt="" fill className="object-contain " />
              </div>
            </div>
            <h3 className="text-[16px] font-bold text-[#434548] text-center font-montserrat">
              Engagement & Experience
            </h3>
            <p className="text-center text-[14px] lg:text-[16px] text-[#777373e0] font-montserrat">
              Unlock curated itineraries, free transfers, early check-ins, and
              access to special events. Our loyalty program keeps you engaged,
              rewarded, and delighted long after check-out.
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto py-8 px-4 lg:px-0">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-[22px] lg:text-[33px] font-bold my-2 ">
            Frequently Asked Questions
          </h2>
          <h3 className="font-montserrat text-[#5e5c5c] text-[14px] lg:text-[16px] ">
            The StayCationer Loyalty Program
          </h3>
          <div className="border rounded-md p-4 mt-8 max-width-[800px] w-full">
            <h3 className="font-playfair 2xl:text-[1.9rem] xl:text-[1.8rem] mb-2 hidden md:block">
              FAQ’S
            </h3>
            <div
              id="accordion-flush"
              data-accordion="collapse"
              data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              data-inactive-classes="text-gray-500 dark:text-gray-400"
            >
              {accordionItems.map((item, index) => (
                <div
                  key={index}
                  className="border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 font-montserrat"
                >
                  <h2 id={`accordion-flush-heading-${index + 1}`}>
                    <button
                      type="button"
                      className="flex md:items-center justify-between w-full py-3 font-medium md:rtl:text-right text-gray-500   gap-3"
                      data-accordion-target={`#accordion-flush-body-${
                        index + 1
                      }`}
                      aria-expanded={expanded === index}
                      aria-controls={`accordion-flush-body-${index + 1}`}
                      onClick={() => toggleAccordion(index)}
                    >
                      <span className="text-start font-playfair font-medium xl:text-[1rem] text-[0.9rem] 2xl:text-[1.1rem] text-navibule">
                        {item.title}
                      </span>
                      <svg
                        data-accordion-icon
                        className={`w-3 h-3 ${
                          expanded === index ? "" : "rotate-180"
                        } shrink-0`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 5 5 1 1 5"
                        />
                      </svg>
                    </button>
                  </h2>
                  <div
                    id={`accordion-flush-body-${index + 1}`}
                    className={`${expanded === index ? "" : "hidden"}`}
                    aria-labelledby={`accordion-flush-heading-${index + 1}`}
                  >
                    <div className="pb-2 border-b border-gray-200 dark:border-gray-700">
                      <p
                        className="font-montserrat font-medium text-primarygray md:leading-8 md:text-[1rem] text-[0.8rem]"
                        dangerouslySetInnerHTML={{ __html: item.content }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="relative z-50"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out
    data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-[1000] w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-6">
            <DialogPanel
              transition
              className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-gradient-to-br from-white to-orange-100 text-left shadow-xl
        transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
            >
              <div className="px-6 pt-6 pb-4 sm:p-8 sm:pb-6">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-[#ffe6d6] shadow-inner">
                    <svg
                      className="h-7 w-7 text-[#dc774c]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 11c0-3 3-3 3-6a3 3 0 10-6 0c0 3 3 3 3 6m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>

                  <DialogTitle
                    as="h3"
                    className="text-xl font-bold text-[#dc774c] mb-2"
                  >
                    Thank you for joining The StayCationer Loyalty!{" "}
                  </DialogTitle>

                  <p className="text-sm text-gray-600 font-montserrat">
                    We’re thrilled to welcome you to a world of curated escapes
                    and special privileges. Watch your inbox for your welcome
                    email and rewards details.
                  </p>
                </div>
              </div>

              <div className="flex justify-center bg-[#c5623862] px-6 py-4">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center rounded-full  !bg-[#dc774c] px-6 py-2 text-sm font-medium hover:text-white shadow-md
            transition focus:outline-none"
                >
                  <Link href={"/"}>Explore More</Link>
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
