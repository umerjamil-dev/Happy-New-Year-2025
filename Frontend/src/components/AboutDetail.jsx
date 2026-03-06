import React from "react";
import About1 from "../assets/AboutImgs/About1.webp";
import About2 from "../assets/AboutImgs/About2.webp";
import About3 from "../assets/AboutImgs/About3.webp";
import About4 from "../assets/AboutImgs/About4.webp";
import { Link } from "react-router-dom";

const AboutDetail = () => {
  return (
    <>
    <section className="custom-padding">
      <div className="flex flex-col justify-center items-center py-16">
        <img className="" src={About1} alt="" />
        <p className="text-xl  md:text-2xl custom-size-two:text-3xl max-w-4xl  sm:text-center mt-6">
          Our team of skilled professionals is the driving force behin our
          ability to deliver exceptional digital products From designers to
          developers, we have the expertise passion We and diverse perspectives.
        </p>
      </div>

      <div className="py-10">
        <div className="flex flex-col md:flex-row justify-around items-center">
          <div className="space-y-6 max-w-3xl">
            <p className="text-xl md:text-3xl">About Rentor</p>
            <h4 className="text-3xl md:text-4xl custom-size-two:text-5xl   text-primary-red">
              We Are Committed To Providing Fast,Reliable, And Professional Car
              Rental Services.
            </h4>
           <Link to="/browse-cars"><button className="py-2 px-3 my-3 bg-primary-red text-white rounded-2xl text-xl w-32 md:w-40 cursor-pointer">
              See Our Fleet
            </button></Link>
          </div>
          <img src={About2} alt="" />
        </div>
      </div>
      <div className="py-10 ">
        <div className="flex flex-col lg:flex-row justify-around space-x-7">
          <img src={About4} alt=""  className="hidden lg:block"/>
          <div className="max-w-lg space-y-8">
            <h2 className="text-3xl md:text-4xl custom-size-two:text-5xl  max-w-3xl text-primary-red">
              Your Trusted Partner In Reliable Car Rental
            </h2>
            <p className="font-[poppins] font-medium text-md md:text-lg">
              We take pride in our fleet and customer experience. Rent with
              confidence, knowing we’re here to support every step of your trip.
            </p>
            {/* Decorative Red Line */}
            <div className="relative w-full max-w-lg h-[2px] bg-gray-200 mt-12 mb-6">
              <div className="absolute top-0 left-0 h-full w-full bg-black"></div>
              <div className="absolute -right-1 -top-1 w-2.5 h-2.5 bg-black rounded-full"></div>
            </div>
            <div className="flex flex-col space-y-2">
              <h4 className="text-3xl md:text-4xl custom-size-two:text-5xl">Easy Booking Experience</h4>
              <p className="font-[poppins]">
                We’ve simplified the booking steps so you can choose a car, set
                your dates, and confirm your rental in just a few clicks.
              </p>
              <h4 className="text-3xl md:text-4xl custom-size-two:text-5xl">Convenient Pick-Up & Return</h4>
              <p className="font-[poppins]">
                Flexible pick-up and return options are available to match your
                schedule and make every trip more convenient.
              </p>
             <Link to="/browse-cars"> <button className="py-2 px-3 bg-primary-red text-white rounded-2xl text-xl w-52 cursor-pointer">
                Book Now
              </button></Link>
            </div>
          </div>
        </div>
      </div>

     
    </section>
    <div className="bg-black text-white flex flex-col md:flex-row mt-20">
        {/* Left Text Content */}
        <div className="w-full md:w-1/2 p-10 md:p-20 flex flex-col justify-center">
          <h4 className="text-xl mb-4 uppercase tracking-wider">
            How We Work
          </h4>
          <h2 className="text-3xl md:text-4xl custom-size-two:text-5xl mb-12">Rent Your Car In 3 Easy Steps</h2>

          <div className="space-y-10">
            {/* Step 1 */}
            <div className="flex items-start gap-4">
              <div className="bg-red-600 text-[30px] font-bold h-12 w-12 rounded-full flex items-center justify-center shrink-0 mt-1">
                01
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold">Choose Your Car</h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-sm font-[poppins]">
                  Explore Our Diverse Fleet, From Compact Cars To Spacious SUVs.
                  Find The Perfect Vehicle That Suits Your Needs For Any
                  Journey.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-4">
              <div className="bg-red-600 text-[30px] font-bold h-12 w-12 rounded-full flex items-center justify-center shrink-0 mt-1">
                02
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold">Book Online</h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-sm font-[poppins]">
                  Book Your Car Instantly On Our User-Friendly Platform. Select
                  Dates And Locations To Confirm Your Reservation In Just
                  Moments.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-4">
              <div className="bg-red-600 text-[30px] font-bold h-12 w-12 rounded-full flex items-center justify-center shrink-0 mt-1">
                03
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold">Pick Up & Drive</h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-sm font-[poppins]">
                  Head To Your Pickup Location And Grab Your Keys. Enjoy A
                  Smooth Ride With A Reliable And Well-Maintained Rentor
                  Vehicle.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Image Content */}
        <div className="w-full md:w-1/2">
          <img
            src={About3}
            alt="Car rental"
            className="w-full h-full object-cover min-h-[400px]"
          />
        </div>
      </div>
      </>
  );
};

export default AboutDetail;
