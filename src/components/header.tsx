"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./sidebar";
import CartButton from "./cartButton";
import { auth } from "../Database/config";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";

const Header: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname(); // Get current route

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const name = user.email?.split("@")[0];
        const formattedName = name
          ? name.charAt(0).toUpperCase() + name.slice(1)
          : "";
        setUserName(formattedName);
      } else {
        setUserName(null);
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLoginClick = () => {
    if (userName) {
      alert("You are already signed in!");
    } else {
      window.location.href = "/login";
    }
  };

  return (
    <header className="bg-custom-gray text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <div className="flex items-center w-full md:w-auto justify-between">
          <div className="flex items-center">
            <Sidebar />
            <h1 className="text-2xl font-bold ml-4">MyShop</h1>
          </div>
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex w-full md:w-auto mt-4 md:mt-0 space-y-2 md:space-y-0 md:space-x-6`}
        >
          {[
            { name: "Home", path: "/" },
            { name: "Shop", path: "/shop" },
            { name: "About Us", path: "/about" },
            { name: "Contact", path: "/contact" },
          ].map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`block md:inline-block transition duration-300 relative ${
                pathname === link.path
                  ? "text-blue-500 font-bold"
                  : "hover:text-gray-300"
              }`}
            >
              {link.name}
              {pathname === link.path && (
                <span className="absolute left-0 bottom-[-2px] w-full h-1 bg-blue-500 transition-all duration-300"></span>
              )}
            </Link>
          ))}
        </nav>
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex items-center space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto mt-4 md:mt-0`}
        >
          {userName ? (
            <>
              <span className="font-medium block md:inline-block">
                Welcome, {userName}!
              </span>
              <button onClick={handleLogout} className="hover:text-red-400">
                Logout
              </button>
            </>
          ) : (
            <button onClick={handleLoginClick} className="hover:text-green-400">
              Login
            </button>
          )}
          <CartButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
