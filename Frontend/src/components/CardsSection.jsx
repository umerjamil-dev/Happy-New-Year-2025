import React, { useState, useEffect } from 'react';
import CarCard from './CarCard';
import { useFilters } from '../context/FilterContext';

const CardsSection = () => {
  const { filteredCars } = useFilters();
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 15;

  useEffect(() => {
    setCurrentPage(1); 
  }, [filteredCars]);

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="p-4 sm:p-6 flex-1 flex flex-col min-h-screen">
      <div className="flex-1">
        {currentCars.length > 0 ? (
          currentCars.map((car) => <CarCard key={car.id} car={car} />)
        ) : (
          <div className="text-center py-20 text-gray-500 font-bold">No cars match these filters.</div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8 mb-4">
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 border rounded-lg disabled:opacity-50">Prev</button>
          {[...Array(totalPages)].map((_, i) => (
            <button key={i} onClick={() => paginate(i + 1)} className={`w-10 h-10 rounded-lg border font-bold ${currentPage === i + 1 ? "bg-[#FF002E] text-white" : "bg-white"}`}>{i + 1}</button>
          ))}
          <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className="px-4 py-2 border rounded-lg disabled:opacity-50">Next</button>
        </div>
      )}
    </div>
  );
};

export default CardsSection;