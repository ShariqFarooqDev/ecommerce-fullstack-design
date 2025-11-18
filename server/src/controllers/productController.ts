import type { Request, Response } from "express";
import Product from "../models/product";

export const getAllProducts = async (req: Request, res: Response) => {
  const products = await Product.find({});
  res.status(200).json({ products });
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ id: parseInt(id) });
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};
