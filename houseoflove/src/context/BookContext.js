import React, { createContext, useContext, useState, useEffect } from 'react';

const BookContext = createContext(undefined);

const defaultTexts = {
 'love/male-to-female': [
   "To my dearest love...",
   "Every time I look at you, my heart skips a beat...",
   "Your smile brightens even my darkest days...",
   "You're the missing piece to my puzzle...",
   "Our love story is my favorite fairytale...",
   "Forever isn't long enough with you...",
   "You make my heart complete...",
   "Eternally yours, with all my love..."
 ]
};

const defaultStyle = {
 font: 'font-fredoka',
 size: 'text-2xl',
 weight: 'font-bold'
};

const initialBookState = (category, type) => ({
 currentPage: 0,
 texts: defaultTexts[`${category}/${type}`] || Array(8).fill('Add your message here...'),
 positions: Array(8).fill({ x: 50, y: 50 }),
 styles: Array(8).fill(defaultStyle)
});

export function BookProvider({ children }) {
 const [bookState, setBookState] = useState(() => {
   const savedState = localStorage.getItem('bookState');
   return savedState ? JSON.parse(savedState) : {};
 });

 useEffect(() => {
   localStorage.setItem('bookState', JSON.stringify(bookState));
 }, [bookState]);

 const updateBookState = (category, type, newState) => {
   setBookState(prev => ({
     ...prev,
     [`${category}/${type}`]: newState
   }));
 };

 const getBookState = (category, type) => {
   const savedState = bookState[`${category}/${type}`];
   return savedState || initialBookState(category, type);
 };

 return (
   <BookContext.Provider value={{ bookState, updateBookState, getBookState }}>
     {children}
   </BookContext.Provider>
 );
}

export function useBook() {
 const context = useContext(BookContext);
 if (context === undefined) {
   throw new Error('useBook must be used within a BookProvider');
 }
 return context;
}