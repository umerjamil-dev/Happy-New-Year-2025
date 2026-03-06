import React from "react";
import HeroImg from "../assets/ServicesImgs/services1.webp";

const ServicesHero = () => {
  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh] w-full">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HeroImg})` }}
      ></div>

      {/* Content */}
      <div className="relative z-10 flex h-full min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh] items-center justify-center px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="text-center max-w-5xl mx-auto text-white">
          {/* Breadcrumb */}
          <div className="mb-6 md:mb-8">
            <p className="text-md sm:text-lg font-[poppins]">Home / Services</p>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl md:text-5xl custom-size-two:text-7xl mb-5 md:mb-8">
            Our Services
          </h1>

          {/* Subtitle */}
          <p className="text-md sm:text-lg md:text-xl font-[poppins] max-w-3xl">
            Our rental services make every trip easier with well-kept vehicles,
            fair rates, and a simple booking experience you can trust.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;
