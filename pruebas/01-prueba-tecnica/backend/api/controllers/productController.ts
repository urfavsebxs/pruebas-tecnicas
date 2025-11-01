// backend/api/controllers/productController.ts (CORREGIDO)
import type { Request, Response } from 'express';
import * as ProductServices from "../services/productServices.ts";

// POST /api/products
export const postProducts = async (req: Request, res: Response) => {
  try {
    const { name, description, price, category_id } = req.body;
    const result: any = await ProductServices.postProducts(name, description, price, category_id);
    res.status(201).json({ id: result.insertId, name, description, price, category_id });
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el producto" });
  }
};

// PUT /api/products/:id
export const putProducts = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, price, category_id } = req.body;
    const result: any = await ProductServices.putProducts(Number(id), name, description, price, category_id); 
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Producto no encontrado para actualizar" });
    }
    res.json({ message: "Producto actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({ error: "Error interno al actualizar el producto" });
  }
};


// GET /api/products
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductServices.getProducts();
    res.json(products);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

// DELETE /api/products
export const deleteProducts = async (req: Request, res: Response) => {
  try {
    const { name, description, price, category_id } = req.body;
    const result: any = await ProductServices.deleteProducts(name, description, price, category_id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "❌ Producto no encontrado" });
    }
    res.status(200).json({ message: "🗑️ Producto eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).json({ error: "Error interno al eliminar el producto" });
  }
};