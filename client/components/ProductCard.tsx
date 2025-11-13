import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { HeartIcon } from './Icons';

interface ProductCardProps {
  product: Product;
  isWishlisted: (productId: number) => boolean;
  toggleWishlist: (product: Product) => void;
  className?: string; // Optional class for the card container
  imageClassName?: string; // Optional class for the image
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isWishlisted, toggleWishlist, className, imageClassName }) => {
  return (
    <div className={`bg-white ${className || ''}`}>
      <div className="flex w-full">
        <div className="relative flex-shrink-0">
          <Link to={`/product/${product.id}`} className="block">
            <img 
              src={product.image} 
              alt={product.name} 
              className={`w-32 h-32 object-cover rounded-md ${imageClassName || ''}`} // Fixed size for list view
            />
          </Link>
          <button onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }} className="absolute top-2 right-2 bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <HeartIcon className="w-5 h-5 text-red-500" fill={isWishlisted(product.id) ? 'currentColor' : 'none'} />
          </button>
        </div>
        <div className="flex-1 ml-4 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-dark h-12 overflow-hidden">
              <Link to={`/product/${product.id}`} className="hover:text-primary">{product.name}</Link>
            </h3>
            <div className="mt-2 flex items-baseline">
              <span className="text-xl font-semibold text-dark">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through ml-2">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <div className="flex items-center">
                <span className="text-yellow-500 mr-1">★</span> {product.rating}
              </div>
              <span className="mx-2">·</span>
              <span>{product.orders} orders</span>
            </div>
            <p className="text-sm text-green-600 mt-2 font-medium">{product.shipping}</p>
          </div>
          <button
            onClick={() => toggleWishlist(product)}
            className={`mt-2 px-4 py-2 rounded-md ${isWishlisted(product.id) ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            {isWishlisted(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
