import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useBook } from '../../context/BookContext';
import { useCart } from '../../context/CartContext';

export default function BookPreview() {
  const { category, type } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [direction, setDirection] = useState('forward'); // 'forward' or 'backward'
  
  const { getBookState } = useBook();
  const { addToCart } = useCart();
  const bookState = getBookState(category, type);
  const TOTAL_PAGES = 8;

  const handlePageFlip = () => {
    if (isFlipping) return;

    if (!isBookOpen) {
      setIsBookOpen(true);
      return;
    }

    setIsFlipping(true);
    
    setTimeout(() => {
      if (direction === 'forward' && currentPage >= TOTAL_PAGES - 1) {
        // Reached the end, switch to backward direction
        setDirection('backward');
      } else if (direction === 'backward' && currentPage <= 0) {
        // Reached the start, switch to forward direction
        setDirection('forward');
      } else {
        // Update the page based on direction
        setCurrentPage(prev => direction === 'forward' ? prev + 1 : prev - 1);
      }
      setIsFlipping(false);
    }, 500);
  };

  const getTextStyle = (page) => ({
    fontSize: bookState.styles[page]?.fontSize || '30px',
    fontFamily: bookState.styles[page]?.fontStyle || 'Alphakind',
    color: bookState.styles[page]?.fontColor || '#000000'
  });

  // Calculate next and previous page numbers
  const nextPage = (currentPage + 1) % TOTAL_PAGES;
  const prevPage = currentPage === 0 ? TOTAL_PAGES - 1 : currentPage - 1;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-600 mb-4">
          {isBookOpen ? (
            currentPage === TOTAL_PAGES - 1 
              ? "Click to flip backward" 
              : currentPage === 0 
                ? "Click to flip forward"
                : direction === 'forward' 
                  ? "Click to continue forward" 
                  : "Click to continue backward"
          ) : (
            "Click to open book"
          )}
        </div>

        {/* Book Preview Area */}
        <div className="relative max-w-4xl mx-auto mb-8">
          {/* Board Background */}
          <img 
            src="/images/books/preview/preview.jpg"
            alt="Preview Board"
            className="w-full rounded-lg"
          />

          {/* Book Container */}
          <div className="absolute inset-0 m-8">
            {/* Base Book Layer */}
            <div className="relative w-full h-full flex perspective">
              {/* Left Page */}
              <div className="w-1/2 h-full bg-white rounded-l-lg shadow-lg overflow-hidden">
                <div className="relative w-full h-full">
                  <img 
                    src={`/images/books/${category}/${type}/img${currentPage}.png`}
                    alt={`Current Page`}
                    className="w-full h-full object-cover"
                  />
                  <div 
                    className="absolute text-center w-4/5"
                    style={{
                      left: '50%',
                      bottom: '16%',
                      transform: 'translateX(-50%)',
                      ...getTextStyle(currentPage)
                    }}
                  >
                    {bookState.texts[currentPage]}
                  </div>
                </div>
              </div>

              {/* Right Page */}
              <div className="w-1/2 h-full bg-white rounded-r-lg shadow-lg overflow-hidden">
                <div className="relative w-full h-full">
                  <img 
                    src={`/images/books/${category}/${type}/img${direction === 'forward' ? nextPage : prevPage}.png`}
                    alt={`Next Page`}
                    className="w-full h-full object-cover"
                  />
                  <div 
                    className="absolute text-center w-4/5"
                    style={{
                      left: '50%',
                      bottom: '16%',
                      transform: 'translateX(-50%)',
                      ...getTextStyle(direction === 'forward' ? nextPage : prevPage)
                    }}
                  >
                    {bookState.texts[direction === 'forward' ? nextPage : prevPage]}
                  </div>
                </div>
              </div>
            </div>

            {/* Flipping Page Layer */}
            <AnimatePresence>
              {isFlipping && (
                <motion.div
                  className="absolute inset-0 z-10"
                  initial={{ 
                    width: '50%',
                    left: direction === 'forward' ? '50%' : 0,
                    rotateY: direction === 'forward' ? 0 : 180
                  }}
                  animate={{ 
                    width: '100%',
                    left: direction === 'forward' ? 0 : '50%',
                    rotateY: direction === 'forward' ? -180 : 0,
                    transition: {
                      duration: 0.5,
                      ease: "easeInOut"
                    }
                  }}
                  exit={{ 
                    width: '50%',
                    left: direction === 'forward' ? 0 : '50%',
                    rotateY: direction === 'forward' ? -180 : 0
                  }}
                  style={{ 
                    transformOrigin: direction === 'forward' ? 'left' : 'right',
                    perspective: '2000px'
                  }}
                >
                  <div 
                    className="w-full h-full bg-white shadow-lg overflow-hidden"
                  >
                    <img 
                      src={`/images/books/${category}/${type}/img${direction === 'forward' ? currentPage : nextPage}.png`}
                      alt="Flipping Page"
                      className="w-full h-full object-cover"
                      style={{
                        transform: direction === 'forward' ? 'none' : 'scaleX(-1)'
                      }}
                    />
                    <div 
                      className="absolute text-center w-4/5"
                      style={{
                        left: '50%',
                        bottom: '16%',
                        transform: 'translateX(-50%)',
                        ...getTextStyle(direction === 'forward' ? currentPage : nextPage)
                      }}
                    >
                      {bookState.texts[direction === 'forward' ? currentPage : nextPage]}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Clickable Area */}
            {!isFlipping && (
              <div 
                className="absolute inset-0 cursor-pointer"
                onClick={handlePageFlip}
                aria-label="Flip Page"
              />
            )}
          </div>
        </div>

        {/* Order Details */}
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-6">Order Details</h2>
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between">
              <span>Product:</span>
              <span className="capitalize">{category} Book ({type})</span>
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
              onClick={() => navigate(`/books/${category}/${type}`)}
              className="flex-1 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
            >
              Edit Book
            </button>
            <button 
              onClick={() => {
                addToCart({
                  id: `${category}-${type}`,
                  name: `${category} Book (${type})`,
                  category: category,
                  image: `/images/books/${category}/${type}/img0.png`,
                  price: 1900,
                  quantity: 1,
                  customization: {
                    texts: bookState.texts,
                    styles: bookState.styles
                  }
                });
                navigate('/cart');
              }}
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