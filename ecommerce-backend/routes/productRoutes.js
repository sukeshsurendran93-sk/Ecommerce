import { Router } from "express";
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/productController.js";
import { protect, authorizeAdmin } from "../middleware/authMiddleware.js";
import fileUpload from './../middleware/fileUpload.js';

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", protect, authorizeAdmin, fileUpload.single("image"), createProduct);
router.put("/:id", protect, authorizeAdmin, updateProduct);
router.delete("/:id", protect, authorizeAdmin, deleteProduct);

export default router;