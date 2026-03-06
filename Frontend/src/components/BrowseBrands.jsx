// src/components/BrowseBrands.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCars } from "../context/CarContext";
import { useFilters } from "../context/FilterContext";
import brand1 from "../assets/BrandsImgs/brand1.webp";
import brand2 from "../assets/BrandsImgs/brand2.webp";
import brand3 from "../assets/BrandsImgs/brand3.webp";
import brand4 from "../assets/BrandsImgs/brand4.webp";
import brand5 from "../assets/BrandsImgs/brand5.webp";
import brand6 from "../assets/BrandsImgs/brand6.webp";
import brand7 from "../assets/BrandsImgs/brand7.webp";
import brand8 from "../assets/BrandsImgs/brand8.webp";
import brand9 from "../assets/BrandsImgs/brand9.webp";
import brand10 from "../assets/BrandsImgs/brand10.webp";
import brand11 from "../assets/BrandsImgs/brand11.webp";
import brand12 from "../assets/BrandsImgs/brand12.webp";
import brand13 from "../assets/BrandsImgs/brand13.webp";
import brand14 from "../assets/BrandsImgs/brand14.webp";
import brand15 from "../assets/BrandsImgs/brand15.webp";
import brand16 from "../assets/BrandsImgs/brand16.webp";
import brand17 from "../assets/BrandsImgs/brand17.webp";
import brand18 from "../assets/BrandsImgs/brand18.webp";
import brand19 from "../assets/BrandsImgs/brand19.webp";
import brand20 from "../assets/BrandsImgs/brand20.webp";
import brand21 from "../assets/BrandsImgs/brand21.webp";
import brand22 from "../assets/BrandsImgs/brand22.webp";
import brand23 from "../assets/BrandsImgs/brand23.webp";
import brand24 from "../assets/BrandsImgs/brand24.webp";

const brands = [
  { name: "Audi", logo: brand1 },
  { name: "BMW", logo: brand2 },
  { name: "Citroën", logo: brand3 },
  { name: "Daihatsu", logo: brand4 },
  { name: "Ford", logo: brand5 },
  { name: "Hino", logo: brand6 },
  { name: "Honda", logo: brand7 },
  { name: "Hyundai", logo: brand8 },
  { name: "Isuzu", logo: brand9 },
  { name: "Jaguar", logo: brand10 },
  { name: "Jeep", logo: brand11 },
  { name: "Kia", logo: brand12 },
  { name: "Land Rover", logo: brand13 },
  { name: "Lexus", logo: brand14 },
  { name: "Mazda", logo: brand15 },
  { name: "Mercedes Benz", logo: brand16 }, // Matches 'Mercedes' sometimes but 'Mercedes Benz' is common
  { name: "Mitsubishi", logo: brand17 },
  { name: "Nissan", logo: brand18 },
  { name: "Peugeot", logo: brand19 },
  { name: "Subaru", logo: brand20 },
  { name: "Suzuki", logo: brand21 },
  { name: "Toyota", logo: brand22 },
  { name: "Volkswagen", logo: brand23 },
  { name: "Volvo", logo: brand24 },
];

export default function BrowseBrands() {
  const { cars: carsData } = useCars();
  const { setSelectedFilters, resetFilters } = useFilters();
  const navigate = useNavigate();

  const getCountForBrand = (brandName) => {
    if (!carsData) return 0;
    return carsData.filter(car => {
      const make = car.make || car.brand;
      // Partial match for Mercedes / Mercedes Benz
      if (brandName === "Mercedes Benz") {
        return make?.toLowerCase().includes("mercedes");
      }
      return make?.toLowerCase() === brandName.toLowerCase();
    }).length;
  };

  const handleBrandClick = (brandName) => {
    resetFilters();
    setSelectedFilters(prev => ({
      ...prev,
      make: [brandName === "Mercedes Benz" ? "Mercedes" : brandName]
    }));
    navigate('/browse-cars');
  };

  return (
    <section className="custom-padding py-12 bg-pink-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold md:text-5xl text-gray-900">For You To Choose</h2>
          <button
            onClick={() => { resetFilters(); navigate('/browse-cars'); }}
            className="mt-4 sm:mt-0 text-black text-lg flex items-center gap-1 font-[Poppins] hover:text-red-600 transition-colors"
          >
            Search Cars →
          </button>
        </div>

        <h3 className="text-3xl font-semibold md:text-5xl text-red-600 mb-10 text-center md:text-left">
          Browse By Car Brand
        </h3>

        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 font-[poppins]">
          {brands.map((brand) => {
            const count = getCountForBrand(brand.name);
            return (
              <button
                key={brand.name}
                onClick={() => handleBrandClick(brand.name)}
                className="flex items-center gap-6 bg-gray-100 border border-gray-300 rounded-md px-3 py-3 hover:shadow-sm hover:border-red-500 transition-all text-left group"
              >
                <img
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  className="h-12 w-12 object-contain group-hover:scale-110 transition-transform"
                />

                <div className="flex flex-col font-semibold">
                  <p className="text-gray-900 text-lg group-hover:text-red-600 transition-colors">{brand.name}</p>
                  <p className="text-md text-gray-600">({count.toLocaleString()})</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

