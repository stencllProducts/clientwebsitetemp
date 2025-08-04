"use client";
import { images } from "@/assets";
import Image from "next/image";
import React from "react";
import styled from "styled-components";

const Hero = () => {
  return (
    <StyledHeader
      id="hero"
      className="w-full flex flex-col gap-8 md:gap-0 md:flex-row justify-between pt-[6rem] px-7 md:px-[8%] pb-10"
    >
      <div className="flex flex-col justify-center">
        <h2 className=" text-[2rem] leading-[1] md:text-[2.8rem] font-bold">
          Create simple and functional websites.
        </h2>
        <p>
          Specializing in crafting visually stunning and highly functional user
          interfaces.
        </p>

        <button> Get started</button>
      </div>
      <div>
        <Image src={images.headerImg} alt="hero image" />
      </div>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  background-color: white;
  background-image: radial-gradient(
    87.72% 79.37% at 43.86% 109.28%,
    rgba(188, 246, 130, 0.9) 0%,
    rgba(229, 199, 255, 0.9) 21%,
    rgba(205, 203, 255, 0.9) 43%,
    rgba(247, 247, 247, 0.9) 100%
  );
  button {
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    background-color: white;
    color: var(--color-black-primary);
    font-weight: bold;
    width: fit-content;
    transition: all 0.3s ease-in-out;
    &:hover {
      background-color: #ececec;
      transform: scale(1.05);
    }
  }
  h2 {
    font-weight: bold;
  }
  p {
    margin-top: 1rem;
    margin-bottom: 2rem;
  }
`;

export default Hero;
