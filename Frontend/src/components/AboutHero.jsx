import React from 'react';
import HeroImg from "../assets/AboutImgs/AboutHeroImg.webp";  

const AboutHero = () => {
  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh] w-full">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HeroImg})` }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh] items-center justify-center px-5 sm:px-8 md:px-12 lg:px-16">
        <div className="text-center max-w-5xl mx-auto text-white">
          {/* Breadcrumb */}
          <div className="mb-6 md:mb-8">
            <p className="text-md sm:text-lg font-[poppins]">
              Home / About Us
            </p>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl font-semibold md:text-5xl custom-size-two:text-7xl  mb-5 md:mb-8">
            We're Award Winner Car <br /> Dealers Agency
          </h1>

          {/* Subtitle */}
          <p className="text-md sm:text-lg font-[poppins]">
            Premier Car Dealership: Excelling In Service, Selection, And Satisfaction
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;