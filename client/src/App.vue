<template>
  <div>
    <!-- <nav>
      <router-link to="/product">Home</router-link> |
      <router-link to="/admin">Admin</router-link>
    </nav> -->
    <router-view />
  </div>
</template>

<script>
import { onMounted, ref, provide } from "vue";
import axios from "./api/axios";

const PRODUCTS_URL = "api/products";
const CATEGORY_URL = "api/categories";

export default {
  setup() {
    const products = ref([]);
    const categories = ref([]);

    onMounted(async () => {
      try {
        const responseProducts = await axios.get(PRODUCTS_URL);
        const responseCategories = await axios.get(CATEGORY_URL);
        products.value = responseProducts.data.products;
        categories.value = responseCategories.data.categories;
      } catch (error) {
        console.error(error);
      }
    });

    // allows adding new category from other components
    const updateCategories = (newCategory) => {
      if (newCategory.parent_id !== null) {
        // Find the parent category
        const parentCategory = categories.value.find(
          (category) => category.id === newCategory.parent_id
        );

        if (parentCategory) {
          // Check if the parent has a 'children' property, if not, initialize it
          if (!parentCategory.children) {
            parentCategory.children = [];
          }

          // Add the new category to the children of the parent
          parentCategory.children.push(newCategory);
        }
      } else {
        // If parent_id is null, push it to the main categories array
        categories.value.push(newCategory);
      }
    };
    provide("products", products);
    provide("categories", categories);
    provide("updateCategories", updateCategories);
  },
};
</script>
<style></style>
