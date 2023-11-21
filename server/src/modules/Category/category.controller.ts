import { FastifyReply, FastifyRequest } from "fastify";
import {
  createCategory,
  deleteCategoryById,
  getCategories,
  updateCategoryById,
} from "./category.service";
import { createCategorySchema, reqategorySchema } from "./category.schema";
import { uploadImage } from "../../utils/imageUpload";

const createCategoryController = async (
  req: FastifyRequest<{
    Body: reqategorySchema;
  }>,
  rep: FastifyReply
) => {
  try {
    const { fileBuffer, fileName, name, parent_id } = req.body;

    const fullPath = await uploadImage(fileBuffer, fileName);
    const category = await createCategory({
      name,
      parent_id,
      picture: fullPath,
    });
    return rep.code(200).send({
      success: true,
      message: "Category created successfully",
      category: category,
    });
  } catch (error) {
    return rep.code(400).send(error);
  }
};

const getCategoriesController = async (
  req: FastifyRequest,
  rep: FastifyReply
) => {
  try {
    const categories = await getCategories();
    return rep.code(200).send({
      success: true,
      categories: categories,
    });
  } catch (error) {
    return rep.code(400).send(error);
  }
};

const updateCategoryController = async (
  req: FastifyRequest<{ Params: { id: string }; Body: createCategorySchema }>,
  rep: FastifyReply
) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const category = await updateCategoryById(parseInt(id), data);
    return rep.code(200).send({
      success: true,
      message: "Category updated successfully",
      category: category,
    });
  } catch (error) {
    return rep.code(400).send(error);
  }
};

const deleteCategoryController = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  rep: FastifyReply
) => {
  try {
    const { id } = req.params;
    const category = await deleteCategoryById(parseInt(id));
    return rep.code(200).send({
      success: true,
      message: "Category deleted successfully",
      category: category,
    });
  } catch (error) {
    return rep.code(400).send(error);
  }
};

export {
  createCategoryController,
  getCategoriesController,
  updateCategoryController,
  deleteCategoryController,
};
