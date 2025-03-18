"use client";
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

const products: Record<string, Product[]> = {
  Ayurveda: [
    { id: 1, name: "Ashwagandha", price: 199, image: "https://media.istockphoto.com/id/1286731715/photo/root-withania-somnifera-known-commonly-as-ashwagandha-indian-ginseng-poison-gooseberry-or.jpg?s=612x612&w=0&k=20&c=dpgMh_ZgDzz2sZniGCzd5NBa0iAn7zBkjBya46YylyI=", description: "Boosts immunity and reduces stress." },
    { id: 2, name: "Brahmi", price: 249, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpVj_2o6-YU1W4yhgDtzLYRjpn78H9I6rt-w&s", description: "Enhances brain function and memory." },
    { id: 3, name: "Mulethi", price: 200, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8oFgmIFs666hZcRX3fo0w63mH12x6KtASBw&s", description: "Clears the throat." },
  ],
  "General Health": [
    { id: 4, name: "Aspirin", price: 99, image: "https://thumbs.dreamstime.com/b/aspirin-18931443.jpg", description: "Used to reduce fever and pain." },
    { id: 5, name: "Ibuprofen", price: 149, image: "https://media.istockphoto.com/id/1359178057/photo/ibuprofen-pill-box-box-paper-blister-tablets.jpg?s=612x612&w=0&k=20&c=iqdliihgmXPtkeKW8NX_YprRGdoh1d-bdcO8sw1Tsmw=", description: "Relieves pain, fever, and inflammation." },
    { id: 6, name: "Multivitamins", price: 200, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPIV5gfhGaagJrubSkcF2u_sXdYdDGAg3esA&s", description: "Used to provide essential vitamins" },
  ],
  "Medical Devices": [
    { id: 7, name: "Thermometer", price: 99, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8cbjxj9PURgkOsnXGE4fqfiu9RxMTX0iRIsf325K55vkh-_2GHOyj7K8VTMQUvJUmfQU&usqp=CAU", description: "Used to measure body temperature." },
    { id: 8, name: "Pulse Oximeter", price: 149, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGBWOF21zrZVW_JtUQ264qmMooavt4qm4L-w&s", description: "Measures oxygen levels and pulse rate." },
    { id: 9, name: "BP Machine", price: 200, image: "https://m.media-amazon.com/images/I/61jCO+2fjDL._AC_UF1000,1000_QL80_.jpg", description: "Used to measure blood pressure." },
  ]
};

export default function Home() {
  const [category, setCategory] = useState<string>("Ayurveda");
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800 p-5 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">HealthSync Store</h1>
        <div>
          {Object.keys(products).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 mx-2 rounded transition ${category === cat ? "bg-blue-500 text-white" : "bg-gray-600 hover:bg-gray-500"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </nav>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products[category].map((product) => (
          <div key={product.id} className="bg-gray-800 p-5 rounded-lg shadow-md">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded" />
            <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
            <p className="text-gray-400">{product.description}</p>
            <p className="text-blue-400 font-bold mt-2">₹{product.price}</p>
            <button 
              onClick={() => addToCart(product)}
              className="mt-2 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}