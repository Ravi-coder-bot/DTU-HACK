import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const CartPage = () => {
  const cartContext = useContext(CartContext);

  if (!cartContext) return <p>Loading...</p>;

  const { cart, removeFromCart } = cartContext;

  return (
    <div className="p-6">
      <h2 className="text-white text-2xl font-bold">Shopping Cart</h2>
      {cart.length === 0 ? <p className="text-gray-400">Your cart is empty.</p> : (
        <ul>
          {cart.map((item) => (
            <li key={item.id} className="bg-gray-800 p-4 rounded my-2 flex justify-between">
              <span>{item.name} - ₹{item.price} x {item.quantity}</span>
              <button className="text-red-500" onClick={() => removeFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartPage;
