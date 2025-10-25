import React from "react";
import ReactQueryProvider from "./reactQuery";
import RootContextProvider from "./context/RootContext";
import ReactHotToast from "./reactHotToast";
import NextAuthSessionProvider from "./NextAuthSessionProvider";
export default function RootProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <NextAuthSessionProvider session={session}>
      <ReactQueryProvider>
        <ReactHotToast>
          <RootContextProvider>{children}</RootContextProvider>
        </ReactHotToast>
      </ReactQueryProvider>
    </NextAuthSessionProvider>
  );
}
