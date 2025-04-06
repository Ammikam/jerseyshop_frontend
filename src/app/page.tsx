"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Categories from "@/components/Categories";
import Products from "@/components/Products";
import FeaturedProducts from "@/components/FeaturedProducts";
import CartButton from "../components/cartButton";
import Header from "@/components/header";
import { auth } from "../Database/config";
import { onAuthStateChanged, User } from "firebase/auth";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLoginClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (user) {
      event.preventDefault();
      alert("You are already signed in.");
    }
  };

  return (
    <div>
      <Header />
      <div className="flex justify-center mt-3">
        <h2 className="text-2xl font-bold">Featured Products</h2>
      </div>
      <div>
        <FeaturedProducts />
      </div>
      <Categories />

      <section className="testimonials py-8">
        <h2 className="text-3xl font-bold text-center mb-6">
          What Our Customers Say
        </h2>
        <div className="container mx-auto px-4">
          <div className="bg-white p-4 rounded shadow-md mb-4">
            <p className="italic">"Great quality jerseys! Highly recommend."</p>
            <p className="text-right font-bold">- Customer 1</p>
          </div>
          <div className="bg-white p-4 rounded shadow-md mb-4">
            <p className="italic">
              "Fast shipping and excellent customer service."
            </p>
            <p className="text-right font-bold">- Customer 2</p>
          </div>
        </div>
      </section>

      <footer className="bg-custom-gray text-white py-4">
        <div className="container mx-auto px-4 flex justify-between">
          <p>&copy; 2025 Jersey Shop. All rights reserved.</p>
          <div>
            <Link href="/privacy-policy" className="mr-4" onClick={handleLoginClick}>
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" onClick={handleLoginClick}>
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
