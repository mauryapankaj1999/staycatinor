"use client";
import React, { Suspense, useEffect, useState } from "react";
import { toastError, toastSuccess } from "@/utils/toast";
import axios from "axios";
import { getRoomsAvailablesApi, IRate } from "@/services/rate.service";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { SearchDateInput, useSearch } from "@/providers/context/RootContext";
import { IProperty, usePropertyById } from "@/services/property.service";
import Bookinginfocard from "@/components/BookingInfoComponent/Bookinginfocard/Bookinginfocard";
import Image from "next/image";
import Link from "next/link";
import BookingPlicy from "@/components/BookingInfoComponent/BookingPlicy/BookingPlicy";
import { useSession } from "next-auth/react";
import { createGuestOrder, orderCallbackApi } from "@/services/order.service";
import Script from "next/script";
import { useProfile } from "@/services/users.service";
import giftimg from "@/assets/allimg/giftimg.svg";
import Bookingdetails from "./_components/Bookingdetails";
import Otpopenmodal from "@/components/Otpopenmodal/Otpopenmodal";
import { IoCloseOutline } from "react-icons/io5";
import ContactForm from "../property/[slug]/_components/ContactForm/ContactForm";
import { FaInstagram } from "react-icons/fa";
import Mobilemealscomponents from "../property/[slug]/_components/Mobilemealscomponents/Mobilemealscomponents";
import { IoIosCloseCircle } from "react-icons/io";
import { useDispatch } from "react-redux";
import { showLoginPopup } from "@/store";

