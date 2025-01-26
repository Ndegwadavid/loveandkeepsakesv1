import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBook } from '../../context/BookContext';

const BookCustomizer = () => {
  const { category, type } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 80 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [fontSize, setFontSize] = useState(30);
  const [fontColor, setFontColor] = useState('#000000');
  const [fontStyle, setFontStyle] = useState('Alphakind');

  const { getBookState, updateBookState } = useBook();
  const state = getBookState(category, type);

  const getEventCoordinates = (e) => {
    const touch = e.touches ? e.touches[0] : e;
    return {
      clientX: touch.clientX,
      clientY: touch.clientY
    };
  };

  const handleStart = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const coords = getEventCoordinates(e);

      const offsetX = coords.clientX - rect.left;
      const offsetY = coords.clientY - rect.top;

      setOffset({ x: offsetX, y: offsetY });
      setIsDragging(true);

      e.preventDefault();
    }
  };

  const handleMove = (e) => {
    if (isDragging && containerRef.current) {
      const coords = getEventCoordinates(e);
      const rect = containerRef.current.getBoundingClientRect();

      const x = ((coords.clientX - rect.left) / rect.width) * 100;
      const y = ((coords.clientY - rect.top) / rect.height) * 100;

      setPosition({
        x: Math.max(0, Math.min(100, x)),
        y: Math.max(0, Math.min(100, y))
      });

      e.preventDefault();
    }
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  const handleTextChange = (e) => {
    const newState = {
      ...state,
      texts: state.texts.map((text, idx) =>
        idx === state.currentPage ? e.target.innerText : text
      )
    };
    updateBookState(category, type, newState);
  };

  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
  };

  const handleFontColorChange = (e) => {
    setFontColor(e.target.value);
  };

  const handleFontStyleChange = (e) => {
    setFontStyle(e.target.value);
  };

  useEffect(() => {
    const container = containerRef.current;

    container.addEventListener('touchstart', handleStart, { passive: false });
    container.addEventListener('touchmove', handleMove, { passive: false });
    container.addEventListener('touchend', handleEnd, { passive: false });

    return () => {
      container.removeEventListener('touchstart', handleStart);
      container.removeEventListener('touchmove', handleMove);
      container.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging]);

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 bg-white rounded-2xl shadow-xl p-6">
            <div
              ref={containerRef}
              className="relative aspect-[3/4] border rounded-xl overflow-hidden"
              onMouseDown={handleStart}
              onMouseMove={handleMove}
              onMouseUp={handleEnd}
              onMouseLeave={handleEnd}
            >
              <img
                src={`/images/books/${category}/${type}/img${state.currentPage}.png`}
                alt="Book Page"
                loading="lazy"
                className="w-full h-full object-contain select-none"
                onContextMenu={(e) => e.preventDefault()}
                draggable="false"
              />
              <div
                contentEditable="true"
                onInput={handleTextChange}
                className={`absolute font-bold p-3 border rounded-lg cursor-move transition-all duration-300 ease-out focus:outline-pink-600`}
                style={{
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                  transform: 'translate(-50%, -50%)',
                  width: '300px',
                  minHeight: '100px',
                  background: 'white',
                  boxShadow: isDragging ? '0 0 15px rgba(0,0,0,0.2)' : 'none',
                  fontSize: `${fontSize}px`,
                  color: fontColor,
                  fontFamily: fontStyle
                }}
              >
                {state.texts[state.currentPage]}
              </div>
            </div>

            <div className="mt-8 flex justify-between items-center">
              <button
                onClick={() => {
                  const newState = {
                    ...state,
                    currentPage: Math.max(0, state.currentPage - 1)
                  };
                  updateBookState(category, type, newState);
                }}
                disabled={state.currentPage === 0}
                className="px-6 py-2 bg-pink-600 text-white rounded-lg disabled:bg-gray-400 hover:bg-pink-700 transition-colors"
              >
                Previous
              </button>
              <span className="text-xl font-semibold">
                Page {state.currentPage + 1} of 8
              </span>
              <button
                onClick={() => {
                  const newState = {
                    ...state,
                    currentPage: Math.min(7, state.currentPage + 1)
                  };
                  updateBookState(category, type, newState);
                }}
                disabled={state.currentPage === 7}
                className="px-6 py-2 bg-pink-600 text-white rounded-lg disabled:bg-gray-400 hover:bg-pink-700 transition-colors"
              >
                Next
              </button>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="font-size" className="block text-sm font-medium text-gray-700">
                  Font Size
                </label>
                <input
                  type="number"
                  id="font-size"
                  min="16"
                  max="72"
                  value={fontSize}
                  onChange={handleFontSizeChange}
                  className="w-full p-2 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div>
                <label htmlFor="font-color" className="block text-sm font-medium text-gray-700">
                  Font Color
                </label>
                <input
                  type="color"
                  id="font-color"
                  value={fontColor}
                  onChange={handleFontColorChange}
                  className="w-full h-10 p-2 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div>
                <label htmlFor="font-style" className="block text-sm font-medium text-gray-700">
                  Font Style
                </label>
                <select
                  id="font-style"
                  value={fontStyle}
                  onChange={handleFontStyleChange}
                  className="w-full p-2 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="Alphakind">Alphakind</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Arial">Arial</option>
                  <option value="Times New Roman">Times New Roman</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 h-fit sticky top-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Book Details</h2>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Category</p>
                <p className="text-lg font-semibold capitalize">{category}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Book Type</p>
                <p className="text-lg font-semibold capitalize">{type}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Total Pages</p>
                <p className="text-lg font-semibold">8</p>
              </div>
            </div>

            <button
 onClick={() => navigate(`/books/${category}/${type}/preview`, { 
   state: {
     texts: state.texts,
     styles: state.styles,
     currentPage: state.currentPage
   }
 })}
 className="w-full py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors mt-6"
>
 Preview Book
</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCustomizer;