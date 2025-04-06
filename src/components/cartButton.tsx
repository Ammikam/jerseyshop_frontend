"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCart } from './cartcontext';
import { MdShoppingCart } from 'react-icons/md';
import PaymentModal from './payments';
import { useRouter } from 'next/navigation';
import { auth } from '@/Database/config';

const CartButton: React.FC = () => {
  const { cart, dispatch, isLoggedIn } = useCart();
  const [showCart, setShowCart] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const router = useRouter();

  

  const toggleCart = () => {
    if (isLoggedIn) {
      setShowCart(!showCart);
    } else {
      router.push('/login');
    }
  };

  const totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
  const totalAmount = cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);

  const handleIncreaseQuantity = (id: string) => {
    if (isLoggedIn) {
      dispatch({ type: 'INCREASE_QUANTITY', payload: id });
    } else {
      router.push('/login');
    }
  };

  const handleDecreaseQuantity = (id: string) => {
    if (isLoggedIn) {
      dispatch({ type: 'DECREASE_QUANTITY', payload: id });
    } else {
      router.push('/login');
    }
  };

  const handleRemoveFromCart = (id: string) => {
    if (isLoggedIn) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="relative">
      <button
        onClick={toggleCart}
        className="relative px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-150 ease-in-out flex items-center"
      >
        <MdShoppingCart className="mr-2 text-2xl" />
        <span>({totalItems})</span>
      </button>
      {showCart && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded shadow-lg z-50">
          <ul className="cart-items list-none p-0">
            {cart.map((item) => (
              <li key={item.id} className="cart-item flex items-center mb-4 p-4 border-b border-gray-200">
                <Image src={item.imgUrl} alt={item.name} width={40} height={40} className="w-10 h-10 object-cover rounded mr-4" />
                <div className="flex-1">
                  <h3 className="text-sm font-bold">{item.name}</h3>
                  <p className="text-gray-700 text-sm">KSH {item.price}</p>
                  <div className="flex items-center">
                    <button 
                      onClick={() => handleDecreaseQuantity(item.id)} 
                      className="text-gray-500 text-2xl mr-2"
                    >
                      -
                    </button>
                    <span className='text-black'>{item.quantity}</span>
                    <button 
                      onClick={() => handleIncreaseQuantity(item.id)} 
                      className="text-gray-500 ml-2 text-2xl "
                    >
                      +
                    </button>
                  </div>
                </div>
                <button 
                  onClick={() => handleRemoveFromCart(item.id)} 
                  className="text-red-500 text-sm ml-auto"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="p-4 border-t border-gray-200">
            <h3 className="text-lg font-bold text-black">Total Amount: KSH {totalAmount}</h3>
            <button
              onClick={() => setShowPaymentModal(true)}
              className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-150 ease-in-out mt-4"
            >
              Pay with M-Pesa
            </button>
          </div>
        </div>
      )}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        totalAmount={totalAmount}
      />
    </div>
  );
};

export default CartButton;
