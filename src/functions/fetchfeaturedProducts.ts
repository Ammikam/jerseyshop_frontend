import React from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { db } from '../Database/config';


export async function fetchfeaturedProducts() {
    const featuredProducts: any = [];
    const featuredProductsRef = collection(db, 'Products');
  
    try {
      const querySnapshot = await getDocs(featuredProductsRef);
      querySnapshot.forEach((doc) => {
        featuredProducts.push({
          id: doc.id,
          ...doc.data()
        });
      });
      console.log(featuredProducts)
      return featuredProducts;
    } catch (error) {
      console.error('Error fetching Products:', error);
      throw error;
    }
  }