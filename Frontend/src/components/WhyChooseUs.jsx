import React from "react";
import Benefit1 from "../assets/ServicesImgs/benefit1.webp";
import Benefit2 from "../assets/ServicesImgs/benefit2.webp";
import Benefit3 from "../assets/ServicesImgs/benefit3.webp";
import Benefit4 from "../assets/ServicesImgs/benefit4.webp";
import Benefit5 from "../assets/ServicesImgs/benefit5.webp";
const WhyChooseUs = () => {
  return (
    <section className="custom-padding py-20 ">
        <div className="text-center py-4 space-y-4">
      <h4 className="text-xl md:text-2xl font-semibold">Why Choose Us</h4>
      <h1 className="text-primary-red text-3xl md:text-5xl custom-size-two:text-7xl">
           Benefits That Make Us Stand Out
          </h1>
        </div>
      <div>
        <div className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4 py-7">
          <div className="flex items-center border border-gray-400 rounded-2xl p-6 space-x-5 max-w-fit shadow-sm bg-white">
  {/* Icon Container: Rounded pink square with the shield icon */}
  <div className="bg-[#FFE5E8] p-3 rounded-[20px] flex items-center justify-center ">
    <img src={Benefit1} alt="Insurance Icon" className="h-14 w-14 object-contain" />
  </div>

  {/* Text Content */}
  <div className="flex flex-col justify-center">
    <h2 className="text-xl md:text-2xl font-semibold">
      Full Insurance
    </h2>
    <p className="text-sm md:text-base font-[poppins] text-gray-800 ">
      Comprehensive Coverage Included
    </p>
  </div>
</div>
          <div className="flex items-center border border-gray-400 rounded-[20px] p-6 space-x-5 max-w-fit shadow-sm bg-white">
  {/* Icon Container: Rounded pink square with the shield icon */}
  <div className="bg-[#FFE5E8] p-3 rounded-[20px] flex items-center justify-center">
    <img src={Benefit2} alt="Insurance Icon" className="h-14 w-14 object-contain" />
  </div>

  {/* Text Content */}
  <div className="flex flex-col justify-center">
    <h2 className="text-xl md:text-2xl font-semibold ">
      24/7 Support
    </h2>
    <p className="text-sm md:text-base font-[poppins] text-gray-800 ">
      Comprehensive Coverage Included
    </p>
  </div>
</div>
          <div className="flex items-center border border-gray-400 rounded-[20px] p-6 space-x-5 max-w-fit shadow-sm bg-white">
  {/* Icon Container: Rounded pink square with the shield icon */}
  <div className="bg-[#FFE5E8] p-3 rounded-[20px] flex items-center justify-center">
    <img src={Benefit3} alt="Insurance Icon" className="h-14 w-14 object-contain" />
  </div>

  {/* Text Content */}
  <div className="flex flex-col justify-center">
    <h2 className="text-xl md:text-2xl font-semibold ">
      Well Maintained
    </h2>
    <p className="text-sm md:text-base font-[poppins] text-gray-800 ">
      Comprehensive Coverage Included
    </p>
  </div>
</div>
          <div className="flex items-center border border-gray-400 rounded-[20px] p-6 space-x-5 max-w-fit shadow-sm bg-white">
  {/* Icon Container: Rounded pink square with the shield icon */}
  <div className="bg-[#FFE5E8] p-3 rounded-[20px] flex items-center justify-center">
    <img src={Benefit4} alt="Insurance Icon" className="h-14 w-14 object-contain" />
  </div>

  {/* Text Content */}
  <div className="flex flex-col justify-center">
    <h2 className="text-xl md:text-2xl font-semibold ">
      Easy Payment
    </h2>
    <p className="text-sm md:text-base font-[poppins] text-gray-800 ">
      Comprehensive Coverage Included
    </p>
  </div>
</div>
          <div className="flex items-center border border-gray-400 rounded-[20px] p-6 space-x-5 max-w-fit shadow-sm bg-white">
  {/* Icon Container: Rounded pink square with the shield icon */}
  <div className="bg-[#FFE5E8] p-3 rounded-[20px] flex items-center justify-center">
    <img src={Benefit2} alt="Insurance Icon" className="h-14 w-14 object-contain" />
  </div>

  {/* Text Content */}
  <div className="flex flex-col justify-center">
    <h2 className="text-xl md:text-2xl font-semibold ">
      Flexible Hours
    </h2>
    <p className="text-sm md:text-base font-[poppins] text-gray-800 ">
      Comprehensive Coverage Included
    </p>
  </div>
</div>
          <div className="flex items-center border border-gray-400 rounded-[20px] p-6 space-x-5 max-w-fit shadow-sm bg-white">
  {/* Icon Container: Rounded pink square with the shield icon */}
  <div className="bg-[#FFE5E8] p-3 rounded-[20px] flex items-center justify-center">
    <img src={Benefit5} alt="Insurance Icon" className="h-14 w-14 object-contain" />
  </div>

  {/* Text Content */}
  <div className="flex flex-col justify-center">
    <h2 className="text-xl md:text-2xl font-semibold">
      Many Locations
    </h2>
    <p className="text-sm md:text-base font-[poppins] text-gray-800">
      Comprehensive Coverage Included
    </p>
  </div>
</div>
          
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
