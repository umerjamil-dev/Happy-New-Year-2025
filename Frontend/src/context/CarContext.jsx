import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
//  yousuf sarah api kah kam yha hai 
const CarContext = createContext();

export const API_BASE_URL = 'http://localhost:8000/api';
export const STORAGE_BASE_URL = 'http://localhost:8000';

export const CarProvider = ({ children }) => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCars = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/cars`);
            setCars(Array.isArray(response.data) ? response.data : []);
            setError(null);
        } catch (err) {
            console.error('Error fetching cars:', err);
            setError('Failed to fetch cars');
        } finally {
            setLoading(false);
        }
    };

    const addCar = async (formData) => {
        setLoading(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/carsstore`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.data.success) {
                setCars(prev => [response.data.data, ...prev]);
                return { success: true, data: response.data.data };
            }
            return { success: false, message: response.data.message };
        } catch (err) {
            console.error('Error adding car:', err);
            return { success: false, message: err.message };
        } finally {
            setLoading(false);
        }
    };

    const updateCar = async (id, formData) => {
        setLoading(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/cars/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.data.success) {
                setCars(prev => prev.map(car => car.id === id ? response.data.data : car));
                return { success: true, data: response.data.data };
            }
            return { success: false, message: response.data.message };
        } catch (err) {
            console.error('Error updating car:', err);
            return { success: false, message: err.message };
        } finally {
            setLoading(false);
        }
    };

    const deleteCarImage = async (imageId) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/car-image/${imageId}`);
            return response.data.success;
        } catch (err) {
            console.error('Error deleting car image:', err);
            return false;
        }
    };

    const deleteCar = async (id) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/cars/${id}`);
            if (response.data.success) {
                setCars(prev => prev.filter(car => car.id !== id));
                return { success: true };
            }
            return { success: false, message: response.data.message };
        } catch (err) {
            console.error('Error deleting car:', err);
            return { success: false, message: err.message };
        }
    };

    useEffect(() => {
        fetchCars();
    }, []);

    return (
        <CarContext.Provider value={{ cars, loading, error, fetchCars, addCar, updateCar, deleteCar, deleteCarImage }}>
            {children}
        </CarContext.Provider>
    );
};

export const useCars = () => useContext(CarContext);
