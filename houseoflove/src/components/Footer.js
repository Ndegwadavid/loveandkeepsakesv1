// src/components/Footer.js

import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-pink-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Houseoflove</h3>
            <p className="mb-4">Your one-stop shop for all things beautiful and unique.</p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="hover:text-pink-500"><Facebook /></a>
              <a href="https://instagram.com" className="hover:text-pink-500"><Instagram /></a>
              <a href="https://twitter.com" className="hover:text-pink-500"><Twitter /></a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-pink-500">Home</Link></li>
              <li><Link to="/products" className="hover:text-pink-500">Products</Link></li>
              <li><Link to="/favorites" className="hover:text-pink-500">Favorites</Link></li>
              <li><Link to="/cart" className="hover:text-pink-500">Cart</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p>00100 Nairobi Moi Avenue</p>
            <p>Phone: (=254) 715840641</p>
            <p>Email: info@houseoflove.com</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; 2023 Houseoflove. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;