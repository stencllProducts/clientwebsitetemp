"use client";
import React from "react";
import styled from "styled-components";

const Loader = () => {
  return <StyledSpan className="loader"></StyledSpan>;
};

const StyledSpan = styled.span`
  width: 20px;
  height: 20px;
  border: 3px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loader;
