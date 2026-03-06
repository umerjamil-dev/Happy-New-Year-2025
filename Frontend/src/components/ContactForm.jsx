import React, { useState } from "react";
import { Mail, Phone, Clock, CheckCircle, X } from "lucide-react";
import contactHero from "../assets/ContactImgs/contactImg.png";
import axios from "axios";
import { toast } from "react-hot-toast";

const ContactForm = () => {
  const [showModal, setShowModal] = useState(false); // Modal state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      await axios.post(
        "https://siautojapan.com/php/send_email.php",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Show the success modal
      setShowModal(true);

      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        service: "",
        message: "",
      });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="font-[poppins] bg-white relative">
      {/* SUCCESS MODAL OVERLAY */}
      {showModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 max-w-md w-full shadow-2xl relative text-center transform transition-all scale-100">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={48} strokeWidth={2.5} />
            </div>

            <h3 className="text-3xl  uppercase  text-gray-900 mb-2">Message Sent!</h3>
            <p className="text-gray-500 font-medium mb-8">
              Thank you for reaching out. Our team will get back to you within 24 hours.
            </p>

            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-[#FF002E] text-white  uppercase  py-4 rounded-xl shadow-lg shadow-red-100 hover:bg-red-700 transition-all"
            >
              Great, Thanks!
            </button>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <div
        className="relative h-[450px] bg-cover bg-center flex items-center px-6 md:px-20"
        style={{ backgroundImage: `url(${contactHero})` }}
      >
        <div className="max-w-7xl mx-auto w-full">
          <p className="text-white text-sm font-medium mb-2">Home/Contact Us</p>
          <h1 className="text-5xl md:text-7xl  text-white uppercase   mb-4">
            Contact Us
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-md font-medium leading-relaxed">
            Have Questions About Our Services Or Need Assistance With Your
            Booking? Our Team Is Here To Help You 24/7.
          </p>
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">

          {/* LEFT: CONTACT FORM */}
          <div className="lg:col-span-6 bg-gray-50 border-2 border-gray-100 rounded-[2rem] p-8 md:p-12 shadow-2xl shadow-gray-100 h-full flex flex-col">
            <h2 className="text-2xl md:text-4xl  font-semibold text-gray-900 capitalize  mb-8">
              Get In Touch Now
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-4 flex-grow flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    required
                    className="w-full p-4 bg-gray-100 rounded-xl border border-gray-100 focus:outline-none focus:border-red-500 transition-all text-sm"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                    className="w-full p-4 bg-gray-100 rounded-xl border border-gray-100 focus:outline-none focus:border-red-500 transition-all text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                    className="w-full p-4 bg-gray-100 rounded-xl border border-gray-100 focus:outline-none focus:border-red-500 transition-all text-sm"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    required
                    className="w-full p-4 bg-gray-100 rounded-xl border border-gray-100 focus:outline-none focus:border-red-500 transition-all text-sm"
                  />
                </div>

                <input
                  type="text"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  placeholder="Service Type"
                  required
                  className="w-full p-4 bg-gray-100 rounded-xl border border-gray-100 focus:outline-none focus:border-red-500 transition-all text-sm"
                />

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows="6"
                  required
                  className="w-full p-4 bg-gray-100 rounded-xl border border-gray-100 focus:outline-none focus:border-red-500 transition-all text-sm resize-none flex-grow"
                ></textarea>
              </div>
              <div className="mt-8 p-4 bg-gray-100 rounded-xl border-l-4 border-[#FF002E]">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">Service Terms & Data Protection</h4>
                <p className="text-[12px] text-gray-500 leading-relaxed italic">
                  By submitting this form, you acknowledge that SI Auto Japan will process your personal information to provide vehicle inquiries and support services. We adhere to strict data privacy standards and will never share your details with third parties for marketing purposes without your explicit consent. Please ensure all provided details are accurate to receive the best possible service from our dedicated team.
                </p>
              </div>
              <div className="flex items-start gap-3 mt-6">
                <input
                  type="checkbox"
                  id="consent"
                  required
                  className="mt-1 w-4 h-4 accent-[#FF002E] cursor-pointer"
                />
                <label htmlFor="consent" className="text-[13px] text-gray-500 font-medium cursor-pointer select-none">
                  I confirm that the information provided is accurate and I give my permission to SI Auto Japan to contact me regarding my inquiry.
                </label>
              </div>

              <button className="cursor-pointer w-full bg-[#FF002E] text-white  uppercase  py-5 rounded-xl shadow-lg shadow-red-100 hover:bg-red-700 transition-all tracking-wider mt-6">
                Get Started Now
              </button>
            </form>
          </div>

          {/* RIGHT: INFO & MAP */}
          <div className="lg:col-span-6 space-y-6 flex flex-col">
            <div>
              <p className="text-[#FF002E]  font-semibold uppercase text-xs tracking-widest mb-2 ">
                Get In Touch
              </p>
              <h2 className="text-2xl md:text-4xl  font-semibold text-gray-900 capitalize mb-4">
                Our Contact Info
              </h2>
              <p className="text-gray-500 font-medium leading-relaxed ">
                Get In Touch With Our Team For Bookings, Questions, Or Support.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-5 bg-[#FF002E] p-6 rounded-2xl shadow-xl shadow-red-100 text-white transition-transform hover:scale-[1.02]">
                <div className="bg-white p-3 rounded-full text-[#FF002E]">
                  <Mail size={24} strokeWidth={3} />
                </div>
                <div>
                  <p className=" uppercase  text-sm">Our Email</p>
                  <p className="text-xs font-medium opacity-90">info@siautojapan.com</p>
                </div>
              </div>

              <div className="flex items-center gap-5 bg-gray-50 p-6 rounded-2xl border border-gray-100 transition-transform hover:scale-[1.02]">
                <div className="bg-white p-3 rounded-full text-[#FF002E] shadow-sm">
                  <Phone size={24} strokeWidth={3} />
                </div>
                <div>
                  <p className=" uppercase  text-gray-900 text-sm">Phone</p>
                  <p className="text-xs font-bold text-gray-500">+81 90-1052-1419</p>
                </div>
              </div>

              <div className="flex items-center gap-5 bg-gray-50 p-6 rounded-2xl border border-gray-100 transition-transform hover:scale-[1.02]">
                <div className="bg-white p-3 rounded-full text-[#FF002E] shadow-sm">
                  <Clock size={24} strokeWidth={3} />
                </div>
                <div>
                  <p className=" uppercase  text-gray-900 text-sm">Schedule</p>
                  <p className="text-xs font-bold text-gray-500">Sunday-Fri: 9 AM - 6 PM</p>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-[2rem] overflow-hidden border-2 border-gray-100 shadow-sm flex-grow min-h-[350px]">
              <iframe
                title="Google Map - 2889-1 Sasaki, Shibata, Niigata, Japan"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3245.8!2d139.2409478!3d37.9478259!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5f8b347eada2bc0b%3A0x6e9f478caede8ccb!2s2889-1%20Sasaki%2C%20Shibata%2C%20Niigata%20957-0082%2C%20Japan!5e0!3m2!1sen!2sjp!4v1730000000000!5m2!1sen!2sjp"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;