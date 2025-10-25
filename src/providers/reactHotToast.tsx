"use client";
import store from "@/store";
import React from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

export default function ReactHotToast({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <Provider store={store}>

      {children}
      <Toaster />
    </Provider>
  );
}
