"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connect_1 = __importDefault(require("./connect"));
const product_1 = __importDefault(require("../models/product"));
const jsonProducts = [
    {
        id: 1,
        name: 'GoPro HERO6 4K Action Camera - Black',
        description: 'Professional 4K action camera with stabilization and waterproof design. Perfect for adventure enthusiasts and content creators.',
        price: 998.00,
        originalPrice: 1128.00,
        rating: 4.5,
        reviews: 32,
        orders: 154,
        shipping: 'Free Shipping',
        image: '/images/gopro.png',
        images: ['/images/gopro.png'],
        category: 'electronics',
        stock: 50,
        features: ['Metallic', '8GB Ram', 'Super power'],
        brand: 'Apple',
        condition: 'New'
    },
    {
        id: 2,
        name: 'Canon Camera EOS 2000, Black 10x zoom',
        description: 'Advanced DSLR camera with 10x optical zoom and professional features for photography enthusiasts.',
        price: 899.99,
        originalPrice: 1128.00,
        rating: 4.8,
        reviews: 120,
        orders: 75,
        shipping: 'Free Shipping',
        image: '/images/canon-camera.png',
        images: ['/images/canon-camera.png'],
        category: 'electronics',
        stock: 25,
        features: ['Plastic cover', 'Large Memory'],
        brand: 'Canon',
        condition: 'New'
    },
    {
        id: 3,
        name: 'Smart watches',
        description: 'Feature-rich smartwatch with fitness tracking, heart rate monitor, and multiple sport modes.',
        price: 199.00,
        rating: 4.2,
        reviews: 8,
        orders: 45,
        shipping: 'Standard',
        image: '/images/smartwatch.png',
        images: ['/images/smartwatch.png'],
        category: 'electronics',
        stock: 120,
        features: ['Waterproof', 'Fitness Tracker'],
        brand: 'Samsung',
        condition: 'New'
    },
    {
        id: 4,
        name: 'Modern Laptop with SSD',
        description: 'High performance laptop with 16GB RAM and 512GB SSD. Ideal for professionals and developers.',
        price: 1340.00,
        rating: 4.9,
        reviews: 55,
        orders: 98,
        shipping: 'Free Shipping',
        image: '/images/laptop.png',
        images: ['/images/laptop.png'],
        category: 'electronics',
        stock: 30,
        features: ['SSD', '16GB Ram'],
        brand: 'Huawei',
        condition: 'New'
    },
    {
        id: 5,
        name: 'Headset for gaming with mic',
        description: 'Immersive gaming headset with noise cancelling microphone and RGB lighting.',
        price: 89.99,
        originalPrice: 150.00,
        rating: 4.3,
        reviews: 210,
        orders: 450,
        shipping: 'Standard',
        image: '/images/gaming-headset.png',
        images: ['/images/gaming-headset.png'],
        category: 'electronics',
        stock: 200,
        features: ['Noise Cancelling', 'RGB'],
        brand: 'Pocco',
        condition: 'New'
    },
    {
        id: 6,
        name: 'Brown winter coat medium size',
        description: 'Stylish and warm winter coat made with premium wool blend. Perfect for cold weather.',
        price: 149.99,
        rating: 4.6,
        reviews: 15,
        orders: 60,
        shipping: 'Standard',
        image: '/images/winter-coat.png',
        images: ['/images/winter-coat.png'],
        category: 'clothing',
        stock: 80,
        features: ['Wool', 'Water-resistant'],
        brand: 'Unbranded',
        condition: 'New'
    },
    {
        id: 7,
        name: 'T-shirts with multiple colors, for men',
        description: 'Comfortable 100% cotton t-shirts available in various colors and sizes.',
        price: 29.99,
        rating: 4.1,
        reviews: 30,
        orders: 120,
        shipping: 'Standard',
        image: '/images/tshirt.png',
        images: ['/images/tshirt.png'],
        category: 'clothing',
        stock: 300,
        features: ['100% Cotton', 'Tagless'],
        brand: 'Lenovo',
        condition: 'New'
    },
    {
        id: 8,
        name: 'Jeans bag for travel for men',
        description: 'Premium quality denim travel bag with multiple compartments and RFID blocking.',
        price: 79.95,
        rating: 4.9,
        reviews: 80,
        orders: 200,
        shipping: 'Free Shipping',
        image: '/images/jeans_travel_bag.png',
        images: ['/images/jeans_travel_bag.png'],
        category: 'clothing',
        stock: 150,
        features: ['Genuine Leather', 'RFID Blocking'],
        brand: 'Designer',
        condition: 'New'
    },
    {
        id: 9,
        name: 'Jeans shorts for men blue color',
        price: 54.99,
        image: '/images/jeans_shorts.png',
        description: 'Classic blue denim shorts perfect for summer and casual wear.',
        rating: 4.0,
        reviews: 1,
        orders: 1,
        shipping: 'Standard',
        category: 'clothing',
        stock: 100,
        features: [],
        brand: 'Denizen',
        condition: 'New',
        images: ['/images/jeans_shorts.png']
    },
    {
        id: 10,
        name: 'Travel Bag Durable',
        price: 129.99,
        image: '/images/travel_bag_durable.png',
        description: 'Durable and spacious travel bag with waterproof material and multiple pockets.',
        rating: 4.0,
        reviews: 1,
        orders: 1,
        shipping: 'Standard',
        category: 'home',
        stock: 75,
        features: ['Waterproof', 'Large capacity'],
        brand: 'TravelMax',
        condition: 'New',
        images: ['/images/travel_bag_durable.png']
    },
    {
        id: 11,
        name: 'Soft Leather Sofa Chair',
        description: 'Comfortable leather sofa chair perfect for living rooms. High quality and durable.',
        price: 499.99,
        rating: 4.7,
        reviews: 45,
        orders: 120,
        shipping: 'Free Shipping',
        image: '/images/leather_sofa.png',
        images: ['/images/leather_sofa.png'],
        category: 'home',
        stock: 20,
        features: ['Leather', 'Comfortable'],
        brand: 'FurnitureCo',
        condition: 'New'
    },
    {
        id: 12,
        name: 'Kitchen Mixer Professional',
        description: 'Heavy-duty kitchen mixer with multiple speed settings for professional use.',
        price: 199.99,
        rating: 4.4,
        reviews: 60,
        orders: 85,
        shipping: 'Free Shipping',
        image: '/images/kitchen_mixer.png',
        images: ['/images/kitchen_mixer.png'],
        category: 'home',
        stock: 45,
        features: ['Multiple speeds', 'Stainless steel'],
        brand: 'KitchenMax',
        condition: 'New'
    },
    {
        id: 13,
        name: 'Electric Blender',
        description: 'Powerful electric blender with stainless steel blades and multiple modes.',
        price: 79.99,
        rating: 4.3,
        reviews: 35,
        orders: 92,
        shipping: 'Standard',
        image: '/images/electric_blender.png',
        images: ['/images/electric_blender.png'],
        category: 'home',
        stock: 60,
        features: ['Stainless steel blades', '3 modes'],
        brand: 'BlendPro',
        condition: 'New'
    },
    {
        id: 14,
        name: 'Coffee Maker Automatic',
        description: 'Automatic coffee maker with programmable timer and thermal carafe.',
        price: 89.99,
        rating: 4.5,
        reviews: 72,
        orders: 156,
        shipping: 'Standard',
        image: '/images/coffee_maker.png',
        images: ['/images/coffee_maker.png'],
        category: 'home',
        stock: 85,
        features: ['Programmable timer', 'Thermal carafe'],
        brand: 'CoffeePro',
        condition: 'New'
    },
    {
        id: 15,
        name: 'Smart LED Desk Lamp',
        description: 'Energy-efficient LED desk lamp with adjustable brightness and color temperature.',
        price: 49.99,
        rating: 4.2,
        reviews: 28,
        orders: 74,
        shipping: 'Standard',
        image: '/images/lamp.png',
        images: ['/images/lamp.png'],
        category: 'home',
        stock: 110,
        features: ['Adjustable brightness', 'Color temperature'],
        brand: 'LightWorks',
        condition: 'New'
    }
];
const start = async () => {
    try {
        await (0, connect_1.default)(process.env.MONGO_URI || "mongodb://localhost:27017/ecommerce");
        await product_1.default.deleteMany({});
        await product_1.default.create(jsonProducts);
        console.log(`Successfully seeded ${jsonProducts.length} products!`);
        process.exit(0);
    }
    catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};
start();
//# sourceMappingURL=seed.js.map