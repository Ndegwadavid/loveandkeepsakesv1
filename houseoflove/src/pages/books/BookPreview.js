// src/pages/books/BookPreview.js
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useBook } from '../../context/BookContext';
import { useCart } from '../../context/CartContext';

export default function BookPreview() {
 const { category, type } = useParams();
 const navigate = useNavigate();
 const [currentPage, setCurrentPage] = useState(0);
 const [isFlipping, setIsFlipping] = useState(false);
 
 const { getBookState } = useBook();
 const { addToCart } = useCart();
 const bookState = getBookState(category, type);

 const handlePageFlip = () => {
   if (isFlipping) return;
   setIsFlipping(true);
   setCurrentPage(prev => (prev + 1) % 8);
   setTimeout(() => setIsFlipping(false), 500);
 };

 const getBookTitle = () => {
   const titles = {
     birthday: {
       'female-to-male': 'Birthday Book (Female to Male)',
       'male-to-female': 'Birthday Book (Male to Female)',
       'female-to-female': 'Birthday Book (Female to Female)',
       'male-to-male': 'Birthday Book (Male to Male)'
     },
     graduation: {
       'female-to-male': 'Graduation Book (Female to Male)',
       'male-to-female': 'Graduation Book (Male to Female)',
       'female-to-female': 'Graduation Book (Female to Female)',
       'male-to-male': 'Graduation Book (Male to Male)'
     }
   };

   return titles[category]?.[type] || 'Custom Book';
 };

 return (
   <div className="min-h-screen bg-gray-50">
     <div className="container mx-auto px-4 py-8">
       <div className="relative max-w-4xl mx-auto mb-8">
         <div className="text-center text-gray-600 mb-4">Click on Book to Flip</div>
         
         <div className="relative cursor-pointer" onClick={handlePageFlip}>
         <img 
  src="/images/books/preview/preview.jpg"
  alt="Preview Background"
  className="w-full rounded-lg"
/>

           <AnimatePresence mode="wait">
             <motion.div
               key={currentPage}
               className="absolute inset-0 m-8"
               initial={{ rotateY: -90, opacity: 0 }}
               animate={{ rotateY: 0, opacity: 1 }}
               exit={{ rotateY: 90, opacity: 0 }}
               transition={{ duration: 0.5 }}
               style={{ perspective: '1000px' }}
             >
               <img 
                 src={`/images/books/${category}/${type}/img${currentPage}.png`}
                 alt={`Page ${currentPage + 1}`}
                 className="w-full h-full object-contain rounded"
               />
             </motion.div>
           </AnimatePresence>
         </div>
       </div>

       <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
         <h2 className="text-xl font-bold mb-6">Order Details</h2>
         
         <div className="space-y-4 mb-6">
           <div className="flex justify-between">
             <span>Product:</span>
             <span>{getBookTitle()}</span>
           </div>
           <div className="flex justify-between">
             <span>Total Pages:</span>
             <span>8</span>
           </div>
           <div className="flex justify-between">
             <span>Price:</span>
             <span>Kshs. 1,900.00</span>
           </div>
           <div className="flex justify-between">
             <span>Delivery:</span>
             <span>2-3 business days</span>
           </div>
         </div>

         <div className="flex gap-4">
           <button
             onClick={() => navigate(`/books/${category}/${type}/customize`)}
             className="flex-1 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
           >
             Edit Book
           </button>
           <button 
             onClick={() => addToCart({
               id: `${category}-${type}`,
               title: getBookTitle(),
               price: 1900,
               pages: bookState.texts,
               preview: `/images/books/${category}/${type}/img0.png`
             })}
             className="flex-1 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
           >
             Add to Cart
           </button>
         </div>
       </div>
     </div>
   </div>
 );
}