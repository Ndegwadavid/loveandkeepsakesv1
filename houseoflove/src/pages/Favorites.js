import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Favorites = () => {
  const { favorites, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();

  if (!favorites || favorites.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Your favorites list is empty</h2>
          <Link 
            to="/products" 
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Explore Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">My Favorites</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((product) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="relative">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={() => toggleFavorite(product)}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md text-red-500 hover:bg-red-50"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
              <p className="text-gray-600 mt-1">Ksh {product.price.toFixed(2)}</p>
              
              <div className="mt-4">
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;