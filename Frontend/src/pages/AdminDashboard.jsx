import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFilters } from '../context/FilterContext';
import { useCars, STORAGE_BASE_URL } from '../context/CarContext';
import { Plus, List, LogOut, Car, Trash2, Edit3, Image as ImageIcon, CheckCircle, Menu, X } from 'lucide-react';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { filteredCars } = useFilters();
    const { cars, addCar, updateCar, deleteCar, deleteCarImage, loading: isFetching } = useCars();
    const [activeTab, setActiveTab] = useState('list');
    const [editingCarId, setEditingCarId] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const initialFormData = {
        name: '',
        brand: '',
        year: '',
        dailyRate: '',
        bodyType: '',
        seats: '',
        doors: '',
        chassisCode: '',
        steeringSide: '',
        fuel: '',
        engine: '',
        transmission: '',
        drive: '',
        mileage: '',
        exteriorColor: '',
        interiorColor: '',
        images: [],
        existingImages: [],
        description: ''
    };


    const [formData, setFormData] = useState(initialFormData);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin/login');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    // image upload kah 
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));
        setFormData(prev => ({
            ...prev,
            images: [...prev.images, ...newImages]
        }));
    };

    const removeImage = (index) => {
        setFormData(prev => {
            const newImages = [...prev.images];
            if (newImages[index].preview) {
                URL.revokeObjectURL(newImages[index].preview);
            }
            newImages.splice(index, 1);
            return { ...prev, images: newImages };
        });
    };
    // image remove kah or han  bhaiyoooooooo images array mah hai 
    const handleRemoveExistingImage = async (id) => {
        if (window.confirm('Are you sure you want to delete this image from the server?')) {
            const success = await deleteCarImage(id);
            if (success) {
                setFormData(prev => ({
                    ...prev,
                    existingImages: prev.existingImages.filter(img => img.id !== id)
                }));
            } else {
                alert('Failed to delete image');
            }
        }
    };
    // edit kah function hai
    const handleEdit = (car) => {
        setEditingCarId(car.id);
        setFormData({
            name: car.model || car.name || '',
            brand: car.make || car.brand || '',
            year: car.year?.toString() || '',
            dailyRate: car.price || car.dailyRate || '',
            bodyType: car.body_type || car.bodyType || '',
            seats: car.seats?.toString() || '',
            doors: car.doors?.toString() || '',
            chassisCode: car.chassis_code || '',
            steeringSide: car.steering_side || '',
            fuel: car.fuel_type || car.fuel || '',
            engine: car.engine?.toString() || '',
            transmission: car.transmission || '',
            drive: car.drive || '',
            mileage: car.mileage?.toString() || '',
            exteriorColor: car.color || car.exteriorColor || '',
            interiorColor: car.trim || car.interiorColor || '',
            images: [],
            existingImages: car.images || [],
            description: car.description || ''
        });
        setActiveTab('add');
    };
    // yousufff bhaiyah janu yah main submit kah function hai 
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        console.log('Form Submission Started. Initial Data:', formData);

        const submitData = new FormData();
        // Core Details
        submitData.append('model', formData.name); // Using 'model' as per backend Car model
        submitData.append('make', formData.brand);   // Using 'make' for brand
        submitData.append('year', formData.year);
        submitData.append('price', formData.dailyRate);
        submitData.append('bodyType', formData.bodyType);

        // Technical Specs
        submitData.append('engine', formData.engine);
        submitData.append('transmission', formData.transmission);
        submitData.append('seats', formData.seats);
        submitData.append('doors', formData.doors);
        submitData.append('fuelType', formData.fuel);
        submitData.append('drive', formData.drive);
        submitData.append('chassisCode', formData.chassisCode);
        submitData.append('steeringSide', formData.steeringSide);

        // Visuals & Meta
        submitData.append('color', formData.exteriorColor);
        submitData.append('trim', formData.interiorColor);
        submitData.append('description', formData.description);
        submitData.append('isAvailable', 1); // Using 1 for true to avoid SQL casting issues
        submitData.append('mileage', formData.mileage || 0);

        // Images
        formData.images.forEach((img) => {
            submitData.append('images[]', img.file);
        });

        const result = editingCarId
            ? await updateCar(editingCarId, submitData)
            : await addCar(submitData);

        if (result.success) {
            setIsSubmitting(false);
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                setActiveTab('list');
                setEditingCarId(null);
                // Reset form
                setFormData(initialFormData);
            }, 1500);
        } else {
            alert(`Failed to ${editingCarId ? 'update' : 'register'} vehicle: ` + (result.message || 'Unknown error'));
            setIsSubmitting(false);
        }
    };
    // delete kah 
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this car?')) {
            const result = await deleteCar(id);
            if (!result.success) {
                alert('Failed to delete car');
            }
        }
    };

    return (
        <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">

            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            <aside className={`
                fixed inset-y-0 left-0 w-72 bg-slate-900 text-white flex flex-col p-6 z-50 transition-transform duration-300 lg:translate-x-0 lg:static lg:h-screen
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <Link to="/" className="flex items-center gap-3 text-2xl  mb-10 text-red-600  ">
                    <Car size={32} strokeWidth={3} />
                    <span>SI JAPAN</span>
                </Link>

                <nav className="flex flex-col gap-2 flex-1">
                    <button
                        className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-semibold ${activeTab === 'list' ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                        onClick={() => { setActiveTab('list'); setIsMobileMenuOpen(false); }}
                    >
                        <List size={20} />
                        <span>Car Listings</span>
                    </button>
                    <button
                        className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-semibold ${activeTab === 'add' ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                        onClick={() => {
                            setEditingCarId(null);
                            setFormData(initialFormData);
                            setActiveTab('add');
                            setIsMobileMenuOpen(false);
                        }}
                    >
                        <Plus size={20} />
                        <span>Add New Car</span>
                    </button>
                </nav>

                <button onClick={handleLogout} className="mt-auto flex items-center gap-3 p-4 text-red-500 border border-red-500/20 rounded-xl font-bold transition-colors hover:bg-red-500/10">
                    <LogOut size={20} />
                    <span>Logout Session</span>
                </button>
            </aside>


            <main className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto">
                <header className="bg-white px-6 lg:px-10 py-5 flex justify-between items-center border-b border-slate-200 sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button
                            className="p-2 lg:hidden text-slate-600"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu size={24} />
                        </button>
                        <h1 className="text-xl lg:text-2xl font-bold text-slate-800 tracking-tight">
                            {activeTab === 'list' ? 'Car Management' : editingCarId ? 'Update Vehicle Details' : 'Vehicle Registration'}
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-slate-500 font-medium hidden sm:inline">Admin Access</span>
                        <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold shadow-md">A</div>
                    </div>
                </header>

                <div className="p-6 lg:p-10 flex-1">
                    {activeTab === 'list' ? (
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                                <div>
                                    <h2 className="font-bold text-slate-800">Available Vehicles</h2>
                                    <p className="text-slate-500 text-sm mt-0.5">Manage your digital showroom inventory</p>
                                </div>
                                <span className="bg-red-50 text-red-600 px-4 py-1.5 rounded-full text-xs font-bold ring-1 ring-red-100">
                                    {cars.length} Records
                                </span>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50/50">
                                            <th className="p-5 text-slate-500 font-bold uppercase text-[11px] tracking-wider">Vehicle Details</th>
                                            <th className="p-5 text-slate-500 font-bold uppercase text-[11px] tracking-wider">Classification</th>
                                            <th className="p-5 text-slate-500 font-bold uppercase text-[11px] tracking-wider">Engine</th>
                                            <th className="p-5 text-slate-500 font-bold uppercase text-[11px] tracking-wider text-right">Unit Price</th>
                                            <th className="p-5 text-slate-500 font-bold uppercase text-[11px] tracking-wider text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {cars.map(car => (
                                            <tr key={car.id} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="p-5">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-20 h-14 bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center border border-slate-200/50 shadow-sm shrink-0">
                                                            {car.images && car.images.length > 0 ? (
                                                                <img src={`${STORAGE_BASE_URL}/${car.images[0].path}`} alt="" className="w-full h-full object-cover" />
                                                            ) : car.image ? (
                                                                <img src={car.image} alt="" className="w-full h-full object-cover" />
                                                            ) : (
                                                                <ImageIcon size={20} className="text-slate-400" />
                                                            )}
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-slate-800 leading-tight">
                                                                {(car.brand || car.make) && <span className="text-red-600 mr-1">{car.brand || car.make}</span>}
                                                                {car.name || car.model}
                                                            </div>
                                                            <div className="text-xs text-slate-400 font-semibold uppercase mt-0.5">{car.year} Release</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-5">
                                                    <span className="inline-block bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-xs font-bold">
                                                        {car.bodyType || car.body_type || car.type}
                                                    </span>
                                                </td>
                                                <td className="p-5 text-slate-600 font-semibold">{car.engine}cc</td>
                                                <td className="p-5 text-right">
                                                    <span className="text-slate-900  text-lg  tracking-tight">${(car.dailyRate || car.price || 0).toLocaleString()}</span>
                                                </td>
                                                <td className="p-5">
                                                    <div className="flex justify-center gap-2">
                                                        <button
                                                            className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 border border-slate-200 hover:border-blue-500 hover:text-blue-500 hover:bg-blue-50 transition-all"
                                                            onClick={() => handleEdit(car)}
                                                        >
                                                            <Edit3 size={18} />
                                                        </button>
                                                        <button
                                                            className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 border border-slate-200 hover:border-red-500 hover:text-red-500 hover:bg-red-50 transition-all"
                                                            onClick={() => handleDelete(car.id)}
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative">
                                {showSuccess && (
                                    <div className="absolute inset-0 bg-white/95 backdrop-blur-md z-40 flex items-center justify-center animate-in fade-in zoom-in duration-300">
                                        <div className="text-center p-10">
                                            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-100">
                                                <CheckCircle size={48} strokeWidth={3} />
                                            </div>
                                            <h2 className="text-3xl  text-slate-800 mb-2  tracking-tight">MISSION SUCCESSFUL!</h2>
                                            <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">Updating Showroom Database...</p>
                                        </div>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="p-8 lg:p-12">
                                    <div className="mb-12">
                                        <div className="flex items-center gap-3 mb-8">
                                            <span className="w-10 h-1 bg-red-600 rounded-full"></span>
                                            <h3 className="text-xl font-bold text-slate-800 uppercase  ">Core Details</h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs  text-slate-400 uppercase tracking-widest ml-1">Vehicle Model Name</label>
                                                <input
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-900 font-bold outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 transition-all"
                                                    placeholder="e.g. BMW M4 COMPETITION"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs  text-slate-400 uppercase tracking-widest ml-1">Car Price ($)</label>
                                                <input
                                                    name="dailyRate"
                                                    type="number"
                                                    value={formData.dailyRate}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-900 font-bold outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 transition-all"
                                                    placeholder="250"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs  text-slate-400 uppercase tracking-widest ml-1">Manufacturing Year</label>
                                                <input
                                                    name="year"
                                                    value={formData.year}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-900 font-bold outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 transition-all"
                                                    placeholder="2024"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs  text-slate-400 uppercase tracking-widest ml-1">Brand Manufacturer</label>
                                                <select
                                                    name="brand"
                                                    value={formData.brand}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-900 font-bold outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 transition-all appearance-none cursor-pointer"
                                                >
                                                    <option value="" disabled>Select Brand</option>
                                                    {['Audi', 'BMW', 'Citroën', 'Daihatsu', 'Ford', 'Hino', 'Honda', 'Hyundai', 'Isuzu', 'Jaguar', 'Jeep', 'Kia', 'Land Rover', 'Lexus', 'Mazda', 'Mercedes', 'Mitsubishi', 'Nissan', 'Peugeot', 'Subaru', 'Suzuki', 'Toyota', 'Volkswagen', 'Volvo'].map(brand => (
                                                        <option key={brand} value={brand}>{brand}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs  text-slate-400 uppercase tracking-widest ml-1">Automotive Category</label>
                                                <select
                                                    name="bodyType"
                                                    value={formData.bodyType}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-900 font-bold outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 transition-all appearance-none cursor-pointer"
                                                >
                                                    <option value="" disabled>Select Category</option>
                                                    {['Bus', 'Convertible', 'Coupe', 'Coupe/Sedan', 'Excavator', 'SUV', 'Pickup', 'Sedan', 'Hatchback', 'Station Wagon', 'Truck', 'Van', 'Mini Van'].map(type => (
                                                        <option key={type} value={type}>{type}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-12">
                                        <div className="flex items-center gap-3 mb-8">
                                            <span className="w-10 h-1 bg-red-600 rounded-full"></span>
                                            <h3 className="text-xl font-bold text-slate-800 uppercase  ">Technical Specs</h3>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs  text-slate-400 uppercase tracking-widest ml-1">Engine Size (cc)</label>
                                                <input
                                                    name="engine"
                                                    type="number"
                                                    value={formData.engine}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-900 font-bold outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 transition-all"
                                                    placeholder="3000"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs  text-slate-400 uppercase tracking-widest ml-1">Transmission</label>
                                                <select
                                                    name="transmission"
                                                    value={formData.transmission}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-900 font-bold outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 transition-all appearance-none cursor-pointer"
                                                >
                                                    <option value="" disabled>Select Transmission</option>
                                                    <option value="Automatic">Automatic</option>
                                                    <option value="Manual">Manual</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs  text-slate-400 uppercase tracking-widest ml-1">Seating Cap.</label>
                                                <input name="seats" type="number" value={formData.seats} onChange={handleInputChange} placeholder="e.g. 5" className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-900 font-bold outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 transition-all" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs  text-slate-400 uppercase tracking-widest ml-1">Total Doors</label>
                                                <input name="doors" type="number" value={formData.doors} onChange={handleInputChange} placeholder="e.g. 4" className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-900 font-bold outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 transition-all" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs  text-slate-400 uppercase tracking-widest ml-1">Fuel Selection</label>
                                                <input name="fuel" value={formData.fuel} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-900 font-bold outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 transition-all" placeholder="Petrol/Electric" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs  text-slate-400 uppercase tracking-widest ml-1">Drive System</label>
                                                <input name="drive" value={formData.drive} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-900 font-bold outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 transition-all" placeholder="AWD/RWD/4x4" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs  text-slate-400 uppercase tracking-widest ml-1">Chassis Code</label>
                                                <input name="chassisCode" value={formData.chassisCode} onChange={handleInputChange} placeholder="e.g. DBA-ANH20W" className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-900 font-bold outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 transition-all" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs  text-slate-400 uppercase tracking-widest ml-1">Mileage (km)</label>
                                                <input name="mileage" type="number" value={formData.mileage} onChange={handleInputChange} placeholder="e.g. 50000" className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-900 font-bold outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 transition-all" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs  text-slate-400 uppercase tracking-widest ml-1">Steering Side</label>
                                                <select
                                                    name="steeringSide"
                                                    value={formData.steeringSide}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-900 font-bold outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 transition-all appearance-none cursor-pointer"
                                                >
                                                    <option value="">Select Steering</option>
                                                    <option value="Right Hand Drive">Right Hand Drive</option>
                                                    <option value="Left Hand Drive">Left Hand Drive</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-10">
                                        <div className="flex items-center gap-3 mb-8">
                                            <span className="w-10 h-1 bg-red-600 rounded-full"></span>
                                            <h3 className="text-xl font-bold text-slate-800 uppercase  ">Visuals & Meta</h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs  text-slate-400 uppercase tracking-widest ml-1">Exterior Finish</label>
                                                <input name="exteriorColor" value={formData.exteriorColor} onChange={handleInputChange} placeholder="e.g. Red" className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-900 font-bold outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 transition-all" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs  text-slate-400 uppercase tracking-widest ml-1">Interior Palette</label>
                                                <input name="interiorColor" value={formData.interiorColor} onChange={handleInputChange} placeholder="e.g. Leather Black" className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-900 font-bold outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 transition-all" />
                                            </div>
                                            {/* Local Multi-Image Upload Section */}
                                            <div className="md:col-span-2 space-y-4 pt-4">
                                                <label className="text-xs  text-slate-400 uppercase tracking-widest ml-1">Vehicle Image Collection (From PC)</label>

                                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                                    {/* Existing Images */}
                                                    {formData.existingImages?.map((img) => (
                                                        <div key={img.id} className="relative aspect-[4/3] bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 group shadow-sm">
                                                            <img src={`${STORAGE_BASE_URL}/${img.path}`} alt="" className="w-full h-full object-cover" />
                                                            <button
                                                                type="button"
                                                                onClick={() => handleRemoveExistingImage(img.id)}
                                                                className="absolute top-2 right-2 w-8 h-8 bg-black/60 text-white rounded-full flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                                            >
                                                                <X size={16} />
                                                            </button>
                                                            <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                                                <span className="text-white text-[10px] font-bold uppercase tracking-widest bg-slate-900/80 px-2 py-1 rounded">Saved</span>
                                                            </div>
                                                        </div>
                                                    ))}

                                                    {/* New Images */}
                                                    {formData.images.map((img, index) => (
                                                        <div key={index} className="relative aspect-[4/3] bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 group shadow-sm">
                                                            <img src={img.preview} alt="" className="w-full h-full object-cover" />
                                                            <button
                                                                type="button"
                                                                onClick={() => removeImage(index)}
                                                                className="absolute top-2 right-2 w-8 h-8 bg-black/60 text-white rounded-full flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                                            >
                                                                <X size={16} />
                                                            </button>
                                                            {index === 0 && !formData.existingImages?.length && (
                                                                <div className="absolute bottom-0 left-0 right-0 bg-red-600/80 text-white text-[10px] py-1 text-center  uppercase tracking-widest">
                                                                    Main Cover
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}

                                                    {/* Upload Button */}
                                                    <label className="relative aspect-[4/3] bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all hover:bg-slate-100 hover:border-red-500 hover:text-red-500 group">
                                                        <Plus size={32} className="text-slate-300 group-hover:text-red-500" />
                                                        <span className="text-[10px]  uppercase tracking-widest text-slate-400 group-hover:text-red-600">Add Image</span>
                                                        <input
                                                            type="file"
                                                            multiple
                                                            accept="image/*"
                                                            onChange={handleImageUpload}
                                                            className="hidden"
                                                        />
                                                    </label>
                                                </div>
                                                <p className="text-xs text-slate-400 font-medium ">You can select multiple images at once. The first image will be used as the main cover.</p>
                                            </div>

                                            <div className="md:col-span-2 space-y-2 pt-4">
                                                <label className="text-xs  text-slate-400 uppercase tracking-widest ml-1">Exhibition Description</label>
                                                <textarea
                                                    name="description"
                                                    value={formData.description}
                                                    onChange={handleInputChange}
                                                    rows="4"
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-3xl p-6 text-slate-900 font-bold outline-none focus:ring-2 focus:ring-red-500/10 focus:border-red-500 transition-all resize-none"
                                                    placeholder="Describe the vehicle's features and history..."
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-100">
                                        <button
                                            type="button"
                                            className="px-8 py-4 rounded-2xl font-bold text-slate-400 hover:bg-slate-50 transition-colors"
                                            onClick={() => {
                                                setActiveTab('list');
                                                setEditingCarId(null);
                                                setFormData(initialFormData);
                                            }}
                                        >
                                            Discard Changes
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-10 py-4 bg-red-600 text-white rounded-2xl   tracking-tight uppercase shadow-xl shadow-red-200 hover:bg-red-700 hover:-translate-y-1 transition-all disabled:opacity-50 disabled:translate-y-0"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (editingCarId ? 'Updating...' : 'Registering...') : (editingCarId ? 'Update Vehicle' : 'Confirm Registration')}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;

