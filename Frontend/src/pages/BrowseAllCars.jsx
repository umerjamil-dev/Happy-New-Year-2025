import React, { useState } from 'react';
import FilterSidebar from '../components/FilterSidebar';
import CardsSection from '../components/CardsSection';

const BrowseAllCars = () => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className='bg-gray-50 min-h-screen font-[poppins]'>
      {/* Mobile Filter Toggle Button */}
      <div className="md:hidden p-4 bg-white border-b">
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="w-full py-2 bg-gray-900 text-white rounded-lg font-bold"
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      <div className='max-w-[1440px] mx-auto flex flex-col md:flex-row items-start px-4 lg:px-10 py-6'>
        
        {/* Sidebar: Hidden on mobile unless toggled, sticky on desktop */}
        <div className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-auto md:sticky md:top-6`}>
          <FilterSidebar />
        </div>
        
        {/* Main Section */}
        <div className="flex-1 w-full">
          <CardsSection />
        </div>
      </div>
    </div>
  );
};

export default BrowseAllCars;