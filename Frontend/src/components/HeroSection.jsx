// src/components/HeroSection.jsx
import React from 'react';
import HeroImg from '../assets/HeroImg.png'; // your image file
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      className="relative min-h-screen custom-size-two:h-[90vh] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${HeroImg})`,
      }}
    >
      <motion.div
        className="relative z-10 container mx-auto px-6 pt-16 md:py-24 flex flex-col justify-between text-white"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >

        {/* Main text + buttons */}
        <div className="">
          <motion.h1
            className="text-3xl md:text-5xl font-semibold lg:text-6xl xl:text-7xl custom-size-two:text-8xl mb-6"
            variants={itemVariants}
          >
            Find Your Perfect <br /> Car Today
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl font-semibold text-gray-200 mb-10 max-w-2xl"
            variants={itemVariants}
          >
            Discover quality new and pre-owned vehicles at unbeatable prices. Browse by brand, body type, or budget and drive home with confidence.
          </motion.p>

          {/* Buttons row */}
          <motion.div
            className="flex flex-col sm:flex-row gap-5 text-xl"
            variants={itemVariants}
          >
            <Link to='/browse-cars'><button className='bg-primary-red text-white py-2 px-7 rounded-[7px] cursor-pointer hover:bg-red-700 transition-colors'>Browser Car</button></Link>
            <Link to='/about'><button className='bg-primary-red text-white py-2 px-7 rounded-[7px] cursor-pointer hover:bg-red-700 transition-colors'>Learn More</button></Link>
          </motion.div>
        </div>

        {/* Stats at bottom */}
        <motion.div
          className="mt-16 flex space-x-3 sm:space-x-7 text-center "
          variants={itemVariants}
        >
          <div className="group">
            <p className="text-xl md:text-4xl font-bold group-hover:text-primary-red transition-colors">500+</p>
            <p className="text-xl md:text-xl text-gray-300 mt-2">Premium Car</p>
          </div>
          <div className="group">
            <p className="text-xl md:text-4xl font-bold group-hover:text-primary-red transition-colors">50K+</p>
            <p className="text-xl md:text-xl text-gray-300 mt-2">Customers</p>
          </div>
          <div className="group">
            <p className="text-xl md:text-4xl font-bold group-hover:text-primary-red transition-colors">24/7</p>
            <p className="text-xl md:text-xl text-gray-300 mt-2">Customer Support</p>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}
