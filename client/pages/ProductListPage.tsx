
import React, { useState, useMemo, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { ChevronDownIcon, GridIcon, ListIcon, StarIcon, HeartIcon } from '../components/Icons';
import { useSearchParams, Link } from 'react-router-dom';
import { Product } from '../types';
import { getAllProducts } from '../services/api';

interface ProductListPageProps {
  isWishlisted: (productId: number) => boolean;
  toggleWishlist: (product: Product) => void;
}

const RatingFilter: React.FC<{ selected: number[], onChange: (rating: number) => void }> = ({ selected, onChange }) => (
  <div>
    {[5, 4, 3, 2, 1].map(rating => (
      <label key={rating} className="flex items-center space-x-2 cursor-pointer">
        <input type="checkbox" checked={selected.includes(rating)} onChange={() => onChange(rating)} className="form-checkbox h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary" />
        <span className="flex items-center">
          {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < rating} className="w-5 h-5" />)}
        </span>
      </label>
    ))}
  </div>
);

const Sidebar: React.FC<{
  selectedCategories: string[]; onCategoryChange: (category: string) => void;
  selectedBrands: string[]; onBrandChange: (brand: string) => void;
  selectedFeatures: string[]; onFeatureChange: (feature: string) => void;
  priceRange: { min: string, max: string }; onPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  applyPriceFilter: () => void;
  selectedRatings: number[]; onRatingChange: (rating: number) => void;
  products: Product[];
}> = ({
  selectedCategories, onCategoryChange,
  selectedBrands, onBrandChange,
  selectedFeatures, onFeatureChange,
  priceRange, onPriceChange, applyPriceFilter,
  selectedRatings, onRatingChange,
  products
}) => {
    const dynamicCategories = [...new Set(products.map(p => p.category))];
    const dynamicBrands = [...new Set(products.map(p => p.brand))];
    const dynamicFeatures = [...new Set(products.flatMap(p => p.features))];

    return (
      <aside className="w-full lg:w-1/4 xl:w-1/5 pr-5 text-dark hidden lg:block">
        <div className="space-y-5">
          <div>
            <h3 className="font-semibold mb-2">Categories</h3>
            <div className="space-y-2">
              {dynamicCategories.map(category => (
                <label key={category} className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" checked={selectedCategories.includes(category)} onChange={() => onCategoryChange(category)} className="form-checkbox h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary" />
                  <span className="capitalize">{category}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Brands</h3>
            <div className="space-y-2">
              {dynamicBrands.map(brand => (
                <label key={brand} className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => onBrandChange(brand)} className="form-checkbox h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary" />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Features</h3>
            <div className="space-y-2">
              {dynamicFeatures.map(feature => (
                <label key={feature} className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" checked={selectedFeatures.includes(feature)} onChange={() => onFeatureChange(feature)} className="form-checkbox h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary" />
                  <span>{feature}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Price range</h3>
            <div className="flex items-center space-x-2">
              <input type="number" name="min" value={priceRange.min} onChange={onPriceChange} placeholder="Min" className="w-full border-gray-300 rounded-md shadow-sm p-2" />
              <input type="number" name="max" value={priceRange.max} onChange={onPriceChange} placeholder="Max" className="w-full border-gray-300 rounded-md shadow-sm p-2" />
            </div>
            <button onClick={applyPriceFilter} className="w-full mt-2 bg-primary text-white py-2 rounded-md">Apply</button>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Ratings</h3>
            <RatingFilter selected={selectedRatings} onChange={onRatingChange} />
          </div>
        </div>
      </aside>
    );
  };

const ProductListItem: React.FC<{ product: Product; isWishlisted: boolean; toggleWishlist: () => void; }> = ({ product, isWishlisted, toggleWishlist }) => (
  <div className="bg-white rounded-lg shadow-sm overflow-hidden flex p-2 border border-gray-200">
    <Link to={`/product/${product.id}`} className="block w-1/3 flex-shrink-0">
      <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-md" />
    </Link>
    <div className="p-2 flex flex-col flex-grow w-2/3">
      <h3 className="font-semibold text-dark mb-1">
        <Link to={`/product/${product.id}`} className="hover:text-primary">{product.name}</Link>
      </h3>
      <div className="flex items-baseline mb-1">
        <span className="text-lg font-bold text-dark">${product.price.toFixed(2)}</span>
      </div>
      <div className="flex items-center text-xs text-gray-500 mb-2">
        <StarIcon filled={true} className="w-4 h-4 mr-1" /> {product.rating}
        <span className="mx-1">·</span>
        {product.orders} orders
      </div>
      <p className="text-xs text-green-600 font-medium mb-2">{product.shipping}</p>
      <p className="text-xs text-gray-500 flex-grow h-10 overflow-hidden hidden sm:block">{product.description}</p>
      <button onClick={toggleWishlist} className="mt-auto self-end text-sm text-primary font-medium">
        {isWishlisted ? 'Saved' : 'Save'}
      </button>
    </div>
  </div>
);


const ProductListPage: React.FC<ProductListPageProps> = ({ isWishlisted, toggleWishlist }) => {
  const [searchParams] = useSearchParams();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [appliedPriceRange, setAppliedPriceRange] = useState({ min: '', max: '' });
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState('Newest');
  const [view, setView] = useState('list');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { products } = await getAllProducts();
      setAllProducts(products);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]);
  };
  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
  };
  const handleFeatureChange = (feature: string) => {
    setSelectedFeatures(prev => prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]);
  };
  const handleRatingChange = (rating: number) => {
    setSelectedRatings(prev => prev.includes(rating) ? prev.filter(r => r !== rating) : [...prev, rating]);
  }
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceRange(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const displayedProducts = useMemo(() => {
    let products = [...allProducts];
    const searchQuery = searchParams.get('search')?.toLowerCase();

    if (searchQuery) {
      products = products.filter(p => p.name.toLowerCase().includes(searchQuery) || p.description.toLowerCase().includes(searchQuery));
    }
    if (selectedCategories.length) {
      products = products.filter(p => selectedCategories.includes(p.category));
    }
    if (selectedBrands.length) {
      products = products.filter(p => selectedBrands.includes(p.brand));
    }
    if (selectedFeatures.length) {
      products = products.filter(p => p.features.some(f => selectedFeatures.includes(f)));
    }
    if (appliedPriceRange.min) {
      products = products.filter(p => p.price >= Number(appliedPriceRange.min));
    }
    if (appliedPriceRange.max) {
      products = products.filter(p => p.price <= Number(appliedPriceRange.max));
    }
    if (selectedRatings.length) {
      products = products.filter(p => selectedRatings.includes(Math.round(p.rating)));
    }

    if (sortBy === 'Price: Low to High') {
      products.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'Price: High to Low') {
      products.sort((a, b) => b.price - a.price);
    }

    return products;
  }, [searchParams, allProducts, selectedBrands, selectedFeatures, appliedPriceRange, selectedRatings, sortBy]);

  const activeFilters = [...selectedCategories, ...selectedBrands, ...selectedFeatures];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-5">
      <div className="lg:hidden">
        <div className="flex items-center justify-between text-sm mb-4">
          <button className="border border-gray-300 rounded-md px-4 py-2">Sort: {sortBy}</button>
          <button className="border border-gray-300 rounded-md px-4 py-2">Filter ({activeFilters.length})</button>
          <div className="flex items-center border border-gray-300 rounded-md">
            <button onClick={() => setView('list')} className={`p-2 rounded-l-md ${view === 'list' ? 'bg-gray-200 text-primary' : 'text-gray-500'}`}><ListIcon className="w-5 h-5" /></button>
            <button onClick={() => setView('grid')} className={`p-2 rounded-r-md ${view === 'grid' ? 'bg-gray-200 text-primary' : 'text-gray-500'}`}><GridIcon className="w-5 h-5" /></button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedCategories.map(category => (
            <div key={category} className="bg-gray-200 text-gray-700 text-sm px-2 py-1 rounded-md flex items-center capitalize">
              {category}
              <button onClick={() => handleCategoryChange(category)} className="ml-2 text-gray-500">x</button>
            </div>
          ))}
          {selectedBrands.map(brand => (
            <div key={brand} className="bg-gray-200 text-gray-700 text-sm px-2 py-1 rounded-md flex items-center">
              {brand}
              <button onClick={() => handleBrandChange(brand)} className="ml-2 text-gray-500">x</button>
            </div>
          ))}
          {selectedFeatures.map(feature => (
            <div key={feature} className="bg-gray-200 text-gray-700 text-sm px-2 py-1 rounded-md flex items-center">
              {feature}
              <button onClick={() => handleFeatureChange(feature)} className="ml-2 text-gray-500">x</button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        <Sidebar
          selectedCategories={selectedCategories} onCategoryChange={handleCategoryChange}
          selectedBrands={selectedBrands} onBrandChange={handleBrandChange}
          selectedFeatures={selectedFeatures} onFeatureChange={handleFeatureChange}
          priceRange={priceRange} onPriceChange={handlePriceChange} applyPriceFilter={() => setAppliedPriceRange(priceRange)}
          selectedRatings={selectedRatings} onRatingChange={handleRatingChange}
          products={allProducts}
        />
        <main className="w-full lg:w-3/4 xl:w-4/5">
          <div className="bg-white p-3 rounded-md shadow-sm hidden md:flex flex-col md:flex-row justify-between items-center mb-4">
            <p className="text-gray-600 mb-2 md:mb-0">{displayedProducts.length} items found</p>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="appearance-none bg-gray-100 border border-gray-300 rounded-md py-2 pl-3 pr-8 text-gray-600">
                  <option>Newest</option>
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
                <ChevronDownIcon className="w-5 h-5 text-gray-500 absolute top-1/2 right-2 -translate-y-1/2 pointer-events-none" />
              </div>
              <div className="flex items-center space-x-1">
                <button onClick={() => setView('grid')} className={`p-2 rounded-md ${view === 'grid' ? 'bg-gray-200 text-primary' : 'text-gray-500'}`}><GridIcon className="w-5 h-5" /></button>
                <button onClick={() => setView('list')} className={`p-2 rounded-md ${view === 'list' ? 'bg-gray-200 text-primary' : 'text-gray-500'}`}><ListIcon className="w-5 h-5" /></button>
              </div>
            </div>
          </div>

          <div className={view === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "flex flex-col gap-4"}>
            {displayedProducts.map(product => (
              view === 'grid' ?
                <ProductCard key={product.id} product={product} isWishlisted={isWishlisted} toggleWishlist={toggleWishlist} view="grid" className="rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full" imageClassName="w-full h-40 object-cover" /> :
                <ProductCard key={product.id} product={product} isWishlisted={isWishlisted} toggleWishlist={toggleWishlist} view="list" />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center lg:justify-end mt-8">
            <nav className="flex items-center space-x-2">
              <button className="px-4 py-2 border rounded-md">&lt;</button>
              <button className="px-4 py-2 border rounded-md bg-primary text-white">1</button>
              <button className="px-4 py-2 border rounded-md">2</button>
              <button className="px-4 py-2 border rounded-md">3</button>
              <button className="px-4 py-2 border rounded-md">&gt;</button>
            </nav>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductListPage;
