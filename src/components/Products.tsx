"use client"

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { fetchProducts } from '../functions/fetchProducts';
import { useCart } from './cartcontext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Product {
  id: string;
  name: string;
  price: number;
  imgUrl: string;
  categoryId: string;
}

interface ProductsProps {
  category: string | null;
}

const Products: React.FC<ProductsProps> = ({ category }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { dispatch } = useCart();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
        setLoading(false);
      } catch (err) {
        setError('Failed to load products');
        setLoading(false);
      }
    };

    loadProducts();
  }, []);
                                                        
  useEffect(() => {
    let filtered = products;
    
    if (category) {
      filtered = filtered.filter(product => product.categoryId === category);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredProducts(filtered);
  }, [category, searchTerm, products]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const addToCart = (product: Product) => {
    if (dispatch) {
      dispatch({ type: 'ADD_TO_CART', payload: product });
      toast.success(`${product.name} added to cart!`);
    } else {
      console.error('Dispatch function is not available');
    }
  };

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <ToastContainer />
      <section className="featured-products py-6">
        <div className="flex flex-row items-center justify-between mb-6">
          <h2 className="font-bold text-2xl">
            {category ? `Products in ${category}` : 'All Products'}
          </h2>
          <div className="search-bar-container">
            <input
              type="text" 
              placeholder='Search Jersey...'
              value={searchTerm}
              onChange={handleSearch}
              className="w-full max-w-md px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card flex flex-col border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="relative w-full pb-[85%]">
                <Image 
                  src={product.imgUrl} 
                  alt={product.name} 
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-full object-cover rounded-t-md" 
                />
              </div>
              <div className="p-4 flex flex-col items-center">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-xl font-bold text-green-600 mb-4">KSH {product.price.toFixed(2)}</p>
                <button 
                  onClick={() => addToCart(product)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Products;
