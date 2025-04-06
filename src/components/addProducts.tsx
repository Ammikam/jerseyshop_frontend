import React, { useState, FormEvent } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { db } from '../Database/config';



const AddProduct: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<number | ''>('');
  const [description, setDescription] = useState<string>('');
  const [imgUrl, setImgUrl] = useState<string>('');
  const [stockQuantity, setStockQuantity] = useState<number | ''>('');
  const [categoryId, setCategoryId] = useState<string>('');
  const [isFeaturedProduct, setIsFeaturedProduct] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleAddProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !price || isNaN(price) || !categoryId || !stockQuantity || isNaN(stockQuantity)) {
      setError('Please provide valid name, price, category, and stock quantity.');
      return;
    }

    try {
      const productsRef = collection(db, 'Products');

      await addDoc(productsRef, {
        name,
        price,
        description,
        imgUrl,
        stockQuantity,
        categoryId,
        isFeaturedProduct,
      });

      setName('');
      setPrice('');
      setDescription('');
      setImgUrl('');
      setStockQuantity('');
      setCategoryId('');
      setIsFeaturedProduct(false);
      setSuccess('Product added successfully!');
      setError(null);
    } catch (error) {
      console.error('Error adding product: ', error);
      setError('Failed to add product.');
      setSuccess(null);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
      <form onSubmit={handleAddProduct} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="imgUrl" className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            id="imgUrl"
            type="text"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="stockQuantity" className="block text-sm font-medium text-gray-700">
            Stock Quantity
          </label>
          <input
            id="stockQuantity"
            type="number"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(Number(e.target.value))}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">
            Category ID
          </label>
          <input
            id="categoryId"
            type="text"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div className="flex items-center">
          <input
            id="isFeaturedProduct"
            type="checkbox"
            checked={isFeaturedProduct}
            onChange={() => setIsFeaturedProduct(!isFeaturedProduct)}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="isFeaturedProduct" className="ml-2 text-sm font-medium text-gray-700">
            Featured Product
          </label>
        </div>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;