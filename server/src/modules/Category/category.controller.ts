import { FastifyReply, FastifyRequest } from "fastify";
import {
  createCategory,
  deleteCategoryById,
  getCategories,
  updateCategoryById,
} from "./category.service";
import {
  createCategorySchema,
  reqategorySchema,
  updateCategorySchema,
} from "./category.schema";
import { deleteImage, uploadImage } from "../../utils/imageUpload";

const createCategoryController = async (
  req: FastifyRequest<{
    Body: reqategorySchema;
  }>,
  rep: FastifyReply
) => {
  try {
    const { fileBuffer, fileName, name, parent_id } = req.body;
    let parentId = undefined;
    if (parent_id) parentId = parseInt(parent_id);
    const fullPath = await uploadImage(fileBuffer, fileName);
    const category = await createCategory({
      name,
      parent_id: parentId,
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
  req: FastifyRequest<{ Params: { id: string }; Body: updateCategorySchema }>,
  rep: FastifyReply
) => {
  try {
    const { id } = req.params;
    const { fileBuffer, fileName, name, oldPictureName } = req.body;
    let picture = undefined;
    if (fileBuffer && fileName && oldPictureName) {
      picture = await uploadImage(fileBuffer, fileName);
      await deleteImage(oldPictureName);
    }
    const category = await updateCategoryById(parseInt(id), {
      name,
      picture,
    });
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
