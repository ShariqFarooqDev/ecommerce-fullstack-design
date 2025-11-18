import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { HeartIcon, StarIcon } from './Icons';

interface ProductCardProps {
  product: Product;
  isWishlisted: (productId: number) => boolean;
  toggleWishlist: (product: Product) => void;
  className?: string;
  imageClassName?: string;
  view?: 'grid' | 'list';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isWishlisted, toggleWishlist, className, imageClassName, view = 'list' }) => {
  const isGridView = view === 'grid';

  if (isGridView) {
    // Grid view card layout
    return (
      <div className={`bg-white ${className || ''}`}>
        <div className="relative group">
          <Link to={`/product/${product.id}`} className="block overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              className={`${imageClassName || 'w-full h-40'} group-hover:scale-105 transition-transform duration-200`}
            />
          </Link>
          <button 
            onClick={(e) => { e.preventDefault(); toggleWishlist(product); }} 
            className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow z-10"
          >
            <HeartIcon className="w-5 h-5 text-red-500" fill={isWishlisted(product.id) ? 'currentColor' : 'none'} />
          </button>
        </div>
        <div className="p-3 flex flex-col flex-grow">
          <Link to={`/product/${product.id}`} className="hover:text-primary">
            <h3 className="font-semibold text-sm text-dark line-clamp-2">{product.name}</h3>
          </Link>
          
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-lg font-bold text-dark">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>

          <div className="mt-2 flex items-center gap-1 text-xs text-gray-600">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < Math.round(product.rating)} className="w-3 h-3" />)}
            </div>
            <span className="text-yellow-500 font-semibold">{product.rating}</span>
            <span>({product.orders})</span>
          </div>

          <p className="text-xs text-green-600 mt-2 font-medium">{product.shipping}</p>

          <button
            onClick={() => toggleWishlist(product)}
            className="mt-auto pt-3 w-full px-3 py-2 rounded-md text-sm font-medium transition-colors"
            style={{
              backgroundColor: isWishlisted(product.id) ? '#ef4444' : '#f3f4f6',
              color: isWishlisted(product.id) ? 'white' : '#374151'
            }}
          >
            {isWishlisted(product.id) ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>
    );
  }

  // List view card layout (original)
  return (
    <div className={`bg-white ${className || ''}`}>
      <div className="flex w-full">
        <div className="relative flex-shrink-0">
          <Link to={`/product/${product.id}`} className="block">
            <img 
              src={product.image} 
              alt={product.name} 
              className={`w-20 h-20 object-cover rounded-md ${imageClassName || ''}`}
            />
          </Link>
          <button onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }} className="absolute top-1 right-1 bg-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <HeartIcon className="w-4 h-4 text-red-500" fill={isWishlisted(product.id) ? 'currentColor' : 'none'} />
          </button>
        </div>
        <div className="flex-1 ml-3 flex flex-col justify-between py-1">
          <div>
            <h3 className="text-base font-semibold text-dark h-10 overflow-hidden">
              <Link to={`/product/${product.id}`} className="hover:text-primary">{product.name}</Link>
            </h3>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-lg font-semibold text-dark">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-xs text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>
            <div className="mt-1 flex items-center text-xs text-gray-500 gap-2">
              <div className="flex items-center">
                <span className="text-yellow-500 mr-0.5">★</span> {product.rating}
              </div>
              <span>·</span>
              <span>{product.orders} orders</span>
            </div>
            <p className="text-xs text-green-600 mt-1 font-medium">{product.shipping}</p>
          </div>
          <button
            onClick={() => toggleWishlist(product)}
            className={`mt-1 px-2 py-0.5 rounded text-xs font-medium transition-colors whitespace-nowrap w-fit ${isWishlisted(product.id) ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {isWishlisted(product.id) ? '♥ Saved' : '♡ Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
