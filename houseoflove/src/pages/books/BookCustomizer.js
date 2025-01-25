import React, { useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBook } from '../../context/BookContext';

const fontFamilies = [
 { label: 'Fredoka One', value: 'font-fredoka' },
 { label: 'Roboto', value: 'font-roboto' },
 { label: 'Poppins', value: 'font-poppins' },
 { label: 'Montserrat', value: 'font-montserrat' },
 { label: 'Open Sans', value: 'font-opensans' }
];

const fontSizes = [
 { label: 'Medium', value: 'text-lg' },
 { label: 'Large', value: 'text-xl' },
 { label: 'Extra Large', value: 'text-2xl' },
 { label: 'Huge', value: 'text-3xl' }
];

const BookCustomizer = () => {
 const { category, type } = useParams();
 const navigate = useNavigate();
 const containerRef = useRef(null);
 const [isDragging, setIsDragging] = useState(false);
 const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
 
 const { getBookState, updateBookState } = useBook();
 const state = getBookState(category, type);

 const handleMouseDown = (e) => {
   if (e.target.tagName === 'TEXTAREA') {
     setIsDragging(true);
     const rect = containerRef.current.getBoundingClientRect();
     const x = ((e.clientX - rect.left) / rect.width) * 100;
     const y = ((e.clientY - rect.top) / rect.height) * 100;
     setDragStartPos({ x: e.clientX - x, y: e.clientY - y });
   }
 };

 const handleMouseMove = (e) => {
   if (isDragging && containerRef.current) {
     const rect = containerRef.current.getBoundingClientRect();
     const x = ((e.clientX - dragStartPos.x - rect.left) / rect.width) * 100;
     const y = ((e.clientY - dragStartPos.y - rect.top) / rect.height) * 100;

     const newState = {
       ...state,
       positions: state.positions.map((pos, idx) =>
         idx === state.currentPage ? {
           x: Math.max(0, Math.min(100, x)),
           y: Math.max(0, Math.min(100, y))
         } : pos
       )
     };
     updateBookState(category, type, newState);
   }
 };

 const handleMouseUp = () => {
   setIsDragging(false);
 };

 return (
   <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 py-8">
     <div className="container mx-auto px-4 max-w-7xl">
       <div className="flex flex-col xl:flex-row gap-8">
         <div className="xl:w-3/4">
           <div 
             ref={containerRef}
             className="relative aspect-[3/4] bg-white rounded-xl shadow-2xl overflow-hidden"
             onMouseDown={handleMouseDown}
             onMouseMove={handleMouseMove}
             onMouseUp={handleMouseUp}
             onMouseLeave={handleMouseUp}
           >
             <img
               src={`/images/books/${category}/${type}/img${state.currentPage}.png`}
               alt="Book Page"
               className="w-full h-full object-contain select-none"
               onContextMenu={(e) => e.preventDefault()}
               draggable="false"
               style={{ userSelect: 'none', pointerEvents: 'none' }}
             />
             <textarea
               value={state.texts[state.currentPage]}
               onChange={(e) => {
                 const newState = {
                   ...state,
                   texts: state.texts.map((text, idx) => 
                     idx === state.currentPage ? e.target.value : text
                   )
                 };
                 updateBookState(category, type, newState);
               }}
               className={`absolute p-4 resize-none transition-all
                 ${state.styles[state.currentPage].font}
                 ${state.styles[state.currentPage].size}
                 ${state.styles[state.currentPage].weight}
                 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
               style={{
                 left: `${state.positions[state.currentPage].x}%`,
                 top: `${state.positions[state.currentPage].y}%`,
                 transform: 'translate(-50%, -50%)',
                 width: '80%',
                 background: 'transparent',
                 border: 'none',
                 outline: 'none'
               }}
             />
           </div>

           <div className="mt-8 flex justify-between items-center max-w-xl mx-auto">
             <button
               onClick={() => {
                 const newState = {
                   ...state,
                   currentPage: Math.max(0, state.currentPage - 1)
                 };
                 updateBookState(category, type, newState);
               }}
               disabled={state.currentPage === 0}
               className="px-8 py-3 bg-pink-600 text-white text-lg font-semibold rounded-lg
                 disabled:bg-gray-400 transition-all hover:bg-pink-700"
             >
               Previous
             </button>
             <span className="text-xl font-bold">
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
               className="px-8 py-3 bg-pink-600 text-white text-lg font-semibold rounded-lg
                 disabled:bg-gray-400 transition-all hover:bg-pink-700"
             >
               Next
             </button>
           </div>
         </div>

         <div className="xl:w-1/4">
           <div className="bg-white p-8 rounded-xl shadow-xl sticky top-8">
             <h2 className="text-3xl font-bold mb-8 text-gray-800">Text Editor</h2>

             <div className="space-y-8">
               {/* Font controls */}
               <div>
                 <label className="block text-sm font-semibold text-gray-700 mb-3">
                   Font Style
                 </label>
                 <select
                   value={state.styles[state.currentPage].font}
                   onChange={(e) => {
                     const newState = {
                       ...state,
                       styles: state.styles.map((style, idx) =>
                         idx === state.currentPage
                           ? { ...style, font: e.target.value }
                           : style
                       )
                     };
                     updateBookState(category, type, newState);
                   }}
                   className="w-full p-3 border-2 rounded-lg focus:border-pink-500 
                     focus:ring-2 focus:ring-pink-200 transition-all"
                 >
                   {fontFamilies.map(font => (
                     <option key={font.value} value={font.value}>
                       {font.label}
                     </option>
                   ))}
                 </select>
               </div>

               {/* Other controls... */}
               <button
                 onClick={() => navigate(`/preview/${category}/${type}`, { state })}
                 className="w-full py-4 bg-pink-600 text-white text-lg font-semibold 
                   rounded-lg hover:bg-pink-700 transition-all shadow-lg 
                   hover:shadow-xl"
               >
                 Preview Book
               </button>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
 );
};

export default BookCustomizer;