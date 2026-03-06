import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import { Menu, X } from "lucide-react"; // Lucide icons
import logo from "../assets/logo.png";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <Header />
      <header className="bg-white sticky top-0 z-50 shadow-sm py-3">
        <div className="custom-padding flex h-16 items-center justify-between md:justify-between px-6 md:px-8 lg:px-10">
          {/* Logo */}
          <div className="flex items-center">
          <Link to='/'>
            <img src={logo} alt="Logo" className="h-32 w-auto object-contain" />
          </Link>
          </div>
          
            {/* Desktop navigation links */}
            <nav className="hidden lg:flex items-center gap-8 text-xl">
              <Link
                to="/"
                className=" font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/about"
                className=" font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                About Us
              </Link>
              <Link
                to="/services"
                className=" font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Services
              </Link>
              <Link
                to="/browse-cars"
                className=" font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Browse All Cars
              </Link>
              <Link
                to="/how-to-buy"
                className=" font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                How to Buy
              </Link>
              {/* <Link
                to="/contact-us"
                className=" font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Contact Us
              </Link> */}
            </nav>

            {/* Desktop Sign Up */}
            <div className="hidden lg:block">
              <Link
                to="/contact-us"
                className="bg-primary-red hover:bg-red-600 text-xl text-white px-6 py-2 h-10 rounded-md font-medium inline-flex items-center justify-center"
              >
                Contact Us
              </Link>
            </div>
          {/* Mobile Hamburger */}
          <div className="lg:hidden flex items-center">
            <button onClick={toggleSidebar} className="text-gray-700">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Sidebar (slide from left) */}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-end p-4 ">
            <button onClick={toggleSidebar} className="text-gray-700">
              <X size={28} />
            </button>
          </div>
          <nav className="flex flex-col items-start gap-6 px-6 mt-4 text-xl">
            <Link
              to="/"
              className=" font-medium text-gray-600 hover:text-gray-900 transition-colors"
              onClick={toggleSidebar}
            >
              Home
            </Link>
            <Link
              to="/about"
              className=" font-medium text-gray-600 hover:text-gray-900 transition-colors"
              onClick={toggleSidebar}
            >
              About Us
            </Link>
            <Link
              to="/services"
              className=" font-medium text-gray-600 hover:text-gray-900 transition-colors"
              onClick={toggleSidebar}
            >
              Services
            </Link>
            <Link
              to="/browse-cars"
              className=" font-medium text-gray-600 hover:text-gray-900 transition-colors"
              onClick={toggleSidebar}
            >
              Browse All Cars
            </Link>
            <Link
              to="/how-to-buy"
              className=" font-medium text-gray-600 hover:text-gray-900 transition-colors"
              onClick={toggleSidebar}
            >
              How to Buy
            </Link>
            <Link
              to="/contact-us"
              className="bg-primary-red hover:bg-red-600 text-white px-6 py-2 h-10 rounded-md font-medium inline-flex items-center justify-center mt-4"
              onClick={toggleSidebar}
            >
              Contact Us
            </Link>
          </nav>
        </div>

        {/* Overlay for mobile sidebar */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={toggleSidebar}
          ></div>
        )}
      </header>
    </>
  );
};

export default Navbar;
