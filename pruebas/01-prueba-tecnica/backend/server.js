import express from "express";
import { postProducts } from "./api/postProducts.js";
import { deleteProducts } from "./api/deleteProducts.js";
import { getProducts } from "./api/getProducts.js";
import { putProducts } from "./api/putProducts.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/postProducts", postProducts);
app.put("/api/putProducts/:id", putProducts);
app.delete("/api/deleteProducts", deleteProducts);
app.get("/api/getProducts", getProducts);

app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));
