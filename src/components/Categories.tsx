"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchCategories } from '../functions/fetchCategories';
import { fetchProducts } from '../functions/fetchProducts';

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  imgUrl: string;
  categoryId: string;
}

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
        setLoading(false);
      } catch (err) {
        setError('Failed to load categories');
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const handleCategoryClick = async (categoryId: string) => {
    try {
      const products = await fetchProducts();
      const filteredProducts = products.filter((product: Product) => product.categoryId === categoryId);
      console.log("Filtered Products:", filteredProducts);
      
      // Store filtered products in localStorage or a global state management solution
      localStorage.setItem('filteredProducts', JSON.stringify(filteredProducts));
      
      // Navigate to the shop page with the category ID as a query parameter
      router.push(`/shop?category=${encodeURIComponent(categoryId)}`);
    } catch (err) {
      console.error('Error filtering products:', err);
    }
  };

  if (loading) return <div>Loading categories...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="categories py-8 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-6">Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 container mx-auto px-4">
        {categories.map((category) => (
          <button 
            key={category.id} 
            onClick={() => handleCategoryClick(category.id)}
            className="bg-white p-4 rounded shadow-md text-center hover:bg-gray-50 transition-colors"
          >
            {category.name}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Categories;