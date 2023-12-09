import { PrismaClient } from "@prisma/client";
import { readFile } from "fs/promises";

const prisma = new PrismaClient();

const seedData = async () => {
  try {
    const existingCategories = await prisma.categories.count();

    if (existingCategories === 0) {
      const jsonData = await readFile("src/utils/data.json", "utf-8");
      const categoriesData = JSON.parse(jsonData);

      for (const parentCategoryData of categoriesData) {
        const parentCategory = await prisma.categories.create({
          data: {
            name: parentCategoryData.name,
            picture: parentCategoryData.picture,
          },
        });

        for (const childCategoryData of parentCategoryData.children) {
          const childCategory = await prisma.categories.create({
            data: {
              name: childCategoryData.name,
              picture: childCategoryData.picture,
              parent_id: parentCategory.id,
            },
          });

          for (const productData of childCategoryData.products) {
            await prisma.products.create({
              data: {
                name: productData.name,
                picture: productData.picture,
                category_id: childCategory.id,
              },
            });
          }
        }
      }

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
