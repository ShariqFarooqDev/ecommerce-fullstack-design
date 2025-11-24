import express from "express";
const router = express.Router();

import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/productController";
import { authenticateUser, authorizeAdmin } from "../middleware/authMiddleware";

router.route("/").get(getAllProducts).post(authenticateUser, authorizeAdmin, createProduct);
router.route("/:id").get(getProductById).patch(authenticateUser, authorizeAdmin, updateProduct).delete(authenticateUser, authorizeAdmin, deleteProduct);

export default router;
