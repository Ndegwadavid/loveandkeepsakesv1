import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Play, Pause } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { motion } from 'framer-motion';

const products = [
  {
    id: 1,
    name: "Personalized Love Locket",
    price: 3500,
    image: "/images/love-locket.jpg",
    description: "A beautiful heart-shaped locket that can be engraved with your loved one's initials."
  },
  {
    id: 2,
    name: "Romantic Starry Night Lamp",
    price: 4200,
    image: "/images/starry-lamp.jpg",
    description: "Project a magical starry night sky in your room, perfect for romantic evenings."
  },
  {
    id: 3,
    name: "Couple's Wooden Watch Set",
    price: 7500,
    image: "/images/wooden-watches.jpg",
    description: "Elegant his and hers wooden watches, symbolizing your timeless love."
  },
  {
    id: 4,
    name: "Love Letter Blanket",
    price: 5600,
    image: "/images/letter-blanket.jpg",
    description: "A cozy blanket featuring your personalized love letter or vows."
  }
];

const Home = () => {
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, favorites } = useFavorites();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleToggleFavorite = (product) => {
    if (favorites.some(fav => fav.id === product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const toggleVideo = () => {
    setIsVideoPlaying(!isVideoPlaying);
    const video = document.getElementById('background-video');
    isVideoPlaying ? video.pause() : video.play();
  };

  useEffect(() => {
    const video = document.getElementById('background-video');
    video.addEventListener('ended', () => setIsVideoPlaying(false));
    return () => video.removeEventListener('ended', () => setIsVideoPlaying(false));
  }, []);

  return (
    <div className="bg-pink-50 min-h-screen">
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <img 
          src="/images/header-background.jpg" 
          alt="Romantic background" 
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white">
          <motion.h1 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-6xl font-bold mb-4"
          >
            House of Love and Keepsakes
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-2xl mb-8"
          >
            Celebrate Your Love with Timeless Gifts
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <Link to="/products" className="bg-white text-red-500 px-8 py-3 rounded-full font-bold hover:bg-red-100 transition duration-300 text-lg">
              Explore Our Collection
            </Link>
          </motion.div>
        </div>
        <button 
          onClick={toggleVideo}
          className="absolute bottom-10 right-10 bg-white bg-opacity-50 p-3 rounded-full hover:bg-opacity-75 transition duration-300"
        >
          {isVideoPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
      </header>

      <div className={`fixed inset-0 bg-black bg-opacity-75 ${isVideoPlaying ? 'visible' : 'invisible'} transition-opacity duration-300 z-50`}>
        <video id="background-video" className="w-full h-full object-cover" loop>
          <source src="/videos/love-story.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <main className="container mx-auto py-12 px-4">
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-center mb-8">Why Choose Our Keepsakes?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Timeless Memories', 'Thoughtful Designs', 'Perfect for Any Occasion'].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-semibold mb-4">{item}</h3>
                <p>{/* Content remains the same */}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-center mb-8">Featured Keepsakes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" />
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                <p className="text-lg font-bold text-red-500 mb-4">KSh {product.price.toLocaleString()}</p>
                <div className="flex justify-between">
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="bg-red-500 text-white px-4 py-2 rounded-full flex items-center hover:bg-red-600 transition duration-300"
                  >
                    <ShoppingCart size={16} className="mr-2" /> Add to Cart
                  </button>
                  <button 
                    onClick={() => handleToggleFavorite(product)}
                    className={`text-red-500 hover:text-red-600 transition duration-300 ${
                      favorites.some(fav => fav.id === product.id) ? 'text-red-600' : ''
                    }`}
                  >
                    <Heart size={24} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-center mb-8">Express Your Love</h2>
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-lg shadow-md text-center"
          >
            <p className="text-lg mb-6">
              Love is a beautiful journey, and our keepsakes are here to help you celebrate every step of the way. 
              From the first butterflies of a new romance to the deep, enduring love of a lifetime together, 
              we have the perfect gift to express your feelings.
            </p>
            <Link to="/products" className="bg-red-500 text-white px-6 py-3 rounded-full font-bold hover:bg-red-600 transition duration-300">
              Find Your Perfect Keepsake
            </Link>
          </motion.div>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-center mb-8">Customer Love Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { name: "Sarah & John, Nairobi", story: "The personalized star map I got for our anniversary was absolutely perfect. It's now the centerpiece of our living room and reminds us daily of our special night." },
              { name: "Michael, Mombasa", story: "I gifted my wife the Love Letter Blanket for her birthday, and she was moved to tears. It's not just a gift, it's a treasure we'll keep forever." }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <p className="italic mb-4">{testimonial.story}</p>
                <p className="font-semibold">- {testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;