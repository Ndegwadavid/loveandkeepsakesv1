import { useQuery } from '@tanstack/react-query';
import * as api from '../api';

export const useProducts = () => {
  return useQuery(['products'], api.getProducts);
};

export const useProductsByCategory = (category) => {
  return useQuery(['products', category], () => api.getProductsByCategory(category));
};

// Add more custom hooks as needed