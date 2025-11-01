import express from "express";
// import * as Products from "./api/products.js";
import productRoutes from "./api/routes/productRoutes.ts";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);

app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));
