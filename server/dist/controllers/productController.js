"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getAllProducts = void 0;
const product_1 = __importDefault(require("../models/product"));
const getAllProducts = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '' } = req.query;
        const pageNum = Number(page);
        const limitNum = Number(limit);
        const skip = (pageNum - 1) * limitNum;
        const query = {};
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { category: { $regex: search, $options: 'i' } },
            ];
        }
        const products = await product_1.default.find(query).skip(skip).limit(limitNum);
        const totalProducts = await product_1.default.countDocuments(query);
        const totalPages = Math.ceil(totalProducts / limitNum);
        res.status(200).json({
            products,
            totalPages,
            currentPage: pageNum,
            totalProducts
        });
    }
    catch (error) {
        res.status(500).json({ msg: error });
    }
};
exports.getAllProducts = getAllProducts;
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await product_1.default.findOne({ id: Number(id) });
        if (!product) {
            return res.status(404).json({ msg: `No product with id: ${id}` });
        }
        res.status(200).json({ product });
    }
    catch (error) {
        res.status(500).json({ msg: error });
    }
};
exports.getProductById = getProductById;
const createProduct = async (req, res) => {
    try {
        // Find the highest current ID
        const lastProduct = await product_1.default.findOne().sort({ id: -1 });
        const newId = lastProduct && lastProduct.id ? lastProduct.id + 1 : 1;
        const product = await product_1.default.create({ ...req.body, id: newId });
        res.status(201).json({ product });
    }
    catch (error) {
        console.error("Create product error:", error);
        res.status(500).json({ msg: "Failed to create product", error });
    }
};
exports.createProduct = createProduct;
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await product_1.default.findOneAndUpdate({ id: Number(id) }, req.body, {
            new: true,
            runValidators: true,
        });
        if (!product) {
            return res.status(404).json({ msg: `No product with id: ${id}` });
        }
        res.status(200).json({ product });
    }
    catch (error) {
        res.status(500).json({ msg: error });
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await product_1.default.findOneAndDelete({ id: Number(id) });
        if (!product) {
            return res.status(404).json({ msg: `No product with id: ${id}` });
        }
        res.status(200).json({ msg: "Product deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ msg: error });
    }
};
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=productController.js.map