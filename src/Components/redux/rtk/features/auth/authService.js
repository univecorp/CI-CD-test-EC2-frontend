import axios from "axios";
import config from "../../../../../config/apiConfig";
// api.js
const API_URL = `${config.apiUrl}`;

// Register user
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/signup`, userData);
  if (response?.data?.access_token) {
    localStorage.setItem("token", JSON.stringify(response.data.access_token));
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  if (response.data.access_token) {
    localStorage.setItem("token", JSON.stringify(response.data.access_token));
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
