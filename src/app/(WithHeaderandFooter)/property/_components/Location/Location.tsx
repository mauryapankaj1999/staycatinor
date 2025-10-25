"use client"
import { STATUS } from '@/common/contstant';
import { IDestination, useDestination } from '@/services/destination.service';
import { useSearchParams, useRouter } from "next/navigation";
import React, { Suspense, useEffect, useState } from 'react'

const Location = () => {
 
  const { data: locations } = useDestination({ status: STATUS.ACTIVE });
  const [explorelocations, SetExplorelocations] = useState<IDestination[]>([]);

  const searchPrams = useSearchParams();
  const router = useRouter();

  const locationId = searchPrams.get("destination") 

  useEffect(() => {
    if (locations && locations?.data) {
      SetExplorelocations(locations?.data);
    
    }
  }, [locations]);



  const handleTabClick = (id: any) => {
     const params = new URLSearchParams(searchPrams.toString());
     params.delete("page");
    params.set("destination",id);
    router.push("/property?" + params.toString());
  };

  return (
    <Suspense fallback="Loading ....">
      <div className="mt-7 md:my-12">
        <ul className="flex gap-4 overflow-x-scroll lg:overflow-x-auto">
          <li
            className={`min-w-[5rem] text-center p-2 inline-block lg:py-2 lg:px-4 2xl:py-2 2xl:px-6 font-montserrat font-medium lg:text-[0.9rem] 2xl:text-[1rem] cursor-pointer rounded-sm ${
              !locationId
                ? "bg-[#cf3a22] text-white"
                : "bg-[#fdf3f2] text-[#cf3a22]"
            }`}
            onClick={() => {
              const params = new URLSearchParams(searchPrams.toString());
              params.delete("destination");
              router.push("/property?" + params.toString());
            }}
          >
            All
          </li>
          {explorelocations.map((el, index) => {
            return (
              <>
                <li
                  key={el._id}
                  className={`min-w-[5rem]  text-center p-2 inline-block lg:py-2 lg:px-4 2xl:py-2 2xl:px-6 font-montserrat font-medium lg:text-[0.9rem] 2xl:text-[1rem] cursor-pointer rounded-sm ${
                    el._id == locationId
                      ? "bg-[#cf3a22] text-white"
                      : "bg-[#fdf3f2] text-[#cf3a22]"
                  }`}
                  onClick={() => handleTabClick(el._id)}
                >
                  {el.name}
                </li>
              </>
            );
          })}
        </ul>
      </div>
    </Suspense>
  );
}

export default Location