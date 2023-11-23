import prisma from "../../utils/prisma";
import { createProductSchema } from "./product.schema";

const createProduct = async (input: createProductSchema) => {
  const product = await prisma.products.create({
    data: input,
    include: {
      category: {
        select: {
          id: true,
          name: true,
          parent: {
            select: { id: true, name: true },
          },
        },
      },
    },
  });
  return product;
};

const getProducts = async () => {
  const products = await prisma.products.findMany({
    include: {
      category: {
        select: {
          id: true,
          name: true,
          parent: {
            select: { id: true, name: true },
          },
        },
      },
    },
  });
  return products;
};

const updateProductById = async (id: number, data: createProductSchema) => {
  const product = await prisma.products.update({
    where: {
      id: id,
    },
    data: data,
  });
  return product;
};

const deleteProductById = async (id: number) => {
  const product = await prisma.products.delete({
    where: {
      id: id,
    },
  });
  return product;
};

export { createProduct, getProducts, updateProductById, deleteProductById };
