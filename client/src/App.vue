<template>
  <div>
    <nav>
      <div>
        <router-link to="/product" :class="{ selected: $route.path === '/' }"
          >Home</router-link
        >
        <router-link to="/admin" :class="{ selected: $route.path === '/admin' }"
          >Admin</router-link
        >
      </div>
    </nav>
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
      getAllCategories();
      getAllProducts();
    });

    const getAllCategories = async () => {
      try {
        const responseCategories = await axios.get(CATEGORY_URL);
        categories.value = responseCategories.data.categories;
      } catch (error) {
        console.log(error);
      }
    };

    const getAllProducts = async () => {
      try {
        const responseProducts = await axios.get(PRODUCTS_URL);
        products.value = responseProducts.data.products;
      } catch (error) {
        console.log(error);
      }
    };

    provide("products", products);
    provide("categories", categories);
    provide("getAllCategories", getAllCategories);
    provide("getAllProducts", getAllProducts);
  },
};
</script>
<style>
body {
  background-color: #f6f7fb;
}
nav {
  display: flex;
  justify-content: center;
  padding: 10px;
}

nav div {
  background-color: #eeefee;
  border: 1px solid rgb(212, 212, 212);
  border-radius: 20px;
  padding: 12px 0px;
  transition: background-color 0.3s, border 0.3s;
}

a {
  text-decoration: none;
  color: rgb(0, 0, 0);
  font-size: 16px;
  padding: 10px 30px;
  font-weight: bold;
  border-radius: 20px;
  transition: background-color 0.3s, color 0.3s;
}

.selected {
  background-color: #fefffe;
  border: 1px solid rgb(226, 226, 226);
}

a:hover {
  color: #000000;
}
</style>
