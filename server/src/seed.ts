import { PrismaClient, Prisma } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const seedData = async () => {
  try {
    const existingCategories = await prisma.categories.count();

    if (existingCategories == 0) {
      const categoryData = {
        name: "Electronics",
        picture: "3243434235234.jpg",
      };

      const categories: any = (await prisma.categories.create({
        data: categoryData,
      })) as unknown as any;
      console.log(categories, "categories");
      const subCategoryData = {
        name: "Smartphones",
        picture: "3243434235234.jpg",
        parent_id: categories.id,
      };
      const subCategories: any = (await prisma.categories.create({
        data: subCategoryData,
      })) as unknown as any;
      console.log(subCategories, "subCategories");

      const productData = [
        {
          name: "Samusung",
          picture: "3243434235234.jpg",
          category_id: subCategories.id,
        },
        {
          name: "Iphone",
          picture: "3243434235234.jpg",
          category_id: subCategories.id,
        },
      ];

      const products = await prisma.products.createMany({
        data: productData,
      });

      console.log("Seed data inserted successfully.");
    } else {
      console.log(
        "Database already contains data. Skipping seed data insertion."
      );
    }
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
};

seedData();
