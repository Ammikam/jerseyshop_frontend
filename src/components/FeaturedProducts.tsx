"use client";

import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../functions/fetchProducts';
import ProductCard from '../components/productCard';  

interface Product {
  id: string;
  name: string;
  price: number;
  imgUrl: string;
  isFeaturedProduct: boolean;
  categoryId: string;
}

const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        const featuredProducts = fetchedProducts.filter((product: Product) => product.isFeaturedProduct);
        setProducts(featuredProducts);
        setLoading(false);
      } catch (err) {
        setError('Failed to load products');
        setLoading(false);
      }
    };
  
    loadProducts();
  }, []);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <section className="featured-products py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 container mx-auto px-4">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
};

export default FeaturedProducts;
