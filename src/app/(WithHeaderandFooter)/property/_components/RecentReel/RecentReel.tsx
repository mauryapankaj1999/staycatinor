"use client";
import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import Link from "next/link";
import { useReel } from "@/services/reel.service"; // Import the service
import { useSearchParams } from "next/navigation";
import { generateFilePath } from "@/services/url.service";
import Image from "next/image";
import moment from "moment";

const RecentReel = () => {
  const urlParams = useSearchParams();
  const location = urlParams.get("destination")?.toString();
  const [videotoggle, setVideotoggle] = useState(false);
  const [videoindex, setVideoindex] = useState(0);

  // Fetch reels from the API
  const { data: reelData, isLoading } = useReel(
    { location: location }, // No search filters
    false, // Disable pagination from params
    true // Enabled by default
  );
  // State for reels and videos

  console.log("reelData", reelData);
  const [videoarray, setVideoarray] = useState<{ videorul: string }[]>([]);

  // Update state when reel data is fetched
  useEffect(() => {
    if (reelData?.data) {
      const reels = reelData.data.map((reel) => ({
        title: reel.title, // Use title as the display text
        description: reel.description,
      }));
      const videos = reelData.data.map((reel) => ({
        videorul: reel.video, // Video URL or base64 string
      }));
      setVideoarray(videos);
    }
  }, [reelData]);
  const nextvideo = (num: number) => {
    let videochnageindex = videoindex + num;
    if (videochnageindex < videoarray?.length && videochnageindex >= 0) {
      setVideoindex(videochnageindex);
    }
  };
  return (
    <>
      <div className="reelimg">
        <p className=" 2xl:text-[28px] lg:text-[26px] md:text-[22px] text-[18px] font-theseasion text-[#da6633] font-medium block">
          Take a virtual tour of our properties
        </p>
        <ul
          className={`flex py-2 gap-4 overflow-x-auto xl:overflow-x-visible scrollbar-hide`}
        >
          {reelData?.data.map((el, index) => (
            <li key={index}>
              <div
                className="w-[75px]"
                onClick={() => {
                  setVideotoggle(true);
                  setVideoindex(index); // Set video index when clicked
                }}
              >
                <div className="property_reel relative cursor-pointer flex items-center justify-center">
                  <div className="svg_img_continer relative w-[50px] h-[50px] xl:w-[65px] xl:h-[65px] z-[1] bg-white flex items-center justify-center rounded-full">
                    {/* Placeholder circle since no thumbnail */}
                    <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                      {/* <sp className="text-sm">Video</sp<an> */}
                      <Image
                        src={generateFilePath(el.thumbnail)}
                        fill
                        alt="no image"
                      />
                    </div>
                  </div>
                </div>
                <p className="font-montserrat text-center truncate font-medium md:text-[0.8rem] xl:text-[11px] text-[11px] mt-2 text-[#767676]">
                  {el.title}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {videotoggle && (
        <>
          <div className="fixed inset-0 w-full h-[100vh] opacity-95 bg-custom-dark flex items-center justify-center z-[9999] backdropblurcustom"></div>
          <p
            className="fixed md:top-24 top-4 right-[2%] md:right-[25%] z-[9999999] flex items-center justify-center cursor-pointer"
            onClick={() => setVideotoggle(false)}
          >
            <IoCloseOutline className="text-[3rem] text-white" />
          </p>
          <div className="fixed m-auto inset-0 z-[999999] flex items-center justify-center overflow-y-auto">
            {videoindex > 0 && (
              <div className="cursor-pointer" onClick={() => nextvideo(-1)}>
                <FaChevronLeft className="text-[2.1rem] pr-4 text-white" />
              </div>
            )}
            <div className="md:w-[25%] w-[70%] relative">
              <div>
                {videoindex >= 0 && videoindex < videoarray.length && (
                  <>
                    <video
                      autoPlay
                      loop
                      muted
                      key={videoindex}
                      className="rounded-sm w-full"
                    >
                      <source
                        src={generateFilePath(videoarray[videoindex].videorul)}
                        type="video/mp4"
                      />
                    </video>
                    <div className="mt-2 text-white">
                      <h3 className="font-montserrat text-lg">
                        {reelData?.data[videoindex]?.title}
                      </h3>
                      <p className="font-montserrat text-sm">
                        {reelData?.data[videoindex]?.description}
                      </p>
                    </div>
                  </>
                )}
              </div>
              <div className="absolute -bottom-2 right-1">
                <Link
                  href={`/property/${
                    reelData?.data[videoindex]?.propertyObj?.slug
                  }?startDate=${moment()
                    .add(1, "days")
                    .format("YYYY-MM-DD")}&endDate=${moment()
                    .add(2, "days")
                    .format("YYYY-MM-DD")}&adult=1&child=0&room=3`}
                  className="inline-block font-montserrat bg-[#fff] text-[#000] px-3 py-2 rounded-md"
                >
                  View Home
                </Link>
              </div>
            </div>
            {videoindex < videoarray.length - 1 && (
              <div className="cursor-pointer" onClick={() => nextvideo(1)}>
                <FaChevronRight className="text-[2.1rem] pl-4 text-white" />
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default RecentReel;
