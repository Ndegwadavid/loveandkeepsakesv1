import React from 'react';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Favorites from './pages/Favorites';
import Checkout from './pages/Checkout';
import CheckoutSuccess from './pages/CheckoutSuccess';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
// new books routes
import Books from './pages/books/Books';
import BookCategory from './pages/books/BookCategory';
import BookCustomizer from './pages/books/BookCustomizer';
// book customizer context
import { BookProvider } from './context/BookContext';


const App = () => {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <FavoritesProvider>
          <BookProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<Products />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Register />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/checkout/success" element={<CheckoutSuccess />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/books" element={<Books />} />
                <Route path="/books/:category" element={<BookCategory />} />
                <Route path="/books/:category/:type" element={<BookCustomizer />} />
              </Routes>
            </Layout>
            </BookProvider>
          </FavoritesProvider>
        </CartProvider>
      </AuthProvider>
      <SpeedInsights />
    </Router>
  );
};

export default App;