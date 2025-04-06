"use client"

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { fetchCategories } from '../../functions/fetchCategories';
import { auth } from '../../Database/config';

const ClientOnlyProducts = dynamic(() => import('../../components/ClientOnlyProducts'), {
  ssr: false
});

const ShopPageContent = () => {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get('category');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      console.log("User:", user)
      if (!user) {
        router.push('/login')
      }
    })

    return unsubscribe
  }, [])

  useEffect(() => {
    const getCategoryName = async () => {
      if (categoryId) {
        try {
          const categories = await fetchCategories();
          const category = categories.find(cat => cat.id === categoryId);
          if (category) {
            setCategoryName(category.name);
          }
        } catch (error) {
          console.error('Error fetching category name:', error);
        }
      }
    };
    getCategoryName();
  }, [categoryId]);

  return (
    <main className="mainContent px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6">
        Shop {categoryName ? `- ${categoryName}` : ''}
      </h1>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Filter products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <ClientOnlyProducts category={categoryId} searchTerm={searchTerm} />
    </main>
  );
};

export default ShopPageContent;