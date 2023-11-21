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
          <ul v-if="category.subcategories">
            <li
              v-for="subcategory in category.subcategories"
              :key="subcategory.id"
              @click="selectSubCategory(subcategory, category)"
              :class="{
                'selected-subcategory': subcategory === selectedSubCategory,
              }"
            >
              <span>{{ subcategory.name }} ({{ subcategory.count || 0 }})</span>
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
        <p>Select a category to see products.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      categories: [
        {
          id: 1,
          name: "Keyboards",
          subcategories: [
            {
              id: 11,
              name: "HP",
              count: 40,
              products: [
                {
                  id: 111,
                  name: "Razer Ornata Chroma - Clavier de jeu à membrane Mecha - FR Layout",
                  picture: "productA.jpg",
                },
                {
                  id: 112,
                  name: "Razer Ornata Chroma - Clavier de jeu à membrane Mecha - FR Layout",
                  picture: "productB.jpg",
                },
                {
                  id: 113,
                  name: "Razer Ornata Chroma - Clavier de jeu à membrane Mecha - FR Layout",
                  picture: "productB.jpg",
                },
              ],
            },
            {
              id: 12,
              name: "Other",
              count: 60,

              products: [
                {
                  id: 111,
                  name: "Razer Ornata Chroma ",
                  picture: "productA.jpg",
                },
                {
                  id: 112,
                  name: "Razer Ornata Chroma ",
                  picture: "productB.jpg",
                },
                {
                  id: 113,
                  name: "Razer Ornata Chroma ",
                  picture: "productB.jpg",
                },
              ],
            },
            // Add more subcategories with products as needed
          ],
        },
        // Add more parent categories with subcategories
        {
          id: 2,
          name: "Category 2",
          subcategories: [
            {
              id: 12,
              name: "Subcategory 2.1",
              products: [
                {
                  id: 111,
                  name: "Razer Ornata Chroma - Mouse de jeu à membrane Mecha - FR Layout",
                  picture: "productA.jpg",
                },
                {
                  id: 112,
                  name: "Razer Ornata Chroma - Mouse de jeu à membrane Mecha - FR Layout",
                  picture: "productB.jpg",
                },
                {
                  id: 113,
                  name: "Razer Ornata Chroma - Mouses de jeu à membrane Mecha - FR Layout",
                  picture: "productB.jpg",
                },
              ],
            },
            // Add more subcategories with products as needed
          ],
        },
      ],

      selectedCategory: null,
      selectedSubCategory: null,
    };
  },
  created() {
    // Set the first category as the default selected category
    if (this.categories.length > 0) {
      this.selectedCategory = this.categories[0];
      this.selectedSubCategory = this.categories[0].subcategories[0];
    }
  },
  methods: {
    selectCategory(category) {
      this.selectedCategory = category;
      this.selectedSubCategory = category.subcategories[0];
    },
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
  justify-content: space-between;
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
