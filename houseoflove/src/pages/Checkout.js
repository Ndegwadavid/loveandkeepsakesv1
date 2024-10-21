import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, MapPin, User, Phone, Mail, Home, Building, Truck, DollarSign } from 'lucide-react';

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    companyName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    paymentMethod: 'card',
    mpesaPhone: '',
    mpesaCode: '',
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutType, setCheckoutType] = useState('guest'); // New state for checkout type
  const exchangeRate = 140; // Example exchange rate from USD to KES

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (checkoutType === 'account') {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Invalid email format';
      }
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    }

    // Common validation
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';

    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber.trim()) {
        newErrors.cardNumber = 'Card number is required';
      } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Invalid card number';
      }
      if (!formData.expiryDate.trim()) {
        newErrors.expiryDate = 'Expiry date is required';
      } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
        newErrors.expiryDate = 'Invalid expiry date format (MM/YY)';
      }
      if (!formData.cvv.trim()) {
        newErrors.cvv = 'CVV is required';
      } else if (!/^\d{3,4}$/.test(formData.cvv)) {
        newErrors.cvv = 'Invalid CVV';
      }
    } else if (formData.paymentMethod === 'mpesa') {
      if (!formData.mpesaPhone.trim()) {
        newErrors.mpesaPhone = 'Mpesa phone number is required';
      }
      if (!formData.mpesaCode.trim()) {
        newErrors.mpesaCode = 'Mpesa code is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear cart and redirect to success page
      clearCart();
      navigate('/checkout/success');
    } catch (error) {
      console.error('Checkout error:', error);
      setErrors({ submit: 'Failed to process checkout. Please try again.' });
    } finally {
      setIsProcessing(false);
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const totalInKES = (getCartTotal() * exchangeRate).toFixed(2); // Convert total to KES

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="container mx-auto px-4 py-8"
    >
      <h2 className="text-3xl font-semibold mb-8 text-center">Checkout</h2>
      
      <div className="grid md:grid-cols-3 gap-8">
        {/* Checkout Type Selection */}
        <div className="md:col-span-2 mb-4">
          <h3 className="text-lg font-semibold mb-4">Checkout as:</h3>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="checkoutType"
                value="guest"
                checked={checkoutType === 'guest'}
                onChange={() => setCheckoutType('guest')}
                className="mr-2"
              />
              Guest
            </label>
            <label className="flex items-center">
  <input
    type="radio"
    name="checkoutType"
    value="account"
    checked={checkoutType === 'account'}
    onChange={() => {
      setCheckoutType('account');
      navigate('/create-account'); // Redirect to account creation
    }}
    className="mr-2"
  />
  Create Account
</label>
          </div>
        </div>

        {/* Checkout Form */}
        <motion.form 
          onSubmit={handleSubmit} 
          className="md:col-span-2 space-y-8"
          initial={{ x: -50 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          {/* Personal Information for Guest Checkout */}
          {checkoutType === 'guest' && (
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <User className="mr-2" /> Personal Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  error={errors.firstName}
                />
                <InputField
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  error={errors.lastName}
                />
                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={errors.email}
                  icon={<Mail className="w-5 h-5 text-gray-400" />}
                />
                <InputField
                  label="Phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  error={errors.phone}
                  icon={<Phone className="w-5 h-5 text-gray-400" />}
                />
              </div>
            </motion.div>
          )}

          {/* Billing Information */}
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-md"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <MapPin className="mr-2" /> Billing Information
            </h3>
            <div className="space-y-4">
              <InputField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                error={errors.address}
                icon={<Home className="w-5 h-5 text-gray-400" />}
              />
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  error={errors.city}
                />
                <InputField
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  error={errors.state}
                />
                <InputField
                  label="ZIP Code"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  error={errors.zipCode}
                />
                <InputField
                  label="Country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  error={errors.country}
                />
              </div>
              <InputField
                label="Company Name (Optional)"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                icon={<Building className="w-5 h-5 text-gray-400" />}
              />
            </div>
          </motion.div>

          {/* Payment Information */}
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-md"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <CreditCard className="mr-2" /> Payment Information
            </h3>
            <div className="space-y-4">
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Credit Card
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="mpesa"
                    checked={formData.paymentMethod === 'mpesa'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  M-Pesa
                </label>
              </div>

              {formData.paymentMethod === 'card' ? (
                <>
                  <InputField
                    label="Card Number"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    error={errors.cardNumber}
                    placeholder="1234 5678 9012 3456"
                    icon={<CreditCard className="w-5 h-5 text-gray-400" />}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      label="Expiry Date"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      error={errors.expiryDate}
                      placeholder="MM/YY"
                    />
                    <InputField
                      label="CVV"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      error={errors.cvv}
                      placeholder="123"
                    />
                  </div>
                </>
              ) : (
                <>
                  <InputField
                    label="M-Pesa Phone Number"
                    name="mpesaPhone"
                    value={formData.mpesaPhone}
                    onChange={handleInputChange}
                    error={errors.mpesaPhone}
                    placeholder="07XXXXXXXX"
                    icon={<Phone className="w-5 h-5 text-gray-400" />}
                  />
                  <div className="bg-yellow-100 p-4 rounded-md mb-4">
                    <p className="text-sm">
                      Please send <span className="font-bold">${getCartTotal().toFixed(2)}</span> to M-Pesa Till Number: <span className="font-bold">0757105412</span>
                    </p>
                  </div>
                  <InputField
                    label="M-Pesa Transaction Code"
                    name="mpesaCode"
                    value={formData.mpesaCode}
                    onChange={handleInputChange}
                    error={errors.mpesaCode}
                    placeholder="Enter M-Pesa code"
                    icon={<Truck className="w-5 h-5 text-gray-400" />}
                  />
                </>
              )}
            </div>
          </motion.div>

          {errors.submit && (
            <div className="text-red-500 text-center">{errors.submit}</div>
          )}

          <motion.button
            type="submit"
            disabled={isProcessing}
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 disabled:bg-blue-400 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <DollarSign className="mr-2" />
                Place Order
              </>
            )}
          </motion.button>
        </motion.form>

        {/* Order Summary */}
        <motion.div 
          className="md:col-span-1"
          initial={{ x: 50 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-6">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <div className="space-y-4">
              {cart.map((item) => (
                <motion.div 
                  key={item.id} 
                  className="flex justify-between"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </motion.div>
              ))}
              <motion.div 
                className="border-t pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex justify-between font-semibold text-lg">
                  <p>Total</p>
                  <p>${getCartTotal().toFixed(2)} / KES {totalInKES}</p> {/* Display total in KES */}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// InputField component for reusability
const InputField = ({ label, name, value, onChange, error, type = "text", placeholder, icon }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="relative">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full p-2 ${icon ? 'pl-10' : 'pl-3'} border rounded-md ${
          error ? 'border-red-500' : 'border-gray-300'
        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200`}
      />
    </div>
    {error && (
      <p className="text-red-500 text-sm mt-1">{error}</p>
    )}
  </div>
);

export default Checkout;
