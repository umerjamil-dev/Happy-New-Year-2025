import React from "react";
import { Link } from "react-router-dom";
import { useCars, STORAGE_BASE_URL } from "../context/CarContext";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, A11y, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// Optional: import "swiper/css/autoplay";  (if using autoplay)

export default function LatestCollection() {
  const { cars } = useCars();

  const carsToShow = cars.slice(0, 15);

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="custom-padding px-4 md:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
          <h2 className="text-3xl sm:text-5xl font-semibold text-gray-900">
            Latest Collection
          </h2>
        </div>

        {/* ────────────── DESKTOP / LAPTOP ────────────── Grid (visible ≥ md) */}
        <div className="hidden md:grid grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8 font-[poppins]">
          {carsToShow.map((car) => {
            const carImage = car.images && car.images.length > 0
              ? `${STORAGE_BASE_URL}/${car.images[0].path.replace(/^\/+/, '')}`
              : car.image;
            const carName = car.name || `${car.make} ${car.model}`;

            return (
              <div
                key={car.id}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={carImage}
                    alt={carName}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-75"
                    loading="lazy"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80"></div>

                  {/* Car Name */}
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg md:text-xl font-semibold tracking-wide">
                      {carName}
                    </h3>
                    <span className="text-sm text-gray-300">
                      Japanese Used Car
                    </span>
                  </div>

                  {/* Hover button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Link
                      to={`/car/${car.id}`}
                      className="bg-white text-gray-900 font-semibold px-6 py-3 rounded-2xl shadow-lg hover:bg-red-600 hover:text-white transform translate-y-6 group-hover:translate-y-0 transition-all duration-500"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}

        </div>

        {/* ────────────── MOBILE + TABLET ────────────── Swiper Slider (visible < md) */}
        <div className="md:hidden font-[poppins]">
          <Swiper
            modules={[Pagination, Navigation, A11y, Autoplay]}
            spaceBetween={16}
            slidesPerView={1.1}           // slight peek of next slide = premium look
            centeredSlides={true}
            pagination={{ clickable: true }}
            // navigation={true}          // uncomment if you want arrows
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {                    // sm+
                slidesPerView: 2.1,
                spaceBetween: 20,
              },
              // you can add 768 or 1024 if you want different tablet feel
            }}
            className="!pb-12" // space for pagination dots
          >
            {carsToShow.map((car) => {
              const carImage = car.images && car.images.length > 0
                ? `${STORAGE_BASE_URL}/${car.images[0].path.replace(/^\/+/, '')}`
                : car.image;
              const carName = car.name || `${car.make} ${car.model}`;

              return (
                <SwiperSlide key={car.id}>
                  <div
                    className="group relative bg-white rounded-2xl overflow-hidden shadow-sm transition-all duration-500"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={carImage}
                        alt={carName}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-75"
                        loading="lazy"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80"></div>

                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-lg font-semibold tracking-wide">
                          {carName}
                        </h3>
                        <span className="text-sm text-gray-300">
                          Japanese Used Car
                        </span>
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <Link
                          to={`/car/${car.id}`}
                          className="bg-white text-gray-900 font-semibold px-6 py-3 rounded-2xl shadow-lg hover:bg-red-600 hover:text-white transform translate-y-6 group-hover:translate-y-0 transition-all duration-500 "
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        {/* ── View All Cars Button ── */}
        <div className="flex justify-center items-center mt-12">
          <Link
            to="/browse-cars"
            className="group relative inline-flex items-center justify-center gap-3 bg-black text-white font-semibold w-full max-w-xs py-4 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* shimmer sweep */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />

            {/* pulsing ring */}
            <span className="absolute inset-0 rounded-2xl ring-2 ring-white/0 group-hover:ring-white/20 group-hover:scale-105 transition-all duration-300 pointer-events-none" />

            <span className="relative z-10 tracking-widest text-xl font-[poppins]">View All Cars</span>

            {/* arrow icon */}
            <span className="relative z-10 flex items-center justify-center w-7 h-7 bg-white/15 rounded-full group-hover:bg-white/25 transition-colors duration-300">
              <svg
                className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5l6 6m0 0l-6 6m6-6H4.5" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}