import React from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { db } from '../Database/config';


export async function fetchProducts() {
    const products: any = [];
    const productsRef = collection(db, 'Products');
  
    try {
      const querySnapshot = await getDocs(productsRef);
      querySnapshot.forEach((doc) => {
        products.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return products;
    } catch (error) {
      console.error('Error fetching Products:', error);
      throw error;
    }
  }