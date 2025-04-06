import React from 'react';
import { notFound } from 'next/navigation';

// Mock data for jerseys
const jerseys = [
  { id: 1, name: 'Red Team Jersey', price: 59.99, description: 'A vibrant red jersey for the ultimate fan.' },
  { id: 2, name: 'Blue Team Jersey', price: 59.99, description: 'Show your support with this cool blue jersey.' },
  { id: 3, name: 'Green Team Jersey', price: 59.99, description: 'Stand out from the crowd with this green jersey.' },
];

export default function ProductPage({ params }: { params: { id: string } }) {
  const jersey = jerseys.find(j => j.id === parseInt(params.id));

  if (!jersey) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">{jersey.name}</h1>
      <p className="text-xl mb-4">${jersey.price.toFixed(2)}</p>
      <p className="mb-4">{jersey.description}</p>
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Add to Cart
      </button>
    </div>
  );
}