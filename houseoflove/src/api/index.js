import axios from 'axios';

const API_BASE_URL = 'https://api.example.com'; // Replace with your actual API URL

export const getProducts = async () => {
  const response = await axios.get(`${API_BASE_URL}/products`);
  return response.data;
};

export const getProductsByCategory = async (category) => {
  const response = await axios.get(`${API_BASE_URL}/products?category=${category}`);
  return response.data;
};

// Add more API functions as needed