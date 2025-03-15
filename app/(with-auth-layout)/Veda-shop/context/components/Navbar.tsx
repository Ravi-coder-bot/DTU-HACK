import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 p-4 flex justify-between">
      <Link href="/" className="text-white text-xl font-bold">HealthSync Store</Link>
      <Link href="/cart" className="text-white">🛒 Cart</Link>
    </nav>
  );
};

export default Navbar;
