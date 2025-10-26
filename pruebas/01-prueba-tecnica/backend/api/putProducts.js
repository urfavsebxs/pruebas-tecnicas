import db from "../config/database.ts";

export const putProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category_id } = req.body;
    const [result] = await db.query(
      "UPDATE products SET name = ?, description = ?, price = ?, category_id = ? WHERE id = ?",
      [name, description, price, category_id, id]
    );
    res.json({ message: "Producto actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({ error: "Error interno al actualizar el producto" });
  }
};
