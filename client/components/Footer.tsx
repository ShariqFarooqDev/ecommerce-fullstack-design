import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDownIcon, FacebookIcon, TwitterIcon, LinkedInIcon, InstagramIcon, YoutubeIcon } from './Icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white pt-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 text-sm">
          <div className="col-span-2 md:col-span-2 lg:col-span-1">
            <h4 className="text-2xl font-bold text-dark mb-4">Brand</h4>
            <p className="text-gray-500">Best information about the company gies here but now lorem ipsum is</p>
            <div className="flex space-x-3 mt-4 text-gray-500">
                <a href="#" className="hover:text-primary"><FacebookIcon className="w-8 h-8 p-1"/></a>
                <a href="#" className="hover:text-primary"><TwitterIcon className="w-8 h-8 p-1"/></a>
                <a href="#" className="hover:text-primary"><LinkedInIcon className="w-8 h-8 p-1"/></a>
                <a href="#" className="hover:text-primary"><InstagramIcon className="w-8 h-8 p-1"/></a>
                <a href="#" className="hover:text-primary"><YoutubeIcon className="w-8 h-8 p-1"/></a>
            </div>
          </div>
          <div className="col-span-1">
            <h5 className="font-semibold mb-3">About</h5>
            <ul className="space-y-2 text-gray-500">
              <li><Link to="#" className="hover:text-primary">About Us</Link></li>
              <li><Link to="#" className="hover:text-primary">Find store</Link></li>
              <li><Link to="#" className="hover:text-primary">Categories</Link></li>
              <li><Link to="#" className="hover:text-primary">Blogs</Link></li>
            </ul>
          </div>
          <div className="col-span-1">
            <h5 className="font-semibold mb-3">Partnership</h5>
            <ul className="space-y-2 text-gray-500">
              <li><Link to="#" className="hover:text-primary">About Us</Link></li>
              <li><Link to="#" className="hover:text-primary">Find store</Link></li>
              <li><Link to="#" className="hover:text-primary">Categories</Link></li>
              <li><Link to="#" className="hover:text-primary">Blogs</Link></li>
            </ul>
          </div>
          <div className="col-span-1">
            <h5 className="font-semibold mb-3">Information</h5>
            <ul className="space-y-2 text-gray-500">
              <li><Link to="#" className="hover:text-primary">Help Center</Link></li>
              <li><Link to="#" className="hover:text-primary">Money Refund</Link></li>
              <li><Link to="#" className="hover:text-primary">Shipping</Link></li>
              <li><Link to="#" className="hover:text-primary">Contact us</Link></li>
            </ul>
          </div>
          <div className="col-span-1">
            <h5 className="font-semibold mb-3">For users</h5>
            <ul className="space-y-2 text-gray-500">
              <li><Link to="#" className="hover:text-primary">Login</Link></li>
              <li><Link to="#" className="hover:text-primary">Register</Link></li>
              <li><Link to="#" className="hover:text-primary">Settings</Link></li>
              <li><Link to="#" className="hover:text-primary">My Orders</Link></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h5 className="font-semibold mb-3">Get app</h5>
            <div className="space-y-2">
                <a href="#"><img src="/images/appstore.svg" alt="App Store" className="cursor-pointer" /></a>
                <a href="#" className="block"><img src="/images/playstore.svg" alt="Google Play" className="cursor-pointer block" /></a>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 mt-10 py-4 text-sm text-gray-500">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
            <p>&copy; 2023 Ecommerce.</p>
            <div className="flex items-center mt-2 sm:mt-0">
                <select className="bg-transparent focus:outline-none appearance-none">
                    <option>English</option>
                    <option>Deutsch</option>
                </select>
                <ChevronDownIcon className="w-4 h-4 -ml-5 pointer-events-none" />
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
