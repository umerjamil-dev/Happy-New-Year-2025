import React from "react";
import { Link } from "react-router-dom";
import { STORAGE_BASE_URL } from "../context/CarContext";

const CarCard = ({ car }) => {
  const carImage = car.images && car.images.length > 0
    ? `${STORAGE_BASE_URL}/${car.images[0].path.replace(/^\/+/, '')}`
    : car.image;

  const carName = car.name || `${car.make} ${car.model}`;

  return (
    <div className="font-[poppins] bg-white border border-gray-200 rounded-xl overflow-hidden p-4 shadow-sm mb-5 hover:shadow-md transition-shadow w-full max-w-6xl mx-auto md:mx-0">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-0">
        <div className="md:col-span-5 lg:col-span-3">
          <img
            src={carImage}
            alt={carName}
            className="rounded-lg object-cover w-full h-48 md:h-full aspect-[16/10]"
          />
        </div>

        <div className="md:col-span-7 lg:col-span-9 flex flex-col lg:flex-row px-0 md:px-6 lg:px-8 justify-between items-start lg:items-center">
          <div className="flex-1 w-full lg:max-w-md">
            <h2 className="text-lg  mb-3 md:mb-4  uppercase font-[poppins] font-semibold">
              {carName}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-2 gap-x-4 lg:gap-x-8 gap-y-2 text-[13px] sm:text-[14px]">
              <p>
                <span className="text-gray-500 font-medium">Seats:</span>{" "}
                <strong>{car.seats}</strong>
              </p>
              {/* <p>
                <span className="text-gray-500 font-medium">Horsepower:</span>{" "}
                <strong>{car.power || car.horsepower || "N/A"}</strong>
              </p> */}
              <p>
                <span className="text-gray-500 font-medium">Type:</span>{" "}
                <strong>{car.body_type || car.type || "N/A"}</strong>
              </p>
              <p>
                <span className="text-gray-500 font-medium">Engine:</span>{" "}
                <strong>{car.engine}</strong>
              </p>
              <p>
                <span className="text-gray-500 font-medium">Doors:</span>{" "}
                <strong>{car.doors}</strong>
              </p>
              <p>
                <span className="text-gray-500 font-medium">Drive:</span>{" "}
                <strong>{car.drive}</strong>
              </p>
              <p>
                <span className="text-gray-500 font-medium">Fuel Type:</span>{" "}
                <strong>{car.fuel_type || "N/A"}</strong>
              </p>
              
            </div>
          </div>

          <div className="text-center w-full lg:w-auto min-w-[160px] border-t lg:border-t-0 lg:border-l border-gray-100 pt-4 lg:pt-0 lg:pl-8 mt-4 lg:mt-0 lg:ml-4">
            <p className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wider">
              Car Price Without Shipping
            </p>
            <p className="text-2xl lg:text-3xl font-semibold  mb-4 lg:mb-6 ">
              ${car.dailyRate || car.price}
            </p>
            <Link
              to={`/car/${car.id}`}
              className="bg-[#FF002E] text-white font-extrabold py-3 px-6 rounded-lg transition hover:bg-red-700 w-full shadow-lg shadow-red-100 uppercase text-sm  inline-block text-center"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
