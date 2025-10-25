"use client";
import Image from "next/image";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import OrderCompe from "@/assets/images/Cart/complete.gif";
import styles from "./order.module.scss";
import recycle from "@/assets/images/recycle.png";
import pro1 from "@/assets/images/pro1.webp";
import { signOut, useSession } from "next-auth/react";
import Script from "next/script";
import { getOrderById } from "@/services/order.service";

function Page({ params }: { params: { id: string } }) {
  const pathname = usePathname();
  const [orderid, setOrderid] = useState<any>("");
  const [orderdata, setOrderdata] = useState<any>("");
  const { data: session } = useSession();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [orderStatus, setOrderStatus] = useState(0);
  useEffect(() => {
    if (params && params.id) {
      setOrderid(params.id);
      getOrders(params.id);
    }
  }, [params]);

  const getOrders = async (id: string) => {
    try {
      const { data: res } = await getOrderById(id);
      if (res) {
        console.log(res.data);
        setOrderdata(res.data);
        setOrderStatus(1);

        console.log(
          id,
          "orderData?.shippingCharges orderData?.shippingCharges orderData?.shippingCharges "
        );
        setOrderid(id);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      {orderStatus == 0 ? (
        <h3>Please Wait ....</h3>
      ) : (
        <section className="bg-white antialiased dark:bg-gray-900 md:!py-40 py-6">
          <div className="mx-auto max-w-2xl px-4 2xl:px-0">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-2 text-center">
              Thanks for your Booking!
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6 md:mb-8 text-center font-montserrat">
              Your Booking has been received. We will notify you by email for
              other info.
            </p>
            <div className="space-y-4 sm:space-y-2 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800 mb-6 md:mb-8">
              <dl className="sm:flex items-center justify-between gap-4">
                <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400 font-montserrat">
                  Date
                </dt>
                <dd className="font-medium text-gray-900 dark:text-white sm:text-end font-montserrat">
                  {new Date(orderdata?.createdAt).toDateString()}
                </dd>
              </dl>

              <dl className="sm:flex items-center justify-between gap-4">
                <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400 font-montserrat">
                  Booking Id
                </dt>
                <dd className="text-gray-900 dark:text-white sm:text-end font-medium font-montserrat">
                  {orderid}
                </dd>
              </dl>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <Link
                href="/"
                className="py-2.5 px-5 text-sm  rounded-md focus:outline-none font-medium font-montserrat bg-primarydark text-white border border-gray-200  dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Page;
