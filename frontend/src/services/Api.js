import axios from "axios";

// Axios base instance
const API = axios.create({
  baseURL: "http://localhost:8000/api/v1", // Make sure this matches FastAPI
});

// Get all drivers
export const getDrivers = () => API.get("/drivers");

// Add a driver
export const addDriver = (driverData) => API.post("/drivers", driverData);

// ✅ Fixed: use API instance instead of axios and remove undefined API_URL
export const deleteDriver = (id) => API.delete(`/drivers/${id}`);
export const updateDriver = (id, data) => API.put(`/drivers/${id}`, data);
