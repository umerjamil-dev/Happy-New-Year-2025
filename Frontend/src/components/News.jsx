import React from 'react';
import car2 from '../assets/car2.png'
import car3 from '../assets/car3.png'
import manager from '../assets/manager.png'
import { Link } from 'react-router-dom';

const News = () => {
  return (
    <div className="custom-padding px-6 lg:px-12 py-16 lg:py-20 space-y-16 lg:space-y-24 bg-white">
      
      {/* Re-Styled Testimonial Section */}
      <div className="bg-white rounded-2xl shadow-[15px_15px_0px_0px_rgba(220,38,38,1)] overflow-hidden border-2 border-red-600 transition-transform hover:scale-[1.01] duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-3 items-center">
          
          {/* Left - Image (1 column) */}
         <div className="relative h-80 lg:h-full lg:col-span-1 flex items-center justify-center">
  <img
    src='https://media.istockphoto.com/id/2234639448/photo/man-in-an-office-wearing-glasses-working-with-phone-and-laptop.webp?a=1&b=1&s=612x612&w=0&k=20&c=rSLTjzo1zzW9DvBmKxqfbTJevr_xSDYyOzXTq29988g='
    alt="Manager Nathan Felix"
    className="object-contain"
  />
</div>

          {/* Right - Quote (2 columns) */}
          <div className="p-10 lg:p-14 lg:col-span-2">
            <blockquote className="text-3xl lg:text-4xl font-medium text-gray-800 mb-8 ">
              "Excellent Selection, Friendly Staff, Hassle-Free Process. Couldn't Be Happier With My Purchase. Highly Recommended."
            </blockquote>

            <div className="flex items-center justify-between border-t border-gray-100 pt-6">
              <div className="flex items-center font-[poppins] gap-2">
                <p className="text-lg font-semibold text-red-600">kevin hart</p>
                <p className="text-sm text-gray-500 font-medium">- Manager & Director</p>
              </div>

             
            </div>
          </div>
        </div>
      </div>

      {/* Replaced Blog Content with Brand Focus */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-8 md:space-y-0 gap-10">
        {/* Left Column - New Brand Text */}
        <div className="max-w-2xl">
          <h3 className="text-3xl font-semibold md:text-4xl custom-size-two:text-6xl  text-red-600 ">
            Drive the car 
            <span className="text-gray-900"> you deserve.</span>
          </h3>
          <p className="font-[poppins] mt-6 text-base md:text-lg text-gray-600 leading-relaxed">
            Experience a seamless transition into your next vehicle. Our curated collection of high-performance and luxury cars is inspected to ensure you drive away with total peace of mind and zero compromises.
          </p>
        </div>

        {/* Right Column - Call to Action */}
        <div className="flex flex-col space-y-4 md:space-y-6 justify-end md:items-end w-full md:w-auto">
          <h3 className="font-[poppins] text-xl md:text-2xl font-semibold text-gray-800">
            Join 10,000+ happy drivers
          </h3>
          {/* <button className="py-4 px-8 bg-red-600 text-white rounded-2xl text-xl md:text-2xl ">
            Browse All Cars
          </button> */}
                     <Link to='/about'><button className='bg-primary-red text-white py-2 px-5 text-xl md:text-4xl rounded-[7px]  cursor-pointer'>Learn More</button></Link>
          
        </div>
      </div>

    </div>
  );
};

export default News;