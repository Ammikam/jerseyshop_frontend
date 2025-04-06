import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchProducts } from '../functions/fetchProducts';


interface Product {
  id: string | number;
  name: string;
  // Add other properties as needed
}

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm) {
        const products = await fetchProducts();
        const filteredProducts = products.filter((product: Product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(filteredProducts);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/shop?search=${searchTerm}`);
  };

  return (
    <div className="relative mb-6">
      <form onSubmit={handleSearch} className="flex">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className="w-full p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors duration-300"
        >
          Search
        </button>
      </form>
      {searchResults.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto">
          {searchResults.map((product) => (
            <li
              key={product.id}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => router.push(`/product/${product.id}`)}
            >
              {product.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;