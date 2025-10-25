import React, { Suspense } from "react";
import Sidebar from "../_components/Sidebar";
import PersonalInformation from "../_components/PersonalInformation/page";

const page = () => {
  return (
    <Suspense fallback="Loading ....">
      <PersonalInformation />
    </Suspense>
  );
};

export default page;
