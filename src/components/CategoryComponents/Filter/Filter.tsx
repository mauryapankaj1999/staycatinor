"use client";
import React, {
  Dispatch,
  SetStateAction,
  Suspense,
  useEffect,
  useState,
} from "react";
import Propertytype from "../Propertytype/Propertytype";
import { ICollection, useCollection } from "@/services/collection.service";
import { FilterPropsType } from "@/app/(WithHeaderandFooter)/property/page";
import { useSearchParams, useRouter } from "next/navigation";
import collection from "@/assets/collection.png";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { IDestination, useDestination } from "@/services/destination.service";
import { STATUS } from "@/common/contstant";
import { IoIosCloseCircle } from "react-icons/io";
import { isNumber } from "lodash";
import { el } from "date-fns/locale";

const Filter = ({
  handleApplyFilter,
  setTagglefilterbottm,
  tagglefilterbottm,
}: {
  handleApplyFilter: () => void;
  setTagglefilterbottm: Dispatch<SetStateAction<boolean>>;
  tagglefilterbottm: any;
}) => {
  const [price, setPrice] = useState<number>(3);
  const [minPrice, setMinPrice] = useState(4500);

  const [maxPrice, setMaxPrice] = useState(100000);
  const searchPrams = useSearchParams();
  const router = useRouter();
  const [collectionArr, setCollectionArr] = useState<ICollection[]>([]);
  const [locationArr, setLocationArr] = useState<IDestination[]>([]);
  const [groupArr, setGroupArr] = useState([
    { label: "Small", checked: false },
    { label: "Medium", checked: false },
    { label: "Large", checked: false },
    { label: "Families", checked: false },
    { label: "Corporate", checked: false },
  ]);

  const { data: collections } = useCollection({
    pageIndex: 0,
    pageSize: 1000,
  });

  const { data: locations } = useDestination({
    status: STATUS.ACTIVE,
    pageSize: 1000,
    pageIndex: 0,
  });
  useEffect(() => {
    if (collections && collections?.data) {
      let collectionStr = searchPrams.get("collection");

      setCollectionArr(
        collections?.data.map((el) => ({
          ...el,
          checked: collectionStr
            ? collectionStr.includes(`${el._id}`)
              ? true
              : false
            : false,
          label: el.name,
        }))
      );
    }
  }, [collections, searchPrams.get("collection")]);

  useEffect(() => {
    if (locations && locations?.data) {
      let locationstr = searchPrams.get("destination");

      //   let locationString = searchPrams.get("location");

      //   console.log("locationString", locationString);

      //   if(locationString && locationString !== "undefined") {

      //     console.log("check it is working ", locationString);

      //     const filteredLocations = locations.data.filter((el:any)=> el.name === locationString)

      //     console.log("filteredLocations", filteredLocations);

      //   //  setLocationArr( (prev:any) => [...prev, filteredLocations.map((el:any) => ({
      //   //     ...el,
      //   //     checked: true,
      //   //     label: el.name,
      //   //   }))])

      //   setLocationArr(
      //     locations?.data.map((el) => ({
      //       ...el,
      //       checked: locationString
      //         ? locationString.includes(`${el.name}`)
      //           ? true
      //           : false
      //         : false,
      //       label: el.name,
      //     }))
      //   );

      // ;}

      //   //  setLocationArr( (prev:any) => [...prev, filteredLocations.map((el:any) => ({
      //   //     ...el,
      //   //     checked: true,
      //   //     label: el.name,
      //   //   }))])

      //   setLocationArr(
      //     locations?.data.map((el) => ({
      //       ...el,
      //       checked: locationString
      //         ? locationString.includes(`${el.name}`)
      //           ? true
      //           : false
      //         : false,
      //       label: el.name,
      //     }))
      //   );

      // ;}

      setLocationArr(
        locations?.data.map((el) => ({
          ...el,
          checked: locationstr
            ? locationstr.includes(/*`${el.name}` ||*/ `${el._id}`)
              ? true
              : false
            : false,
          label: el.name,
        }))
      );
    }
  }, [
    locations,
    searchPrams.get("destination") /*searchPrams.get("location")*/,
  ]);

  console.log("locationArr", locationArr);

  const [priceArr, setPriceArr] = useState([
    {
      label: "Under ₹10,000",
      checked: false,
      min: 0,
      max: 10000,
    },
    {
      label: "₹10,000 - ₹20,000",
      checked: false,
      min: 10000,
      max: 20000,
    },
    {
      label: "₹20,000 - ₹35,000",
      checked: false,
      min: 20000,
      max: 35000,
    },
    {
      label: "₹35,000 - ₹50,000",
      checked: false,
      min: 35000,
      max: 50000,
    },
    {
      label: "Above ₹50,000",
      checked: false,
      min: 50000,
      max: 100000,
    },
  ]);

  const handleFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchPrams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push("/property?" + params.toString());
  };

  const handleCollection = (index: number) => {
    const params = new URLSearchParams(searchPrams.toString());
    params.delete("page");

    let colectionStr = "";
    let tempArr = collectionArr.map((el: any, indexX: number) => {
      if (indexX == index) {
        el.checked = !el.checked;
      }
      if (el.checked) {
        colectionStr = el?._id;
      }
      return el;
    });
    setCollectionArr([...tempArr]);
    if (colectionStr) {
      params.set("collection", colectionStr);
    } else {
      params.delete("collection");
    }
    router.push("/property?" + params.toString());
  };
  const handleLocation = (index: number) => {
    const params = new URLSearchParams(searchPrams.toString());
    params.delete("page");

    // Toggle the checked state for the clicked location
    const updatedLocationArr = locationArr.map((el, i) => ({
      ...el,
      checked: i === index ? !el.checked : false, // Only allow one location to be selected at a time
    }));
    setLocationArr(updatedLocationArr);

    // Get the selected location ID
    const selectedLocation = updatedLocationArr.find((el) => el.checked);

    if (selectedLocation) {
      params.set("destination", selectedLocation._id);
    } else {
      params.delete("destination");
    }

    router.push("/property?" + params.toString());
  };

  const handlePriceFilter = (min: number, max: number, index: number) => {
    const params = new URLSearchParams(searchPrams.toString());
    params.delete("page");

    // Update the checked state for all price options
    const updatedPriceArr = priceArr.map((price, i) => ({
      ...price,
      checked: i === index,
    }));
    setPriceArr(updatedPriceArr);

    // Set the price range in URL params
    params.set("min", String(min));
    params.set("max", String(max));

    router.push("/property?" + params.toString());
  };

  const checkPriceIsChecked = (min: number, max: number) => {
    const minParams = searchPrams.get("min");
    const maxParams = searchPrams.get("max");

    if (!minParams || !maxParams) return false;

    return Number(minParams) === min && Number(maxParams) === max;
  };

  const clearPriceFilter = () => {
    const params = new URLSearchParams(searchPrams.toString());
    params.delete("min");
    params.delete("destination");
    params.delete("collection");
    params.delete("group");
    params.delete("max");

    setLocationArr(
      locationArr.map((location) => ({
        ...location,
        checked: false,
      }))
    ); // Reset all location options to unchecked
    locationArr;
    // Reset all price options to unchecked
    const updatedPriceArr = priceArr.map((price) => ({
      ...price,
      checked: false,
    }));
    setPriceArr(updatedPriceArr);

    router.push("/property?" + params.toString());
  };

  const [propertyarr, setPropertyarr] = useState([
    {
      label: "Hotels",
      checked: false,
    },
    {
      label: "Apartments",
      checked: false,
    },
  ]);

  const handlePrice = (data: any) => {
    if (data && data?.length > 0) {
      setMinPrice(data[0]);
      setMaxPrice(data[1]);
      console.log(`min ${minPrice} max ${maxPrice}`);
    }
  };

  const features = [
    "Private Pool",
    "Caretaker",
    "Complimentary Breakfast",
    "Balcony",
    "Private Terrace",
    "Private Parking",
    "Common Pool",
    "Open Common Parking",
  ];

  const handleGroup = (index: number) => {
    const params = new URLSearchParams(searchPrams.toString());
    params.delete("page");

    // Toggle the checked state for the clicked group
    const updatedGroupArr = groupArr.map((el, i) => ({
      ...el,
      checked: i === index ? !el.checked : false, // Only allow one group to be selected at a time
    }));
    setGroupArr(updatedGroupArr);

    // Get the selected group
    const selectedGroup = updatedGroupArr.find((el) => el.checked);

    if (selectedGroup) {
      params.set("group", selectedGroup.label);
    } else {
      params.delete("group");
    }

    router.push("/property?" + params.toString());
  };

  const checkGroupIsChecked = (label: string) => {
    const groupParam = searchPrams.get("group");
    return groupParam === label;
  };

  const clearGroupFilter = () => {
    const params = new URLSearchParams(searchPrams.toString());
    params.delete("group");

    // Reset all group options to unchecked
    const updatedGroupArr = groupArr.map((group) => ({
      ...group,
      checked: false,
    }));
    setGroupArr(updatedGroupArr);

    router.push("/property?" + params.toString());
  };

  return (
    <Suspense fallback="Loading...">
      <div className="filter_shadow h-auto">
        <div className="flex items-center justify-between bg-[#da6633] p-2 rounded-t-md relative">
          <p className="2xl:text-[25px] xl:text-[20px] font-montserrat lg:text-[18px] font-medium text-[#fff] font-playfair">
            Filters
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={clearPriceFilter}
              className="text-primarycolor bg-white rounded px-2 py-1 hover:text-primarydark text-[12px] font-montserrat"
            >
              Clear
            </button>
            <p
              className="close_con lg:hidden !static"
              onClick={() => setTagglefilterbottm(!tagglefilterbottm)}
            >
              <IoIosCloseCircle className="text-white" />
            </p>
          </div>
        </div>
        {/* <div className="border-b w-full h-[1px] my-3"></div> */}
        {/* <div>
                    <h4 className="2xl:text-[1.4rem] xl:text-[1.3rem] text-primarydark font-playfair font-medium">Your Budget (per night)</h4>
                    <div className="flex gap-3 my-2">
                        <input type="text" className='inline-block font-montserrat w-full text-center  border-t-0 border-x-0 focus:outline-none focus:ring-0 focus:outline-0 border-b-1 text-[#767676]' placeholder='₹ min' />
                        <input type="text" className='inline-block font-montserrat w-full text-center border-t-0 border-x-0 focus:outline-none focus:ring-0 focus:outline-0 border-b-1 text-[#767676]' placeholder='₹ Max' />
                    </div>
                    <button type="button" className="inline-block my-5 text-white bg-primarygray hover:bg-primarygray focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm w-full px-5 py-3  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" style={{ backgroundColor: '#767676' }}>Apply</button>
                </div> */}

        <div className="border-b pb-3 filter-content-wrap ">
          {/* <div className="px-3">
            <div className="mt-2 mb-6">
              <p className="font-montserrat text-[13px]">Price Per Night</p>

              <div className="flex gap-2 mb-3">
                <p className="font-montserrat text-[14px] font-semibold">
                  ₹ {minPrice} -{" "}
                </p>
                <p className="font-montserrat text-[14px] font-semibold">
                  ₹ {maxPrice}
                </p>
              </div>
            </div>
            <RangeSlider
                className="price-filter"
                onInput={(data: any) => handlePrice(data)}
                min={4500}
                step={1000}
                max={100000}
                defaultValue={[4500, 100000]}
                rangeSlideDisabled={true}
              />
          </div> */}

          {/* <div className="mb-3">
            <h4 className="2xl:text-[22px] xl:text-[17px] lg:[15px] text-primarydark font-playfair font-medium">
              Price per night
            </h4>
          </div> */}
          {/* <hr className="my-6" /> */}
          <div className="px-3 mt-3">
            <div className="flex justify-between items-center">
              <p className="font-montserrat text-[14px] font-semibold">
                Price Filter
              </p>
            </div>
            <ul className="custominput mt-3">
              {priceArr &&
                priceArr.map((el, index) => (
                  <li className="mb-3" key={index}>
                    <div className="flex items-center space-x-2">
                      <input
                        id={`${el.label.replace(" ", "")}${index}`}
                        type="radio"
                        name="price"
                        onChange={() =>
                          handlePriceFilter(el.min, el.max, index)
                        }
                        checked={checkPriceIsChecked(el.min, el.max)}
                        className="check-with-label h-4 w-4 border-[#767676] focus:outline-none bg-white focus:ring-0 inputcustom accent-primarycolor "
                      />
                      <label
                        htmlFor={`${el.label.replace(" ", "")}${index}`}
                        className="label-for-check  text-[#767676] font-montserrat font-medium  2xl:text-[0.9rem] lg:text-[14px]"
                      >
                        {el.label}
                      </label>
                    </div>
                  </li>
                ))}
            </ul>
          </div>

          <hr className="my-6" />

          {/* <div className="px-3">
            <p className="font-montserrat text-[14px] font-semibold mb-3">
              Location
            </p>
            <Propertytype
              heading={"Property Type"}
              filterArr={propertyarr}
              handleChange={(val: { label: string; checked: boolean }[]) =>
                setPropertyarr([...val])
              }
            />
          </div> */}

          <div className="mb-5 border-b pb-3 px-3">
            <div className="mb-3">
              <h4 className="font-montserrat text-[14px] font-semibold">
                Locations
              </h4>
            </div>
            <div>
              <ul>
                {locationArr.map((el, index) => (
                  <li key={index} className="mb-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="location"
                        checked={el.checked}
                        onClick={() => handleLocation(index)}
                        className="check-with-label h-4 w-4 border-[#767676] focus:outline-none bg-white focus:ring-0 inputcustom accent-primarycolor"
                      />
                      <label className="label-for-check text-[#767676] font-montserrat font-medium 2xl:text-[0.9rem] lg:text-[14px]">
                        {el.name}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* <div className="px-3">
            <p className="font-montserrat text-[14px] font-semibold mb-3">
              Features
            </p>

            <ul>
              {collectionArr.map((el, index) => (
                <li key={index} className="mb-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="features"
                      checked={el.checked}
                      onClick={() => handleCollection(index)}
                      className="check-with-label h-4 w-4 border-[#767676] focus:outline-none bg-white focus:ring-0 inputcustom accent-primarycolor"
                    />
                    <label className="label-for-check text-[#767676] font-montserrat font-medium 2xl:text-[0.9rem] lg:text-[14px]">
                      {el.label}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div> */}
          {/* <hr className="my-6" /> */}
          <div className="px-3">
            <p className="font-montserrat text-[14px] font-semibold mb-3">
              Group Filter
            </p>

            <ul>
              {groupArr.map((el, index) => (
                <li key={index} className="mb-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="group"
                      checked={checkGroupIsChecked(el.label)}
                      onClick={() => handleGroup(index)}
                      className="check-with-label h-4 w-4 border-[#767676] focus:outline-none bg-white focus:ring-0 inputcustom accent-primarycolor"
                    />
                    <label className="label-for-check text-[#767676] font-montserrat font-medium 2xl:text-[0.9rem] lg:text-[14px]">
                      {el.label}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* <button
          className="bg-navibule p-3 w-full text-white font-montserrat font-semibold rounded-lg"
          // onClick={() => handleApplyFilter()}
          onClick={() => setTagglefilterbottm(false)}

        >
          Apply
        </button> */}
      </div>
    </Suspense>
  );
};

export default Filter;
