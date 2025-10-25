import { IRate } from "@/services/rate.service";
import moment from "moment";
import Image from "next/image";
import React, { useState } from "react";
import iconsvg from "@/assets/allimg/carbon_security.svg";
import Link from "next/link";
import { IoIosCloseCircle } from "react-icons/io";
import { useSearchParams } from "next/navigation";
import { formatPrice } from "@/utils/formatPrice";
import { toastError, toastSuccess } from "@/utils/toast";
import { MdOutlineClose, MdOutlineLocalOffer } from "react-icons/md";

type BookingdetailsProps = {
  ratesArr: IRate[];
  totalPrice: number;
  loading: boolean;
  handleOrder: any;
  istermsandcondition: any;
  setIstermsandcondition: any;
  offers: any;
  discount: any;
  basePrice: string;
  setDiscount: any;
};

const Bookingdetails = ({
  ratesArr,
  totalPrice,
  basePrice,
  loading,
  handleOrder,
  istermsandcondition,
  setIstermsandcondition,
  offers,
  discount,
  setDiscount,
}: BookingdetailsProps) => {
  const [viewModal, setViewModal] = useState(false);
  const [showAllDates, setShowAllDates] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const maxDatesToShow = 5;
  const guestPrice = useSearchParams().get("GuestPrice") ?? 0;
  // Calculate discounted price first
  const discountedPrice = discount
    ? Math.max(0, totalPrice - discount.value)
    : totalPrice;

  // Determine GST rate based on discounted price (after discount)
  const gstRate = discountedPrice > 7500 ? 0.18 : 0.05;

  // Calculate GST on discounted price
  let gstAmount = discountedPrice * gstRate;
  if (!Number.isInteger(gstAmount)) {
    gstAmount = Math.round(gstAmount);
  }

  // Final total = discounted price + GST
  let finalTotal = Number(discountedPrice) + gstAmount;

  const toggleShowAllDates = () => {
    setShowAllDates(!showAllDates);
  };

  const handleApplyCoupon = () => {
    if (couponCode.trim() === "") {
      toastError("Please enter a coupon code.");
      return;
    }

    if (offers && offers.length > 0) {
      const coupon = offers.find((o: any) => o.name === couponCode);
      if (coupon) {
        const temp = totalPrice - coupon.value;
        if (temp < 0) {
          toastError("Discount can't be applied");
          return;
        }
        setDiscount(coupon);
        toastSuccess("Coupon applied successfully!");
      } else {
        toastError("Invalid coupon code.");
      }
    } else {
      toastError("No coupons available to apply.");
    }
  };

  const temp = discount ? totalPrice - discount.value : totalPrice;
  return (
    <>
      <div>
        <div className="shadow-custom-light p-4 rounded-md bg-[#f4f4f4]">
          <div className="border-b border-[#dfdfdf] pb-3">
            <h3 className="font-playfair font-medium text-navibule md:text-[1.5rem] text-[1rem]">
              Reservation Price Details
            </h3>
          </div>
          <div className="border-b border-[#dfdfdf] pb-3">
            {ratesArr &&
              [...ratesArr]
                .sort(
                  (a, b) =>
                    new Date(a.date).getTime() - new Date(b.date).getTime()
                )
                .slice(0, showAllDates ? ratesArr.length : maxDatesToShow)
                .map((el, i) => (
                  <div
                    className="flex justify-between items-center my-2"
                    key={i}
                  >
                    <div className="font-montserrat font-medium text-primarygray text-[1rem]">
                      {moment(el.date).format("YYYY-MM-DD")}{" "}
                    </div>
                    <div className="font-montserrat font-medium text-primarygray text-[1rem]">
                      {el.price !== 0
                        ? formatPrice(el.price)
                        : formatPrice(basePrice)}
                    </div>
                  </div>
                ))}
            {Number(guestPrice) !== 0 ? (
              <div className="flex justify-between items-center my-2">
                <small>Extra Guest Price</small>{" "}
                <small>₹ {formatPrice(guestPrice)}</small>
              </div>
            ) : null}
            {ratesArr && ratesArr.length > maxDatesToShow && (
              <div className="mt-2">
                <button
                  onClick={toggleShowAllDates}
                  className="font-montserrat font-medium text-blue-600 underline text-[0.9rem]"
                >
                  {showAllDates
                    ? "Show Less"
                    : `Read More (${ratesArr.length - maxDatesToShow} more)`}
                </button>
              </div>
            )}

            {discount && discount.value > 0 && (
              <div className="flex justify-between items-center my-2">
                <div className="font-montserrat font-medium text-primarygray text-[1rem]">
                  Discount ({discount.name})
                </div>
                <div className="font-montserrat font-medium text-[#219c76] text-[1rem]">
                  - ₹{discount.value}
                </div>
              </div>
            )}

            {/* Display Total (before GST) */}
            <div className="flex justify-between items-center my-2 border-t border-[#dfdfdf] pt-3">
              <div className="font-montserrat font-bold text-primarygray text-[1rem]">
                Total
              </div>
              <div className="font-montserrat font-medium text-primarygray text-[1rem]">
                ₹{formatPrice(discountedPrice)}
              </div>
            </div>
            <div className="flex justify-between items-center my-2">
              <div className="font-montserrat font-medium text-primarygray text-[1rem]">
                GST ({gstRate * 100})%
              </div>
              <div className="font-montserrat font-medium text-primarygray text-[1rem]">
                ₹{formatPrice(gstAmount.toFixed(2))}
              </div>
            </div>
          </div>
          {!discount && (
            <div className="mt-3 border-b border-[#dfdfdf] pb-4">
              <p className="text-base font-normal text-black mb-2">
                Have a coupon?
              </p>
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                <input
                  placeholder="Enter Coupon Code"
                  className="bg-white border-2 flex-1 text-green-600 text-sm border-dashed border-gray-400 rounded-md py-2 px-2 outline-0 w-full md:w-auto"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button
                  onClick={handleApplyCoupon}
                  className="text-base bg-primaryColor font-normal py-2 px-4 rounded-md bg-[#da6633] text-white w-full md:w-auto"
                >
                  Apply
                </button>
              </div>
            </div>
          )}
          <p
            onClick={() => setViewModal(true)}
            className="cursor-pointer flex flex-row items-center gap-2 text-sm text-[#2f80ed] underline text-center w-full justify-center mt-2"
          >
            <MdOutlineLocalOffer className="text-[16px]" /> View Coupons
          </p>

          {discount && discount.value > 0 && (
            <div className="flex justify-between border-dashed border-2 border-[#adc0d8] py-3 px-2 rounded-md items-center bg-[#dde8fd] mt-3">
              <div className="flex items-center gap-2">
                <h5 className="font-montserrat font-semibold text-[0.9rem] text-navibule">
                  {discount.name}
                </h5>
              </div>
              <button
                onClick={() => setDiscount(null)}
                className="text-primarydark hover:text-primarydark/80"
              >
                <IoIosCloseCircle className="text-xl" />
              </button>
            </div>
          )}

          <div className="flex justify-between items-center mt-2 px-4 pt-2">
            <div className="">
              <h4 className="font-montserrat font-semibold text-[1.2rem] text-navibule">
                Total
              </h4>
              <p className="font-montserrat font-normal text-[0.7rem]">
                {discount && discount.value > 0
                  ? "After Discount & GST"
                  : "Includes GST and Service"}
              </p>
            </div>
            <h4 className="font-montserrat font-semibold text-[1.3rem] text-navibule">
              ₹{formatPrice(finalTotal)}
            </h4>
          </div>

          <div className="flex border-b gap-2 items-center py-5">
            <div className="h-8 w-8 relative">
              <Image src={iconsvg} alt="" fill className="object-contain" />
            </div>
            <div className="">
              <h4 className="font-montserrat font-medium text-[1rem] text-[#219c76]">
                Payment secured by 100%
              </h4>
              <h5 className="font-montserrat font-medium text-[0.7rem] text-[#219c76]">
                Trusted by 2k+ Guest{" "}
              </h5>
            </div>
          </div>

          <div className="mt-5">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={istermsandcondition}
                onChange={(e) => setIstermsandcondition(e.target.checked)}
                className="h-3 w-3 border-[#767676] focus:outline-none bg-white focus:ring-0 inputcustom"
              />
              <span className="ml-2 font-montserrat text-[0.7rem]">
                I have read and accepted the{" "}
                <a
                  target="_blank"
                  href="/TermsandCondition"
                  className="text-blue-600 underline"
                >
                  Terms & Conditions,
                </a>{" "}
                and{" "}
                <Link
                  target="_blank"
                  href="/cancellationPolicy"
                  className="text-blue-600 underline"
                >
                  Cancellation Policy.
                </Link>{" "}
              </span>
            </label>
          </div>

          <div className="mt-3">
            {Number(finalTotal) > 0 &&
              (loading ? (
                <button className="bg-[#da6633] py-3 px-5 font-montserrat font-medium text-white rounded-md block w-full">
                  Please Wait...
                </button>
              ) : (
                <button
                  className="bg-[#da6633] py-3 px-5 font-montserrat font-medium text-white rounded-md block w-full"
                  onClick={handleOrder}
                >
                  Book Now
                </button>
              ))}
          </div>
        </div>
      </div>

      {viewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-slide-in">
          <div className="bg-white rounded-md mx-2 md:w-[500px] md:mx-auto">
            <div className="flex justify-between items-center py-4 px-3 border-b">
              <h3 className="md:text-[1.5rem] text-[18px] font-medium">
                Coupons and Offers
              </h3>
              <MdOutlineClose
                className="text-[1.35rem] md:text-[2rem] cursor-pointer"
                onClick={() => setViewModal(!viewModal)}
              />
            </div>
            <div className="p-3">
              <div className="my-3">
                <div className="grid grid-cols-2 lg:grid-cols-3">
                  {temp > 0 && discount ? (
                    <div
                      className="col-span-1 mb-3 p-3 border border-primarydark bg-primarydark/5 rounded-lg"
                      onClick={() => {
                        setDiscount(null);
                      }}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-montserrat font-medium text-navibule">
                            {discount.name}
                          </h4>
                          <p className="text-sm text-primarygray font-medium font-montserrat">
                            Save ₹{discount.value}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setDiscount(null);
                          }}
                          className="text-primarydark hover:text-primarydark/80"
                        >
                          <IoIosCloseCircle className="text-2xl" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {offers?.map((coupon: any, index: number) => (
                        <div
                          key={index}
                          className="col-span-1 p-3 mb-1 border border-gray-200 rounded-lg cursor-pointer transition-all hover:border-primarydark"
                          onClick={() => {
                            const temp = coupon
                              ? totalPrice - coupon.value
                              : totalPrice;
                            if (temp < 0 && coupon) {
                              toastError("Discount can't be applied");
                              return;
                            }
                            setDiscount(coupon);
                          }}
                        >
                          <div className="flex justify-between items-center gap-5">
                            <div>
                              <h4 className="font-montserrat font-medium text-navibule">
                                {coupon.name}
                              </h4>
                              <p className="text-sm text-primarygray font-medium font-montserrat">
                                Save ₹{coupon.value}
                              </p>
                            </div>
                            <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
              <button
                onClick={() => setViewModal(!viewModal)}
                className="inline-block bg-primarydark px-4 font-montserrat rounded-md py-2 text-[#fff] hover:bg-primarydark text-[15px]"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Bookingdetails;
