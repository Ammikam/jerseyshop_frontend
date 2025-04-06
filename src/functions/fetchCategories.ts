import React from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { db } from '../Database/config';


interface Category {
  id: string;
  name: string;
}

export const fetchCategories = async (): Promise<Category[]> => {
    const categories: any = [];
    const categoriesRef = collection(db, 'Categories');
  
    try {
      const querySnapshot = await getDocs(categoriesRef);
      querySnapshot.forEach((doc) => {
        categories.push({
          id: doc.id,
          ...doc.data()
        });
      });
      // console.log(categories)
      return categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }