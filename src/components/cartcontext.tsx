"use client"

import React, { createContext, useReducer, useContext, ReactNode, Dispatch, useEffect, useState } from 'react';
import { auth } from '../Database/config';
import { useRouter } from 'next/navigation'

export interface Product {
  id: string;
  name: string;
  price: number;
  imgUrl: string;
  categoryId: string;
  quantity?: number;
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'INCREASE_QUANTITY'; payload: string }
  | { type: 'DECREASE_QUANTITY'; payload: string }
  | { type: 'CLEAR_CART' };

interface CartContextType {
  cart: Product[];
  dispatch: Dispatch<CartAction>;
  isLoggedIn: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: Product[], action: CartAction): Product[] => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.find(item => item.id === action.payload.id);
      if (existingItem) {
        return state.map(item =>
          item.id === action.payload.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];
    }
    case 'REMOVE_FROM_CART': {
      return state.filter(item => item.id !== action.payload);
    }
    case 'INCREASE_QUANTITY': {
      return state.map(item =>
        item.id === action.payload ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      );
    }
    case 'DECREASE_QUANTITY': {
      return state.map(item =>
        item.id === action.payload && item.quantity && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    }
    case 'CLEAR_CART': {
      return [];
    }
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  

  return (
    <CartContext.Provider value={{ cart, dispatch, isLoggedIn }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};