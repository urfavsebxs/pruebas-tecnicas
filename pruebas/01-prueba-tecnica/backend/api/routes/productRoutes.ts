// backend/api/routes/productRoutes.ts

import express from 'express';
import * as ProductController from "../controllers/productController.ts";

const router = express.Router();

router.post("/", ProductController.postProducts);
router.put("/:id", ProductController.putProducts);
router.delete("/", ProductController.deleteProducts);
router.get("/", ProductController.getProducts);

export default router;
