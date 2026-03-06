import React from "react";
import { useNavigate } from "react-router-dom";
import { useCars } from "../context/CarContext";
import { useFilters } from "../context/FilterContext";
import body1 from "../assets/BodyType/bodytype1.webp";
import body2 from "../assets/BodyType/bodytype2.webp";
import body3 from "../assets/BodyType/bodytype3.webp";
import body4 from "../assets/BodyType/bodytype4.webp";
import body5 from "../assets/BodyType/bodytype5.webp";
import body6 from "../assets/BodyType/bodytype6.webp";
import body7 from "../assets/BodyType/bodytype7.webp";
import body8 from "../assets/BodyType/bodytype8.webp";
import body9 from "../assets/BodyType/bodytype9.webp";
import body10 from "../assets/BodyType/bodytype10.webp";
import body11 from "../assets/BodyType/bodytype11.webp";
import body12 from "../assets/BodyType/bodytype12.webp";
import body13 from "../assets/BodyType/bodytype13.webp";

const bodyTypes = [
  { name: "Bus", icon: body1 },
  { name: "Convertible", icon: body2 },
  { name: "Coupe", icon: body3 },
  { name: "Coupe-Sedan", icon: body4 },
  { name: "Excavator", icon: body5 },
  { name: "SUV", icon: body6 },
  { name: "Pickup", icon: body7 },
  { name: "Sedan", icon: body8 },
  { name: "Hatchback", icon: body9 },
  { name: "Station Wagon", icon: body10 },
  { name: "Truck", icon: body11 },
  { name: "Van", icon: body12 },
  { name: "Mini Van", icon: body13 },
];

const BodyType = () => {
  const { cars: carsData } = useCars();
  const { setSelectedFilters, resetFilters } = useFilters();
  const navigate = useNavigate();

  const getCountForType = (typeName) => {
    if (!carsData) return 0;
    return carsData.filter(car => {
      const bType = car.bodyType || car.body_type;
      return bType === typeName;
    }).length;
  };

  const handleTypeClick = (typeName) => {
    resetFilters();
    setSelectedFilters(prev => ({
      ...prev,
      bodyType: [typeName]
    }));
    navigate('/browse-cars');
  };

  return (
    <section className="custom-padding py-12">
      <div className="px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <h2 className="text-3xl font-semibold md:text-5xl text-primary-red text-gray-900 mb-8">
          Browse by Body Type
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 font-[poppins]">
          {bodyTypes.map((type) => {
            const count = getCountForType(type.name);
            return (
              <button
                key={type.name}
                onClick={() => handleTypeClick(type.name)}
                className="flex items-center gap-4 bg-gray-100 text-wrap border border-gray-300 rounded-md px-5 py-4 hover:shadow-sm hover:border-red-500 transition-all text-left"
              >
                {/* Icon */}
                <img
                  src={type.icon}
                  alt={type.name}
                  className="h-12 w-12 object-contain"
                />

                {/* Text */}
                <div className="flex flex-col font-semibold">
                  <p className="text-gray-900 text-lg">
                    {type.name}
                  </p>
                  <p className="text-md text-gray-600">
                    ({count.toLocaleString()})
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BodyType;