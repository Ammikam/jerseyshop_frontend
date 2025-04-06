import React, { Suspense } from 'react';
import Header from '../../components/header';
import dynamic from 'next/dynamic';

const ShopPageContent = dynamic(() => import('./ShopPageContent'), {
  ssr: false
});

const ShopPage = () => {
  return (
    <div className="shopPage">
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <ShopPageContent />
      </Suspense>
      <footer className="footer">
        <p>&copy; 2025 MyShop. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ShopPage;