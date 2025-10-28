import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import {
  TrashIcon,
  ShoppingBagIcon,
  CreditCardIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, getTotalPrice, getTotalItems } = useCart();
  const { isAuthenticated } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const handleRemoveItem = (courseId) => {
    removeFromCart(courseId);
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to remove all items from your cart?')) {
      clearCart();
    }
  };

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      // Redirect to login with return URL
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In real app, this would call payment API
      alert('Payment successful! You now have access to your courses.');
      clearCart();
      setShowCheckout(false);
    } catch (error) {
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <ShoppingBagIcon className="h-24 w-24 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Looks like you haven't added any courses to your cart yet.
            </p>
            <Link
              to="/courses"
              className="btn-primary"
            >
              Browse Courses
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {getTotalItems()} {getTotalItems() === 1 ? 'course' : 'courses'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((course) => (
              <div key={course.id} className="card">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-shrink-0">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full sm:w-32 h-20 object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      by {course.instructor}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-500 space-x-4">
                      <span>{course.duration}</span>
                      <span>{course.lessons} lessons</span>
                      <span>{course.level}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:items-end justify-between">
                    <div className="text-right mb-2">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        ${course.price}
                      </div>
                      {course.originalPrice > course.price && (
                        <div className="text-sm text-gray-500 dark:text-gray-500 line-through">
                          ${course.originalPrice}
                        </div>
                      )}
                    </div>
                    
                    <button
                      onClick={() => handleRemoveItem(course.id)}
                      className="flex items-center space-x-1 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm"
                    >
                      <TrashIcon className="h-4 w-4" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="flex justify-end">
              <button
                onClick={handleClearCart}
                className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm"
              >
                Clear all items
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Subtotal ({getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'})
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ${getTotalPrice().toFixed(2)}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Discount</span>
                  <span className="font-medium text-green-600 dark:text-green-400">
                    -$0.00
                  </span>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      ${getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {!isAuthenticated ? (
                <div className="space-y-3">
                  <Link
                    to="/login"
                    state={{ from: { pathname: '/cart' } }}
                    className="w-full btn-primary flex items-center justify-center space-x-2"
                  >
                    <LockClosedIcon className="h-5 w-5" />
                    <span>Login to Checkout</span>
                  </Link>
                  <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                    New to EduStream?{' '}
                    <Link to="/register" className="text-primary-600 hover:text-primary-500">
                      Create an account
                    </Link>
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={() => setShowCheckout(true)}
                    className="w-full btn-primary flex items-center justify-center space-x-2"
                    disabled={isProcessing}
                  >
                    <CreditCardIcon className="h-5 w-5" />
                    <span>Proceed to Checkout</span>
                  </button>
                  
                  <div className="text-xs text-gray-600 dark:text-gray-400 text-center">
                    <LockClosedIcon className="h-4 w-4 inline mr-1" />
                    Secure checkout powered by Stripe
                  </div>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Money-Back Guarantee
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Full refund within 30 days if you're not satisfied with your purchase.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Checkout Modal */}
        {showCheckout && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Complete Your Purchase
              </h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="input-field"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      CVC
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="input-field"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="input-field"
                  />
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowCheckout(false)}
                  className="flex-1 btn-secondary"
                  disabled={isProcessing}
                >
                  Cancel
                </button>
                <button
                  onClick={handleCheckout}
                  className="flex-1 btn-primary"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    `Pay $${getTotalPrice().toFixed(2)}`
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
