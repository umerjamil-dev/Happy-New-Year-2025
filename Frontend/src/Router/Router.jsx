import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import Services from "../pages/Services";
import Contact from "../pages/Contact";
import BrowseAllCars from "../pages/BrowseAllCars";
import { FilterProvider } from "../context/FilterContext";
import { CarProvider } from "../context/CarContext";
import CarDetail from "../components/CarDetail";
import AdminLogin from "../pages/AdminLogin";
import AdminDashboard from "../pages/AdminDashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import Howitbuys from "../pages/Howitbuys";

// Inner wrapper component taaki useLocation sahi se kaam kare
const AppContent = () => {
  const { pathname } = useLocation();           // ← yahan safe hai
  const [showScroll, setShowScroll] = useState(false);

  // 1. Har route change pe top pe jaao (instant → no flicker)
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    // Agar smooth chahiye: behavior: "smooth"
  }, [pathname]);

  // 2. Floating button dikhane ka logic
  useEffect(() => {
    const checkScroll = () => {
      setShowScroll(window.scrollY > 350);
    };

    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Floating button */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 
                     w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 
                     text-white shadow-lg flex items-center justify-center 
                     transition-all duration-300 hover:scale-110 active:scale-95"
          aria-label="Scroll back to top"
          title="Back to top"
        >
          ↑
        </button>
      )}

      <Routes>
        {/* Public Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/browse-cars" element={<BrowseAllCars />} />
          <Route path="/car/:id" element={<CarDetail />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/how-to-buy" element={<Howitbuys />} />
        </Route>

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </>
  );
};

const Router = () => {
  return (
    <section>
      <BrowserRouter>
        <CarProvider>
          <FilterProvider>
            <AppContent />           {/* ← sab logic yahan shift kar diya */}
          </FilterProvider>
        </CarProvider>
      </BrowserRouter>
    </section>
  );
};

export default Router;