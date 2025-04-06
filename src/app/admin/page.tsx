"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AddProduct from '@/components/addProducts';
import ViewProducts from '../../components/ViewProducts';
import withAuth from '../../components/withAuth';

const AdminDashboard: React.FC = () => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const adminEmail = localStorage.getItem('adminEmail');
    if (adminEmail !== 'spongebobsquarepants@gmail.com') {
      router.push('/adminLogin');
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminEmail');
    router.push('/adminLogin');
  };

  if (!isAuthorized) {
    return <div>Checking authorization...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AddProduct />
        <ViewProducts />
      </div>
    </div>
  );
};


export default withAuth(AdminDashboard);