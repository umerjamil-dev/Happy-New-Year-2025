import React, { createContext, useState, useContext, useMemo } from 'react';
import { useCars } from './CarContext';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const { cars: carsData } = useCars();

  const [selectedFilters, setSelectedFilters] = useState({
    type: [],
    bodyType: [],
    make: [],
    model: [],
    steering: [],
    year: [],
    seats: [],
    engine: [],
    price: 1000000,
  });
  

  const filteredCars = useMemo(() => {
    if (!carsData || !Array.isArray(carsData)) return [];
    return carsData.filter((car) => {
      const matchPrice = (car.dailyRate || car.price) <= selectedFilters.price;
      const matchType = selectedFilters.type.length === 0 || selectedFilters.type.includes(car.type);
      const matchMake = selectedFilters.make.length === 0 || selectedFilters.make.includes(car.make || car.brand);
      const matchModel = selectedFilters.model.length === 0 || selectedFilters.model.includes(car.model || car.name);
      const matchSteering = selectedFilters.steering.length === 0 || selectedFilters.steering.includes(car.drive || car.transmission); // Using drive/transmission as proxy if steering not explicit
      const matchYear = selectedFilters.year.length === 0 || selectedFilters.year.includes(car.year?.toString());

      const carBody = car.bodyType || car.body_type;
      const matchBody = selectedFilters.bodyType.length === 0 || selectedFilters.bodyType.includes(carBody);
      const matchSeats = selectedFilters.seats.length === 0 || (car.seats && selectedFilters.seats.includes(`${car.seats} Seats`));

      const matchEngine = selectedFilters.engine.length === 0 || selectedFilters.engine.some(range => {
        const val = car.engine;
        if (range === "1000 - 2000") return val >= 1000 && val <= 2000;
        if (range === "2000 - 4000") return val > 2000 && val <= 4000;
        if (range === "4000 - 6000") return val > 4000 && val <= 6000;
        if (range === "6000+") return val > 6000;
        return false;
      });

      return matchPrice && matchType && matchMake && matchModel && matchSteering && matchYear && matchBody && matchSeats && matchEngine;
    });
  }, [selectedFilters, carsData]);

  const resetFilters = () => {
    setSelectedFilters({ type: [], bodyType: [], make: [], model: [], steering: [], year: [], seats: [], engine: [], price: 1000000 });
  };

  return (
    <FilterContext.Provider value={{ selectedFilters, setSelectedFilters, filteredCars, resetFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => useContext(FilterContext);