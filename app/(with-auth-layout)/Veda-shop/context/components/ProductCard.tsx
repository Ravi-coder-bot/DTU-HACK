"use client";
import React from 'react';

interface ProductProps {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
  };
  addToCart: (product: any) => void;
}

const ProductCard: React.FC<ProductProps> = ({ product, addToCart }) => {
  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded" />
      <h3 className="text-white font-semibold text-lg mt-2">{product.name}</h3>
      <p className="text-gray-400">{product.description}</p>
      <p className="text-blue-400 font-bold">₹{product.price}</p>
      <button 
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700" 
        onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
