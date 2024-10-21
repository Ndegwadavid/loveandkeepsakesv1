import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const { cart } = useCart();

  useEffect(() => {
    // If someone tries to access success page directly without checkout
    if (cart.length !== 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
        <h1 className="text-2xl font-semibold mb-4">Order Confirmed!</h1>
        <p className="text-gray-600 mb-4">
          Thank you for your purchase. We've sent you an email with your order details.
        </p>
        <p className="text-gray-600 mb-8">
          Order number: #{Math.random().toString(36).substr(2, 9).toUpperCase()}
        </p>
        
        <div className="space-y-4">
          <Link
            to="/products"
            className="inline-flex items-center justify-center w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 gap-2"
          >
            <ShoppingBag className="w-5 h-5" />
            Continue Shopping
          </Link>
          
          <Link
            to="/"
            className="inline-block w-full text-blue-600 px-6 py-3 rounded-md hover:bg-blue-50"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;