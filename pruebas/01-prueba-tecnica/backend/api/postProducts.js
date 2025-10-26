// backend/api/products.js
import db from "../config/database.ts"; // usa .js si no usas TypeScript

export const postProducts = async (req, res) => {
  try {
    const { name, description, price, category_id } = req.body;
    const [result] = await db.query(
      "INSERT INTO products (name, description, price, category_id) VALUES (?, ?, ?, ?)",
      [name, description, price, category_id]
    );
    res.status(201).json({ id: result.insertId, name, description, price, category_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el producto" });
  }
};


