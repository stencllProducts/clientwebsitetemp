"use client";
import { images } from "@/assets";
import Image from "next/image";
import React from "react";
import styled from "styled-components";

const Features = () => {
  return (
    <>
      <StyledFeatures
        id="hero"
        className="w-full flex flex-col md:flex-row gap-8 md:gap-0 justify-between pt-[6rem] px-7 md:px-[8%] pb-10"
      >
        <div className="flex flex-col w-full">
          <h2 className=" text-[2rem] leading-[1] md:text-[2.8rem] font-bold">
            Mobile responsive and SEO-friendly.
          </h2>
          <p className="mt-4 text-[0.9rem] md:text-[1.1rem]">
            Our industry-focused templates are designed for usability and
            professionalism.
            <br />
            Cost-efficient solutions without compromising quality.
            <br />
            Ongoing support to ensure client satisfaction.
            <br />
            Add-on services for template customization.
          </p>
        </div>
        <div>
          <Image
            src={images.mobResp}
            alt="may be image of dark skinned man scrolling through a website"
          />
        </div>
      </StyledFeatures>
      <StyledFeatures
        id="hero"
        className="w-full flex flex-col md:flex-row gap-8 md:gap-0 justify-between pt-[6rem] px-7 md:px-[8%] pb-10"
      >
        <div>
          <Image
            src={images.hosting}
            alt="may be image of people scrolling through social media"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-[0.8rem] ">Hosting Services</p>
          <h2 className="text-[2rem] leading-[1] md:text-[2.8rem] font-bold">
            Website / app hosting available with plan.
          </h2>
          <p className="mt-4 text-[0.9rem] md:text-[1.1rem]">
            Our industry-focused templates are designed for usability and
            professionalism.
            <br />
            Cost-efficient solutions without compromising quality.
            <br />
            Ongoing support to ensure client satisfaction.
            <br />
            Add-on services for template customization.
          </p>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-[16rem] mt-7">
              <h2 className="text-[#73D0B9] text-[1.6rem]">#1</h2>
              <h3 className="font-bold text-[1.4rem] mb-0 pb-0">
                in the Market
              </h3>
              <p className="text-[1.1rem] font-light mt-1.5">
                Real-life examples of stories built, & shared by some of the
                best PR teams.
              </p>
            </div>
            <div className="w-full md:w-[16rem] mt-7">
              <h2 className="text-[#73D0B9] text-[1.6rem]">450+</h2>
              <h3 className="font-bold text-[1.4rem] mb-0 pb-0">
                Talented PR Teams
              </h3>
              <p className="text-[1.1rem] font-light mt-1.5">
                Take the stress out of contact management with a dedicated
                outreach CRM.
              </p>
            </div>
          </div>
        </div>
      </StyledFeatures>
    </>
  );
};

const StyledFeatures = styled.header`
  background-color: #f8f9fa;

  h2 {
    font-weight: bold;
  }
`;

export default Features;
