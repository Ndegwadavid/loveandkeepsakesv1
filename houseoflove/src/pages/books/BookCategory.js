import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookHeart, 
  Gift, 
  Globe, 
  GraduationCap, 
  Heart, 
  Star,
  Users,
  Home 
} from 'lucide-react';

const iconMap = {
  love: BookHeart,
  birthday: Gift,
  girly: Globe,
  mom: Heart,
  dad: Home,
  graduation: GraduationCap
};

const categoryData = {
  love: {
    title: "Love Books",
    subtitle: "Express your love in the most beautiful way",
    types: [
      { 
        name: "Female to Male", 
        path: "female-to-male",
        description: "Tell him how much he means to you",
        coverImage: "/images/books/love/female-to-male/img0.png"
      },
      { 
        name: "Male to Female",
        path: "male-to-female",
        coverImage: "/images/books/love/male-to-female/img0.png"
      },
    ]
  },
  birthday: {
    title: "Birthday Books",
    subtitle: "Make their special day memorable",
    types: [
      {
        name: "Male to Female",
        path: "male-to-female",
        description: "Make her birthday extra special"
      },
      {
        name: "Female to Male",
        path: "female-to-male",
        description: "Give him a birthday surprise he'll never forget"
      },
      {
        name: "Female to Female",
        path: "female-to-female",
        description: "Share birthday wishes with your girlfriend"
      },
      {
        name: "Male to Male",
        path: "male-to-male",
        description: "Celebrate his birthday in style"
      }
    ]
  },
  girly: {
    title: "Girly Books",
    subtitle: "Share special moments with your girlfriends",
    coverImage: "/images/books/love/female-to-male/img0.png",
    types: [
      {
        name: "Female to Female",
        path: "female-to-female",
        description: "Express your friendship in a unique way"
      }
    ]
  },
  mom: {
    title: "Mom Books", 
    subtitle: "Show mom how much you care",
    description: "Create a heartfelt book for your mother",
    types: [
      {
        name: "Son to Mom",
        path: "son-to-mom",
        description: "Tell your mom how much she means to you"
      },
      {
        name: "Daughter to Mom",
        path: "daughter-to-mom",
        description: "Share your love with your mother"
      }
    ]
  },
  dad: {
    title: "Dad Books",
    subtitle: "Show dad your appreciation",
    description: "Create a meaningful book for your father",
    types: [
      {
        name: "Son to Dad",
        path: "son-to-dad",
        description: "Tell your dad how much you appreciate him"
      },
      {
        name: "Daughter to Dad",
        path: "daughter-to-dad",
        description: "Share your love with your father"
      }
    ]
  },
  graduation: {
    title: "Graduation Books",
    subtitle: "Celebrate their achievement",
    description: "Create a special graduation memory book",
    types: [
      {
        name: "Male to Female",
        path: "male-to-female",
        description: "Congratulate her on this milestone"
      },
      {
        name: "Female to Male",
        path: "female-to-male",
        description: "Celebrate his academic success"
      },
      {
        name: "Female to Female",
        path: "female-to-female",
        description: "Share in her graduation joy"
      },
      {
        name: "Male to Male",
        path: "male-to-male",
        description: "Celebrate his achievement"
      }
    ]
  }
};

const BookCategory = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const data = categoryData[category];
  const [hoveredType, setHoveredType] = useState(null);

  if (!data) {
    navigate('/books');
    return null;
  }

  const CategoryIcon = iconMap[category] || Star;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#8a4fff_1px,transparent_1px)] bg-[size:16px_16px]" />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <CategoryIcon 
              className="mr-4 text-purple-600" 
              size={48} 
              strokeWidth={1.5}
            />
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              {data.title}
            </h1>
          </div>
          <p className="text-xl text-gray-600 mb-2 font-light">{data.subtitle}</p>
          <p className="text-gray-500 max-w-2xl mx-auto">{data.description}</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.types.map((type) => (
            <Link
              key={type.path}
              to={`/books/${category}/${type.path}`}
              onMouseEnter={() => setHoveredType(type.path)}
              onMouseLeave={() => setHoveredType(null)}
              className="group"
            >
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white rounded-2xl shadow-[0_15px_30px_-10px_rgba(0,0,0,0.1)] 
                  border border-gray-100 
                  transition-all duration-300 
                  hover:shadow-[0_25px_50px_-15px_rgba(124,58,237,0.2)]
                  transform hover:-translate-y-2
                  relative overflow-hidden"
              >
                <div className="aspect-[3/4] w-full relative">
                  <img
                    src={type.coverImage || `/images/books/${category}/${type.path}/img0.png`}
                    alt={type.name}
                    className={`w-full h-full object-cover 
                      transition-all duration-500 
                      ${hoveredType === type.path ? 'blur-[2px] scale-110' : ''}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                </div>
                <div className="p-6 relative z-10">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2 
                    bg-clip-text text-transparent 
                    bg-gradient-to-r from-purple-600 to-pink-600">
                    {type.name}
                  </h3>
                  <p className="text-gray-600 font-light">{type.description}</p>
                </div>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 
                  transition-opacity duration-300">
                  <div className="bg-purple-500 text-white rounded-full p-2 shadow-lg">
                    <Star size={20} />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookCategory;