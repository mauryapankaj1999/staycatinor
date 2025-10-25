"use client";
import moment from "moment";
import React from "react";
import { createContext, useContext, useState } from "react";

type UserLoginType = [
  LoginShow: boolean,
  setLoginShow: React.Dispatch<React.SetStateAction<boolean>>
]
const userLoginDefault: UserLoginType = [false, () => { }]
export const LoginShowContext = createContext<UserLoginType>(userLoginDefault)
export const useLoginShow = () => {
  return useContext(LoginShowContext)
}


export type SearchDateInput = {
  location: string;
  locationId: string;
  propertyId: string;
  startDate: Date | string;
  endDate: Date | string;
  adult: number;
  child: number;
  room: number;
};
type UserSearchType = [
  locationSearch: SearchDateInput,
  setLocationSearch: React.Dispatch<React.SetStateAction<SearchDateInput>>
];
const userSearchDefault: UserSearchType = [
  {
    location: "",
    locationId: "",
    propertyId: "",
    startDate: "",
    endDate: "",
    adult: 1,
    child: 0,
    room: 0,
  },
  () => { },
];
export const SearchContext = createContext<UserSearchType>(userSearchDefault);
export const useSearch = () => {
  return useContext(SearchContext);
};
export default function RootContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [locationSearch, setLocationSearch] = useState<SearchDateInput>({
    location: "",
    locationId: "",
    propertyId: "",
    startDate: "",
    endDate: "",
    adult: 1,
    child: 0,
    room: 1,
  });
  const [LoginShow, setLoginShow] = useState<boolean>(false);
  return (
    <SearchContext.Provider value={[locationSearch, setLocationSearch]}>
      <LoginShowContext.Provider value={[LoginShow, setLoginShow]}>
        {children}{" "}

      </LoginShowContext.Provider>
    </SearchContext.Provider>
  );
}
