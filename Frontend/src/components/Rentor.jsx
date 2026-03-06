import React from "react";
import HeroImg from "../assets/ServicesImgs/services2.webp";
import { Link } from "react-router-dom";

const Rentor = () => {
  return (
    <section
      className=" text-white h-[70vh] flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${HeroImg})` }}
    >
      <div className="flex flex-col justify-center items-center space-y-10">
        <h1 className="text-3xl md:text-5xl custom-size-two:text-7xl text-center">
          Ready To Experience The Rentor Difference?
        </h1>
        <p className="font-[poppins] text-lg max-w-3xl text-center">
          Browse Our Fleet, Choose Your Pickup And Return Dates, And Complete
          Your Booking Quickly With Clear Pricing And No Hidden Steps.
        </p>
        <div className="flex  space-x-4">
          <Link to='/browse-cars'><button className="py-2 px-3 bg-primary-red text-white rounded-2xl text-xl w-40 cursor-pointer">Browse Cars</button></Link>
          <Link to='/about'><button className="py-2 px-3 bg-white text-black rounded-2xl text-xl w-40 cursor-pointer">Contact Us</button></Link>
        </div>
      </div>
    </section>
  );
};

export default Rentor;
