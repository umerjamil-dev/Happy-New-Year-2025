import React, { useMemo } from 'react';
import { useFilters } from '../context/FilterContext';
import { useCars } from '../context/CarContext';

const FilterGroup = ({ title, options, filterKey }) => {
  const { selectedFilters, setSelectedFilters } = useFilters();

  const handleCheckboxChange = (option) => {
    setSelectedFilters((prev) => {
      const currentList = prev[filterKey];
      const newList = currentList.includes(option)
        ? currentList.filter((item) => item !== option)
        : [...currentList, option];
      return { ...prev, [filterKey]: newList };
    });
  };

  if (options.length === 0) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 mb-4 shadow-sm">
      <h3 className="text-md  mb-4 text-gray-900 uppercase  border-b border-gray-100 pb-2">
        {title}
      </h3>
      <ul className="space-y-3">
        {options.map((option) => (
          <li key={option} className="flex items-center gap-3 text-gray-600 font-medium cursor-pointer group">
            <input
              type="checkbox"
              className="w-4 h-4 accent-[#FF002E] cursor-pointer"
              checked={selectedFilters[filterKey].includes(option)}
              onChange={() => handleCheckboxChange(option)}
            />
            <span className="text-[14px] group-hover:text-red-500 transition-colors">{option}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const FilterSidebar = () => {
  const { selectedFilters, setSelectedFilters, resetFilters } = useFilters();
  const { cars: carsData } = useCars();

  const dynamicOptions = useMemo(() => {
    if (!carsData || !Array.isArray(carsData)) return { makes: [], models: [], years: [], bodyTypes: [] };

    const makesSet = new Set();
    const modelsSet = new Set();
    const yearsSet = new Set();
    const bodyTypesSet = new Set();

    carsData.forEach(car => {
      if (car.make || car.brand) makesSet.add(car.make || car.brand);
      if (car.model || car.name) modelsSet.add(car.model || car.name);
      if (car.year) yearsSet.add(car.year.toString());
      if (car.bodyType || car.body_type) bodyTypesSet.add(car.bodyType || car.body_type);
    });

    return {
      makes: Array.from(makesSet).sort(),
      models: Array.from(modelsSet).sort(),
      years: Array.from(yearsSet).sort((a, b) => b - a), // Sort years descending
      bodyTypes: Array.from(bodyTypesSet).sort()
    };
  }, [carsData]);

  return (
    <aside className="w-72 h-[calc(100vh-2rem)] sticky top-4 p-2 overflow-y-auto custom-scrollbar font-[poppins]">
      <div className="pr-2">
        <div className="mb-6 flex justify-between items-center px-1">
          <h2 className="text-2xl  text-gray-900 uppercase ">Filters</h2>
          <button onClick={resetFilters} className="text-[10px] font-bold text-red-500 uppercase hover:underline">
            Reset All
          </button>
        </div>

        <FilterGroup title="Vehicle Brand" filterKey="make" options={dynamicOptions.makes} />
        <FilterGroup title="Vehicle Model" filterKey="model" options={dynamicOptions.models} />
        <FilterGroup title="Model Year" filterKey="year" options={dynamicOptions.years} />
        <FilterGroup title="Vehicle Type" filterKey="type" options={["Car", "Van", "Minibus", "Prestige"]} />
        <FilterGroup title="Car Body Type" filterKey="bodyType" options={dynamicOptions.bodyTypes} />
        <FilterGroup title="Car Seats" filterKey="seats" options={["2 Seats", "4 Seats", "5 Seats", "6 Seats", "6+ Seats"]} />
        <FilterGroup title="Engine Capacity (Cc)" filterKey="engine" options={["1000 - 2000", "2000 - 4000", "4000 - 6000", "6000+"]} />

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-4">
          <h3 className="text-md  mb-4 text-gray-900 uppercase ">Price ($)</h3>
          <div className="flex justify-between text-[10px] font-bold text-gray-400 mb-2">
            <span>MIN $0</span>
            <span className="text-[#FF002E]">MAX ${selectedFilters.price}</span>
          </div>
          <input
            type="range" min="0" max="5000" step="100" value={selectedFilters.price}
            onChange={(e) => setSelectedFilters(prev => ({ ...prev, price: parseInt(e.target.value) }))}
            className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#FF002E]"
          />
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;