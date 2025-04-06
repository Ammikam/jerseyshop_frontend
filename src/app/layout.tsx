import React from 'react';
import './globals.css';
import { CartProvider } from '@/components/cartcontext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <ToastContainer />
          <main className="main-content">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}