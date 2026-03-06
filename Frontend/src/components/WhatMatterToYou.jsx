import React from "react";
import Car2 from "../assets/car2.png";
import { Link } from "react-router-dom";
import icon1 from '../assets/Dealership.webp';      // Trusted Dealership
import icon2 from '../assets/FinancingOffer.webp';  // Special Financing
import icon3 from '../assets/Pricing.webp';         // Transparent Pricing

const WhatMattersToYou = () => {
  return (
    <div className="custom-padding font-[poppins] px-6 md:px-10 py-16 md:py-20 bg-white">
      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-10 lg:gap-16 items-start">

        {/* LEFT SIDE: Features + Car Image – now with explicit placement */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 order-2 lg:order-1">

          {/* 1st box – Special Financing (row 1, col 1) */}
          <div className="bg-red-600 text-white rounded-2xl p-6 md:p-8 text-center shadow-xl hover:shadow-2xl transition-shadow">
            <img 
              src={icon2} 
              alt="Financing Offer Icon" 
              className="mx-auto mb-6 h-16 w-16 md:h-20 md:w-20 object-contain" 
            />
            <h3 className="text-xl md:text-2xl font-bold mb-3">Special Financing Offers</h3>
            <p className="text-sm md:text-base leading-relaxed opacity-95">
              Take Advantage Of Our Special Financing Offers To Drive Your Dream Car Home Today.
            </p>
          </div>

          {/* 2nd box – Transparent Pricing (row 1, col 2) */}
          <div className="bg-white rounded-2xl p-6 md:p-8 text-center shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow">
            <img 
              src={icon3} 
              alt="Transparent Pricing Icon" 
              className="mx-auto mb-6 h-16 w-16 md:h-20 md:w-20 object-contain" 
            />
            <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900">Transparent Pricing</h3>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              Experience Peace Of Mind With Transparent Pricing. Know Exactly What You're Paying For.
            </p>
          </div>

          {/* 3rd box – Trusted Dealership (row 2, col 1) */}
          <div className="bg-white rounded-2xl p-6 md:p-8 text-center shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow">
            <img 
              src={icon1} 
              alt="Trusted Dealership Icon" 
              className="mx-auto mb-6 h-16 w-16 md:h-20 md:w-20 object-contain" 
            />
            <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900">Trusted Car Dealership</h3>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              Your Trusted Car Dealership For Quality Vehicles And Exceptional Service Experience Reliability.
            </p>
          </div>

          {/* 4th box – Car image (row 2, col 2 on sm+ / lg+) */}
          <div className="rounded-2xl overflow-hidden shadow-2xl sm:col-start-2 sm:row-start-2 lg:col-start-2 lg:row-start-2">
            <img
              src={Car2}
              alt="Premium sports car at sunset"
              className="w-full h-full object-cover aspect-[4/3] sm:aspect-square lg:aspect-[4/3]"
            />
          </div>
        </div>

        {/* RIGHT SIDE: Headline + Description + Button – unchanged */}
        <div className="order-1 lg:order-2 lg:pt-12 max-w-xl">
          <h2 className="text-3xl font-semibold md:text-4xl custom-size-two:text-6xl  leading-tight mb-8 text-gray-900">
            We're Big On
            <br />
            What Matters
            <br />
            To You
          </h2>

          <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed mb-10">
            Discover A Dealership That Prioritizes Your Needs Above All Else. From Quality Vehicles To Personalized Service, We Are Dedicated To Your Satisfaction.
          </p>

          <Link to="/about">
            <button className="bg-red-600 text-white px-10 py-4 text-lg md:text-xl font-semibold rounded-2xl hover:bg-red-700 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 shadow-lg">
              About More
            </button>
          </Link>

          {/* Optional decorative line */}
          <div className="hidden lg:block border-t-2 border-dashed border-gray-400 mt-16 w-3/4"></div>
        </div>
      </div>
    </div>
  );
};

export default WhatMattersToYou;