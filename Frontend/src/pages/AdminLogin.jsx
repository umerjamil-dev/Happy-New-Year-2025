import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/HeroImage.jpg';
import logo from "../assets/logofooter.png";

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Simulated delay for effect
        setTimeout(() => {
            if (email === 'admin@gmail.com' && password === 'Renexus$1') {
                localStorage.setItem('token', 'admin_mock_token_12345');
                navigate('/admin/dashboard');
            } else {
                setError('Invalid email or password. Please try again.');
                setIsLoading(false);
            }
        }, 1000);
    };

    return (
        <div
            className="flex min-h-screen items-center justify-center p-6 bg-center bg-cover relative font-['Poppins',_sans-serif]"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-slate-900/60 z-10"></div>

            <div className="relative z-20 w-full max-w-md bg-black/75 backdrop-blur-xl border border-red-500/20 rounded-[2.5rem] p-10 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="flex flex-col items-center mb-10 text-center">
                    <div className="w-20 h-20 bg-white/5 p-4 rounded-3xl mb-4 border border-white/10 backdrop-blur-sm">
                        <img src={logo} alt="SI Japan Logo" className="w-full h-full object-contain" />
                    </div>
                    <h2 className="text-3xl  text-white  font-[poppins] font-semibold uppercase">Admin Access</h2>
                    <p className="text-slate-400 font-medium text-sm mt-1">Authorized Personnel Only</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-xs  text-slate-400 uppercase tracking-widest ml-1">Control Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="admin@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white font-bold outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all placeholder:text-slate-600"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="text-xs  text-slate-400 uppercase tracking-widest ml-1">Access Pin/Pass</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white font-bold outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all placeholder:text-slate-600"
                        />
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-4 rounded-2xl text-xs  uppercase tracking-widest text-center animate-in fade-in zoom-in duration-300">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-red-600 text-white rounded-2xl p-4 text-lg    uppercase shadow-xl shadow-red-600/20 hover:bg-red-700 hover:-translate-y-1 transition-all active:translate-y-0 disabled:opacity-50 disabled:translate-y-0 mt-4"
                    >
                        {isLoading ? 'Decrypting Access...' : 'Authenticate'}
                    </button>
                </form>
            </div>

        </div>
    );
};


export default AdminLogin;

