import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFilters } from '../context/FilterContext';
import { ChevronDown, Globe, Loader2, CheckCircle2 } from 'lucide-react';
import { STORAGE_BASE_URL, API_BASE_URL } from '../context/CarContext';
import axios from 'axios';

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { filteredCars } = useFilters();
  const [selectData, setSelectData] = useState([]);

  const car = filteredCars.find(c => c.id === parseInt(id)) || filteredCars[0];
  console.log(car);
  

  const carName = car?.name || `${car?.make} ${car?.model}`;
  const carImages = car?.images && car?.images.length > 0
    ? car.images.map(img => `${STORAGE_BASE_URL}/${img.path.replace(/^\/+/, '')}`)
    : [car?.image];

  const [mainImage, setMainImage] = useState(carImages[0]);
  const thumbnails = carImages;
  const countryApi = async () => {
    try {
      const res = await axios.get('https://api.first.org/data/v1/countries');
      const dataCountry = res.data.data
      const countryKeys = Object.values(dataCountry)
      setSelectData(countryKeys.map((val) => val.country));



    } catch (error) {
      console.log('failed to fetch country api', error);

    }
  }
  useEffect(() => {
    countryApi();
  }, []);
  // Form State
  const [formData, setFormData] = useState({
    country: '',
    email: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Sync main image when car images change (crucial for refresh/loading)
  useEffect(() => {
    if (carImages.length > 0 && carImages[0]) {
      setMainImage(carImages[0]);
    }
  }, [carImages.join(',')]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.country || !formData.email || !formData.phone) return;

    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('car_name', carName);
      formDataToSend.append('car_model', car?.year);
      formDataToSend.append('car_price', car?.dailyRate || car?.price);

      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      await axios.post(
        `https://siautojapan.com/php/send_email.php`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setIsSuccess(true);
      setFormData({
        country: "",
        phone: "",
        email: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.log(error);
      alert("Something went wrong! Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!car) return <div className="p-20 text-center">Loading...</div>;

  const specData = [
    { label: "Body", value: car.body_type || car.bodyType || "Sedan" },
    { label: "Chassis Code", value: car.chassis_code || "N/A" },
    { label: "Engine", value: car.engine || "3000" },
    { label: "Year", value: car.year || "2020" },
    { label: "Mileage", value: car.mileage || "200" },
    { label: "Transmission", value: car.transmission || "Automatic" },
    { label: "Drive", value: car.drive || "4WD" },
    { label: "Steering Side", value: car.steering_side || "Right Hand Drive" },
    { label: "Fuel Type", value: car.fuel || car.fuel_type || "Hybrid" },
    { label: "Seats", value: car.seats ? `${car.seats} Seats` : "5 Seats" },
    { label: "Doors", value: car.doors ? `${car.doors} Doors` : "4 Doors" },
    { label: "Exterior Color", value: car.color || car.exteriorColor || "N/A" },
    { label: "Interior Color", value: car.trim || car.interiorColor || "N/A" },
  ];

  return (
    // Changed "custom-padding" to "flex justify-center items-center" 
    // and added "min-h-screen" to ensure it's centered on the page
    <div className="w-full min-h-screen flex justify-center items-start bg-white p-4 md:p-10 font-[poppins]">
      <div className="max-w-[1300px] w-full">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 cursor-pointer  bg-gray-200 p-3 rounded-lg text-black hover:text-black transition-colors flex items-center gap-2 font-bold uppercase  tracking-widest"
        >
          ← Back to Search
        </button>

        {/* Grid Logic: 
            lg:grid-cols-12: Total 12 columns.
            lg:col-span-7: Image takes 58% of width (prevents excessive stretching).
            lg:col-span-5: Specs take 42% of width.
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* LEFT COLUMN: IMAGES */}
          <div className="lg:col-span-7 lg:sticky lg:top-24">
            <div className="rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 mb-6 shadow-sm">
              <img
                src={mainImage}
                alt={carName}
                className="w-full h-auto max-h-[550px] object-contain transition-opacity duration-300"
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              {thumbnails.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(img)}
                  className={`rounded-xl overflow-hidden border-2 transition-all ${mainImage === img ? 'border-[#FF002E]' : 'border-transparent hover:border-gray-200'}`}
                >
                  <img src={img} alt="thumb" className="w-full aspect-video object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: INFO & SPECS */}
          <div className="lg:col-span-5">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8 ">
              <div className="flex-1  h-full items-center mt-2">
                <h1 className="text-3xl  text-[#FF002E] uppercase  font-semibold ">
                  {carName} <span className="text-gray-900">{car.year}</span>
                </h1>
               
              </div>
              <div className="bg-[#FF002E] text-white p-5 rounded-2xl text-center min-w-[150px] shadow-2xl shadow-red-200">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1 opacity-80">Car Price Without Shipping</p>
                <p className="text-3xl font-semibold  ">${car.dailyRate || car.price}</p>
              </div>
            </div>
 <p className="text-gray-800 text-[14px] leading-relaxed mt-4 font-medium my-3">
           <span className="font-bold">Description :</span>      {car.description || ` The ${carName} is a premium vehicle with exceptional performance and style.
                  Experience the ultimate driving pleasure with our curated inventory.`}
                </p>
            <h3 className="text-gray-900  uppercase  text-xl mb-6 flex items-center gap-3">
              <span className="w-8 h-[3px] bg-[#FF002E]"></span>
              Specifications
            </h3>

            <div className="space-y-1  bg-gray-100 p-2 rounded-lg">
              {specData.map((spec, idx) => (
                <div key={idx} className="flex justify-between py-3 border-b border-gray-50 items-center px-2 hover:bg-gray-50 transition-colors rounded-lg">
                  <span className="text-gray-700 font-semibold text-[14px] uppercase tracking-tight">{spec.label}</span>
                  <span className=" font-semibold  font-[poppins]  ">{spec.value}</span>
                </div>
              ))}
            </div>

            {/* TOTAL PRICE REQUEST FORM */}
            <div className="mt-10 bg-[#fff1f3] rounded-[2rem] p-8 border border-red-50/50 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-[#FF002E] p-2.5 rounded-xl rotate-3 shadow-lg shadow-red-200">
                  <Globe size={20} className="text-white" />
                </div>
                <h4 className=" uppercase  text-gray-900 tracking-tight text-xl">Get Total Price</h4>
              </div>

              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-100">
                    <CheckCircle2 size={40} className="text-white" />
                  </div>
                  <h5 className="text-2xl  text-gray-900 uppercase  mb-2">Request Sent!</h5>
                  <p className="text-gray-500 font-medium ">We will contact you with the total price shortly.</p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="mt-8 text-[#FF002E]  uppercase  text-xs tracking-widest border-b-2 border-transparent hover:border-[#FF002E] transition-all"
                  >
                    Send Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Port Selection Dropdown */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px]  text-gray-400 uppercase tracking-[0.15em] ml-1">Select Destination Country</label>
                    <div className="relative group">
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white text-gray-900 text-sm font-bold py-4 px-6 rounded-2xl border border-red-100 focus:outline-none focus:ring-2 focus:ring-[#FF002E]/20 focus:border-[#FF002E] appearance-none shadow-sm transition-all"
                      >
                        <option value="" disabled>Select Country</option>
                        {selectData.map((val, idx) => (
                          <option key={idx} value={val}>{val}</option>
                        ))}
                      </select>
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-[#FF002E] group-hover:scale-110 transition-transform">
                        <ChevronDown size={20} strokeWidth={3} />
                      </div>
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px]  text-gray-400 uppercase tracking-[0.15em] ml-1">Email Address</label>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      type="email"
                      required
                      placeholder="example@mail.com"
                      className="w-full bg-white text-gray-900 text-sm font-bold py-4 px-6 rounded-2xl border border-red-100 focus:outline-none focus:ring-2 focus:ring-[#FF002E]/20 focus:border-[#FF002E] shadow-sm transition-all placeholder:text-gray-300"
                    />
                  </div>

                  {/* Phone Number Input */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px]  text-gray-400 uppercase tracking-[0.15em] ml-1">Phone Number</label>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      type="tel"
                      required
                      placeholder="+92 300 1234567"
                      className="w-full bg-white text-gray-900 text-sm font-bold py-4 px-6 rounded-2xl border border-red-100 focus:outline-none focus:ring-2 focus:ring-[#FF002E]/20 focus:border-[#FF002E] shadow-sm transition-all placeholder:text-gray-300"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full mt-4 bg-[#FF002E] text-white text-sm  py-5 px-6 rounded-2xl flex justify-center items-center uppercase  shadow-xl shadow-red-100 transition-all tracking-widest gap-3 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'}`}
                  >
                    {isSubmitting ? (
                      <>
                        Processing...
                        <Loader2 className="w-5 h-5 animate-spin" />
                      </>
                    ) : (
                      <>
                        Request Total Price
                        <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs">→</span>
                        </div>
                      </>
                    )}
                  </button>
                </form>
              )}

              <div className="mt-8 pt-6 border-t border-red-100 text-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em]">
                  Total price includes CIF, Inspection & Customs handling
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;