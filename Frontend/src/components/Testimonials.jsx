import React, { useState } from "react";
import { Link } from "react-router-dom";
import Img1 from '../assets/TestimonialsImg/testcar1.webp'
import Img2 from '../assets/TestimonialsImg/testcar2.webp'
import Img3 from '../assets/TestimonialsImg/testcar3.webp'
import Img4 from '../assets/TestimonialsImg/testcar4.webp'
import Img5 from '../assets/TestimonialsImg/testcar5.webp'
import Img6 from '../assets/TestimonialsImg/testcar6.webp'
import Img7 from '../assets/TestimonialsImg/testcar7.webp'
import Img8 from '../assets/TestimonialsImg/testcar8.webp'
import Img9 from '../assets/TestimonialsImg/testcar9.webp'
import Img10 from '../assets/TestimonialsImg/testcar10.webp'

const testimonialsData = [
  { title: "How To Get the Best Car Financing Deals", description: "Unlock the secrets to navigating car financing successfully. Learn how to secure competitive interest rates, understand loan terms, and drive away with confidence.", img1: Img1, img2: Img2 },
  { title: "Smart Tips for Buying a Used or New Car", description: "Discover how to inspect used cars, identify red flags, compare new vs. pre-owned options, and ensure you get the best value for your budget.", img1: Img3, img2: Img4 },
  { title: "Understanding Trade-Ins and Market Trends", description: "Explore smart trade-in strategies, evaluate your car’s market value, and stay updated on current automotive trends before making a purchase decision.", img1: Img5, img2: Img6 },
  { title: "Choosing the Right Model and Trim Level", description: "Get expert advice on selecting the perfect model, comparing trim levels, understanding features, and avoiding common car-buying mistakes.", img1: Img7, img2: Img8 },
  { title: "Final Car Buying Checklist Before You Sign", description: "Review insurance, registration, warranties, delivery day preparation, and essential maintenance tips before finalizing your purchase.", img1: Img9, img2: Img10 },
];

const Testimonials = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="px-4 py-16 bg-white font-sans">
      <div className="max-w-6xl mx-auto space-y-4">
        {testimonialsData.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className={`transition-all duration-500 rounded-xl bg-white border-2 
                ${isOpen
                  ? "border-red-600 shadow-[0_15px_30px_rgba(220,38,38,0.15)] scale-[1.01]"
                  : "border-gray-100 hover:border-red-200 shadow-sm"
                }`}
            >
              {/* Header */}
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className={`w-full px-8 py-7 flex items-center justify-between text-left transition-colors duration-300 rounded-xl
                  ${isOpen ? "bg-red-50/30" : "bg-white"}`}
              >
                <div className="flex items-center gap-6">
                  <span className={`text-xl   ${isOpen ? "text-red-600" : "text-gray-300"}`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className={`text-lg font-bold uppercase tracking-wide ${isOpen ? "text-red-700" : "text-gray-800"}`}>
                    {item.title}
                  </span>
                </div>

                <div className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-500 
                  ${isOpen ? "bg-red-600 text-white rotate-180" : "bg-gray-100 text-gray-400"}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Content Section */}
              <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="px-8 pb-10 pt-4">
                  <div className="flex flex-col lg:flex-row gap-12 items-center">

                    {/* Images - One Slightly Smaller (60/40 Ratio) */}
                    {/* Images Section - Fixed Responsiveness */}
                    <div className="lg:w-[60%] w-full flex flex-col sm:flex-row items-center gap-6 sm:gap-4">
                      {/* Main Image */}
                      <div className="w-full sm:w-[60%] aspect-video sm:h-64 overflow-hidden rounded-2xl shadow-lg border-2 border-red-50 flex-shrink-0">
                        <img
                          src={item.img1}
                          alt="Car Main"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Secondary Image - Responsive Sizing */}
                      <div className="w-4/5 sm:w-[40%] aspect-video sm:h-52 overflow-hidden rounded-2xl shadow-md border-2 border-red-50 sm:mt-12 flex-shrink-0">
                        <img
                          src={item.img2}
                          alt="Car Detail"
                          className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                        />
                      </div>
                    </div>

                    {/* Text Details */}
                    <div className="lg:w-[40%] space-y-6">
                      <div className="relative">
                        <div className="absolute -left-6 top-0 bottom-0 w-1.5 bg-red-600 rounded-full" />
                        <p className="text-gray-700 leading-relaxed text-[16px]">
                          {item.description}
                        </p>
                      </div>

                      <Link
                        to="/browse-cars"
                        className="inline-flex items-center gap-3 bg-red-600 text-white px-10 py-4 rounded-xl  uppercase tracking-widest text-sm hover:bg-gray-900 transition-all duration-300 shadow-[0_10px_20px_rgba(220,38,38,0.3)] hover:shadow-none"
                      >
                        Browse Inventory
                        <span>→</span>
                      </Link>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Testimonials;