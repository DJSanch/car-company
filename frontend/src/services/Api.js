import axios from "axios";

// Use environment variable to support both local & deployed backend
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8000/api/v1",
});

// Get all drivers
export const getDrivers = () => API.get("/drivers");

// Add a driver
export const addDriver = (driverData) => API.post("/drivers", driverData);

// Delete a driver
export const deleteDriver = (id) => API.delete(`/drivers/${id}`);

// Update a driver
export const updateDriver = (id, data) => API.put(`/drivers/${id}`, data);
