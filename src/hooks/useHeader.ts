"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useDestinationById } from "@/services/destination.service";

export function useHeader() {
  const [listToggle, setListToggle] = useState(false);
  const [buttonToggle, setbuttonToggle] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isRotated, setIsRotated] = useState(false);

  const handleRotation = () => {
    setIsRotated(!isRotated); // Toggle the rotation state
  };

  const searchParams = useSearchParams();
  let startDate = searchParams.get("startDate") ?? "";
  let endDate = searchParams.get("endDate") ?? "";
  let adult = searchParams.get("adult") ?? "";
  let children = searchParams.get("child") ?? "";
  let destination = searchParams.get("destination") ?? "";
  const { data: locations } = useDestinationById(destination, true);
  const [start, setStart] = useState<number>(0);
  const [end, setEnd] = useState<number>(0);
  const [startMonth, setStartMonth] = useState<string>("Month");
  const [endMonth, setEndMonth] = useState<string>("Month");
  const [guest, setGuest] = useState<number>(0);

  const [loginOpen, setLoginOpen] = useState(false);
  const handleOpen = () => {
    setLoginOpen(!loginOpen);
  };
  const [stepOne, setStepOne] = useState(false);
  const handleStepOne = () => {
    setStepOne(!stepOne);
    setLoginOpen(!loginOpen);
  };

  const [stepTwo, setStepTwo] = useState(false);
  const handleStepTwo = () => {
    setStepOne(!stepOne);
    setStepTwo(!stepTwo);
  };

  const [stepThree, setStepThree] = useState(false);
  const handleStepThree = () => {
    setStepOne(!stepOne);
    setStepThree(!stepThree);
  };
  const [stepFour, setStepFour] = useState(false);
  const handleStepFour = () => {
    setStepOne(!stepOne);
    setStepFour(!stepFour);
  };

  const [activeTab, setActiveTab] = useState(0);

  // Function to handle tab clicks
  const handleTabClick = (index: any) => {
    setActiveTab(index);
  };

  const toggleClass = () => {
    setIsActive(!isActive);
  };
  const pathname = usePathname();

  const headerRef: React.MutableRefObject<null | any> = useRef(null);

  useEffect(() => {
    if (headerRef && headerRef.current) {
      localStorage.setItem(
        "headerHeight",
        String(headerRef?.current?.clientHeight)
      );
    }
  }, [headerRef]);

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      setStart(start.getDate());
      setStartMonth(start.toLocaleString("default", { month: "long" }));
      setEndMonth(end.toLocaleString("default", { month: "long" }));
      setEnd(end.getDate());
    }
    if (adult && children) {
      setGuest(Number(adult) + Number(children));
    }
  }, [startDate, endDate, adult, children]);

  useEffect(() => {
    if (pathname !== "/property") {
      setIsActive(false);
    }
  }, [pathname]);

  return {
    listToggle,
    setListToggle,
    buttonToggle,
    setbuttonToggle,
    toggle,
    setToggle,
    isActive,
    setIsActive,
    isRotated,
    handleRotation,
    locations,
    start,
    end,
    startMonth,
    endMonth,
    guest,
    loginOpen,
    handleOpen,
    stepOne,
    handleStepOne,
    stepTwo,
    handleStepTwo,
    stepThree,
    handleStepThree,
    stepFour,
    handleStepFour,
    activeTab,
    handleTabClick,
    toggleClass,
    pathname,
    headerRef,
  };
}
