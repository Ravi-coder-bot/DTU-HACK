import { useContext } from 'react';
import { CartContext } from '../';
import ProductCard from '../components/ProductCard';

const products = [
  { id: 1, name: "Aspirin", price: 99, image: "/aspirin.png", description: "Used to reduce fever and pain." },
  { id: 2, name: "Ibuprofen", price: 149, image: "/ibuprofen.png", description: "Relieves pain, fever, and inflammation." }
];

const HomePage = () => {
  const cartContext = useContext(CartContext);
  
  if (!cartContext) return <p>Loading...</p>;

  const { addToCart } = cartContext;

  return (
    <div className="p-6">
      <h1 className="text-white text-3xl font-bold">HealthSync Store</h1>
      <div className="grid grid-cols-2 gap-6 mt-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
