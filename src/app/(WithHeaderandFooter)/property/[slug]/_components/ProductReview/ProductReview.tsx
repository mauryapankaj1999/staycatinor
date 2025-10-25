"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import booking from '@/assets/amenities/booking.svg';
import airbnb from '@/assets/amenities/logos_airbnb-icon.svg';
import google from '@/assets/amenities/devicon_google.svg';
import dumyimg from '@/assets/allimg/img_avatar.png';
import StarRatings from 'react-star-ratings';
import { SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import Link from 'next/link';
import property from '@/assets/property.png';
import { IReview, useReview } from '@/services/review.service';
import { STATUS } from '@/common/contstant';
import { generateFilePath } from '@/services/url.service';
import dynamic from 'next/dynamic';

type ProductReviewProps = {
  propertyId: string;
};

const Swiper = dynamic(() => import('swiper/react').then((mod) => mod.Swiper), {
  ssr: false,
});

const ProductReview = ({ propertyId }: ProductReviewProps) => {
  const { data: reviews } = useReview(
    { status: STATUS.ACTIVE, propertyId },
    true,
    propertyId ? true : false
  );
  const [explorereviews, setExplorereviews] = useState<IReview[]>([]);
  const [expandedReviews, setExpandedReviews] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (reviews && reviews?.data) {
      setExplorereviews(reviews?.data);
    }
  }, [reviews]);

  const [serviceTabs, setServiceTabs] = useState([
    {
      name: 'All Reviews',
      rating: '4.9',
      active: true,
      tab: 1,
    },
    // {
    //   name: "Booking.com",
    //   brandicon: booking,
    //   rating: "4.7",
    //   active: false,
    //   tab: 2,
    // },
    // {
    //   name: "Air BNB",
    //   rating: "4.9",
    //   brandicon: airbnb,
    //   active: false,
    //   tab: 3,
    // },
    // {
    //   name: "Google",
    //   brandicon: google,
    //   rating: "5.0",
    //   active: false,
    //   tab: 4,
    // },
  ]);

  const activeServiceTabs = (i: number) => {
    const temp = serviceTabs.map((item, index) => {
      i === index ? (item.active = true) : (item.active = false);
      return item;
    });
    console.log('SERVICE', temp);
    setServiceTabs([...temp]);
  };

  const reviewslider = {
    0: {
      slidesPerView: 1.5,
    },
    576: {
      slidesPerView: 3,
    },
    992: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 3.2,
    },
    1500: {
      slidesPerView: 3,
    },
  };

  // Function to toggle the expanded state of a review
  const toggleReadMore = (reviewId: string) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  // Function to truncate description
  const truncateDescription = (description: string, maxLength: number = 100) => {
    if (description.length <= maxLength) return description;
    return description.slice(0, maxLength) + '...';
  };

  return (
    <>
      {explorereviews && explorereviews?.length > 0 && (
        <div className="property_detail_shadow md:rounded-md px-[0.5rem] py-[0.6rem] md:px-[1rem] md:py-[1rem] mt-6 md:mt-8">
          <h3 className="font-playfair md:text-[20px] xl:text-[20px] mb-2 text-[16px] md:font-normal lg:font-normal xl:font-normal 2xl:font-normal font-semibold">
            Reviews
          </h3>
          <div className="listreview">
            <div>
              <ul className="flex gap-[20px] md:gap-[32px] md:mt-7 mt-3 mb-4 overflow-x-auto hide-scrollbar">
                {serviceTabs.map((item, i) => (
                  <li
                    key={`service-${i}`}
                    className={
                      item.active
                        ? 'active flex gap-2 items-center cursor-pointer pb-2'
                        : 'flex gap-2 items-center cursor-pointer pb-2 flex-nowrap'
                    }
                    onClick={() => activeServiceTabs(i)}
                  >
                    <span className="text-[12px] 2xl:text-[1rem] md:text-[14px] font-montserrat font-normal text-[#1A1A1A] text-nowrap">
                      {item.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="res mt-5">
            <Swiper
              spaceBetween={10}
              speed={3000}
              loop
              className="mySwiper1"
              breakpoints={reviewslider}
            >
              {explorereviews.map((el) => (
                <SwiperSlide key={el._id}>
                  <div className="bg-[#f5f5f5] p-[0.8rem] md:p-[1.25rem] rounded-md">
                    <div className="flex gap-3">
                      <div>
                        <div className="h-[1.5rem] w-[1.5rem] md:h-[2.5rem] md:w-[2.5rem] relative rounded-full">
                          <Image
                            src={generateFilePath(el.thumbnail)}
                            alt=""
                            fill
                            className="rounded-full"
                          />
                        </div>
                      </div>
                      <div>
                        <p className="font-montserrat font-medium text-navibule text-[12px] md:text-[14px] capitalize">
                          {el.name}
                        </p>
                        <p className="font-montserrat font-normal text-[10px] md:text-[12px] text-primarydark">
                          {new Date(el.date).toDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="my-2">
                      <StarRatings
                        rating={el.star}
                        starDimension="14px"
                        starSpacing="3px"
                        starRatedColor="#fcbf02"
                      />
                    </div>
                    <p className="font-montserrat font-normal 2xl:text-[16px] md:text-[15px] text-[13px] text-primarygray capitalize">
                      {expandedReviews[el._id]
                        ? el.description
                        : truncateDescription(el.description, 100)}
                    </p>
                    {el.description.length > 100 && (
                      <Link
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleReadMore(el._id);
                        }}
                        className="my-2 inline-block text-[#2f80ed] font-montserrat text-[11px] md:text-[0.8rem]"
                      >
                        {expandedReviews[el._id] ? 'Read less' : 'Read more'}
                      </Link>
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductReview;