export default function page(props: any) {
  const { data: session } = useSession();

  const userId = (session as any)?.token?.decoded_token?.userId;
  const searchParms = useSearchParams();
  let cancelToken: any;
  const dispatch = useDispatch();
  const router = useRouter();
  let [hotelObj, sethotelObj] = useState<IProperty>();
  const [totalPrice, settotalPrice] = useState(0);
  const [showGST, setShowGST] = useState(true);
  const [ratesArr, setratesArr] = useState<IRate[]>([]);
  const [mealmodal, setMealmodal] = useState(false);
  let [seacrhObj, setSeacrhObj] = useState<SearchDateInput>();
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [loading, setLoading] = useState(false);
  const [nights, setNights] = useState(0);
  const [offers, setOffer] = useState<any>(null);
  const [discount, setDiscount] = useState<any>();
  const [tagglefilterbottm, setTagglefilterbottm] = useState(false);

  const [cancellationmodal, setCancellationmodal] = useState(false);
  const [modaltoggle, setModaltoggle] = useState(false);
  const [istermsandcondition, setIstermsandcondition] = useState(false);

  const propertyId = searchParms.get("propertyId");
  const rooms = searchParms.get("room");
  const { data: property } = usePropertyById(propertyId);
  const [gst, setGst] = useState("");

  const basePrice = searchParms.get("basePrice") || "";

  useEffect(() => {
    let searchObjTemp: any = {};
    if (searchParms && searchParms.get("propertyId")) {
      searchObjTemp.propertyId = searchParms.get("propertyId");
    }

    if (searchParms && searchParms.get("startDate")) {
      searchObjTemp.startDate = searchParms.get("startDate");
    }

    if (searchParms && searchParms.get("endDate")) {
      searchObjTemp.endDate = searchParms.get("endDate");
    }

    if (searchParms && searchParms.get("adult")) {
      searchObjTemp.adult = searchParms.get("adult");
    }
    if (searchParms && searchParms.get("child")) {
      searchObjTemp.child = searchParms.get("child");
    }
    if (searchParms && searchParms.get("room")) {
      searchObjTemp.room = searchParms.get("room");
    }

    if (searchParms && searchParms.get("totalPrice")) {
      searchObjTemp.totalPrice = searchParms.get("totalPrice");
    }

    if (searchObjTemp && searchObjTemp?.propertyId) {
      console.log("Search Parameters:", searchObjTemp);
      setSeacrhObj(searchObjTemp);
      getAvailabiltyDetails(searchObjTemp);
    }
  }, [searchParms]);

  const getAvailabiltyDetails = (seacrhObj: SearchDateInput) => {
    if (
      new Date(seacrhObj.endDate).getTime() <=
      new Date(seacrhObj?.startDate).getTime()
    ) {
      toastError("Please Select Valid date");
      return;
    }

    if (typeof cancelToken != typeof undefined) {
      cancelToken.cancel("Cacencel ....");
    }
    cancelToken = axios.CancelToken.source();
    handleGetAvailabilty(seacrhObj, cancelToken);
  };

  const handleGetAvailabilty = async (
    aobj: SearchDateInput,
    cancelTokenValue: any
  ) => {
    try {
      let obj: any = { ...aobj };
      // Convert startDate to 05:30 IST and endDate to 05:30 IST (next day)
      if (obj.startDate) {
        const start = new Date(obj.startDate);
        start.setHours(0, 0, 0, 0);
        obj.startDate = start.toISOString();
      }
      if (obj.endDate) {
        const end = new Date(obj.endDate);
        end.setHours(0, 0, 0, 0);
        obj.endDate = end.toISOString();
      }
      // Convert startDate and endDate to UTC ISO strings for MongoDB
      // Convert startDate to 00:00:00.000Z and endDate to 23:59:59.999Z in UTC
      let { data: res } = await getRoomsAvailablesApi(obj, cancelTokenValue);

      if (res.hotel) {
        console.log("Hotel Object:", res.hotel);
        sethotelObj(res.hotel);
      }
      if (res.data) {
        console.log("Room Data:", res.data);
        if (res.data && res.data?.length > 0) {
          let toPrice = 0;

          let isAv = res.data.some((el: any) => el.isAvailable == true);
          console.log("Is Available:", isAv);
          if (isAv) {
            toPrice = res.data.reduce(
              (acc: any, curr: any) => acc + curr.price,
              0
            );
            console.log(res.data, "new");
            setratesArr(res.data);
            setOffer(res.offers);
          }

          settotalPrice(obj.totalPrice);
          console.log("Total Price:", obj.totalPrice);
          console.log("Is Available:", isAv);
          console.log("Rates Array:", res.data);
        }
      }
    } catch (error) {
      console.error("Availability API Error:", error);
    }
  };
  const handlecreateGuestOrder = async (obj: any) => {
    try {
      console.log("Creating Guest Order with data:", obj);
      const res = await createGuestOrder({ ...obj });
      console.log("Guest Order Response:", res);
      return res;
    } catch (error) {
      console.error("Guest Order Error:", error);
      toastError(error);
    }
  };

  const handleDiscount = (coupon: any) => {
    setDiscount(coupon);
    const discountedAmount = totalPrice - coupon.value;
  };
  function validateGST(gstNumber: any) {
    // Remove spaces and convert to uppercase
    const cleanGST = gstNumber.replace(/\s+/g, "").toUpperCase();

    // Check basic format
    const basicGSTRegex =
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    if (!basicGSTRegex.test(cleanGST)) {
      return false;
    }
    return true;
  }

  // Modified function to handle Razorpay first
  const handleOrder = async () => {
    if (!istermsandcondition) {
      toastError("please accept terms and conditions");
      return;
    }
    if (!userId) {
      dispatch(showLoginPopup());
      // toastError("Please Login to continue");
      return;
    }
    const discountedPrice = discount ? totalPrice - discount.value : totalPrice;
    const taxRate = discountedPrice > 7500 ? 18 : 12;
    const gstRate = discountedPrice > 7500 ? 0.18 : 0.12;
    const gstAmount = discountedPrice * gstRate;

    let orderData: any = {
      gstNo: gst,
      nights,
      discount,
      rooms: rooms,
      propertyId: seacrhObj?.propertyId,
      gst: {
        tax: taxRate,
        amount: gstAmount,
        baseAmount: discountedPrice,
      },
      sellerId: hotelObj?.sellerId,
      grandTotal: Number(discountedPrice) + gstAmount,
      startDate: seacrhObj?.startDate,
      endDate: seacrhObj?.endDate,
      adult: seacrhObj?.adult,
      child: seacrhObj?.child,
      paymentMethod,
    };

    if (userId) {
      orderData.userId = userId;
    }

    console.log("Order data:", orderData);
    setLoading(true);

    // Open Razorpay directly with order data
    await displayRazorpay(orderData);
  };

  // Modified displayRazorpay function
  async function displayRazorpay(orderData: any) {
    console.log("Opening Razorpay with order data:", orderData);

    const options = {
      key: "rzp_test_jOl57g4TNamtFW", // Enter the Key ID generated from the Dashboard
      amount: orderData.grandTotal * 100, // Convert to paise
      currency: "INR",
      name: "Stay Cation",
      description: "Booking",
      handler: async function (response: any) {
        console.log("Razorpay payment response:", response);

        try {
          // Payment successful, now create the order
          console.log("Payment successful, creating order...");

          // Add payment details to order data
          const orderDataWithPayment = {
            ...orderData,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          let res: any = await handlecreateGuestOrder(orderDataWithPayment);
          console.log("Order creation response:", res);

          if (res?.data?.success) {
            toastSuccess("Booking confirmed successfully!");
            setLoading(false);
            setDiscount(null);
            localStorage.setItem("cart-discount", "");
            router.push(`/order-complete/${res.data.orderId}`);
          } else {
            console.error("Order creation failed:", res);
            toastError("Order creation failed. Please contact support.");
            setLoading(false);
          }
        } catch (error) {
          console.error("Order creation error:", error);
          toastError("Order creation failed. Please contact support.");
          setLoading(false);
        }
      },
      modal: {
        ondismiss: function () {
          console.log("Payment cancelled by user");
          setLoading(false);
          toastError("Payment cancelled");
        },
      },
      theme: {
        color: "#ddbe70",
      },
    };

    const paymentObject = new (window as any).Razorpay(options);

    paymentObject.on("payment.failed", function (response: any) {
      console.error("Payment failed:", response.error);
      setLoading(false);
      toastError(`Payment failed: ${response.error.description}`);
    });

    paymentObject.open();
  }



  return (
    <Suspense fallback={"Loading ..."}>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <div className="w-[95%] md:w-[85%]  lg:w-[85%] 2xl:w-[85%] mx-auto py-4 md:py-10 lg:py-10 xl:py-10 2xl:py-10">
        <div className="grid grid-cols-10  gap-6 md:mb-8">
          <div className="lg:col-span-7 col-span-10">
            <Bookinginfocard hotel={hotelObj ? hotelObj : null} />

            {/*  -------------------------------- add meals section in mobile --------------------------------- */}
            <Mobilemealscomponents
              // vegImage={property?.mealImage ? property?.mealImage : ""}
              // noVegImage={
              //   property?.nonVegMenuImage ? property?.nonVegMenuImage : ""
              // }
              mealsArr={property?.meals ? property?.meals : []}
              mixMenuImage={property?.mixMenuImage || ""}
              vegImage={property?.mealImage ? property?.mealImage : ""}
              viewmore={property?.viewMore}
              showImage={true}
              // showText={true}
              className="border rounded-xl p-3 mt-7"
            />
            {/* Discount List Section */}
            

            <div className="mt-7">
              <BookingPlicy Information={property?.Infromation ?? ""} />
            </div>

              {/* <div className=" lg:block hidden">
                <div className="flex items-center justify-between my-11 bg-[#f5f5f5] py-8 px-4 rounded-lg  ">
                  <div className="md:basis-4/5">
                    <p className="text-[#cf3a22] font-montserrat font-normal text-[1rem] mb-1">
                      Trip Savings
                    </p>
                    <h4 className="text-navibule font-montserrat font-normal md:text-[1.4rem] text-[1rem] mb-1">
                      Grab Flat 10% OFF* on Villas
                    </h4>
                    <p className="text-primarygray font-montserrat font-normal text-[0.8rem] md:text-[1rem] mb-1">
                      Book a peaceful hotel getaway with your credit card for a
                      quick and soothing break.
                    </p>
                  </div>
                  <div className="basis-2/5 hidden lg:block">
                    <div className="h-28 w-full relative">
                      <Image
                        src={giftimg}
                        alt=""
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div> */}
          </div>

          <div className="lg:col-span-3 col-span-10">
            <div className="sticky top-0">
              <div className="">
                <Bookingdetails
                  basePrice={basePrice}
                  ratesArr={ratesArr}
                  totalPrice={totalPrice}
                  loading={loading}
                  handleOrder={handleOrder}
                  offers={offers}
                  istermsandcondition={istermsandcondition}
                  setIstermsandcondition={setIstermsandcondition}
                  discount={discount}
                  setDiscount={setDiscount}
                />
                {showGST && (
                  <div className="flex gap-2 mt-2 shadow-custom-light p-4 rounded-md bg-[#f4f4f4]">
                    <input
                      type="text"
                      className="shadow-custom-light font-serif rounded-md"
                      value={gst}
                      placeholder="GST Number (Optional)"
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        let value = event.target.value.replace(
                          /[^a-zA-Z0-9]/g,
                          ""
                        );
                        if (value.length > 15) value = value.slice(0, 15);
                        setGst(value);
                      }}
                    />{" "}
                    <button
                      className="bg-[#da6633] py-3 px-2 font-montserrat font-medium text-white rounded-md block w-full"
                      onClick={() => {
                        if (!gst) {
                          toastError("Please enter GST number");
                          return;
                        }
                        if (validateGST(gst) === false) {
                          toastError("Invalid GST number");
                          return;
                        }
                        setShowGST(false);
                      }}
                    >
                      Enter
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* desktop modal in Contact Us For Special Request  */}
        {modaltoggle ? (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999] ">
            <div className="bg-white rounded-md md:w-[500px] mx-auto relative animate-slide-in p-5">
              <ContactForm
                setModaltoggle={setModaltoggle}
                modaltoggle={modaltoggle}
              />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="bg-[#fcd6c9] flex py-5 px-4">
        <div className="flex-1">
          <ul>
            <li className="text-[12px] font-montserrat ">
              <span className="font-medium">Call: </span>
              <Link href="tel:7575985757" className="">
                +91 7575985757
              </Link>
            </li>
            <li className="text-[12px] font-montserrat ">
              <span className="font-medium">Email: </span>
              <Link href="mailto:Info@thestaycationer.in" className="">
                Info@thestaycationer.in
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex-1">
          <ul className="flex items-center gap-3 justify-end">
            <li>
              <Link
                target="_blank"
                href="https://www.instagram.com/thestaycationer/?igsh=ZDNtNzdhdDJ2Y3ly&utm_source=qr"
                className=" w-[30px] h-[30px] border-[#000] flex items-center justify-center rounded-full border"
              >
                <FaInstagram />
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <Otpopenmodal
        isOpen={tagglefilterbottm}
        onClose={() => setTagglefilterbottm(false)}
      />

      {/*  --------------------------------------------- cancellation policy modal in mobile custome ------------------------------------------------------ */}
      {cancellationmodal ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50 animate-slide-in">
          <div className="bg-white p-5 h-[55vh] rounded-lg shadow-md w-full">
            <div className="flex justify-between items-center pb-3">
              <p className="font-montserrat font-semibold text-[1rem]">
                Booking & Cancellation policy
              </p>
              <button onClick={() => setCancellationmodal(!cancellationmodal)}>
                <IoCloseOutline className="text-[2rem]" />
              </button>
            </div>
            <hr />
            <p className="font-montserrat text-[0.9rem] text-left text-primarygray mb-4">
              Locum! Reiciendis odit quia numquam dolorum rem recusandae optio
              eveniet eligendi molestias consectetur?
            </p>
            <ul className="list-disc">
              <li className="font-montserrat text-[0.7rem] mb-2 text-primarygray">
                Locum! Reiciendis odit quia numquam dolorum rem recusandae optio
                eveniet eligendi mol
              </li>
              <li className="font-montserrat text-[0.7rem] mb-2 text-primarygray">
                Locum! Reiciendis odit quia numquam dolorum rem recusandae optio
                eveniet eligendi mol
              </li>
            </ul>
          </div>
        </div>
      ) : (
        ""
      )}

      {/*  --------------------------------------------- meals modal mobile custome ------------------------------------------------------ */}
      {mealmodal ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50 animate-slide-in">
          <div className="bg-white p-5 h-[55vh] rounded-lg shadow-md w-full">
            <div className="flex justify-between items-center pb-3">
              <p className="font-montserrat font-semibold text-[1rem]">Meals</p>
              <button onClick={() => setMealmodal(!mealmodal)}>
                <IoCloseOutline className="text-[2rem]" />
              </button>
            </div>
            <hr />
            <p className="font-montserrat text-[0.9rem] text-left text-primarygray mb-4">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis
              expedita error quisquam impedit, ad deserunt iste optio cum!
              Reiciendis odit quia numquam dolorum rem recusandae optio eveniet
              eligendi molestias consectetur?
            </p>
            <p className="font-montserrat text-[0.9rem] text-left text-primarygray mb-4">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis
              expedita error quisquam impedit, ad deserunt iste optio cum!
              Reiciendis odit quia numquam dolorum rem recusandae optio eveniet
              eligendi molestias consectetur?
            </p>
          </div>
        </div>
      ) : (
        ""
      )}
    </Suspense>
  );
}
