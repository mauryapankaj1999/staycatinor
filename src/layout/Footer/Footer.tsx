import Image from "next/image";
import React from "react";
import footerlogo from "@/assets/logo/footerlogo.png";
import Link from "next/link";
import { BsEnvelope } from "react-icons/bs";
import { IoCallOutline } from "react-icons/io5";
import { SlSocialInstagram } from "react-icons/sl";
import { HiOutlineLocationMarker } from "react-icons/hi";
import homefooter from "@/assets/logo/logofooterhome.png";
import { useParams, usePathname } from "next/navigation";
import { CurrencyEuroIcon } from "@heroicons/react/24/outline";
import { toastError, toastSuccess } from "@/utils/toast";
import { useAddSubscribe } from "@/services/subscribe.service";

export default function Footer() {
  const currentRoute = usePathname();

  const params = useParams();
  const slug = params?.slug;

  const [email, setEmail] = React.useState("");
  const { mutateAsync: AddSubscribe } = useAddSubscribe();
  const handleEmailChange = async (e: any) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    e.preventDefault();
    if (!email) {
      toastError("Please enter a valid email address.");
      return;
    }
    if (!regex.test(email)) {
      toastError("Please enter a valid email address.");
      return;
    }
    try {
      const { data } = await AddSubscribe({ Email: email });
      if (data) {
        toastSuccess("Subscribed successfully!");
      }
      setEmail("");
    } catch (error) {
      console.error("Error subscribing:", error);
      toastError("Failed to subscribe. Please try again later.");
    }
  };

  return (
    <>
      <div
        className={`footer relative py-[1rem] md:py-[2.75rem] ${
          (currentRoute === "/property" || currentRoute === "/profile") &&
          "pb-20 lg:!pb-8"
        } ${
          currentRoute === `/property/${slug}` && "!pb-28 md:!pb-32 lg:!pb-8"
        }`}
      >
        <div className="w-[90%] md:w-[90%] xl:w-[85%] 2xl:w-[85%] mx-auto">
          <div className="grid  md:grid-cols-3">
            <div className="md:w-[80%]">
              <div className="relative w-[9rem] h-[4rem] md:w-[12rem] md:h-[4rem] lg:w-[15rem] lg:h-[6rem]">
                <Image
                  src={footerlogo}
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
              <p className="mb-5 text-white font-montserrat font-normal mt-1 md:!text-[1rem] xl:text-[18px] text-sm">
                The StayCationer offers unique and comfortable homestays across
                India. Born from Experience, Built for Homeowners, we are also a
                property management company, which provides a seamless solution
                that allows property owners to earn effortlessly.
              </p>

              <div className="">
                <form className="max-w-md">
                  <label
                    htmlFor="default-search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                  >
                    Search
                  </label>

                  <div className="relative w-full md:!w-[250px] lg:w-[350px] ">
                    {/* <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                      </svg>
                    </div> */}
                    {/* <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-white-900 border border-gray-300 rounded-lg bg-transparent focus:ring-white-500 focus:border-white-500 dark:bg-gray-700 dark:border-white-600 white:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-white" placeholder="Email address|..." required /> */}
                    <input
                      type="search"
                      className="block w-full  font-Ralewa bg-transparent border-white text-white font-montserrat placeholder-white border-2  focus:border-white focus:outline-0 focus:right-0"
                      value={email}
                      placeholder="Email address..."
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                      type="submit"
                      onClick={handleEmailChange}
                      className="text-[#da6633] font-Ralewa absolute font-montserrat end-0 bottom-0 h-11 bg-white focus:ring-4 focus:outline-none font-medium text-sm px-4 py-2 "
                    >
                      SUBSCRIBE
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="flex md:items-center flex-col">
              <h3 className="md:text-[1.7rem] text-[1.1rem] text-white mb-2 mr-6 mt-5 md:mt-0 lg:mt-0">
                Quick Links
              </h3>
              <ul className="md:ml-7">
                <li className="lg:mb-[10px] mb-[5px]">
                  <Link
                    href="/PrivacyPolicy"
                    target="_blank"
                    className="font-montserrat md:!text-[1rem] xl:text-[18px] text-[14px] text-white font-normal inline-block"
                  >
                    Privacy Policy
                  </Link>{" "}
                </li>
                <li className="lg:mb-[10px] mb-[5px]">
                  <Link
                    href="/TermsandCondition"
                    target="_blank"
                    className="font-montserrat md:!text-[1rem] xl:text-[18px] text-[14px] text-white font-normal inline-block"
                  >
                    Terms and Condition
                  </Link>{" "}
                </li>
                <li className="lg:mb-[10px] mb-[5px]">
                  <Link
                    href="/cancellationPolicy"
                    target="_blank"
                    className="font-montserrat md:!text-[1rem] xl:text-[18px] text-[14px] text-white font-normal inline-block"
                  >
                    Cancellation Policy
                  </Link>{" "}
                </li>
                <li className="lg:mb-[10px] mb-[5px]">
                  <Link
                    href="/Faq"
                    className="font-montserrat md:!text-[1rem] xl:text-[18px] text-[14px] text-white font-normal inline-block"
                  >
                    FAQ’s
                  </Link>{" "}
                </li>
                <li className="lg:mb-[10px] mb-[5px]">
                  <Link
                    href="/blog"
                    className="font-montserrat md:!text-[1rem] xl:text-[18px] text-[14px] text-white font-normal inline-block"
                  >
                    Blogs
                  </Link>{" "}
                </li>
                <li className="lg:mb-[10px] mb-[5px]">
                  <Link
                    href="/Loyalty"
                    className="font-montserrat md:!text-[1rem] xl:text-[18px] text-[14px] text-white font-normal inline-block"
                  >
                    Loyalty
                  </Link>{" "}
                </li>
                <li className="lg:mb-[10px] mb-[5px]">
                  <Link
                    href="/create-gift"
                    className="font-montserrat md:!text-[1rem] xl:text-[18px] text-[14px] text-white font-normal inline-block"
                  >
                    Send a Gift
                  </Link>{" "}
                </li>
                <li className="lg:mb-[10px] mb-[5px]">
                  <Link
                    href="/ContactUs"
                    className="font-montserrat md:!text-[1rem] xl:text-[18px] text-[14px] text-white font-normal inline-block"
                  >
                    Contact Us
                  </Link>{" "}
                </li>
              </ul>
            </div>

            <div className="flex md:items-center flex-col">
              <h3 className="md:text-[1.7rem] text-[1.1rem] text-white mb-2 mr-6 mt-3 md:mt-0 lg:mt-0">
                Contact Us{" "}
              </h3>
              <ul className="md:-mr-20">
                <li className="lg:mb-[10px] mb-[5px]">
                  <Link
                    href="mailto:stay@thestaycationer.in"
                    className="flex gap-3 items-center text-white font-montserrat font-normal md:!text-[1rem] xl:text-[18px] text-[14px]"
                  >
                    <BsEnvelope className="text-lg md:text-[22px] " />{" "}
                    stay@thestaycationer.in
                  </Link>{" "}
                </li>
                <li className="lg:mb-[10px] mb-[5px] flex  flex-col gap-2">
                  <div className="flex flex-row gap-2 items-center">
                    <IoCallOutline className="text-lg mb-1 text-white md:text-[22px]" />
                    <Link
                      href="tel:+91 7575985757"
                      className="flex gap-3 items-center text-white font-montserrat font-normal md:!text-[1rem] xl:text-[18px] text-[14px] md:mb-[0.5rem] "
                    >
                      +91 7575-98-5757
                    </Link>
                  </div>
                  <div className="flex flex-row gap-2 items-center">
                    <IoCallOutline className="text-lg mb-1 text-white md:text-[22px]" />
                    <Link
                      href="tel:+91 7575982121"
                      className="flex gap-3 items-center text-white font-montserrat font-normal md:!text-[1rem] xl:text-[18px] text-[14px] md:mb-[0.5rem] "
                    >
                      +91 7575-98-2121
                    </Link>
                  </div>
                </li>
                <li className="lg:mb-[10px] mb-[5px]">
                  <Link
                    href="https://www.instagram.com/thestaycationer/?igsh=ZDNtNzdhdDJ2Y3ly&utm_source=qr"
                    target="_blank"
                    className="flex gap-3 items-center text-white font-montserrat font-normal md:!text-[1rem] xl:text-[18px] text-[14px] md:mb-[0.5rem] "
                  >
                    <SlSocialInstagram className="text-lg md:text-[22px]" />
                    Thestaycationer
                  </Link>{" "}
                </li>
                {/* <li className='lg:mb-[10px] mb-[5px]'><Link href='' className='flex gap-3  text-white font-montserrat font-normal md:text-[1rem] text-[0.8rem] md:mb-[0.5rem] mt-2'><HiOutlineLocationMarker className='text-[22px]' /> Staycationer, Landour, Kulri, <br className='hidden md:block' /> near Picture Palace, <br className='hidden md:block' /> Mussoorie, Uttarakhand 248179</Link> </li> */}
              </ul>
            </div>
          </div>
        </div>

        {/* <div className="footerTravel"></div>
            <div className="footerhomeicon absolute right-0 bottom-0" >
              <Image src={homefooter} alt='' className='object-contain w-[150px] h-[150px]' />
          </div> */}
      </div>
    </>
  );
}
