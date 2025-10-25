import React from 'react'

export const ProductImageLoader = () => {
  return (
    <div className="w-[85%] m-auto">
      <div
        role="status"
        className=" grid grid-cols-5 gap-4 border-gray-300 rounded-md  animate-pulse dark:border-gray-700 flex-1"
      >
        <div className="flex items-center justify-center h-[400px] mb-4 bg-gray-300 col-span-3 rounded dark:bg-gray-700"></div>
        <div className="col-span-2">
          <div className="bg-gray-200 rounded-md h-48  dark:bg-gray-700 mb-4"></div>
          <div className="bg-gray-200 rounded-md h-48 dark:bg-gray-700 mb-2.5"></div>
        </div>
      </div>
      <div
        role="status"
        className="mb-5 grid grid-cols-5 gap-4 border-gray-300 rounded-md animate-pulse dark:border-gray-700 flex-1"
      >
        <div className="flex items-center justify-center h-[400px]  bg-gray-300 col-span-4 rounded dark:bg-gray-700"></div>
        <div className="col-span-1">
          <div className="bg-gray-200 rounded-md h-full  dark:bg-gray-700 mb-4"></div>
        </div>
      </div>
    </div>
  );
}

