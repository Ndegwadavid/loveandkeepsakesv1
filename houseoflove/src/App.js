import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import Navbar from './components/Navbar';
import HomePage from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Favorites from './pages/Favorites';
import Checkout from './pages/Checkout';
import CheckoutSuccess from './pages/CheckoutSuccess';
import CreateAccount from './pages/CreateAccount';
import Login from './pages/Login';

const App = () => {
  return (
    <Router>
      <CartProvider>
        <FavoritesProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<Products />} />
                <Route path="/create-account" element={<CreateAccount />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/checkout/success" element={<CheckoutSuccess />} />
              </Routes>
            </main>
          </div>
        </FavoritesProvider>
      </CartProvider>
    </Router>
  );
};

export default App;