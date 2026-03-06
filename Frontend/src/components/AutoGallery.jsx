import React from 'react';
import { Auto1, Auto2, Auto3 } from '../assets';
import { Sparkles, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const AutoGallery = () => {
    const galleryItems = [
        {
            image: Auto1,
            title: "Premium Exporters",
            description: "Direct access to high-quality Japanese vehicles with a seamless export experience.",
            icon: <Sparkles className="w-6 h-6 text-red-600" />,
            badge: "Top Rated"
        },
        {
            image: Auto2,
            title: "Quality Assurance",
            description: "Every vehicle undergoes rigorous multi-point inspection before it leaves our yard.",
            icon: <Shield className="w-6 h-6 text-red-600" />,
            badge: "Inspected"
        },
        {
            image: Auto3,
            title: "Global Logistics",
            description: "Safe and timely delivery to your preferred destination port worldwide.",
            icon: <Zap className="w-6 h-6 text-red-600" />,
            badge: "Secure"
        }
    ];

    return (
        <section className="py-24 bg-white font-[poppins]">
            <div className="custom-padding">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="max-w-2xl">
                        <span className="text-red-500 font-bold uppercase tracking-[0.2em] text-sm mb-4 block">Visual Excellence</span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 leading-tight">
                            Showcasing Our <br /> <span className="text-red-600">Premium Collection</span>
                        </h2>
                    </div>
                    <p className="text-slate-500 text-lg max-w-sm leading-relaxed">
                        Explore the quality and variety of vehicles we handle. From luxury sedans to heavy-duty workhorses.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {galleryItems.map((item, index) => (
                        <div key={index} className="group relative bg-slate-50 rounded-[2.5rem] overflow-hidden border border-slate-100 transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)]">
                            {/* Image Container */}
                            <div className="relative h-[300px] overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="absolute top-6 left-6 px-4 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-red-600 border border-red-100">
                                    {item.badge}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 relative">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg shadow-red-100 mb-6 -mt-16 relative z-10 transition-transform duration-500 group-hover:rotate-[10deg]">
                                    {item.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-red-600 transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-slate-500 leading-relaxed">
                                    {item.description}
                                </p>

                                <div className="mt-8 pt-6 border-t border-slate-100 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                    <Link to="/browse-cars"><span className="text-red-600 font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                                        View Details <span className="w-8 h-[2px] bg-red-600"></span>
                                    </span></Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AutoGallery;
