import { useState } from "react";
import "./styles/global.css";

function App() {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    category_id: "",
  });

  const [products, setProducts] = useState([]); // ← lista de productos

  // Maneja cambios en los inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Enviar producto
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, description, price, category_id } = formData;
      const res = await fetch("http://localhost:3000/api/postProducts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, price, category_id }),
      });

      const data = await res.json();
      console.log("✅ Producto creado:", data);

      setFormData({ name: "", description: "", price: "", category_id: "" });
      await handleGet(); // ← refresca la lista automáticamente
    } catch (error) {
      console.error("❌ Error al enviar el producto:", error);
    }
  };

  // Eliminar producto
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const { name, description, price, category_id } = formData;
      const res = await fetch("http://localhost:3000/api/deleteProducts", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, price, category_id }),
      });

      const data = await res.json();
      console.log("🗑️ Producto eliminado:", data);

      setFormData({ name: "", description: "", price: "", category_id: "" });
      await handleGet(); // ← refresca la lista
    } catch (error) {
      console.error("❌ Error al eliminar el producto:", error);
    }
  };

  // Obtener productos
  const handleGet = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/getProducts");
      const data = await res.json();
      console.log("📦 Productos:", data);
      setProducts(data);
    } catch (error) {
      console.error("❌ Error al obtener los productos:", error);
    }
  };

  // Actualizar productos
  const handleUpdate = async () => {
    try {
      const { id, name, description, price, category_id } = formData;
      const res = await fetch(`http://localhost:3000/api/putProducts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, price, category_id }),
      });

      const data = await res.json();
      console.log("✅ Producto actualizado:", data);

      setFormData({
        id: "",
        name: "",
        description: "",
        price: "",
        category_id: "",
      });
      await handleGet();
    } catch (error) {
      console.error("❌ Error al actualizar el producto:", error);
    }
  };


  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Prueba Técnica Fullstack</h1>
        <p className="text-xl font-medium">Realizada por: Urfavsebxs</p>
      </header>

      <div className="flex flex-row gap-10 items-start">
        {/* Formulario */}
        <section>
          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">

            <input
              type="text"
              name="name"
              placeholder="Nombre"
              value={formData.name}
              onChange={handleChange}
              className="w-64 px-3 py-2 rounded-xl bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200"
            />
            <input
              type="text"
              name="description"
              placeholder="Descripción"
              value={formData.description}
              onChange={handleChange}
              className="w-64 px-3 py-2 rounded-xl bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200"
            />
            <input
              type="number"
              name="price"
              placeholder="Precio"
              value={formData.price}
              onChange={handleChange}
              className="w-64 px-3 py-2 rounded-xl bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200"
            />
            <input
              type="number"
              name="category_id"
              placeholder="Categoría"
              value={formData.category_id}
              onChange={handleChange}
              className="w-64 px-3 py-2 rounded-xl bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200"
            />

            <div className="flex justify-center gap-4 mt-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors"
              >
                Añadir
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded transition-colors"
              >
                Eliminar
              </button>
              <button
                type="button"
                onClick={handleUpdate}
                className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded transition-colors"
              >
                Actualizar
              </button>
            </div>
          </form>
        </section>

        {/* Lista de productos */}
        <aside className="bg-gray-800 p-4 rounded-xl shadow-lg w-64">
          <h2 className="text-lg font-semibold mb-3 border-b border-gray-700 pb-2">
            Lista de Productos
          </h2>
          <ul className="space-y-2 text-gray-300">
            {products.length > 0 ? (
              products.map((p, i) => (
                <li
                  key={p.id}
                  onClick={() => setFormData(p)} // ← carga el producto seleccionado
                  className="bg-gray-700 hover:bg-gray-600 p-2 rounded-lg transition-colors cursor-pointer text-center"
                >
                  <span className="ml-2">{p.name}</span>
                  <span className="ml-2">{p.description}</span>
                  <span className="ml-2">${p.price}</span>
                  <span className="ml-2">{p.category_id}</span>
                </li>
              ))
            ) : (
              <li className="text-gray-500 text-center">Sin productos</li>
            )}
          </ul>
          <button
            onClick={handleGet}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors"
          >
            Actualizar Lista
          </button>
        </aside>
      </div>
    </div>
  );
}

export default App;
