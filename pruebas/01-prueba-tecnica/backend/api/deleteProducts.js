import db from "../config/database.ts";

export const deleteProducts = async (req, res) => {
  try {
    const { name, description, price, category_id } = req.body;

    const [result] = await db.query(
      "DELETE FROM products WHERE name = ? AND description = ? AND price = ? AND category_id = ?",
      [name, description, price, category_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "❌ Producto no encontrado" });
    }

    res.status(200).json({ message: "🗑️ Producto eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).json({ error: "Error interno al eliminar el producto" });
  }
};
