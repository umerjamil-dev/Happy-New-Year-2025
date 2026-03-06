import React from "react";
import Logo1 from "../assets/ServicesImgs/Logo1.webp";
import Logo2 from "../assets/ServicesImgs/Logo2.webp";
import Logo3 from "../assets/ServicesImgs/Logo3.webp";
import Logo4 from "../assets/ServicesImgs/Logo4.webp";

const WhatWeOffer = () => {
  return (
    <section className="custom-padding bg-[#FF00191A] py-16 md:py-24 lg:py-32">
      <div className="">
        {/* Header */}
        <div className="space-y-7">
          <p className="text-3xl">What We Offer</p>
          <h1 className="text-3xl md:text-4xl custom-size-two:text-6xl">
            Flexible Rental Solutions For <br /> Every Journey
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-2 md:gap-5 py-6">
        <div className="bg-red-600 rounded-2xl p-6 md:p-8  text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center mb-5 md:mb-6 shadow-md">
              <img src={Logo4} alt="" className="h-6"/>
            </div>
            <h3 className="text-xl md:text-3xl font-semibold mb-4 ">
              Car Exporter
            </h3>
            <p className="font-[poppins] text-white/90 text-sm md:text-base leading-relaxed mb-5 md:mb-6">
              Exporting high-quality vehicles worldwide with secure logistics, competitive pricing, and seamless transactions.
            </p>
            <a
              href="#"
              className="font-[poppins] inline-flex items-center font-semibold  transition-colors text-sm md:text-base"
            >
              Learn More
              <span className="ml-2">↓</span>
            </a>
          </div>
          {/* 2nd card */}
        <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-black rounded-full flex items-center justify-center  mb-5 md:mb-6 shadow-md">
              <img src={Logo3} alt="" className="h-6"/>
            </div>
            <h3 className="text-xl md:text-3xl font-semibold mb-4">
              Auto Parts
            </h3>
            <p className="font-[poppins] text-sm md:text-base leading-relaxed mb-5 md:mb-6">
              Supplying genuine and aftermarket parts for all major brands, ensuring performance and durability.
            </p>
            <a
              href="#"
              className="font-[poppins] inline-flex items-center  font-semibold transition-colors text-sm md:text-base"
            >
              Learn More
              <span className="ml-2">↓</span>
            </a>
          </div>
          {/* 3rd Card */}
        <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-black rounded-full flex items-center justify-center  mb-5 md:mb-6 shadow-md">
              <img src={Logo2} alt="" className="h-6"/>
            </div>
            <h3 className="text-xl md:text-3xl font-semibold mb-4">
              Heavy Machinery
            </h3>
            <p className="font-[poppins] text-sm md:text-base leading-relaxed mb-5 md:mb-6">
              Offering durable, efficient industrial and construction equipment for maximum productivity.
            </p>
            <a
              href="#"
              className="font-[poppins] inline-flex items-center  font-semibold transition-colors text-sm md:text-base"
            >
              Learn More
              <span className="ml-2">↓</span>
            </a>
          </div>
          {/* 4th Card */}
        <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-black rounded-full flex items-center justify-center  mb-5 md:mb-6 shadow-md">
              <img src={Logo1} alt="" className="h-6"/>
            </div>
            <h3 className="text-xl md:text-3xl font-semibold mb-4">
              Trucks
            </h3>
            <p className="font-[poppins] text-sm md:text-base leading-relaxed mb-5 md:mb-6">
              Providing reliable commercial trucks designed for performance, safety, and long-haul operations.
            </p>
            <a
              href="#"
              className="font-[poppins] inline-flex items-center  font-semibold transition-colors text-sm md:text-base"
            >
              Learn More
              <span className="ml-2">↓</span>
            </a>
          </div>
        
      </div>
    </section>
  );
};

export default WhatWeOffer;
