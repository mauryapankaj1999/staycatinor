"use client";
import React, { Suspense, useState } from "react";
import contenct from "@/assets/mainbanner/contactus.png";
import Image from "next/image";
import { MdOutlineCall } from "react-icons/md";
import Link from "next/link";
import { FaRegEnvelopeOpen } from "react-icons/fa";
import { PiWhatsappLogoLight } from "react-icons/pi";
import flipimg from "@/assets/allimg/lif.png";
import contactimg from "@/assets/allimg/contactimg.png";
import callicon from "@/assets/allimg/call_icon.png";
import envelp from "@/assets/allimg/mail.png";
import whatapp from "@/assets/allimg/whatsapp.png";
import usericon from "@/assets/allimg/Vector.png";
import inputcall from "@/assets/allimg/input_call.png";
import emailenvlp from "@/assets/allimg/carbon_email.png";
import { toastError, toastSuccess } from "@/utils/toast";
import { validateEmail, validatePhone, validateText } from "@/utils/validation";
import { useAddContact } from "@/services/contact.service";

export default function ContactUs() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [number, setNumber] = useState("");
  const [emailid, setEmailid] = useState("");
  const [question, setQuestion] = useState("");
  const [concern, setConcern] = useState("");
  const { mutateAsync: addData } = useAddContact();
  const reset = () => {
    setFname("");
    setLname("");
    setNumber("");
    setEmailid("");
    setQuestion("");
  };

  const handelsubmit = async (e: any) => {
    try {
      e.preventDefault();
      if (
        !validateText(fname, "First Name", true) ||
        !validateText(concern, "concern", true) ||
        !validatePhone(number, true) ||
        !validateEmail(emailid, true) ||
        !validateText(question, "Message", true)
      ) {
        return;
      }
      const obj = {
        fname: fname,
        concern,
        phone: number,
        email: emailid,
        message: question,
      };
      const { data: res } = await addData(obj);
      if (res.message) {
        toastSuccess("successfully submit");
        reset();
      }
    } catch (error) {
      console.log(error, "error submit-----------------------------------");
      toastError("Something went wrong");
    }
  };

  return (
    <Suspense fallback="Loading ....">
      {/* <div className="w-full h-[10rem] md:h-[24rem] relative flex items-center justify-center">
        <Image src={contenct} alt="" fill className="object-cover" />
        <div className="h-full w-full bg-custom-gradient absolute left-0 pt-3 right-0 mx-auto z-10 bottom-0 gap-3"></div>
        <h3 className="absolute top-[40%] text-center z-20 m-auto font-playfair text-[26px] md:text-[2rem] lg:text-[3rem] text-[#fff]">
          Contact Us
        </h3>
      </div> */}
      <div className="text-center p-5">
        <h1 className="font-playfair text-[1.5rem] md:text-[2rem] lg:text-[3rem] text-navibule font-semibold">
          Contact Us
        </h1>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0">
          <div className="w-48 h-48 relative">
            <Image src={flipimg} alt="" fill className="object-contain" />
          </div>
        </div>
        <div className="w-[95%] md:w-[85%] lg:w-[85%] 2xl:w-[85%] mx-auto md:py-10 py-6">
          <div className="grid md:grid-cols-3">
            <div className="col-span-1 text-center md:border-r mb-3">
              <div className="">
                <div className="text-center flex items-center justify-center mb-3">
                  <Image
                    src={callicon}
                    alt=""
                    className="h-[2rem] w-[2rem] md:h-[2.5rem] md:w-[2.5rem]"
                  />
                </div>
                <h4 className="font-playfair  md:text-[1.4rem] text-[0.9rem] font-medium text-navibule">
                  Make a Call
                </h4>
                <h5 className="font-montserrat font-medium text-[0.8rem] lg:text-[1rem] text-primarygray py-3 ">
                  Make a call for your general enquiries
                </h5>
                <Link
                  href="tel:7575985757"
                  className="font-medium font-montserrat text-[0.8rem] lg:text-[1rem] text-navibule"
                >
                  +91 7575-98-5757
                </Link>
              </div>
            </div>
            <div className="col-span-1  text-center md:border-r mb-3">
              <div>
                <div className="text-center flex items-center justify-center mb-3">
                  <Image
                    src={envelp}
                    alt=""
                    className="h-[2rem] w-[2rem] md:h-[2.5rem] md:w-[2.5rem]"
                  />
                </div>
                <h4 className="font-playfair font-medium  md:text-[1.4rem] text-[0.9rem] text-navibule">
                  Send a Mail
                </h4>
                <h5 className="font-montserrat font-medium text-[0.8rem] lg:text-[1rem] text-primarygray py-3 ">
                  Send your mail for general enquiries
                </h5>
                <Link
                  href="mailto:stay@thestaycationer.in"
                  className="font-medium font-montserrat  text-[0.8rem] lg:text-[1rem] text-navibule"
                >
                  stay@thestaycationer.in
                </Link>
              </div>
            </div>
            <div className="col-span-1  text-center">
              <div>
                <div className="text-center flex items-center justify-center mb-3">
                  <Image
                    src={whatapp}
                    alt=""
                    className="h-[2rem] w-[2rem] md:h-[2.5rem] md:w-[2.5rem]"
                  />
                </div>

                <h4 className="font-playfair md:text-[1.4rem] text-[0.8rem] text-navibule font-medium">
                  Send a Message
                </h4>
                <h5 className="font-montserrat font-medium text-[0.8rem] lg:text-[1rem] text-primarygray py-3 ">
                  Chat with us on whatsApp
                </h5>
                <Link
                  href="https://wa.me/917575985757"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-montserrat font-medium  text-[0.8rem] lg:text-[1rem] text-navibule"
                >
                  +91 7575-98-5757
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 rotate-180">
          <div className="w-48 h-48 relative">
            <Image src={flipimg} alt="" fill className="object-contain" />
          </div>
        </div>
      </div>

      <div className="w-[95%] md:w-[85%] lg:w-[85%] 2xl:w-[85%] mx-auto md:py-[2.5rem] py-[1.5rem] ">
        <div className="shadow-custom-light md:p-[1.5rem] rounded-md">
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-8 order-last md:order-first px-[10px]">
            <div className="lg:col-span-5 ">
              <div className="contactpagemap h-[300px] lg:h-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d181343.51201464268!2d77.12227911954564!3d32.376025161573075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39047ef0b27a15ad%3A0xbfdd7e65efefc66b!2sRohtang%20La!5e0!3m2!1sen!2sin!4v1717234963305!5m2!1sen!2sin"
                  allowFullScreen={true}
                  loading="lazy"
                  style={{ width: "100%", height: "100%" }}
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
            <div className="lg:col-span-7 order-first md:order-last">
              {/* <div className="hidden lg:block"> */}
              <div className="grid lg:grid-cols-2 items-center">
                <div className="md:col-span-1">
                  <h3 className="font-playfair text-[1.4rem] md:text-[2rem] lg:text-[2rem] text-navibule border-l-2 font-medium border-[#cf3a22] pl-3 my-4">
                    Send Your Message
                  </h3>
                  <h6 className="font-montserrat font-normal text-primarygray text-[0.8rem] md:text-[1.1rem] lg:text-[1rem]">
                    Please Fill Free to get in touch using the form below. We’d
                    love to hear for you.
                  </h6>
                </div>
                <div className="hidden lg:block">
                  <div className=" col-span-1 flex items-end justify-end ">
                    <div className="h-48 w-48 relative">
                      <Image src={contactimg} alt="" fill />
                    </div>
                  </div>
                </div>
                {/* </div> */}
              </div>

              <form onSubmit={handelsubmit} action="">
                <div className="md:flex gap-3 flex-wrap justify-between bookinginput2 mt-4 md:mt-0 lg:mt-0">
                  <div className="mb-5 md:w-[48%] relative">
                    <label
                      htmlFor=""
                      className="font-montserrat font-medium text-navibule text-sm md:text-[1rem]"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="full_name"
                      className="pr-4 font-montserrat text-sm md:text-[1rem] font-medium mt-1 border-gray-300 rounded-lg focus:ring-0 focus:outline-none  w-full h-12 bg-[#f5f5f5]"
                      placeholder="Full name"
                      value={fname}
                      onChange={(e) => setFname(e.target.value)}
                    />
                    <Image
                      src={usericon}
                      alt=""
                      style={{ width: "17px", height: "17px" }}
                      className="absolute bottom-3 right-3"
                    />
                  </div>
                  <div className="mb-5 md:w-[48%] relative  ">
                    <label
                      htmlFor=""
                      className="font-montserrat font-medium text-navibule text-sm md:text-[1rem]"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="first_name"
                      className=" font-montserrat font-medium mt-1 text-sm md:text-[1rem] border-gray-300 rounded-lg focus:ring-0 focus:outline-none bg-[#f5f5f5] w-full h-12"
                      placeholder="Email Id"
                      value={emailid}
                      onChange={(e) => setEmailid(e.target.value)}
                    />
                    <Image
                      src={emailenvlp}
                      alt=""
                      style={{ width: "22px", height: "22px" }}
                      className="absolute bottom-3 right-3"
                    />
                  </div>

                  <div className="mb-5 md:w-[48%] relative">
                    <label
                      htmlFor=""
                      className="font-montserrat font-medium text-navibule  text-sm md:text-[1rem]"
                    >
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      className=" font-montserrat font-medium text-sm md:text-[1rem]  mt-1 border-gray-300 rounded-lg focus:ring-0 focus:outline-none bg-[#f5f5f5] w-full h-12"
                      placeholder="Mobile Number"
                      maxLength={10}
                      value={number}
                      onChange={(e) => {
                        const cleaned = e.target.value.replace(/\D/g, "");
                        setNumber(cleaned);
                      }}
                    />
                    <Image
                      src={inputcall}
                      alt=""
                      style={{ width: "22px", height: "22px" }}
                      className="absolute bottom-3 right-3"
                    />
                  </div>

                  <div className="mb-5 md:w-[48%] relative">
                    <label
                      htmlFor=""
                      className="font-montserrat font-medium text-navibule  text-sm md:text-[1rem]"
                    >
                      Concern
                    </label>
                    <select
                      name=""
                      id=""
                      className="!text-[14px] font-montserrat right-0 focus:0 font-normal border-[#d1d5db] rounded-lg focus:ring-0 focus:outline-none  w-full h-12"
                      value={concern}
                      onChange={(e) => setConcern(e.target.value)}
                    >
                      <option value="" disabled>
                        Select Concern
                      </option>
                      <option value="I have a Booking">I have a Booking</option>
                      <option value="Other">Other</option>
                      <option value="I want to book">I want to book</option>
                      <option value="I want to list my Property">
                        I want to list my Property
                      </option>
                      <option value="I am Travel Agent">
                        I am Travel Agent
                      </option>
                      <option value="I want to book for an Event">
                        I want to book for an Event
                      </option>
                    </select>
                  </div>
                  <div className="mb-5 w-[100%] relative">
                    <label
                      htmlFor="message"
                      className="font-montserrat font-medium text-navibule text-sm md:text-[1rem]"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="textareainput font-montserrat mt-1 text-sm md:text-[1rem] focus:outline-none focus:border-transparent block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Message..."
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="text-center mb-5">
                  <button
                    type="submit"
                    className="inline-block rounded-lg !bg-navibule text-[0.8rem] md:text-[1rem] text-white px-3 py-2 lg:px-8 lg:py-3 font-montserrat "
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
