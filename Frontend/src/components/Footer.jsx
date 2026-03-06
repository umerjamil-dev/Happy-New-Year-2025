// src/components/Footer.jsx
import React from "react";
import logo from "../assets/logofooter.png";
import { Send, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0A0A] text-white pt-20 pb-10 font-[poppins]">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Column 1: Brand & About */}
          <div className="flex flex-col space-y-3">
            <Link to="/">
              <img
                src={logo}
                alt="SI Japan Logo"
                className="h-34 w-auto object-contain hover:opacity-80  transition-opacity"
              />
            </Link>
            <div className="w-12 h-1 bg-[#FF002E] rounded-full"></div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              SI Japan is a premier trusted car dealership. We provide high-quality Japanese vehicles with a commitment to transparency, value, and exceptional service to our global clientele.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4 items-center">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#FF002E] hover:scale-110 transition-all duration-300">
                <Facebook size={18} />
              </a>
              <a href="https://www.instagram.com/siautojapan" target="_blank" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#FF002E] hover:scale-110 transition-all duration-300">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#FF002E] hover:scale-110 transition-all duration-300">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#FF002E] hover:scale-110 transition-all duration-300">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:pl-8">
            <h3 className="text-lg font-bold uppercase tracking-widest mb-8 text-white relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-[#FF002E]"></span>
            </h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li>
                <Link to="/" className="hover:text-[#FF002E] hover:translate-x-2 transition-all inline-block flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF002E]/40"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#FF002E] hover:translate-x-2 transition-all inline-block flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF002E]/40"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#FF002E] hover:translate-x-2 transition-all inline-block flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF002E]/40"></span>
                  Services
                </Link>
              </li>
              <li>
                <Link to="/browse-cars" className="hover:text-[#FF002E] hover:translate-x-2 transition-all inline-block flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF002E]/40"></span>
                  Our Inventory
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="hover:text-[#FF002E] hover:translate-x-2 transition-all inline-block flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF002E]/40"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-lg font-bold uppercase tracking-widest mb-8 text-white relative inline-block">
              Get in Touch
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-[#FF002E]"></span>
            </h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="p-3 rounded-lg bg-white/5 group-hover:bg-[#FF002E]/10 group-hover:text-[#FF002E] transition-colors">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold mb-1">Phone Number</p>
                  <p className="text-sm font-medium hover:text-[#FF002E] transition-colors cursor-pointer">+81 90-1052-1419</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="p-3 rounded-lg bg-white/5 group-hover:bg-[#FF002E]/10 group-hover:text-[#FF002E] transition-colors">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold mb-1">Email Address</p>
                  <p className="text-sm font-medium hover:text-[#FF002E] transition-colors cursor-pointer">info@siautojapan.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="p-3 rounded-lg bg-white/5 group-hover:bg-[#FF002E]/10 group-hover:text-[#FF002E] transition-colors">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold mb-1">Office Location</p>
                  <p className="text-sm font-medium leading-relaxed">NIIGATA-KEN SHIBATA-SHI<br />SASAKI 2889-1 JAPAN</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-lg font-bold uppercase tracking-widest mb-8 text-white relative inline-block">
              Newsletter
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-[#FF002E]"></span>
            </h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Subscribe to stay updated with our latest inventory arrivals and exclusive offers.
            </p>
            <div className="flex flex-col space-y-3">
              <div className="relative group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:border-[#FF002E] focus:ring-1 focus:ring-[#FF002E] transition-all placeholder:text-gray-600"
                />
                <button className="absolute right-2 top-1.5 bg-[#FF002E] hover:bg-red-700 text-white p-2 rounded-lg transition-all active:scale-95">
                  <Send size={18} />
                </button>
              </div>
              <p className="text-[10px] text-gray-500 italic">
                * We promise not to spam your inbox.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-center items-center gap-6">
          <p className="text-gray-500 text-[13px] text-center md:text-left">
            Copyright © {currentYear} <span className="text-white font-bold">SI Auto Japan</span>. All Rights Reserved.
          </p>

        </div>
      </div>
    </footer>
  );
}
