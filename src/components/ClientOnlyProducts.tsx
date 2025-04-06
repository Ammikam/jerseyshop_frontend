"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { fetchProducts } from '../functions/fetchProducts';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Product {
  id: string;
  name: string;
  price: number;
  imgUrl: string;
  categoryId: string;
}

interface ClientOnlyProductsProps {
  category: string | null;
  searchTerm: string;
}

const ProductCard = dynamic(() => import('../components/productCard'), { ssr: false });

const ClientOnlyProducts: React.FC<ClientOnlyProductsProps> = ({ category, searchTerm }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = !category || product.categoryId === category;
    const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearchTerm;
  });

  if (loading) {
    return <p className="text-center text-xl">Loading products...</p>;
  }

  if (filteredProducts.length === 0) {
    return <p className="text-center text-xl">No products found.</p>;
  }

  return (
    <>
      <ToastContainer />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default ClientOnlyProducts;