"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchCategories } from '../functions/fetchCategories';
import { PiSoccerBallFill } from "react-icons/pi";

interface Category {
  id: string;
  name: string;
}

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
        setLoading(false);
      } catch (err) {
        setError('Failed to load categories');
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      if (isOpen) {
        mainContent.classList.add('main-content-shifted');
      } else {
        mainContent.classList.remove('main-content-shifted');
      }
    }
  }, [isOpen]);

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/shop?category=${encodeURIComponent(categoryId)}`);
    setIsOpen(false);
  };

  return (
    <>
      <button
        className={`sidebar-button ${isOpen ? 'open' : ''}`}
        onClick={toggleSidebar}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? '×' : '☰'}
      </button>
      <div className={`sidebar-container ${isOpen ? 'sidebar-visible' : ''}`}>
        <nav>
          {loading ? (
            <div>Loading categories...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            <ul className="nav-list">
              {categories.map((category) => (
                <li key={category.id} className="nav-item">
                  <button
                    onClick={() => handleCategoryClick(category.id)}
                    className="nav-link"
                  >
                    {category.name} 
                  </button>
                </li>
              ))}
            </ul>
          )}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
