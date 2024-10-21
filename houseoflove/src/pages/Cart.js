import React from 'react';
import { useCart } from '../context/CartContext';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <Link 
            to="/products" 
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">Shopping Cart</h2>
      <div className="grid gap-6">
        {cart.map((item) => (
          <div 
            key={item.id} 
            className="flex items-center gap-4 bg-white p-4 rounded-lg shadow"
          >
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-24 h-24 object-cover rounded"
            />
            <div className="flex-grow">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-600">Ksh {item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-full"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-between items-center">
        <div className="text-xl font-semibold">
          Total: Ksh {getCartTotal().toFixed(2)}
        </div>
        <Link
          to="/checkout"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;