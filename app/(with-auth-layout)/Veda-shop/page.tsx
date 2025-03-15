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
    { id: 1, name: "Ashwagandha", price: 199, image: "/ashwagandha.jpg", description: "Boosts immunity and reduces stress." },
    { id: 2, name: "Brahmi", price: 249, image: "/brahmi.jpg", description: "Enhances brain function and memory." },
  ],
  "General Health": [
    { id: 3, name: "Aspirin", price: 99, image: "/aspirin.jpg", description: "Used to reduce fever and pain." },
    { id: 4, name: "Ibuprofen", price: 149, image: "/ibuprofen.jpg", description: "Relieves pain, fever, and inflammation." },
  ],
};

export default function Home() {
  const [category, setCategory] = useState<string>("Ayurveda");
  const [cart, setCart] = useState<Product[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [address, setAddress] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState<string | null>(null);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    setShowCheckout(true);
  };

  const confirmOrder = () => {
    if (!address) {
      alert("Please enter your address.");
      return;
    }
    const estimatedDate = new Date();
    estimatedDate.setDate(estimatedDate.getDate() + 5);
    setDeliveryDate(estimatedDate.toDateString());
    setShowCheckout(false);
    setShowQR(true);
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

      <div className="p-6 bg-gray-800 shadow-md mt-6">
        <h2 className="text-xl font-bold">Shopping Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-400">Your cart is empty.</p>
        ) : (
          <div>
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between items-center bg-gray-700 p-3 mt-2 rounded">
                <span>{item.name} - ₹{item.price}</span>
                <button 
                  onClick={() => removeFromCart(index)}
                  className="bg-red-500 px-3 py-1 text-white rounded"
                >
                  Remove
                </button>
              </div>
            ))}
            <h3 className="font-bold mt-3">Total: ₹{totalPrice}</h3>
            <button 
              onClick={handleCheckout}
              className="mt-3 bg-green-500 hover:bg-green-600 px-5 py-2 text-white rounded"
            >
              Checkout
            </button>
          </div>
        )}
      </div>

      {showCheckout && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-center">Enter Your Address</h2>
            <textarea
              className="w-full p-2 mt-3 bg-gray-700 rounded text-white"
              placeholder="Enter your address..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <button
              onClick={confirmOrder}
              className="mt-3 bg-green-500 hover:bg-green-600 px-5 py-2 text-white rounded w-full"
            >
              Confirm Order
            </button>
          </div>
        </div>
      )}

      {showQR && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-center">Scan & Pay via UPI</h2>
            <img
              src="./payment.jpg"
              alt="UPI QR Code"
              className="w-48 h-48 mx-auto my-4"
            />
            <p className="text-gray-400 text-center">Pay ₹{totalPrice} to <b>yournumber@paytm</b></p>
            <p className="text-gray-500 text-sm text-center">After payment, share the screenshot.</p>
            {deliveryDate && <p className="text-green-400 text-center">Estimated Delivery: {deliveryDate}</p>}
            <button
              onClick={() => setShowQR(false)}
              className="mt-3 bg-red-500 hover:bg-red-600 px-5 py-2 text-white rounded w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
