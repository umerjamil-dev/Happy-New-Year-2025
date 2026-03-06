import React from "react";
import Car from "../assets/car.webp";
import Vector from "../assets/vector.webp";
import '../App.css'

const Journey = () => {
  return (
    <section className="journeyBox flex flex-col lg:flex-row md:items-center md:justify-between py-16  lg:px-28 bg-white overflow-hidden">

      {/* Left Side: Content */}
      <div className="JourneyLeft">
        <h2 className="text-3xl font-semibold md:text-5xl custom-size-two:text-6xl  ">
          Our Journey By Your <br />
          <span className="text-red-600">Trusted Car Buying</span> <br />
          Partner
        </h2>

        <p className="mt-8 text-lg font-semibold md:max-w-md font-[poppins]">
          Embark On Our Journey With Your Trusted Partner
          For Seamless And Stress-Free Car Buying
          Experiences
        </p>

        {/* Decorative Red Line */}
        <div className="relative w-full max-w-lg h-[2px] bg-gray-200 mt-12 mb-6">
          <div className="absolute top-0 left-0 h-full w-full bg-red-600"></div>
          <div className="absolute -right-1 -top-1 w-2.5 h-2.5 bg-red-600 rounded-full"></div>
        </div>

        {/* Stats */}
        <div className="flex gap-16 font-[poppins]">
          <div>
            <p className="text-2xl  text-gray-900">1 Million</p>
            <p className="text-red-600 font-bold text-lg">Number Of Cars</p>
          </div>
          <div>
            <p className="text-2xl  text-gray-900">99 %</p>
            <p className="text-red-600 font-bold text-lg">Satisfaction Rate</p>
          </div>
        </div>
      </div>

      {/* Right Side: Visuals */}
      <div className="relative w-full lg:w-1/2 mt-12 lg:mt-0 flex justify-end items-center">

        {/* Red Background Vector Shape */}
        <img
          src={Vector}
          alt="Background Shape"
          className="w-[110%] object-contain translate-x-20 lg:translate-x-32 scale-y-90 "
        />

        {/* Car Image - Positioned to pop out of the shape */}
        <img
          src={Car}
          alt="White Mercedes"
          className="absolute w-[100%] lg:w-[115%] max-w-none top-1/2 left-1/2 -translate-x-5/12 -translate-y-1/2 z-10"
        />
      </div>
    </section>
  );
};

export default Journey;