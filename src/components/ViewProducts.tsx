import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../functions/fetchProducts';
import { getFirestore, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../Database/config'; 

const ViewProducts: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch products.');
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleDeleteProduct = async (id: string) => {
    try {
      const productRef = doc(db, 'Products', id);
      await deleteDoc(productRef);
      setProducts(products.filter(product => product.id !== id));
      alert('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product: ', error);
      alert('Failed to delete product.');
    }
  };

  const handleOpenModal = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdateProduct = async () => {
    if (selectedProduct) {
      try {
        const productRef = doc(db, 'Products', selectedProduct.id);
        await updateDoc(productRef, {
          name: selectedProduct.name,
          price: selectedProduct.price,
          description: selectedProduct.description,
          imgUrl: selectedProduct.imgUrl,
          stockQuantity: selectedProduct.stockQuantity,
          categoryId: selectedProduct.categoryId,
          isFeaturedProduct: selectedProduct.isFeaturedProduct,
        });
        setProducts(products.map(product => 
          product.id === selectedProduct.id ? selectedProduct : product
        ));
        setIsModalOpen(false);
        alert('Product updated successfully!');
      } catch (error) {
        console.error('Error updating product: ', error);
        alert('Failed to update product.');
      }
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-semibold mb-4">Products</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Products..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full max-w-md px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="max-h-[530px] overflow-y-auto"> 
        <ul className="space-y-4">
          {filteredProducts.map(product => (
            <li key={product.id} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm">
              <div>
                <h3 className="text-lg font-medium">{product.name}</h3>
                <p className="text-sm text-gray-600">${product.price}</p>
                <p className="text-sm text-gray-500">{product.description}</p>
                {product.imgUrl && <img src={product.imgUrl} alt={product.name} className="w-32 h-32 object-cover mt-2" />}
                <p className="text-sm text-gray-500">Stock: {product.stockQuantity}</p>
                <p className="text-sm text-gray-500">Category ID: {product.categoryId}</p>
                <p className="text-sm text-gray-500">Featured: {product.isFeaturedProduct ? 'Yes' : 'No'}</p>
              </div>
              <button
                onClick={() => handleOpenModal(product)}
                className="text-blue-500 hover:text-blue-700 transition"
              >
                Update
              </button>
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="text-red-500 hover:text-red-700 transition"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        {/* Modal for updating products */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50" onClick={handleCloseModal}></div>
            <div className="bg-white p-6 rounded-lg shadow-md relative z-10 max-w-lg w-full">
              <h2 className="text-xl font-semibold mb-4">Update Product</h2>
              <form>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={selectedProduct.name}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <input
                    id="price"
                    type="number"
                    value={selectedProduct.price}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, price: Number(e.target.value) })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <input
                    id="description"
                    type="text"
                    value={selectedProduct.description}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, description: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="imgUrl" className="block text-sm font-medium text-gray-700">
                    Image URL
                  </label>
                  <input
                    id="imgUrl"
                    type="text"
                    value={selectedProduct.imgUrl}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, imgUrl: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="stockQuantity" className="block text-sm font-medium text-gray-700">
                    Stock Quantity
                  </label>
                  <input
                    id="stockQuantity"
                    type="number"
                    value={selectedProduct.stockQuantity}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, stockQuantity: Number(e.target.value) })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">
                    Category ID
                  </label>
                  <input
                    id="categoryId"
                    type="text"
                    value={selectedProduct.categoryId}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, categoryId: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="isFeaturedProduct" className="block text-sm font-medium text-gray-700">
                    Featured
                  </label>
                  <input
                    id="isFeaturedProduct"
                    type="checkbox"
                    checked={selectedProduct.isFeaturedProduct}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, isFeaturedProduct: e.target.checked })}
                    className="mt-1"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 mr-2 bg-gray-300 text-white rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleUpdateProduct}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewProducts;
