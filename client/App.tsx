
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import { CartItem, Product } from './types';
import { MOCK_PRODUCTS } from './constants';
import { UserIcon, HeartIcon, XIcon } from './components/Icons';

const MobileMenu: React.FC<{ isOpen: boolean; setIsOpen: (isOpen: boolean) => void; }> = ({ isOpen, setIsOpen }) => (
  <>
    <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsOpen(false)}></div>
    <div className={`fixed top-0 left-0 h-full w-4/5 max-w-sm bg-white z-50 transform transition-transform lg:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <UserIcon className="w-8 h-8 text-gray-500 bg-gray-200 rounded-full p-1"/>
            <span className="font-semibold">Sign in | Register</span>
          </div>
          <button onClick={() => setIsOpen(false)}>
            <XIcon className="w-6 h-6 text-gray-500" />
          </button>
        </div>
        <nav className="space-y-4 text-gray-800">
          <Link to="/" className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            <span>Home</span>
          </Link>
          <Link to="/products" className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            <span>Categories</span>
          </Link>
          <Link to="#" className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100">
            <HeartIcon className="h-6 w-6" />
            <span>Favorites</span>
          </Link>
          <Link to="/cart" className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
            <span>My orders</span>
          </Link>
        </nav>
        <div className="border-t my-4"></div>
        <nav className="space-y-4 text-gray-800">
            <a href="#" className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h8a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.707 4.293l1.414-1.414a1 1 0 011.414 0l1.414 1.414M7.707 4.293V6m3.535 0V4.293m3.535 0V6M4.293 7.707l1.414 1.414M18.293 9.121l1.414-1.414M4.293 16.293l1.414-1.414M18.293 14.879l1.414 1.414" /></svg>
                <span>English | USD</span>
            </a>
            <a href="#" className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <span>Contact us</span>
            </a>
             <a href="#" className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>About</span>
            </a>
        </nav>
         <div className="absolute bottom-4 left-4 right-4 space-y-2 text-sm text-gray-600">
             <a href="#" className="block">User agreement</a>
             <a href="#" className="block">Partnership</a>
             <a href="#" className="block">Privacy policy</a>
         </div>
      </div>
    </div>
  </>
);


const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([MOCK_PRODUCTS[0], MOCK_PRODUCTS[4]]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Close mobile menu on route change
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const addToCart = (product: Product, quantity: number) => {
    setCartItems(prevItems => {
      const itemInCart = prevItems.find(item => item.product.id === product.id);
      if (itemInCart) {
        return prevItems.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [...prevItems, { product, quantity }];
      }
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setCartItems(prevItems =>
      prevItems
        .map(item => (item.product.id === productId ? { ...item, quantity } : item))
        .filter(item => item.quantity > 0)
    );
  };
  
  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  const isWishlisted = (productId: number) => wishlist.some(p => p.id === productId);

  const toggleWishlist = (product: Product) => {
    setWishlist(prevWishlist => {
      if (isWishlisted(product.id)) {
        return prevWishlist.filter(p => p.id !== product.id);
      } else {
        return [...prevWishlist, product];
      }
    });
  };

  const moveFromCartToWishlist = (productId: number) => {
    const itemToMove = cartItems.find(item => item.product.id === productId);
    if (itemToMove && !isWishlisted(productId)) {
      toggleWishlist(itemToMove.product);
    }
    removeFromCart(productId);
  };

  return (
    <>
      <MobileMenu isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
      <div className="bg-gray-100 min-h-screen flex flex-col font-sans overflow-x-hidden">
        <Header 
          cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} 
          toggleMobileMenu={() => setIsMobileMenuOpen(true)}
        />
        <main className="flex-grow bg-white lg:bg-gray-100">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductListPage isWishlisted={isWishlisted} toggleWishlist={toggleWishlist} />} />
            <Route path="/product/:id" element={<ProductDetailPage addToCart={addToCart} isWishlisted={isWishlisted} toggleWishlist={toggleWishlist} />} />
            <Route path="/cart" element={
              <CartPage 
                cartItems={cartItems} 
                updateQuantity={updateQuantity} 
                removeFromCart={removeFromCart} 
                wishlist={wishlist}
                addToCart={addToCart}
                toggleWishlist={toggleWishlist}
                moveFromCartToWishlist={moveFromCartToWishlist}
              />} 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;
