
import db from "../../config/database.ts";

export const putProducts = async (id: number, name: string, description: string, price: number, category_id: number) => {
  const [result] = await db.query(
    "UPDATE products SET name = ?, description = ?, price = ?, category_id = ? WHERE id = ?",
    [name, description, price, category_id, id]
  );
  return result;
};

export const postProducts = async (name: string, description: string, price: number, category_id: number) => {
  const [result] = await db.query(
    "INSERT INTO products (name, description, price, category_id) VALUES (?, ?, ?, ?)",
    [name, description, price, category_id]
  );
  return result;
};

export const getProducts = async () => {
  try {
    const [rows] = await db.query("SELECT * FROM products");
    return rows;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw new Error("Error al obtener los productos");
  }
};

export const deleteProducts = async (name: string, description: string, price: number, category_id: number) => {
  const [result] = await db.query(
    "DELETE FROM products WHERE name = ? AND description = ? AND price = ? AND category_id = ?",
    [name, description, price, category_id]
  );
  return result;
};
