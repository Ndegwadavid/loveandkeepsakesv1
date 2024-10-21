import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleFavorite, favorites } = useFavorites();
  const [showAddedToCart, setShowAddedToCart] = useState(false);
  
  // Ensure favorites is defined before using .some()
  const isFavorite = Array.isArray(favorites) && 
    favorites.some(item => item.id === product.id);

  const handleAddToCart = () => {
    addToCart(product);
    setShowAddedToCart(true);
    setTimeout(() => setShowAddedToCart(false), 2000);
  };

  const handleToggleFavorite = () => {
    if (toggleFavorite) {
      toggleFavorite(product);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-64 object-cover transform transition-transform hover:scale-105"
        />
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleToggleFavorite}
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md"
        >
          <Heart 
            className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-500'}`}
          />
        </motion.button>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-gray-600 mt-1">${product.price.toFixed(2)}</p>
        
        <div className="mt-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2"
            disabled={showAddedToCart}
          >
            {showAddedToCart ? (
              <>
                <Check className="w-5 h-5" />
                Added to Cart
              </>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;