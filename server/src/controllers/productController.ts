import type { Request, Response } from "express";
import Product from "../models/product";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const query: any = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
      ];
    }

    const products = await Product.find(query).skip(skip).limit(limitNum);
    const totalProducts = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / limitNum);

    res.status(200).json({
      products,
      totalPages,
      currentPage: pageNum,
      totalProducts
    });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ id: Number(id) });
    if (!product) {
      return res.status(404).json({ msg: `No product with id: ${id}` });
    }
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    // Find the highest current ID
    const lastProduct = await Product.findOne().sort({ id: -1 });
    const newId = lastProduct && lastProduct.id ? lastProduct.id + 1 : 1;

    const product = await Product.create({ ...req.body, id: newId });
    res.status(201).json({ product });
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({ msg: "Failed to create product", error });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findOneAndUpdate({ id: Number(id) }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(404).json({ msg: `No product with id: ${id}` });
    }
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findOneAndDelete({ id: Number(id) });
    if (!product) {
      return res.status(404).json({ msg: `No product with id: ${id}` });
    }
    res.status(200).json({ msg: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
