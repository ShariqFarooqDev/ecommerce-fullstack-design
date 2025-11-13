import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'GoPro HERO6 4K Action Camera - Black',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    price: 998.00,
    originalPrice: 1128.00,
    rating: 4.5,
    reviews: 32,
    orders: 154,
    shipping: 'Free Shipping',
    image: 'https://picsum.photos/id/250/300/300',
    images: ['https://picsum.photos/id/250/800/600', 'https://picsum.photos/id/251/800/600', 'https://picsum.photos/id/252/800/600', 'https://picsum.photos/id/253/800/600'],
    category: 'Mobile accessory',
    stock: 50,
    features: ['Metallic', '8GB Ram', 'Super power'],
    brand: 'Apple',
    condition: 'New'
  },
  {
    id: 2,
    name: 'Canon Camera EOS 2000, Black 10x zoom',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    price: 9.99,
    originalPrice: 1128.00,
    rating: 4.8,
    reviews: 120,
    orders: 75,
    shipping: 'Free Shipping',
    image: 'https://picsum.photos/seed/canoncamera/200/200',
    images: ['https://picsum.photos/id/20/800/600', 'https://picsum.photos/id/21/800/600', 'https://picsum.photos/id/22/800/600'],
    category: 'Electronics',
    stock: 25,
    features: ['Plastic cover', 'Large Memory'],
    brand: 'Canon',
    condition: 'New'
  },
  {
    id: 3,
    name: 'Smart watches',
    description: 'A brief description of the smart watch. Highlighting key features and benefits for the user.',
    price: 19.00,
    rating: 4.2,
    reviews: 8,
    orders: 45,
    shipping: 'Standard',
    image: 'https://picsum.photos/seed/smartwatch/200/200',
    images: ['https://picsum.photos/id/180/800/600', 'https://picsum.photos/id/181/800/600'],
    category: 'Smartphones',
    stock: 120,
    features: ['Waterproof', 'Fitness Tracker'],
    brand: 'Samsung',
    condition: 'New'
  },
  {
    id: 4,
    name: 'Modern Laptop with SSD',
    description: 'High performance laptop for professionals. Comes with the latest specs for demanding tasks.',
    price: 340.00,
    rating: 4.9,
    reviews: 55,
    orders: 98,
    shipping: 'Free Shipping',
    image: 'https://picsum.photos/seed/laptops/200/200',
    images: ['https://picsum.photos/id/12/800/600', 'https://picsum.photos/id/13/800/600'],
    category: 'Laptops & PC',
    stock: 30,
    features: ['SSD', '16GB Ram'],
    brand: 'Huawei',
    condition: 'New'
  },
  {
    id: 5,
    name: 'Headset for gaming with mic',
    description: 'Immersive sound quality for gamers. Crystal clear microphone for team communication.',
    price: 8.99,
    originalPrice: 15.00,
    rating: 4.3,
    reviews: 210,
    orders: 450,
    shipping: 'Standard',
    image: '/images/gamingheadset2.png',
    images: ['https://picsum.photos/id/1082/800/600'],
    category: 'Mobile accessory',
    stock: 200,
    features: ['Noise Cancelling', 'RGB'],
    brand: 'Pocco',
    condition: 'New'
  },
  {
    id: 6,
    name: 'Brown winter coat medium size',
    description: 'Stylish and warm winter coat for men. Made with high-quality materials to last.',
    price: 12.50,
    rating: 4.6,
    reviews: 15,
    orders: 60,
    shipping: 'Standard',
    image: 'https://picsum.photos/seed/coat/200/200',
    images: ['https://picsum.photos/id/659/800/600'],
    category: 'Clothes and wear',
    stock: 80,
    features: ['Wool', 'Water-resistant'],
    brand: 'Unbranded',
    condition: 'New'
  },
  {
    id: 7,
    name: 'T-shirts with multiple colors, for men',
    description: 'Comfortable cotton t-shirts available in various colors and sizes.',
    price: 10.30,
    rating: 4.1,
    reviews: 30,
    orders: 120,
    shipping: 'Standard',
    image: 'https://picsum.photos/seed/tshirt/200/200',
    images: ['https://picsum.photos/id/684/800/600'],
    category: 'Clothes and wear',
    stock: 300,
    features: ['100% Cotton', 'Tagless'],
    brand: 'Lenovo',
    condition: 'New'
  },
   {
    id: 8,
    name: 'Jeans bag for travel for men',
    description: 'Premium quality leather wallet with multiple compartments for cards and cash.',
    price: 80.95,
    rating: 4.9,
    reviews: 80,
    orders: 200,
    shipping: 'Free Shipping',
    image: 'https://picsum.photos/seed/jeansbag/200/200',
    images: ['https://picsum.photos/id/98/800/600'],
    category: 'Accessories',
    stock: 150,
    features: ['Genuine Leather', 'RFID Blocking'],
    brand: 'Designer',
    condition: 'New'
  },
  {
    id: 9,
    name: 'Jeans shorts for men blue color',
    price: 10.30,
    image: 'https://picsum.photos/seed/shorts/200/200',
    description: '', rating: 4, reviews: 1, orders: 1, shipping: '', category: '', stock: 1, features: [], brand: '', condition: 'New', images: []
  },
  {
    id: 10,
    name: 'Jeans bag for travel for men',
    price: 34.00,
    image: 'https://picsum.photos/seed/travelbag/200/200',
    description: '', rating: 4, reviews: 1, orders: 1, shipping: '', category: '', stock: 1, features: [], brand: '', condition: 'New', images: []
  }
];


