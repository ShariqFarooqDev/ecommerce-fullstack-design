import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product } from '../types';
import { StarIcon, HeartIcon, ChevronLeftIcon, ChevronRightIcon } from '../components/Icons';
import { productApi } from '../services/api';

interface ProductDetailPageProps {
    addToCart: (product: Product, quantity: number) => void;
    isWishlisted: (productId: number) => boolean;
    toggleWishlist: (product: Product) => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ addToCart, isWishlisted, toggleWishlist }) => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      if (!id) {
        setLoading(false);
        return;
      }

      const fetchedProducts = await productApi.getAllProducts();
      setAllProducts(fetchedProducts);
      
      const foundProduct = fetchedProducts.find(p => p.id === parseInt(id));
      setProduct(foundProduct || null);
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="text-center py-20">Loading product...</div>;
  }

  if (!product) {
    return <div className="text-center py-20">Product not found.</div>;
  }

  const productImages = product.images && product.images.length > 0 ? product.images : [product.image];
  const mainImage = productImages[currentImageIndex] || product.image;

  const nextImage = () => {
    if (productImages.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % productImages.length);
    }
  };

  const prevImage = () => {
    if (productImages.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + productImages.length) % productImages.length);
    }
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`${quantity} x ${product.name} added to cart!`);
  };

  return (
    <div className="container mx-auto px-4 py-5">
      <div className="bg-white p-5 rounded-lg shadow-sm lg:block hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <img src={mainImage} alt={product.name} className="w-full rounded-lg border border-gray-200" />
            <div className="flex space-x-2 mt-4">
              {productImages.map((img, index) => (
                <img 
                    key={index} 
                    src={img} 
                    alt={`${product.name} thumbnail ${index + 1}`} 
                    className={`w-1/4 cursor-pointer rounded-md border-2 ${currentImageIndex === index ? 'border-primary' : 'border-transparent'}`}
                    onMouseEnter={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>
          <div className="lg:col-span-1">
            <h1 className="text-2xl font-bold text-dark">{product.name}</h1>
            <div className="flex items-center space-x-4 mt-2 text-gray-500">
                <div className="flex items-center">
                    {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < Math.round(product.rating)} className="w-5 h-5" />)}
                    <span className="ml-2 text-yellow-500">{product.rating}</span>
                </div>
                <span>•</span>
                <span>{product.reviews} reviews</span>
                <span>•</span>
                <span>{product.orders} sold</span>
            </div>
             <div className="mt-4 bg-red-50 p-4 rounded-lg">
                <p className="text-3xl font-bold text-red-600">${product.price.toFixed(2)}</p>
                <p className="text-gray-500">50-100 pcs</p>
             </div>
             <table className="w-full text-left mt-4 text-gray-600">
                <tbody>
                    <tr><td className="py-1 pr-4">Price:</td><td className="font-medium">Negotiable</td></tr>
                    <tr><td className="py-1 pr-4 font-semibold">Type:</td><td className="font-medium">{product.category}</td></tr>
                    <tr><td className="py-1 pr-4 font-semibold">Material:</td><td className="font-medium">{product.features.join(', ')}</td></tr>
                    <tr><td className="py-1 pr-4 font-semibold">Design:</td><td className="font-medium">{product.brand}</td></tr>
                </tbody>
             </table>
             <div className="mt-4 border-t pt-4">
                <p>{product.description}</p>
             </div>
          </div>
          <div className="lg:col-span-1">
            <div className="border p-4 rounded-lg">
                <h3 className="text-lg font-semibold">Supplier</h3>
                <p className="text-gray-500">Guanjoi Trading LLC</p>
                <button className="w-full bg-primary text-white py-2 rounded-md mt-4">Send inquiry</button>
                <button onClick={() => toggleWishlist(product)} className="w-full border border-gray-300 py-2 rounded-md mt-2 flex items-center justify-center">
                    <HeartIcon className="w-5 h-5 mr-2 text-red-500" fill={isWishlisted(product.id) ? 'currentColor': 'none'} /> {isWishlisted(product.id) ? 'Saved' : 'Save for later'}
                </button>
            </div>
             <div className="border p-4 rounded-lg mt-4">
                <h3 className="text-lg font-semibold mb-2">Quantity</h3>
                <div className="flex items-center">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 border rounded-l-md">-</button>
                    <input type="text" value={quantity} readOnly className="w-16 text-center border-t border-b py-2" />
                    <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 border rounded-r-md">+</button>
                </div>
                <button onClick={handleAddToCart} className="w-full bg-green text-white py-2 rounded-md mt-4">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile View */}
      <div className="lg:hidden">
        <div className="relative">
          <img src={mainImage} alt={product.name} className="w-full rounded-lg" />
          <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/50 rounded-full p-1"><ChevronLeftIcon className="w-6 h-6" /></button>
          <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/50 rounded-full p-1"><ChevronRightIcon className="w-6 h-6" /></button>
        </div>
        <div className="p-4 bg-white">
          <h1 className="text-xl font-semibold text-dark">{product.name}</h1>
          <div className="flex items-center space-x-2 mt-2 text-gray-500 text-sm">
              <div className="flex items-center">
                  {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < Math.round(product.rating)} className="w-4 h-4" />)}
              </div>
              <span>{product.rating}</span>
              <span className="text-gray-300">|</span>
              <span>{product.reviews} reviews</span>
              <span className="text-gray-300">|</span>
              <span>{product.orders} sold</span>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold text-dark">${product.price.toFixed(2)} <span className="text-base font-normal text-gray-500">(50-100 pcs)</span></p>
          </div>
          <div className="flex items-center space-x-2 mt-4">
            <button onClick={handleAddToCart} className="flex-1 bg-primary text-white py-2.5 rounded-md">Send inquiry</button>
            <button onClick={() => toggleWishlist(product)} className="p-2.5 border border-gray-300 rounded-md">
              <HeartIcon className="w-6 h-6 text-gray-500" fill={isWishlisted(product.id) ? 'currentColor' : 'none'} />
            </button>
          </div>
          <div className="mt-6 text-gray-700">
            <p>{product.description}</p>
            <a href="#" className="text-primary font-semibold mt-2 inline-block">Read more</a>
          </div>
        </div>

        <div className="mt-4 bg-white p-4 rounded-lg border">
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    <div className="bg-red-500 text-white rounded-md p-2 font-bold">R</div>
                    <div>
                        <p className="font-semibold">Supplier</p>
                        <p className="text-sm text-gray-500">Guanjoi Trading LLC</p>
                    </div>
                </div>
                <ChevronRightIcon className="w-6 h-6 text-gray-400" />
            </div>
        </div>

      </div>

      <div className="bg-white p-5 rounded-lg shadow-sm mt-5">
        <h2 className="text-xl font-semibold mb-4">Similar products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {allProducts.slice(0, 6).map(item => (
            <Link to={`/product/${item.id}`} key={item.id} className="border rounded-lg p-2">
                <img src={item.image} alt={item.name} className="w-full h-24 sm:h-32 object-cover rounded-md" />
                <p className="text-sm mt-2">{item.name}</p>
                <p className="text-gray-500 text-sm">${item.price.toFixed(2)}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;