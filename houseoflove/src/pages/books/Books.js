import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Categories = [
  {
    name: 'Love',
    description: 'Express love to your fiancée in the most modest and heartfelt way',
    path: 'love',
    gradient: 'from-red-400 to-pink-600',
    emoji: '❤️',
    glowColor: 'bg-pink-200/30'
  },
  {
    name: 'Birthday',
    description: 'Make their birthday extra special with personalized messages',
    path: 'birthday',
    gradient: 'from-yellow-400 to-orange-500',
    emoji: '🎂',
    glowColor: 'bg-orange-200/30'
  },
  {
    name: 'Mom',
    description: 'Show your mother how much she means to you',
    path: 'mom',
    gradient: 'from-green-400 to-blue-500',
    emoji: '👩‍👧',
    glowColor: 'bg-blue-200/30'
  },
  {
    name: 'Dad',
    description: 'Tell your father how much you appreciate him',
    path: 'dad',
    gradient: 'from-purple-400 to-indigo-600',
    emoji: '👨‍👦',
    glowColor: 'bg-purple-200/30'
  },
  {
    name: 'Graduation',
    description: 'Celebrate their academic achievement with a custom message',
    path: 'graduation',
    gradient: 'from-pink-400 to-purple-500',
    emoji: '🎓',
    glowColor: 'bg-purple-200/30'
  },
  {
    name: 'Girly',
    description: 'Share special moments with your girlfriends',
    path: 'girly',
    gradient: 'from-teal-400 to-cyan-500',
    emoji: '👯‍♀️',
    glowColor: 'bg-cyan-200/30'
  }
];

const Books = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-16 px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#8a4fff_1px,transparent_1px)] bg-[size:16px_16px]" />
      
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto max-w-6xl"
      >
        <h1 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
          Create Your Special Book
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Categories.map((category) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              className="group relative"
            >
              <Link to={`/books/${category.path}`} className="block">
                <div className={`absolute -inset-1 ${category.glowColor} rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300`}></div>
                
                <motion.div
                  className={`relative bg-white/60 backdrop-blur-lg rounded-3xl shadow-2xl p-6 
                    border border-white/20
                    transition-all duration-300 
                    overflow-hidden`}
                >
                  <div className="text-5xl mb-4 inline-block">
                    {category.emoji}
                  </div>
                  
                  <h2 className={`text-2xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r ${category.gradient}`}>
                    {category.name}
                  </h2>
                  
                  <p className="text-gray-700 mb-5 h-14 text-sm">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center text-purple-600 font-semibold group-hover:text-purple-800 transition-colors">
                    Create Book 
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Books;