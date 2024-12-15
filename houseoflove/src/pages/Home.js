import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Gift, Truck, CreditCard, PhoneCall } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

const products = [
  {
    id: 1,
    name: "Personalized Love Locket",
    price: 1500,
    image: "/images/love-locket.jpeg",
    description: "A beautiful heart-shaped locket that can be engraved with your loved one's initials."
  },
  {
    id: 2,
    name: "Imprinted Notebook",
    price: 800,
    image: "/images/book.jpeg",
    description: "This personalized notebook has your names imprinted on the cover, perfect for jotting down thoughts and memories together."
  },
  {
    id: 3,
    name: "Teddy Love bear",
    price: 2500,
    image: "/images/teddy.jpeg",
    description: "This love teddy bear is sure to bring a smile to your loved one's face and serve as a lasting reminder of your affection."
  },
  {
    id: 4,
    name: "Succulent Plants",
    price: 1000,
    image: "/images/plant.jpeg",
    description: "A low maintenance plant that symbolizes growth and nurturing."
  }
];

const whyChooseUs = [
  {
    icon: <Gift className="w-12 h-12 text-red-500" />,
    title: "Unique Gifts",
    description: "Handpicked selection of romantic and thoughtful gifts for your loved ones."
  },
  {
    icon: <Truck className="w-12 h-12 text-red-500" />,
    title: "Fast Delivery",
    description: "Swift and secure delivery to ensure your gifts arrive on time for every special occasion."
  },
  {
    icon: <CreditCard className="w-12 h-12 text-red-500" />,
    title: "Secure Payments",
    description: "Multiple secure payment options for your peace of mind."
  },
  {
    icon: <PhoneCall className="w-12 h-12 text-red-500" />,
    title: "24/7 Support",
    description: "Our dedicated team is always here to assist you with any queries or concerns."
  }
];

const Home = () => {
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, favorites } = useFavorites();

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

  return (
    <div className="bg-pink-50 min-h-screen">
      <header className="relative h-screen flex">
    {/* Left Section: Message and Button with Gradient Background */}
    <div className="w-3/4 bg-gradient-to-r from-[#FFB300] via-[#FFA600] to-[#FFA600] flex items-center justify-center relative">
      <div className="absolute inset-0 bg-gradient-to-r from-black opacity-30"></div> {/* Dark Gradient Overlay */}
      <div className="p-12 text-center md:text-left relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#111111] leading-tight tracking-wide drop-shadow-lg">
          Create Beautiful Memories for<br />You and Your Loved One
        </h2>
        <div className="flex justify-center md:justify-start space-x-4">
        <Link
  to="/products"
  className="bg-[#111111] text-white px-6 py-3 rounded-[20px] transition duration-300 shadow-lg"
>
  Shop Now
</Link>


        </div>
      </div>
    </div>
    
    {/* Right Section: Image */}
    <div className="w-1/2 bg-[#FFF1F1] flex items-center justify-center">
      <img
        src="/images/gift.jpeg"
        alt="Romantic couple"
        className="object-cover w-full h-full"
      />
    </div>
  </header>

      <main className="container mx-auto py-12 px-4">
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

        <section className="mb-16 py-16 bg-gradient-to-r from-pink-100 to-red-100 relative">
          <div className="absolute inset-0 bg-white bg-opacity-30 backdrop-filter backdrop-blur-sm"></div>
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-3xl font-semibold text-center mb-12 text-red-600">Why Choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyChooseUs.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white bg-opacity-80 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300 backdrop-filter backdrop-blur-sm"
                >
                  <div className="mb-4 flex justify-center">{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-red-500">{item.title}</h3>
                  <p className="text-gray-700">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;

