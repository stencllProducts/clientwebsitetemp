"use client";
import React from "react";
import NavBar from "../NavBar";
import Hero from "./Hero";
import Features from "./Features";
import ChooseYourPlan from "./ChooseYourPlan";
import ContactUs from "./ContactUs";
import Footer from "./Footer";

const Homepage = () => {
  return (
    <main className="w-full">
      <NavBar />
      <Hero />
      <Features />
      <ChooseYourPlan />
      <ContactUs />
      <Footer />
    </main>
  );
};

export default Homepage;