export const HOME_CATEGORIES = [
  'Automobiles',
  'Clothes and wear',
  'Home interiors',
  'Computer and tech',
  'Tools, equipments',
  'Sports and outdoor',
  'Animal and pets',
  'Machinery tools',
  'More category',
];

export const DEALS_ITEMS = [
  { name: 'Smart watches', img: '/images/smartwatch.png', discount: -25 },
  { name: 'Laptops', img: '/images/laptopdeal.png', discount: -15 },
  { name: 'GoPro cameras', img: '/images/gopro.png', discount: -40 },
  { name: 'Headphones', img: '/images/headset.png', discount: -25 },
  { name: 'Canon cameras', img: '/images/canonCamera.png', discount: -25 },
];

export const HOME_OUTDOOR_PRODUCTS = [
  { name: 'Soft chairs', price: 19, img: '/images/sofa.png' },
  { name: 'Sofa & chair', price: 19, img: 'https://picsum.photos/seed/sofa/80/80' },
  { name: 'Kitchen dishes', price: 19, img: 'https://picsum.photos/seed/dishes/80/80' },
  { name: 'Smart watches', price: 19, img: 'https://picsum.photos/seed/watch2/80/80' },
  { name: 'Kitchen mixer', price: 100, img: 'https://picsum.photos/seed/mixer/80/80' },
  { name: 'Blenders', price: 39, img: 'https://picsum.photos/seed/blender/80/80' },
  { name: 'Home appliance', price: 19, img: 'https://picsum.photos/seed/appliance/80/80' },
  { name: 'Coffee maker', price: 10, img: 'https://picsum.photos/seed/coffee/80/80' },
];

export const CONSUMER_ELECTRONICS_PRODUCTS = [
  { name: 'Smart watches', price: 19, img: 'https://picsum.photos/seed/ce_watch/80/80' },
  { name: 'Cameras', price: 89, img: 'https://picsum.photos/seed/ce_camera/80/80' },
  { name: 'Headphones', price: 10, img: 'https://picsum.photos/seed/ce_headphones/80/80' },
  { name: 'Smart watches', price: 90, img: 'https://picsum.photos/seed/ce_watch2/80/80' },
  { name: 'Gaming set', price: 35, img: 'https://picsum.photos/seed/ce_gaming/80/80' },
  { name: 'Laptops & PC', price: 340, img: 'https://picsum.photos/seed/ce_laptop/80/80' },
  { name: 'Smartphones', price: 19, img: 'https://picsum.photos/seed/ce_phone/80/80' },
  { name: 'Electric kettle', price: 240, img: 'https://picsum.photos/seed/ce_kettle/80/80' },
];

export const RECOMMENDED_ITEMS = MOCK_PRODUCTS.slice(4).concat(MOCK_PRODUCTS.slice(0,4));

export const EXTRA_SERVICES = [
    { name: 'Source from Industry Hubs', icon: 'SearchCircle', img: 'https://picsum.photos/seed/service1/200/120' },
    { name: 'Customize Your Products', icon: 'Cube', img: 'https://picsum.photos/seed/service2/200/120' },
    { name: 'Fast, reliable shipping by ocean or air', icon: 'PaperPlane', img: 'https://picsum.photos/seed/service3/200/120' },
    { name: 'Product monitoring and inspection', icon: 'ShieldCheck', img: 'https://picsum.photos/seed/service4/200/120' },
]

export const SUPPLIERS = [
    { name: 'Arabic Emirates', domain: 'shopname.ae', flag: '🇦🇪', code: 'ae' },
    { name: 'Australia', domain: 'shopname.com.au', flag: '🇦🇺', code: 'au' },
    { name: 'United States', domain: 'shopname.com', flag: '🇺🇸', code: 'us' },
    { name: 'Russia', domain: 'shopname.ru', flag: '🇷🇺', code: 'ru' },
    { name: 'Italy', domain: 'shopname.it', flag: '🇮🇹', code: 'it' },
    { name: 'Denmark', domain: 'denmark.com.dk', flag: '🇩🇰', code: 'dk' },
    { name: 'France', domain: 'shopname.com.fr', flag: '🇫🇷', code: 'fr' },
    { name: 'Arabic Emirates', domain: 'shopname.ae', flag: '🇦🇪', code: 'ae' },
    { name: 'China', domain: 'shopname.cn', flag: '🇨🇳', code: 'cn' },
    { name: 'Great Britain', domain: 'shopname.co.uk', flag: '🇬🇧', code: 'gb' },
];
