import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User, Menu, X, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { cart } = useCart();
  const { favorites } = useFavorites();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const cartItemCount = cart?.length || 0;
  const favoritesCount = favorites?.length || 0;

  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const userDisplayName = user ? (user.displayName || user.email.split('@')[0]) : '';

  return (
    <nav className="bg-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Navigation Links (Desktop) */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
            <img src="/images/2.svg" alt="Houseoflove" className="h-8 w-auto" />
            <span className="text-2xl font-bold text-black-1000">House of Love</span>
          </Link>
        </div>

        {/* Navigation Links for Desktop */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/products" className="hover:text-red-500 transition duration-300">Products</Link>
          <Link to="/about" className="hover:text-red-500 transition duration-300">About</Link>
          <Link to="/contact" className="hover:text-red-500 transition duration-300">Contact</Link>
          <Link to="/books" className="hover:text-red-500 transition duration-300">Books</Link>
          {user && (
            <Link to="/orders" className="hover:text-red-500 transition duration-300">Orders</Link>
          )}
          <Link to="/cart" className="relative group hover:text-red-500 transition duration-300">
            <ShoppingCart className="w-6 h-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>
          <Link to="/favorites" className="relative group hover:text-red-500 transition duration-300">
            <Heart className="w-6 h-6" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </Link>
        </div>

        {/* Icons for Favorites and Cart (Mobile and Desktop) */}
        <div className="md:hidden flex items-center space-x-4">
          <Link to="/favorites" className="relative group hover:text-red-500 transition duration-300">
            <Heart className="w-6 h-6" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </Link>

          <Link to="/cart" className="relative group hover:text-red-500 transition duration-300">
            <ShoppingCart className="w-6 h-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>

          <button onClick={toggleMobileMenu} className="text-gray-700">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Icons and Sign In/Account Button (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">{userDisplayName}</span>
              <button onClick={handleLogout} className="flex items-center bg-[#111111] text-white px-4 py-2 rounded-[20px] hover:bg-gray-800 transition duration-300">
                <LogOut className="w-6 h-6 mr-2" />
                Sign Out
              </button>
            </div>
          ) : (
            <Link to="/auth/login" className="flex items-center bg-[#111111] text-white px-4 py-2 rounded-[20px] hover:bg-gray-800 transition duration-300">
              <User className="w-6 h-6 mr-2" />
              Sign In
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 bg-white z-40 transform transition-transform ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}
      >
        <div className="bg-gradient-to-r from-[#FEC1B8] via-[#FFA200] to-[#FFA800] h-full flex flex-col justify-center items-center space-y-6 py-6">
          <button onClick={toggleMobileMenu} className="absolute top-4 right-4">
            <X className="w-6 h-6" />
          </button>

          <Link to="/products" className="text-lg hover:text-red-500 transition duration-300" onClick={toggleMobileMenu}>Products</Link>
          <Link to="/about" className="text-lg hover:text-red-500 transition duration-300" onClick={toggleMobileMenu}>About</Link>
          <Link to="/contact" className="text-lg hover:text-red-500 transition duration-300" onClick={toggleMobileMenu}>Contact</Link>
          <Link to="/books" className="text-lg hover:text-red-500 transition duration-300" onClick={toggleMobileMenu}>Books</Link>
          {user && (
            <Link to="/orders" className="text-lg hover:text-red-500 transition duration-300" onClick={toggleMobileMenu}>Orders</Link>
          )}

          <div className="flex flex-col items-center space-y-4 mt-6">
            {user ? (
              <>
                <span className="text-gray-700">{userDisplayName}</span>
                <button onClick={handleLogout} className="flex items-center bg-[#111111] text-white px-4 py-2 rounded-[20px] hover:bg-gray-800 transition duration-300">
                  <LogOut className="w-6 h-6 mr-2" />
                  Sign Out
                </button>
              </>
            ) : (
              <Link to="/auth/login" className="flex items-center bg-[#111111] text-white px-4 py-2 rounded-[20px] hover:bg-gray-800 transition duration-300" onClick={toggleMobileMenu}>
                <User className="w-6 h-6 mr-2" />
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

