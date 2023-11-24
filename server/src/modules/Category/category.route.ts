import { FastifyInstance } from "fastify";
import {
  createCategoryController,
  getCategoriesController,
  updateCategoryController,
  deleteCategoryController,
} from "./category.controller";

const categoryRoutes = async (server: FastifyInstance) => {
  server.post("/", createCategoryController);
  server.get("/", getCategoriesController);
  server.put("/:id", updateCategoryController);
  server.delete("/:id", deleteCategoryController);
};

export default categoryRoutes;
