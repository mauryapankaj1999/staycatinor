"use client"
import React, { useEffect, useRef, useState } from 'react'

const ProductAbout = ({description}:{description:any}) => {

  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const descriptionRef:any = useRef(null);

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (descriptionRef.current) {
      const lineHeight = parseInt(window.getComputedStyle(descriptionRef.current).lineHeight);
      const maxHeight = lineHeight * 4;
      setIsOverflowing(descriptionRef.current?.scrollHeight > maxHeight);
    }
  }, [description]);



  return (
    
    <div className="property_detail_shadow md:rounded-md px-[0.5rem] py-[0.6rem] md:px-[1rem] md:py-[1rem] mt-6 md:mt-8 propertyabout">
      <h3 className="md:text-[20px] xl:text-[20px] mb-2 text-[16px]  md:font-normal lg:font-normal xl:font-normal 2xl:font-normal font-semibold"> About</h3>
      <p
        ref={descriptionRef}
        className={`abouproperyperggraph font-montserrat font-light text-[#767676] 2xl:text-[1rem] md:!text-[16px] text-[12px] ${
          isExpanded ? 'line-clamp-none' : 'line-clamp-4'
        }`}
        dangerouslySetInnerHTML={{ __html: description }}
      ></p>

      {isOverflowing && (
        <p
          onClick={toggleText}
          className="mt-2 xl:text-[0.9rem] text-[0.9rem]  cursor-pointer underline inline-block !font-montserrat font-bold"
        >
          {isExpanded ? 'Read Less' : 'Read More'}
        </p>
      )}
    </div>
  )
}

export default ProductAbout
