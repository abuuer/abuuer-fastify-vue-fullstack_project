<template>
  <div class="home">
    <div class="categories">
      <h2>Categories</h2>
      <ul>
        <li v-for="category in categories" :key="category.id">
          <p
            @click="selectCategory(category)"
            :class="{ 'selected-category': category === selectedCategory }"
          >
            <span>{{ category.name }}</span>
          </p>
          <ul v-if="category.children">
            <li
              v-for="subcategory in category.children"
              :key="subcategory.id"
              @click="selectSubCategory(subcategory, category)"
              :class="{
                'selected-subcategory': subcategory === selectedSubCategory,
              }"
            >
              <span
                >{{ subcategory.name }} ({{
                  subcategory._count.products || 0
                }})</span
              >
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="products">
      <h2>Products</h2>
      <div v-if="selectedSubCategory" class="products-container">
        <div
          v-for="product in selectedSubCategory.products"
          :key="product.id"
          class="product-item"
        >
          <div class="image-container">
            <div class="product-item__image">
              <img
                :src="
                  require(`C:/Users/ismai/Desktop/anouar/fastify-vue-fullstack-project/server/uploads/keyboard.png`)
                "
                alt="Product Image"
              />
            </div>
          </div>
          <p>{{ product.name }}</p>
        </div>
      </div>
      <div v-else>
        <p>No products in this category .</p>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, onBeforeMount, onMounted, reactive, ref } from "vue";
import axios from "../api/axios";
import { provide } from "vue";

const CATEGORY_URL = "api/categories";

export default {
  name: "HomePage",
  setup() {
    let categories = ref(inject("categories"));
    let selectedCategory = ref(null);
    let selectedSubCategory = ref(null);

    onMounted(async () => {
      selectedCategory.value = categories.value[0];
      selectedSubCategory.value = selectedCategory?.value?.children[0];
    });
    return { categories, selectedCategory, selectedSubCategory };
  },
  data() {
    return {};
  },

  methods: {
    /**
     * Updates the selected category and its subcategory accordingly.
     * */
    selectCategory(category) {
      this.selectedCategory = category;
      if (category.children) this.selectedSubCategory = category.children[0];
      else this.selectedSubCategory = null;
    },
    /**
     * Updates the selected subcategory and its category accordingly.
     * */
    selectSubCategory(subCategory, category) {
      this.selectedSubCategory = subCategory;
      this.selectedCategory = category;
    },
  },
};
</script>

<style scoped>
.home {
  display: flex;
  padding: 40px 100px;
}

.categories {
  flex: 20;
  padding: 20px;
  /* border-right: 1px solid #ccc; */
}

.categories h2 {
  text-align: left;
}

.categories ul,
.products ul {
  list-style-type: none;
  padding: 0;
}

.categories li,
.products li {
  padding: 5px;
}

.categories p.selected-category {
  font-weight: bold;
}
.categories li.selected-subcategory {
  font-weight: bold;
}

.categories span {
  cursor: pointer;
}

.products {
  flex: 80;
  padding: 20px;
}

.products h2 {
  text-align: left;
  font-size: 50px;
  margin-top: 0px;
}

.products .products-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 30px;
}

.product-item {
  flex: 0 0 calc(33.33% - 20px);
  box-sizing: border-box;
  margin-bottom: 20px;
  text-align: center;
}

.product-item .product-item__image {
  width: 100%;
  background-color: #e9b9b917;
  padding: 50px; /* Adjust padding as needed */
  box-sizing: border-box;
  display: flex;
  justify-content: center;
}

.product-item img {
  width: 80%;
  height: auto;
  margin-bottom: 10px;
  border-radius: 5px; /* Optional: add border-radius for rounded corners */
}

.products div p {
  margin: 20px;
  font-size: 20px;
  display: flex;
  justify-content: center;
}
</style>
