// src/components/SearchForCars.jsx
import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCars } from "../context/CarContext";
import { useFilters } from "../context/FilterContext";

export default function SearchForCars() {
  const { cars: carsData } = useCars();
  const { setSelectedFilters, resetFilters } = useFilters();
  const navigate = useNavigate();

  // Extract dynamic makes, models, types, drive types, and years from car data
  const { makes, modelsByMake, dynamicTypes, dynamicSteerings, dynamicYears } = useMemo(() => {
    if (!carsData || !Array.isArray(carsData)) {
      return {
        makes: ["Select"],
        modelsByMake: {},
        dynamicTypes: ["Select"],
        dynamicSteerings: ["Select"],
        dynamicYears: ["Select"]
      };
    }

    const makesSet = new Set(["Select"]);
    const typesSet = new Set(["Select"]);
    const steeringsSet = new Set(["Select"]);
    const yearsSet = new Set(["Select"]);
    const modelsMap = {};

    carsData.forEach(car => {
      const make = car.make || car.brand;
      const model = car.model || car.name;
      const type = car.body_type || car.bodyType;
      const drive = car.drive;
      const year = car.year;

      if (make) {
        makesSet.add(make);
        if (!modelsMap[make]) modelsMap[make] = new Set(["Select"]);
        if (model) modelsMap[make].add(model);
      }
      if (type) typesSet.add(type);
      if (drive) steeringsSet.add(drive);
      if (year) yearsSet.add(year.toString());
    });

    const finalModels = {};
    Object.keys(modelsMap).forEach(m => {
      finalModels[m] = Array.from(modelsMap[m]).sort();
    });

    return {
      makes: Array.from(makesSet).sort(),
      modelsByMake: finalModels,
      dynamicTypes: Array.from(typesSet).sort(),
      dynamicSteerings: Array.from(steeringsSet).sort(),
      dynamicYears: Array.from(yearsSet).sort((a, b) => b - a) // Sort years descending
    };
  }, [carsData]);

  const prices = ["Select", "Under $10,000", "$10,000 - $30,000", "$30,000 - $50,000", "$50,000+"];
  // Removed static types, steerings, and years arrays as they are now dynamic

  // --- State Management ---
  const [formData, setFormData] = useState({
    make: "Select",
    model: "Select",
    price: "Select",
    type: "Select",
    steering: "Select",
    year: "Select",
  });

  const availableModels = formData.make !== "Select" && modelsByMake[formData.make]
    ? modelsByMake[formData.make]
    : ["Select"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "make" ? { model: "Select" } : {}),
    }));
  };

  const handleSearch = () => {
    let priceLimit = 1000000;
    if (formData.price === "Under $10,000") priceLimit = 10000;
    else if (formData.price === "$10,000 - $30,000") priceLimit = 30000;
    else if (formData.price === "$30,000 - $50,000") priceLimit = 50000;
    else if (formData.price === "$50,000+") priceLimit = 1000000;

    setSelectedFilters({
      type: [],
      bodyType: formData.type !== "Select" ? [formData.type] : [],
      make: formData.make !== "Select" ? [formData.make] : [],
      model: formData.model !== "Select" ? [formData.model] : [],
      steering: formData.steering !== "Select" ? [formData.steering] : [],
      year: formData.year !== "Select" ? [formData.year] : [],
      seats: [],
      engine: [],
      price: priceLimit,
    });

    navigate('/browse-cars');
  };

  return (
    <div className="relative max-w-7xl mx-auto mt-10 custom-size-two:-mt-24 group">
      {/* Corner Brackets */}
      {/* Top Left */}
      <span className="hidden lg:block absolute -top-4 -left-4 w-20 h-20 border-t-2 border-l-2 border-white rounded-tl-2xl z-20" />
      {/* Top Right */}
      <span className="hidden lg:block absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-white rounded-tr-2xl z-20" />
      {/* Bottom Left */}
      <span className="hidden lg:block absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-black rounded-bl-2xl z-20" />
      {/* Bottom Right */}
      <span className="hidden lg:block absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-black rounded-br-2xl z-20" />

      {/* Main Search Container */}
      <div className="relative z-10 sm:rounded-2xl overflow-hidden shadow-2xl bg-white ">
        {/* Header */}
        <div className="flex items-center justify-between bg-black px-6 py-5">
          <h2 className="text-white text-xl md:text-4xl ">Search For Cars</h2>
          <div className="text-white bg-red-600 p-2 rounded-lg">
            <Search size={24} />
          </div>
        </div>

        {/* Form fields */}
        <div className="p-6 md:p-10 bg-white font-[poppins]">
          {/* First row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-red-600 mb-2 font-bold uppercase text-xs tracking-widest">Make</label>
              <select
                name="make"
                value={formData.make}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 px-4 py-3 appearance-none focus:outline-none focus:border-red-600 focus:bg-red-600 focus:text-white cursor-pointer transition-all rounded-lg"
              >
                {makes.map((make) => (
                  <option key={make} value={make}>{make}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-red-600 mb-2 font-bold uppercase text-xs tracking-widest">Model</label>
              <select
                name="model"
                value={formData.model}
                onChange={handleChange}
                disabled={formData.make === "Select"}
                className={`w-full border-2 border-gray-200 px-4 py-3 appearance-none focus:outline-none focus:border-red-600 focus:bg-red-600 focus:text-white cursor-pointer transition-all rounded-lg ${formData.make === "Select" ? 'bg-gray-100 opacity-50' : ''}`}
              >
                {availableModels.map((model) => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-red-600 mb-2 font-bold uppercase text-xs tracking-widest">Price Range</label>
              <select
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 px-4 py-3 appearance-none focus:outline-none focus:border-red-600 focus:bg-red-600 focus:text-white cursor-pointer transition-all rounded-lg"
              >
                {prices.map((price) => (
                  <option key={price} value={price}>{price}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Second row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-red-600 mb-2 font-bold uppercase text-xs tracking-widest">Body Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 px-4 py-3 appearance-none focus:outline-none focus:border-red-600 focus:bg-red-600 focus:text-white cursor-pointer rounded-lg transition-all"
              >
                {dynamicTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-red-600 mb-2 font-bold uppercase text-xs tracking-widest">Drive Type</label>
              <select
                name="steering"
                value={formData.steering}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 px-4 py-3 appearance-none focus:outline-none focus:border-red-600 focus:bg-red-600 focus:text-white cursor-pointer rounded-lg transition-all"
              >
                {dynamicSteerings.map((steer) => (
                  <option key={steer} value={steer}>{steer}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-red-600 mb-2 font-bold uppercase text-xs tracking-widest">Model Year</label>
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 px-4 py-3 appearance-none focus:outline-none focus:border-red-600 focus:bg-red-600 focus:text-white cursor-pointer rounded-lg transition-all"
              >
                {dynamicYears.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={handleSearch}
                className="w-full bg-red-600 text-white py-4 uppercase  tracking-widest hover:bg-black transition-all duration-300 rounded-lg shadow-lg active:scale-95"
              >
                Find My Car
              </button>
            </div>
          </div>
        </div>

        <style jsx>{`
      select {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='black' viewBox='0 0 20 20'%3E%3Cpath d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 1rem center;
        background-size: 1.25rem;
      }
      select:focus {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='white' viewBox='0 0 20 20'%3E%3Cpath d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'/%3E%3C/svg%3E");
      }
    `}</style>
      </div>
    </div>
  );
}