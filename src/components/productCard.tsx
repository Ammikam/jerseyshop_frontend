import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from './cartcontext';
import { toast } from 'react-toastify';

interface Product {
  id: string;
  imgUrl: string;
  name: string;
  price: number;
  categoryId: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState('zoom-out'); 

  const formatPrice = (price: number | string) => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2);
  };

  const handleAddToCart = () => {
    try {
      dispatch({ type: 'ADD_TO_CART', payload: product });
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      console.error('Error adding product to cart:', error);
      toast.error('Failed to add product to cart. Please try again.');
    }
  };

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setZoomLevel('zoom-out'); 
  };

  const handleZoomIn = () => {
    setZoomLevel('zoom-in');
  };

  const handleZoomOut = () => {
    setZoomLevel('zoom-out');
  };

  return (
    <>
      <div className='product-card'>
        <div className='image-container' onClick={handleImageClick}>
          <Image
            src={product.imgUrl}
            alt={product.name}
            width={100}
            height={250}
            layout="responsive"
            objectFit="cover"
            className='product-image'
          />
        </div>
        <h3 className='font-bold'>{product.name}</h3>
        <p className='text-green-600 font-bold'>Ksh {formatPrice(product.price)}</p>
        <button className='add-to-cart' onClick={handleAddToCart}>Add to Cart</button>
      </div>

      {isModalOpen && (
        <div className='modal' onClick={handleCloseModal}>
          <div className='modal-content'>
            <span className='close z' onClick={handleCloseModal}>&times;</span>
            <div className='modal-image-container'>
              <div className='modal-image-wrapper'>  {/* Wrapper with padding */}
                <Image
                  src={product.imgUrl}
                  alt={product.name}
                  layout="intrinsic"
                  className={`modal-image ${zoomLevel}`}
                  width={250}
                  height={250}
                />
              </div>
            </div>
            {/* <button className='zoom-button zoom-in' onClick={handleZoomIn}>Zoom In</button>
            <button className='zoom-button zoom-out' onClick={handleZoomOut}>Zoom Out</button> */}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
