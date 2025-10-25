"use client";
import React, { Suspense } from "react";
import ForEveryone from "@/components/homepagecomponents/ForEveryone/ForEveryone";
import MidBanner from "@/components/homepagecomponents/MidBanner/MidBanner";
import HassleFreeToday from "@/components/homepagecomponents/HassleFreeToday/HassleFreeToday";
import WhatYouneed from "@/components/homepagecomponents/WhatYouneed/WhatYouneed";
import StayContainer from "@/components/homepagecomponents/StayContainer/StayContainer";
import { usePageById } from "@/services/page.service";
import Mobilebanner from "@/components/MobileComponents/Mobilebanner/Mobilebanner";
import { LocationCart } from "@/components/homepagecomponents/LocationCart/LocationCart";
import OfferSection from "@/components/homepagecomponents/OfferSection/OfferSection";
import ExploreLocations from "@/components/homepagecomponents/ExploreLocations/ExploreLocations";
import Banner from "@/components/homepagecomponents/Banner/Banner";
import NearbyGateway from "@/components/homepagecomponents/NearbyGateway/NearbyGateway";
import Blog from "@/components/homepagecomponents/Blog/Blog";
import Testimonials from "@/components/homepagecomponents/Testimonials/Testimonials";

// const Banner = dynamic(
//   () => import("@/components/homepagecomponents/Banner/Banner"),
//   {
//     ssr: false,
//     loading: () => <BannerLoader />,
//   }
// );
// const NearbyGateway = dynamic(
//   () => import("@/components/homepagecomponents/NearbyGateway/NearbyGateway"),
//   {
//     ssr: false,
//     loading: () => <NearbyGatewayLoader />,
//   }
// );

// const Blog = dynamic(
//   () => import("@/components/homepagecomponents/Blog/Blog"),
//   {
//     ssr: false,
//     loading: () => <BlogLoader />,
//   }
// );

// const Testimonials = dynamic(
//   () => import("@/components/homepagecomponents/Testimonials/Testimonials"),
//   {
//     ssr: false,
//     loading: () => <p>Loading...</p>,
//   }
// );

export default function Home() {
  let { data: page, isLoading } = usePageById("HOME", true);

  return (
    <Suspense fallback="Loading ....">
      <div className="grandent-bg">
        <div className="lg:block hidden">
          <Banner />
        </div>
        <div className="lg:hidden">
          <Mobilebanner />
        </div>

        <ExploreLocations />

        <LocationCart />

        <OfferSection />

        {!isLoading && (
          <ForEveryone section={page?.section1 ? page?.section1 : []} />
        )}
        {!isLoading && (
          <MidBanner section={page?.section2 ? page?.section2 : null} />
        )}

        <NearbyGateway />

        {!isLoading && (
          <HassleFreeToday section={page?.section3 ? page?.section3 : []} />
        )}

        <div className="lg:block">
          <Blog />
        </div>

        <WhatYouneed />

        {!isLoading && (
          <StayContainer section={page?.section4 ? page?.section4 : null} />
        )}
        <Testimonials />
      </div>
    </Suspense>
  );
}

{
  /* 
  comment 
  <div className="lg:hidden">
<Mobileblog />
</div> */
}
