import { CartProvider } from './context/CartContext';
//import Navbar from './components/Navbar';



const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <CartProvider>
     
      <main className="p-6">{children}</main>
    </CartProvider>
  );
};

export default Layout;
