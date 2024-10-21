import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';

const Navbar = () => {
  const { cart } = useCart();
  const { favorites } = useFavorites();

  const cartItemCount = cart?.length || 0;
  const favoritesCount = favorites?.length || 0;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link 
            to="/" 
            className="flex items-center space-x-2 hover:opacity-90 transition-opacity"
          >
            <img 
              src="/images/logo.svg" 
              alt="HOuseoflove" 
              className="h-8 w-auto"
            />
            <span className="text-xl font-bold text-gray-800"></span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link 
              to="/products" 
              className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              Products
            </Link>

            <Link 
              to="/favorites" 
              className="relative group"
            >
              <div className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
                <Heart className="h-6 w-6 text-gray-600 group-hover:text-red-500 transition-colors duration-200" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {favoritesCount}
                  </span>
                )}
              </div>
            </Link>

            <Link 
              to="/cart" 
              className="relative group"
            >
              <div className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
                <ShoppingCart className="h-6 w-6 text-gray-600 group-hover:text-blue-500 transition-colors duration-200" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;