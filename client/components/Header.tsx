
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { UserIcon, MessageIcon, HeartIcon, CartIcon, MenuIcon, ChevronDownIcon, SearchIcon, ShoppingBagIcon, ChevronLeftIcon } from './Icons';

interface HeaderProps {
  cartItemCount: number;
  toggleMobileMenu: () => void;
}

import { useAuth } from '../context/AuthContext';

const DesktopHeader: React.FC<{ cartItemCount: number }> = ({ cartItemCount }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [shipDropdownOpen, setShipDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const [selectedLang, setSelectedLang] = useState({ lang: 'English', currency: 'USD' });
  const [selectedShip, setSelectedShip] = useState({ name: 'Germany', code: 'de' });

  const langRef = useRef<HTMLDivElement>(null);
  const shipRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  const languages = [
    { lang: 'English', currency: 'USD' },
    { lang: 'Deutsch', currency: 'EUR' }
  ];

  const countries = [
    { name: 'Germany', code: 'de' },
    { name: 'United States', code: 'us' },
    { name: 'Australia', code: 'au' },
    { name: 'Russia', code: 'ru' },
    { name: 'Italy', code: 'it' },
    { name: 'France', code: 'fr' },
    { name: 'China', code: 'cn' },
    { name: 'Great Britain', code: 'gb' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
      if (shipRef.current && !shipRef.current.contains(event.target as Node)) {
        setShipDropdownOpen(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [langRef, shipRef, userRef]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="bg-white hidden lg:block">
      {/* Main Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-3 lg:py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="bg-blue-600 p-1.5 rounded-md">
                  <ShoppingBagIcon className="w-7 h-7 text-white" />
                </div>
                <span className="text-2xl font-bold text-dark hidden sm:block">Brand</span>
              </Link>
            </div>

            <div className="flex flex-grow max-w-xl xl:max-w-2xl mx-4">
              <form onSubmit={handleSearchSubmit} className="group flex w-full border border-gray-300 rounded-md focus-within:border-primary transition-colors">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-4 py-2 w-full bg-white focus:outline-none rounded-l-md"
                />
                <div className="relative border-l border-gray-300 group-focus-within:border-primary flex items-center bg-gray-50 transition-colors">
                  <select className="h-full bg-transparent focus:outline-none appearance-none text-gray-600 pl-4 pr-8">
                    <option>All category</option>
                    <option>Electronics</option>
                    <option>Clothes</option>
                  </select>
                  <ChevronDownIcon className="w-4 h-4 absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none text-gray-600" />
                </div>
                <button type="submit" className="bg-primary text-white rounded-r-md px-5 hover:bg-blue-700 flex items-center">
                  Search
                </button>
              </form>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              {user ? (
                <div ref={userRef} className="relative flex flex-col items-center cursor-pointer">
                  <div onClick={() => setUserDropdownOpen(!userDropdownOpen)}>
                    <UserIcon className="w-7 h-7 mx-auto text-primary" />
                    <span className="text-xs font-medium">{user.name}</span>
                  </div>
                  {userDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 w-32 bg-white border rounded-md shadow-lg z-10">
                      {user.role === 'admin' && (
                        <Link to="/admin" onClick={() => setUserDropdownOpen(false)} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Admin Panel</Link>
                      )}
                      <button onClick={() => { logout(); setUserDropdownOpen(false); }} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Logout</button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="text-center text-gray-600 hover:text-primary">
                  <UserIcon className="w-7 h-7 mx-auto" />
                  <span className="text-xs">Sign in</span>
                </Link>
              )}
              <Link to="#" className="text-center text-gray-600 hover:text-primary">
                <MessageIcon className="w-7 h-7 mx-auto" />
                <span className="text-xs">Message</span>
              </Link>
              <Link to="#" className="text-center text-gray-600 hover:text-primary">
                <HeartIcon className="w-7 h-7 mx-auto" />
                <span className="text-xs">Orders</span>
              </Link>
              <Link to="/cart" className="text-center text-gray-600 hover:text-primary relative">
                <CartIcon className="w-7 h-7 mx-auto" />
                <span className="text-xs">My cart</span>
                {cartItemCount > 0 && <span className="absolute -top-2 -right-2 bg-orange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">{cartItemCount}</span>}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center text-dark">
          <div className="flex items-center space-x-8 font-medium">
            <Link to="#" className="flex items-center space-x-2">
              <MenuIcon className="w-5 h-5" />
              <span>All category</span>
            </Link>
            <Link to="/products" className="hover:text-primary">Hot offers</Link>
            <Link to="/products" className="hover:text-primary">Gift boxes</Link>
            <Link to="/products" className="hover:text-primary">Projects</Link>
            <Link to="/products" className="hover:text-primary">Menu item</Link>
            <Link to="/products" className="flex items-center hover:text-primary">
              <span>Help</span>
              <ChevronDownIcon className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <div className="relative" ref={langRef}>
              <button onClick={() => setLangDropdownOpen(!langDropdownOpen)} className="flex items-center space-x-1 cursor-pointer group">
                <span className="font-medium group-hover:text-primary">{selectedLang.lang}, {selectedLang.currency}</span>
                <ChevronDownIcon className={`w-4 h-4 text-gray-600 group-hover:text-primary transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {langDropdownOpen && (
                <div className="absolute top-full mt-2 w-max bg-white border rounded-md shadow-lg z-10">
                  <ul>
                    {languages.map(l => (
                      <li key={`${l.lang}-${l.currency}`} onClick={() => { setSelectedLang(l); setLangDropdownOpen(false); }} className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${selectedLang.lang === l.lang && selectedLang.currency === l.currency ? 'bg-blue-light' : ''}`}>
                        {l.lang}, {l.currency}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="relative" ref={shipRef}>
              <button onClick={() => setShipDropdownOpen(!shipDropdownOpen)} className="flex items-center space-x-2 cursor-pointer group">
                <span className="font-medium group-hover:text-primary">Ship to</span>
                <img src={`https://flagcdn.com/w20/${selectedShip.code}.png`} alt={`${selectedShip.name} flag`} className="w-5 h-auto" />
                <ChevronDownIcon className={`w-4 h-4 text-gray-600 group-hover:text-primary transition-transform ${shipDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {shipDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-max bg-white border rounded-md shadow-lg z-10">
                  <ul className="max-h-60 overflow-y-auto">
                    {countries.map(c => (
                      <li key={c.code} onClick={() => { setSelectedShip(c); setShipDropdownOpen(false); }} className={`px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2 ${selectedShip.code === c.code ? 'bg-blue-light' : ''}`}>
                        <img src={`https://flagcdn.com/w20/${c.code}.png`} alt={`${c.name} flag`} className="w-5 h-auto" />
                        <span>{c.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
};

const MobileHeader: React.FC<{ cartItemCount: number; toggleMobileMenu: () => void; }> = ({ cartItemCount, toggleMobileMenu }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const isHomePage = location.pathname === '/';

  const routeTitles: { [key: string]: string } = {
    '/products': 'Shop',
    '/cart': 'Shopping cart',
    '/login': 'Sign In',
    '/register': 'Register',
    '/admin': 'Admin Dashboard',
  };

  let title = '';
  if (location.pathname.startsWith('/product/')) {
    title = 'Product Details';
  } else {
    title = routeTitles[location.pathname] || '';
  }


  return (
    <header className="bg-white lg:hidden sticky top-0 z-30 shadow-sm">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {isHomePage ? (
            <button onClick={toggleMobileMenu}>
              <MenuIcon className="w-6 h-6 text-gray-600" />
            </button>
          ) : (
            <button onClick={() => navigate(-1)}>
              <ChevronLeftIcon className="w-6 h-6 text-gray-600" />
            </button>
          )}
          {isHomePage && <Link to="/" className="text-xl font-bold text-dark">Brand</Link>}
          {title && <h1 className="text-lg font-semibold">{title}</h1>}
        </div>

        <div className="flex items-center space-x-4">
          {!isHomePage && !title && location.pathname.startsWith('/product/') ? null : (
            <Link to="/cart" className="relative">
              <CartIcon className="w-6 h-6 text-gray-600" />
              {cartItemCount > 0 && <span className="absolute -top-2 -left-2 bg-orange text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">{cartItemCount}</span>}
            </Link>
          )}
          {isHomePage && <UserIcon className="w-6 h-6 text-gray-600" />}

          {location.pathname.startsWith('/product/') && (
            <>
              <UserIcon className="w-6 h-6 text-gray-600" />
            </>
          )}
        </div>
      </div>
    </header>
  );
};


const Header: React.FC<HeaderProps> = ({ cartItemCount, toggleMobileMenu }) => {
  return (
    <>
      <DesktopHeader cartItemCount={cartItemCount} />
      <MobileHeader cartItemCount={cartItemCount} toggleMobileMenu={toggleMobileMenu} />
    </>
  );
};

export default Header;
