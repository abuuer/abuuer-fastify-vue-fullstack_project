import { FastifyInstance } from "fastify";
import {
  createProductController,
  deleteProductController,
  getProductsController,
  updateProductController,
} from "./product.controller";

const productRoutes = async (server: FastifyInstance) => {
  server.post("/create", createProductController);
  server.get("/", getProductsController);
  server.post("/update/:id", updateProductController);
  server.delete("/:id", deleteProductController);
};

export default productRoutes;
