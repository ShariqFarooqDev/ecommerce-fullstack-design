import express from "express";
const router = express.Router();

import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/productController";

router.route("/").get(getAllProducts).post(createProduct);
router.route("/:id").get(getProductById).patch(updateProduct).delete(deleteProduct);

export default router;
