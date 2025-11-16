import dotenv from "dotenv";
dotenv.config();

import connectDB from "./connect";
import Product from "../models/product";

const jsonProducts = [
  {
    "name": "Product 1",
    "price": 100,
    "description": "Description for product 1",
    "image": "/images/product1.png",
    "category": "electronics",
    "stock": 10
  },
  {
    "name": "Product 2",
    "price": 200,
    "description": "Description for product 2",
    "image": "/images/product2.png",
    "category": "clothing",
    "stock": 20
  },
  {
    "name": "Product 3",
    "price": 300,
    "description": "Description for product 3",
    "image": "/images/product3.png",
    "category": "home",
    "stock": 30
  }
];

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI || "mongodb://localhost:27017/ecommerce");
    await Product.deleteMany();
    await Product.create(jsonProducts);
    console.log("Success!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
