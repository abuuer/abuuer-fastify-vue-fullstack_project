import { Categories } from "@prisma/client";
import prisma from "../../utils/prisma";
import { createCategorySchema, updateCategorySchema } from "./category.schema";
import { uploadImage } from "../../utils/imageUpload";

const createCategory = async (input: createCategorySchema) => {
  const category = await prisma.categories.create({
    data: input,
  });
  return category;
};

/** Get categories in the form of a tree like structure
 * @TODO Show total count of products of recursive children categories
 */
const getCategories = async () => {
  const categories = await prisma.categories.findMany({
    where: {
      parent_id: {
        equals: null,
      },
    },
    include: {
      children: {
        include: {
          products: true,
          _count: {
            select: { products: true },
          },
        },
      },
    },
  });
  return categories;
};

const updateCategoryById = async (id: number, data: updateCategorySchema) => {
  const category = await prisma.categories.update({
    where: {
      id: id,
    },
    data: data,
    include: {
      children: {
        include: {
          products: true,
          _count: {
            select: { products: true },
          },
        },
      },
    },
  });
  return category;
};

const deleteCategoryById = async (id: number) => {
  // Find the category with its children
  const category = await prisma.categories.findUnique({
    where: {
      id: id,
    },
    include: {
      children: true,
    },
  });

  // Check if the category has children
  if (category?.children?.length) {
    // If it has children, delete all children and then delete the parent
    const [childrenCategories, parentCategory] = await prisma.$transaction([
      prisma.categories.deleteMany({
        where: {
          parent_id: id,
        },
      }),
      prisma.categories.delete({
        where: {
          id: id,
        },
      }),
    ]);

    return parentCategory;
  } else {
    // If it has no children, delete the category directly
    const category = await prisma.categories.delete({
      where: {
        id: id,
      },
    });
    return category;
  }
};

export {
  createCategory,
  getCategories,
  updateCategoryById,
  deleteCategoryById,
};
