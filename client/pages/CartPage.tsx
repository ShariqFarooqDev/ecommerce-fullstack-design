
import React from 'react';
import { Link } from 'react-router-dom';
import { CartItem, Product } from '../types';
import { MoreVerticalIcon } from '../components/Icons';

interface CartPageProps {
  cartItems: CartItem[];
  wishlist: Product[];
  updateQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  addToCart: (product: Product, quantity: number) => void;
  toggleWishlist: (product: Product) => void;
  moveFromCartToWishlist: (productId: number) => void;
}

const CartPage: React.FC<CartPageProps> = ({ cartItems, wishlist, updateQuantity, removeFromCart, addToCart, toggleWishlist, moveFromCartToWishlist }) => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = subtotal > 0 ? 60.00 : 0;
  const shipping = subtotal > 0 ? 10.00 : 0;
  const tax = subtotal > 0 ? 7.00 : 0;
  const total = subtotal - discount + shipping + tax;

  return (
    <div className="container mx-auto px-4 py-5">
      <h1 className="text-2xl font-bold mb-4 lg:block hidden">My cart ({cartItems.length})</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3">
          <div className="bg-white lg:p-4 rounded-lg lg:shadow-sm">
            {cartItems.map(({ product, quantity }) => (
              <div key={product.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b py-4 last:border-b-0">
                <div className="flex items-start w-full">
                  <img src={product.image} alt={product.name} className="w-20 h-20 lg:w-24 lg:h-24 object-cover rounded-md" />
                  <div className="ml-4 flex-grow">
                    <div className="flex justify-between">
                      <Link to={`/product/${product.id}`} className="font-semibold text-base lg:text-lg hover:text-primary pr-2">{product.name}</Link>
                      <button className="lg:hidden"><MoreVerticalIcon className="w-5 h-5 text-gray-500"/></button>
                    </div>
                    <p className="text-sm text-gray-500">Size: medium, Color: blue</p>
                    <p className="text-sm text-gray-500">Seller: Artel Market</p>
                    <div className="mt-2 hidden lg:block">
                      <button onClick={() => removeFromCart(product.id)} className="text-red-500 text-sm font-medium mr-4">Remove</button>
                      <button onClick={() => moveFromCartToWishlist(product.id)} className="text-blue-500 text-sm font-medium">Save for later</button>
                    </div>
                    <div className="flex items-center justify-between mt-2 lg:hidden">
                       <div className="flex items-center">
                        <button onClick={() => updateQuantity(product.id, Math.max(1, quantity - 1))} className="px-3 py-1 border rounded-l-md">-</button>
                        <span className="px-4 py-1 border-t border-b">{quantity}</span>
                        <button onClick={() => updateQuantity(product.id, quantity + 1)} className="px-3 py-1 border rounded-r-md">+</button>
                      </div>
                      <span className="text-lg font-medium">${(product.price * quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <div className="items-center mt-4 sm:mt-0 hidden lg:flex">
                  <span className="text-lg font-medium mr-4">${(product.price * quantity).toFixed(2)}</span>
                  <div className="flex items-center">
                    <select
                      value={quantity}
                      onChange={(e) => updateQuantity(product.id, parseInt(e.target.value))}
                      className="border rounded-md px-3 py-1.5"
                    >
                      {[...Array(10).keys()].map(i => <option key={i + 1} value={i + 1}>{`Qty: ${i + 1}`}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            ))}
             {cartItems.length === 0 && <p className="text-gray-500 py-4 text-center">Your cart is empty.</p>}
          </div>
          <div className="mt-4 justify-between hidden lg:flex">
            <Link to="/products" className="bg-primary text-white px-6 py-2 rounded-md hover:bg-blue-700">
              &lt; Back to shop
            </Link>
            <button onClick={() => cartItems.forEach(item => removeFromCart(item.product.id))} className="border border-gray-300 px-6 py-2 rounded-md">Remove all</button>
          </div>
        </div>
        <div className="w-full lg:w-1/3">
          <div className="bg-white p-4 rounded-lg shadow-sm hidden lg:block">
            <h3 className="font-semibold mb-2">Have a coupon?</h3>
            <div className="flex">
              <input type="text" placeholder="Add coupon" className="border rounded-l-md p-2 w-full" />
              <button className="border border-primary text-primary rounded-r-md px-4 font-medium">Apply</button>
            </div>
          </div>
          <div className="bg-white lg:p-4 rounded-lg lg:shadow-sm lg:mt-4">
             <div className="flex justify-between text-gray-600 mb-2">
              <span>Items ({cartItems.length}):</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600 mb-2">
              <span>Shipping:</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600 mb-2 pb-2 border-b">
              <span>Tax:</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-2">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="w-full bg-green text-white py-3 rounded-md mt-4 font-semibold text-lg">Checkout ({cartItems.length} items)</button>
          </div>
        </div>
      </div>
      
      {/* Saved for later */}
      <div className="bg-white p-5 rounded-lg shadow-sm mt-8">
        <h2 className="text-xl font-semibold mb-4">Saved for later</h2>
        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {wishlist.map(product => (
                  <div key={product.id} className="border p-4 rounded-lg flex flex-col">
                      <Link to={`/product/${product.id}`}><img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md mb-2" /></Link>
                      <div className="flex-grow">
                        <p className="font-semibold text-lg">${product.price.toFixed(2)}</p>
                        <p className="text-gray-600 text-sm h-10 overflow-hidden">{product.name}</p>
                      </div>
                      <div className="mt-2 space-y-2">
                          <button onClick={() => { addToCart(product, 1); toggleWishlist(product); }} className="w-full flex items-center justify-center text-primary font-medium border border-gray-300 py-1.5 rounded-md">
                              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                              Move to cart
                          </button>
                          <button onClick={() => toggleWishlist(product)} className="w-full text-red-500 font-medium border border-gray-300 py-1.5 rounded-md lg:hidden">
                              Remove
                          </button>
                      </div>
                  </div>
              ))}
          </div>
        ) : (
          <p className="text-gray-500">You have no items saved for later.</p>
        )}
      </div>

    </div>
  );
};

export default CartPage;
