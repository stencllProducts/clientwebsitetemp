"use client";

import { ToastContainer } from "react-toastify";

const ToastProvider = ({ children }) => {
  return (
    <>
      <ToastContainer />
      {children}
    </>
  );
};

export default ToastProvider;
